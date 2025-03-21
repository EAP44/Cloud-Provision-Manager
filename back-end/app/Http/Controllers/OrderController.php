<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use App\Mail\OrderConfirmation;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'client_id' => 'required|exists:clients,client_id',
        'service_id' => 'required|exists:services,service_id',
        'order_date' => 'required|date',
        'license_expiration_date' => 'required|date',
        'note' => 'nullable|string',
        'products' => 'required|array',
        'products.*.product_id' => 'required|exists:products,product_id',
        'products.*.product_code' => 'required|string',
        'products.*.quantity' => 'required|integer|min:1',
    ]);

    $order = Order::create([
        'client_id' => $validatedData['client_id'],
        'service_id' => $validatedData['service_id'],
        'order_date' => $validatedData['order_date'],
        'license_expiration_date' => $validatedData['license_expiration_date'],
        'note' => $validatedData['note'],
    ]);
    $orderDetails = [];
    foreach ($validatedData['products'] as $productData) {
        $product = Product::where('product_id', $productData['product_id'])->first();
        $orderDetails[] = [
            'product_name' => $product->name,
            'product_code' => $productData['product_code'],
            'quantity' => $productData['quantity'],
        ];
        OrderDetail::create([
            'order_id' => $order->id,
            'product_id' => $product['product_id'],
            'product_code' => $productData['product_code'],
            'quantity' => $productData['quantity'],
        ]);
    }
    
    Mail::to('ayoubelaouadi16@gmail.com')->send(new OrderConfirmation($order, $orderDetails));

    return response()->json(['message' => 'Order created successfully'], 200);
}

}
