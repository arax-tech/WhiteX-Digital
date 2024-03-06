<script setup>
import { computed, onMounted, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import Loading from '@/components/Loading.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Update Feedback");

const loading = computed(() => store.state.feedbacks.loading);
const feedback = computed(() => store.state.feedbacks.feedback);
onBeforeMount(async () => {
    await store.dispatch("GetSingleFeedback", route.params.id);
    UpdateData();
});

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["FeedBack"]?.includes("UpdateFeedBack")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

const UpdateData = () => {
    const FetchData = feedback.value;
    if (FetchData){
        data.value.title = FetchData.title;
        data.value.description = FetchData.description;
        data.value.ratings = FetchData.ratings;
        data.value.category = FetchData.category;
    }
}


const refForm = ref()
const data = ref({
    title: '',
    description: '',
    ratings: '',
    category: '',
})

const categories = [
    'General',
    'Service',
    'Product',
    'Website',
]
const ratings = [
    '1',
    '2',
    '3',
    '4',
    '5',
]
const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdateFeedbackFunction()
    })

}


const UpdateFeedbackFunction = async () => {
    const formData = new FormData();
    formData.append('title', data.value.title);
    formData.append('description', data.value.description);
    formData.append('ratings', data.value.ratings);
    formData.append('category', data.value.category);
    try {
        const response = await store.dispatch('UpdateFeedback', { id: route.params.id, formData });
        if (response.status === 200) {
            toast.success(response.message);
            router.push('/client/feedback');
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <VRow>
        <!-- 👉 Admins  -->
        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText
                    style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                    <div>
                        <h2>Update Feedback</h2>
                    </div>
                    <div>
                        <VBtn to="/client/feedback" rounded="pill" color="primary" size="small" class="ml-5">
                            <VIcon start icon="tabler-arrow-left" />Back
                        </VBtn>
                    </div>
                </VCardText>

                <VDivider />

                <VCardText class="pt-0">
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>


                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-note" v-model="data.title" placeholder="Title"
                                    persistent-placeholder label="Title" :rules="[requiredValidator]" />
                            </VCol>


                            <VCol md="4" cols="12">
                                <AppSelect v-model="data.category" :items="categories"
                                    prepend-inner-icon="tabler-color-picker" label="Category"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppSelect v-model="data.ratings" :items="ratings"
                                    prepend-inner-icon="tabler-color-picker" label="Ratings"
                                    :rules="[requiredValidator]" />
                            </VCol>

                            <VCol md="12" cols="12">
                                <AppTextarea prepend-inner-icon="tabler-message-2" v-model="data.description"
                                    placeholder="Description" persistent-placeholder label="Description"
                                    :rules="[requiredValidator]" rows="3" />
                            </VCol>

                            <VCol cols="12">
                                <VBtn type="submit" :disabled="loading">{{ loading ? 'Updating...' : 'Update' }}
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>

        </VCol>
    </VRow>
</template>



