<script setup>
import { computed } from 'vue';
import { onMounted } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import Loading from '../../../components/Loading.vue'
import moment from 'moment'

const store = useStore();
const router = useRouter();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Admins");
onMounted(() => store.dispatch("GetAdmins"));
const admins = computed(() => store.state.admins.admins);
const loading = computed(() => store.state.admins.loading);


const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["Admin"]?.includes("ReadAdmin")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

const search = ref('')

// headers
const headers = [
    {
        title: 'Admin',
        key: 'admin.name',
    },
    {
        title: 'Email',
        key: 'admin.email',
    },
    {
        title: 'designation',
        key: 'admin.designation',
    },
    {
        title: 'Register At',
        key: 'admin.created_at',
    },
    {
        title: 'Action',
        key: 'admin.delete',
        sortable: false,
    },
]

const DeleteAdmin = async (id) => {
    if (!confirm(`Are you sure to delete ?`)) {
        return
    }
    try {
        const response = await store.dispatch('DeleteAdminAction', id);
        if (response.status === 200) {
            toast.error(response.message);
            store.dispatch("GetAdmins");
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
                            <h2>Admins
                                <VBtn v-if='allPermissions["Admin"]?.includes("CreateAdmin")' to="/admin/admin/create"
                                    rounded="pill" color="primary" size="small" class="ml-5">
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
                <VDataTable :headers="headers" :items="admins" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.admin.name="{ item }">

                        <div class="d-flex align-center">
                            <div>
                                <VImg rounded :src="item.image?.length > 0 ? item.image : '/placeholder.jpg'"
                                    height="40" width="40" />
                            </div>
                            <div class="d-flex flex-column ms-3">
                                <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.name
                                    }}</span>
                                <span class="text-xs">{{ item.designation }}</span>
                            </div>
                        </div>
                    </template>
                    <template #item.admin.email="{ item }">
                        <span class="text-xs">{{ item.email }}</span>
                    </template>
                    <template #item.admin.designation="{ item }">
                        <span class="text-xs">{{ item.designation.length > 0 ? item.designation : 'Client' }}</span>
                    </template>
                    <template #item.admin.created_at="{ item }">
                        <span class="text-xs">{{ moment(item?.created_at).format('DD MMM yyyy, hh:mm A') }}</span>
                    </template>








                    <!-- Delete -->
                    <template #item.admin.delete="{ item }">
                        <IconBtn @click="() => router.push('/admin/admin/edit/' + item.id)"
                            v-if='allPermissions["Admin"]?.includes("UpdateAdmin")'>
                            <VTooltip activator="parent" location="top">Update</VTooltip>
                            <VIcon icon="tabler-edit" />
                        </IconBtn>
                        <IconBtn @click="DeleteAdmin(item.id)" v-if='allPermissions["Admin"]?.includes("DeleteAdmin")'>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>



