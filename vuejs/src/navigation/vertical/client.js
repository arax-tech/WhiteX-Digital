export default [
  {
    title: "Dashboard",
    icon: { icon: "tabler-smart-home" },
    to: "client-dashboard",
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
      { title: "Subscription", to: "charts-apex-chart" },
      { title: "Cancellation Requests", to: "charts-chartjs" },
    ],
  },
  {
    title: "Mail",
    icon: { icon: "tabler-mail" },
    to: "admin-client",
  },
  {
    title: "Chat",
    icon: { icon: "tabler-message" },
    to: "admin-client",
  },
  {
    title: "Billing Information",
    icon: { icon: "tabler-id" },
    to: "admin-client",
  },
  {
    title: "Invoice Management",
    icon: { icon: "tabler-printer" },
    children: [
      { title: "WooCommerce", to: "charts-apex-chart" },
      { title: "Custom", to: "charts-chartjs" },
    ],
  },
  { heading: "Settings" },
  {
    title: "Profile",
    icon: { icon: "tabler-user" },
    to: "admin-profile",
  },
  {
    title: "Setting",
    icon: { icon: "tabler-settings" },
    to: "admin-setting",
  },
  {
    title: "Update Password",
    icon: { icon: "tabler-lock" },
    to: "admin-password",
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
    to: "admin-client",
  },
  {
    title: "Lead Tracking",
    icon: { icon: "tabler-color-swatch" },
    to: "admin-client",
  },
  {
    title: "Support Ticket",
    icon: { icon: "tabler-help-circle" },
    to: "admin-client",
  },
  {
    title: "Feedback",
    icon: { icon: "tabler-star" },
    to: "admin-client",
  },
  {
    title: "Custom Menu",
    icon: { icon: "tabler-list" },
    to: "admin-client",
  },
];
