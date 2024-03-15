<?php

namespace App\Http\Controllers\Api\Commerce;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Codexshaper\WooCommerce\Facades\Order;
use Codexshaper\WooCommerce\Facades\Report;
use Codexshaper\WooCommerce\Facades\Product;
use Codexshaper\WooCommerce\Facades\Category;
use Illuminate\Support\Collection;
use Codexshaper\WooCommerce\Facades\WooCommerce;

class WoocommerceController extends Controller
{
    public function total_order(){
        $orders = Order::where('status','completed')->get();
        return response()->json([
            'total' => $orders->sum('total'),
        ], 200);
    }
    public function average_value(){
        $orders = Order::where('status','completed')->get();
        $total_sum= $orders->sum('total');
        $total_num= $orders->count();
        return response()->json([
            'average value' => $total_sum / $total_num,
        ], 200);
    }
    public function top_seller(){
        $products = Product::all();
        $productWithHighestOrders = null;
        $highestOrderCount = 0;
        $productWithHighestOrders = $products[0];
        foreach ($products as $product) {
            if ($product->total_sales > $highestOrderCount) {
                $highestOrderCount = $product->total_sales ;
                $productWithHighestOrders = $product;
            }
        }
        return response()->json([
            'top_seller' => $productWithHighestOrders,
        ], 200);
    }
    public function churn(){
        $products = Product::where('type','subscription')->get();
        dd($products);

        
        return response()->json([
            'top_seller' => $productWithHighestOrders,
        ], 200);
    }
    public function catagory_sale($startDate, $endDate){
        $categories = Category::all();

        $categorySales = [];
        // Loop through each category
        foreach ($categories as $category) {
            // Retrieve orders within the date range for this category
            $startDate = date('Y-m-d\TH:i:s', strtotime('2024-01-01'));
            $endDate = date('Y-m-d\TH:i:s', strtotime('2024-03-01'));
            $orders = Order::all(['after' => $startDate, 'before' => $endDate, 'category' => $category->id]);

            // Calculate total sales for this category
            $totalSales = 0;
            foreach ($orders as $order) {
                foreach ($order->line_items as $item) {
                    $totalSales += $item->total;
                }
            }

            // Add category sales to the result array
            $categorySales[] = [
                'category_name' => $category->name,
                'total_sales' => $totalSales,
            ];
        }

        return $categorySales;
    }
}
