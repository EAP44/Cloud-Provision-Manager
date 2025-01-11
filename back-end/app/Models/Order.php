<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable =[
        'client_id',
        'service_id',
        'order_id', 
        'order_date',  
        'license_expiration_date', 
        'note',
    ];
}
