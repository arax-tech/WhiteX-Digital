<script setup>
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import { AdminInitialPermissions } from './Permission';
const store = useStore();
const router = useRouter();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Create Admin");
const loading = computed(() => store.state.admins.loading);

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["Admin"]?.includes("CreateAdmin")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

const name = ref('')
const email = ref('')
const designation = ref('')
const password = ref('')
const image = ref('')
const refForm = ref()
const checkedPermissions = ref({});



const CheckAllPermissions = () => {
    for (const roleName in AdminInitialPermissions) {
        checkedPermissions.value[roleName] = checkAll.value ? AdminInitialPermissions[roleName].permissions.slice() : [];
    }
};

const checkAll = ref(false);

onMounted(() => {
    CheckAllPermissions(); // initialize with all unchecked
});



const CreateAdminFunction = async () => {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('designation', designation.value);
    formData.append('password', password.value);
    formData.append('permissions', JSON.stringify(checkedPermissions.value));
    formData.append("role", "Admin");
    if (image.value) {
        formData.append('image', image.value);
    }


    try {
        const response = await store.dispatch('CreateAdminAction', formData);
        if (response.status === 200) {
            toast.success(response.message);
            router.push('/admin/admin');
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
const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            CreateAdminFunction()
    })
}

</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardText
                    style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                    <div>
                        <h2>Create Admin</h2>
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
                            <VCol cols="12" md="4">
                                <AppTextField v-model="name" prepend-inner-icon="tabler-user" placeholder="Name"
                                    persistent-placeholder label="Name" :rules="[requiredValidator]" />
                            </VCol>


                            <VCol cols="12" md="4">
                                <AppTextField v-model="email" prepend-inner-icon="tabler-mail" placeholder="Email"
                                    persistent-placeholder label="Email" :rules="[requiredValidator, emailValidator]" />
                            </VCol>
                            <VCol cols="12" md="4">
                                <AppTextField v-model="password" prepend-inner-icon="tabler-mail" placeholder="Password"
                                    persistent-placeholder label="Password" :rules="[requiredValidator]" />
                            </VCol>

                            <VCol cols="12" md="6">
                                <AppTextField v-model="designation" prepend-inner-icon="tabler-id"
                                    placeholder="Designation" persistent-placeholder label="Designation"
                                    :rules="[requiredValidator]" />
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
                                        <tr v-for="(role, roleName) in AdminInitialPermissions" :key="roleName">
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
                                <VBtn type="submit" :disabled="loading">{{ loading ? 'Creating...' : 'Create' }}</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
