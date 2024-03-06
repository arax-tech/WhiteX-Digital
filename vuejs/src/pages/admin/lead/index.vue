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
onMounted(() => document.title = "Admin - Leads");
onMounted(() => store.dispatch("GetLeads"));
const leads = computed(() => store.state.leads.data);
const loading = computed(() => store.state.leads.loading);


const currentTab = ref('Tab1')

const SubscriptionRegistrationsFields = ['First Name', 'Last Name', 'Phone', 'Email', 'Company Name', 'Your Role', 'Company Website \/ URL', 'Total Ads Spend - USD', 'Select Subcription Package', 'Where did you heard about us?'];
const DigitalMarketingBundlePlansFields = ['Text* Field (your-name)', 'Number* Field (yourPhoneNumber)', 'Email* Field (your-email)', 'Text* Field (yourCompanyName)', 'Url* Field (yourCompanyUrl)', 'Select* Field (yourRole)', 'Radio Field (yourLast90DaysAdSpend)', 'Select Field (referralSource)'];
const FreeMarketingAnalysisFields = ['Full Name*', 'Phone number*', 'Email Address*', 'Company Name*', 'Company Website\/Facebook Page URL*'];
const BookFreeStrategyCallsFields = ['Full Name*', 'Phone number*', 'Email Address*', 'Company Name*', 'Company Website\/Facebook Page URL*', 'Ad Spend in the Last 90 Days (Optional):)', 'Current Marketing Challenges', 'Acceptance Field'];

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["LeadTracking"]?.includes("ReadLeadTracking")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});



const getFieldFromRegistration = (registration, fieldName) => {
    if (!registration.fields) return '';
    try {
        const fields = JSON.parse(registration.fields);
        if (!fields) return '';
        const field = Object.values(fields).find(f => f.name === fieldName);
        return field ? field.value : '';
    } catch (error) {
        console.error("Error parsing registration fields:", error);
        return '';
    }
}

</script>

<template>
    <VRow>
        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText>
                    <VRow>
                        <VCol cols="12" md="12"><h2>Leads</h2></VCol>
                    </VRow>
                </VCardText>

                <VTabs v-model="currentTab">
                    <VTab>Subscription Registration Form</VTab>
                    <VTab>Digital Marketing Bundle Plan</VTab>
                    <VTab>Free Marketing Analysis</VTab>
                    <VTab>Book Free Strategy Call</VTab>
                </VTabs>
                <VCardText>
                    <VWindow v-model="currentTab">
                        <VWindowItem value="Tab1">
                            <VTable  class="text-no-wrap">
                                <thead>
                                    <tr>
                                        <th v-for="(field, index) in SubscriptionRegistrationsFields" :key="index">{{ field
                                        }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(registration, index) in leads.SubscriptionRegistrations" :key="index">
                                        <template v-if="registration.fields && typeof registration.fields === 'string'">
                                            <template v-for="(fieldName, fieldIndex) in SubscriptionRegistrationsFields"
                                                :key="fieldIndex">
                                                <td>
                                                    {{ getFieldFromRegistration(registration, fieldName) }}
                                                </td>
                                            </template>
                                        </template>
                                    </tr>
                                </tbody>
                            </VTable>
                        </VWindowItem>
                        <VWindowItem value="Tab2">
                            <VTable  class="text-no-wrap">
                                <thead>
                                    <tr>
                                        <th v-for="(field, index) in DigitalMarketingBundlePlansFields" :key="index">{{
                                            field
                                        }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(registration, index) in leads.DigitalMarketingBundlePlans" :key="index">
                                        <template v-if="registration.fields && typeof registration.fields === 'string'">
                                            <template v-for="(fieldName, fieldIndex) in DigitalMarketingBundlePlansFields"
                                                :key="fieldIndex">
                                                <td>
                                                    {{ getFieldFromRegistration(registration, fieldName) }}
                                                </td>
                                            </template>
                                        </template>
                                    </tr>
                                </tbody>
                            </VTable>
                        </VWindowItem>
                        <VWindowItem value="Tab3">
                            <VTable  class="text-no-wrap">
                                <thead>
                                    <tr>
                                        <th v-for="(field, index) in FreeMarketingAnalysisFields" :key="index">{{
                                            field
                                        }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(registration, index) in leads.FreeMarketingAnalysis" :key="index">
                                        <template v-if="registration.fields && typeof registration.fields === 'string'">
                                            <template v-for="(fieldName, fieldIndex) in FreeMarketingAnalysisFields"
                                                :key="fieldIndex">
                                                <td>
                                                    {{ getFieldFromRegistration(registration, fieldName) }}
                                                </td>
                                            </template>
                                        </template>
                                    </tr>
                                </tbody>
                            </VTable>

                        </VWindowItem>
                        <VWindowItem value="Tab4">
                            <VTable  class="text-no-wrap">
                                <thead>
                                    <tr>
                                        <th v-for="(field, index) in BookFreeStrategyCallsFields" :key="index">{{
                                            field
                                        }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(registration, index) in leads.BookFreeStrategyCalls" :key="index">
                                        <template v-if="registration.fields && typeof registration.fields === 'string'">
                                            <template v-for="(fieldName, fieldIndex) in BookFreeStrategyCallsFields"
                                                :key="fieldIndex">
                                                <td>
                                                    {{ getFieldFromRegistration(registration, fieldName) }}
                                                </td>
                                            </template>
                                        </template>
                                    </tr>
                                </tbody>
                            </VTable>

                        </VWindowItem>
                    </VWindow>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>



