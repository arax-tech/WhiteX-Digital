<script setup>
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore();
const toast = useToast();
const ability = useAbility()

const userData = useCookie('userData')


const user = computed(() => store.state.auth.user);
const notifications = computed(() => store.state.auth.notifications);
const loading = computed(() => store.state.auth.loading);

const logout = async () => {

     const response = await store.dispatch('LogoutAction');
     if (response.status === 200) {
          toast.success(response.message);
          // Remove "accessToken" from cookie
          useCookie('accessToken').value = null

          // Remove "userData" from cookie
          userData.value = null

          // Redirect to login page


          // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

          // Remove "userAbilities" from cookie
          useCookie('userAbilityRules').value = null

          // Reset ability to initial ability
          ability.update([])

          localStorage.removeItem('role');
          localStorage.removeItem('token');
          localStorage.removeItem('Refresh');
          await router.push('/login')
     }


}

const adminProfileList = [
     { type: 'divider' },
     {
          type: 'navItem',
          icon: 'tabler-user',
          title: 'Profile',
          to: { name: 'admin-profile' },
     },
     {
          type: 'navItem',
          icon: 'tabler-settings',
          title: 'Settings',
          to: { name: 'admin-setting' },
     },
     {
          type: 'navItem',
          icon: 'tabler-lock',
          title: 'Update Password',
          to: { name: 'admin-password' },
     },
     { type: 'divider' },
     {
          type: 'navItem',
          icon: 'tabler-logout',
          title: 'Logout',
          onClick: logout,
     },
]

const clientProfileList = [
     { type: 'divider' },
     {
          type: 'navItem',
          icon: 'tabler-user',
          title: 'Profile',
          to: { name: 'client-profile' },
     },
     {
          type: 'navItem',
          icon: 'tabler-lock',
          title: 'Update Password',
          to: { name: 'client-password' },
     },
     { type: 'divider' },
     {
          type: 'navItem',
          icon: 'tabler-logout',
          title: 'Logout',
          onClick: logout,
     },
]
</script>

<template>
     <VBadge v-if="user" dot bordered location="bottom right" offset-x="3" offset-y="3" color="success">
          <VAvatar class="cursor-pointer" :color="!(user?.image) ? 'primary' : undefined"
               :variant="!(user?.image) ? 'tonal' : undefined">
               <VImg v-if="user?.image" :src="user?.image" />
               <VIcon v-else icon="tabler-user" />

               <!-- SECTION Menu -->
               <VMenu activator="parent" width="230" location="bottom end" offset="14px">
                    <VList>
                         <VListItem>
                              <template #prepend>
                                   <VListItemAction start>
                                        <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success"
                                             bordered>
                                             <VAvatar :color="!(user?.image) ? 'primary' : undefined"
                                                  :variant="!(user?.image) ? 'tonal' : undefined">
                                                  <VImg v-if="user?.image" :src="user?.image" />
                                                  <VIcon v-else icon="tabler-user" />
                                             </VAvatar>
                                        </VBadge>
                                   </VListItemAction>
                              </template>

                              <VListItemTitle class="font-weight-medium">
                                   {{ user?.name }}
                              </VListItemTitle>
                              <VListItemSubtitle>Online</VListItemSubtitle>
                         </VListItem>

                         <PerfectScrollbar :options="{ wheelPropagation: false }">
                              <template v-for="item in user?.role === 'Admin' ? adminProfileList : clientProfileList"
                                   :key="item.title">
                                   <VListItem v-if="item.type === 'navItem'" :to="item.to"
                                        @click="item.onClick && item.onClick()">
                                        <template #prepend>
                                             <VIcon class="me-2" :icon="item.icon" size="22" />
                                        </template>

                                        <VListItemTitle>{{ item.title }}</VListItemTitle>

                                        <template v-if="item.badgeProps" #append>
                                             <VBadge v-bind="item.badgeProps" />
                                        </template>
                                   </VListItem>

                                   <VDivider v-else class="my-2" />
                              </template>
                         </PerfectScrollbar>
                    </VList>
               </VMenu>
               <!-- !SECTION -->
          </VAvatar>
     </VBadge>
</template>
