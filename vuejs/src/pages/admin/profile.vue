<script setup>
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Profile");

const store = useStore();
const toast = useToast();

const user = computed(() => store.state.auth.user);
const loading = computed(() => store.state.auth.loading);

const data = ref({
    name: user.value.name,
    email: user.value.email,
    image: null,
});

const accountData = {
    avatarImg: user?.value?.image,
    name: 'john',
    email: 'johnDoe@example.com',
};

const refInputEl = ref();
const accountDataLocal = ref(structuredClone(accountData));

const changeAvatar = file => {
    const fileReader = new FileReader();
    const { files } = file.target;
    if (files && files.length) {
        data.value.image = files[0];
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = () => {
            if (typeof fileReader.result === 'string') {
                accountDataLocal.value.avatarImg = fileReader.result;
            }
        };
    }
};




const refForm = ref()
const ValidateFunction = (event) => {
    event.preventDefault();
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            UpdateProfileFunction();
    })
}



const UpdateProfileFunction = async () => {
    const formData = new FormData();
    formData.append('name', data.value.name);
    formData.append('email', data.value.email);
    if (data.value.image) {
        formData.append('image', data.value.image);
    }
    try {
        const response = await store.dispatch('UpdateProfileAction', formData);
        if (response.status === 200) {
            store.dispatch('GetAuthUser');
            toast.success(response.message);
        }
    } catch (error) {
        console.error(error);
    }
};

</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Profile Details">

                <VForm ref="refForm" @submit.prevent="ValidateFunction">
                    <VCardText class="d-flex">
                        <!-- 👉 Avatar -->
                        <VAvatar rounded size="100" class="me-6"
                            :image="accountDataLocal.avatarImg?.length > 0 ? accountDataLocal.avatarImg : '/placeholder.jpg'" />

                        <!-- 👉 Upload Photo -->
                        <div class="d-flex flex-column justify-center gap-4">
                            <div class="d-flex flex-wrap gap-2">
                                <VBtn color="primary" @click="refInputEl?.click()">
                                    <VIcon icon="tabler-cloud-upload" class="d-sm-none" />
                                    <span class="d-none d-sm-block">Upload new photo</span>
                                </VBtn>

                                <input ref="refInputEl" type="file" name="image" accept=".jpeg,.png,.jpg,GIF" hidden
                                    @input="changeAvatar">


                            </div>

                            <p class="text-body-1 mb-0">
                                Allowed JPG, GIF or PNG. Max size of 800K
                            </p>
                        </div>
                    </VCardText>

                    <VDivider />

                    <VCardText class="pt-2">
                        <!-- 👉 Form -->

                        <VRow class="mt-6">

                            <!-- 👉 Name -->
                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-user" placeholder="Name" name="name"
                                    v-model="data.name" persistent-placeholder label="Name" :rules="[requiredValidator]"  />
                            </VCol>
                            <!-- 👉 Email -->
                            <VCol md="6" cols="12">
                                <AppTextField prepend-inner-icon="tabler-mail" placeholder="Email" name="email"
                                    v-model="data.email" persistent-placeholder label="Email" :rules="[requiredValidator]"  />
                            </VCol>


                            <!-- 👉 Form Actions -->
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn type="submit" :disabled="loading">{{ loading ? 'Updating...' : 'Update' }}</VBtn>
                            </VCol>
                        </VRow>

                    </VCardText>

                </VForm>
            </VCard>
        </VCol>
    </VRow>
</template>
