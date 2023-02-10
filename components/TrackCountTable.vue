<script setup lang="ts">
import type { PropType } from 'vue'
import { Record } from '@/utils/types'

// Props
const props = defineProps({
  records: {
    type: Array as PropType<Array<Record>>,
    default: () => [],
  },
})

// Emits
const emits = defineEmits(['reload'])

// Variables
const currDate = new Date()

// Methods
function getRecordDateDiff(record: Record) {
  const d2 = record.endDateStr === 'Current date' ? currDate : new Date(record.endDate)
  const d1 = record.startDateStr === 'Current date' ? currDate : new Date(record.startDate)
  return getDateDiff(d2, d1)
}

function onDelete(record: Record) {
  localStorage.removeItem(record.trackId)
  emits('reload')
}
</script>

<template>
  <v-card class="mx-auto">
    <v-toolbar>
      <v-toolbar-title>
        <span>Saved counts (locally)</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-table v-if="records.length" density="compact">
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in props.records"
            :key="record.trackId"
          >
            <td class="text-left">{{ record.trackId }}</td>
            <td class="text-left">{{ record.startDateStr }}</td>
            <td class="text-left">{{ record.endDateStr }}</td>
            <td class="text-left">{{ getRecordDateDiff(record) }}</td>
            <td class="text-left">
              <v-btn
                variant="text"
                color="blue-lighten-2"
                class="delete-button"
                @click="onDelete(record)"
              >
                <v-icon icon="mdi-delete" color="blue-lighten-2"></v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div v-if="!records.length" class="text-grey text-left">
        To track dates (save your inputs), follow these rules: <br>
        <div>
          1. One of the dates (start or end) has to be set as "current date";
        </div>
        <div>
          2. The count difference between dates has to be over 0.
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
:deep(.v-toolbar__content) {
  height: auto !important;
  padding: 0.25rem;
}
:deep(.v-toolbar-title) {
  font-size: 0.85rem;
}
:deep(.v-table__wrapper) {
  max-height: 10rem;
  height: auto Im !important;
}
.delete-button {
  border-radius: 50%;
  padding: 0 0.5rem;
  min-width: 1rem;
}
</style>