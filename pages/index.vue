<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Variables
const currDate = new Date()

const startDate = ref(currDate)
const endDate = ref(currDate)

const startCurrDate = ref(true)
const endCurrDate = ref(true)

// Computed
const dateDiff = computed(() => {
  if (!startDate.value || !endDate.value) {
    return null
  }
  return getDateDiff(endDate.value, startDate.value)
})

// Watchers
watch(startDate, () => {
  if (isSameDay(startDate.value, currDate)) {
    startCurrDate.value = true
    return
  }
  startCurrDate.value = false
})

watch(endDate, () => {
  if (isSameDay(endDate.value, currDate)) {
    endCurrDate.value = true
    return
  }
  endCurrDate.value = false
})

watch(startCurrDate, () => {
  if (startCurrDate.value) {
    startDate.value = currDate
  }
})

watch(endCurrDate, () => {
  if (endCurrDate.value) {
    endDate.value = currDate
  }
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
        <div class="d-flex mb-4">
          <!-- START DATE -->
          <div class="date-container start-date-container">
            <div class="d-flex align-center justify-space-between">
              <label>Start date</label>
              <v-checkbox
                v-model="startCurrDate"
                label="Current date"
                hide-details
                color="blue-lighten-1"
                density="compact"
                :disabled="isSameDay(startDate, currDate)"
                class="flex-grow-0 mr-1"
                :class="{
                  'cursor-not-allowed': isSameDay(startDate, currDate),
                }"
              />
            </div>
            <Datepicker
              v-model="startDate"
              auto-apply
              :enable-time-picker="false"
              :clearable="false"
            />
          </div>

          <!-- END DATE -->
          <div class="date-container end-date-container">
            <div class="d-flex align-center justify-space-between">
              <label>End date</label>
              <v-checkbox
                v-model="endCurrDate"
                label="Current date"
                hide-details
                color="blue-lighten-1"
                density="compact"
                :disabled="isSameDay(endDate, currDate)"
                class="flex-grow-0 mr-1"
                :class="{
                  'cursor-not-allowed': isSameDay(startDate, currDate),
                }"
              />
            </div>
            <Datepicker
              v-model="endDate"
              auto-apply
              :enable-time-picker="false"
              :clearable="false"
            />
          </div>
        </div>
        <v-card
          v-if="dateDiff !== null"
          variant="tonal"
          color="blue-lighten-1"
          class="py-2"
        >
          The number of days between the two given dates is:
          <b>{{ dateDiff }}</b>
        </v-card>
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

  .date-container {
    text-align: left;
    flex-grow: 1;

    label {
      font-size: 1.15rem;
    }

    &.start-date-container {
      margin-right: 1rem;
    }
    &.end-date-container {
      margin-left: 1rem;
    }
  }
}
.cursor-not-allowed {
  cursor: not-allowed !important;
}
</style>