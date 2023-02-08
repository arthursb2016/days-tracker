<script setup lang="ts">
import slugify from 'slugify'

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

// Emits
const emits = defineEmits(['save', 'back'])

// Variables
const currDate = new Date()
const trackId = ref('')

// Computed
const startDateStr = computed(() => {
  if (isSameDay(props.startDate, currDate)) return 'Current date'
  return props.startDate.toLocaleDateString()
})

const endDateStr = computed(() => {
  if (isSameDay(props.endDate, currDate)) return 'Current date'
  return props.endDate.toLocaleDateString()
})

const currDateDiff = computed(() => {
  return getDateDiff(props.endDate, props.startDate)
})

// Methods
function onSave() {
  if (!trackId.value) return
  localStorage.setItem(slugify(trackId.value), JSON.stringify({
    trackId: trackId.value,
    startDate: startDateStr.value,
    endDate: endDateStr.value,
  }))
  emits('save')
}

// Hooks
onMounted(() => {
  const node = document.getElementById('trackingId')
  if (!node) return
  node.focus()
})
</script>

<template>
  <v-text-field
    id="trackingId"
    v-model="trackId"
    label="Tracking identifier (name)"
    variant="outlined"
  />
  <v-text-field
    v-model="startDateStr"
    label="Start date"
    variant="outlined"
    disabled
  />
  <v-text-field
    v-model="endDateStr"
    label="End date"
    variant="outlined"
    disabled
  />
  <v-text-field
    v-model="currDateDiff"
    label="Current count difference"
    variant="outlined"
    disabled
  />
  <div class="d-flex">
    <v-btn
      color="orange"
      variant="outlined"
      class="flex-grow-1 mr-1"
      :disabled="!trackId"
      @click="onSave"
    >
      <v-icon
        icon="mdi-radar"
        class="mr-1"
      />
      Save to Browser
    </v-btn>
    <v-btn
      color="grey"
      variant="outlined"
      class="flex-grow-1 ml-1"
      @click="$emit('back')"
    >
      Return
      <v-icon
        icon="mdi-keyboard-return"
        class="ml-1"
      />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>

</style>