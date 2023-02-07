<script setup lang="ts">
// Props
const props = defineProps({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  }
})

// Variables
const trackId = ref('')
const goal = ref(0)

// Computed
const startDateStr = computed(() => {
  return props.startDate.toLocaleDateString()
})

const endDateStr = computed(() => {
  return props.endDate.toLocaleDateString()
})
</script>

<template>
  <v-text-field
    v-model="trackId"
    label="Tracking identifier (name)"
    variant="underlined"
  />
  <v-text-field
    v-model="startDateStr"
    label="Start date"
    variant="underlined"
    disabled
  />
  <v-text-field
    v-model="endDateStr"
    label="End date"
    variant="underlined"
    disabled
  />
  <v-text-field
    v-model="goal"
    label="Count goal (optional)"
    variant="underlined"
    type="number"
    min="1"
  />
</template>

<style lang="scss" scoped>

</style>