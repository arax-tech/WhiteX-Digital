<script setup>
import { onMounted } from 'vue';

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Create Admin");


const name = ref('')
const email = ref('')
const refForm = ref()

const recentDevices = ref([
    { type: 'Admin', create: true, read: false, update: false, delete: true },
    { type: 'Client', create: true, read: false, update: false, delete: true },
])
const selected = ref(['John'])
</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardText class="d-flex align-items-center justify-content-between w-100 bg-danger ">
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
                    <VForm class="mt-6" ref="refForm" @submit.prevent="() => { }">
                        <VRow>
                            <VCol cols="12" md="6">
                                <AppTextField v-model="name" prepend-inner-icon="tabler-user" placeholder="Name"
                                    persistent-placeholder label="Name" :rules="[requiredValidator]" />
                            </VCol>


                            <VCol cols="12" md="6">
                                <AppTextField v-model="email" label="Email" placeholder="john@email.com"
                                    :rules="[requiredValidator, emailValidator]" />
                            </VCol>

                            <VCol cols="12" md="6">
                                <AppTextField v-model="name" prepend-inner-icon="tabler-id" placeholder="Designation"
                                    persistent-placeholder label="Designation" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="6" class="mt-6">
                                <VFileInput label="Profile Picture" variant="filled" />
                            </VCol>
                            <VCol cols="12" md="12" class="mt-6">
                                <h2 class="mb-2">Permissions</h2>
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
                                        <tr v-for="device in recentDevices" :key="device.type">
                                            <td>{{ device.type }}</td>
                                            <td>
                                                <VCheckbox v-model="device.create" />
                                            </td>
                                            <td>
                                                <VCheckbox v-model="device.read" />
                                            </td>
                                            <td>
                                                <VCheckbox v-model="device.update" />
                                            </td>
                                            <td>
                                                <VCheckbox v-model="device.delete" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </VTable>
                            </VCol>

                            <VCol cols="12">
                                <VBtn type="submit" @click="refForm?.validate()">
                                    Create
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>









