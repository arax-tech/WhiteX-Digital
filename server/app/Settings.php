<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    protected $table =  'settings_api';
    protected $fillable =[
        'type',
        'value',
    ];
}
