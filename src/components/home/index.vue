<template>
  <div @click="sendMsg">
    123
    {{ message }}
    <home2 :propD="111" ref="home2"></home2>
  </div>
</template>

<script>
import Home2 from "./home2";
export default {
  name: "home",
  components: { Home2 },
  methods: {
    sendMsg() {
      const objMsg = { id: "ddd", type: "send", context: "tessssst" };
      this.$store.dispatch("webSocket/wsSendMsg", objMsg);
    },
  },
  computed: {
    message() {
      return this.$store.state.webSocket.msgInfo;
    },
  },
};
</script>

<style scoped>
</style>