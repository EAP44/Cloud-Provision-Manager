<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ServiceController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [ AuthController::class,'login']);
Route::post('/logout', [ AuthController::class,'logout'])->name('logout');


Route::apiResource('/client', ClientController::class)->names([
    'index' => 'client.index',
    'store' => 'client.store',
    'show' => 'client.show',
]);


Route::apiResource('/service', ServiceController::class)->names([
    'index' => 'service.index',
    'store' => 'service.store',
    'show' => 'service.show',
]);

Route::post('/order',[ OrderController::class,'store'])->name('Send-Order');