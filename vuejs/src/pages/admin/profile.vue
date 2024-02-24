<script setup>
import avatar1 from '@images/avatars/avatar-14.png';
import { onMounted } from 'vue';

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Profile");


const accountData = {
    avatarImg: avatar1,
    name: 'john',
    email: 'johnDoe@example.com',
}

const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))

const changeAvatar = file => {
    const fileReader = new FileReader()
    const { files } = file.target
    if (files && files.length) {
        fileReader.readAsDataURL(files[0])
        fileReader.onload = () => {
            if (typeof fileReader.result === 'string')
                accountDataLocal.value.avatarImg = fileReader.result
        }
    }
}

// reset avatar image
const resetAvatar = () => {
    accountDataLocal.value.avatarImg = accountData.avatarImg
}


</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Profile Details">
                <VCardText class="d-flex">
                    <!-- 👉 Avatar -->
                    <VAvatar rounded size="100" class="me-6" :image="accountDataLocal.avatarImg" />

                    <!-- 👉 Upload Photo -->
                    <form class="d-flex flex-column justify-center gap-4">
                        <div class="d-flex flex-wrap gap-2">
                            <VBtn color="primary" @click="refInputEl?.click()">
                                <VIcon icon="tabler-cloud-upload" class="d-sm-none" />
                                <span class="d-none d-sm-block">Upload new photo</span>
                            </VBtn>

                            <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden
                                @input="changeAvatar">

                            <VBtn type="reset" color="secondary" variant="tonal" @click="resetAvatar">
                                <span class="d-none d-sm-block">Reset</span>
                                <VIcon icon="tabler-refresh" class="d-sm-none" />
                            </VBtn>
                        </div>

                        <p class="text-body-1 mb-0">
                            Allowed JPG, GIF or PNG. Max size of 800K
                        </p>
                    </form>
                </VCardText>

                <VDivider />

                <VCardText class="pt-2">
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>

                            <!-- 👉 Name -->
                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-user" placeholder="Name" persistent-placeholder
                                    label="Name" />
                            </VCol>
                            <!-- 👉 Email -->
                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-mail" placeholder="Email" persistent-placeholder
                                    label="Email" />
                            </VCol>




                            <!-- 👉 Form Actions -->
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
