export default [
  { heading: "Main" },
  {
    title: "Dashboard",
    icon: { icon: "tabler-smart-home" },
    to: "admin-dashboard",
    read: true,
  },
  {
    title: "Admin",
    icon: { icon: "tabler-user" },
    to: "admin-admin",
  },
  {
    title: "Cient",
    icon: { icon: "tabler-users" },
    to: "admin-client",
  },
  {
    title: "Subscriptions",
    icon: { icon: "tabler-file" },
    children: [
      { title: "Subscription", to: "admin-subscription" },
      { title: "Cancellation Requests", to: "admin-subscription-cancellation-requests" },
    ],
  },
  {
    title: 'Email',
    icon: { icon: 'tabler-mail' },
    to: 'apps-email',
  },
  {
    title: 'Chat',
    icon: { icon: 'tabler-message-circle' },
    to: 'apps-chat',
  },
  {
    title: "Campaigns",
    icon: { icon: "tabler-send" },
    children: [
      { title: "Campaign", to: "admin-campaign" },
      { title: "SMS", to: "admin-campaign-sms" },
      { title: "Email", to: "admin-campaign-email" },
      { title: "APIs Config", to: "admin-campaign-config" },
    ],
  },
  {
    title: "Billing Information",
    icon: { icon: "tabler-id" },
    to: "admin-billing-information",
  },
  {
    title: "Invoice Management",
    icon: { icon: "tabler-printer" },
    children: [
      { title: "WooCommerce", to: "admin-invoice-woocommerce" },
      { title: "Custom", to: "admin-invoice" },
    ],
  },

  // {
  //   title: "Logout",
  //   icon: { icon: "tabler-logout" },
  //   to: "admin-client",
  // },
  { heading: "Others" },
  {
    title: "Pop-up Messages",
    icon: { icon: "tabler-message-circle" },
    to: "admin-popup-messages",
  },
  {
    title: "Lead Tracking",
    icon: { icon: "tabler-color-swatch" },
    to: "admin-lead",
  },
  {
    title: "Support Ticket",
    icon: { icon: "tabler-help-circle" },
    to: "admin-support",
  },
  {
    title: "Feedback",
    icon: { icon: "tabler-star" },
    to: "admin-feedback",
  },
  {
    title: "Custom Menu",
    icon: { icon: "tabler-list" },
    to: "admin-custom-solution",
  },
  {
    title: "Setting",
    icon: { icon: "tabler-settings" },
    to: "admin-setting",
  },
];
