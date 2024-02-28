<script setup>
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Create Client");
onMounted(() => store.dispatch("GetCustomers"));
const loading = computed(() => store.state.clients.loading);
const customers = computed(() => store.state.clients.customers);


const email = ref('')
const refForm = ref()
const checkedPermissions = ref({});

const ClientPermissions = {
    Teams: { permissions: ['CreateTeams', 'ReadTeams', 'UpdateTeams', 'DeleteTeams'] },
    Subscription: { permissions: ['ReadSubscription', 'DeleteSubscription'] },
    CancellationRequests: { permissions: ['ReadCancellationRequests', 'UpdateCancellationRequests', 'DeleteCancellationRequests'] },
    BillingInformation: { permissions: ['ReadBillingInformation'] },
    InvoiceManagement: { permissions: ['ReadInvoiceManagement'] },
    SupportTicket: { permissions: ['CreateSupportTicket', 'ReadSupportTicket', 'UpdateSupportTicket', 'DeleteSupportTicket'] },
    FeedBack: { permissions: ['CreateFeedBack', 'ReadFeedBack', 'UpdateFeedBack', 'DeleteFeedBack'] },
};


const CheckAllPermissions = () => {
    for (const roleName in ClientPermissions) {
        checkedPermissions.value[roleName] = checkAll.value ? ClientPermissions[roleName].permissions.slice() : [];
    }
};

const checkAll = ref(false);

onMounted(() => {
    CheckAllPermissions(); // initialize with all unchecked
});



const CreateClientFunction = async () => {
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('permissions', JSON.stringify(checkedPermissions.value));
    formData.append("role", "Client");
    try {
        const response = await store.dispatch('CreateClientAction', formData);
        if (response.status === 200) {
            toast.success(response.message);
            router.push('/admin/client');
        }
    } catch (error) {
        console.error(error);
    }
};


const ValidateFunction = () => {
    console.log(email.value.length);
    if (email.value.length > 0) {
        CreateClientFunction();
    } else {
        toast.error('Email is required...');
    }

}

</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardText style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                    <div>
                        <h2>Create Client</h2>
                    </div>
                    <div>
                        <VBtn to="/admin/client" rounded="pill" color="primary" size="small" class="ml-5">
                            <VIcon start icon="tabler-arrow-left" />Back
                        </VBtn>
                    </div>
                </VCardText>

                <VDivider />

                <VCardText class="pt-0">
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>


                            <VCol cols="12" md="12">
                                <!-- <AppTextField v-model="email" prepend-inner-icon="tabler-mail" placeholder="Email" persistent-placeholder label="Email" :rules="[requiredValidator, emailValidator]" /> -->
                                <!-- <AppSelect :items="customers[email]" v-model="email" prepend-inner-icon="tabler-mail" placeholder="Email" persistent-placeholder label="Email"  :rules="[requiredValidator, emailValidator]" /> -->
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <select class="form-control" v-model="email">
                                        <option v-for="(customer, index) in customers" :key="index"
                                            :value="`${customer.id}--|--${customer.email}`">
                                            {{ customer.username }} ---- {{ customer.email }}
                                        </option>
                                    </select>
                                </div>


                            </VCol>


                            <VCol cols="12" md="12" class="mt-6">
                                <div
                                    style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">

                                    <h2 class="mb-2">Permissions</h2>
                                    <div>
                                        <input id="checkAll" type="checkbox" v-model="checkAll"
                                            @change="CheckAllPermissions">
                                        <label for="checkAll">&nbsp;All Permission</label>
                                    </div>
                                </div>
                                <VTable class="text-no-wrap rounded border">
                                    <thead>
                                        <tr>
                                            <th scope="col">Modal</th>
                                            <th scope="col">Create</th>
                                            <th scope="col">Read</th>
                                            <th scope="col">Update</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(role, roleName) in ClientPermissions" :key="roleName">
                                            <td>{{ roleName }}</td>
                                            <template v-for="permissionType in ['Create', 'Read', 'Update', 'Delete']">
                                                <td v-if="role.permissions.includes(permissionType + roleName)">
                                                    <input type="checkbox" :value="permissionType + roleName"
                                                        class="checkbox"
                                                        :checked="checkedPermissions[roleName] && checkedPermissions[roleName].includes(permissionType + roleName)"
                                                        @change="togglePermission(roleName, permissionType + roleName)" />
                                                </td>
                                                <template v-else>
                                                    <td></td>
                                                </template>
                                            </template>
                                        </tr>



                                    </tbody>
                                </VTable>
                            </VCol>

                            <!-- <button @click="getCheckedData">Get Checked Data</button> -->

                            <VCol cols="12">
                                <VBtn type="submit" :disabled="loading">{{ loading ? 'Creating...' : 'Create' }}</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
