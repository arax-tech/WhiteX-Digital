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
onMounted(() => document.title = "Admin - Custom Solution");
onMounted(() => store.dispatch("GetSolutions"));
onMounted(() => store.dispatch("GetClients"));
onMounted(() => store.dispatch("GetAdmins"));
const clients = computed(() => store.state.clients.clients);
const admins = computed(() => store.state.admins.admins);

const solutions = computed(() => store.state.solutions.data);
const loading = computed(() => store.state.solutions.loading);


const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["CustomMenu"]?.includes("ReadCustomMenu")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});


const type = ref('Admin');
const message = ref({});
const data = ref({
    user_id: '',
    name: '',
    link: '',
    tooltip: '',
    status: '',
})

const search = ref('')
const CreateMenu = ref(false)
const EditMenu = ref(false)
const OpenModal = (msg) => {
    EditMenu.value = true;
    message.value = msg;


    data.value.user_id = msg.user_id;
    data.value.name = msg.name;
    data.value.link = msg.link;
    data.value.tooltip = msg.tooltip;
    data.value.status = msg.status;
    type.value = msg.user.role === "Admin" ? 'Admin' : 'Client'
}
const CloseModal = (msg) => {
    EditMenu.value = false;
    message.value = '';

    type.value = "Client";
}


// headers
const headers = [
    {
        title: 'User',
        key: 'solution.user',
    },
    {
        title: 'Name',
        key: 'solution.name',
    },
    {
        title: 'Link',
        key: 'solution.link',
    },
    {
        title: 'Tooltip',
        key: 'solution.tooltip',
    },
    {
        title: 'Status',
        key: 'solution.status',
    },
    {
        title: 'Actions',
        key: 'solution.action',
        sortable: false,
    }
]


const refForm = ref()
const CreateValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            CreateMenuFunction();
    })
}
const UpdateValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdateMenuFunction();
    })
}

// Create
const CreateMenuFunction = async () => {
    const formData = new FormData();
    formData.append("user_id", data.value.user_id);
    formData.append("name", data.value.name);
    formData.append("link", data.value.link);
    formData.append("tooltip", data.value.tooltip);
    formData.append("status", data.value.status);
    try {
        const response = await store.dispatch('CreateSolution', formData);
        if (response.status === 200) {
            toast.success(response.message);
            store.dispatch("GetSolutions")
            CreateMenu.value = false;
            data.value = '';
        }
    } catch (error) {
        console.error(error);
    }
}


// Update 
const UpdateMenuFunction = async () => {
    const formData = new FormData();
    formData.append("user_id", data.value.user_id);
    formData.append("name", data.value.name);
    formData.append("link", data.value.link);
    formData.append("tooltip", data.value.tooltip);
    formData.append("status", data.value.status);
    try {
        const response = await store.dispatch('UpdateSolution', { id: message.value.id, formData });
        if (response.status === 200) {
            toast.success(response.message);
            store.dispatch("GetSolutions")
            CloseModal();
        }
    } catch (error) {
        console.error(error);
    }
}

// Delete
const DeleteMessage = async (id) => {
    if (!confirm(`Are you sure to delete ?`)) {
        return
    }
    try {
        const response = await store.dispatch('DeleteSolution', id);
        if (response.status === 200) {
            toast.error(response.message);
            store.dispatch("GetSolutions");
        }
    } catch (error) {
        console.log(error)
    }
}
const events = [
    'Login',
    'Completing a Task',
    'Billing',
    'Subscription Issue',
]
const statuses = [
    'Active',
    'Disable',
]
const types = [
    'Admin',
    'Client',
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
                            <h2>Custom Solution
                                <VBtn v-if='allPermissions["CustomMenu"]?.includes("CreateCustomMenu")'
                                    @click="CreateMenu = !CreateMenu" rounded="pill" color="primary" size="small"
                                    class="ml-5">
                                    <VIcon start icon="tabler-plus" />
                                    Create
                                </VBtn>

                                <!-- Create -->
                                <VDialog v-model="CreateMenu" persistent width="900">
                                    <DialogCloseBtn @click="CloseModal()" />
                                    <VCard title="Create Custom Solution">
                                        <VDivider class="mt-3" />
                                        <VCardText>
                                            <VForm ref="refForm" @submit.prevent="CreateValidateFunction">
                                                <VRow>
                                                    <VCol cols="12" md="4">
                                                        <AppSelect v-model="type" :items="types" item-title="email"
                                                            item-value="id" label="Menu For"
                                                            prepend-inner-icon="tabler-list" persistent-placeholder
                                                            placeholder="Choose.." :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4" v-if="type === 'Client'">
                                                        <AppSelect v-model="data.user_id" :items="clients"
                                                            item-title="email" item-value="id" label="Clients"
                                                            prepend-inner-icon="tabler-user" persistent-placeholder
                                                            placeholder="Choose.." />
                                                    </VCol>
                                                    <VCol cols="12" md="4" v-else>
                                                        <AppSelect v-model="data.user_id" :items="admins"
                                                            item-title="email" item-value="id" label="Admins"
                                                            prepend-inner-icon="tabler-user" persistent-placeholder
                                                            placeholder="Choose.." />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppTextField v-model="data.name"
                                                            prepend-inner-icon="tabler-note" placeholder="Name"
                                                            persistent-placeholder label="Name"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppTextField v-model="data.link"
                                                            prepend-inner-icon="tabler-link" placeholder="Link"
                                                            persistent-placeholder label="Link"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppTextField v-model="data.tooltip"
                                                            prepend-inner-icon="tabler-link" placeholder="Tooltip"
                                                            persistent-placeholder label="Tooltip"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>

                                                    <VCol cols="12" md="4">
                                                        <AppSelect v-model="data.status" :items="statuses"
                                                            prepend-inner-icon="tabler-color-picker" label="Status"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>


                                                    <VCol cols="12">
                                                        <VBtn type="submit" :disabled="loading">{{ loading ?
                                                            'Creating...' :
                                                            'Create' }}</VBtn>
                                                    </VCol>
                                                </VRow>
                                            </VForm>
                                        </VCardText>
                                    </VCard>
                                </VDialog>
                                <!-- Update -->
                                <VDialog v-if="message" v-model="EditMenu" persistent width="900">
                                    <DialogCloseBtn @click="EditMenu = !EditMenu" />
                                    <VCard title="Update Custom SOlution  Message">
                                        <VDivider class="mt-3" />
                                        <VCardText>
                                            <VForm ref="refForm" @submit.prevent="UpdateValidateFunction">
                                                <VRow>
                                                    <VCol cols="12" md="4">
                                                        <AppSelect v-model="type" :items="types" item-title="email"
                                                            item-value="id" label="Menu For"
                                                            prepend-inner-icon="tabler-list" persistent-placeholder
                                                            placeholder="Choose.." :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4" v-if="type === 'Client'">
                                                        <AppSelect v-model="data.user_id" :items="clients"
                                                            item-title="email" item-value="id" label="Clients"
                                                            prepend-inner-icon="tabler-user" persistent-placeholder
                                                            placeholder="Choose.." />
                                                    </VCol>
                                                    <VCol cols="12" md="4" v-else>
                                                        <AppSelect v-model="data.user_id" :items="admins"
                                                            item-title="email" item-value="id" label="Admins"
                                                            prepend-inner-icon="tabler-user" persistent-placeholder
                                                            placeholder="Choose.." />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppTextField v-model="data.name"
                                                            prepend-inner-icon="tabler-note" placeholder="Name"
                                                            persistent-placeholder label="Name"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppTextField v-model="data.link"
                                                            prepend-inner-icon="tabler-link" placeholder="Link"
                                                            persistent-placeholder label="Link"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppTextField v-model="data.tooltip"
                                                            prepend-inner-icon="tabler-link" placeholder="Tooltip"
                                                            persistent-placeholder label="Tooltip"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>

                                                    <VCol cols="12" md="4">
                                                        <AppSelect v-model="data.status" :items="statuses"
                                                            prepend-inner-icon="tabler-color-picker" label="Status"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>


                                                    <VCol cols="12">
                                                        <VBtn type="submit" :disabled="loading">{{ loading ?
                                                            'Updating...' : 'Update' }}</VBtn>
                                                    </VCol>
                                                </VRow>
                                            </VForm>
                                        </VCardText>
                                    </VCard>
                                </VDialog>
                            </h2>

                        </VCol>
                        <VCol cols="4" md="4">
                            <AppTextField v-model="search" density="compact" placeholder="Search ..."
                                append-inner-icon="tabler-search" single-line hide-details dense outlined />
                        </VCol>
                    </VRow>
                </VCardText>

                <!-- 👉 Data Table  -->
                <VDataTable :headers="headers" :items="solutions" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.solution.user="{ item }">

                        <div class="d-flex align-center">
                            <div>
                                <VImg rounded
                                    :src="item.user?.image?.length > 0 ? item.user?.image : '/placeholder.jpg'"
                                    height="40" width="40" />
                            </div>
                            <div class="d-flex flex-column ms-3">
                                <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{
                                    item.user?.name
                                    }}</span>
                                <span class="text-xs">{{ item.user.designation }}</span>
                            </div>
                        </div>
                    </template>

                    <template #item.solution.name="{ item }">
                        <span class="text-xs">{{ item.name }}</span>
                    </template>

                    <template #item.solution.link="{ item }">
                        <span class="text-xs">{{ item.link }}</span>
                    </template>

                    <template #item.solution.tooltip="{ item }">
                        <span class="text-xs">{{ item.tooltip }}</span>
                    </template>

                    <template #item.solution.status="{ item }">
                        <VChip v-if="item.status === 'Active'" color="success">Active</VChip>
                        <VChip v-else-if="item.status === 'Disable'" color="error">Disable</VChip>
                    </template>

                    <template #item.solution.action="{ item }"
                        v-if='allPermissions["CustomMenu"]?.includes("UpdateCustomMenu") '>
                        <IconBtn @click="OpenModal(item)">
                            <VTooltip activator="parent" location="top">Update</VTooltip>
                            <VIcon icon="tabler-edit" />
                        </IconBtn>
                        <IconBtn @click="DeleteMessage(item.id)"
                            v-if='allPermissions["CustomMenu"]?.includes("DeleteCustomMenu")'>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>
