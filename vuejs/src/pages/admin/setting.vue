<script setup>
import { onMounted } from 'vue';

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Setting");





</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Setting">


                <VDivider />

                <VCardText class="pt-0">
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>


                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-user" placeholder="Company Name"
                                    persistent-placeholder label="Company Name" />
                            </VCol>

                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-mail" placeholder="Email" persistent-placeholder
                                    label="Email" />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-phone" placeholder="Phone1" persistent-placeholder
                                    label="Phone1" />
                            </VCol>
                            <VCol md="3" cols="12">
                                <AppTextField prepend-inner-icon="tabler-phone" placeholder="Phone2" persistent-placeholder
                                    label="Phone2" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-phone" placeholder="Phone3" persistent-placeholder
                                    label="Phone3" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map-pin" placeholder="Address 1"
                                    persistent-placeholder label="Address 1" />
                            </VCol>
                            <VCol md="4" cols="12">
                                <AppTextField prepend-inner-icon="tabler-map-pin" placeholder="Address 2"
                                    persistent-placeholder label="Address 2" />
                            </VCol>
                            <VCol md="4" cols="12" class="mt-2">
                                <VFileInput label="Fevicon" variant="filled" />
                            </VCol>
                            <VCol md="4" cols="12" class="mt-2">
                                <VFileInput label="Menu Logo" variant="filled" />
                            </VCol>
                            <VCol md="4" cols="12" class="mt-2">
                                <VFileInput label="Invoice Logo" variant="filled" />
                            </VCol>
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn>Update</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
