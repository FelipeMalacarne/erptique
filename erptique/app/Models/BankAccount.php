<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'bank_id',
        'account_type'
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'account_id', 'account_id');
    }

    public function ledgerBalance()
    {
        return $this->hasOne(LedgerBalance::class, 'account_id', 'account_id');
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
