<script setup>
import { onMounted } from 'vue';

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Campaign Config");



const EditSMS = ref(false)
const EditEmail = ref(false)
</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="12" md="12">
                            <h4>Config</h4>
                        </VCol>
                    </VRow>
                </VCardText>
                <VDivider />
                <VCardText class="pt-0">
                    <VTable>
                        <thead>
                            <tr>
                                <th>S#</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>SMS</td>
                                <td>
                                    <IconBtn @click="EditSMS = !EditSMS">
                                        <VTooltip activator="parent" location="top">Edit</VTooltip>
                                        <VIcon icon="tabler-edit" />
                                    </IconBtn>
                                </td>

                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Email</td>
                                <td>
                                    <IconBtn @click="EditEmail = !EditEmail">
                                        <VTooltip activator="parent" location="top">Edit</VTooltip>
                                        <VIcon icon="tabler-edit" />
                                    </IconBtn>
                                </td>

                            </tr>

                        </tbody>
                    </VTable>


                    <!-- SMS Model -->
                    <VDialog v-model="EditSMS" width="500">
                        <DialogCloseBtn @click="EditSMS = !EditSMS" />
                        <VCard title="Edit SMS">
                            <VDivider class="mt-3"  />
                            <VCardText>
                                <AppTextField prepend-inner-icon="tabler-link" placeholder="Enter Api Key"
                                    persistent-placeholder label="Enter Api Key" :rules="[requiredValidator]" />
                            </VCardText>
                            <VCardText class="d-flex justify-end">
                                <VBtn @click="EditSMS = false">Save</VBtn>
                            </VCardText>
                        </VCard>
                    </VDialog>


                    <!-- Email Model -->
                    <VDialog v-model="EditEmail" width="500">
                        <DialogCloseBtn @click="EditEmail = !EditEmail" />
                        <VCard title="Edit Email">
                            <VDivider class="mt-3"  />
                            <VCardText>
                                <AppTextField prepend-inner-icon="tabler-link" placeholder="Enter Api Key"
                                    persistent-placeholder label="Enter Api Key" :rules="[requiredValidator]" />
                            </VCardText>
                            <VCardText class="d-flex justify-end">
                                <VBtn @click="EditEmail = false">Save</VBtn>
                            </VCardText>
                        </VCard>
                    </VDialog>

                </VCardText>


            </VCard>
        </VCol>

    </VRow>
</template>



