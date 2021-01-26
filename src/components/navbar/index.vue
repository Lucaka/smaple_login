<template>
  <div class="content">
    <router-view class="main_view"></router-view>
    <nav class="menu">
      <ul>
        <li><router-link class="navbar__button" to="/webchat/home">Home</router-link></li>
        <li><router-link class="navbar__button" to="/webchat/room">Room</router-link></li>
        <li><router-link class="navbar__button" to="/webchat/chat">Chat</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "index.vue"
  }
</script>

<style scoped lang="scss">
  .content {
    height: 100%;
    /* 為了讓子元件 可以分配剩餘高度*/
    display: flex;
    flex-flow: column;

    .main_view {
      height: 100%;
      margin: 10px;
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      background-color: #f1f1f1;
      display:flex;
      height: 100%;
      li {
        flex: 1;
        .navbar__button {
          text-align: center;
          display: block;
          color: #000;
          padding: 8px 16px;
          text-decoration: none;
        }
      }
    }
  }
</style>