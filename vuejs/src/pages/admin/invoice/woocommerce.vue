<script setup>
import moment from 'moment';
import { computed, onMounted } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useStore } from 'vuex';
import Loading from '@/components/Loading.vue';

const store = useStore();
const router = useRouter();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Subscription Invoices");
onMounted(() => store.dispatch("GetSubscriptionInvoices"));




const invoices = computed(() => store.state.subscriptionInvoices.data);
const loading = computed(() => store.state.subscriptionInvoices.loading);

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["WooCommerceInvoice"]?.includes("ReadWooCommerceInvoice")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});


const search = ref('')

// headers
const headers = [
    {
        title: 'Billing',
        key: 'invoice.billing',
    },
    {
        title: 'Item',
        key: 'invoice.item',
    },
    {
        title: 'Status',
        key: 'invoice.status',
    },
    {
        title: 'Order Date',
        key: 'invoice.order_date',
    }
]

</script>

<template>
    <VRow>
        <!-- 👉 Admins  -->

        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="8" md="8">
                            <h2>Woo Commerce Invoices</h2>
                        </VCol>
                        <VCol cols="4" md="4">
                            <AppTextField v-model="search" density="compact" placeholder="Search ..."
                                append-inner-icon="tabler-search" single-line hide-details dense outlined />
                        </VCol>
                    </VRow>
                </VCardText>

                <!-- 👉 Data Table  -->

                <VDataTable :headers="headers" :items="invoices ? invoices : []" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.invoice.billing="{ item }">
                        <span class="text-xs">
                            <b>Full Name : </b> {{ item?.billing?.first_name }} {{ item?.billing?.last_name }} <br />
                            <b>Company : </b> {{ item?.billing?.company }} <br />
                            <b>Email : </b> {{ item?.billing?.email }} <br />
                            <b>Phone : </b> {{ item?.billing?.phone }} <br />
                            <b>City : </b> {{ item?.billing?.city }} <br />
                            <b>Country : </b> {{ item?.billing?.country }} <br />
                            <b>Full Address : </b> {{ item?.billing?.address_1 }}, {{ item?.billing?.address_2 }}<br />

                        </span>
                    </template>

                    <template #item.invoice.item="{ item }">
                        <b>Name : </b> {{ item?.line_items[0]?.name }} <br />
                        <b>Price : </b> {{ item?.line_items[0]?.price }} <br />
                        <b>Quantity : </b> {{ item?.line_items[0]?.quantity }} <br />

                    </template>
                    <template #item.invoice.status="{ item }">
                        <span style="padding: 2px 10px;" class="rounded bg-success">Completed</span>
                    </template>
                    <template #item.invoice.order_date="{ item }">
                        <span class="text-xs">
                            {{ item?.date_completed ? moment(item?.date_completed).format('DD MMM yyyy') : '-' }}
                        </span>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>



