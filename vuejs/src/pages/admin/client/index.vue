<script setup>
import { computed } from 'vue';
import { onMounted } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

import moment from 'moment'

const store = useStore();
const router = useRouter();
const toast = useToast();

import Loading from '../../../components/Loading.vue'

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Clients");
onMounted(() => store.dispatch("GetClients"));

const clients = computed(() => store.state.clients.clients);
const loading = computed(() => store.state.clients.loading);


const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["Client"]?.includes("ReadClient")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});



const search = ref('')

// headers
const headers = [
    {
        title: 'Client',
        key: 'client.name',
    },
    {
        title: 'Email',
        key: 'client.email',
    },
    {
        title: 'Company Name',
        key: 'client.company_name',
    },
    {
        title: 'Phone',
        key: 'client.phone',
    },
    {
        title: 'Register At',
        key: 'client.created_at',
    },
    {
        title: 'Action',
        key: 'client.delete',
        sortable: false,
    },
]

const DeleteClientn = async (id) => {
    if (!confirm(`Are you sure to delete ?`)) {
        return
    }
    try {
        const response = await store.dispatch('DeleteClientAction', id);
        if (response.status === 200) {
            toast.error(response.message);
            store.dispatch("GetClients");
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
                            <h2>Clients
                                <VBtn v-if='allPermissions["Client"]?.includes("CreateClient") '
                                    to="/admin/client/create" rounded="pill" color="primary" size="small" class="ml-5">
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
                <VDataTable :headers="headers" :items="clients" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.client.name="{ item }">

                        <div class="d-flex align-center">
                            <div>
                                <VImg :src="item.image?.length > 0 ? item.image : '/placeholder.jpg' " height="40"
                                    width="40" />
                            </div>
                            <div class="d-flex flex-column ms-3">
                                <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.name
                                    }}</span>
                                <span class="text-xs">{{ item.designation }}</span>
                            </div>
                        </div>
                    </template>
                    <template #item.client.email="{ item }">
                        <span class="text-xs">{{ item.email }}</span>
                    </template>
                    <template #item.client.company_name="{ item }">
                        <span class="text-xs">{{ item.company_name }}</span>
                    </template>
                    <template #item.client.phone="{ item }">
                        <span class="text-xs">{{ item.phone }}</span>
                    </template>
                    <template #item.client.created_at="{ item }">
                        <span class="text-xs">{{ moment(item?.created_at).format('DD MMM yyyy, hh:mm A') }}</span>
                    </template>









                    <!-- Delete -->
                    <template #item.client.delete="{ item }">
                        <IconBtn @click="() => router.push('/admin/client/edit/' + item.id)"
                            v-if='allPermissions["Client"]?.includes("UpdateClient")'>
                            <VTooltip activator="parent" location="top">Update</VTooltip>
                            <VIcon icon="tabler-edit" />
                        </IconBtn>
                        <IconBtn @click="DeleteClientn(item.id)"
                            v-if='allPermissions["Client"]?.includes("DeleteClient")'>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>



