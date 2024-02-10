import axios from 'axios'
import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAIL,

    CUSTOMER_REQUEST,
    CUSTOMER_SUCCESS,
    CUSTOMER_FAIL,

    UPDATE_BILLING_REQUEST,
    UPDATE_BILLING_SUCCESS,
    UPDATE_BILLING_FAIL,

    SINGLE_SUBSCRIPTION_REQUEST,
    SINGLE_SUBSCRIPTION_SUCCESS,
    SINGLE_SUBSCRIPTION_FAIL,

    CLEAR_ERRORS
} from '../../constants/Client/SubscriptionConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetSubscriptionAction = (customer_id) => async (dispatch) => {
    try {
        dispatch({ type: SUBSCRIPTION_REQUEST });
        // Get All Subscriptions
        const response = await axios.get('https://whitexdigital.com/wp-json/wc/v3/subscriptions', {
            params: {
                consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
            },
        });

        const subscriptions = response.data;
        // const subscriptions = [
        //     {
        //         "id": 2965,
        //         "parent_id": 2964,
        //         "status": "pending-cancel",
        //         "currency": "BDT",
        //         "version": "8.5.2",
        //         "prices_include_tax": false,
        //         "date_created": "2024-02-01T15:35:49",
        //         "date_modified": "2024-02-02T11:46:21",
        //         "discount_total": "0.00",
        //         "discount_tax": "0.00",
        //         "shipping_total": "0.00",
        //         "shipping_tax": "0.00",
        //         "cart_tax": "0.00",
        //         "total": "25000.00",
        //         "total_tax": "0.00",
        //         "customer_id": 45,
        //         "order_key": "wc_order_9TpXha930WB4K",
        //         "billing": {
        //             "first_name": "Arham",
        //             "last_name": "Khan",
        //             "company": "",
        //             "address_1": "Shinkiari KPK, Pakistan",
        //             "address_2": "",
        //             "city": "Shinkiari",
        //             "state": "IS",
        //             "postcode": "21140",
        //             "country": "PK",
        //             "email": "arhamkhanalone@gmail.com",
        //             "phone": "+923065831989"
        //         },
        //         "shipping": {
        //             "first_name": "Arham",
        //             "last_name": "Khan",
        //             "company": "",
        //             "address_1": "Shinkiari KPK, Pakistan",
        //             "address_2": "",
        //             "city": "Shinkiari",
        //             "state": "IS",
        //             "postcode": "21140",
        //             "country": "PK",
        //             "phone": ""
        //         },
        //         "payment_method": "aamarpay",
        //         "payment_method_title": "Online Payments",
        //         "customer_ip_address": "154.91.165.35",
        //         "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //         "created_via": "checkout",
        //         "customer_note": "",
        //         "date_completed": null,
        //         "date_paid": "2024-02-01T15:36:20",
        //         "number": "2965",
        //         "meta_data": [
        //             {
        //                 "id": 21234,
        //                 "key": "is_vat_exempt",
        //                 "value": "no"
        //             },
        //             {
        //                 "id": 21235,
        //                 "key": "_wc_order_attribution_source_type",
        //                 "value": "typein"
        //             },
        //             {
        //                 "id": 21236,
        //                 "key": "_wc_order_attribution_utm_source",
        //                 "value": "(direct)"
        //             },
        //             {
        //                 "id": 21237,
        //                 "key": "_wc_order_attribution_session_entry",
        //                 "value": "https://whitexdigital.com/checkout/order-received/2962/?key=wc_order_qAJAOyY8pSKGE"
        //             },
        //             {
        //                 "id": 21238,
        //                 "key": "_wc_order_attribution_session_start_time",
        //                 "value": "2024-02-01 15:35:04"
        //             },
        //             {
        //                 "id": 21239,
        //                 "key": "_wc_order_attribution_session_pages",
        //                 "value": "3"
        //             },
        //             {
        //                 "id": 21240,
        //                 "key": "_wc_order_attribution_session_count",
        //                 "value": "1"
        //             },
        //             {
        //                 "id": 21241,
        //                 "key": "_wc_order_attribution_user_agent",
        //                 "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //             },
        //             {
        //                 "id": 21242,
        //                 "key": "_wc_order_attribution_device_type",
        //                 "value": "Desktop"
        //             },
        //             {
        //                 "id": 21344,
        //                 "key": "end_date_pre_cancellation",
        //                 "value": "0"
        //             },
        //             {
        //                 "id": 21345,
        //                 "key": "trial_end_pre_cancellation",
        //                 "value": "0"
        //             }
        //         ],
        //         "line_items": [
        //             {
        //                 "id": 15,
        //                 "name": "Digital Marketing Bundle Tier 1: Spark",
        //                 "product_id": 2167,
        //                 "variation_id": 0,
        //                 "quantity": 1,
        //                 "tax_class": "",
        //                 "subtotal": "25000.00",
        //                 "subtotal_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "taxes": [],
        //                 "meta_data": [],
        //                 "sku": "",
        //                 "price": 25000,
        //                 "image": {
        //                     "id": "",
        //                     "src": ""
        //                 },
        //                 "parent_name": null
        //             }
        //         ],
        //         "tax_lines": [],
        //         "shipping_lines": [],
        //         "fee_lines": [],
        //         "coupon_lines": [],
        //         "payment_url": "https://whitexdigital.com/checkout/order-pay/2965/?pay_for_order=true&key=wc_order_9TpXha930WB4K",
        //         "is_editable": true,
        //         "needs_payment": false,
        //         "needs_processing": true,
        //         "date_created_gmt": "2024-02-01T15:35:49",
        //         "date_modified_gmt": "2024-02-02T11:46:21",
        //         "date_completed_gmt": null,
        //         "date_paid_gmt": "2024-02-01T15:36:20",
        //         "billing_period": "month",
        //         "billing_interval": "1",
        //         "start_date_gmt": "2024-02-04T05:58:11",
        //         "trial_end_date_gmt": "",
        //         "next_payment_date_gmt": "",
        //         "payment_retry_date_gmt": "",
        //         "last_payment_date_gmt": "2024-02-01T15:35:49",
        //         "cancelled_date_gmt": "2024-02-02T11:46:21",
        //         "end_date_gmt": "2024-03-01T15:35:49",
        //         "resubscribed_from": "",
        //         "resubscribed_subscription": "",
        //         "removed_line_items": [],
        //         "_links": {
        //             "self": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/subscriptions/2965"
        //                 }
        //             ],
        //             "collection": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/subscriptions"
        //                 }
        //             ],
        //             "customer": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/customers/45"
        //                 }
        //             ],
        //             "up": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2964"
        //                 }
        //             ]
        //         },
        //         "user": {
        //             "id": 45,
        //             "date_created": "2024-02-01T15:35:48",
        //             "date_created_gmt": "2024-02-01T15:35:48",
        //             "date_modified": "2024-02-01T15:36:21",
        //             "date_modified_gmt": "2024-02-01T15:36:21",
        //             "email": "arhamkhanalone@gmail.com",
        //             "first_name": "Arham",
        //             "last_name": "Khan",
        //             "role": "subscriber",
        //             "username": "arhamkhanalone@gmail.com",
        //             "billing": {
        //                 "first_name": "Arham",
        //                 "last_name": "Khan",
        //                 "company": "",
        //                 "address_1": "Shinkiari KPK, Pakistan",
        //                 "address_2": "",
        //                 "city": "Shinkiari",
        //                 "postcode": "21140",
        //                 "country": "PK",
        //                 "state": "IS",
        //                 "email": "arhamkhanalone@gmail.com",
        //                 "phone": "+923065831989"
        //             },
        //             "shipping": {
        //                 "first_name": "Arham",
        //                 "last_name": "Khan",
        //                 "company": "",
        //                 "address_1": "Shinkiari KPK, Pakistan",
        //                 "address_2": "",
        //                 "city": "Shinkiari",
        //                 "postcode": "21140",
        //                 "country": "PK",
        //                 "state": "IS",
        //                 "phone": ""
        //             },
        //             "is_paying_customer": true,
        //             "avatar_url": "https://secure.gravatar.com/avatar/e47cc51aa65880a6b07e985aa151eac8?s=96&d=mm&r=g",
        //             "meta_data": [
        //                 {
        //                     "id": 1656,
        //                     "key": "_wc_order_attribution_source_type",
        //                     "value": "typein"
        //                 },
        //                 {
        //                     "id": 1657,
        //                     "key": "_wc_order_attribution_utm_source",
        //                     "value": "(direct)"
        //                 },
        //                 {
        //                     "id": 1658,
        //                     "key": "_wc_order_attribution_session_entry",
        //                     "value": "https://whitexdigital.com/checkout/order-received/2962/?key=wc_order_qAJAOyY8pSKGE"
        //                 },
        //                 {
        //                     "id": 1659,
        //                     "key": "_wc_order_attribution_session_start_time",
        //                     "value": "2024-02-01 15:35:04"
        //                 },
        //                 {
        //                     "id": 1660,
        //                     "key": "_wc_order_attribution_session_pages",
        //                     "value": "3"
        //                 },
        //                 {
        //                     "id": 1661,
        //                     "key": "_wc_order_attribution_session_count",
        //                     "value": "1"
        //                 },
        //                 {
        //                     "id": 1662,
        //                     "key": "_wc_order_attribution_user_agent",
        //                     "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                 },
        //                 {
        //                     "id": 1663,
        //                     "key": "_wc_order_attribution_device_type",
        //                     "value": "Desktop"
        //                 },
        //                 {
        //                     "id": 1664,
        //                     "key": "_wcs_subscription_ids_cache",
        //                     "value": [
        //                         2965
        //                     ]
        //                 },
        //                 {
        //                     "id": 1683,
        //                     "key": "shipping_method",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 1684,
        //                     "key": "wc_last_active",
        //                     "value": "1706745600"
        //                 }
        //             ],
        //             "_links": {
        //                 "self": [
        //                     {
        //                         "href": "https://whitexdigital.com/wp-json/wc/v3/customers/45"
        //                     }
        //                 ],
        //                 "collection": [
        //                     {
        //                         "href": "https://whitexdigital.com/wp-json/wc/v3/customers"
        //                     }
        //                 ]
        //             }
        //         },
        //         "orders": [
        //             {
        //                 "id": 2964,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T15:35:49",
        //                 "date_modified": "2024-02-01T15:36:20",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 45,
        //                 "order_key": "wc_order_YYUn69isw4eWK",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "IS",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhanalone@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "IS",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T15:36:20",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2964",
        //                 "meta_data": [
        //                     {
        //                         "id": 21174,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 21175,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 21176,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 21177,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/checkout/order-received/2962/?key=wc_order_qAJAOyY8pSKGE"
        //                     },
        //                     {
        //                         "id": 21178,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 15:35:04"
        //                     },
        //                     {
        //                         "id": 21179,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "3"
        //                     },
        //                     {
        //                         "id": 21180,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 21181,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 21182,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 14,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2964/?pay_for_order=true&key=wc_order_YYUn69isw4eWK",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T15:35:49",
        //                 "date_modified_gmt": "2024-02-01T15:36:20",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T15:36:20",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2964"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/45"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2962,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T15:17:11",
        //                 "date_modified": "2024-02-01T15:17:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 44,
        //                 "order_key": "wc_order_qAJAOyY8pSKGE",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhanalone@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T15:17:31",
        //                 "cart_hash": "543f3d1818168e0eddc74caf5d471f1a",
        //                 "number": "2962",
        //                 "meta_data": [
        //                     {
        //                         "id": 21059,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 21060,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 21061,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 21062,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/cart/"
        //                     },
        //                     {
        //                         "id": 21063,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 14:26:22"
        //                     },
        //                     {
        //                         "id": 21064,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "2"
        //                     },
        //                     {
        //                         "id": 21065,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "2"
        //                     },
        //                     {
        //                         "id": 21066,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 21067,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 12,
        //                         "name": "Digital Marketing Bundle Tier 2: Elevate",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2962/?pay_for_order=true&key=wc_order_qAJAOyY8pSKGE",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T15:17:11",
        //                 "date_modified_gmt": "2024-02-01T15:17:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T15:17:31",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2962"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2960,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T14:33:54",
        //                 "date_modified": "2024-02-01T14:34:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 44,
        //                 "order_key": "wc_order_lO8vMJnhgG1xo",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhaninnocent@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T14:34:31",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2960",
        //                 "meta_data": [
        //                     {
        //                         "id": 20932,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20933,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 20934,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 20935,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/cart/"
        //                     },
        //                     {
        //                         "id": 20936,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 14:26:22"
        //                     },
        //                     {
        //                         "id": 20937,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "4"
        //                     },
        //                     {
        //                         "id": 20938,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 20939,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20940,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 10,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2960/?pay_for_order=true&key=wc_order_lO8vMJnhgG1xo",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T14:33:54",
        //                 "date_modified_gmt": "2024-02-01T14:34:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T14:34:31",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2960"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2959,
        //                 "parent_id": 0,
        //                 "status": "pending",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T11:30:04",
        //                 "date_modified": "2024-02-01T14:48:09",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "259.99",
        //                 "total_tax": "0.00",
        //                 "customer_id": 1,
        //                 "order_key": "wc_order_f68Fo5XtpIez8",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "admin@whitexdigital.com",
        //                     "phone": "01827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "91ad31c6b9c9a3a498e14390cfb9c8ef",
        //                 "number": "2959",
        //                 "meta_data": [
        //                     {
        //                         "id": 20876,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20877,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20878,
        //                         "key": "_wc_order_attribution_referrer",
        //                         "value": "https://business95.web-hosting.com:2083/"
        //                     },
        //                     {
        //                         "id": 20879,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "business95.web-hosting.com"
        //                     },
        //                     {
        //                         "id": 20880,
        //                         "key": "_wc_order_attribution_utm_medium",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20881,
        //                         "key": "_wc_order_attribution_utm_content",
        //                         "value": "/"
        //                     },
        //                     {
        //                         "id": 20882,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/"
        //                     },
        //                     {
        //                         "id": 20883,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-01-30 12:34:52"
        //                     },
        //                     {
        //                         "id": 20884,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 20885,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "47"
        //                     },
        //                     {
        //                         "id": 20886,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20887,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 9,
        //                         "name": "Furface Headphones",
        //                         "product_id": 2739,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "259.99",
        //                         "subtotal_tax": "0.00",
        //                         "total": "259.99",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "furface-headphones",
        //                         "price": 259.99,
        //                         "image": {
        //                             "id": "2149",
        //                             "src": "https://whitexdigital.com/wp-content/uploads/2020/06/shop_02-1-1.jpg"
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2959/?pay_for_order=true&key=wc_order_f68Fo5XtpIez8",
        //                 "is_editable": true,
        //                 "needs_payment": true,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T11:30:04",
        //                 "date_modified_gmt": "2024-02-01T14:48:09",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2959"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2957,
        //                 "parent_id": 0,
        //                 "status": "completed",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T10:26:05",
        //                 "date_modified": "2024-02-01T14:56:00",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 1,
        //                 "order_key": "wc_order_lHSR9s5iYAM6k",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "admin@whitexdigital.com",
        //                     "phone": "01827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": "2024-02-01T14:56:00",
        //                 "date_paid": "2024-02-01T14:56:00",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2957",
        //                 "meta_data": [
        //                     {
        //                         "id": 20748,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20749,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20750,
        //                         "key": "_wc_order_attribution_referrer",
        //                         "value": "https://business95.web-hosting.com:2083/"
        //                     },
        //                     {
        //                         "id": 20751,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "business95.web-hosting.com"
        //                     },
        //                     {
        //                         "id": 20752,
        //                         "key": "_wc_order_attribution_utm_medium",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20753,
        //                         "key": "_wc_order_attribution_utm_content",
        //                         "value": "/"
        //                     },
        //                     {
        //                         "id": 20754,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/"
        //                     },
        //                     {
        //                         "id": 20755,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-01-30 12:34:52"
        //                     },
        //                     {
        //                         "id": 20756,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "42"
        //                     },
        //                     {
        //                         "id": 20757,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "46"
        //                     },
        //                     {
        //                         "id": 20758,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20759,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 7,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2957/?pay_for_order=true&key=wc_order_lHSR9s5iYAM6k",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T10:26:05",
        //                 "date_modified_gmt": "2024-02-01T14:56:00",
        //                 "date_completed_gmt": "2024-02-01T14:56:00",
        //                 "date_paid_gmt": "2024-02-01T14:56:00",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2957"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2941,
        //                 "parent_id": 0,
        //                 "status": "refunded",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T09:23:37",
        //                 "date_modified": "2024-02-01T09:50:29",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "6000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 42,
        //                 "order_key": "wc_order_l1O3A1x6V9SaM",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "Arax.co",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "Test",
        //                     "city": "Shinkiari",
        //                     "state": "KPK",
        //                     "postcode": "21140",
        //                     "country": "",
        //                     "email": "milton0406rahman@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "Bryant and Kim Co",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "TT",
        //                     "city": "Shinkiari",
        //                     "state": "KPK",
        //                     "postcode": "21140",
        //                     "country": "",
        //                     "phone": "+923065831989"
        //                 },
        //                 "payment_method": "",
        //                 "payment_method_title": "",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "",
        //                 "customer_user_agent": "",
        //                 "created_via": "admin",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "",
        //                 "number": "2941",
        //                 "meta_data": [
        //                     {
        //                         "id": 20609,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "admin"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 6,
        //                         "name": "Testing item 1",
        //                         "product_id": 2940,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "6000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "6000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 6000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [
        //                     {
        //                         "id": 2944,
        //                         "reason": "Order fully refunded.",
        //                         "total": "-6000.00"
        //                     }
        //                 ],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2941/?pay_for_order=true&key=wc_order_l1O3A1x6V9SaM",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T09:23:37",
        //                 "date_modified_gmt": "2024-02-01T09:50:29",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2941"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2936,
        //                 "parent_id": 0,
        //                 "status": "pending",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-01-31T13:44:43",
        //                 "date_modified": "2024-02-01T09:15:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 42,
        //                 "order_key": "wc_order_1rWvVVn4HAZ3a",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Rahman",
        //                     "company": "Whitex Digital",
        //                     "address_1": "dhanmondi 15",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "riazrahman0406@gmail.com",
        //                     "phone": "+8801827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Rahman",
        //                     "company": "Whitex Digital",
        //                     "address_1": "dhanmondi 15",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": "+8801827196111"
        //                 },
        //                 "payment_method": "",
        //                 "payment_method_title": "",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "subscription",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "",
        //                 "number": "2936",
        //                 "meta_data": [
        //                     {
        //                         "id": 19598,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "admin"
        //                     },
        //                     {
        //                         "id": 19617,
        //                         "key": "_subscription_renewal",
        //                         "value": "2935"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 5,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2936/?pay_for_order=true&key=wc_order_1rWvVVn4HAZ3a&subscription_renewal=true",
        //                 "is_editable": true,
        //                 "needs_payment": true,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-01-31T13:44:43",
        //                 "date_modified_gmt": "2024-02-01T09:15:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2936"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2494,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-07T14:51:54",
        //                 "date_modified": "2023-12-07T14:52:10",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 0,
        //                 "order_key": "wc_order_Ngelmj2ThZ0z5",
        //                 "billing": {
        //                     "first_name": "aaaa",
        //                     "last_name": "aaaa",
        //                     "company": "",
        //                     "address_1": "hashfjaksdfjk",
        //                     "address_2": "",
        //                     "city": "asjdfasjhk",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "aaaaaaaaaaa@aaa.aaa",
        //                     "phone": "123467890"
        //                 },
        //                 "shipping": {
        //                     "first_name": "aaaa",
        //                     "last_name": "aaaa",
        //                     "company": "",
        //                     "address_1": "hashfjaksdfjk",
        //                     "address_2": "",
        //                     "city": "asjdfasjhk",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-07T14:52:10",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2494",
        //                 "meta_data": [
        //                     {
        //                         "id": 9199,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 3,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2494/?pay_for_order=true&key=wc_order_Ngelmj2ThZ0z5",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-07T14:51:54",
        //                 "date_modified_gmt": "2023-12-07T14:52:10",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-07T14:52:10",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2494"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2345,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-01T13:37:47",
        //                 "date_modified": "2023-12-01T13:38:20",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 33,
        //                 "order_key": "wc_order_TBeSNJtOvTrmz",
        //                 "billing": {
        //                     "first_name": "ascdas",
        //                     "last_name": "asdcas",
        //                     "company": "",
        //                     "address_1": "adascdas",
        //                     "address_2": "",
        //                     "city": "asdcas",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "a@a.caa",
        //                     "phone": "097654"
        //                 },
        //                 "shipping": {
        //                     "first_name": "ascdas",
        //                     "last_name": "asdcas",
        //                     "company": "",
        //                     "address_1": "adascdas",
        //                     "address_2": "",
        //                     "city": "asdcas",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-01T13:38:20",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2345",
        //                 "meta_data": [
        //                     {
        //                         "id": 8858,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 2,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2345/?pay_for_order=true&key=wc_order_TBeSNJtOvTrmz",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-01T13:37:47",
        //                 "date_modified_gmt": "2023-12-01T13:38:20",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-01T13:38:20",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2345"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/33"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2344,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-01T13:31:43",
        //                 "date_modified": "2023-12-01T13:32:04",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 0,
        //                 "order_key": "wc_order_zzUaYs3oIQliY",
        //                 "billing": {
        //                     "first_name": "sadcas",
        //                     "last_name": "adcasd",
        //                     "company": "",
        //                     "address_1": "asdcasdc",
        //                     "address_2": "",
        //                     "city": "asdcasdc",
        //                     "state": "AR",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "ASDFASsF@JSHFAJK.COM",
        //                     "phone": "2323"
        //                 },
        //                 "shipping": {
        //                     "first_name": "sadcas",
        //                     "last_name": "adcasd",
        //                     "company": "",
        //                     "address_1": "asdcasdc",
        //                     "address_2": "",
        //                     "city": "asdcasdc",
        //                     "state": "AR",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-01T13:32:04",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2344",
        //                 "meta_data": [
        //                     {
        //                         "id": 8815,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 1,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2344/?pay_for_order=true&key=wc_order_zzUaYs3oIQliY",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-01T13:31:43",
        //                 "date_modified_gmt": "2023-12-01T13:32:04",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-01T13:32:04",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2344"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ]
        //                 }
        //             }
        //         ]
        //     },
        //     {
        //         "id": 2961,
        //         "parent_id": 2960,
        //         "status": "on-hold",
        //         "currency": "BDT",
        //         "version": "8.5.2",
        //         "prices_include_tax": false,
        //         "date_created": "2024-02-01T14:33:54",
        //         "date_modified": "2024-02-02T11:45:15",
        //         "discount_total": "0.00",
        //         "discount_tax": "0.00",
        //         "shipping_total": "0.00",
        //         "shipping_tax": "0.00",
        //         "cart_tax": "0.00",
        //         "total": "25000.00",
        //         "total_tax": "0.00",
        //         "customer_id": 44,
        //         "order_key": "wc_order_PfKiQ6xrUbHl5",
        //         "billing": {
        //             "first_name": "Arham",
        //             "last_name": "Khan",
        //             "company": "",
        //             "address_1": "Shinkiari KPK, Pakistan",
        //             "address_2": "",
        //             "city": "Shinkiari",
        //             "state": "KP",
        //             "postcode": "21140",
        //             "country": "PK",
        //             "email": "arhamkhaninnocent@gmail.com",
        //             "phone": "+923065831989"
        //         },
        //         "shipping": {
        //             "first_name": "Arham",
        //             "last_name": "Khan",
        //             "company": "",
        //             "address_1": "Shinkiari KPK, Pakistan",
        //             "address_2": "",
        //             "city": "Shinkiari",
        //             "state": "KP",
        //             "postcode": "21140",
        //             "country": "PK",
        //             "phone": ""
        //         },
        //         "payment_method": "aamarpay",
        //         "payment_method_title": "Online Payments",
        //         "customer_ip_address": "154.91.165.35",
        //         "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //         "created_via": "checkout",
        //         "customer_note": "",
        //         "date_completed": null,
        //         "date_paid": "2024-02-01T14:34:31",
        //         "number": "2961",
        //         "meta_data": [
        //             {
        //                 "id": 20992,
        //                 "key": "is_vat_exempt",
        //                 "value": "no"
        //             },
        //             {
        //                 "id": 20993,
        //                 "key": "_wc_order_attribution_source_type",
        //                 "value": "typein"
        //             },
        //             {
        //                 "id": 20994,
        //                 "key": "_wc_order_attribution_utm_source",
        //                 "value": "(direct)"
        //             },
        //             {
        //                 "id": 20995,
        //                 "key": "_wc_order_attribution_session_entry",
        //                 "value": "https://whitexdigital.com/cart/"
        //             },
        //             {
        //                 "id": 20996,
        //                 "key": "_wc_order_attribution_session_start_time",
        //                 "value": "2024-02-01 14:26:22"
        //             },
        //             {
        //                 "id": 20997,
        //                 "key": "_wc_order_attribution_session_pages",
        //                 "value": "4"
        //             },
        //             {
        //                 "id": 20998,
        //                 "key": "_wc_order_attribution_session_count",
        //                 "value": "1"
        //             },
        //             {
        //                 "id": 20999,
        //                 "key": "_wc_order_attribution_user_agent",
        //                 "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //             },
        //             {
        //                 "id": 21000,
        //                 "key": "_wc_order_attribution_device_type",
        //                 "value": "Desktop"
        //             }
        //         ],
        //         "line_items": [
        //             {
        //                 "id": 11,
        //                 "name": "Digital Marketing Bundle Tier 2: Elevate",
        //                 "product_id": 2235,
        //                 "variation_id": 0,
        //                 "quantity": 1,
        //                 "tax_class": "",
        //                 "subtotal": "25000.00",
        //                 "subtotal_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "taxes": [],
        //                 "meta_data": [],
        //                 "sku": "",
        //                 "price": 25000,
        //                 "image": {
        //                     "id": "",
        //                     "src": ""
        //                 },
        //                 "parent_name": null
        //             }
        //         ],
        //         "tax_lines": [],
        //         "shipping_lines": [],
        //         "fee_lines": [],
        //         "coupon_lines": [],
        //         "payment_url": "https://whitexdigital.com/checkout/order-pay/2961/?pay_for_order=true&key=wc_order_PfKiQ6xrUbHl5",
        //         "is_editable": true,
        //         "needs_payment": false,
        //         "needs_processing": true,
        //         "date_created_gmt": "2024-02-01T14:33:54",
        //         "date_modified_gmt": "2024-02-02T11:45:15",
        //         "date_completed_gmt": null,
        //         "date_paid_gmt": "2024-02-01T14:34:31",
        //         "billing_period": "month",
        //         "billing_interval": "1",
        //         "start_date_gmt": "2024-02-03T07:35:19",
        //         "trial_end_date_gmt": "",
        //         "next_payment_date_gmt": "2024-03-01T14:33:54",
        //         "payment_retry_date_gmt": "",
        //         "last_payment_date_gmt": "2024-02-01T14:33:54",
        //         "cancelled_date_gmt": "",
        //         "end_date_gmt": "",
        //         "resubscribed_from": "",
        //         "resubscribed_subscription": "",
        //         "removed_line_items": [],
        //         "_links": {
        //             "self": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/subscriptions/2961"
        //                 }
        //             ],
        //             "collection": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/subscriptions"
        //                 }
        //             ],
        //             "customer": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                 }
        //             ],
        //             "up": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2960"
        //                 }
        //             ]
        //         },
        //         "user": {
        //             "id": 44,
        //             "date_created": "2024-01-31T14:38:39",
        //             "date_created_gmt": "2024-01-31T14:38:39",
        //             "date_modified": "2024-02-01T15:17:11",
        //             "date_modified_gmt": "2024-02-01T15:17:11",
        //             "email": "arhamkhaninnocent@gmail.com",
        //             "first_name": "Arham",
        //             "last_name": "Khan",
        //             "role": "administrator",
        //             "username": "Arham Khan",
        //             "billing": {
        //                 "first_name": "Arham",
        //                 "last_name": "Khan",
        //                 "company": "",
        //                 "address_1": "Shinkiari KPK, Pakistan",
        //                 "address_2": "",
        //                 "city": "Shinkiari",
        //                 "postcode": "21140",
        //                 "country": "PK",
        //                 "state": "KP",
        //                 "email": "arhamkhanalone@gmail.com",
        //                 "phone": "+923065831989"
        //             },
        //             "shipping": {
        //                 "first_name": "Arham",
        //                 "last_name": "Khan",
        //                 "company": "",
        //                 "address_1": "Shinkiari KPK, Pakistan",
        //                 "address_2": "",
        //                 "city": "Shinkiari",
        //                 "postcode": "21140",
        //                 "country": "PK",
        //                 "state": "KP",
        //                 "phone": ""
        //             },
        //             "is_paying_customer": true,
        //             "avatar_url": "https://secure.gravatar.com/avatar/0b7ced351d30a73903a4d8b021160265?s=96&d=mm&r=g",
        //             "meta_data": [
        //                 {
        //                     "id": 1556,
        //                     "key": "_wcs_subscription_ids_cache",
        //                     "value": [
        //                         2963,
        //                         2961
        //                     ]
        //                 },
        //                 {
        //                     "id": 1559,
        //                     "key": "default_password_nag",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 1561,
        //                     "key": "wc_last_active",
        //                     "value": "1706918400"
        //                 },
        //                 {
        //                     "id": 1566,
        //                     "key": "community-events-location",
        //                     "value": {
        //                         "ip": "154.198.91.0"
        //                     }
        //                 },
        //                 {
        //                     "id": 1567,
        //                     "key": "elementor_admin_notices",
        //                     "value": {
        //                         "experiment_promotion": {
        //                             "is_viewed": true,
        //                             "meta": []
        //                         },
        //                         "design_not_appearing": {
        //                             "is_viewed": false,
        //                             "meta": {
        //                                 "version": "3.18.3"
        //                             }
        //                         }
        //                     }
        //                 },
        //                 {
        //                     "id": 1568,
        //                     "key": "wpforms_overview_table_columns",
        //                     "value": {
        //                         "1": "name",
        //                         "2": "tags",
        //                         "3": "author",
        //                         "4": "shortcode",
        //                         "5": "created",
        //                         "6": "entries",
        //                         "7": "locations"
        //                     }
        //                 },
        //                 {
        //                     "id": 1593,
        //                     "key": "meta-box-order_product",
        //                     "value": {
        //                         "side": "submitdiv,postimagediv,woocommerce-product-images,product_catdiv,tagsdiv-product_tag",
        //                         "normal": "woocommerce-product-data,postcustom,slugdiv,postexcerpt",
        //                         "advanced": ""
        //                     }
        //                 },
        //                 {
        //                     "id": 1594,
        //                     "key": "wpforms_dismissed",
        //                     "value": {
        //                         "edu-admin-geolocation-metabox": 1706771639
        //                     }
        //                 },
        //                 {
        //                     "id": 1619,
        //                     "key": "shipping_method",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 1686,
        //                     "key": "meta-box-order_dashboard",
        //                     "value": {
        //                         "normal": "wc_admin_dashboard_setup,sq_dashboard_widget,e-dashboard-overview,dashboard_site_health,dashboard_right_now,dashboard_activity,wp-dashboard-widget-news,simple_history_dashboard_widget",
        //                         "side": "dashboard_quick_press",
        //                         "column3": "wpforms_reports_widget_pro",
        //                         "column4": "dashboard_primary"
        //                     }
        //                 }
        //             ],
        //             "_links": {
        //                 "self": [
        //                     {
        //                         "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                     }
        //                 ],
        //                 "collection": [
        //                     {
        //                         "href": "https://whitexdigital.com/wp-json/wc/v3/customers"
        //                     }
        //                 ]
        //             }
        //         },
        //         "orders": [
        //             {
        //                 "id": 2964,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T15:35:49",
        //                 "date_modified": "2024-02-01T15:36:20",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 45,
        //                 "order_key": "wc_order_YYUn69isw4eWK",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "IS",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhanalone@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "IS",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T15:36:20",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2964",
        //                 "meta_data": [
        //                     {
        //                         "id": 21174,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 21175,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 21176,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 21177,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/checkout/order-received/2962/?key=wc_order_qAJAOyY8pSKGE"
        //                     },
        //                     {
        //                         "id": 21178,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 15:35:04"
        //                     },
        //                     {
        //                         "id": 21179,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "3"
        //                     },
        //                     {
        //                         "id": 21180,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 21181,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 21182,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 14,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2964/?pay_for_order=true&key=wc_order_YYUn69isw4eWK",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T15:35:49",
        //                 "date_modified_gmt": "2024-02-01T15:36:20",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T15:36:20",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2964"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/45"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2962,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T15:17:11",
        //                 "date_modified": "2024-02-01T15:17:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 44,
        //                 "order_key": "wc_order_qAJAOyY8pSKGE",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhanalone@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T15:17:31",
        //                 "cart_hash": "543f3d1818168e0eddc74caf5d471f1a",
        //                 "number": "2962",
        //                 "meta_data": [
        //                     {
        //                         "id": 21059,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 21060,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 21061,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 21062,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/cart/"
        //                     },
        //                     {
        //                         "id": 21063,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 14:26:22"
        //                     },
        //                     {
        //                         "id": 21064,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "2"
        //                     },
        //                     {
        //                         "id": 21065,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "2"
        //                     },
        //                     {
        //                         "id": 21066,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 21067,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 12,
        //                         "name": "Digital Marketing Bundle Tier 2: Elevate",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2962/?pay_for_order=true&key=wc_order_qAJAOyY8pSKGE",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T15:17:11",
        //                 "date_modified_gmt": "2024-02-01T15:17:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T15:17:31",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2962"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2960,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T14:33:54",
        //                 "date_modified": "2024-02-01T14:34:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 44,
        //                 "order_key": "wc_order_lO8vMJnhgG1xo",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhaninnocent@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T14:34:31",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2960",
        //                 "meta_data": [
        //                     {
        //                         "id": 20932,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20933,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 20934,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 20935,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/cart/"
        //                     },
        //                     {
        //                         "id": 20936,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 14:26:22"
        //                     },
        //                     {
        //                         "id": 20937,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "4"
        //                     },
        //                     {
        //                         "id": 20938,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 20939,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20940,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 10,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2960/?pay_for_order=true&key=wc_order_lO8vMJnhgG1xo",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T14:33:54",
        //                 "date_modified_gmt": "2024-02-01T14:34:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T14:34:31",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2960"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2959,
        //                 "parent_id": 0,
        //                 "status": "pending",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T11:30:04",
        //                 "date_modified": "2024-02-01T14:48:09",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "259.99",
        //                 "total_tax": "0.00",
        //                 "customer_id": 1,
        //                 "order_key": "wc_order_f68Fo5XtpIez8",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "admin@whitexdigital.com",
        //                     "phone": "01827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "91ad31c6b9c9a3a498e14390cfb9c8ef",
        //                 "number": "2959",
        //                 "meta_data": [
        //                     {
        //                         "id": 20876,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20877,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20878,
        //                         "key": "_wc_order_attribution_referrer",
        //                         "value": "https://business95.web-hosting.com:2083/"
        //                     },
        //                     {
        //                         "id": 20879,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "business95.web-hosting.com"
        //                     },
        //                     {
        //                         "id": 20880,
        //                         "key": "_wc_order_attribution_utm_medium",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20881,
        //                         "key": "_wc_order_attribution_utm_content",
        //                         "value": "/"
        //                     },
        //                     {
        //                         "id": 20882,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/"
        //                     },
        //                     {
        //                         "id": 20883,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-01-30 12:34:52"
        //                     },
        //                     {
        //                         "id": 20884,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 20885,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "47"
        //                     },
        //                     {
        //                         "id": 20886,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20887,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 9,
        //                         "name": "Furface Headphones",
        //                         "product_id": 2739,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "259.99",
        //                         "subtotal_tax": "0.00",
        //                         "total": "259.99",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "furface-headphones",
        //                         "price": 259.99,
        //                         "image": {
        //                             "id": "2149",
        //                             "src": "https://whitexdigital.com/wp-content/uploads/2020/06/shop_02-1-1.jpg"
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2959/?pay_for_order=true&key=wc_order_f68Fo5XtpIez8",
        //                 "is_editable": true,
        //                 "needs_payment": true,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T11:30:04",
        //                 "date_modified_gmt": "2024-02-01T14:48:09",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2959"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2957,
        //                 "parent_id": 0,
        //                 "status": "completed",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T10:26:05",
        //                 "date_modified": "2024-02-01T14:56:00",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 1,
        //                 "order_key": "wc_order_lHSR9s5iYAM6k",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "admin@whitexdigital.com",
        //                     "phone": "01827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": "2024-02-01T14:56:00",
        //                 "date_paid": "2024-02-01T14:56:00",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2957",
        //                 "meta_data": [
        //                     {
        //                         "id": 20748,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20749,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20750,
        //                         "key": "_wc_order_attribution_referrer",
        //                         "value": "https://business95.web-hosting.com:2083/"
        //                     },
        //                     {
        //                         "id": 20751,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "business95.web-hosting.com"
        //                     },
        //                     {
        //                         "id": 20752,
        //                         "key": "_wc_order_attribution_utm_medium",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20753,
        //                         "key": "_wc_order_attribution_utm_content",
        //                         "value": "/"
        //                     },
        //                     {
        //                         "id": 20754,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/"
        //                     },
        //                     {
        //                         "id": 20755,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-01-30 12:34:52"
        //                     },
        //                     {
        //                         "id": 20756,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "42"
        //                     },
        //                     {
        //                         "id": 20757,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "46"
        //                     },
        //                     {
        //                         "id": 20758,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20759,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 7,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2957/?pay_for_order=true&key=wc_order_lHSR9s5iYAM6k",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T10:26:05",
        //                 "date_modified_gmt": "2024-02-01T14:56:00",
        //                 "date_completed_gmt": "2024-02-01T14:56:00",
        //                 "date_paid_gmt": "2024-02-01T14:56:00",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2957"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2941,
        //                 "parent_id": 0,
        //                 "status": "refunded",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T09:23:37",
        //                 "date_modified": "2024-02-01T09:50:29",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "6000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 42,
        //                 "order_key": "wc_order_l1O3A1x6V9SaM",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "Arax.co",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "Test",
        //                     "city": "Shinkiari",
        //                     "state": "KPK",
        //                     "postcode": "21140",
        //                     "country": "",
        //                     "email": "milton0406rahman@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "Bryant and Kim Co",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "TT",
        //                     "city": "Shinkiari",
        //                     "state": "KPK",
        //                     "postcode": "21140",
        //                     "country": "",
        //                     "phone": "+923065831989"
        //                 },
        //                 "payment_method": "",
        //                 "payment_method_title": "",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "",
        //                 "customer_user_agent": "",
        //                 "created_via": "admin",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "",
        //                 "number": "2941",
        //                 "meta_data": [
        //                     {
        //                         "id": 20609,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "admin"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 6,
        //                         "name": "Testing item 1",
        //                         "product_id": 2940,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "6000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "6000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 6000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [
        //                     {
        //                         "id": 2944,
        //                         "reason": "Order fully refunded.",
        //                         "total": "-6000.00"
        //                     }
        //                 ],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2941/?pay_for_order=true&key=wc_order_l1O3A1x6V9SaM",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T09:23:37",
        //                 "date_modified_gmt": "2024-02-01T09:50:29",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2941"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2936,
        //                 "parent_id": 0,
        //                 "status": "pending",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-01-31T13:44:43",
        //                 "date_modified": "2024-02-01T09:15:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 42,
        //                 "order_key": "wc_order_1rWvVVn4HAZ3a",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Rahman",
        //                     "company": "Whitex Digital",
        //                     "address_1": "dhanmondi 15",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "riazrahman0406@gmail.com",
        //                     "phone": "+8801827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Rahman",
        //                     "company": "Whitex Digital",
        //                     "address_1": "dhanmondi 15",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": "+8801827196111"
        //                 },
        //                 "payment_method": "",
        //                 "payment_method_title": "",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "subscription",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "",
        //                 "number": "2936",
        //                 "meta_data": [
        //                     {
        //                         "id": 19598,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "admin"
        //                     },
        //                     {
        //                         "id": 19617,
        //                         "key": "_subscription_renewal",
        //                         "value": "2935"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 5,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2936/?pay_for_order=true&key=wc_order_1rWvVVn4HAZ3a&subscription_renewal=true",
        //                 "is_editable": true,
        //                 "needs_payment": true,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-01-31T13:44:43",
        //                 "date_modified_gmt": "2024-02-01T09:15:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2936"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2494,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-07T14:51:54",
        //                 "date_modified": "2023-12-07T14:52:10",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 0,
        //                 "order_key": "wc_order_Ngelmj2ThZ0z5",
        //                 "billing": {
        //                     "first_name": "aaaa",
        //                     "last_name": "aaaa",
        //                     "company": "",
        //                     "address_1": "hashfjaksdfjk",
        //                     "address_2": "",
        //                     "city": "asjdfasjhk",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "aaaaaaaaaaa@aaa.aaa",
        //                     "phone": "123467890"
        //                 },
        //                 "shipping": {
        //                     "first_name": "aaaa",
        //                     "last_name": "aaaa",
        //                     "company": "",
        //                     "address_1": "hashfjaksdfjk",
        //                     "address_2": "",
        //                     "city": "asjdfasjhk",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-07T14:52:10",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2494",
        //                 "meta_data": [
        //                     {
        //                         "id": 9199,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 3,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2494/?pay_for_order=true&key=wc_order_Ngelmj2ThZ0z5",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-07T14:51:54",
        //                 "date_modified_gmt": "2023-12-07T14:52:10",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-07T14:52:10",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2494"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2345,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-01T13:37:47",
        //                 "date_modified": "2023-12-01T13:38:20",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 33,
        //                 "order_key": "wc_order_TBeSNJtOvTrmz",
        //                 "billing": {
        //                     "first_name": "ascdas",
        //                     "last_name": "asdcas",
        //                     "company": "",
        //                     "address_1": "adascdas",
        //                     "address_2": "",
        //                     "city": "asdcas",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "a@a.caa",
        //                     "phone": "097654"
        //                 },
        //                 "shipping": {
        //                     "first_name": "ascdas",
        //                     "last_name": "asdcas",
        //                     "company": "",
        //                     "address_1": "adascdas",
        //                     "address_2": "",
        //                     "city": "asdcas",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-01T13:38:20",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2345",
        //                 "meta_data": [
        //                     {
        //                         "id": 8858,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 2,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2345/?pay_for_order=true&key=wc_order_TBeSNJtOvTrmz",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-01T13:37:47",
        //                 "date_modified_gmt": "2023-12-01T13:38:20",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-01T13:38:20",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2345"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/33"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2344,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-01T13:31:43",
        //                 "date_modified": "2023-12-01T13:32:04",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 0,
        //                 "order_key": "wc_order_zzUaYs3oIQliY",
        //                 "billing": {
        //                     "first_name": "sadcas",
        //                     "last_name": "adcasd",
        //                     "company": "",
        //                     "address_1": "asdcasdc",
        //                     "address_2": "",
        //                     "city": "asdcasdc",
        //                     "state": "AR",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "ASDFASsF@JSHFAJK.COM",
        //                     "phone": "2323"
        //                 },
        //                 "shipping": {
        //                     "first_name": "sadcas",
        //                     "last_name": "adcasd",
        //                     "company": "",
        //                     "address_1": "asdcasdc",
        //                     "address_2": "",
        //                     "city": "asdcasdc",
        //                     "state": "AR",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-01T13:32:04",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2344",
        //                 "meta_data": [
        //                     {
        //                         "id": 8815,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 1,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2344/?pay_for_order=true&key=wc_order_zzUaYs3oIQliY",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-01T13:31:43",
        //                 "date_modified_gmt": "2023-12-01T13:32:04",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-01T13:32:04",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2344"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ]
        //                 }
        //             }
        //         ]
        //     },
        //     {
        //         "id": 2958,
        //         "parent_id": 2957,
        //         "status": "active",
        //         "currency": "BDT",
        //         "version": "8.5.2",
        //         "prices_include_tax": false,
        //         "date_created": "2024-02-01T10:26:05",
        //         "date_modified": "2024-02-01T14:56:01",
        //         "discount_total": "0.00",
        //         "discount_tax": "0.00",
        //         "shipping_total": "0.00",
        //         "shipping_tax": "0.00",
        //         "cart_tax": "0.00",
        //         "total": "25000.00",
        //         "total_tax": "0.00",
        //         "customer_id": 1,
        //         "order_key": "wc_order_oh8G3nFmzrPGg",
        //         "billing": {
        //             "first_name": "Milton",
        //             "last_name": "Shikdar",
        //             "company": "",
        //             "address_1": "house 119 West Dhanmondi",
        //             "address_2": "",
        //             "city": "Dhaka",
        //             "state": "BD-13",
        //             "postcode": "1209",
        //             "country": "BD",
        //             "email": "admin@whitexdigital.com",
        //             "phone": "01827196111"
        //         },
        //         "shipping": {
        //             "first_name": "Milton",
        //             "last_name": "Shikdar",
        //             "company": "",
        //             "address_1": "house 119 West Dhanmondi",
        //             "address_2": "",
        //             "city": "Dhaka",
        //             "state": "BD-13",
        //             "postcode": "1209",
        //             "country": "BD",
        //             "phone": ""
        //         },
        //         "payment_method": "aamarpay",
        //         "payment_method_title": "Online Payments",
        //         "customer_ip_address": "103.73.45.143",
        //         "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //         "created_via": "checkout",
        //         "customer_note": "",
        //         "date_completed": "2024-02-01T14:56:00",
        //         "date_paid": "2024-02-01T14:56:00",
        //         "number": "2958",
        //         "meta_data": [
        //             {
        //                 "id": 20811,
        //                 "key": "is_vat_exempt",
        //                 "value": "no"
        //             },
        //             {
        //                 "id": 20812,
        //                 "key": "_wc_order_attribution_source_type",
        //                 "value": "referral"
        //             },
        //             {
        //                 "id": 20813,
        //                 "key": "_wc_order_attribution_referrer",
        //                 "value": "https://business95.web-hosting.com:2083/"
        //             },
        //             {
        //                 "id": 20814,
        //                 "key": "_wc_order_attribution_utm_source",
        //                 "value": "business95.web-hosting.com"
        //             },
        //             {
        //                 "id": 20815,
        //                 "key": "_wc_order_attribution_utm_medium",
        //                 "value": "referral"
        //             },
        //             {
        //                 "id": 20816,
        //                 "key": "_wc_order_attribution_utm_content",
        //                 "value": "/"
        //             },
        //             {
        //                 "id": 20817,
        //                 "key": "_wc_order_attribution_session_entry",
        //                 "value": "https://whitexdigital.com/"
        //             },
        //             {
        //                 "id": 20818,
        //                 "key": "_wc_order_attribution_session_start_time",
        //                 "value": "2024-01-30 12:34:52"
        //             },
        //             {
        //                 "id": 20819,
        //                 "key": "_wc_order_attribution_session_pages",
        //                 "value": "42"
        //             },
        //             {
        //                 "id": 20820,
        //                 "key": "_wc_order_attribution_session_count",
        //                 "value": "46"
        //             },
        //             {
        //                 "id": 20821,
        //                 "key": "_wc_order_attribution_user_agent",
        //                 "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //             },
        //             {
        //                 "id": 20822,
        //                 "key": "_wc_order_attribution_device_type",
        //                 "value": "Desktop"
        //             }
        //         ],
        //         "line_items": [
        //             {
        //                 "id": 8,
        //                 "name": "Digital Marketing Bundle Tier 2: Elevate",
        //                 "product_id": 2235,
        //                 "variation_id": 0,
        //                 "quantity": 1,
        //                 "tax_class": "",
        //                 "subtotal": "25000.00",
        //                 "subtotal_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "taxes": [],
        //                 "meta_data": [],
        //                 "sku": "",
        //                 "price": 25000,
        //                 "image": {
        //                     "id": "",
        //                     "src": ""
        //                 },
        //                 "parent_name": null
        //             }
        //         ],
        //         "tax_lines": [],
        //         "shipping_lines": [],
        //         "fee_lines": [],
        //         "coupon_lines": [],
        //         "payment_url": "https://whitexdigital.com/checkout/order-pay/2958/?pay_for_order=true&key=wc_order_oh8G3nFmzrPGg",
        //         "is_editable": true,
        //         "needs_payment": false,
        //         "needs_processing": true,
        //         "date_created_gmt": "2024-02-01T10:26:05",
        //         "date_modified_gmt": "2024-02-01T14:56:01",
        //         "date_completed_gmt": "2024-02-01T14:56:00",
        //         "date_paid_gmt": "2024-02-01T14:56:00",
        //         "billing_period": "month",
        //         "billing_interval": "1",
        //         "start_date_gmt": "2024-02-03T07:32:47",
        //         "trial_end_date_gmt": "",
        //         "next_payment_date_gmt": "2024-03-01T14:56:01",
        //         "payment_retry_date_gmt": "",
        //         "last_payment_date_gmt": "2024-02-01T10:26:05",
        //         "cancelled_date_gmt": "",
        //         "end_date_gmt": "",
        //         "resubscribed_from": "",
        //         "resubscribed_subscription": "",
        //         "removed_line_items": [],
        //         "_links": {
        //             "self": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/subscriptions/2958"
        //                 }
        //             ],
        //             "collection": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/subscriptions"
        //                 }
        //             ],
        //             "customer": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                 }
        //             ],
        //             "up": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2957"
        //                 }
        //             ]
        //         },
        //         "user": {
        //             "id": 1,
        //             "date_created": "2023-03-11T18:53:29",
        //             "date_created_gmt": "2023-03-11T18:53:29",
        //             "date_modified": "2024-02-01T14:56:00",
        //             "date_modified_gmt": "2024-02-01T14:56:00",
        //             "email": "admin@whitexdigital.com",
        //             "first_name": "Milton",
        //             "last_name": "Shikdar",
        //             "role": "administrator",
        //             "username": "whitex",
        //             "billing": {
        //                 "first_name": "Milton",
        //                 "last_name": "Shikdar",
        //                 "company": "",
        //                 "address_1": "house 119 West Dhanmondi",
        //                 "address_2": "",
        //                 "city": "Dhaka",
        //                 "postcode": "1209",
        //                 "country": "BD",
        //                 "state": "BD-13",
        //                 "email": "admin@whitexdigital.com",
        //                 "phone": "01827196111"
        //             },
        //             "shipping": {
        //                 "first_name": "Milton",
        //                 "last_name": "Shikdar",
        //                 "company": "",
        //                 "address_1": "house 119 West Dhanmondi",
        //                 "address_2": "",
        //                 "city": "Dhaka",
        //                 "postcode": "1209",
        //                 "country": "BD",
        //                 "state": "BD-13",
        //                 "phone": ""
        //             },
        //             "is_paying_customer": true,
        //             "avatar_url": "https://secure.gravatar.com/avatar/fc4f47eac616b930872e2f8d7276eee2?s=96&d=mm&r=g",
        //             "meta_data": [
        //                 {
        //                     "id": 18,
        //                     "key": "community-events-location",
        //                     "value": {
        //                         "ip": "103.73.45.0"
        //                     }
        //                 },
        //                 {
        //                     "id": 20,
        //                     "key": "wc_last_active",
        //                     "value": "1706918400"
        //                 },
        //                 {
        //                     "id": 21,
        //                     "key": "meta-box-order_product",
        //                     "value": {
        //                         "form_top": "",
        //                         "before_permalink": "",
        //                         "after_title": "",
        //                         "after_editor": "",
        //                         "side": "submitdiv,postimagediv,woocommerce-product-images,product_catdiv,tagsdiv-product_tag,pageparentdiv,litespeed_meta_boxes,slider_revolution_metabox",
        //                         "normal": "wpb_wpbakery,sq_blocksnippet,woocommerce-product-data,postcustom,slugdiv,postexcerpt,commentsdiv,wpcode-metabox-snippets"
        //                     }
        //                 },
        //                 {
        //                     "id": 24,
        //                     "key": "dismissed_template_files_notice",
        //                     "value": "1"
        //                 },
        //                 {
        //                     "id": 25,
        //                     "key": "nav_menu_recently_edited",
        //                     "value": "51"
        //                 },
        //                 {
        //                     "id": 26,
        //                     "key": "managenav-menuscolumnshidden",
        //                     "value": [
        //                         "link-target",
        //                         "css-classes",
        //                         "xfn",
        //                         "description",
        //                         "title-attribute"
        //                     ]
        //                 },
        //                 {
        //                     "id": 28,
        //                     "key": "instagram",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 29,
        //                     "key": "facebook",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 30,
        //                     "key": "linkedin",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 31,
        //                     "key": "twitter",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 56,
        //                     "key": "dismissed_update_notice",
        //                     "value": "1"
        //                 },
        //                 {
        //                     "id": 65,
        //                     "key": "meta-box-order_dashboard",
        //                     "value": {
        //                         "normal": "wc_admin_dashboard_setup,dashboard_site_health,simple_history_dashboard_widget,google_dashboard_widget",
        //                         "side": "dashboard_activity,wp-dashboard-widget-news,e-dashboard-overview,dashboard_right_now,dashboard_quick_press,dashboard_primary",
        //                         "column3": "",
        //                         "column4": ""
        //                     }
        //                 },
        //                 {
        //                     "id": 159,
        //                     "key": "pmpro_logins",
        //                     "value": {
        //                         "last": "December 2, 2023",
        //                         "thisdate": "2023-02-12",
        //                         "week": 3,
        //                         "thisweek": "48",
        //                         "month": 3,
        //                         "thismonth": "12",
        //                         "ytd": 4,
        //                         "thisyear": "2023",
        //                         "alltime": 4,
        //                         "today": 0
        //                     }
        //                 },
        //                 {
        //                     "id": 161,
        //                     "key": "pmpro_views",
        //                     "value": {
        //                         "last": "December 2, 2023",
        //                         "thisdate": "2023-02-12",
        //                         "week": 50,
        //                         "thisweek": "48",
        //                         "month": 50,
        //                         "thismonth": "12",
        //                         "ytd": 51,
        //                         "thisyear": "2023",
        //                         "alltime": 51,
        //                         "today": 0
        //                     }
        //                 },
        //                 {
        //                     "id": 213,
        //                     "key": "essential_adons_elementor_opt_in",
        //                     "value": "1"
        //                 },
        //                 {
        //                     "id": 214,
        //                     "key": "wpdeveloper_notices_seen",
        //                     "value": {
        //                         "wpdeveloper_notice_5_8_16": {
        //                             "essential_adons_elementor": [
        //                                 "opt_in"
        //                             ]
        //                         }
        //                     }
        //                 },
        //                 {
        //                     "id": 1203,
        //                     "key": "pmpro_visits",
        //                     "value": {
        //                         "last": "December 1, 2023",
        //                         "thisdate": null,
        //                         "week": 1,
        //                         "thisweek": "48",
        //                         "month": 1,
        //                         "thismonth": "12",
        //                         "ytd": 1,
        //                         "thisyear": "2023",
        //                         "alltime": 1
        //                     }
        //                 },
        //                 {
        //                     "id": 1206,
        //                     "key": "pmpro_archived_notifications",
        //                     "value": {
        //                         "initial_notification_delay": "2023-12-09T19:45:16+00:00"
        //                     }
        //                 },
        //                 {
        //                     "id": 1211,
        //                     "key": "elementor_introduction",
        //                     "value": {
        //                         "ai-get-started-announcement": true,
        //                         "favorites-notice": true
        //                     }
        //                 },
        //                 {
        //                     "id": 1212,
        //                     "key": "meta-box-order_page",
        //                     "value": {
        //                         "form_top": "",
        //                         "before_permalink": "",
        //                         "after_title": "",
        //                         "after_editor": "",
        //                         "side": "submitdiv,pageparentdiv,litespeed_meta_boxes,slider_revolution_metabox,postimagediv,sq_blocksnippet",
        //                         "normal": "wpb_wpbakery,postexcerpt,postcustom,commentstatusdiv,commentsdiv,slugdiv,authordiv,revisionsdiv,wpcode-metabox-snippets"
        //                     }
        //                 },
        //                 {
        //                     "id": 1213,
        //                     "key": "screen_layout_page",
        //                     "value": "2"
        //                 },
        //                 {
        //                     "id": 1260,
        //                     "key": "quadlayers_woocommerce-direct-checkout_notice_hidden_0",
        //                     "value": "1"
        //                 },
        //                 {
        //                     "id": 1320,
        //                     "key": "elementor_admin_notices",
        //                     "value": {
        //                         "design_not_appearing": {
        //                             "is_viewed": true,
        //                             "meta": {
        //                                 "version": "3.18.3"
        //                             }
        //                         },
        //                         "experiment_promotion": {
        //                             "is_viewed": true,
        //                             "meta": []
        //                         }
        //                     }
        //                 },
        //                 {
        //                     "id": 1346,
        //                     "key": "updraftplus_confirmed_news_offer",
        //                     "value": "no"
        //                 },
        //                 {
        //                     "id": 1348,
        //                     "key": "essential-addons-for-elementor_review_notice_dismissed",
        //                     "value": "1"
        //                 },
        //                 {
        //                     "id": 1466,
        //                     "key": "quadlayers_woocommerce-direct-checkout_notice_hidden_1",
        //                     "value": "1"
        //                 },
        //                 {
        //                     "id": 1474,
        //                     "key": "_wcs_subscription_ids_cache",
        //                     "value": [
        //                         2958
        //                     ]
        //                 },
        //                 {
        //                     "id": 1475,
        //                     "key": "yith-license-banner",
        //                     "value": "hide"
        //                 },
        //                 {
        //                     "id": 1476,
        //                     "key": "screen_layout_product",
        //                     "value": "2"
        //                 },
        //                 {
        //                     "id": 1486,
        //                     "key": "meta-box-order_vc_grid_item",
        //                     "value": {
        //                         "form_top": "",
        //                         "before_permalink": "",
        //                         "after_title": "",
        //                         "after_editor": "",
        //                         "side": "submitdiv,slider_revolution_metabox",
        //                         "normal": "wpb_wpbakery,slugdiv"
        //                     }
        //                 },
        //                 {
        //                     "id": 1487,
        //                     "key": "screen_layout_vc_grid_item",
        //                     "value": "1"
        //                 },
        //                 {
        //                     "id": 1497,
        //                     "key": "wpforms_overview_table_columns",
        //                     "value": [
        //                         "name",
        //                         "tags",
        //                         "author",
        //                         "shortcode",
        //                         "created",
        //                         "locations",
        //                         "id"
        //                     ]
        //                 },
        //                 {
        //                     "id": 1500,
        //                     "key": "wpforms_dismissed",
        //                     "value": {
        //                         "edu-builder-layout-field-alert": 1706653763
        //                     }
        //                 },
        //                 {
        //                     "id": 1596,
        //                     "key": "shipping_method",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 1597,
        //                     "key": "wpforms_dash_widget_graph_style",
        //                     "value": "2"
        //                 },
        //                 {
        //                     "id": 1598,
        //                     "key": "wpforms_dash_widget_color_scheme",
        //                     "value": "2"
        //                 }
        //             ],
        //             "_links": {
        //                 "self": [
        //                     {
        //                         "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                     }
        //                 ],
        //                 "collection": [
        //                     {
        //                         "href": "https://whitexdigital.com/wp-json/wc/v3/customers"
        //                     }
        //                 ]
        //             }
        //         },
        //         "orders": [
        //             {
        //                 "id": 2964,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T15:35:49",
        //                 "date_modified": "2024-02-01T15:36:20",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 45,
        //                 "order_key": "wc_order_YYUn69isw4eWK",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "IS",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhanalone@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "IS",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T15:36:20",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2964",
        //                 "meta_data": [
        //                     {
        //                         "id": 21174,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 21175,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 21176,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 21177,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/checkout/order-received/2962/?key=wc_order_qAJAOyY8pSKGE"
        //                     },
        //                     {
        //                         "id": 21178,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 15:35:04"
        //                     },
        //                     {
        //                         "id": 21179,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "3"
        //                     },
        //                     {
        //                         "id": 21180,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 21181,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 21182,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 14,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2964/?pay_for_order=true&key=wc_order_YYUn69isw4eWK",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T15:35:49",
        //                 "date_modified_gmt": "2024-02-01T15:36:20",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T15:36:20",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2964"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/45"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2962,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T15:17:11",
        //                 "date_modified": "2024-02-01T15:17:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 44,
        //                 "order_key": "wc_order_qAJAOyY8pSKGE",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhanalone@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T15:17:31",
        //                 "cart_hash": "543f3d1818168e0eddc74caf5d471f1a",
        //                 "number": "2962",
        //                 "meta_data": [
        //                     {
        //                         "id": 21059,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 21060,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 21061,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 21062,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/cart/"
        //                     },
        //                     {
        //                         "id": 21063,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 14:26:22"
        //                     },
        //                     {
        //                         "id": 21064,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "2"
        //                     },
        //                     {
        //                         "id": 21065,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "2"
        //                     },
        //                     {
        //                         "id": 21066,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 21067,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 12,
        //                         "name": "Digital Marketing Bundle Tier 2: Elevate",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2962/?pay_for_order=true&key=wc_order_qAJAOyY8pSKGE",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T15:17:11",
        //                 "date_modified_gmt": "2024-02-01T15:17:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T15:17:31",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2962"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2960,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T14:33:54",
        //                 "date_modified": "2024-02-01T14:34:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 44,
        //                 "order_key": "wc_order_lO8vMJnhgG1xo",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhaninnocent@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T14:34:31",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2960",
        //                 "meta_data": [
        //                     {
        //                         "id": 20932,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20933,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 20934,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 20935,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/cart/"
        //                     },
        //                     {
        //                         "id": 20936,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 14:26:22"
        //                     },
        //                     {
        //                         "id": 20937,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "4"
        //                     },
        //                     {
        //                         "id": 20938,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 20939,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20940,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 10,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2960/?pay_for_order=true&key=wc_order_lO8vMJnhgG1xo",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T14:33:54",
        //                 "date_modified_gmt": "2024-02-01T14:34:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T14:34:31",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2960"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2959,
        //                 "parent_id": 0,
        //                 "status": "pending",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T11:30:04",
        //                 "date_modified": "2024-02-01T14:48:09",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "259.99",
        //                 "total_tax": "0.00",
        //                 "customer_id": 1,
        //                 "order_key": "wc_order_f68Fo5XtpIez8",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "admin@whitexdigital.com",
        //                     "phone": "01827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "91ad31c6b9c9a3a498e14390cfb9c8ef",
        //                 "number": "2959",
        //                 "meta_data": [
        //                     {
        //                         "id": 20876,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20877,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20878,
        //                         "key": "_wc_order_attribution_referrer",
        //                         "value": "https://business95.web-hosting.com:2083/"
        //                     },
        //                     {
        //                         "id": 20879,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "business95.web-hosting.com"
        //                     },
        //                     {
        //                         "id": 20880,
        //                         "key": "_wc_order_attribution_utm_medium",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20881,
        //                         "key": "_wc_order_attribution_utm_content",
        //                         "value": "/"
        //                     },
        //                     {
        //                         "id": 20882,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/"
        //                     },
        //                     {
        //                         "id": 20883,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-01-30 12:34:52"
        //                     },
        //                     {
        //                         "id": 20884,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 20885,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "47"
        //                     },
        //                     {
        //                         "id": 20886,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20887,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 9,
        //                         "name": "Furface Headphones",
        //                         "product_id": 2739,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "259.99",
        //                         "subtotal_tax": "0.00",
        //                         "total": "259.99",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "furface-headphones",
        //                         "price": 259.99,
        //                         "image": {
        //                             "id": "2149",
        //                             "src": "https://whitexdigital.com/wp-content/uploads/2020/06/shop_02-1-1.jpg"
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2959/?pay_for_order=true&key=wc_order_f68Fo5XtpIez8",
        //                 "is_editable": true,
        //                 "needs_payment": true,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T11:30:04",
        //                 "date_modified_gmt": "2024-02-01T14:48:09",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2959"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2957,
        //                 "parent_id": 0,
        //                 "status": "completed",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T10:26:05",
        //                 "date_modified": "2024-02-01T14:56:00",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 1,
        //                 "order_key": "wc_order_lHSR9s5iYAM6k",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "admin@whitexdigital.com",
        //                     "phone": "01827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": "2024-02-01T14:56:00",
        //                 "date_paid": "2024-02-01T14:56:00",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2957",
        //                 "meta_data": [
        //                     {
        //                         "id": 20748,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20749,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20750,
        //                         "key": "_wc_order_attribution_referrer",
        //                         "value": "https://business95.web-hosting.com:2083/"
        //                     },
        //                     {
        //                         "id": 20751,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "business95.web-hosting.com"
        //                     },
        //                     {
        //                         "id": 20752,
        //                         "key": "_wc_order_attribution_utm_medium",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20753,
        //                         "key": "_wc_order_attribution_utm_content",
        //                         "value": "/"
        //                     },
        //                     {
        //                         "id": 20754,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/"
        //                     },
        //                     {
        //                         "id": 20755,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-01-30 12:34:52"
        //                     },
        //                     {
        //                         "id": 20756,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "42"
        //                     },
        //                     {
        //                         "id": 20757,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "46"
        //                     },
        //                     {
        //                         "id": 20758,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20759,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 7,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2957/?pay_for_order=true&key=wc_order_lHSR9s5iYAM6k",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T10:26:05",
        //                 "date_modified_gmt": "2024-02-01T14:56:00",
        //                 "date_completed_gmt": "2024-02-01T14:56:00",
        //                 "date_paid_gmt": "2024-02-01T14:56:00",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2957"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2941,
        //                 "parent_id": 0,
        //                 "status": "refunded",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T09:23:37",
        //                 "date_modified": "2024-02-01T09:50:29",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "6000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 42,
        //                 "order_key": "wc_order_l1O3A1x6V9SaM",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "Arax.co",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "Test",
        //                     "city": "Shinkiari",
        //                     "state": "KPK",
        //                     "postcode": "21140",
        //                     "country": "",
        //                     "email": "milton0406rahman@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "Bryant and Kim Co",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "TT",
        //                     "city": "Shinkiari",
        //                     "state": "KPK",
        //                     "postcode": "21140",
        //                     "country": "",
        //                     "phone": "+923065831989"
        //                 },
        //                 "payment_method": "",
        //                 "payment_method_title": "",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "",
        //                 "customer_user_agent": "",
        //                 "created_via": "admin",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "",
        //                 "number": "2941",
        //                 "meta_data": [
        //                     {
        //                         "id": 20609,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "admin"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 6,
        //                         "name": "Testing item 1",
        //                         "product_id": 2940,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "6000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "6000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 6000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [
        //                     {
        //                         "id": 2944,
        //                         "reason": "Order fully refunded.",
        //                         "total": "-6000.00"
        //                     }
        //                 ],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2941/?pay_for_order=true&key=wc_order_l1O3A1x6V9SaM",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T09:23:37",
        //                 "date_modified_gmt": "2024-02-01T09:50:29",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2941"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2936,
        //                 "parent_id": 0,
        //                 "status": "pending",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-01-31T13:44:43",
        //                 "date_modified": "2024-02-01T09:15:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 42,
        //                 "order_key": "wc_order_1rWvVVn4HAZ3a",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Rahman",
        //                     "company": "Whitex Digital",
        //                     "address_1": "dhanmondi 15",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "riazrahman0406@gmail.com",
        //                     "phone": "+8801827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Rahman",
        //                     "company": "Whitex Digital",
        //                     "address_1": "dhanmondi 15",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": "+8801827196111"
        //                 },
        //                 "payment_method": "",
        //                 "payment_method_title": "",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "subscription",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "",
        //                 "number": "2936",
        //                 "meta_data": [
        //                     {
        //                         "id": 19598,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "admin"
        //                     },
        //                     {
        //                         "id": 19617,
        //                         "key": "_subscription_renewal",
        //                         "value": "2935"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 5,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2936/?pay_for_order=true&key=wc_order_1rWvVVn4HAZ3a&subscription_renewal=true",
        //                 "is_editable": true,
        //                 "needs_payment": true,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-01-31T13:44:43",
        //                 "date_modified_gmt": "2024-02-01T09:15:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2936"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2494,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-07T14:51:54",
        //                 "date_modified": "2023-12-07T14:52:10",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 0,
        //                 "order_key": "wc_order_Ngelmj2ThZ0z5",
        //                 "billing": {
        //                     "first_name": "aaaa",
        //                     "last_name": "aaaa",
        //                     "company": "",
        //                     "address_1": "hashfjaksdfjk",
        //                     "address_2": "",
        //                     "city": "asjdfasjhk",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "aaaaaaaaaaa@aaa.aaa",
        //                     "phone": "123467890"
        //                 },
        //                 "shipping": {
        //                     "first_name": "aaaa",
        //                     "last_name": "aaaa",
        //                     "company": "",
        //                     "address_1": "hashfjaksdfjk",
        //                     "address_2": "",
        //                     "city": "asjdfasjhk",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-07T14:52:10",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2494",
        //                 "meta_data": [
        //                     {
        //                         "id": 9199,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 3,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2494/?pay_for_order=true&key=wc_order_Ngelmj2ThZ0z5",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-07T14:51:54",
        //                 "date_modified_gmt": "2023-12-07T14:52:10",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-07T14:52:10",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2494"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2345,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-01T13:37:47",
        //                 "date_modified": "2023-12-01T13:38:20",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 33,
        //                 "order_key": "wc_order_TBeSNJtOvTrmz",
        //                 "billing": {
        //                     "first_name": "ascdas",
        //                     "last_name": "asdcas",
        //                     "company": "",
        //                     "address_1": "adascdas",
        //                     "address_2": "",
        //                     "city": "asdcas",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "a@a.caa",
        //                     "phone": "097654"
        //                 },
        //                 "shipping": {
        //                     "first_name": "ascdas",
        //                     "last_name": "asdcas",
        //                     "company": "",
        //                     "address_1": "adascdas",
        //                     "address_2": "",
        //                     "city": "asdcas",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-01T13:38:20",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2345",
        //                 "meta_data": [
        //                     {
        //                         "id": 8858,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 2,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2345/?pay_for_order=true&key=wc_order_TBeSNJtOvTrmz",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-01T13:37:47",
        //                 "date_modified_gmt": "2023-12-01T13:38:20",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-01T13:38:20",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2345"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/33"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2344,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-01T13:31:43",
        //                 "date_modified": "2023-12-01T13:32:04",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 0,
        //                 "order_key": "wc_order_zzUaYs3oIQliY",
        //                 "billing": {
        //                     "first_name": "sadcas",
        //                     "last_name": "adcasd",
        //                     "company": "",
        //                     "address_1": "asdcasdc",
        //                     "address_2": "",
        //                     "city": "asdcasdc",
        //                     "state": "AR",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "ASDFASsF@JSHFAJK.COM",
        //                     "phone": "2323"
        //                 },
        //                 "shipping": {
        //                     "first_name": "sadcas",
        //                     "last_name": "adcasd",
        //                     "company": "",
        //                     "address_1": "asdcasdc",
        //                     "address_2": "",
        //                     "city": "asdcasdc",
        //                     "state": "AR",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-01T13:32:04",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2344",
        //                 "meta_data": [
        //                     {
        //                         "id": 8815,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 1,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2344/?pay_for_order=true&key=wc_order_zzUaYs3oIQliY",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-01T13:31:43",
        //                 "date_modified_gmt": "2023-12-01T13:32:04",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-01T13:32:04",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2344"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ]
        //                 }
        //             }
        //         ]
        //     },
        //     {
        //         "id": 2935,
        //         "parent_id": 0,
        //         "status": "cancelled",
        //         "currency": "BDT",
        //         "version": "8.5.2",
        //         "prices_include_tax": false,
        //         "date_created": "2024-01-31T13:44:10",
        //         "date_modified": "2024-02-01T09:32:52",
        //         "discount_total": "0.00",
        //         "discount_tax": "0.00",
        //         "shipping_total": "0.00",
        //         "shipping_tax": "0.00",
        //         "cart_tax": "0.00",
        //         "total": "25000.00",
        //         "total_tax": "0.00",
        //         "customer_id": 42,
        //         "order_key": "wc_order_9kvhCTWC1JYxO",
        //         "billing": {
        //             "first_name": "Arham",
        //             "last_name": "Khan",
        //             "company": "Bryant and Kim Co",
        //             "address_1": "Shinkiari KPK, Pakistan",
        //             "address_2": "dsaf",
        //             "city": "Shinkiari",
        //             "state": "",
        //             "postcode": "21140",
        //             "country": "",
        //             "email": "milton0406rahman@gmail.com",
        //             "phone": "+923065831989"
        //         },
        //         "shipping": {
        //             "first_name": "Arham",
        //             "last_name": "Khan",
        //             "company": "AB.co",
        //             "address_1": "Shinkiari KPK, Pakistan",
        //             "address_2": "YXZ",
        //             "city": "Shinkiari",
        //             "state": "KPK",
        //             "postcode": "21140",
        //             "country": "",
        //             "phone": "+923065831989"
        //         },
        //         "payment_method": "",
        //         "payment_method_title": "",
        //         "customer_ip_address": "",
        //         "customer_user_agent": "",
        //         "created_via": "admin",
        //         "customer_note": "",
        //         "date_completed": null,
        //         "date_paid": null,
        //         "number": "2935",
        //         "meta_data": [],
        //         "line_items": [
        //             {
        //                 "id": 4,
        //                 "name": "Testing item 1",
        //                 "product_id": 2940,
        //                 "variation_id": 0,
        //                 "quantity": 1,
        //                 "tax_class": "",
        //                 "subtotal": "25000.00",
        //                 "subtotal_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "taxes": [],
        //                 "meta_data": [],
        //                 "sku": "",
        //                 "price": 25000,
        //                 "image": {
        //                     "id": "",
        //                     "src": ""
        //                 },
        //                 "parent_name": null
        //             }
        //         ],
        //         "tax_lines": [],
        //         "shipping_lines": [],
        //         "fee_lines": [],
        //         "coupon_lines": [],
        //         "payment_url": "https://whitexdigital.com/checkout/order-pay/2935/?pay_for_order=true&key=wc_order_9kvhCTWC1JYxO",
        //         "is_editable": true,
        //         "needs_payment": true,
        //         "needs_processing": true,
        //         "date_created_gmt": "2024-01-31T13:44:10",
        //         "date_modified_gmt": "2024-02-01T09:32:52",
        //         "date_completed_gmt": null,
        //         "date_paid_gmt": null,
        //         "billing_period": "day",
        //         "billing_interval": "1",
        //         "start_date_gmt": "2024-02-03T07:52:48",
        //         "trial_end_date_gmt": "",
        //         "next_payment_date_gmt": "",
        //         "payment_retry_date_gmt": "",
        //         "last_payment_date_gmt": "2024-01-31T13:44:43",
        //         "cancelled_date_gmt": "2024-02-01T09:32:52",
        //         "end_date_gmt": "2024-02-01T09:32:52",
        //         "resubscribed_from": "",
        //         "resubscribed_subscription": "",
        //         "removed_line_items": [],
        //         "_links": {
        //             "self": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/subscriptions/2935"
        //                 }
        //             ],
        //             "collection": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/subscriptions"
        //                 }
        //             ],
        //             "customer": [
        //                 {
        //                     "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                 }
        //             ]
        //         },
        //         "user": {
        //             "id": 42,
        //             "date_created": "2024-01-31T11:07:31",
        //             "date_created_gmt": "2024-01-31T11:07:31",
        //             "date_modified": "2024-02-01T14:27:10",
        //             "date_modified_gmt": "2024-02-01T14:27:10",
        //             "email": "milton0406rahman@gmail.com",
        //             "first_name": "Arham",
        //             "last_name": "Khan",
        //             "role": "customer",
        //             "username": "Whitex Digital",
        //             "billing": {
        //                 "first_name": "Arham",
        //                 "last_name": "Khan",
        //                 "company": "Arax.co",
        //                 "address_1": "Shinkiari KPK, Pakistan",
        //                 "address_2": "Test",
        //                 "city": "Shinkiari",
        //                 "postcode": "21140",
        //                 "country": "",
        //                 "state": "KPK",
        //                 "email": "milton0406rahman@gmail.com",
        //                 "phone": "+923065831989"
        //             },
        //             "shipping": {
        //                 "first_name": "Arham",
        //                 "last_name": "Khan",
        //                 "company": "Bryant and Kim Co",
        //                 "address_1": "Shinkiari KPK, Pakistan",
        //                 "address_2": "TT",
        //                 "city": "Shinkiari",
        //                 "postcode": "21140",
        //                 "country": "Pakistan",
        //                 "state": "KPK",
        //                 "phone": "+923065831989"
        //             },
        //             "is_paying_customer": false,
        //             "avatar_url": "https://secure.gravatar.com/avatar/941c3d519668eb54b70ca41583bd8fc4?s=96&d=mm&r=g",
        //             "meta_data": [
        //                 {
        //                     "id": 1518,
        //                     "key": "_wcs_subscription_ids_cache",
        //                     "value": [
        //                         2935
        //                     ]
        //                 },
        //                 {
        //                     "id": 1520,
        //                     "key": "Packagedetails",
        //                     "value": "Spark - &#36;25,000.00"
        //                 },
        //                 {
        //                     "id": 1521,
        //                     "key": "Usernumber",
        //                     "value": "+8801827196111"
        //                 },
        //                 {
        //                     "id": 1522,
        //                     "key": "wpforms-pending",
        //                     "value": "1"
        //                 },
        //                 {
        //                     "id": 1523,
        //                     "key": "wpforms-role",
        //                     "value": "customer"
        //                 },
        //                 {
        //                     "id": 1524,
        //                     "key": "wpforms-form-id",
        //                     "value": "2908"
        //                 },
        //                 {
        //                     "id": 1525,
        //                     "key": "wpforms-entry-id",
        //                     "value": "2"
        //                 },
        //                 {
        //                     "id": 1526,
        //                     "key": "wc_last_active",
        //                     "value": "1706745600"
        //                 },
        //                 {
        //                     "id": 1599,
        //                     "key": "instagram",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 1600,
        //                     "key": "facebook-f",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 1601,
        //                     "key": "linkedin-in",
        //                     "value": ""
        //                 },
        //                 {
        //                     "id": 1602,
        //                     "key": "twitter",
        //                     "value": ""
        //                 }
        //             ],
        //             "_links": {
        //                 "self": [
        //                     {
        //                         "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                     }
        //                 ],
        //                 "collection": [
        //                     {
        //                         "href": "https://whitexdigital.com/wp-json/wc/v3/customers"
        //                     }
        //                 ]
        //             }
        //         },
        //         "orders": [
        //             {
        //                 "id": 2964,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T15:35:49",
        //                 "date_modified": "2024-02-01T15:36:20",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 45,
        //                 "order_key": "wc_order_YYUn69isw4eWK",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "IS",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhanalone@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "IS",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T15:36:20",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2964",
        //                 "meta_data": [
        //                     {
        //                         "id": 21174,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 21175,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 21176,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 21177,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/checkout/order-received/2962/?key=wc_order_qAJAOyY8pSKGE"
        //                     },
        //                     {
        //                         "id": 21178,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 15:35:04"
        //                     },
        //                     {
        //                         "id": 21179,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "3"
        //                     },
        //                     {
        //                         "id": 21180,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 21181,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 21182,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 14,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2964/?pay_for_order=true&key=wc_order_YYUn69isw4eWK",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T15:35:49",
        //                 "date_modified_gmt": "2024-02-01T15:36:20",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T15:36:20",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2964"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/45"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2962,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T15:17:11",
        //                 "date_modified": "2024-02-01T15:17:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 44,
        //                 "order_key": "wc_order_qAJAOyY8pSKGE",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhanalone@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T15:17:31",
        //                 "cart_hash": "543f3d1818168e0eddc74caf5d471f1a",
        //                 "number": "2962",
        //                 "meta_data": [
        //                     {
        //                         "id": 21059,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 21060,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 21061,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 21062,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/cart/"
        //                     },
        //                     {
        //                         "id": 21063,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 14:26:22"
        //                     },
        //                     {
        //                         "id": 21064,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "2"
        //                     },
        //                     {
        //                         "id": 21065,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "2"
        //                     },
        //                     {
        //                         "id": 21066,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 21067,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 12,
        //                         "name": "Digital Marketing Bundle Tier 2: Elevate",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2962/?pay_for_order=true&key=wc_order_qAJAOyY8pSKGE",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T15:17:11",
        //                 "date_modified_gmt": "2024-02-01T15:17:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T15:17:31",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2962"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2960,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T14:33:54",
        //                 "date_modified": "2024-02-01T14:34:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 44,
        //                 "order_key": "wc_order_lO8vMJnhgG1xo",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "email": "arhamkhaninnocent@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "",
        //                     "city": "Shinkiari",
        //                     "state": "KP",
        //                     "postcode": "21140",
        //                     "country": "PK",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "154.91.165.35",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2024-02-01T14:34:31",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2960",
        //                 "meta_data": [
        //                     {
        //                         "id": 20932,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20933,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "typein"
        //                     },
        //                     {
        //                         "id": 20934,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "(direct)"
        //                     },
        //                     {
        //                         "id": 20935,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/cart/"
        //                     },
        //                     {
        //                         "id": 20936,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-02-01 14:26:22"
        //                     },
        //                     {
        //                         "id": 20937,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "4"
        //                     },
        //                     {
        //                         "id": 20938,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 20939,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20940,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 10,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2960/?pay_for_order=true&key=wc_order_lO8vMJnhgG1xo",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T14:33:54",
        //                 "date_modified_gmt": "2024-02-01T14:34:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2024-02-01T14:34:31",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2960"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/44"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2959,
        //                 "parent_id": 0,
        //                 "status": "pending",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T11:30:04",
        //                 "date_modified": "2024-02-01T14:48:09",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "259.99",
        //                 "total_tax": "0.00",
        //                 "customer_id": 1,
        //                 "order_key": "wc_order_f68Fo5XtpIez8",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "admin@whitexdigital.com",
        //                     "phone": "01827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "91ad31c6b9c9a3a498e14390cfb9c8ef",
        //                 "number": "2959",
        //                 "meta_data": [
        //                     {
        //                         "id": 20876,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20877,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20878,
        //                         "key": "_wc_order_attribution_referrer",
        //                         "value": "https://business95.web-hosting.com:2083/"
        //                     },
        //                     {
        //                         "id": 20879,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "business95.web-hosting.com"
        //                     },
        //                     {
        //                         "id": 20880,
        //                         "key": "_wc_order_attribution_utm_medium",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20881,
        //                         "key": "_wc_order_attribution_utm_content",
        //                         "value": "/"
        //                     },
        //                     {
        //                         "id": 20882,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/"
        //                     },
        //                     {
        //                         "id": 20883,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-01-30 12:34:52"
        //                     },
        //                     {
        //                         "id": 20884,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "1"
        //                     },
        //                     {
        //                         "id": 20885,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "47"
        //                     },
        //                     {
        //                         "id": 20886,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20887,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 9,
        //                         "name": "Furface Headphones",
        //                         "product_id": 2739,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "259.99",
        //                         "subtotal_tax": "0.00",
        //                         "total": "259.99",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "furface-headphones",
        //                         "price": 259.99,
        //                         "image": {
        //                             "id": "2149",
        //                             "src": "https://whitexdigital.com/wp-content/uploads/2020/06/shop_02-1-1.jpg"
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2959/?pay_for_order=true&key=wc_order_f68Fo5XtpIez8",
        //                 "is_editable": true,
        //                 "needs_payment": true,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T11:30:04",
        //                 "date_modified_gmt": "2024-02-01T14:48:09",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2959"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2957,
        //                 "parent_id": 0,
        //                 "status": "completed",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T10:26:05",
        //                 "date_modified": "2024-02-01T14:56:00",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 1,
        //                 "order_key": "wc_order_lHSR9s5iYAM6k",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "admin@whitexdigital.com",
        //                     "phone": "01827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Shikdar",
        //                     "company": "",
        //                     "address_1": "house 119 West Dhanmondi",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": "2024-02-01T14:56:00",
        //                 "date_paid": "2024-02-01T14:56:00",
        //                 "cart_hash": "453f0b50c3b1a01b54ed27852c51bdd7",
        //                 "number": "2957",
        //                 "meta_data": [
        //                     {
        //                         "id": 20748,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     },
        //                     {
        //                         "id": 20749,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20750,
        //                         "key": "_wc_order_attribution_referrer",
        //                         "value": "https://business95.web-hosting.com:2083/"
        //                     },
        //                     {
        //                         "id": 20751,
        //                         "key": "_wc_order_attribution_utm_source",
        //                         "value": "business95.web-hosting.com"
        //                     },
        //                     {
        //                         "id": 20752,
        //                         "key": "_wc_order_attribution_utm_medium",
        //                         "value": "referral"
        //                     },
        //                     {
        //                         "id": 20753,
        //                         "key": "_wc_order_attribution_utm_content",
        //                         "value": "/"
        //                     },
        //                     {
        //                         "id": 20754,
        //                         "key": "_wc_order_attribution_session_entry",
        //                         "value": "https://whitexdigital.com/"
        //                     },
        //                     {
        //                         "id": 20755,
        //                         "key": "_wc_order_attribution_session_start_time",
        //                         "value": "2024-01-30 12:34:52"
        //                     },
        //                     {
        //                         "id": 20756,
        //                         "key": "_wc_order_attribution_session_pages",
        //                         "value": "42"
        //                     },
        //                     {
        //                         "id": 20757,
        //                         "key": "_wc_order_attribution_session_count",
        //                         "value": "46"
        //                     },
        //                     {
        //                         "id": 20758,
        //                         "key": "_wc_order_attribution_user_agent",
        //                         "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        //                     },
        //                     {
        //                         "id": 20759,
        //                         "key": "_wc_order_attribution_device_type",
        //                         "value": "Desktop"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 7,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2957/?pay_for_order=true&key=wc_order_lHSR9s5iYAM6k",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T10:26:05",
        //                 "date_modified_gmt": "2024-02-01T14:56:00",
        //                 "date_completed_gmt": "2024-02-01T14:56:00",
        //                 "date_paid_gmt": "2024-02-01T14:56:00",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2957"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/1"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2941,
        //                 "parent_id": 0,
        //                 "status": "refunded",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-02-01T09:23:37",
        //                 "date_modified": "2024-02-01T09:50:29",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "6000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 42,
        //                 "order_key": "wc_order_l1O3A1x6V9SaM",
        //                 "billing": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "Arax.co",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "Test",
        //                     "city": "Shinkiari",
        //                     "state": "KPK",
        //                     "postcode": "21140",
        //                     "country": "",
        //                     "email": "milton0406rahman@gmail.com",
        //                     "phone": "+923065831989"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Arham",
        //                     "last_name": "Khan",
        //                     "company": "Bryant and Kim Co",
        //                     "address_1": "Shinkiari KPK, Pakistan",
        //                     "address_2": "TT",
        //                     "city": "Shinkiari",
        //                     "state": "KPK",
        //                     "postcode": "21140",
        //                     "country": "",
        //                     "phone": "+923065831989"
        //                 },
        //                 "payment_method": "",
        //                 "payment_method_title": "",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "",
        //                 "customer_user_agent": "",
        //                 "created_via": "admin",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "",
        //                 "number": "2941",
        //                 "meta_data": [
        //                     {
        //                         "id": 20609,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "admin"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 6,
        //                         "name": "Testing item 1",
        //                         "product_id": 2940,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "6000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "6000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 6000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [
        //                     {
        //                         "id": 2944,
        //                         "reason": "Order fully refunded.",
        //                         "total": "-6000.00"
        //                     }
        //                 ],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2941/?pay_for_order=true&key=wc_order_l1O3A1x6V9SaM",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-02-01T09:23:37",
        //                 "date_modified_gmt": "2024-02-01T09:50:29",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2941"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2936,
        //                 "parent_id": 0,
        //                 "status": "pending",
        //                 "currency": "BDT",
        //                 "version": "8.5.2",
        //                 "prices_include_tax": false,
        //                 "date_created": "2024-01-31T13:44:43",
        //                 "date_modified": "2024-02-01T09:15:31",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "25000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 42,
        //                 "order_key": "wc_order_1rWvVVn4HAZ3a",
        //                 "billing": {
        //                     "first_name": "Milton",
        //                     "last_name": "Rahman",
        //                     "company": "Whitex Digital",
        //                     "address_1": "dhanmondi 15",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "email": "riazrahman0406@gmail.com",
        //                     "phone": "+8801827196111"
        //                 },
        //                 "shipping": {
        //                     "first_name": "Milton",
        //                     "last_name": "Rahman",
        //                     "company": "Whitex Digital",
        //                     "address_1": "dhanmondi 15",
        //                     "address_2": "",
        //                     "city": "Dhaka",
        //                     "state": "BD-13",
        //                     "postcode": "1209",
        //                     "country": "BD",
        //                     "phone": "+8801827196111"
        //                 },
        //                 "payment_method": "",
        //                 "payment_method_title": "",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "103.73.45.143",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        //                 "created_via": "subscription",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": null,
        //                 "cart_hash": "",
        //                 "number": "2936",
        //                 "meta_data": [
        //                     {
        //                         "id": 19598,
        //                         "key": "_wc_order_attribution_source_type",
        //                         "value": "admin"
        //                     },
        //                     {
        //                         "id": 19617,
        //                         "key": "_subscription_renewal",
        //                         "value": "2935"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 5,
        //                         "name": "Digital Marketing Bundle Tier 1: Spark",
        //                         "product_id": 2167,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "25000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "25000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 25000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2936/?pay_for_order=true&key=wc_order_1rWvVVn4HAZ3a&subscription_renewal=true",
        //                 "is_editable": true,
        //                 "needs_payment": true,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2024-01-31T13:44:43",
        //                 "date_modified_gmt": "2024-02-01T09:15:31",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": null,
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2936"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/42"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2494,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-07T14:51:54",
        //                 "date_modified": "2023-12-07T14:52:10",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 0,
        //                 "order_key": "wc_order_Ngelmj2ThZ0z5",
        //                 "billing": {
        //                     "first_name": "aaaa",
        //                     "last_name": "aaaa",
        //                     "company": "",
        //                     "address_1": "hashfjaksdfjk",
        //                     "address_2": "",
        //                     "city": "asjdfasjhk",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "aaaaaaaaaaa@aaa.aaa",
        //                     "phone": "123467890"
        //                 },
        //                 "shipping": {
        //                     "first_name": "aaaa",
        //                     "last_name": "aaaa",
        //                     "company": "",
        //                     "address_1": "hashfjaksdfjk",
        //                     "address_2": "",
        //                     "city": "asjdfasjhk",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-07T14:52:10",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2494",
        //                 "meta_data": [
        //                     {
        //                         "id": 9199,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 3,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2494/?pay_for_order=true&key=wc_order_Ngelmj2ThZ0z5",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-07T14:51:54",
        //                 "date_modified_gmt": "2023-12-07T14:52:10",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-07T14:52:10",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2494"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2345,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-01T13:37:47",
        //                 "date_modified": "2023-12-01T13:38:20",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 33,
        //                 "order_key": "wc_order_TBeSNJtOvTrmz",
        //                 "billing": {
        //                     "first_name": "ascdas",
        //                     "last_name": "asdcas",
        //                     "company": "",
        //                     "address_1": "adascdas",
        //                     "address_2": "",
        //                     "city": "asdcas",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "a@a.caa",
        //                     "phone": "097654"
        //                 },
        //                 "shipping": {
        //                     "first_name": "ascdas",
        //                     "last_name": "asdcas",
        //                     "company": "",
        //                     "address_1": "adascdas",
        //                     "address_2": "",
        //                     "city": "asdcas",
        //                     "state": "CA",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-01T13:38:20",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2345",
        //                 "meta_data": [
        //                     {
        //                         "id": 8858,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 2,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2345/?pay_for_order=true&key=wc_order_TBeSNJtOvTrmz",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-01T13:37:47",
        //                 "date_modified_gmt": "2023-12-01T13:38:20",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-01T13:38:20",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2345"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ],
        //                     "customer": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/customers/33"
        //                         }
        //                     ]
        //                 }
        //             },
        //             {
        //                 "id": 2344,
        //                 "parent_id": 0,
        //                 "status": "processing",
        //                 "currency": "BDT",
        //                 "version": "8.3.1",
        //                 "prices_include_tax": false,
        //                 "date_created": "2023-12-01T13:31:43",
        //                 "date_modified": "2023-12-01T13:32:04",
        //                 "discount_total": "0.00",
        //                 "discount_tax": "0.00",
        //                 "shipping_total": "0.00",
        //                 "shipping_tax": "0.00",
        //                 "cart_tax": "0.00",
        //                 "total": "45000.00",
        //                 "total_tax": "0.00",
        //                 "customer_id": 0,
        //                 "order_key": "wc_order_zzUaYs3oIQliY",
        //                 "billing": {
        //                     "first_name": "sadcas",
        //                     "last_name": "adcasd",
        //                     "company": "",
        //                     "address_1": "asdcasdc",
        //                     "address_2": "",
        //                     "city": "asdcasdc",
        //                     "state": "AR",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "email": "ASDFASsF@JSHFAJK.COM",
        //                     "phone": "2323"
        //                 },
        //                 "shipping": {
        //                     "first_name": "sadcas",
        //                     "last_name": "adcasd",
        //                     "company": "",
        //                     "address_1": "asdcasdc",
        //                     "address_2": "",
        //                     "city": "asdcasdc",
        //                     "state": "AR",
        //                     "postcode": "00100",
        //                     "country": "US",
        //                     "phone": ""
        //                 },
        //                 "payment_method": "aamarpay",
        //                 "payment_method_title": "Online Payments",
        //                 "transaction_id": "",
        //                 "customer_ip_address": "196.207.190.234",
        //                 "customer_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
        //                 "created_via": "checkout",
        //                 "customer_note": "",
        //                 "date_completed": null,
        //                 "date_paid": "2023-12-01T13:32:04",
        //                 "cart_hash": "1b798003f84df605d82540a350d537d9",
        //                 "number": "2344",
        //                 "meta_data": [
        //                     {
        //                         "id": 8815,
        //                         "key": "is_vat_exempt",
        //                         "value": "no"
        //                     }
        //                 ],
        //                 "line_items": [
        //                     {
        //                         "id": 1,
        //                         "name": "Elevate: 45,000 BDT",
        //                         "product_id": 2235,
        //                         "variation_id": 0,
        //                         "quantity": 1,
        //                         "tax_class": "",
        //                         "subtotal": "45000.00",
        //                         "subtotal_tax": "0.00",
        //                         "total": "45000.00",
        //                         "total_tax": "0.00",
        //                         "taxes": [],
        //                         "meta_data": [],
        //                         "sku": "",
        //                         "price": 45000,
        //                         "image": {
        //                             "id": "",
        //                             "src": ""
        //                         },
        //                         "parent_name": null
        //                     }
        //                 ],
        //                 "tax_lines": [],
        //                 "shipping_lines": [],
        //                 "fee_lines": [],
        //                 "coupon_lines": [],
        //                 "refunds": [],
        //                 "payment_url": "https://whitexdigital.com/checkout/order-pay/2344/?pay_for_order=true&key=wc_order_zzUaYs3oIQliY",
        //                 "is_editable": false,
        //                 "needs_payment": false,
        //                 "needs_processing": true,
        //                 "date_created_gmt": "2023-12-01T13:31:43",
        //                 "date_modified_gmt": "2023-12-01T13:32:04",
        //                 "date_completed_gmt": null,
        //                 "date_paid_gmt": "2023-12-01T13:32:04",
        //                 "currency_symbol": "৳ ",
        //                 "_links": {
        //                     "self": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders/2344"
        //                         }
        //                     ],
        //                     "collection": [
        //                         {
        //                             "href": "https://whitexdigital.com/wp-json/wc/v3/orders"
        //                         }
        //                     ]
        //                 }
        //             }
        //         ]
        //     }
        // ];

        // Find the first subscription object with the specified customer ID

        const customerSubscription = subscriptions.find(subscription => subscription.customer_id === customer_id);



        console.log(customerSubscription);
        dispatch({
            type: SUBSCRIPTION_SUCCESS,
            payload: customerSubscription
        })
    }
    catch (error) {
        dispatch({
            type: SUBSCRIPTION_FAIL,
            payload: error.response.data.message
        })
    }
};
export const GetCustomerAction = (customer_id) => async (dispatch) => {
    try {
        dispatch({ type: CUSTOMER_REQUEST });

        const userResponse = await axios.get(`https://whitexdigital.com/wp-json/wc/v3/customers/${customer_id}`, {
            params: {
                consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
            },
        });
        dispatch({
            type: CUSTOMER_SUCCESS,
            payload: userResponse?.data
        })
    }
    catch (error) {
        dispatch({
            type: CUSTOMER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const UpdateBillingAction = (customer_id, billingDetails) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BILLING_REQUEST });

        // Update billing details for the user
        const { data } = await axios.put(`https://whitexdigital.com/wp-json/wc/v3/customers/${customer_id}`, { billing: billingDetails, }, {
            params: {
                consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
            },
        });
        console.log(data);

        dispatch({
            type: UPDATE_BILLING_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_BILLING_FAIL,
            payload: error.response.data
        })
    }
}


export const GetSingleSubscriptionAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_SUBSCRIPTION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/subscription/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_SUBSCRIPTION_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_SUBSCRIPTION_FAIL,
            payload: error.response.data.message
        })
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}