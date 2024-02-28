<script setup>
definePage({ meta: { action: 'read', subject: 'Admins' } })
</script>
<template>
    <VCol class="w-100" cols="12">
        <VCard>
            <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                <VRow>
                    <VCol cols="12" md="12">
                        <h2>Loading....</h2>
                    </VCol>
                </VRow>
            </VCardText>
            <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; padding: 150px;">
                <VProgressCircular :size="45" width="3" color="primary" indeterminate />
            </div>
        </VCard>
    </VCol>
</template>