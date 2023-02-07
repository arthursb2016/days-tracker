<script setup lang="ts">
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
        <DateSelector />
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