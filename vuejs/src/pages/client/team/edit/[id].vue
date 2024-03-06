<script setup>
import Loading from '@/components/Loading.vue';
import { computed, onBeforeMount } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import { ClientPermissions } from '@/pages/admin/client/Permission';

const store = useStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Clients' } })
onMounted(() => document.title = "Client - Update Team");

onBeforeMount(async () => {
    await store.dispatch("GetSingleTeamAction", route.params.id);
    updateData();
});
const team = computed(() => store.state.teams.team);


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

const updateData = () => {
    const fetchedTeam = team.value;
    if (fetchedTeam) {
        data.value.name = fetchedTeam.name;
        data.value.email = fetchedTeam.email;
        data.value.phone = fetchedTeam.phone;
        data.value.designation = fetchedTeam.designation;
        
        const selectedTeamPermissions = JSON.parse(fetchedTeam.permissions);
        for (const roleName in ClientPermissions) {
            checkedPermissions.value[roleName] = selectedTeamPermissions[roleName] || [];
        }
    }
};

const loading = computed(() => store.state.teams.loading);


const refForm = ref()


const data = ref({
    name: team.value ? team.value.name : '',
    email: team.value ? team.value.email : '',
    phone: team.value ? team.value.phone : '',
    designation: team.value ? team.value.designation : '',
    image: null,
});






const UpdateTeamFunction = async () => {
    const formData = new FormData();
    formData.append('name', data.value.name);
    formData.append('email', data.value.email);
    formData.append('phone', data.value.phone);
    formData.append('designation', data.value.designation);
    formData.append('permissions', JSON.stringify(checkedPermissions.value));
    if (data.value.image) {
        formData.append('image', data.value.image);
    }
    try {
        const response = await store.dispatch('UpdateTeamAction', { id: team.value.id, formData });
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
            UpdateTeamFunction()
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
                        <h2>Update Team</h2>
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
                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-note" v-model="data.designation"
                                    placeholder="Designation" persistent-placeholder label="Designation"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="6" cols="12" class="">
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
                            <VCol cols="12">
                                <VBtn type="submit">Update</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
