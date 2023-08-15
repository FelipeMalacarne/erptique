<?php

use App\Http\Controllers\ApplicationsController;
use App\Http\Controllers\ImportOfxController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\PHPIniMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('import');

    
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/import-ofx', function () {
    return Inertia::render('ImportPage');
})->middleware(['auth', 'verified'])->name('import');

Route::post('/import-ofx', [ImportOfxController::class, 'importOfx'])->name('import.post');


Route::get('/applications', [ApplicationsController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('applications');

Route::post('/applications', [ApplicationsController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('applications.store');




    
require __DIR__.'/auth.php';
