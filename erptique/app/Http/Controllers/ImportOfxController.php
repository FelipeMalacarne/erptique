<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Transaction;
use DateTime;
use DateTimeZone;
use Exception;
use Illuminate\Http\Request;
use OfxParser\Parser;


class ImportOfxController extends Controller
{
    public function importOfx(Request $request)
    {
        $fileString = $request->file('fileUpload')->get();

        // Parse the OFX date in the file string, if return null does nothing.
        $fileString = $this->parseOfxDateInFileString($fileString) == null ? $fileString : $this->parseOfxDateInFileString($fileString);

        $ofxParser = new Parser();
        $ofx = $ofxParser->loadFromString($fileString);

        // Create bank account if not exists
        $bankAccount = $this->getBankAccount($ofx);

        foreach ($ofx->bankAccounts[0]->statement->transactions as $transaction) {

            // Convert the transaction type to "credit" or "debit"
            $standardizedType = $this->getStandardizedTransactionType($transaction->type);

            $existingTransaction = Transaction::where('FITID', $transaction->uniqueId)->first();
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
        // update or create account ledger_balance if balance is newer than the one in the database
        $previousDate = $bankAccount->ledgerBalance()->value('date_as_of') ;
        $newDate = $ofx->bankAccounts[0]->balanceDate;
         if($previousDate < $newDate){
             $bankAccount->ledgerBalance()->updateOrCreate([
                 'date_as_of' => $ofx->bankAccounts[0]->balanceDate,
                 'balance_amount' => $ofx->bankAccounts[0]->balance,
             ]);
         }

//          return redirect()->route('dashboard');
    }

    private function getBankAccount($ofx)
    {
        return BankAccount::firstOrCreate([
            'account_id' => $ofx->bankAccounts[0]->accountNumber,
            'bank_id' => $ofx->bankAccounts[0]->routingNumber,
            'account_type' => $ofx->bankAccounts[0]->accountType,
        ]);
    }


    function parseOfxDateInFileString($fileString)
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

