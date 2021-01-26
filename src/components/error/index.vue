<template>
  <div class="content">
    <img class="error" src="../../assets/img/404.jpg"/>
  </div>
</template>

<script>
  export default {
    name: "error"
  }
</script>

<style scoped>
  .content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .error {
    width: 100%;
  }
</style>