<script setup>
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Setting");
onMounted(() => store.dispatch('GetAuthUser'));


const store = useStore();
const toast = useToast();


const setting = computed(() => store.state.auth.setting);
const loading = computed(() => store.state.auth.loading);


const data = ref({
    company_name: setting.value.company_name,
    email: setting.value.email,
    phone1: setting.value.phone1,
    phone2: setting.value.phone2,
    phone3: setting.value.phone3,
    address_1: setting.value.address_1,
    address_2: setting.value.address_2,
    
    menu_logo: null,
    fevicon: null,
    invoice_logo: null,
});


const refForm = ref()
const ValidateFunction = (event) => {
    event.preventDefault();
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdateProfileFunction();
    })
}


const UpdateSettingFunction = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("company_name", data.value.company_name);
    formData.append("email", data.value.email);
    formData.append("phone1", data.value.phone1);
    formData.append("phone2", data.value.phone2);
    formData.append("phone3", data.value.phone3);
    formData.append("address_1", data.value.address_1);
    formData.append("address_2", data.value.address_2);
    formData.append("menu_logo", data.value.menu_logo);
    formData.append("fevicon", data.value.fevicon);
    formData.append("invoice_logo", data.value.invoice_logo);

    try {
        const response = await store.dispatch('UpdateSettingAction', formData);
        if (response.status === 200) {
            store.dispatch('GetAuthUser');
            toast.success(response.message);
        }
    } catch (error) {
        console.error(error);
    }

}

</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Setting">


                <VDivider />

                <VCardText class="pt-0">
                    <!-- 👉 Form -->
                    <VForm class="mt-6" @submit.prevent="ValidateFunction">
                        <VRow>


                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-user" v-model="data.company_name"
                                    placeholder="Company Name" persistent-placeholder label="Company Name" :rules="[requiredValidator]"  />
                            </VCol>

                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-mail" v-model="data.email" placeholder="Email"
                                    persistent-placeholder label="Email" :rules="[requiredValidator]"  />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-phone" v-model="data.phone1"
                                    placeholder="Phone1" persistent-placeholder label="Phone1" :rules="[requiredValidator]"  />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-phone" v-model="data.phone2"
                                    placeholder="Phone2" persistent-placeholder label="Phone2" :rules="[requiredValidator]"  />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-phone" v-model="data.phone3"
                                    placeholder="Phone3" persistent-placeholder label="Phone3" :rules="[requiredValidator]"  />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map-pin" v-model="data.address_1"
                                    placeholder="Address 1" persistent-placeholder label="Address 1" :rules="[requiredValidator]"  />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map-pin" v-model="data.address_2"
                                    placeholder="Address 2" persistent-placeholder label="Address 2" :rules="[requiredValidator]"  />
                            </VCol>
                            <VCol md="4" cols="12" class="mt-2">
                                <VFileInput label="Fevicon" variant="filled"
                                    @change="event => data.fevicon = event.target.files[0]"   />
                            </VCol>
                            <VCol md="4" cols="12" class="mt-2">
                                <VFileInput label="Menu Logo" variant="filled"
                                    @change="event => data.menu_logo = event.target.files[0]"   />
                            </VCol>
                            <VCol md="4" cols="12" class="mt-2">
                                <VFileInput label="Invoice Logo" variant="filled"
                                    @change="event => data.invoice_logo = event.target.files[0]"   />
                            </VCol>
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn type="submit" :disabled="loading">{{ loading ? 'Updating...' : 'Update' }}</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
