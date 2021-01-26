<template>
  <div>
    <home2 :propD="111" ref="home2"></home2>
  </div>
</template>

<script>
  import Home2 from "./home2";
  export default {
    name: "home",
    components: {Home2},
    created() {
      console.log('home created');
      console.log(this.$refs.home2);
    },
    mounted() {
      console.log('home mounted');
      // console.log(this.$refs.home2);
    }
  }
</script>

<style scoped>

</style>