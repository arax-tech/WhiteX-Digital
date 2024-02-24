-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2024 at 07:47 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `whitexdigital`
--

-- --------------------------------------------------------

--
-- Table structure for table `custom_menus`
--

CREATE TABLE `custom_menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tooltip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_menus`
--

INSERT INTO `custom_menus` (`id`, `user_id`, `name`, `link`, `tooltip`, `status`, `created_at`, `updated_at`) VALUES
(5, 1, 'Gmail', 'https://gmail.com/', 'Open Gmail', 'Active', '2024-02-05 15:23:38', '2024-02-05 15:24:14'),
(6, 1, 'Google', 'https://googe.com', 'Vist Google', 'Active', '2024-02-06 15:18:14', '2024-02-06 15:18:39');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ratings` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_taken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` int(11) NOT NULL,
  `issue_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salesperson_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_instructions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_links` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signature` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cost` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2024_01_31_125851_create_cancellation_requests_table', 2),
(5, '2024_01_31_125914_create_supports_table', 2),
(6, '2024_01_31_125929_create_feedback_table', 2),
(7, '2024_01_31_130141_create_popup_messages_table', 2),
(8, '2024_01_31_130205_create_custom_menus_table', 2),
(9, '2024_02_03_132149_create_subscription_cancellations_table', 3),
(10, '2024_02_03_184313_create_settings_table', 4),
(11, '2024_02_03_184618_create_invoices_table', 4),
(12, '2024_02_03_184624_create_invoice_items_table', 4),
(13, '2024_02_06_110603_create_support_chats_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(47, 'App\\User', 22, 'WhiteX', '5103c1bdcb845e37f01f1c8eb23ff8206d370b41f54685e6a2a37d92a5e45356', '[\"*\"]', '2024-02-01 15:57:46', '2024-02-01 15:57:45', '2024-02-01 15:57:46'),
(54, 'App\\User', 22, 'WhiteX', 'addc43915529750308856b54115f7065a8deafadffd0e29f5c49250fc303bc7d', '[\"*\"]', '2024-02-05 07:13:38', '2024-02-05 07:02:36', '2024-02-05 07:13:38'),
(58, 'App\\User', 26, 'WhiteX', 'b013a39c8d8c4806d576b1bb441758df84eb2517d6521e8266a9547d9f1660a1', '[\"*\"]', NULL, '2024-02-05 12:22:15', '2024-02-05 12:22:15'),
(66, 'App\\User', 18, 'WhiteX', '1820aad1c9cc2b00a91c3829cd90fe2d6856afdec6ea0c00e98edceafde83118', '[\"*\"]', NULL, '2024-02-06 04:11:37', '2024-02-06 04:11:37'),
(68, 'App\\User', 18, 'WhiteX', '5e45f6b4fb9286a4bd3b0543019070b18e35e0488b4ce3bb8908cdcd1eb39296', '[\"*\"]', NULL, '2024-02-06 04:12:09', '2024-02-06 04:12:09'),
(69, 'App\\User', 28, 'WhiteX', 'e05b3095c731d909614f323cd0275b402c3f2dd832d8ec33636e55e2fa653038', '[\"*\"]', '2024-02-06 04:27:12', '2024-02-06 04:12:40', '2024-02-06 04:27:12'),
(75, 'App\\User', 31, 'WhiteX', '3792fa2bf1f66468b1c8d9460b8dd90929e82f72d40216e59714d562733a3e72', '[\"*\"]', '2024-02-06 15:15:09', '2024-02-06 13:54:31', '2024-02-06 15:15:09'),
(79, 'App\\User', 1, 'WhiteX', '167057182afcab984a275db04d73ab7061555b7f31b14d19d49c556a40a50c56', '[\"*\"]', '2024-02-10 15:19:02', '2024-02-10 09:05:40', '2024-02-10 15:19:02'),
(80, 'App\\User', 1, 'WhiteX', '3641e478a93cbb8592bb79042b9bc10c6c1a7cf8cc4ade9ac90c8159858b5802', '[\"*\"]', NULL, '2024-02-11 05:51:35', '2024-02-11 05:51:35'),
(81, 'App\\User', 1, 'WhiteX', '2a0c53ccbf8dc35e1b9b345ce6a8fdab76bbaaf3378544c08dc2a08de3c427d9', '[\"*\"]', NULL, '2024-02-11 05:52:43', '2024-02-11 05:52:43'),
(83, 'App\\User', 1, 'WhiteX', '0e929a7c2a83df013a63c97a6b36d5ba008e754e7738bd0c333c4d056ebb1c5a', '[\"*\"]', '2024-02-12 14:17:09', '2024-02-11 05:54:27', '2024-02-12 14:17:09');

-- --------------------------------------------------------

--
-- Table structure for table `popup_messages`
--

CREATE TABLE `popup_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trigger_event` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visibility_start` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visibility_end` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_cancellations`
--

CREATE TABLE `subscription_cancellations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supports`
--

CREATE TABLE `supports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assigned_to` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `priority` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resolution_summary` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_chats`
--

CREATE TABLE `support_chats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `support_id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `support_chats`
--

INSERT INTO `support_chats` (`id`, `user_id`, `support_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'test', '2024-02-07 05:08:53', '2024-02-07 05:08:53'),
(2, 1, 2, 'asd', '2024-02-07 05:09:32', '2024-02-07 05:09:32'),
(3, 14, 2, 'asd', '2024-02-07 05:09:37', '2024-02-07 05:09:37'),
(4, 1, 2, 'ہکاے', '2024-02-07 05:11:26', '2024-02-07 05:11:26'),
(5, 14, 2, 'okay', '2024-02-07 05:11:58', '2024-02-07 05:11:58'),
(6, 1, 2, 'awesoime dskjfh sdfhsd fhsdkf', '2024-02-07 05:12:06', '2024-02-07 05:12:06'),
(7, 14, 2, 'insan studd', '2024-02-07 05:12:19', '2024-02-07 05:12:19');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_settings`
--

CREATE TABLE `tbl_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `address_1` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_2` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone1` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone2` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone3` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `menu_logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fevicon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_settings`
--

INSERT INTO `tbl_settings` (`id`, `address_1`, `address_2`, `email`, `phone1`, `phone2`, `phone3`, `company_name`, `menu_logo`, `fevicon`, `invoice_logo`, `created_at`, `updated_at`) VALUES
(1, 'Office 149, 450 South Brand Brooklyn', 'San Diego County, CA 91905, USA', 'white@info.com', '+1 (123) 456 7891', '+44 (876) 543 2198', '+1 (123) 456 7891', 'WhiteX Digital', 'http://localhost:8000/assets/setting/menu_logo-1707145561.png', 'http://localhost:8000/assets/setting/fevicon-1707048304.png', 'http://localhost:8000/assets/setting/invoice_logo-1707048304.png', '2024-02-03 14:28:05', '2024-02-05 15:06:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Client',
  `permissions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `customer_id`, `name`, `email`, `company_name`, `address_1`, `address_2`, `phone`, `designation`, `password`, `otp`, `reset_token`, `image`, `role`, `permissions`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Admin', 'admin@info.com', NULL, NULL, NULL, NULL, 'Super Admin', '$2y$10$xGPfOTfXi6Fbzk2nk1YV6ORTuAwCFflh5pKkvnDSzEnK.BLQhVgnq', '1', NULL, 'http://localhost:8000/assets/admin/profile/admin-1707145504.jpg', 'Admin', 'CreateAdmin,ReadAdmin,UpdateAdmin,DeleteAdmin,CreateClient,ReadClient,UpdateClient,DeleteClient,CreateSubscription,ReadSubscription,UpdateSubscription,DeleteSubscription,CreateCancellationRequests,ReadCancellationRequests,UpdateCancellationRequests,DeleteCancellationRequests,CreateBillingInformation,ReadBillingInformation,UpdateBillingInformation,DeleteBillingInformation,CreateInvoiceManagement,ReadInvoiceManagement,UpdateInvoiceManagement,DeleteInvoiceManagement,CreatePopUpMessages,ReadPopUpMessages,UpdatePopUpMessages,DeletePopUpMessages,CreateLeadTracking,ReadLeadTracking,UpdateLeadTracking,DeleteLeadTracking,CreateSupportTicket,ReadSupportTicket,UpdateSupportTicket,DeleteSupportTicket,CreateFeedBack,ReadFeedBack,UpdateFeedBack,DeleteFeedBack,CreateCustomMenu,ReadCustomMenu,UpdateCustomMenu,DeleteCustomMenu,ReadSetting,UpdateSetting', NULL, '2024-01-24 07:25:51', '2024-02-05 15:05:04'),
(14, NULL, 'Client', 'client@info.com', 'Arax Tech', 'Shinkiari Mansehra KPK', 'Pakistan', '+92-645-654654', 'Client', '$2y$10$A4R.jNLmMUazdphVwil9/usXyxrJPblWEI7skb0Kx1tqJdvD2iMBm', '2', NULL, 'http://localhost:8000/assets/client/profile/client-1706682503.jpg', 'Client', 'CreateTeam,ReadTeam,UpdateTeam,DeleteTeam,CreateSubscription,ReadSubscription,UpdateSubscription,DeleteSubscription,CreateCancellationRequests,ReadCancellationRequests,UpdateCancellationRequests,DeleteCancellationRequests,CreateBillingInformation,ReadBillingInformation,UpdateBillingInformation,DeleteBillingInformation,CreateInvoiceManagement,ReadInvoiceManagement,UpdateInvoiceManagement,DeleteInvoiceManagement,CreateSupportTicket,ReadSupportTicket,UpdateSupportTicket,DeleteSupportTicket,CreateFeedBack,ReadFeedBack,UpdateFeedBack,DeleteFeedBack', NULL, '2024-01-31 03:58:40', '2024-01-31 13:15:23');

-- --------------------------------------------------------

--
-- Table structure for table `wphm_wpforms_entries`
--

CREATE TABLE `wphm_wpforms_entries` (
  `entry_id` bigint(20) NOT NULL,
  `form_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `type` varchar(30) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `viewed` tinyint(1) DEFAULT 0,
  `starred` tinyint(1) DEFAULT 0,
  `fields` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `meta` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `date` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  `notification` int(11) NOT NULL DEFAULT 1,
  `ip_address` varchar(128) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_agent` varchar(256) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_uuid` varchar(36) COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `wphm_wpforms_entries`
--

INSERT INTO `wphm_wpforms_entries` (`entry_id`, `form_id`, `post_id`, `user_id`, `status`, `type`, `viewed`, `starred`, `fields`, `meta`, `date`, `date_modified`, `notification`, `ip_address`, `user_agent`, `user_uuid`) VALUES
(1, 2908, 0, 1, 'abandoned', '', 0, 0, '{\"3\":{\"name\":\"Layout\",\"value\":\"\",\"id\":3,\"type\":\"layout\"},\"23\":{\"name\":\"First Name\",\"value\":\"mghj\",\"id\":23,\"type\":\"text\"},\"4\":{\"name\":\"Phone\",\"value\":\"+8801827196111\",\"id\":4,\"type\":\"phone\"},\"24\":{\"name\":\"Last Name\",\"value\":\"ffbb\",\"id\":24,\"type\":\"text\"},\"5\":{\"name\":\"Email\",\"value\":\"milton0406rahman@gmail.com\",\"id\":5,\"type\":\"email\"},\"28\":{\"name\":\"Layout\",\"value\":\"\",\"id\":28,\"type\":\"layout\"},\"6\":{\"name\":\"Company Name\",\"value\":\"Whitex Digital\",\"id\":6,\"type\":\"text\"},\"9\":{\"name\":\"Your Role\",\"value\":\"Owner\\/Founder\\/CEO\",\"value_raw\":\"Owner\\/Founder\\/CEO\",\"id\":9,\"type\":\"select\"},\"8\":{\"name\":\"Company Website \\/ URL\",\"value\":\"https:\\/\\/efedsbfdb.com\",\"id\":8,\"type\":\"url\"},\"14\":{\"name\":\"Total Ads Spend - USD\",\"value\":\"555\",\"id\":14,\"type\":\"text\"},\"30\":{\"name\":\"Layout\",\"value\":\"\",\"id\":30,\"type\":\"layout\"},\"31\":{\"name\":\"Select Subcription Package\",\"value\":\"Spark - &#36;25,000.00\",\"value_choice\":\"Spark\",\"value_raw\":\"1\",\"amount\":\"25,000.00\",\"amount_raw\":\"25000.00\",\"currency\":\"USD\",\"image\":\"\",\"id\":31,\"type\":\"payment-multiple\"},\"35\":{\"name\":\"Where did you heard about us?\",\"value\":\"Facebook\",\"value_raw\":\"Facebook\",\"id\":35,\"type\":\"select\"}}', '', '2024-01-31 01:17:00', '2024-01-31 01:17:00', 1, '103.73.45.143', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36', 'e2e6415b-9d85-4157-8119-4b6beee553fd'),
(2, 2908, 0, 0, '', '', 1, 0, '{\"23\":{\"name\":\"First Name\",\"value\":\"Milton\",\"id\":23,\"type\":\"text\"},\"4\":{\"name\":\"Phone\",\"value\":\"+8801827196111\",\"id\":4,\"type\":\"phone\"},\"24\":{\"name\":\"Last Name\",\"value\":\"Rahman\",\"id\":24,\"type\":\"text\"},\"5\":{\"name\":\"Email\",\"value\":\"milton0406rahman@gmail.com\",\"id\":5,\"type\":\"email\"},\"6\":{\"name\":\"Company Name\",\"value\":\"Whitex Digital\",\"id\":6,\"type\":\"text\"},\"9\":{\"name\":\"Your Role\",\"value\":\"Owner\\/Founder\\/CEO\",\"value_raw\":\"Owner\\/Founder\\/CEO\",\"id\":9,\"type\":\"select\"},\"8\":{\"name\":\"Company Website \\/ URL\",\"value\":\"https:\\/\\/whitexdigital.com\",\"id\":8,\"type\":\"url\"},\"14\":{\"name\":\"Total Ads Spend - USD\",\"value\":\"5000\",\"id\":14,\"type\":\"text\"},\"31\":{\"name\":\"Select Subcription Package\",\"value\":\"Spark - &#36;25,000.00\",\"value_choice\":\"Spark\",\"value_raw\":\"1\",\"amount\":\"25,000.00\",\"amount_raw\":\"25000.00\",\"currency\":\"USD\",\"image\":\"\",\"id\":31,\"type\":\"payment-multiple\"},\"35\":{\"name\":\"Where did you heard about us?\",\"value\":\"Google Search\",\"value_raw\":\"Google Search\",\"id\":35,\"type\":\"select\"}}', '', '2024-01-31 11:07:30', '2024-01-31 11:07:30', 1, '103.73.45.143', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36', '053c5ee8-fa11-4f2e-8ba3-63934591dc88'),
(3, 2908, 0, 44, '', '', 0, 0, '{\"23\":{\"name\":\"First Name\",\"value\":\"Arham\",\"id\":23,\"type\":\"text\"},\"4\":{\"name\":\"Phone\",\"value\":\"+923065831989\",\"id\":4,\"type\":\"phone\"},\"24\":{\"name\":\"Last Name\",\"value\":\"Khan\",\"id\":24,\"type\":\"text\"},\"5\":{\"name\":\"Email\",\"value\":\"arhamkhaninnocent1@gmail.com\",\"id\":5,\"type\":\"email\"},\"6\":{\"name\":\"Company Name\",\"value\":\"Arax Tech\",\"id\":6,\"type\":\"text\"},\"9\":{\"name\":\"Your Role\",\"value\":\"Owner\\/Founder\\/CEO\",\"value_raw\":\"Owner\\/Founder\\/CEO\",\"id\":9,\"type\":\"select\"},\"8\":{\"name\":\"Company Website \\/ URL\",\"value\":\"https:\\/\\/www.youtube.com\\/\",\"id\":8,\"type\":\"url\"},\"14\":{\"name\":\"Total Ads Spend - USD\",\"value\":\"$5000\",\"id\":14,\"type\":\"text\"},\"31\":{\"name\":\"Select Subcription Package\",\"value\":\"Spark - &#36;25,000.00\",\"value_choice\":\"Spark\",\"value_raw\":\"1\",\"amount\":\"25,000.00\",\"amount_raw\":\"25000.00\",\"currency\":\"USD\",\"image\":\"\",\"id\":31,\"type\":\"payment-multiple\"},\"35\":{\"name\":\"Where did you heard about us?\",\"value\":\"Google Search\",\"value_raw\":\"Google Search\",\"id\":35,\"type\":\"select\"}}', '', '2024-02-05 13:35:36', '2024-02-05 13:35:36', 1, '154.81.228.2', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36', 'd081033b-9a01-4792-87ca-1417a698763d'),
(4, 2897, 0, 44, '', '', 0, 0, '{\"1\":{\"name\":\"Text* Field (your-name)\",\"value\":\"Brianna Roberson\",\"id\":1,\"type\":\"text\"},\"2\":{\"name\":\"Number* Field (yourPhoneNumber)\",\"value\":\"461\",\"id\":2,\"type\":\"number\"},\"3\":{\"name\":\"Email* Field (your-email)\",\"value\":\"cebadowo@mailinator.com\",\"id\":3,\"type\":\"email\"},\"4\":{\"name\":\"Text* Field (yourCompanyName)\",\"value\":\"Stewart and Glass Associates\",\"id\":4,\"type\":\"text\"},\"5\":{\"name\":\"Url* Field (yourCompanyUrl)\",\"value\":\"https:\\/\\/www.tusajeg.com\",\"id\":5,\"type\":\"url\"},\"6\":{\"name\":\"Select* Field (yourRole)\",\"value\":\"Brand Manager\",\"value_raw\":\"Brand Manager\",\"id\":6,\"type\":\"select\"},\"7\":{\"name\":\"Radio Field (yourLast90DaysAdSpend)\",\"value\":\"$5k - $10k+\",\"value_raw\":\"$5k - $10k+\",\"id\":7,\"type\":\"radio\"},\"8\":{\"name\":\"Select Field (referralSource)\",\"value\":\"YouTube\",\"value_raw\":\"YouTube\",\"id\":8,\"type\":\"select\"}}', '', '2024-02-05 13:37:30', '2024-02-05 13:37:30', 1, '154.81.228.2', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36', 'd081033b-9a01-4792-87ca-1417a698763d'),
(5, 2895, 0, 44, '', '', 0, 0, '{\"1\":{\"name\":\"Full Name*\",\"value\":\"Adrienne Douglas\",\"id\":1,\"type\":\"text\"},\"2\":{\"name\":\"Phone number*\",\"value\":\"62\",\"id\":2,\"type\":\"number\"},\"3\":{\"name\":\"Email Address*\",\"value\":\"mabegero@mailinator.com\",\"id\":3,\"type\":\"email\"},\"4\":{\"name\":\"Company Name*\",\"value\":\"Compton and Duffy Trading\",\"id\":4,\"type\":\"text\"},\"5\":{\"name\":\"Company Website\\/Facebook Page URL*\",\"value\":\"Summers and Buck Inc\",\"id\":5,\"type\":\"text\"}}', '', '2024-02-05 13:38:34', '2024-02-05 13:38:34', 1, '154.81.228.2', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36', 'd081033b-9a01-4792-87ca-1417a698763d'),
(6, 2893, 0, 44, '', '', 0, 0, '{\"1\":{\"name\":\"Full Name*\",\"value\":\"Charde Howell\",\"id\":1,\"type\":\"text\"},\"2\":{\"name\":\"Phone number*\",\"value\":\"147\",\"id\":2,\"type\":\"number\"},\"3\":{\"name\":\"Email Address*\",\"value\":\"bijecete@mailinator.com\",\"id\":3,\"type\":\"email\"},\"4\":{\"name\":\"Company Name*\",\"value\":\"Blake Lloyd Trading\",\"id\":4,\"type\":\"text\"},\"5\":{\"name\":\"Company Website\\/Facebook Page URL*\",\"value\":\"Velazquez and Guerrero Trading\",\"id\":5,\"type\":\"text\"},\"6\":{\"name\":\"Ad Spend in the Last 90 Days (Optional):)\",\"value\":\"5\",\"id\":6,\"type\":\"text\"},\"7\":{\"name\":\"Current Marketing Challenges\",\"value\":\"Quibusdam aut anim r\",\"id\":7,\"type\":\"textarea\"},\"8\":{\"name\":\"Acceptance Field\",\"value\":\"Acceptance Field (your-consent)\",\"value_raw\":\"Acceptance Field (your-consent)\",\"id\":8,\"type\":\"checkbox\"}}', '', '2024-02-05 13:39:22', '2024-02-05 13:39:22', 1, '154.81.228.2', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36', 'd081033b-9a01-4792-87ca-1417a698763d');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `custom_menus`
--
ALTER TABLE `custom_menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `popup_messages`
--
ALTER TABLE `popup_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_cancellations`
--
ALTER TABLE `subscription_cancellations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supports`
--
ALTER TABLE `supports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `support_chats`
--
ALTER TABLE `support_chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `wphm_wpforms_entries`
--
ALTER TABLE `wphm_wpforms_entries`
  ADD PRIMARY KEY (`entry_id`),
  ADD KEY `form_id` (`form_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `custom_menus`
--
ALTER TABLE `custom_menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `popup_messages`
--
ALTER TABLE `popup_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_cancellations`
--
ALTER TABLE `subscription_cancellations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supports`
--
ALTER TABLE `supports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `support_chats`
--
ALTER TABLE `support_chats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `wphm_wpforms_entries`
--
ALTER TABLE `wphm_wpforms_entries`
  MODIFY `entry_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
