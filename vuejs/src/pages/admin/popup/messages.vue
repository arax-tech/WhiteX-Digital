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
onMounted(() => document.title = "Admin - Popup Messages");
onMounted(() => store.dispatch("GetPopupMessages"));
onMounted(() => store.dispatch("GetClients"));
const clients = computed(() => store.state.clients.clients);

const popupMessages = computed(() => store.state.messages.data);
const loading = computed(() => store.state.messages.loading);


const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["PopUpMessages"]?.includes("ReadPopUpMessages")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

const message = ref(null);
const data = ref({
    client_id: '',
    content: '',
    trigger_event: '',
    visibility_start: '',
    visibility_end: '',
    status: '',
})

const search = ref('')
const CreateMessage = ref(false)
const EditMessage = ref(false)
const OpenModal = (msg) => {
    message.value = msg;
    // console.log(message.value);

    data.value.client_id = msg.client_id;
    data.value.content = msg.content;
    data.value.trigger_event = msg.trigger_event;
    data.value.visibility_start = msg.visibility_start;
    data.value.visibility_end = msg.visibility_end;
    data.value.status = msg.status;

    EditMessage.value = true;
    
}
const CloseModal = () => {
    data.value = '';
    // EditMessage.value = false;
    message.value = null;
}


// headers
const headers = [
    {
        title: 'Client',
        key: 'popup.client',
    },
    {
        title: 'Content',
        key: 'popup.content',
    },
    {
        title: 'Trigger Event',
        key: 'popup.trigger_event',
    },
    {
        title: 'Visibility Start',
        key: 'popup.visibility_start',
    },
    {
        title: 'Visibility End',
        key: 'popup.visibility_end',
    },
    {
        title: 'Status',
        key: 'popup.status',
    },
    {
        title: 'Actions',
        key: 'popup.action',
        sortable: false,
    }
]


const refForm = ref()
const CreateValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            CreatePMFunction();
    })
}
const UpdateValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdatePMFunction();
    })
}

// Create
const CreatePMFunction = async () => {
    const formData = new FormData();
    formData.append("client_id", data.value.client_id);
    formData.append("content", data.value.content);
    formData.append("trigger_event", data.value.trigger_event);
    formData.append("visibility_start", data.value.visibility_start);
    formData.append("visibility_end", data.value.visibility_end);
    formData.append("status", data.value.status);
    try {
        const response = await store.dispatch('CreatePopupMessage', formData);
        if (response.status === 200) {
            toast.success(response.message);
            store.dispatch("GetPopupMessages")
            CreateMessage.value = false;
            data.value = '';
        }
    } catch (error) {
        console.error(error);
    }
}


// Update 
const UpdatePMFunction = async () => {
    const formData = new FormData();
    formData.append("client_id", data.value.client_id);
    formData.append("content", data.value.content);
    formData.append("trigger_event", data.value.trigger_event);
    formData.append("visibility_start", data.value.visibility_start);
    formData.append("visibility_end", data.value.visibility_end);
    formData.append("status", data.value.status);
    try {
        const response = await store.dispatch('UpdatePopupMessage', { id: message.value.id, formData });
        if (response.status === 200) {
            toast.success(response.message);
            store.dispatch("GetPopupMessages")
            CloseModal()
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
        const response = await store.dispatch('DeletePopupMessage', id);
        if (response.status === 200) {
            toast.error(response.message);
            store.dispatch("GetPopupMessages");
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
    'InActive',
    'Scheduled',
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
                            <h2>Popup Messages
                                <VBtn v-if='allPermissions["PopUpMessages"]?.includes("CreatePopUpMessages") '
                                    @click="CreateMessage = !CreateMessage" rounded="pill" color="primary" size="small"
                                    class="ml-5">
                                    <VIcon start icon="tabler-plus" />
                                    Create
                                </VBtn>

                                <!-- Create -->
                                <VDialog v-model="CreateMessage" persistent width="900">
                                    <DialogCloseBtn @click="CreateMessage = !CreateMessage" />
                                    <VCard title="Create PopUp Message">
                                        <VDivider class="mt-3" />
                                        <VCardText>
                                            <VForm ref="refForm" @submit.prevent="CreateValidateFunction">
                                                <VRow>
                                                    <VCol cols="12" md="4">
                                                        <AppSelect v-model="data.client_id" :items="clients"
                                                            item-title="email" item-value="id" label="Client"
                                                            prepend-inner-icon="tabler-user" persistent-placeholder
                                                            placeholder="Choose.." :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppTextField v-model="data.content"
                                                            prepend-inner-icon="tabler-note" placeholder="Content"
                                                            persistent-placeholder label="Content"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppSelect v-model="data.trigger_event" :items="events"
                                                            prepend-inner-icon="tabler-color-picker"
                                                            label="Trigger Event" :rules="[requiredValidator]" />
                                                    </VCol>

                                                    <VCol cols="12" md="4">
                                                        <AppDateTimePicker v-model="data.visibility_start"
                                                            prepend-inner-icon="tabler-calendar-check"
                                                            placeholder="Visibility Start" persistent-placeholder
                                                            label="Visibility Start" :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppDateTimePicker v-model="data.visibility_end"
                                                            prepend-inner-icon="tabler-calendar-check"
                                                            placeholder="Visibility End" persistent-placeholder
                                                            label="Visibility End" :rules="[requiredValidator]" />
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
                                <VDialog v-if="message !== null" v-model="EditMessage" persistent width="900">
                                    <DialogCloseBtn @click="CloseModal()" />
                                    <VCard title="Update PopUp Message">
                                        <VDivider class="mt-3" />
                                        <VCardText>
                                            <VForm ref="refForm" @submit.prevent="UpdateValidateFunction">
                                                <VRow>
                                                    <VCol cols="12" md="4">
                                                        <AppSelect v-model="data.client_id" :items="clients"
                                                            item-title="email" item-value="id" label="Client"
                                                            prepend-inner-icon="tabler-user" persistent-placeholder
                                                            placeholder="Choose.." :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppTextField v-model="data.content"
                                                            prepend-inner-icon="tabler-note" placeholder="Content"
                                                            persistent-placeholder label="Content"
                                                            :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppSelect v-model="data.trigger_event" :items="events"
                                                            prepend-inner-icon="tabler-color-picker"
                                                            label="Trigger Event" :rules="[requiredValidator]" />
                                                    </VCol>

                                                    <VCol cols="12" md="4">
                                                        <AppDateTimePicker v-model="data.visibility_start"
                                                            prepend-inner-icon="tabler-calendar-check"
                                                            placeholder="Visibility Start" persistent-placeholder
                                                            label="Visibility Start" :rules="[requiredValidator]" />
                                                    </VCol>
                                                    <VCol cols="12" md="4">
                                                        <AppDateTimePicker v-model="data.visibility_end"
                                                            prepend-inner-icon="tabler-calendar-check"
                                                            placeholder="Visibility End" persistent-placeholder
                                                            label="Visibility End" :rules="[requiredValidator]" />
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
                <VDataTable :headers="headers" :items="popupMessages" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.popup.client="{ item }">

                        <div class="d-flex align-center">
                            <div>
                                <VImg rounded
                                    :src="item.client?.image?.length > 0 ? item.client?.image : '/placeholder.jpg'"
                                    height="40" width="40" />
                            </div>
                            <div class="d-flex flex-column ms-3">
                                <span class="d-block font-weight-medium text-truncate text-high-emphasis">
                                    {{ item.client?.name }}
                                </span>
                                <span class="text-xs">{{ item.client.designation }}</span>
                            </div>
                        </div>
                    </template>

                    <template #item.popup.content="{ item }">
                        <span class="text-xs">
                            {{ item?.content.substring(0, 35) }} {{ item?.content.length > 35 ? "..." : "" }}
                        </span>
                    </template>

                    <template #item.popup.trigger_event="{ item }">
                        <span class="text-xs">{{ item.trigger_event }}</span>
                    </template>

                    <template #item.popup.visibility_start="{ item }">
                        <span class="text-xs">
                            {{ item?.visibility_start ? moment(item?.visibility_start).format('DD MMM yyyy') : ' - ' }}
                        </span>
                    </template>

                    <template #item.popup.visibility_end="{ item }">
                        <span class="text-xs">
                            {{ item?.visibility_end ? moment(item?.visibility_end).format('DD MMM yyyy') : '-' }}
                        </span>
                    </template>

                    <template #item.popup.status="{ item }">
                        <VChip v-if="item.status === 'Active'" color="success">Active</VChip>
                        <VChip v-else-if="item.status === 'Scheduled'" color="primary">Scheduled</VChip>
                        <VChip v-else-if="item.status === 'InActive'" color="error">InActive</VChip>
                    </template>

                    <template #item.popup.action="{ item }">
                        <IconBtn @click="OpenModal(item)"
                            v-if='allPermissions["PopUpMessages"]?.includes("UpdatePopUpMessages")'>
                            <VTooltip activator="parent" location="top">Update</VTooltip>
                            <VIcon icon="tabler-edit" />
                        </IconBtn>
                        <IconBtn @click="DeleteMessage(item.id)"
                            v-if='allPermissions["PopUpMessages"]?.includes("DeletePopUpMessages")'>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>
