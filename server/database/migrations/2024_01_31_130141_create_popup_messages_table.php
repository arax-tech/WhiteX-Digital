<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePopupMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('popup_messages', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id');
            $table->text('content');
            $table->string('trigger_event')->nullable();
            $table->string('visibility_start')->nullable();
            $table->string('visibility_end')->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('popup_messages');
    }
}
