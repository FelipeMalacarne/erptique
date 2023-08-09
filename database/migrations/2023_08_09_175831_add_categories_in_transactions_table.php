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
        Schema::table('transactions', function (Blueprint $table) {
            $table->enum('category', [
                'Transactions',
                'Recurring Bills',
                'Personnel',
                'Food',
                'Supplies',
                'Credit Card',
                'Office Equipment',
                'Construction',
                'Office Maintenance',
                'One-off Bills',
                'Subscriptions income',
                'Chargeback',
                'Commission'
            ])->after('memo')->nullable();
            $table->text('comment')->nullable()->after('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['category', 'comment']);
        });
    }
};
