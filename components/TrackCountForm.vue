<script setup lang="ts">
import slugify from 'slugify'
import { Record } from '@/utils/types'

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
  return props.startDate.toLocaleDateString('en-US')
})

const endDateStr = computed(() => {
  if (isSameDay(props.endDate, currDate)) return 'Current date'
  return props.endDate.toLocaleDateString('en-US')
})

const currDateDiff = computed(() => {
  return getDateDiff(props.endDate, props.startDate)
})

// Methods
function onSave() {
  if (!trackId.value) return
  const record: Record = {
    trackId: trackId.value,
    startDate: props.startDate,
    startDateStr: startDateStr.value,
    endDate: props.endDate,
    endDateStr: endDateStr.value
  }
  localStorage.setItem(slugify(trackId.value), JSON.stringify(record))
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
      color="green-darken-3"
      variant="outlined"
      class="flex-grow-1 mr-1"
      :disabled="!trackId"
      @click="onSave"
    >
      <v-icon
        icon="mdi-radar"
        class="mr-1"
      />
      <span>Save to Browser</span>
    </v-btn>
    <v-btn
      color="blue-grey-darken-2"
      variant="outlined"
      class="flex-grow-1 ml-1"
      @click="$emit('back')"
    >
      <span>Return</span>
      <v-icon
        icon="mdi-keyboard-return"
        class="ml-1"
      />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>

</style>