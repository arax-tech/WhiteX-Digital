<script setup>
import { computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useStore } from 'vuex';
const store = useStore();
const toast = useToast();
const props = defineProps({
    notifications: {
        type: Array,
        required: true,
    },
    badgeProps: {
        type: null,
        required: false,
        default: undefined,
    },
    location: {
        type: null,
        required: false,
        default: 'bottom end',
    },
})

const emit = defineEmits([
    'read',
    'unread',
    'remove',
    'click:notification',
])

const isAllMarkRead = computed(() => props.notifications.some(item => item.isSeen === false))

const markAllReadOrUnread = () => {
    const allNotificationsIds = props.notifications.map(item => item.id)
    if (!isAllMarkRead.value)
        emit('unread', allNotificationsIds)
    else
        emit('read', allNotificationsIds)
}

const totalUnseenNotifications = computed(() => {
    return props.notifications.filter(item => item.isSeen === false).length
})



const notifications = computed(() => store.state.auth.notifications);
const SubscriptionRegistrationsFields = ['First Name', 'Last Name'];
const DigitalMarketingBundlePlansFields = ['Text* Field (your-name)'];
const FreeMarketingAnalysisFields = ['Full Name*'];
const BookFreeStrategyCallsFields = ['Full Name*'];

const getField = (notification, fieldName) => {
    if (notification.fields) {
        const parsedFields = JSON.parse(notification.fields);
        return Object.values(parsedFields).find(f => f.name === fieldName);
    }
    return null;
};


const DeleteNotification = async(id) => {
    try {
        const response = await store.dispatch('RemoveNotification', id);
        if (response.status === 200) {
            toast.success(response.message);
            store.dispatch('GetAuthUser');
        }
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <IconBtn id="notification-btn">
        <VBadge color="error" :content="notifications?.length" class="notification-badge">
            <VIcon size="26" icon="tabler-bell" />
        </VBadge>

        <VMenu activator="parent" width="380px" :location="props.location" offset="14px"
            :close-on-content-click="false">
            <VCard class="d-flex flex-column">
                <!-- 👉 Header -->
                <VCardItem class="notification-section">
                    <VCardTitle class="text-lg">
                        Notifications
                    </VCardTitle>
                </VCardItem>

                <VDivider />

                <!-- 👉 Notifications list -->
                <PerfectScrollbar :options="{ wheelPropagation: false }" style="max-block-size: 23.75rem;">
                    <VList class="notification-list rounded-0 py-0">

                        <template v-for="(notification, index) in notifications" :key="index">
                            <VDivider v-if="index > 0" />


                            <!-- Subscription Registrations Leads -->
                            <div v-if="notification?.form_id === 2908">
                                <div v-if="notification.fields && JSON.parse(notification.fields)">
                                    <VListItem link lines="one" min-height="66px" class="list-item-hover-class">
                                        <template #prepend>
                                            <VListItemAction start>
                                                <VAvatar size="40" variant='tonal'><span>SR</span></VAvatar>
                                            </VListItemAction>
                                        </template>
                                        <VListItemTitle
                                            v-for="(fieldName, fieldIndex) in SubscriptionRegistrationsFields"
                                            class="font-weight-medium">
                                            {{ getField(fieldName)?.value }}
                                        </VListItemTitle>
                                        <VListItemSubtitle>

                                            <span v-for="(fieldName, fieldIndex) in SubscriptionRegistrationsFields"
                                                :key="fieldIndex" class="font-weight-bolder">
                                                {{ getField(notification, fieldName)?.value + ' ' }}
                                            </span>


                                        </VListItemSubtitle>
                                        <span class="text-xs text-disabled">Subscription Registrations Leads.</span>

                                        <template #append>
                                            <div class="d-flex flex-column align-center gap-4">
                                                <div style="block-size: 28px; inline-size: 28px;">
                                                    <IconBtn size="small" class="visible-in-hover"
                                                        @click="DeleteNotification(notification.entry_id)">
                                                        <VIcon size="20" icon="tabler-x" />
                                                    </IconBtn>
                                                </div>
                                            </div>
                                        </template>
                                    </VListItem>

                                </div>
                            </div>


                            <!-- Digital Marketing Bundle Plans Leads -->
                            <div v-if="notification?.form_id === 2897">
                                <div v-if="notification.fields && JSON.parse(notification.fields)">
                                    <VListItem link lines="one" min-height="66px" class="list-item-hover-class">
                                        <template #prepend>
                                            <VListItemAction start>
                                                <VAvatar size="40" variant='tonal'><span>DM</span></VAvatar>
                                            </VListItemAction>
                                        </template>
                                        <VListItemTitle
                                            v-for="(fieldName, fieldIndex) in DigitalMarketingBundlePlansFields"
                                            class="font-weight-medium">
                                            {{ getField(fieldName)?.value }}
                                        </VListItemTitle>
                                        <VListItemSubtitle>

                                            <span v-for="(fieldName, fieldIndex) in DigitalMarketingBundlePlansFields"
                                                :key="fieldIndex" class="font-weight-bolder">
                                                {{ getField(notification, fieldName)?.value + ' ' }}
                                            </span>


                                        </VListItemSubtitle>
                                        <span class="text-xs text-disabled">Digital Marketing Bundle Plans Leads.</span>

                                        <template #append>
                                            <div class="d-flex flex-column align-center gap-4">
                                                <div style="block-size: 28px; inline-size: 28px;">
                                                    <IconBtn size="small" class="visible-in-hover"
                                                        @click="DeleteNotification(notification.entry_id)">
                                                        <VIcon size="20" icon="tabler-x" />
                                                    </IconBtn>
                                                </div>
                                            </div>
                                        </template>
                                    </VListItem>

                                </div>
                            </div>


                            <!--  Free Marketing Analysis Leads -->
                            <div v-if="notification?.form_id === 2895">
                                <div v-if="notification.fields && JSON.parse(notification.fields)">
                                    <VListItem link lines="one" min-height="66px" class="list-item-hover-class">
                                        <template #prepend>
                                            <VListItemAction start>
                                                <VAvatar size="40" variant='tonal'><span>FM</span></VAvatar>
                                            </VListItemAction>
                                        </template>
                                        <VListItemTitle v-for="(fieldName, fieldIndex) in FreeMarketingAnalysisFields"
                                            class="font-weight-medium">
                                            {{ getField(fieldName)?.value }}
                                        </VListItemTitle>
                                        <VListItemSubtitle>

                                            <span v-for="(fieldName, fieldIndex) in FreeMarketingAnalysisFields"
                                                :key="fieldIndex" class="font-weight-bolder">
                                                {{ getField(notification, fieldName)?.value + ' ' }}
                                            </span>


                                        </VListItemSubtitle>
                                        <span class="text-xs text-disabled"> Free Marketing Analysis Leads.</span>

                                        <template #append>
                                            <div class="d-flex flex-column align-center gap-4">
                                                <div style="block-size: 28px; inline-size: 28px;">
                                                    <IconBtn size="small" class="visible-in-hover"
                                                        @click="DeleteNotification(notification.entry_id)">
                                                        <VIcon size="20" icon="tabler-x" />
                                                    </IconBtn>
                                                </div>
                                            </div>
                                        </template>
                                    </VListItem>

                                </div>
                            </div>

                            <!--  Book Free Strategy Calls Leads -->
                            <div v-if="notification?.form_id === 2893">
                                <div v-if="notification.fields && JSON.parse(notification.fields)">
                                    <VListItem link lines="one" min-height="66px" class="list-item-hover-class">
                                        <template #prepend>
                                            <VListItemAction start>
                                                <VAvatar size="40" variant='tonal'><span>BF</span></VAvatar>
                                            </VListItemAction>
                                        </template>
                                        <VListItemTitle v-for="(fieldName, fieldIndex) in BookFreeStrategyCallsFields"
                                            class="font-weight-medium">
                                            {{ getField(fieldName)?.value }}
                                        </VListItemTitle>
                                        <VListItemSubtitle>

                                            <span v-for="(fieldName, fieldIndex) in BookFreeStrategyCallsFields"
                                                :key="fieldIndex" class="font-weight-bolder">
                                                {{ getField(notification, fieldName)?.value + ' ' }}
                                            </span>


                                        </VListItemSubtitle>
                                        <span class="text-xs text-disabled"> Book Free Strategy Calls Leads.</span>

                                        <template #append>
                                            <div class="d-flex flex-column align-center gap-4">
                                                <div style="block-size: 28px; inline-size: 28px;">
                                                    <IconBtn size="small" class="visible-in-hover"
                                                        @click="DeleteNotification(notification.entry_id)">
                                                        <VIcon size="20" icon="tabler-x" />
                                                    </IconBtn>
                                                </div>
                                            </div>
                                        </template>
                                    </VListItem>

                                </div>
                            </div>

                        </template>

                        <VListItem v-show="!props.notifications.length" class="text-center text-medium-emphasis"
                            style="block-size: 56px;">
                            <VListItemTitle>No Notification Found!</VListItemTitle>
                        </VListItem>
                    </VList>
                </PerfectScrollbar>

            </VCard>
        </VMenu>
    </IconBtn>
</template>

<style lang="scss">
.notification-section {
    padding: 14px !important;
}

.notification-footer {
    padding: 6px !important;
}

.list-item-hover-class {
    .visible-in-hover {
        display: none;
    }

    &:hover {
        .visible-in-hover {
            display: block;
        }
    }
}

.notification-list.v-list {
    .v-list-item {
        border-radius: 0 !important;
        margin: 0 !important;

        &[tabindex="-2"]:not(.v-list-item--active) {

            &:hover,
            &:focus-visible {
                color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));

                .v-list-item-subtitle {
                    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
                }
            }
        }
    }
}

// Badge Style Override for Notification Badge
.notification-badge {
    .v-badge__badge {
        /* stylelint-disable-next-line liberty/use-logical-spec */
        min-width: 18px;
        padding: 0;
        block-size: 18px;
    }
}
</style>
