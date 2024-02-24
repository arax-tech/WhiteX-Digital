<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';

const search = ref('')
const productList = ref([])

// headers
const headers = [
  {
    title: 'PRODUCT',
    key: 'product.name',
  },
  {
    title: 'DATE',
    key: 'date',
  },
  {
    title: 'PAYMENT',
    key: 'payment',
    sortable: false,
  },
  {
    title: 'STATUS',
    key: 'status',
    sortable: false,
  },
  {
    title: 'Action',
    key: 'delete',
    sortable: false,
  },
]

const deleteItem = itemId => {
  const index = productList.value.findIndex(item => item.product.id === itemId)

  productList.value.splice(index, 1)
}



const resolveStatusColor = status => {
  if (status === 'Confirmed')
    return 'primary'
  if (status === 'Completed')
    return 'success'
  if (status === 'Cancelled')
    return 'error'
}




const { data, error } = await useApi('pages/datatable')
if (error.value) {
  console.error(error.value)
} else {
  if (data.value)
    productList.value = data.value
}
</script>

<template>
  <div>
    <VCardText style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))">
      <VRow>
        <VCol cols="8" md="8">
          <h2>Admins
            <VBtn to="/admin/admin/create" rounded="pill" color="primary" size="small" class="ml-5">
              <VIcon start icon="tabler-plus" />
              Create
            </VBtn>

          </h2>

        </VCol>
        <VCol cols="4" md="4">
          <AppTextField v-model="search" density="compact" placeholder="Search ..." append-inner-icon="tabler-search"
            single-line hide-details dense outlined />
        </VCol>
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
    <VDataTable :headers="headers" :items="productList" :search="search" :items-per-page="5" class="text-no-wrap">
      <!-- product -->
      <template #item.product.name="{ item }">
        <div class="d-flex align-center">
          <div>
            <VImg :src="item.product.image" height="40" width="40" />
          </div>
          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.product.name }}</span>
            <span class="text-xs">{{ item.product.brand }}</span>
          </div>
        </div>
      </template>






      <!-- Payment -->
      <template #item.payment="{ item }">
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
            <span class="text-high-emphasis font-weight-medium">${{ item.payment.paidAmount }}</span>
            <span v-if="item.payment.paidAmount !== item.payment.total">/{{ item.payment.total }}</span>
          </div>
          <span class="text-xs text-no-wrap">{{ item.payment.receivedPaymentStatus }}</span>
        </div>
      </template>

      <!-- Status -->
      <template #item.status="{ item }">
        <VChip :color="resolveStatusColor(item.payment.status)" :class="`text-${resolveStatusColor(item.payment.status)}`"
          size="small" class="font-weight-medium">
          {{ item.payment.status }}
        </VChip>
      </template>

      <!-- Delete -->
      <template #item.delete="{ item }">
        <IconBtn @click="deleteItem(item.product.id)">
          <VIcon icon="tabler-edit" />
        </IconBtn>
        <IconBtn @click="deleteItem(item.product.id)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </template>
    </VDataTable>
  </div>
</template>
