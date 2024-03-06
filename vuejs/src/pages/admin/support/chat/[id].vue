<script setup>
import Loading from '@/components/Loading.vue';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import moment from 'moment'
const store = useStore();
const route = useRoute();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Support Tickets Chat");
onBeforeMount(() => store.dispatch("GetSingleSupport", route.params.id));

const interval = ref(null);

onMounted(() => {
    interval.value = setInterval(() => {
        store.dispatch("GetSingleSupport", route.params.id)
    }, 3000);
});


const loading = computed(() => store.state.singleSupport.loading);
const user = computed(() => store.state.auth.user);
const chats = computed(() => store.state.singleSupport.chats);



const message = ref('');

const CreateChatFunction = async () => {
    if (message.value.length === 0) {
        toast.error('Message is required...');
    } else {


        const formData = new FormData();
        formData.append("content", message.value);
        try {
            const response = await store.dispatch('CreateSupportChat', { id: route.params.id, formData });
            if (response.status === 200) {
                toast.success(response.message);
                message.value = '';
            }
        } catch (error) {
            console.error(error);
        }
    }
};


</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
                    <VRow>
                        <VCol cols="8" md="8">
                            <h2>Support Tickets Chat</h2>

                        </VCol>
                    </VRow>
                </VCardText>
                <div class="chat-log pa-5" style="height: 50vh; overflow-y: scroll;">

                    <div v-for="(chat, index) in chats" :key="index" class="chat-group d-flex align-start"
                        :class="chat?.user_id === user?.id ? 'flex-row-reverse' : ''">
                        <div class="chat-avatar ms-4">
                            <VAvatar size="32">
                                <VImg :src="chat?.user_image?.length > 0 ? chat?.user_image : '/placeholder.jpg'" />
                            </VAvatar>
                        </div>
                        <div class="chat-body d-inline-flex flex-column mb-3"
                            :class="chat?.user_id === user?.id ? 'align-end' : 'align-start'">
                            <p class="chat-content py-2 px-4 elevation-1 mb-0"
                                :class="chat?.user_id === user?.id ? 'bg-primary text-white chat-right' : 'sender_bg chat-left ml-3'">
                                {{ chat?.content }}
                            </p>
                            <div :class="chat?.user_id === user?.id ? 'text-right' : 'ml-2'">
                                <span class="text-sm ms-1 text-disabled">
                                    {{ moment(chat?.created_at).fromNow() }}
                                    <!-- {{ moment(chat?.created_at).format('DD MMM yyyy, hh:mm A') }} -->
                                </span>
                            </div>
                        </div>
                    </div>


                </div>

                <VForm class="p-5 d-flex flex-row mt-5" style="padding:20px" @submit.prevent="CreateChatFunction">
                    <AppTextField v-model="message" clearable type="text" color="primary"
                        placeholder="Type your message !" clear-icon="tabler-circle-x" />
                    <VBtn type="submit" style="padding: 10px;" size="medium" color="primary">
                        <VIcon start icon="tabler-send" />Send
                    </VBtn>
                </VForm>


            </VCard>

        </VCol>
    </VRow>
</template>

<style lang=scss>
.sender_bg {
    background-color: rgb(235 235 235);
    color: #000
}

.chat-log {
    .chat-content {
        border-end-end-radius: 6px;
        border-end-start-radius: 6px;

        &.chat-left {
            border-start-end-radius: 6px;
        }

        &.chat-right {
            border-start-start-radius: 6px;
        }
    }
}


.chat-log::-webkit-scrollbar {
    width: 5px;
    border-radius: 30px;
}

.chat-log::-webkit-scrollbar-track {
    background: rgba(93, 89, 108, 0.2) !important;
}

.chat-log::-webkit-scrollbar-thumb {
    background: rgba(137, 136, 140, 0.2) !important;
    border-radius: 30px;
}

.chat-log::-webkit-scrollbar-thumb:hover {
    background: rgba(137, 136, 140, 0.2) !important;
    border-radius: 30px;
}
</style>