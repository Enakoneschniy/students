<template>
  <div>
    <modals-container />
    <v-dialog />
    <TheHeader />
    <nuxt />
  </div>
</template>
<script>
import TheHeader from '../components/TheHeader'
export default {
  components: { TheHeader }
}
</script>
