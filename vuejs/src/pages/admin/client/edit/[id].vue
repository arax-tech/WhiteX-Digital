<script setup>
import Loading from '@/components/Loading.vue';
import { computed } from 'vue';
import { onMounted, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import { ClientPermissions } from '../Permission';
const store = useStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Update Client");
onMounted(() => CheckAllPermissions());


const loading = computed(() => store.state.clients.loading);
const client = computed(() => store.state.clients.client);

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["Client"]?.includes("UpdateClient")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});


const checkedPermissions = ref({});
const checkAll = ref(false);

const CheckAllPermissions = () => {
    for (const roleName in ClientPermissions) {
        checkedPermissions.value[roleName] = checkAll.value ? ClientPermissions[roleName].permissions.slice() : [];
    }
};




onBeforeMount(async () => {
    await store.dispatch("GetSingleClientAction", route.params.id);
    UpdateData();
});

const UpdateData = () => {
    const fetchData = client.value;
    if (fetchData) {
        const selectedClientPermissions = JSON.parse(fetchData.permissions);
        for (const roleName in ClientPermissions) {
            checkedPermissions.value[roleName] = selectedClientPermissions[roleName] || [];
        }
    }
};






const CreateClientFunction = async () => {
    const formData = new FormData();
    formData.append('permissions', JSON.stringify(checkedPermissions.value));
    console.log(JSON.stringify(checkedPermissions.value))
    try {
        const response = await store.dispatch('UpdateClientAction', { id: route.params.id, formData });
        if (response.status === 200) {
            toast.success(response.message);
            store.dispatch("GetTeams");
            // router.push('/admin/client');
        }
    } catch (error) {
        console.error(error);
    }
};


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
</script>

<template>
    <VRow>
        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText
                    style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                    <div>
                        <h2>Update Client</h2>
                    </div>
                    <div>
                        <VBtn to="/admin/client" rounded="pill" color="primary" size="small" class="ml-5">
                            <VIcon start icon="tabler-arrow-left" />Back
                        </VBtn>
                    </div>
                </VCardText>

                <VDivider />

                <VCardText class="pt-0">
                    <VForm class="mt-6" @submit.prevent="CreateClientFunction">
                        <VRow>
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
                                <VBtn type="submit" :disabled="loading">{{ loading ? 'Updating...' : 'Update' }}</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
