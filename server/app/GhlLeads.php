<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GhlLeads extends Model
{
    protected $table =  'ghl_contacts';
    protected $fillable = [
        'c_id',
        'locationId',
        'contactName',
        'firstName',
        'lastName',
        'companyName',
        'email',
        'phone',
        'dnd',
        'type',
        'source',
        'assignedTo',
        'city',
        'state',
        'postalCode',
        'address1',
        'dateAdded',
        'dateUpdated',
        'dateOfBirth',
        'tags',
        'country',
        'timezone',
        'website',
    ];
}
