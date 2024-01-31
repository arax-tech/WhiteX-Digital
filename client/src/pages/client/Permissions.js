export const ClientInitialPermissions = {
    // Admin
    CreateTeam: false, ReadTeam: false, UpdateTeam: false, DeleteTeam: false,
    // Subscription
    CreateSubscription: false, ReadSubscription: false, UpdateSubscription: false, DeleteSubscription: false,
    // CancellationRequests
    CreateCancellationRequests: false, ReadCancellationRequests: false, UpdateCancellationRequests: false, DeleteCancellationRequests: false,
    // BillingInformation
    CreateBillingInformation: false, ReadBillingInformation: false, UpdateBillingInformation: false, DeleteBillingInformation: false,
    // InvoiceManagement
    CreateInvoiceManagement: false, ReadInvoiceManagement: false, UpdateInvoiceManagement: false, DeleteInvoiceManagement: false,
    // SupportTicket
    CreateSupportTicket: false, ReadSupportTicket: false, UpdateSupportTicket: false, DeleteSupportTicket: false,
    // FeedBack
    CreateFeedBack: false, ReadFeedBack: false, UpdateFeedBack: false, DeleteFeedBack: false,
};

export const UncombineClientPermissions = (combinedPermissions) => {
    const uncombinedPermissions = { ...ClientInitialPermissions };
    combinedPermissions?.split(',').forEach(permission => {
        if (uncombinedPermissions.hasOwnProperty(permission)) {
            uncombinedPermissions[permission] = true;
        }
    });
    return uncombinedPermissions;
};