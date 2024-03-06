<script setup>
import { onMounted } from 'vue';


definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Campaign Email");


const data = ref({
    sender_id: '',
    group_recipients: '',
    file: null,
    phone_number: '',
    sms_templates: '',
    sms_content: '',
})

const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            console.log('All Good');
    })
}

</script>

<template>
    <VRow>
        <VCol cols="8">
            <VCard>
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="12" md="12">
                            <h4>Send Email</h4>
                        </VCol>
                    </VRow>
                </VCardText>
                <VDivider />
                <VCardText class="pt-0">
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>
                            <VCol cols="12" md="6">
                                <AppTextField v-model="data.sender_id" prepend-inner-icon="tabler-mail" placeholder="Email"
                                    persistent-placeholder label="Sender ID" :rules="[requiredValidator, emailValidator]" />
                            </VCol>
                            <VCol cols="12" md="6">
                                <AppTextField v-model="data.group_recipients" prepend-inner-icon="tabler-mail"
                                    placeholder="Email" persistent-placeholder label="Group Recipients"
                                    :rules="[requiredValidator, emailValidator]" />
                            </VCol>
                            <VCol cols="12" md="6">
                                <AppTextField v-model="data.phone_number" prepend-inner-icon="tabler-phone"
                                    placeholder="Enter Phone Number (New Line Separated)" persistent-placeholder
                                    label="Enter Phone Number (New Line Separated)" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="6" cols="12">
                                File
                                <VFileInput label="File" :rules="[requiredValidator]"
                                    @change="event => data.file = event.target.files[0]" />
                            </VCol>
                            <VCol cols="12" md="12">
                                <AppTextField v-model="data.sms_templates" prepend-inner-icon="tabler-mail"
                                    placeholder="Email" persistent-placeholder label="SMS Templates"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="12">
                                <AppTextField v-model="data.sms_content" prepend-inner-icon="tabler-mail"
                                    placeholder="Email" persistent-placeholder label="SMS Content"
                                    :rules="[requiredValidator]" />
                            </VCol>




                            <VCol cols="12">
                                <VBtn type="submit">Send</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>


            </VCard>
        </VCol>
        <VCol cols="4">
            <VCard>
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="12" md="12">
                            <h4>Available Balance </h4>
                        </VCol>
                    </VRow>
                </VCardText>
                <VDivider />
                <VCardText style="display: flex; align-items: center; justify-content: center; padding: 50px;">
                    <h4>Balance : 1000</h4>
                </VCardText>
                <VDivider />
                <VCardText
                    style="display: flex; align-items: center; justify-content: space-between; padding: 20px !important;">
                    <VBtn>SMS Rate</VBtn>
                    <VBtn>Recharge</VBtn>
                </VCardText>


            </VCard>
            <VCard class="mt-3 p-0">

                <VCardText style="display: flex; align-items: center; justify-content: center; padding: 20px;">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quaerat soluta consequuntur nemo
                        praesentium ullam similique pariatur ab vel eius fugiat, at est quas saepe, porro impedit.</p>
                </VCardText>



            </VCard>
            <VCard class="mt-3 p-0">
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="12" md="12">
                            <h4>SMS Content </h4>
                        </VCol>
                    </VRow>
                </VCardText>
                <VDivider />
                <VCardText style="display: flex; align-items: center; justify-content: center; padding: 20px;">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quaerat soluta consequuntur nemo
                        praesentium ullam similique pariatur ab vel eius fugiat, at est quas saepe, porro impedit.</p>
                </VCardText>



        </VCard>
    </VCol>
</VRow></template>



