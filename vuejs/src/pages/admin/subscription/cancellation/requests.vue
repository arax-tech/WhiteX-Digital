<script setup>
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useStore } from 'vuex';
import Loading from '../../../../components/Loading.vue';
import moment from 'moment';

const store = useStore();
const router = useRouter();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Subscription Cancellation Requests");
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


const search = ref('')
const status = ref(null)
const cancellation = ref(null)
const isDialogVisible = ref(false)

const OpenModal = (canc) => {
    isDialogVisible.value = true;
    cancellation.value = canc;
};


const CloseModal = () => {
    isDialogVisible.value = false;
    cancellation.value = null;
};

// headers
const headers = [
    {
        title: 'Client',
        key: 'subscription.client',
    },
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

const UpdatedSubscriptionCancellationFunction = async () => {
    const formData = new FormData();
    formData.append('status', status.value);
    try {
        const response = await store.dispatch('UpdateSubscriptionCancellation', { id: cancellation.value.id, formData });
        if (response.status === 200) {
            toast.success(response.message);
            CloseModal();
            store.dispatch("GetSubscriptionCancellations");
        }
    } catch (error) {
        console.error(error);
    }
}

const statuses = [
    'Pending',
    'Approved',
    'Cancelled',
]
</script>

<template>
    <VRow>
        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="8" md="8">
                            <h2>Subscription Cancellation Requests</h2>
                        </VCol>
                        <VCol cols="4" md="4">
                            <AppTextField v-model="search" density="compact" placeholder="Search ..."
                                append-inner-icon="tabler-search" single-line hide-details dense outlined />
                        </VCol>
                    </VRow>
                </VCardText>

                <!-- 👉 Data Table  -->
                <VDataTable :headers="headers" :items="cancellations" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.subscription.client="{ item }">
                        <div class="d-flex align-center">
                            <div>
                                <VImg rounded :src="item.user_image?.length > 0 ? item.user_image : '/placeholder.jpg'"
                                    height="40" width="40" />
                            </div>
                            <div class="d-flex flex-column ms-3">
                                <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{
                                    item.user_name }}</span>
                            </div>
                        </div>
                    </template>

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
                        <IconBtn @click="OpenModal(item)"
                            v-if='allPermissions["CancellationRequests"]?.includes("UpdateCancellationRequests") '>
                            <VTooltip activator="parent" location="top">Update</VTooltip>
                            <VIcon icon="tabler-edit" />
                        </IconBtn>
                        <IconBtn @click="DeleteSubCancellations(item.id)"
                            v-if='allPermissions["CancellationRequests"]?.includes("DeleteCancellationRequests") '>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>

                        <VDialog v-if="cancellation" v-model="isDialogVisible" width="600">


                            <!-- Dialog close btn -->
                            <DialogCloseBtn @click="CloseModal" />

                            <!-- Dialog Content -->
                            <VCard title="Update Subscription Cancellation">
                                <VDivider class="mt-3" />


                                <VCardText>
                                    <form @submit.prevent="UpdatedSubscriptionCancellationFunction" class="p-2">

                                        <AppSelect v-model="status" :items="statuses"
                                            prepend-inner-icon="tabler-color-picker" label="Status"
                                            :rules="[requiredValidator]" />
                                        <br>

                                        <VBtn type="submit" :disabled="loading">{{ loading ? 'Updating...' : 'Update' }}
                                        </VBtn>
                                    </form>
                                </VCardText>



                            </VCard>
                        </VDialog>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>
