<script setup>

import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment'
const route = useRoute();
const router = useRouter();
const store = useStore();

import Loading from '@/components/Loading.vue';

onBeforeMount(() => store.dispatch("SingleInvoice", route.params.id))
const invoice = computed(() => store.state.invoices.invoice);
const loading = computed(() => store.state.invoices.loading);
const setting = computed(() => store.state.auth.setting);

const PrintInvoice = () => {
    window.print()
}

</script>

<template>
    <section>

        <VRow v-if="loading" cols="12">
            <Loading />
        </VRow>
        <VRow v-else cols="12">
            <VCol md="9">
                <VCard>
                    <!-- SECTION Header -->
                    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row">
                        <!-- 👉 Left Content -->
                        <div class="ma-sm-4">
                            <div class="d-flex align-center mb-6">
                                <!-- 👉 Logo -->
                                <img style="width:150px" :src="setting.invoice_logo" :alt="setting?.company_name" />


                            </div>

                            <!-- 👉 Address -->
                            <p class="mb-0">{{ setting?.address_1 }}</p>
                            <p class="my-2">{{ setting?.address_2 }}</p>
                            <p class="mb-0">{{ setting?.phone1 }}, {{ setting?.phone2 }}</p>
                        </div>

                        <!-- 👉 Right Content -->
                        <div class="mt-4 ma-sm-4">
                            <!-- 👉 Invoice ID -->
                            <h6 class="font-weight-medium text-h4">
                                Invoice #{{ invoice?.data?.id }}
                            </h6>

                            <!-- 👉 Issue Date -->
                            <p class="my-3">
                                <span>Date Issued: </span>
                                <!-- <span>{{ new Date(invoice?.data?.issue_date).toLocaleDateString('en-GB') }}</span> -->
                                <span>{{ moment(invoice?.data?.issue_date).format('DD MMM yyyy') }}</span>
                            </p>
                        </div>
                    </VCardText>
                    <!-- !SECTION -->

                    <VDivider />

                    <!-- 👉 Payment Details -->
                    <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
                        <div class="ma-sm-4">
                            <h6 class="text-base font-weight-medium mb-6">Invoice To:</h6>
                            <p class="mb-1">{{ invoice?.client?.name }}</p>
                            <p class="mb-1">{{ invoice?.client?.company_name }}</p>
                            <p class="mb-1">{{ invoice?.client?.address_1 }}, {{ invoice?.client?.address_2 }}</p>
                            <p class="mb-1">{{ invoice?.client?.phone }}</p>
                            <p class="mb-0">{{ invoice?.client?.email }}</p>
                        </div>

                        <div class="mt-4 ma-sm-4">
                            <h6 class="text-h6 font-weight-medium mb-6">Bill To:</h6>
                            <p class="mb-1">{{ invoice?.client?.name }}</p>
                            <p class="mb-1">{{ invoice?.client?.company_name }}</p>
                            <p class="mb-1">{{ invoice?.client?.address_1 }}, {{ invoice?.client?.address_2 }}</p>
                            <p class="mb-1">{{ invoice?.client?.phone }}</p>
                            <p class="mb-0">{{ invoice?.client?.email }}</p>
                        </div>
                    </VCardText>

                    <!-- 👉 Table -->
                    <VDivider />

                    <VTable class="invoice-preview-table">
                        <thead>
                            <tr>
                                <th scope="col">ITEM</th>
                                <th scope="col">DESCRIPTION</th>
                                <th scope="col" class="text-center">COST</th>
                                <th scope="col" class="text-center">QTY</th>
                                <th scope="col" class="text-center">PRICE</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item1 in invoice?.items" :key="item1.id">
                                <td class="text-no-wrap">{{ item1?.name }}</td>
                                <td class="text-no-wrap">{{ item1.description }}</td>
                                <td class="text-center">${{ item1.cost }}.00</td>
                                <td class="text-center">{{ item1.qty }}</td>
                                <td class="text-center">${{ item1.price }}.00</td>
                            </tr>
                        </tbody>
                    </VTable>

                    <VDivider class="mb-2" />

                    <!-- Total -->
                    <VCardText class="d-flex justify-space-between flex-column flex-sm-row print-row">
                        <div class="my-2 mx-sm-4 text-base">
                            <div class="d-flex align-center mb-1">
                                <h6 class="text-base font-weight-medium me-1">Salesperson :</h6>
                                <span>{{ invoice?.data?.salesperson_name }}</span>
                            </div>
                            <div class="d-flex align-center mb-1">
                                <h6 class="text-base font-weight-medium me-1">Payment Instructions : </h6>
                                <span>{{ invoice?.data?.payment_instructions }}</span>
                            </div>
                            <div class="d-flex align-center mb-1">
                                <h6 class="text-base font-weight-medium me-1">Payment Link : </h6>
                                <a :href="invoice?.data?.payment_links" target="_blank">{{
            invoice?.data?.payment_links }}</a>
                            </div>
                            <div class="d-flex align-center mt-5 mb-2">
                                <img style="width : 200px" :src="invoice?.data?.signature" alt='signature' />
                            </div>
                        </div>

                        <div class="my-2 mx-sm-4">
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="text-end">
                                            <div class="me-5">
                                                <p class="mb-2">Subtotal:</p>
                                                <p class="mb-2">Discount:</p>
                                                <p class="mb-2">Tax:</p>
                                                <p class="mb-2">Total:</p>
                                            </div>
                                        </td>

                                        <td class="font-weight-medium text-high-emphasis">
                                            <p class="mb-2">${{ invoice?.data?.subtotal }}.00</p>
                                            <p class="mb-2">${{ invoice?.data?.discount }}.00</p>
                                            <p class="mb-2">${{ invoice?.data?.tax }}.00</p>
                                            <p class="mb-2">${{ invoice?.data?.total }}.00</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </VCardText>

                    <VDivider />

                    <VCardText>
                        <div class="d-flex mx-sm-4">
                            <h6 class="text-base font-weight-medium me-1">
                                Note:
                            </h6>
                            <span>{{ invoice?.data?.note }}</span>
                        </div>
                    </VCardText>
                </VCard>
            </VCol>

            <VCol cols="12" md="3" class="d-print-none">
                <VCard>
                    <VCardText>




                        <VBtn block color="primary" class="mb-2" @click="PrintInvoice">
                            Print
                        </VBtn>
                        <VBtn @click="() => router.push('/admin/invoice')" block color="primary" class="mb-2">
                            <VIcon start icon="tabler-arrow-left" />Back
                        </VBtn>




                    </VCardText>
                </VCard>
            </VCol>
        </VRow>

    </section>
</template>

<style lang="scss">
.invoice-preview-table {
    --v-table-row-height: 44px !important;
}

@media print {
    .v-theme--dark {
        --v-theme-surface: 255, 255, 255;
        --v-theme-on-surface: 94, 86, 105;
    }

    body {
        background: none !important;
    }

    @page {
        margin: 0;
        size: auto;
    }

    .layout-page-content,
    .v-row,
    .v-col-md-9 {
        padding: 0;
        margin: 0;
    }

    .product-buy-now {
        display: none;
    }

    .v-navigation-drawer,
    .layout-vertical-nav,
    .app-customizer-toggler,
    .layout-footer,
    .layout-navbar,
    .layout-navbar-and-nav-container {
        display: none;
    }

    .v-card {
        box-shadow: none !important;

        .print-row {
            flex-direction: row !important;
        }
    }

    .layout-content-wrapper {
        padding-inline-start: 0 !important;
    }

    .v-table__wrapper {
        overflow: hidden !important;
    }
}
</style>
