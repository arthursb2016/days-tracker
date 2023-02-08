<script setup lang="ts">
import { Ref } from 'vue'
import { TrackCount, Record } from '@/utils/types' 

// Variables
let showTrackForm = ref(false)
let trackData = reactive({})
let records: Ref<Record[]> = ref([])

// Methods
function onTrackCount(data: TrackCount) {
  trackData = { ...data }
  showTrackForm.value = true
}

function onTrackCountBack() {
  showTrackForm.value = false
  trackData = {}
}

function onTrackCountSave() {
  onTrackCountBack()
  loadRecords()
}

function loadRecords() {
  records.value = []
  Object.values(localStorage).forEach((item) => {
    const record = JSON.parse(item)
    if (record.trackId) {
      records.value.push({ ...record })
    }
  })
}

// Hooks
onMounted(() => {
  loadRecords()
})
</script>

<template>
  <div class="container text-center">
    <v-card class="mx-auto">
      <v-toolbar class="app-header" color="blue-darken-1">
        <v-toolbar-title>
          <h2 class="mb-1">Days Tracker</h2>
          <h5>Count days since a past date, until an upcoming event or just between two different dates</h5>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mx-4">
        <TrackCountForm
          v-if="showTrackForm"
          :start-date="trackData.startDate"
          :end-date="trackData.endDate"
          @save="onTrackCountSave"
          @back="onTrackCountBack"
        />
        <div v-else>
          <DateSelector @track="onTrackCount" />
          <TrackCountTable
            :records="records"
            class="mt-12"
            @reload="loadRecords"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0rem 8rem;

  .app-header {
    padding: 1.5rem;

    :deep(.v-toolbar-title), :deep(.v-toolbar-title__placeholder) {
      overflow: unset;
    }
  }
}
</style>