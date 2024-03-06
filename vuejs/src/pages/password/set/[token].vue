<script setup>
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2ResetPasswordIllustrationDark from '@images/pages/auth-v2-reset-password-illustration-dark.png'
import authV2ResetPasswordIllustrationLight from '@images/pages/auth-v2-reset-password-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

definePage({ meta: { layout: 'blank', unauthenticatedOnly: true, } })
onMounted(() => document.title = "Create New Password");
const loading = computed(() => store.state.password.loading);


const route = useRoute();
const router = useRouter();
const toast = useToast();
const store = useStore();

const data = ref({
    newPassword: '',
    confirmPassword: '',
})
const refForm = ref()



const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            SetPasswordFunction()
    })

}

const SetPasswordFunction = async () => {
    const newPassword = data.value.newPassword;
    const confirmPassword = data.value.confirmPassword;

    if (newPassword !== confirmPassword) {
        toast.error('Password Confirmation does not match...');
    } else {
        try {
            const response = await store.dispatch('ResetPasswordAction', { reset_token: route.params.token, password: newPassword });
            if (response.status === 200) {
                toast.success(response.message);
                router.push('/login');
            }
            if (response.status === 422) {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const authThemeImg = useGenerateImageVariant(authV2ResetPasswordIllustrationLight, authV2ResetPasswordIllustrationDark)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
</script>

<template>
    <VRow no-gutters class="auth-wrapper bg-surface">
        <VCol md="8" class="d-none d-md-flex">
            <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
                <div class="d-flex align-center justify-center w-100 h-100">
                    <VImg max-width="400" :src="authThemeImg" class="auth-illustration mt-16 mb-2" />
                </div>

                <VImg class="auth-footer-mask" :src="authThemeMask" />
            </div>
        </VCol>

        <VCol cols="12" md="4" class="auth-card-v2 d-flex " style="margin-top: 10% !important;">
            <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
                <VCardText>
                    <h4 class="text-h4 mb-1">Create New Password</h4>
                    <p class="mb-0">Create new password for you WiteX Digital Panel...</p>
                </VCardText>

                <VCardText>
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>
                            <!-- password -->
                            <VCol cols="12">
                                <AppTextField v-model="data.newPassword" autofocus label="New Password"
                                    placeholder="············" :type="isPasswordVisible ? 'text' : 'password'"
                                    :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                                    :rules="[requiredValidator]" />
                            </VCol>

                            <!-- Confirm Password -->
                            <VCol cols="12">
                                <AppTextField v-model="data.confirmPassword" label="Confirm Password"
                                    placeholder="············" :type="isConfirmPasswordVisible ? 'text' : 'password'"
                                    :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                                    @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                                    :rules="[requiredValidator]" />
                            </VCol>

                            <!-- Set password -->
                            <VCol cols="12">
                                <VBtn block type="submit" :disabled="loading">
                                    {{ loading ? 'Loading...' : 'Set New Password' }}
                                </VBtn>
                            </VCol>

                            <!-- back to login -->
                            <VCol cols="12">
                                <RouterLink class="d-flex align-center justify-center" :to="{ name: 'login' }">
                                    <VIcon icon="tabler-chevron-left" class="flip-in-rtl" />
                                    <span>Back to login</span>
                                </RouterLink>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
