<?php

namespace App\Service;

use App\Models\BankAccount;
use App\Models\Transaction;
use DateTime;
use DateTimeZone;
use Exception;
use OfxParser\Parser;

class OfxService
{

    public function saveAllTransactions($files)
    {
        foreach ($files as $file) {
            $extension = $file->getClientOriginalExtension();

            if ($extension != 'ofx') {
                throw new Exception('File format not supported');
            }

            $fileString = $file->get();

            // Parse the OFX date in the file string; if null is returned, do nothing.
            $parsedFileString = $this->parseOfxDateInFileString($fileString);
            $fileString = $parsedFileString ?? $fileString;

            $ofxParser = new Parser();
            $ofx = $ofxParser->loadFromString($fileString);

            $bankAccount = $this->getOrCreateBankAccount($ofx);
            foreach ($ofx->bankAccounts[0]->statement->transactions as $transaction) {
                // Convert the transaction type to "credit" or "debit"
                $standardizedType = $this->getStandardizedTransactionType($transaction->type);


                // filter out when transaction already exists comparing date, fitid and account
                $existingTransaction = Transaction::where('date_posted', $transaction->date)
                    ->where('FITID', $transaction->uniqueId)
                    ->where('account_id', $ofx->bankAccounts[0]->accountNumber)
                    ->first();
                
                
                if (!$existingTransaction) {
                    $bankAccount->transactions()->create([
                        'transaction_type' => $standardizedType,
                        'date_posted' => $transaction->date,
                        'amount' => $transaction->amount,
                        'FITID' => $transaction->uniqueId,
                        'memo' => $transaction->memo,
                    ]);
                }
            }
            // update or create account ledger_balance
            $bankAccount->updateOrCreate(
                ['account_id' => $ofx->bankAccounts[0]->accountNumber],
                ['ledger_balance' => $ofx->bankAccounts[0]->balance]
            );
        }
        
    }

    private function parseOfxDateInFileString($fileString) 
    {
        try {
            // Regular expression to match the <DTASOF> date in the OFX file
            $pattern = '/<DTASOF>([^<]+)<\/DTASOF>/';

            // Find and replace the <DTASOF> date with the parsed date in the file string
            $fileString = preg_replace_callback($pattern, function ($matches) {
                $ofxDate = trim($matches[1]);

                // Split the date string into day, month, and year components
                list($day, $month, $year) = explode('/', $ofxDate);

                // Create a new DateTime object with the parsed date string
                $dateTime = new DateTime($year . '-' . $month . '-' . $day, new DateTimeZone('UTC'));

                // Return the parsed date string in the correct format
                return '<DTASOF>' . $dateTime->format('YmdHis') . '</DTASOF>';
            }, $fileString);

            return $fileString;
        } catch (Exception $e) {
            // Return null if parsing fails
            return null;
        }
    }

    private function getOrCreateBankAccount($ofx): BankAccount
    {
        return BankAccount::firstOrCreate([
            'account_id' => $ofx->bankAccounts[0]->accountNumber,
            'bank_id' => $ofx->bankAccounts[0]->routingNumber,
            'account_type' => $ofx->bankAccounts[0]->accountType,
        ]);
    }

    private function getStandardizedTransactionType($originalType)
    {
        $creditKeywords = ['credit', 'in'];
        $debitKeywords = ['debit', 'out'];

        foreach ($creditKeywords as $keyword) {
            if (stripos($originalType, $keyword) !== false) {
                return 'credit';
            }
        }
        foreach ($debitKeywords as $keyword) {
            if (stripos($originalType, $keyword) !== false) {
                return 'debit';
            }
        }
        // If no match is found, return the original type
        return $originalType;
    }
}
