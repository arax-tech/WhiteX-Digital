export default [
  { heading: "Main" },
  {
    title: "Dashboard",
    icon: { icon: "tabler-smart-home" },
    to: "client-dashboard",
  },
  {
    title: "Teams",
    icon: { icon: "tabler-user" },
    to: "client-team",
  },
  {
    title: "Subscriptions",
    icon: { icon: "tabler-file" },
    children: [
      { title: "Subscription", to: "client-subscription" },
      { title: "Cancellation Requests", to: "client-subscription-cancellation-requests" },
    ],
  },
  {
    title: "Billing Information",
    icon: { icon: "tabler-id" },
    to: "client-billing-information",
  },
  {
    title: "Invoice Information",
    icon: { icon: "tabler-printer" },
    to: "client-invoice",
  },
  { heading: "Setting" },
  {
    title: "Profile",
    icon: { icon: "tabler-user" },
    to: "client-profile",
  },
  {
    title: "Update Password",
    icon: { icon: "tabler-lock" },
    to: "client-password",
  },
  { heading: "Other" },
  {
    title: "Support Ticket",
    icon: { icon: "tabler-help-circle" },
    to: "client-support",
  },
  {
    title: "Feedback",
    icon: { icon: "tabler-star" },
    to: "client-feedback",
  },
];
