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

import Loading from '@/components/Loading.vue'

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Teams");
onMounted(() => store.dispatch("GetTeams"));

const teams = computed(() => store.state.teams.data);
const loading = computed(() => store.state.teams.loading);

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["Teams"]?.includes("ReadTeams")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});




const search = ref('')

// headers
const headers = [
    {
        title: 'Team',
        key: 'team.name',
    },
    {
        title: 'Email',
        key: 'team.email',
    },
    {
        title: 'Designation',
        key: 'team.designation',
    },
    {
        title: 'Phone',
        key: 'team.phone',
    },
    {
        title: 'Created At',
        key: 'team.created_at',
    },
    {
        title: 'Action',
        key: 'team.delete',
        sortable: false,
    },
]

const DeleteTeam = async (id) => {
    if (!confirm(`Are you sure to delete ?`)) {
        return
    }
    try {
        const response = await store.dispatch('DeleteTeamAction', id);
        if (response.status === 200) {
            toast.error(response.message);
            store.dispatch("GetTeams");
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
                            <h2>Teams
                                <VBtn v-if='allPermissions["Teams"]?.includes("CreateTeams")' to="/client/team/create"
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
                <VDataTable :headers="headers" :items="teams" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.team.name="{ item }">

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
                    <template #item.team.email="{ item }">
                        <span class="text-xs">{{ item.email }}</span>
                    </template>
                    <template #item.team.designation="{ item }">
                        <span class="text-xs">{{ item.designation }}</span>
                    </template>
                    <template #item.team.phone="{ item }">
                        <span class="text-xs">{{ item.phone }}</span>
                    </template>
                    <template #item.team.created_at="{ item }">
                        <span class="text-xs">{{ moment(item?.created_at).format('DD MMM yyyy, hh:mm A') }}</span>
                    </template>









                    <!-- Delete -->
                    <template #item.team.delete="{ item }" v-if='allPermissions["Teams"]?.includes("UpdateTeams")'>
                        <IconBtn @click="() => router.push('/client/team/edit/' + item.id)">
                            <VTooltip activator="parent" location="top">Update</VTooltip>
                            <VIcon icon="tabler-edit" />
                        </IconBtn>
                        <IconBtn @click="DeleteTeam(item.id)" v-if='allPermissions["Teams"]?.includes("DeleteTeams")'>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>



