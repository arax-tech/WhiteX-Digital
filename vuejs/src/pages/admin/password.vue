<script setup>
import { onMounted } from 'vue';

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Update Password");





</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Update Password">


                <VDivider />

                <VCardText class="pt-0">
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>




                            <VCol md="12" cols="12">
                                <AppTextField prepend-inner-icon="tabler-lock" placeholder="Current Password"
                                    persistent-placeholder label="Current Password" />
                            </VCol>
                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-lock" placeholder="New Password"
                                    persistent-placeholder label="New Password" />
                            </VCol>
                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-lock" placeholder="Confirm Password"
                                    persistent-placeholder label="Confirm Password" />
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
