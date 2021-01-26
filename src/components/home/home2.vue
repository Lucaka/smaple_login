<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: "home2",
    props: {
      prod :{
        type: Number,
        default: 100
      }
    },
    created() {
      console.log('home2 created');
    },
    mounted() {
      console.log('home2 mounted');
      console.log(this);
    }
  }
</script>

<style scoped>

</style>