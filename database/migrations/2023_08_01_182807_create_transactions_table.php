<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('account_id', 50);
            $table->string('transaction_type', 15);
            $table->dateTime('date_posted');
            $table->decimal('amount', 18, 2);
            $table->string('FITID', 100);
            $table->string('memo', 255);
            $table->timestamps();

            // FK to 'bank_accounts' table - many to one
            $table->foreign('account_id')->references('account_id')->on('bank_accounts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
