<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Create Admin");
onMounted(() => store.dispatch("GetSingleAdminAction", route.params.id));


const loading = computed(() => store.state.admins.loading);
const admin = computed(() => store.state.admins.admin);


const name = ref(admin.value?.name)
const email = ref(admin.value?.email)
const designation = ref(admin.value?.designation)
const image = ref(null)
const refForm = ref()
const checkedPermissions = ref({});

// const allPermissions = JSON.parse(admin?.value?.permissions);

// console.log(permissionsArray);

const AdminPermissions = {
    Admin: { permissions: ['CreateAdmin', 'ReadAdmin', 'UpdateAdmin', 'DeleteAdmin'] },
    Client: { permissions: ['CreateClient', 'ReadClient', 'UpdateClient', 'DeleteClient'] },
    Subscription: { permissions: ['ReadSubscription', 'UpdateSubscription', 'DeleteSubscription'] },
    CancellationRequests: { permissions: ['ReadCancellationRequests', 'UpdateCancellationRequests', 'DeleteCancellationRequests'] },
    BillingInformation: { permissions: ['ReadBillingInformation'] },
    InvoiceManagement: { permissions: ['CreateInvoiceManagement', 'ReadInvoiceManagement', 'UpdateInvoiceManagement', 'DeleteInvoiceManagement'] },
    PopUpMessages: { permissions: ['CreatePopUpMessages', 'ReadPopUpMessages', 'UpdatePopUpMessages', 'DeletePopUpMessages'] },
    LeadTracking: { permissions: ['ReadLeadTracking', 'DeleteLeadTracking'] },
    SupportTicket: { permissions: ['ReadSupportTicket', 'UpdateSupportTicket', 'DeleteSupportTicket'] },
    FeedBack: { permissions: ['ReadFeedBack', 'UpdateFeedBack', 'DeleteFeedBack'] },
    CustomMenu: { permissions: ['CreateCustomMenu', 'ReadCustomMenu', 'UpdateCustomMenu', 'DeleteCustomMenu'] },
    Setting: { permissions: ['ReadSetting', 'UpdateSetting'] },
};


const CheckAllPermissions = () => {
    for (const roleName in AdminPermissions) {
        checkedPermissions.value[roleName] = checkAll.value ? AdminPermissions[roleName].permissions.slice() : [];
    }
};

const checkAll = ref(false);

onMounted(() => {
    CheckAllPermissions(); // initialize with all unchecked
});



const UpdateAdminFunction = async () => {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('designation', designation.value);
    formData.append('permissions', JSON.stringify(checkedPermissions?.value)); // Convert array to string
    if (image.value) {
        formData.append('image', image.value);
    }
    try {
        const response = await store.dispatch('UpdateAdminAction', { id: route.params.id, formData });
        toast.success(response.message);
        router.push('/admin/admin');
    } catch (error) {
        console.error(error);
        toast.error(error.message); // Assuming error has a message property
    }
};


const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdateAdminFunction()
    })
}

</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardText style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                    <div>
                        <h2>Update Admin</h2>
                    </div>
                    <div>
                        <VBtn to="/admin/admin" rounded="pill" color="primary" size="small" class="ml-5">
                            <VIcon start icon="tabler-arrow-left" />Back
                        </VBtn>
                    </div>
                </VCardText>

                <VDivider />
                <!-- <div class="demo-space-x">
                    <VCheckbox v-model="selected" label="John" value="John" />

                    <VCheckbox v-model="selected" label="Jacob" color="success" value="Jacob" />

                    <VCheckbox v-model="selected" label="Johnson" color="info" value="Johnson" />
                </div>

                <p class="mt-1">
                    {{ selected }}
                </p> -->
                <VCardText class="pt-0">
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>
                            <VCol cols="12" md="6">
                                <AppTextField v-model="name" prepend-inner-icon="tabler-user" placeholder="Name"
                                    persistent-placeholder label="Name" :rules="[requiredValidator]" />
                            </VCol>


                            <VCol cols="12" md="6">
                                <AppTextField v-model="email" prepend-inner-icon="tabler-mail" placeholder="Email"
                                    persistent-placeholder label="Email" :rules="[requiredValidator, emailValidator]" />
                            </VCol>

                            <VCol cols="12" md="6">
                                <AppTextField v-model="designation" prepend-inner-icon="tabler-id" placeholder="Designation"
                                    persistent-placeholder label="Designation" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="6" class="mt-6">
                                <VFileInput label="Profile Picture" variant="filled"
                                    @change="event => image = event.target.files[0]" />
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
                                        <tr v-for="(role, roleName) in AdminPermissions" :key="roleName">
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
                                <VBtn type="submit" :disabled="loading">{{ loading ? 'Updating...' : 'Update' }}</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
