<script setup>
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const store = useStore();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Update Password");
const loading = computed(() => store.state.auth.loading);


const data = ref({
    current_password: "",
    new_password: "",
    confirm_password: "",
});


const refForm = ref()
const ValidateFunction = (event) => {
    event.preventDefault();
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdatePasswordFunction();
    })
}

const UpdatePasswordFunction = async (event) => {
    

    try {
        if (data.value.new_password === data.value.confirm_password) {
            const formData = new FormData();
            formData.append('current_password', data.value.current_password);
            formData.append('new_password', data.value.new_password);

            const response = await store.dispatch('UpdatePasswordAction', formData);
            if (response.status === 400) {
                toast.error(response.message);
            }
            if (response.status === 200) {
                toast.success(response.message);
                for (let key in data.value) {
                    data.value[key] = null;
                }
            }

        } else {
            toast.error("Password confirmation does not match...");
        }

    } catch (error) {
        console.error(error);
    }




}

</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Update Password">


                <VDivider />

                <VCardText class="pt-0">
                    <!-- 👉 Form -->
                    <VForm ref="refForm" class="mt-6" @submit.prevent="ValidateFunction">
                        <VRow>
                            <VCol md="12" cols="12">
                                <AppTextField prepend-inner-icon="tabler-lock" v-model="data.current_password"
                                    placeholder="Current Password" persistent-placeholder label="Current Password" :rules="[requiredValidator]"  />
                            </VCol>
                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-lock" v-model="data.new_password"
                                    placeholder="New Password" persistent-placeholder label="New Password" :rules="[requiredValidator]"  />
                            </VCol>
                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-lock" v-model="data.confirm_password"
                                    placeholder="Confirm Password" persistent-placeholder label="Confirm Password" :rules="[requiredValidator]"  />
                            </VCol>
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
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
