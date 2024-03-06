<script setup>
import moment from 'moment';
import { computed, onMounted } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useStore } from 'vuex';
import Loading from '../../../components/Loading.vue';
import { useToast } from 'vue-toast-notification';

const store = useStore();
const toast = useToast();
const router = useRouter();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Subscription Invoices");
onMounted(() => store.dispatch("GetInvoices"));




const invoices = computed(() => store.state.invoices.data);
const loading = computed(() => store.state.invoices.loading);

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["CustomInvoice"]?.includes("ReadCustomInvoice")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

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


const DeleteInvoice = async (id) => {
    if (!confirm(`Are you sure to delete ?`)) {
        return
    }
    try {
        const response = await store.dispatch('DeleteInvoice', id);
        if (response.status === 200) {
            toast.error(response.message);
            store.dispatch("GetInvoices");
        }
    } catch (error) {
        console.log(error)
    }
}


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
                            <h2>
                                Invoices
                                <VBtn v-if='allPermissions["CustomInvoice"]?.includes("CreateCustomInvoice") '
                                    to="/admin/invoice/create" rounded="pill" color="primary" size="small" class="ml-5">
                                    <VIcon start icon="tabler-plus" />
                                    Create
                                </VBtn>
                            </h2>

                        </VCol>
                        <VCol cols="4" md="4">
                            <AppTextField v-model="search" density="compact" placeholder="Search ..."
                                append-inner-icon="tabler-search" single-line hide-details dense outlined />
                        </VCol>
                    </VRow>
                </VCardText>

                <!-- 👉 Data Table  -->
                <VDataTable :headers="headers" :items="invoices" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">
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
                        <IconBtn @click="() => router.push(`/invoice/print/${item?.id}`)"
                            v-if='allPermissions["CustomInvoice"]?.includes("ReadCustomInvoice") '>
                            <VTooltip activator="parent" location="top">View</VTooltip>
                            <VIcon icon="tabler-eye" />
                        </IconBtn>
                        <IconBtn @click="DeleteInvoice(item.id)"
                            v-if='allPermissions["CustomInvoice"]?.includes("DeleteCustomInvoice") '>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>



