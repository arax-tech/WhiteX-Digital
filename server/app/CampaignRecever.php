<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CampaignRecever extends Model
{
    protected $table =  'campaign_recevers';
    protected $fillable =[
        'status',
        'recever',
        'campaign_id',
        'error_code'
    ];
}
