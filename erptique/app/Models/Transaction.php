<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_type',
        'date_posted',
        'amount',
        'FITID',
        'ref_Number',
        'memo',
        'bank_account_id'
    ];

    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class, 'account_id', 'account_id');
    }

    public static function firstOrCreate(array $attributes, array $values = [])
    {
        $instance = static::where($attributes)->first();

        if (!$instance) {
            $instance = static::create(array_merge($attributes, $values));
        }

        return $instance;
    }


}
