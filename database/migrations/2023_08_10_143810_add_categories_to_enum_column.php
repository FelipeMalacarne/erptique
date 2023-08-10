<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use OfxParser\Entities\Statement;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('
            ALTER TABLE transactions 
            MODIFY category 
            ENUM(
                "Transactions", 
                "Recurring Bills", 
                "Personnel", "Food", 
                "Supplies", 
                "Credit Card", 
                "Office Equipment", 
                "Construction", 
                "Office Maintenance", 
                "One-off Bills", 
                "Subscriptions income", 
                "Chargeback", 
                "Commission", 
                "Investment Yields", 
                "Accounting")
                NULL DEFAULT NULL  
                '
            );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('
            ALTER TABLE transactions 
            MODIFY category 
            ENUM(
                "Transactions", 
                "Recurring Bills", 
                "Personnel", 
                "Food", 
                "Supplies", 
                "Credit Card", 
                "Office Equipment", 
                "Construction", 
                "Office Maintenance", 
                "One-off Bills", 
                "Subscriptions income", 
                "Chargeback", 
                "Commission")
                NULL DEFAULT NULL'
            );
    }
};
