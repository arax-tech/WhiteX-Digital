<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $table = 'wphm_wpforms_entries';
    protected $primaryKey = 'entry_id';
    public $timestamps = false;
}
