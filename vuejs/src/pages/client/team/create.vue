<script setup>
import Loading from '@/components/Loading.vue';
import { ClientPermissions } from '@/pages/admin/client/Permission';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Create Team");
const loading = computed(() => store.state.teams.loading);


const email = ref('')
const refForm = ref()


const data = ref({
    name: '',
    email: '',
    phone: '',
    password: '',
    designation: '',
    image: null,
});


const checkedPermissions = ref({});




const CheckAllPermissions = () => {
    for (const roleName in ClientPermissions) {
        checkedPermissions.value[roleName] = checkAll.value ? ClientPermissions[roleName].permissions.slice() : [];
    }
};

const checkAll = ref(false);

onMounted(() => {
    CheckAllPermissions(); // initialize with all unchecked
});



const CreateTeamFunction = async () => {
    const formData = new FormData();
    formData.append('name', data.value.name);
    formData.append('email', data.value.email);
    formData.append('phone', data.value.phone);
    formData.append('password', data.value.password);
    formData.append('designation', data.value.designation);
    formData.append('permissions', JSON.stringify(checkedPermissions.value));
    if (data.value.image) {
        formData.append('image', data.value.image);
    }
    formData.append("role", "Client");
    try {
        const response = await store.dispatch('CreateTeamAction', formData);
        if (response.status === 200) {
            toast.success(response.message);
            router.push('/client/team');
        }
    } catch (error) {
        console.error(error);
    }
};


const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            CreateTeamFunction()
    })

}


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
                        <h2>Create Team</h2>
                    </div>
                    <div>
                        <VBtn to="/client/team" rounded="pill" color="primary" size="small" class="ml-5">
                            <VIcon start icon="tabler-arrow-left" />Back
                        </VBtn>
                    </div>
                </VCardText>

                <VDivider />

                <VCardText class="pt-0">
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>


                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-user" placeholder="Name" name="name"
                                    v-model="data.name" persistent-placeholder label="Name"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-mail" v-model="data.email" placeholder="Email"
                                    persistent-placeholder label="Email" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-phone" v-model="data.phone" placeholder="Phone"
                                    persistent-placeholder label="Phone" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-lock" v-model="data.password"
                                    placeholder="Password" persistent-placeholder label="Password"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-note" v-model="data.designation"
                                    placeholder="Designation" persistent-placeholder label="Designation"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="4" cols="12" class="">
                                <label>Profile Image</label>
                                <VFileInput label="Choose..." class="mt-1"
                                    @change="event => data.image = event.target.files[0]" />
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
                                <VBtn type="submit" :disabled="loading">{{ loading ? 'Creating...' : 'Create' }}
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
