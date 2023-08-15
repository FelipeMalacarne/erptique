<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationsController extends Controller
{
     public function index()
     {
          return Inertia::render('ApplicationsPage', array(
               'applications' => Application::all(),
               'bankAccounts' => BankAccount::all()
          ));
     }

     public function create(Request $request)
     {
          $application = new Application();

          $application->amount = $request->amount;
          $application->account_id = $request->account_id;
          $application->date = $request->date;
          $application->save();
          return redirect()->back()->with('success', 'Application created successfully');
     }
} 
