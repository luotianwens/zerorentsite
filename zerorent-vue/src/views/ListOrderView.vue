<template>
  <n-layout-header bordered style="padding: 10px 20px">
    <n-space justify="space-between">
      <n-input
        v-model:value="searchValue"
        placeholder="搜索订单..."
        clearable
        size="large"
        style="max-width: 600px"
      >
        <template #prefix>
          <n-icon :component="Search" />
        </template>
      </n-input>
      <n-button type="primary" @click="DoSearch" style="margin-top: 4px">搜索订单</n-button>
    </n-space>
  </n-layout-header>
  <div class="list-order-container">
    <n-space vertical :size="12">
      <n-data-table
        :bordered="false"
        :single-line="false"
        :columns="columns"
        :data="data"
        :pagination="pagination"
      />
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createColumns, orders } from './SubmitOrderView.vue'
// import type { Order } from './SubmitOrderView.vue'
import { Search } from '@vicons/ionicons5/' // Corrected import path
import { handleGetOrders } from '@/api'


const searchValue = ref<string>('')
function DoSearch() {
  data.value = orders.value.filter((t) => t.name == searchValue.value)
}

// const data = orders;
// const data = ref<Order[]>(orders.value);

const data = ref(orders.value)
const pagination = { pageSize: 10 }
const columns = createColumns()
const initData = async () => {
  try {
    const response = await handleGetOrders()
    data.value = []
    const totalDataNum: number = response.total
    const currentDataNum: number = response.data.length

    console.log('response', response)

    console.log('totalDataNum', response.total)
    console.log('currentDataNum', response.data.length)

    for (let i = 0; i < currentDataNum; i++) {
      data.value.push({
        id: response.data[i].id,
        name: response.data[i].name,
        description: response.data[i].description,
        price: response.data[i].phone,
        stat: response.data[i].stat, // 使用预定义的状态类型
        date: response.data[i].date,
        publisher: response.data[i].publisher_name, // 复用用户类型
        worker: response.data[i].worker_name, // 复用用户类型
      })
    }
  } catch (error) {
    console.log('get error')
  }
}

initData()
</script>

<style scoped>
.list-order-container {
  padding: 20px;
}

.main-content {
  max-width: 600px;
  margin: 0 auto;
}

.card-text-content {
  padding: 16px;
}

.text-center {
  text-align: center;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
