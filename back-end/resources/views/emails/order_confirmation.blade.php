<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body>
    <h2>Order Confirmation</h2>
    <p>Dear Customer,</p>
    
    <p>Your order has been successfully placed. Below are the details:</p>

    <table style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Product Code</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orderDetails as $detail)
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">{{ $detail['product_name'] }}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">{{ $detail['product_code'] }}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">{{ $detail['quantity'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <p>Thank you for your order.</p>

    <p>Regards,<br>Your Company Name</p>
</body>
</html>

