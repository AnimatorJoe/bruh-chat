<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <PublicMessage/>
  </div>
</template>

<script>
// @ is an alias to /src
import PublicMessage from "@/components/PublicMessage.vue"

export default {
  name: "home",
  components: {
    PublicMessage
  }
}
</script>
