<script setup>
import { computed, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import Loading from '@/components/Loading.vue';

const store = useStore();
const toast = useToast();
const router = useRouter();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Billing");

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["BillingInformation"]?.includes("ReadBillingInformation")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

onBeforeMount(async () => {
    if (user.value && user.value.customer_id) {
        store.dispatch("GetClientBilling", user.value.customer_id);
    }
    UpdateData();
});

const loading = computed(() => store.state.clientBilling.loading);
const customer = computed(() => store.state.clientBilling.data);
const UpdateData = () => {
    const FetchData = customer.value;
    if (FetchData) {
        data.value.first_name = FetchData?.billing?.first_name;
        data.value.last_name = FetchData?.billing?.last_name;
        data.value.email = FetchData?.billing?.email;
        data.value.phone = FetchData?.billing?.phone;
        data.value.company = FetchData?.billing?.company;
        data.value.city = FetchData?.billing?.city;
        data.value.state = FetchData?.billing?.state;
        data.value.country = FetchData?.billing?.country;
        data.value.address_1 = FetchData?.billing?.address_1;
        data.value.address_2 = FetchData?.billing?.address_2;
        data.value.postcode = FetchData?.billing?.postcode;
    }
}

const refForm = ref()
const data = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    state: '',
    country: '',
    address_1: '',
    address_2: '',
    postcode: '',
})


const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdateBillingFunction()
    })

}

const UpdateBillingFunction = async () => {
    const billingDetails = {
        address_1: data.value.address_1,
        address_2: data.value.address_2,
        city: data.value.city,
        company: data.value.company,
        country: data.value.country,
        email: data.value.email,
        first_name: data.value.first_name,
        last_name: data.value.last_name,
        phone: data.value.phone,
        state: data.value.state,
        postcode: data.value.postcode,
    }
    try {
        const { data, status } = await store.dispatch('UpdateBillingAction', { customer_id: user.value.customer_id, billing: billingDetails });
        console.log(data);
        if (status === 200) {
            toast.success('Billing Info Update Successfully...');
            store.dispatch("GetClientBilling", user.value.customer_id);
            
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
                <VCardText>
                    <VRow>
                        <VCol cols="12" md="12">
                            <h2>Update Billing Information</h2>
                        </VCol>
                    </VRow>
                </VCardText>


                <VDivider />

                <VCardText class="pt-0">
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>


                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-user" v-model="data.first_name"
                                    placeholder="First Name" persistent-placeholder label="First Name"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-user" v-model="data.last_name"
                                    placeholder="Last Name" persistent-placeholder label="Last Name"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-mail" v-model="data.email" placeholder="Email"
                                    persistent-placeholder label="Email" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-phone" v-model="data.phone" placeholder="Phone"
                                    persistent-placeholder label="Phone" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-id" v-model="data.company"
                                    placeholder="Company" persistent-placeholder label="Company"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map" v-model="data.city" placeholder="City"
                                    persistent-placeholder label="City" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map" v-model="data.state" placeholder="State"
                                    persistent-placeholder label="State" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map-pin" v-model="data.country"
                                    placeholder="Country" persistent-placeholder label="Country"
                                    :rules="[requiredValidator]" />
                            </VCol>

                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map-pin" v-model="data.address_1"
                                    placeholder="Address 1" persistent-placeholder label="Address 1" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map-pin" v-model="data.address_2"
                                    placeholder="Address 2" persistent-placeholder label="Address 2" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map-pin" v-model="data.postcode"
                                    placeholder="Post Code" persistent-placeholder label="Post Code"
                                    :rules="[requiredValidator]" />
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
