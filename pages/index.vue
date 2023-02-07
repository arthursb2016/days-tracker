<script setup lang="ts">
  console.log('hello')
</script>

<template>
  <div class="container text-center">
    <v-card class="mx-auto">
      <v-toolbar color="blue-darken-1">
        <v-toolbar-title>
          <h2 class="mb-1">Days Tracker</h2>
          <h5>Count days since a past date or until an upcoming event</h5>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        Inputs
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