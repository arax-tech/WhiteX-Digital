<script setup>
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useStore } from 'vuex';
import Loading from '@/components/Loading.vue';
import moment from 'moment';
import { useRouter } from 'vue-router';

const store = useStore();
const toast = useToast();
const router = useRouter();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Subscription Cancellation Requests");
onMounted(() => store.dispatch("GetSubscriptionCancellations"));

const cancellations = computed(() => store.state.subscriptionCancellations.cancellations);
const loading = computed(() => store.state.subscriptionCancellations.loading);
const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["CancellationRequests"]?.includes("ReadCancellationRequests")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

// headers
const headers = [
    
    {
        title: 'Title',
        key: 'subscription.title',
    },
    {
        title: 'Description',
        key: 'subscription.description',
    },
    {
        title: 'Status',
        key: 'subscription.status',
    },
    {
        title: 'Date',
        key: 'subscription.date',
    },
    {
        title: 'Action',
        key: 'subscription.action',
        sortable: false,
    },
]



const DeleteSubCancellations = async (id) => {
    if (!confirm(`Are you sure to delete ?`)) {
        return
    }
    try {
        const response = await store.dispatch('DeleteSubscriptionCancellations', id);
        if (response.status === 200) {
            toast.error(response.message);
            store.dispatch("GetSubscriptionCancellations");
        }
    } catch (error) {
        console.log(error)
    }
}



</script>

<template>
    <VRow>
        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText
                    style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <div>
                        <h2>Subscription Cancellation Requests</h2>
                    </div>
                    <div>
                        <VBtn v-if='allPermissions["CancellationRequests"]?.includes("CreateCancellationRequests") '
                            to="/client/subscription/cancellation/requests/create" rounded="pill" color="primary"
                            size="small" class="ml-5">
                            <VIcon start icon="tabler-plus" />Create
                        </VBtn>
                    </div>
                </VCardText>

                <!-- 👉 Data Table  -->
                <VDataTable :headers="headers" :items="cancellations" :items-per-page="5" class="text-no-wrap mb-4">

                    <template #item.subscription.title="{ item }">
                        <span class="text-xs">{{ item?.title }}</span>
                    </template>

                    <template #item.subscription.description="{ item }">
                        <span class="text-xs">{{ item?.description }}</span>
                    </template>

                    <template #item.subscription.status="{ item }">
                        <span style="padding: 2px 10px;" v-if="item?.status === 'Pending'"
                            class="rounded bg-primary mr-1">Pending</span>
                        <span style="padding: 2px 10px;" v-else-if="item?.status === 'Approved'"
                            class="rounded bg-success mr-1">Approved</span>
                        <span style="padding: 2px 10px;  background-color: #c72c2c; color: #fff;"
                            v-else-if="item?.status === 'Cancelled'" class="rounded bg-danger mr-1">Cancelled</span>
                    </template>

                    <template #item.subscription.date="{ item }">
                        <span class="text-xs">{{ moment(item?.created_at).format('DD MMM yyyy, hh:mm A') }}</span>
                    </template>



                    <!-- Delete -->

                    <template #item.subscription.action="{ item }">
                        <IconBtn
                            @click="() => router.push('/client/subscription/cancellation/requests/edit/' + item.id) "
                            v-if='allPermissions["CancellationRequests"]?.includes("UpdateCancellationRequests") '>
                            <VTooltip activator="parent" location="top">Update</VTooltip>
                            <VIcon icon="tabler-edit" />
                        </IconBtn>
                        <IconBtn @click="DeleteSubCancellations(item.id)"
                            v-if='allPermissions["CancellationRequests"]?.includes("DeleteCancellationRequests") '>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>


                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>
