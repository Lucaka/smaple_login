<template>
  <div>
    <form class="login--form--container" @submit.prevent="login">
      <!-- 登入畫面 -->
      <div>
        <!-- 帳號 -->
        <div class="form-group row">
          <label for="username" class="col-sm-4 col-form-label">Account</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="loginUsername"
              placeholder="Account"
              v-model="account"
              required="required"
            />
          </div>
        </div>

        <!-- 密碼 -->
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label"
            >Password</label
          >
          <div class="col-sm-8">
            <input
              type="password"
              class="form-control"
              id="loginPassword"
              placeholder="Password"
              v-model="password"
              required="required"
            />
          </div>
        </div>

        <!-- 錯誤訊息 -->
        <div class="form-group login-fail" v-show="loginFailInfo">
          帳號不存在、密碼錯誤
        </div>
        <input type="checkbox" class="form-group" /> Remember me
        <button class="form-group btn btn-primary w-100">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  components: {},
  data() {
    return {
      account: "admin",
      password: "admin",
      loginFailInfo: false,
    };
  },
  methods: {
    // 登陸
    login() {
      if (this.account.trim().length === 0 || this.password.trim().length === 0)
        return;

      let params = {
        account: this.account,
        password: this.password,
      };

      this.$store
        .dispatch("account/login", params)
        .then(() => {
          this.loginFailInfo = false;
          this.$router.push("webchat/home");
        })
        .catch((e) => {
          console.log("登陸失敗", e);
          this.loginFailInfo = true;
        });
    },
  },
};
</script>

<style scoped>
</style>