<template>
  <div class="row flex-row-reverse h-100 mx-0">
    <div class="col-md-6 login--form">
      <transition name="fade" mode="out-in">
        <div v-if="isLogin" class="login--form--container" key="loginPage">
          <loginPage />
          <!-- 切換成註冊頁面 -->
          <div class="w-100 sign-un" style="text-align: right">
            <span @click="loginStatus(false)">Sign Up</span>
          </div>
        </div>

        <!-- 註冊頁面 -->
        <div v-else class="login--form--container" key="registerePage">
          <registerePage />
          <div class="w-100 sign-un" style="text-align: right">
            <!-- 切換成登入頁面 -->
            <span @click="loginStatus(true)">Login</span>
          </div>
        </div>
      </transition>
    </div>

    <div class="col-md-6 logo">
      <svg>
        <use xlink:href="#icon-speech-bubble"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import LoginPage from "./loginPage";
import RegisterePage from "./registerePage";
import "../../assets/svg/speech-bubble.svg";

export default {
  name: "login",
  components: { RegisterePage, LoginPage },
  data() {
    return {
      isLogin: true,
    };
  },
  methods: {
    loginStatus(isLogin) {
      this.isLogin = isLogin;
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  background-color: #273c75;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: aliceblue;
  }
}

.login--form {
  display: flex;
  align-items: center;
  justify-content: center;

  .login-fail {
    color: red;
  }

  .login--form--container {
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    border-color: dimgray;
    padding: 10px;

    .sign-un {
      span:hover {
        cursor: pointer;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>