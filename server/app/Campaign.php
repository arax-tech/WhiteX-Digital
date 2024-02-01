<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $table =  'campaigns';
    protected $fillable =[
        'title',
        'type',
        'body',
        'status',
        'user_id'
    ];
}
