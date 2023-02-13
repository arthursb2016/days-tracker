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
      <v-toolbar class="app-header px-8">
        <v-toolbar-title>
          <h1 class="mb-4">Days Tracker</h1>
          <p class="subtitle">Count days since a past date, until an upcoming event or just between two different dates</p>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="px-8 pb-8">
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
@import '~/assets/_colors.scss';

.container {
  margin: 0rem 8rem;

  .app-header {
    padding: 2.5rem 1.5rem;
    background-color: $primaryBlue;
    color: white;

    :deep(.v-toolbar-title), :deep(.v-toolbar-title__placeholder) {
      overflow: unset;
    }
    :deep(.v-toolbar-title) {
      line-height: 1.25rem;
      margin-inline-start: 0px;
    }

    .subtitle {
      max-width: 50rem;
      overflow-wrap: break-word;
      white-space: initial;
      margin: auto;
      text-align: center;
    }
  }
}
</style>