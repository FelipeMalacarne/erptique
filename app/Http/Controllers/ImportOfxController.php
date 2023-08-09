<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Transaction;
use App\Service\OfxService;
use DateTime;
use DateTimeZone;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use OfxParser\Parser;


class ImportOfxController extends Controller
{
    private $ofxService;

    public function __construct()
    {
        $this->ofxService = new OfxService();
    }

    public function importOfx(Request $request)
    {

        try {
            $files = $request->file('fileUpload');
            if (empty($files)) {
                throw new Exception('No files uploaded');
            }

            $this->ofxService->saveAllTransactions($files);

            Log::info('OFX file imported successfully.');
            return redirect()->back()->with('success', 'OFX file imported successfully.');
        } catch (Exception $e) {
            Log::error('Error importing OFX file: ' . $e->getMessage());
            return redirect()->back()->withErrors('Error importing OFX file: ' . $e->getMessage());
        }
    }


}