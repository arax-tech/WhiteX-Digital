export const ClientPermissions = {
    Teams: { permissions: ['CreateTeams', 'ReadTeams', 'UpdateTeams', 'DeleteTeams'] },
    Subscription: { permissions: ['ReadSubscription'] },
    CancellationRequests: { permissions: ['CreateCancellationRequests','ReadCancellationRequests', 'UpdateCancellationRequests', 'DeleteCancellationRequests'] },
    BillingInformation: { permissions: ['ReadBillingInformation'] },
    InvoiceManagement: { permissions: ['ReadInvoiceManagement'] },
    SupportTicket: { permissions: ['CreateSupportTicket', 'ReadSupportTicket', 'UpdateSupportTicket', 'DeleteSupportTicket'] },
    FeedBack: { permissions: ['CreateFeedBack', 'ReadFeedBack', 'UpdateFeedBack', 'DeleteFeedBack'] },
};