<script setup>
import Loading from '@/components/Loading.vue';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import { ClientPermissions } from './Permission';

const store = useStore();
const router = useRouter();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Create Client");
onMounted(() => store.dispatch("GetCustomers"));
const loading = computed(() => store.state.customers.loading);
const customers = computed(() => store.state.customers.data);
const loading1 = computed(() => store.state.clients.loading);


const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["Client"]?.includes("CreateClient")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

const email = ref('')
const refForm = ref()



const checkedPermissions = ref({});

const OnChangePermission = (roleName, permission) => {
    if (checkedPermissions.value.hasOwnProperty(roleName)) {
        const index = checkedPermissions.value[roleName].indexOf(permission);
        if (index !== -1) {
            checkedPermissions.value[roleName].splice(index, 1);
        } else {
            checkedPermissions.value[roleName].push(permission);
        }
    }
}

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
    formData.append('email', `${email.value.id}--|--${email.value.email}`);
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
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            CreateClientFunction()
    })

}

</script>

<template>
    <VRow>
        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText
                    style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
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

                                <div v-if="loading"></div>
                                <AppSelect v-else v-model="email" :items="customers" item-title="email"
                                    item-value="email" label="Client" prepend-inner-icon="tabler-user"
                                    persistent-placeholder return-object :rules="[requiredValidator]" />



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
                                            <td>{{ roleName.replace(/([a-z])([A-Z])/g, '$1 $2') }}</td>
                                            <template v-for="permissionType in ['Create', 'Read', 'Update', 'Delete']">
                                                <td v-if="role.permissions.includes(permissionType + roleName)">
                                                    <input type="checkbox" :value="permissionType + roleName"
                                                        class="checkbox"
                                                        :checked="checkedPermissions[roleName] && checkedPermissions[roleName].includes(permissionType + roleName)"
                                                        @change="OnChangePermission(roleName, permissionType + roleName)" />
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
                                <VBtn type="submit" :disabled="loading1">{{ loading1 ? 'Creating...' : 'Create' }}
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
