<template>
  <div class="app">
    <div class="header position-relative">
      <div class="container justify-content-between justify-content-md-end">
        <!-- Hamburg -->
        <i
          class="header--hamburg fas fa-bars d-inline d-md-none"
          @click="showSidebar = !showSidebar"
        ></i>
        <!-- logo -->
        <router-link to="/webchat/home">
          <svg class="header--logo mr-5" style="width: 50px; height: 50px">
            <use xlink:href="#icon-speech-bubble"></use>
          </svg>
        </router-link>
        <!-- navbar -->
        <ul class="mr-auto d-none d-md-flex navbar">
          <li v-for="navbar in navbarList" :key="'navbar_' + navbar.name">
            <router-link class="navbar--button" :to="navbar.link">{{
              navbar.name
            }}</router-link>
          </li>
        </ul>
        <!-- user info -->
        <div class="userInfo">
          <!-- 使用者名稱 -->
          <p class="userInfo--user">
            {{ "Hi ! " + userName }}
          </p>
          <!-- 訊息 -->
          <i class="far fa-envelope userInfo--msg"></i>
          <!-- 登出 -->
          <button
            @click="logOutHandle"
            class="btn btn-primary userInfo--logout"
          >
            Log Out
          </button>
        </div>
      </div>
      <!-- sidebar -->
      <div class="sidebar">
        <!-- sidebar 背景 -->
        <div
          class="sidebar--bg"
          v-show="showSidebar === true"
          @click="showSidebar = !showSidebar"
        ></div>
        <!-- sidebar 外容器 -->
        <div
          class="sidebar--box"
          :class="{ 'sidebar--box--open': showSidebar === true }"
        >
          <!-- 關閉 icon -->
          <i
            class="fas fa-times sidebar--close"
            @click="showSidebar = !showSidebar"
          ></i>
          <!-- sidebar 內容 -->
          <ul class="w-100">
            <li
              v-for="navbar in navbarList"
              :key="'sidebar_' + navbar.name"
              class="d-block sidebar--btn"
              @click="showSidebar = !showSidebar"
            >
              <router-link class="sidebar--btn" :to="navbar.link">{{
                navbar.name
              }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import "../../assets/svg/speech-bubble.svg";

export default {
  name: "index.vue",
  created() {
    this.$store.dispatch("webSocket/initWebSocket");
    this.$store.dispatch("webSocket/getMessage");
  },
  data() {
    return {
      navbarList: [
        {
          name: "Home",
          link: "/webchat/home",
        },
        {
          name: "Room",
          link: "/webchat/room",
        },
        {
          name: "Chat",
          link: "/webchat/chat",
        },
      ],
      showSidebar: false,
    };
  },
  destroyed() {
    this.$store.dispatch("webSocket/websocketclose");
  },
  computed: {
    userName() {
      return this.$store.state.user.userToken;
    },
    message() {
      return this.$store.state.webSocket.message;
    },
  },
  methods: {
    logOutHandle() {
      this.$alert("確定登出嗎?", "登出", {
        confirmButtonText: "確定",
        callback: (action) => {
          if (action === "confirm") {
            this.$message({
              type: "success",
              message: "已登出",
            });
            this.$store.commit("user/USER_LOGOUT");
          }
          if (action === "cancel") {
            this.$message({
              type: "info",
              message: "取消登出",
            });
          }
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
$header-txt-color: #fff;
$header-hight: 80px;

.header {
  height: $header-hight;
  background: #273c75;
  .container {
    display: flex;
    padding: 1rem 0;
    align-items: center;
  }

  .header--hamburg {
    padding-left: 10px;
    color: $header-txt-color;
    &:hover {
      cursor: pointer;
    }
  }

  .header--logo {
    fill: $header-txt-color;
    &:hover {
      cursor: pointer;
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      a {
        text-align: center;
        display: block;
        color: $header-txt-color;
        text-decoration: none;
      }
    }
  }

  .navbar {
    display: flex;
    height: 100%;
    li {
      flex: 1;
      .navbar--button {
        padding: 8px 16px;
      }
    }
  }

  .userInfo {
    display: flex;
    align-items: center;
    color: white;
    padding-right: 10px;

    .userInfo--user {
      margin-bottom: 0;
      margin-right: 1rem;
    }

    .userInfo--msg {
      margin-right: 1rem;
      &:hover {
        color: #bdb7b7;
        cursor: pointer;
      }
    }

    // .userInfo--logout {
    // }
  }

  .sidebar {
    color: $header-txt-color;
    z-index: 1;
    height: 100vh;
    position: absolute;
    top: 0;

    .sidebar--close {
      width: 100%;
      text-align: center;
      height: $header-hight;
      line-height: $header-hight;
      &:hover {
        cursor: pointer;
      }
    }

    .sidebar--box {
      background: #3b3b3b;
      height: 100%;
      width: 0;
      position: relative;
      box-shadow: 2px 0px 16px 0px #333;
      overflow: hidden;
      display: flex;
      flex-flow: column;
      align-items: center;
      transition: width 0.5s;

      .sidebar--btn {
        padding: 10px 0;
        &:hover {
          background: #4779ae;
        }
      }
    }

    .sidebar--box--open {
      width: 150px;
    }

    .sidebar--bg {
      width: 100vw;
      height: 100vh;
      background: #cecece75;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>