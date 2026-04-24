<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Helvetica', sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .invoice-container {
            padding: 40px;
        }

        .header {
            margin-bottom: 30px;
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 20px;
        }

        .brand {
            font-size: 28px;
            font-weight: bold;
            color: #4f46e5;
        }

        .info-table {
            width: 100%;
            margin-top: 20px;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 40px;
        }

        .items-table th {
            background: #4f46e5;
            color: white;
            padding: 12px;
            text-align: left;
            text-transform: uppercase;
            font-size: 12px;
        }

        .items-table td {
            padding: 15px;
            border-bottom: 1px solid #eee;
        }

        .summary {
            margin-top: 30px;
            float: right;
            width: 30%;
        }

        .summary div {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }

        .total {
            font-size: 18px;
            font-weight: bold;
            color: #4f46e5;
        }

        .status-paid {
            color: #059669;
            font-weight: bold;
        }

        .footer {
            margin-top: 100px;
            text-align: center;
            font-size: 11px;
            color: #999;
        }
    </style>
</head>

<body>
    <div class="invoice-container">
        <div class="header">
            <table width="100%">
                <tr>
                    <td><span class="brand">TextileHub</span></td>
                    <td align="right">
                        <h2 style="margin:0">INVOICE</h2>
                        <p style="margin:5px 0">#{{ $data['invoice_no'] }}</p>
                    </td>
                </tr>
            </table>
        </div>

        <table class="info-table">
            <tr>
                <td width="50%">
                    <strong>Billed To:</strong><br>
                    {{ $data['buyer_name'] }}<br>
                    {{ $data['address'] }}<br>
                    {{ $data['email'] }}
                </td>
                <td align="right">
                    <strong>Date Issued:</strong> {{ $data['date'] }}<br>
                    <strong>Due Date:</strong> {{ $data['due_date'] }}<br>
                    <strong>Status:</strong> <span class="status-paid">{{ $data['status'] }}</span>
                </td>
            </tr>
        </table>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th align="center">Quantity</th>
                    <th align="right">Unit Price</th>
                    <th align="right">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $data['product_name'] }}</td>
                    <td align="center">{{ $data['qty'] }} Pcs</td>
                    <td align="right">${{ number_format($data['total_amount'] / $data['qty'], 2) }}</td>
                    <td align="right">${{ number_format($data['total_amount'], 2) }}</td>
                </tr>
            </tbody>
        </table>

        <div class="summary">
            <div>Subtotal: <span style="float:right">${{ number_format($data['sub_total'], 2) }}</span></div>
            <div>Tax (5%): <span style="float:right">${{ number_format($data['tax'], 2) }}</span></div>
            <div class="total">Total: <span style="float:right">${{ number_format($data['total_amount'], 2) }}</span>
            </div>
        </div>

        <div style="clear: both;"></div>
        <div class="footer">
            <p>Thank you for your business!</p>
            <p>This is a computer-generated document.</p>
        </div>
    </div>
</body>

</html>