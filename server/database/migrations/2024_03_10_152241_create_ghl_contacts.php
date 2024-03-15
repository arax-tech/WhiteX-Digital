<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGhlContacts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ghl_contacts', function (Blueprint $table) {
            $table->id();
            $table->string('c_id');
            $table->string('locationId');
            $table->string('contactName');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('companyName')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->boolean('dnd');
            $table->string('type');
            $table->string('source')->nullable();
            $table->string('assignedTo')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('postalCode')->nullable();
            $table->string('address1')->nullable();
            $table->dateTime('dateAdded');
            $table->dateTime('dateUpdated');
            $table->date('dateOfBirth')->nullable();
            $table->json('tags')->nullable();
            $table->string('country');
            $table->string('timezone');
            $table->string('website')->nullable();
            $table->json('custom_field')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ghl_contacts');
    }
}
