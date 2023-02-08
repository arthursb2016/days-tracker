<script setup lang="ts">
import type { PropType } from 'vue'
import { Record } from '@/utils/types'

// Props
const props = defineProps({
  records: {
    type: Array as PropType<Array<Record>>,
    default: () => [],
  }
})

// Variables
const currDate = new Date()

// Methods
function getRecordDateDiff(record: Record) {
  const d2 = record.endDate === 'Current date' ? currDate : new Date(record.endDate)
  const d1 = record.startDate === 'Current date' ? currDate : new Date(record.startDate)
  return getDateDiff(d2, d1)
}
</script>

<template>
  <v-table density="compact" height="10rem">
    <thead>
      <tr>
        <th class="text-left">
          Identifier
        </th>
        <th class="text-left">
          Start Date
        </th>
        <th class="text-left">
          End Date
        </th>
        <th class="text-left">
          Count
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="record in records"
        :key="record.trackId"
      >
        <td class="text-left">{{ record.trackId }}</td>
        <td class="text-left">{{ record.startDate }}</td>
        <td class="text-left">{{ record.endDate }}</td>
        <td class="text-left">{{ getRecordDateDiff(record) }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss" scoped>

</style>