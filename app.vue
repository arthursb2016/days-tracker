<script>
import '~/assets/_queries.scss'
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
html {
  background: #f2f2f2;
  height: 100vh;
}
body {
  height: 100%;
}
#__nuxt {
  height: 100%;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>