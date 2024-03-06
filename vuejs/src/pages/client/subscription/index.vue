<script setup>
import Loading from '@/components/Loading.vue';
import moment from 'moment';
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useStore } from 'vuex';

const store = useStore();
const toast = useToast();
const router = useRouter();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Subscription");
onMounted(() => {
    if (user.value && user.value.customer_id) {
        store.dispatch("GetSubscription", user.value.customer_id);
    }
});

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["Subscription"]?.includes("ReadSubscription")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

const loading = computed(() => store.state.subscription.loading);
const subscription1 = computed(() => store.state.subscription.data);


const isDialogVisible = ref(false)

// headers
const headers = [
    {
        title: 'Subscription',
        key: 'subscription.subscription',
    },
    {
        title: 'Item',
        key: 'subscription.items',
    },
    {
        title: 'Total',
        key: 'subscription.total',
    },
    {
        title: 'Start Date',
        key: 'subscription.start_date',
    },
    {
        title: 'Next Payment',
        key: 'subscription.next_payment',
    },
    {
        title: 'End Date',
        key: 'subscription.end_date',
    },
    {
        title: 'Status',
        key: 'subscription.status',
    },
    {
        title: 'Action',
        key: 'subscription.action',
        sortable: false,
    },
]
const subscription = ref(null)
const OpenModal = (subs) => {
    isDialogVisible.value = true;
    subscription.value = subs;
    plan_id.value = subs?.line_items[0]?.name;
};


const CloseModal = () => {
    isDialogVisible.value = false;
    subscription.value = null;
};

const navigateToExternalUrl = (url) => {
    window.open(url, '_blank');
}


const currentTab = ref('Tab1')


</script>

<template>
    <VRow>
        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="12" md="12">
                            <h2>Subscription</h2>
                        </VCol>
                    </VRow>
                </VCardText>

                <!-- 👉 Data Table  -->
                <VDataTable :headers="headers" :items="[subscription1]" :items-per-page="5" class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.subscription.subscription="{ item }">
                        <span class="text-xs">{{ item?.id }} for {{ item?.billing?.first_name }} {{
            item?.billing?.last_name }}</span>
                    </template>

                    <template #item.subscription.items="{ item }">
                        <span class="text-xs">{{ item?.line_items[0]?.name }}</span>
                    </template>

                    <template #item.subscription.total="{ item }">
                        <span class="text-xs">{{ item?.line_items[0]?.subtotal }} / {{ item?.billing_period }}</span>
                    </template>

                    <template #item.subscription.start_date="{ item }">
                        <span class="text-xs">
                            {{ item?.start_date_gmt ? moment(item?.start_date_gmt).format('DD MMM yyyy') : '-' }}
                        </span>
                    </template>

                    <template #item.subscription.next_payment="{ item }">
                        <span class="text-xs">{{ item?.end_date_gmt ? moment(item?.end_date_gmt).format('DD MMM yyyy') :
            '-'
                            }}</span>
                    </template>

                    <template #item.subscription.end_date="{ item }">
                        <span class="text-xs">{{ item?.end_date_gmt ? moment(item?.end_date_gmt).format('DD MMM yyyy') :
            '-'
                            }}</span>
                    </template>

                    <template #item.subscription.status="{ item }">
                        <VChip v-if="item.status === 'pending-cancel'" color="secondary">Pending Cancel</VChip>
                        <VChip v-else-if="item.status === 'expired'" color="info">Expired</VChip>
                        <VChip v-else-if="item.status === 'on-hold'" color="warning">On Hold</VChip>
                        <VChip v-else-if="item.status === 'active'" color="success">Active</VChip>
                        <VChip v-else-if="item.status === 'cancelled'" color="error">Cancelled</VChip>
                    </template>




                    <!-- Delete -->

                    <template #item.subscription.action="{ item }">
                        <IconBtn @click="OpenModal(item)">
                            <VTooltip activator="parent" location="top">View Subscription Details</VTooltip>
                            <VIcon icon="tabler-eye" />
                        </IconBtn>
                        <IconBtn
                            @click="navigateToExternalUrl('https://whitexdigital.com/product/' + (item?.line_items[0]?.product_id))">
                            <VTooltip activator="parent" location="top">View Package</VTooltip>
                            <VIcon icon="tabler-id" />
                        </IconBtn>

                        <VDialog v-if="subscription" v-model="isDialogVisible" width="1000">


                            <!-- Dialog close btn -->
                            <DialogCloseBtn @click="CloseModal" />

                            <!-- Dialog Content -->
                            <VCard title="Subscription Details">
                                <div style="margin-top: 10px;">

                                    <VTabs v-model="currentTab">
                                        <VTab>Details</VTab>
                                        <VTab>Billing Info</VTab>
                                    </VTabs>

                                    <VCardText>
                                        <VWindow v-model="currentTab">
                                            <VWindowItem value="Tab1">
                                                <VRow>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Subscription</label><br />
                                                        <label class="mb-1">#{{ subscription?.id }} for {{
            `${subscription?.user?.first_name}
                                                            ${subscription?.user?.last_name}` }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Item
                                                        </label><br />
                                                        <label class="mb-1">{{ subscription?.line_items[0]?.name
                                                            }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Total
                                                        </label><br />
                                                        <label class="mb-1">{{ subscription?.line_items[0]?.subtotal }}
                                                            / {{
            subscription?.billing_period }}</label>
                                                    </VCol>
                                                </VRow>
                                                <VRow>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Start
                                                            Date</label><br />
                                                        <label class="mb-1">{{ subscription?.start_date_gmt ?
            moment(subscription?.start_date_gmt).format('DD MMM yyyy') :
            '-'
                                                            }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Next
                                                            Payment </label><br />
                                                        <label class="mb-1">{{ subscription?.end_date_gmt ?
            moment(subscription?.end_date_gmt).format('DD MMM yyyy') :
            '-'
                                                            }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label class="text-h6 text-overline mb-1 font-weight-bolder">End
                                                            Date </label><br />
                                                        <label class="mb-1">{{ subscription?.end_date_gmt ?
            moment(subscription?.end_date_gmt).format('DD MMM yyyy') :
            '-'
                                                            }}</label>
                                                    </VCol>
                                                </VRow>
                                                <VRow>
                                                    <VCol cols="12">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Status</label><br />
                                                        <span style="padding: 2px 10px;"
                                                            v-if="subscription.status === 'pending-cancel'"
                                                            class=" rounded bg-secondary">Pending Cancel</span>
                                                        <span style="padding: 2px 10px;"
                                                            v-else-if="subscription.status === 'expired'"
                                                            class=" rounded bg-info">Expired</span>
                                                        <span style="padding: 2px 10px;"
                                                            v-else-if="subscription.status === 'on-hold'"
                                                            class=" rounded bg-warning">On Hold</span>
                                                        <span style="padding: 2px 10px;"
                                                            v-else-if="subscription.status === 'active'"
                                                            class=" rounded bg-success">Active</span>
                                                        <span
                                                            style="padding: 2px 10px; background-color: #c72c2c; color: #fff;"
                                                            v-else-if="subscription.status === 'cancelled'"
                                                            class=" rounded bg-red">Cancelled</span>
                                                    </VCol>
                                                </VRow>
                                            </VWindowItem>
                                            <VWindowItem value="Tab2">
                                                <VRow>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Full
                                                            Name</label><br />
                                                        <label class="mb-1">{{ subscription?.billing?.first_name }} {{
            subscription?.billing?.last_name }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Company
                                                        </label><br />
                                                        <label class="mb-1">{{ subscription?.billing?.company }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Email
                                                        </label><br />
                                                        <label class="mb-1">{{ subscription?.billing?.email }}</label>
                                                    </VCol>
                                                </VRow>
                                                <VRow>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Phone
                                                        </label><br />
                                                        <label class="mb-1">{{ subscription?.billing?.phone }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">City
                                                        </label><br />
                                                        <label class="mb-1">{{ subscription?.billing?.city }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">State
                                                        </label><br />
                                                        <label class="mb-1">{{ subscription?.billing?.state }}</label>
                                                    </VCol>
                                                </VRow>
                                                <VRow>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Country
                                                        </label><br />
                                                        <label class="mb-1">{{ subscription?.billing?.country }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Post
                                                            Code </label><br />
                                                        <label class="mb-1">{{ subscription?.billing?.postcode
                                                            }}</label>
                                                    </VCol>
                                                    <VCol cols="4">
                                                        <label
                                                            class="text-h6 text-overline mb-1 font-weight-bolder">Full
                                                            Address </label><br />
                                                        <label class="mb-1">{{ subscription?.billing?.address_1 }}, {{
            subscription?.billing?.address_2 }}</label>
                                                    </VCol>
                                                </VRow>
                                            </VWindowItem>
                                        </VWindow>
                                    </VCardText>


                                </div>
                            </VCard>
                        </VDialog>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>
