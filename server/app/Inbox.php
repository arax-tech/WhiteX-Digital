<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inbox extends Model
{
    protected $table =  'inbox';
    protected $fillable =[
        'user_id',
        'notification',
        'type',
        'from',
        'to'
    ];
}
