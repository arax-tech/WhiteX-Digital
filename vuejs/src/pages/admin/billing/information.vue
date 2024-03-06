<script setup>
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useStore } from 'vuex';
import Loading from '../../../components/Loading.vue';
import moment from 'moment';
import { useRouter } from 'vue-router';

const store = useStore();
const toast = useToast();
const router = useRouter();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Billing");
onMounted(() => store.dispatch("GetSubscriptions"));

const subscriptions = computed(() => store.state.subscriptions.subscriptions);
const plans = computed(() => store.state.subscriptions.plans);
const loading = computed(() => store.state.subscriptions.loading);


const isDialogVisible = ref(false)
const plan_id = ref(null)


const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["BillingInformation"]?.includes("ReadBillingInformation")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});


const search = ref('')

// headers
const headers = [
    {
        title: 'Customer',
        key: 'subscription.customer',
    },
    {
        title: 'Company',
        key: 'subscription.company',
    },
    {
        title: 'City',
        key: 'subscription.city',
    },
    {
        title: 'State',
        key: 'subscription.state',
    },
    {
        title: 'Country',
        key: 'subscription.country',
    },
    {
        title: 'Full Address',
        key: 'subscription.full_address',
    }
]
const subscription = ref(null)
const OpenModal = (subs) => {
    isDialogVisible.value = true;
    subscription.value = subs;
};


const CloseModal = () => {
    isDialogVisible.value = false;
    subscription.value = null;
};

const navigateToExternalUrl = (url) => {
    window.open(url, '_blank');
}



const UpdatedSubscriptionFunction = async () => {
    try {
        const response = await store.dispatch('UpdateSubscriptionAction', { subscriptionId: subscription.value?.id, planId: plan_id.value });
        store.dispatch("GetSubscriptions");
        toast.success('Subscription Update Successfully...');
        CloseModal();
    } catch (error) {
        console.log(error)
    }
}

const currentTab = ref('Tab1')


</script>

<template>
    <VRow>
        <!-- 👉 Admins  -->
       
        <Loading v-if="loading"/>
        <VCol v-else cols="12">
            <VCard>
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="8" md="8">
                            <h2>Billing Information</h2>
                        </VCol>
                        <VCol cols="4" md="4">
                            <AppTextField v-model="search" density="compact" placeholder="Search ..."
                                append-inner-icon="tabler-search" single-line hide-details dense outlined />
                        </VCol>
                    </VRow>
                </VCardText>

                <!-- 👉 Data Table  -->
                <VDataTable :headers="headers" :items="subscriptions" :search="search" :items-per-page="5"
                    class="text-no-wrap mb-4">
                    <!-- product -->
                    <template #item.subscription.customer="{ item }">
                        <span class="text-xs">
                            <b>Full Name : </b> {{ item?.billing?.first_name }} {{ item?.billing?.last_name }} <br />
                            <b>Email : </b> {{ item?.billing?.email }} <br />
                            <b>Phone : </b> {{ item?.billing?.phone }} <br />
                        </span>
                    </template>
                    <template #item.subscription.company="{ item }">
                        <span class="text-xs">{{ item?.billing?.company }}</span>
                    </template>
                    <template #item.subscription.city="{ item }">
                        <span class="text-xs">{{ item?.billing?.city }}</span>
                    </template>
                    <template #item.subscription.state="{ item }">
                        <span class="text-xs">{{ item?.billing?.state }}</span>
                    </template>
                    <template #item.subscription.country="{ item }">
                        <span class="text-xs">{{ item?.billing?.country }}</span>
                    </template>
                    <template #item.subscription.full_address="{ item }">
                        <span class="text-xs">{{item?.billing?.address_1}} - {{item?.billing?.address_2}} , {{item?.billing?.postcode}}</span>
                    </template>
            </VDataTable>
        </VCard>
    </VCol>
</VRow>
</template>



