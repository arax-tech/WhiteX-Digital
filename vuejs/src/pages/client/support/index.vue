<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useStore } from 'vuex';
import Loading from '../../../components/Loading.vue';

const store = useStore();
const router = useRouter();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Supports");
onMounted(() => store.dispatch("GetSupports"));

const supports = computed(() => store.state.supports.data);
const loading = computed(() => store.state.supports.loading);

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["SupportTicket"]?.includes("ReadSupportTicket")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

const search = ref('')
const status = ref('')
const assignedTo = ref(null)
const EditSupport = ref(false)
const support = ref({})
const refForm = ref()

const OpenModal = (sup) => {
    EditSupport.value = true;
    support.value = sup;

    status.value = sup.status;
    // assignedTo.value = sup.assigned.email;
}

// headers
const headers = [
    {
        title: 'Assign To',
        key: 'support.assign_to',
    },
    {
        title: 'Title',
        key: 'support.title',
    },
    {
        title: 'Description',
        key: 'support.description',
    },
    {
        title: 'Department',
        key: 'support.department',
    },
    {
        title: 'Priority',
        key: 'support.priority',
    },
    {
        title: 'Resolution Summary',
        key: 'support.resolution_summary',
    },
    {
        title: 'Status',
        key: 'support.status',
    },
    {
        title: 'Action',
        key: 'support.action',
        sortable: false,
    },
]


const statuses = [
    'Open',
    'Pending',
    'Resolved',
    'Closed',
]
const UpdateValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdatedSupportFunction();
    })
}

const UpdatedSupportFunction = async () => {
    const formData = new FormData();
    formData.append("status", status.value);
    if (assignedTo.value != null) {
        formData.append("assigned_to", assignedTo.value);
    }

    try {
        const response = await store.dispatch('UpdateSupport', { id: support.value.id, formData });
        if (response.status === 200) {
            toast.success(response.message);
            store.dispatch("GetSupports")
            EditSupport.value = false;
            status.value = '';
            assignedTo.value = null;
            support.value = '';
        }
    } catch (error) {
        console.error(error);
    }
}
const DeleteSupport = async (id) => {
    if (!confirm(`Are you sure to delete ?`)) {
        return
    }
    try {
        const response = await store.dispatch('DeleteSupport', id);
        if (response.status === 200) {
            toast.error(response.message);
            store.dispatch("GetSupports");
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
                            <h2>Support Tickets
                                <VBtn v-if='allPermissions["SupportTicket"]?.includes("CreateSupportTicket") '
                                    to="/client/support/create" rounded="pill" color="primary" size="small"
                                    class="ml-5">
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
                <VDataTable :headers="headers" :items="supports" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">

                    <template #item.support.assign_to="{ item }">

                        <div class="d-flex align-center">
                            <div>
                                <VImg rounded
                                    :src="item.assigned?.image?.length > 0 ? item.assigned?.image : '/placeholder.jpg'"
                                    height="40" width="40" />
                            </div>
                            <div class="d-flex flex-column ms-3">
                                <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{
                                    item.assigned?.name }}</span>
                                <span class="text-xs">{{ item.assigned?.designation }}</span>
                            </div>
                        </div>
                    </template>
                    <template #item.support.title="{ item }">
                        <span class="text-xs">{{ item.title }}</span>
                    </template>
                    <template #item.support.description="{ item }">
                        <span class="text-xs">{{ item.message }}</span>
                    </template>
                    <template #item.support.department="{ item }">
                        <span class="text-xs">{{ item.department }}</span>
                    </template>
                    <template #item.support.priority="{ item }">
                        <span class="text-xs">{{ item.priority }}</span>
                    </template>
                    <template #item.support.resolution_summary="{ item }">
                        <span class="text-xs">{{ item.resolution_summary }}</span>
                    </template>
                    <template #item.support.status="{ item }">
                        <VChip v-if="item.status === 'Open'" color="primary">{{ item.status }}</VChip>
                        <VChip v-else-if="item.status === 'Pending'" color="primary">{{ item.status }}</VChip>
                        <VChip v-else-if="item.status === 'Resolved'" color="success">{{ item.status }}</VChip>
                        <VChip v-else-if="item.status === 'Closed'" color="error">{{ item.status }}</VChip>
                    </template>

                    <template #item.support.action="{ item }"
                        v-if='allPermissions["SupportTicket"]?.includes("UpdateSupportTicket") '>
                        <IconBtn @click="() => router.push('/client/support/edit/' + item.id)">
                            <VTooltip activator="parent" location="top">Update</VTooltip>
                            <VIcon icon="tabler-edit" />
                        </IconBtn>
                        <IconBtn @click="() => router.push('/client/support/chat/' + item.id)">
                            <VTooltip activator="parent" location="top">Chat</VTooltip>
                            <VIcon icon="tabler-message-circle" />
                        </IconBtn>
                        <IconBtn @click="DeleteSupport(item.id)"
                            v-if='allPermissions["SupportTicket"]?.includes("DeleteSupportTicket") '>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>
                    </template>
                    <!-- Update -->

                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>



