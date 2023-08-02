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
        Schema::create('ledger_balances', function (Blueprint $table) {
            $table->string('account_id', 50)->primary();
            $table->decimal('balance_amount', 18, 2);
            $table->dateTime('date_as_of');
            $table->timestamps();

            // FK to 'bank_accounts' table - one to one
            $table->foreign('account_id')->references('account_id')->on('bank_accounts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ledger_balances');
    }
};
