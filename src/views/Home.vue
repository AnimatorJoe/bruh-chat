<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Chatroom>
    </Chatroom>
  </div>
</template>

<script>
// @ is an alias to /src
import Chatroom from '@/components/Chatroom.vue'

export default {
  name: 'home',
  components: {
    Chatroom
  }
}
</script>
