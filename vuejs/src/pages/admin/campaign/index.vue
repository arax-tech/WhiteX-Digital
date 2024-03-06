<script setup>
import { onMounted } from 'vue';

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Campaign");



const CreateCampaign = ref(false)
const EditCampaign = ref(false)
</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">

                        <h4>Campaign</h4>
                        <VBtn @click="CreateCampaign = !CreateCampaign" rounded="pill" color="primary" size="small"
                            class="ml-5">
                            <VIcon start icon="tabler-plus" />Create
                        </VBtn>
                        <VDialog v-model="CreateCampaign" width="500">
                            <DialogCloseBtn @click="CreateCampaign = !CreateCampaign" />
                            <VCard title="Create Campaign">
                                <VDivider class="mt-3" />
                                <VCardText>
                                    <VForm>
                                        <VRow>
                                            <VCol cols="12" md="12">
                                                <AppTextField prepend-inner-icon="tabler-user" placeholder="Title"
                                                    persistent-placeholder label="Title" :rules="[requiredValidator]" />
                                            </VCol>
                                            <VCol cols="12" md="12">
                                                <AppTextField prepend-inner-icon="tabler-user" placeholder="Type"
                                                    persistent-placeholder label="Type" :rules="[requiredValidator]" />
                                            </VCol>
                                            <VCol cols="12" md="12">
                                                <AppTextField prepend-inner-icon="tabler-user" placeholder="Status"
                                                    persistent-placeholder label="Status" :rules="[requiredValidator]" />
                                            </VCol>






                                        </VRow>
                                    </VForm>
                                </VCardText>
                                <VCardText class="d-flex justify-end">
                                    <VBtn @click="CreateCampaign = false">Create</VBtn>
                                </VCardText>
                            </VCard>
                        </VDialog>
                    </VRow>
                </VCardText>
                <VDivider />
                <VCardText class="pt-0">
                    <VTable>
                        <thead>
                            <tr>
                                <th>S#</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>SMS</td>
                                <td>SMS Campaign</td>
                                <td>
                                    <VChip color="primary">Pending</VChip>
                                </td>
                                <td>
                                    <IconBtn @click="EditCampaign = !EditCampaign">
                                        <VTooltip activator="parent" location="top">Edit</VTooltip>
                                        <VIcon icon="tabler-edit" />
                                    </IconBtn>
                                    <IconBtn>
                                        <VTooltip activator="parent" location="top">View</VTooltip>
                                        <VIcon icon="tabler-eye" />
                                    </IconBtn>
                                </td>

                            </tr>

                            <tr>
                                <td>2</td>
                                <td>Email</td>
                                <td>Email Campaign</td>
                                <td>
                                    <VChip color="success">Complete</VChip>
                                </td>
                                <td>
                                    <IconBtn @click="EditCampaign = !EditCampaign">
                                        <VTooltip activator="parent" location="top">Edit</VTooltip>
                                        <VIcon icon="tabler-edit" />
                                    </IconBtn>
                                    <IconBtn>
                                        <VTooltip activator="parent" location="top">View</VTooltip>
                                        <VIcon icon="tabler-eye" />
                                    </IconBtn>
                                </td>

                            </tr>


                        </tbody>
                    </VTable>


                    <!-- Model -->
                    <VDialog v-model="EditCampaign" width="500">
                        <DialogCloseBtn @click="EditCampaign = !EditCampaign" />
                        <VCard title="Campaign">
                            <VDivider class="mt-3"  />
                            <VCardText>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis suscipit harum atque?
                                Vitae quisquam fugit qui ullam earum, consequatur sit? Nobis laborum nostrum explicabo
                                earum, sequi nemo esse dicta saepe.
                            </VCardText>
                            <VCardText class="d-flex justify-end">
                                <VBtn @click="EditCampaign = false">Close</VBtn>
                            </VCardText>
                        </VCard>
                    </VDialog>





                </VCardText>


            </VCard>
        </VCol>

    </VRow>
</template>



