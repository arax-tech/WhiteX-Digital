<script setup>
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Loading from '@/components/Loading.vue';

const store = useStore();
const toast = useToast();
const router = useRouter();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Feedbacks");
onMounted(() => store.dispatch("GetFeedbacks"));

const feedbacks = computed(() => store.state.feedbacks.data);
const loading = computed(() => store.state.feedbacks.loading);

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["FeedBack"]?.includes("ReadFeedBack")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});


const feedback = ref({});
const action_taken = ref('')

const search = ref('')
const EditFeedBack = ref(false)
const OpenModal = (fback) => {
    EditFeedBack.value = true;
    feedback.value = fback;

    action_taken.value = fback.action_taken;
}
const headers = [
    
    {
        title: 'Title',
        key: 'feedback.title',
    },
    {
        title: 'Description',
        key: 'feedback.description',
    },
    {
        title: 'Category',
        key: 'feedback.category',
    },
    {
        title: 'Ratings',
        key: 'feedback.ratings',
    },
    {
        title: 'Action Taken',
        key: 'feedback.taken',
    },
    {
        title: 'Actions',
        key: 'feedback.action',
        sortable: false,
    }
]


const refForm = ref()

const UpdateValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdateFeedbackunction();
    })
}



// Update 
const UpdateFeedbackunction = async () => {
    const formData = new FormData();
    formData.append("action_taken", action_taken.value);
    try {
        const response = await store.dispatch('UpdateFeedback', { id: feedback.value.id, formData });
        if (response.status === 200) {
            toast.success(response.message);
            store.dispatch("GetFeedbacks")
            EditFeedBack.value = false;
            action_taken.value = '';
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
        const response = await store.dispatch('DeleteFeedback', id);
        if (response.status === 200) {
            toast.error(response.message);
            store.dispatch("GetFeedbacks");
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
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="8" md="8">
                            <h2>Feedbacks
                                <VBtn v-if='allPermissions["FeedBack"]?.includes("CreateFeedBack") '
                                    to="/client/feedback/create" rounded="pill" color="primary" size="small"
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
                <VDataTable :headers="headers" :items="feedbacks" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">

                    <template #item.feedback.title="{ item }">
                        <span class="text-xs">{{ item.title }}</span>
                    </template>
                    <template #item.feedback.description="{ item }">
                        <span class="text-xs">{{ item?.description.substring(0, 35) }} {{ item?.description.length > 35
                            ? "..."
                            : ""
                            }}</span>
                    </template>
                    <template #item.feedback.category="{ item }">
                        <span class="text-xs">{{ item.category }}</span>
                    </template>
                    <template #item.feedback.ratings="{ item }">
                        <span class="text-xs">{{ item.ratings }}</span>
                    </template>
                    <template #item.feedback.taken="{ item }">
                        <span class="text-xs">{{item?.action_taken ? item?.action_taken : '-'}}</span>
                    </template>

                    <template #item.feedback.action="{ item }"
                        v-if='allPermissions["FeedBack"]?.includes("UpdateFeedBack")'>
                        <IconBtn @click="() => router.push('/client/feedback/edit/' + item.id)">
                            <VTooltip activator="parent" location="top">Update</VTooltip>
                            <VIcon icon="tabler-edit" />
                        </IconBtn>
                        <IconBtn @click="DeleteMessage(item.id)"
                            v-if='allPermissions["FeedBack"]?.includes("DeleteFeedBack")'>
                            <VTooltip activator="parent" location="top">Delete</VTooltip>
                            <VIcon icon="tabler-trash" />
                        </IconBtn>
                    </template>
                </VDataTable>
            </VCard>
        </VCol>
    </VRow>
</template>



