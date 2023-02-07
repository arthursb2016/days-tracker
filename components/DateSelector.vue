<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Emits
const emits = defineEmits(['track'])

// Variables
const currDate = new Date()

const startDate = ref(currDate)
const endDate = ref(currDate)

const startCurrDate = ref(true)
const endCurrDate = ref(true)

// Computed
const dateDiff = computed(() => {
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
    nextTick(() => {
      if (dateDiff.value < 0) {
        endDate.value = currDate
      }
    })
  }
})

watch(endCurrDate, () => {
  if (endCurrDate.value) {
    endDate.value = currDate
    nextTick(() => {
      if (dateDiff.value < 0) {
        startDate.value = currDate
      }
    })
  }
})
</script>

<template>
  <div class="d-flex mb-4">
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
          :class="{ 'cursor-not-allowed': isSameDay(startDate, currDate) }"
        />
      </div>
      <Datepicker
        v-model="startDate"
        auto-apply
        :enable-time-picker="false"
        :clearable="false"
        :max-date="endDate"
      />
    </div>
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
          :class="{ 'cursor-not-allowed': isSameDay(startDate, currDate) }"
        />
      </div>
      <Datepicker
        v-model="endDate"
        auto-apply
        :enable-time-picker="false"
        :clearable="false"
        :min-date="startDate"
      />
    </div>
  </div>
  <v-card
    variant="tonal"
    color="blue-lighten-1"
    class="py-2"
  >
    The number of days between the two given dates is:
    <b>{{ dateDiff }}</b>

    <v-btn
      v-if="dateDiff && (startCurrDate || endCurrDate)"
      density="compact"
      color="orange"
      class="track-button"
      variant="outlined"
      @click="$emit('track', { startDate, endDate })"
    >
      track count
      <v-icon
        icon="mdi-radar"
        class="ml-1"
      />
    </v-btn>
  </v-card>
</template>

<style lang="scss" scoped>
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
.cursor-not-allowed {
  cursor: not-allowed !important;
}
.track-button {
  position: absolute;
  right: 0.25rem;
  top: 0.35rem;
  float: right;
  font-size: 0.75rem;
}
</style>