
<script setup>
import navItems from '@/navigation/vertical';
console.log(navItems);
// Components
// import AdminProfile from '../components/AdminProfile.vue'

import Footer from '@/layouts/components/Footer.vue';
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue';
import NavSearchBar from '@/layouts/components/NavSearchBar.vue';
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue';

// @layouts plugin
import { VerticalNavLayout } from '@layouts';



</script>

<template>
    <VerticalNavLayout :navItems="navItems">
        <!-- 👉 navbar -->
        <template #navbar="{ toggleVerticalOverlayNavActive }">
            <div class="d-flex h-100 align-center">
                <IconBtn id="vertical-nav-toggle-btn" class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
                    <VIcon size="26" icon="tabler-menu-2" />
                </IconBtn>

                <NavSearchBar class="ms-lg-n3" />

                <VSpacer />


                <NavbarThemeSwitcher />
                <!-- <NavbarShortcuts /> -->
                <NavBarNotifications class="me-2" />
                <!-- <AdminProfile /> -->
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
        <TheCustomizer />
    </VerticalNavLayout>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
