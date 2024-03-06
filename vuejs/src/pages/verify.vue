<script setup>
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VForm } from 'vuetify/components/VForm'

import { computed } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore();
const toast = useToast();

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

definePage({ meta: { layout: 'blank', unauthenticatedOnly: true, } })
onMounted(() => document.title = "Verify");

const router = useRouter()
const ability = useAbility()
const route = useRoute()

const errors = ref({
    otp: undefined,
})

const refVForm = ref()

const userAbilityRules = [{
    action: 'manage',
    subject: 'all',
}]

const loading = computed(() => store.state.auth.loading);



const otp = ref(null)

const verify = async () => {
    try {
        const response = await store.dispatch('VerifyOTPAction', otp.value);
        if (response.status === 202) {
            toast.success(response.message);

            useCookie('userAbilityRules').value = userAbilityRules;
            ability.update(userAbilityRules);
            useCookie('userData').value = response?.user;
            useCookie('accessToken').value = response?.token;

            window.location.href = route.query.to ? String(route.query.to) : response?.user?.role === 'Admin' ? '/admin/dashboard' : '/client/dashboard';

        } else if (response.status === 401) {
            toast.error(response.message);
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.log(error);
    }
}

const VerifyOTPFunction = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            verify()
    })
}
</script>

<template>
    <VRow no-gutters class="auth-wrapper bg-surface">
        <VCol lg="8" class="d-none d-lg-flex">
            <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
                <div class="d-flex align-center justify-center w-100 h-100">
                    <VImg max-width="505" :src="authThemeImg" class="auth-illustration mt-16 mb-2" />
                </div>

                <VImg :src="authThemeMask" class="auth-footer-mask" />
            </div>
        </VCol>

        <VCol cols="12" lg="4" class="auth-card-v2 d-flex align-center justify-center">
            <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
                <VCardText>
                    <!-- 
                        <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />

                     -->

                    <h4 class="text-h4 mb-1">
                        OTP Verification
                    </h4>
                    <p class="mb-0">
                        Please check you email we have send you OTP there...
                    </p>
                </VCardText>

                <VCardText>
                    <VForm ref="refVForm" @submit.prevent="VerifyOTPFunction">
                        <VRow>
                            <!-- email -->
                            <VCol cols="12">
                                <AppTextField v-model="otp" label="OTP" placeholder="OTP" type="number" autofocus
                                    :rules="[requiredValidator]" :error-messages="errors.otp" />
                            </VCol>

                            <!-- password -->
                            <VCol cols="12">

                                <VBtn block type="submit" :disabled="loading">
                                    {{ loading ? 'Verifying...' : 'Verify' }}
                                </VBtn>
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
