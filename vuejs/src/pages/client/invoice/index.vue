<script setup>
import moment from 'moment';
import { computed, onMounted } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useStore } from 'vuex';
import Loading from '@/components/Loading.vue';
import { useToast } from 'vue-toast-notification';

const store = useStore();
const toast = useToast();
const router = useRouter();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Invoices");
onMounted(() => store.dispatch("GetInvoices"));

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["InvoiceManagement"]?.includes("ReadInvoiceManagement")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});


const invoices = computed(() => store.state.invoices.data);
const loading = computed(() => store.state.invoices.loading);



const search = ref('')

// headers
const headers = [
    {
        title: 'Client',
        key: 'invoice.client',
    },
    {
        title: 'Items',
        key: 'invoice.products',
    },
    {
        title: 'Status',
        key: 'invoice.status',
    },
    {
        title: 'Issue Date',
        key: 'invoice.issue_date',
    },
    {
        title: 'Total',
        key: 'invoice.total',
    },
    {
        title: 'Action',
        key: 'invoice.action',
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
                        <VCol cols="12" md="12">
                            <h2>Invoices</h2>
                        </VCol>
                    </VRow>
                </VCardText>

                <!-- 👉 Data Table  -->
                <VDataTable :headers="headers" :items="invoices" :items-per-page="5" class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.invoice.client="{ item }">
                        <span class="text-xs">
                            <b>Name : </b> {{ item?.client?.name }} <br />
                            <b>Company : </b> {{ item?.client?.company_name }} <br />
                            <b>Email : </b> {{ item?.client?.email }} <br />
                            <b>Phone : </b> {{ item?.client?.phone }} <br />

                        </span>
                    </template>

                    <template #item.invoice.products="{ item }">
                        <span v-for="(pro, index) in item?.items" :key="index" class="text-xs">
                            {{ index + 1 }} : {{ pro?.name }}, {{ pro?.qty }} &nbsp;-&nbsp; {{ pro?.price }}<br />
                        </span>
                    </template>
                    <template #item.invoice.status="{ item }">
                        <span style="padding: 2px 10px;" v-if="item?.status === 'Due'"
                            class="rounded bg-warning">Due</span>
                        <span style="padding: 2px 10px;" v-else-if="item?.status === 'Paid'"
                            class="rounded bg-success">Paid</span>
                        <span style="padding: 2px 10px; background-color: #c72c2c; color: #fff;"
                            v-else-if="item?.status === 'UnPaid'" class="rounded">Unpaid</span>
                    </template>
                    <template #item.invoice.issue_date="{ item }">
                        <span class="text-xs">{{ item?.issue_date ? moment(item?.issue_date).format('DD MMM yyyy') :
                            '-' }}</span>
                    </template>
                    <template #item.invoice.total="{ item }">
                        <span class="text-xs">{{ item?.total }}</span>
                    </template>
                    <template #item.invoice.action="{ item }">
                        <IconBtn @click="() => router.push(`/invoice/print/${item?.id}`)">
                            <VTooltip activator="parent" location="top">View</VTooltip>
                            <VIcon icon="tabler-eye" />
                        </IconBtn>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>



