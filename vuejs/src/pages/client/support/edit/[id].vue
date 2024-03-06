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
onMounted(() => document.title = "Client - Update Support");

const loading = computed(() => store.state.singleSupport.loading);
const loading1 = computed(() => store.state.supports.loading);

const support = computed(() => store.state.singleSupport.data);
onBeforeMount(async () => {
    await store.dispatch("GetSingleSupport", route.params.id);
    UpdateData();
});

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["SupportTicket"]?.includes("UpdateSupportTicket")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

const UpdateData = () => {
    const FetchData = support.value;
    if (FetchData){
        data.value.title = FetchData.title;
        data.value.message = FetchData.message;
        data.value.department = FetchData.department;
        data.value.priority = FetchData.priority;
        data.value.resolution_summary = FetchData.resolution_summary;
    }
}


const refForm = ref()
const data = ref({
    title: '',
    message: '',
    department: '',
    priority: '',
    resolution_summary: '',
})

const departments = [
    'Technical Support',
    'Customer Service',
    'Billing Inquiries',
    'Product Feedback',
    'Sales Inquiry',
]
const priorities = [
    'Low',
    'Medium',
    'High',
]
const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdateSupportFunction()
    })

}


const UpdateSupportFunction = async () => {
    const formData = new FormData();
    formData.append('title', data.value.title);
    formData.append('message', data.value.message);
    formData.append('department', data.value.department);
    formData.append('priority', data.value.priority);
    formData.append('resolution_summary', data.value.resolution_summary);
    try {
        const response = await store.dispatch('UpdateSupport', { id: route.params.id, formData });
        if (response.status === 200) {
            toast.success(response.message);
            router.push('/client/support');
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
                        <h2>Update Support</h2>
                    </div>
                    <div>
                        <VBtn to="/client/support" rounded="pill" color="primary" size="small" class="ml-5">
                            <VIcon start icon="tabler-arrow-left" />Back
                        </VBtn>
                    </div>
                </VCardText>

                <VDivider />

                <VCardText class="pt-0">
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>


                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-note" v-model="data.title" placeholder="Title"
                                    persistent-placeholder label="Title" :rules="[requiredValidator]" />
                            </VCol>

                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-message" v-model="data.message"
                                    placeholder="Message" persistent-placeholder label="Message"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="6" cols="12">
                                <AppSelect v-model="data.department" :items="departments"
                                    prepend-inner-icon="tabler-color-picker" label="Department"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="6" cols="12">
                                <AppSelect v-model="data.priority" :items="priorities"
                                    prepend-inner-icon="tabler-color-picker" label="Priority"
                                    :rules="[requiredValidator]" />
                            </VCol>

                            <VCol md="12" cols="12">
                                <AppTextarea prepend-inner-icon="tabler-message-2" v-model="data.resolution_summary"
                                    placeholder="Resolution Summary" persistent-placeholder label="Resolution Summary"
                                    :rules="[requiredValidator]" rows="3" />
                            </VCol>





                            <!-- <button @click="getCheckedData">Get Checked Data</button> -->

                            <VCol cols="12">
                                <VBtn type="submit" :disabled="loading1">{{ loading1 ? 'Updating...' : 'Update' }}
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>

        </VCol>
    </VRow>
</template>



