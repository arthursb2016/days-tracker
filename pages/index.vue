<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const startDate = ref(null)
const endDate = ref(null)

const startCurrDate = ref(false)
const endCurrDate = ref(false)
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
      <v-card-text>
        <div class="d-flex mx-4 mb-4">
          <!-- START DATE -->
          <div class="date-container start-date-container">
            <div class="d-flex align-center justify-space-between">
              <label>Start date</label>
              <v-checkbox
                v-model="startCurrDate"
                label="Current date"
                hide-details
                color="blue-darken-1"
                class="flex-grow-0 mr-1"
                density="compact"
              />
            </div>
            <Datepicker
              v-model="startDate"
              auto-apply
              :enable-time-picker="false"
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
                color="blue-darken-1"
                class="flex-grow-0 mr-1"
                density="compact"
              />
            </div>
            <Datepicker
              v-model="endDate"
              auto-apply
              :enable-time-picker="false"
            />
          </div>
        </div>
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
</style>