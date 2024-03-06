<script setup>
import navItems from '@/navigation/vertical'
import navItems1 from '@/navigation/client'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

// SECTION: Loading Indicator
const isFallbackStateActive = ref(false)
const refLoadingIndicator = ref(null)

watch([
    isFallbackStateActive,
    refLoadingIndicator,
], () => {
    if (isFallbackStateActive.value && refLoadingIndicator.value)
        refLoadingIndicator.value.fallbackHandle()
    if (!isFallbackStateActive.value && refLoadingIndicator.value)
        refLoadingIndicator.value.resolveHandle()
}, { immediate: true })

// !SECTION


const router = useRouter()
const loading = ref(false);
let role = localStorage.getItem('role');


// onMounted(() => {
//     var role = localStorage.getItem('role');
//     if (role === 'Admin') {
//         role = 'Admin';
//         router.push('/admin/dashboard');
//     } else {
//         role = 'Client';
//         router.push('/client/dashboard');
//     }

//     setTimeout(() => {
//         loading.value = false;
//     }, 1000);
// });
</script>

<template>
    <h2 v-if="loading === true"></h2>
    <VerticalNavLayout v-else :nav-items="role === 'Admin' ? navItems : navItems1">
        <!-- 👉 navbar -->
        <template #navbar="{ toggleVerticalOverlayNavActive }">
            <div class="d-flex h-100 align-center">
                <IconBtn id="vertical-nav-toggle-btn" class="ms-n3 d-lg-none"
                    @click="toggleVerticalOverlayNavActive(true)">
                    <VIcon size="26" icon="tabler-menu-2" />
                </IconBtn>

                <!-- <NavSearchBar class="ms-lg-n3" /> -->

                <VSpacer />


                <NavbarThemeSwitcher />
                <!-- <NavbarShortcuts /> -->
                <NavBarNotifications v-if="role === 'Admin'" class="me-2" />
                <UserProfile />
            </div>
        </template>

        <AppLoadingIndicator ref="refLoadingIndicator" />

        <!-- 👉 Pages -->
        <RouterView v-slot="{ Component }">
            <Suspense :timeout="0" @fallback="isFallbackStateActive = true" @resolve="isFallbackStateActive = false">
                <Component :is="Component" />
            </Suspense>
        </RouterView>

        <!-- 👉 Footer -->

        <template #footer>
            <Footer />
        </template>

        <!-- 👉 Customizer -->
        <!-- <TheCustomizer /> -->
    </VerticalNavLayout>
</template>
