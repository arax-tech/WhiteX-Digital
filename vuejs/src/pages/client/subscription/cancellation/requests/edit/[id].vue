<script setup>
import { computed, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import Loading from '@/components/Loading.vue';
import moment from 'moment';
import { useRouter, useRoute } from 'vue-router';
const store = useStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Update Requests ");

onBeforeMount(async () => {
    await store.dispatch("GetSingleubscriptionCancellation", route.params.id);
    UpdateData();
});

const loading = computed(() => store.state.subscriptionCancellations.loading);
const cancellation = computed(() => store.state.subscriptionCancellations.cancellation);
const UpdateData = () => {
    const FetchData = cancellation.value;
    if (FetchData){
        data.value.title = FetchData.title;
        data.value.description = FetchData.description;
    }
}



const refForm = ref()
const data = ref({
    title : '',
    description : '',
})


const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdateRequestFunction()
    })

}


const UpdateRequestFunction = async () => {
    const formData = new FormData();
    formData.append('title', data.value.title);
    formData.append('description', data.value.description);
    try {
        const response = await store.dispatch('UpdateSubscriptionCancellation', { id: cancellation.value.id, formData });
        if (response.status === 200) {
            toast.success(response.message);
            router.push('/client/subscription/cancellation/requests');
        }
    } catch (error) {
        console.error(error);
    }
};

</script>

<template>
    <VRow>
        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText
                    style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                    <div>
                        <h2>Update Requests</h2>
                    </div>
                    <div>
                        <VBtn to="/client/subscription/cancellation/requests" rounded="pill" color="primary"
                            size="small" class="ml-5">
                            <VIcon start icon="tabler-arrow-left" />Back
                        </VBtn>
                    </div>
                </VCardText>

                <VDivider />

                <VCardText class="pt-0">
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>


                            <VCol md="12" cols="12">
                                <AppTextField prepend-inner-icon="tabler-user" v-model="data.title" placeholder="Title"
                                    persistent-placeholder label="Title" :rules="[requiredValidator]" />
                            </VCol>

                            <VCol md="12" cols="12">
                                <AppTextField prepend-inner-icon="tabler-note" v-model="data.description"
                                    placeholder="Description" persistent-placeholder label="Description"
                                    :rules="[requiredValidator]" />
                            </VCol>

                            <VCol cols="12">
                                <VBtn type="submit" :disabled="loading">Update</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
