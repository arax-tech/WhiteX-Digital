<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InboxMessage extends Model
{
    protected $table =  'inbox_message';
    protected $fillable =[
        'body',
        'inbox_id'
    ];
}
