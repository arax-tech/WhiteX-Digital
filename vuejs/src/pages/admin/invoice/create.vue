<script setup>
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';
import Loading from '../../../components/Loading.vue';

const store = useStore();
const router = useRouter();
const toast = useToast();

definePage({ meta: { action: 'read', subject: 'Admins' } })
onMounted(() => document.title = "Admin - Create Invoice");

onMounted(() => store.dispatch("GetClients"));
const clients = computed(() => store.state.clients.clients);
const loading = computed(() => store.state.clients.loading);

const user = computed(() => store.state.auth.user);
const allPermissions = JSON.parse(user.value.permissions);
onMounted(() => {
    if (!allPermissions["CustomInvoice"]?.includes("CreateCustomInvoice")) {
        alert("You don't have permission to access this resource...");
        router.go(-1);
    }
});

const refForm = ref()

const rows = reactive([
    { name: "", description: "", cost: "", qty: "", price: "" }
]);


const AddRow = (index) => {
    rows.push({ name: "", description: "", cost: "", qty: "", price: "" },)
}
const RemoveRow = (index) => {
    if (rows.length > 1) {
        rows.splice(index, 1)
    }
}

const data = ref({
    client_id: '',
    issue_date: '',
    salesperson_name: '',
    payment_instructions: '',
    payment_links: '',
    subtotal: '',
    discount: '',
    tax: '',
    total: '',
    status: '',
    note: '',
    signature: '',
})




const CreateInvoiceFunction = async () => {
    const formData = new FormData();
    formData.append("client_id", data.value.client_id);
    formData.append("issue_date", data.value.issue_date);
    formData.append("salesperson_name", data.value.salesperson_name);
    formData.append("payment_instructions", data.value.payment_instructions);
    formData.append("payment_links", data.value.payment_links);
    formData.append("subtotal", data.value.subtotal);
    formData.append("discount", data.value.discount);
    formData.append("tax", data.value.tax);
    formData.append("total", data.value.total);
    formData.append("note", data.value.note);
    formData.append("status", data.value.status);
    formData.append("signature", data.value.signature);
    
    rows.map(row => {
        formData.append('name[]', row.name);
        formData.append('description[]', row.description);
        formData.append('cost[]', row.cost);
        formData.append('qty[]', row.qty);
        formData.append('price[]', row.price);
    });

    try {
        const response = await store.dispatch('CreateInvoice', formData);
        if (response.status === 200) {
            toast.success(response.message);
            router.push('/admin/invoice');
        }
    } catch (error) {
        console.error(error);
    }
};

const statuses = [
    'Due',
    'Paid',
    'UnPaid',
]


const ValidateFunction = () => {
    refForm?.value?.validate().then(({ valid: isValid }) => {
        if (isValid)
            CreateInvoiceFunction()
    })
}

</script>

<template>
    <VRow>
        <Loading v-if="loading" />
        <VCol v-else cols="12">
            <VCard>
                <VCardText style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                    <div>
                        <h2>Create Invoice</h2>
                    </div>
                    <div>
                        <VBtn to="/admin/invoice" rounded="pill" color="primary" size="small" class="ml-5">
                            <VIcon start icon="tabler-arrow-left" />Back
                        </VBtn>
                    </div>
                </VCardText>

                <VDivider />
                <VCardText class="pt-0">
                    <VForm class="mt-6" ref="refForm" @submit.prevent="ValidateFunction">
                        <VRow>
                            <VCol cols="12" md="3">
                                <AppSelect v-model="data.client_id" :items="clients" item-title="email" item-value="id"
                                    label="Client" prepend-inner-icon="tabler-user" persistent-placeholder
                                    placeholder="Choose.." :rules="[requiredValidator]" />
                            </VCol>


                            <VCol cols="12" md="3">
                                <AppDateTimePicker v-model="data.issue_date" prepend-inner-icon="tabler-calendar-check"
                                    placeholder="Issue Date" persistent-placeholder label="Issue Date"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="3">
                                <AppTextField v-model="data.salesperson_name" prepend-inner-icon="tabler-user"
                                    placeholder="SalesPerson Name" persistent-placeholder label="SalesPerson Name"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="3">
                                <AppTextField v-model="data.payment_instructions" prepend-inner-icon="tabler-coin"
                                    placeholder="Payment Instructions" persistent-placeholder label="Payment Instructions"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="3">
                                <AppTextField v-model="data.payment_links" prepend-inner-icon="tabler-link"
                                    placeholder="Payment Links" persistent-placeholder label="Payment Links"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="3">
                                <AppTextField v-model="data.subtotal" prepend-inner-icon="tabler-receipt"
                                    placeholder="Subtotal" persistent-placeholder label="Subtotal"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="3">
                                <AppTextField v-model="data.discount" prepend-inner-icon="tabler-receipt"
                                    placeholder="Discount" persistent-placeholder label="Discount"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="3">
                                <AppTextField v-model="data.tax" prepend-inner-icon="tabler-receipt" placeholder="Tax"
                                    persistent-placeholder label="Tax" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="3">
                                <AppTextField v-model="data.total" prepend-inner-icon="tabler-receipt" placeholder="Total"
                                    persistent-placeholder label="Total" :rules="[requiredValidator]" />
                            </VCol>


                            <VCol cols="12" md="3">
                                <AppSelect v-model="data.status" :items="statuses" prepend-inner-icon="tabler-color-picker"
                                    label="Status" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="3">
                                <AppTextField v-model="data.note" prepend-inner-icon="tabler-note" placeholder="Note"
                                    persistent-placeholder label="Note" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol md="3" cols="12">
                                Signature
                                <VFileInput label="Signature" :rules="[requiredValidator]"
                                    @change="event => data.signature = event.target.files[0]" />
                            </VCol>





                        </VRow>
                        <VRow v-for="(item, index) in rows" :key="index">
                            <VCol cols="12" md="2">
                                <AppTextField v-model="item.name" prepend-inner-icon="tabler-color-picker"
                                    placeholder="Name" persistent-placeholder label="Name" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="2">
                                <AppTextField v-model="item.description" prepend-inner-icon="tabler-note"
                                    placeholder="Description" persistent-placeholder label="Description"
                                    :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="2">
                                <AppTextField v-model="item.cost" prepend-inner-icon="tabler-coin" placeholder="Cost"
                                    persistent-placeholder label="Cost" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="2">
                                <AppTextField v-model="item.qty" prepend-inner-icon="tabler-file-orientation"
                                    placeholder="Qty" persistent-placeholder label="Qty" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="2">

                                <AppTextField v-model="item.price" prepend-inner-icon="tabler-coin" placeholder="Price"
                                    persistent-placeholder label="Price" :rules="[requiredValidator]" />
                            </VCol>
                            <VCol cols="12" md="2">
                                <VBtn :style="{ marginTop: '25px', width: index === 0 ? '100%' : 'auto' }" color="success"
                                    type="button" @click="AddRow(index)">Add</VBtn>

                                <VBtn v-if="index > 0" style="margin-top: 25px;" color="error" type="button"
                                    @click="RemoveRow(index)">Remove</VBtn>
                            </VCol>
                        </VRow>
                        <VRow>

                            <VCol cols="12">
                                <VBtn type="submit" :disabled="loading">{{ loading ? 'Creating...' : 'Create' }}</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>


                </VCardText>
            </VCard>
        </VCol>
    </VRow></template>
