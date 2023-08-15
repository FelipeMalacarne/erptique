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
          return Inertia::render('Applications/ApplicationsPage', array(
               'applications' => Application::orderBy('id', 'desc')->take(20)->get(),
               'bankAccounts' => BankAccount::all()
          ));
     }

     public function create(Request $request)
     {
         try{
          $application = new Application();
          $application->amount = $request->amount;
          $application->account_id = $request->account_id;
          $application->date = $request->date;
          $application->save();
          
          return redirect()->back()->with('success', 'Application created successfully');
         } catch (\Exception $e) {
          return redirect()->back()->withErrors('Something went wrong!' . $e->getMessage());
         }     
     }

     public function destroy($id)
     {
          try{
               $application = Application::find($id);
               $application->delete();
               return redirect()->back()->with('success', 'Application deleted successfully');
          } catch (\Exception $e) {
               return redirect()->back()->withErrors('Something went wrong!' . $e->getMessage());
          }     
     }
} 
