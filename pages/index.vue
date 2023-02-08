<script setup lang="ts">
// Types
type TrackCount = { startDate: Date, endDate: Date }

// Variables
let showTrackForm = ref(false)
let trackData = reactive({})

// Methods
function onTrackCount(data: TrackCount) {
  trackData = { ...data }
  showTrackForm.value = true
}

function onTrackCountBack() {
  showTrackForm.value = false
  trackData = {}
}

// Hooks
onMounted(() => {
  console.log(localStorage)
})
</script>

<template>
  <div class="container text-center">
    <v-card class="mx-auto">
      <v-toolbar color="blue-darken-1">
        <v-toolbar-title>
          <h2 class="mb-1">Days Tracker</h2>
          <h5>Count days since a past date, until an upcoming event or just two different dates</h5>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mx-4">
        <DateSelector
          v-if="!showTrackForm"
          @track="onTrackCount"
        />
        <TrackCountForm
          v-if="showTrackForm"
          :start-date="trackData.startDate"
          :end-date="trackData.endDate"
          @back="onTrackCountBack"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 2rem 8rem;

  :deep(.v-toolbar) {
    padding: 1.5rem;
  }
  :deep(.v-toolbar-title), :deep(.v-toolbar-title__placeholder) {
    overflow: unset;
  }
}
</style>