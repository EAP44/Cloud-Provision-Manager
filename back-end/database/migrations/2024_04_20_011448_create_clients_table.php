<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id('client_id');
            $table->string('name');
            $table->string('email');
            $table->string('phone_number');
            $table->string('company');
            $table->string('address');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('clients');
    }
};