export const AdminInitialPermissions = {
    // Admin
    CreateAdmin: false, ReadAdmin: false, UpdateAdmin: false, DeleteAdmin: false,
    // Client
    CreateClient: false, ReadClient: false, UpdateClient: false, DeleteClient: false,
    // Subscription
    CreateSubscription: false, ReadSubscription: false, UpdateSubscription: false, DeleteSubscription: false,
    // CancellationRequests
    CreateCancellationRequests: false, ReadCancellationRequests: false, UpdateCancellationRequests: false, DeleteCancellationRequests: false,
    // BillingInformation
    CreateBillingInformation: false, ReadBillingInformation: false, UpdateBillingInformation: false, DeleteBillingInformation: false,
    // InvoiceManagement
    CreateInvoiceManagement: false, ReadInvoiceManagement: false, UpdateInvoiceManagement: false, DeleteInvoiceManagement: false,
    // PopUpMessages
    CreatePopUpMessages: false, ReadPopUpMessages: false, UpdatePopUpMessages: false, DeletePopUpMessages: false,
    // LeadTracking
    CreateLeadTracking: false, ReadLeadTracking: false, UpdateLeadTracking: false, DeleteLeadTracking: false,
    // SupportTicket
    CreateSupportTicket: false, ReadSupportTicket: false, UpdateSupportTicket: false, DeleteSupportTicket: false,
    // FeedBack
    CreateFeedBack: false, ReadFeedBack: false, UpdateFeedBack: false, DeleteFeedBack: false,
    // CustomMenu
    CreateCustomMenu: false, ReadCustomMenu: false, UpdateCustomMenu: false, DeleteCustomMenu: false,
    // Setting
    ReadSetting: false, UpdateSetting: false,
};

export const UncombineAdminPermissions = (combinedPermissions) => {
    const uncombinedPermissions = { ...AdminInitialPermissions };
    combinedPermissions?.split(',').forEach(permission => {
        if (uncombinedPermissions.hasOwnProperty(permission)) {
            uncombinedPermissions[permission] = true;
        }
    });
    return uncombinedPermissions;
};