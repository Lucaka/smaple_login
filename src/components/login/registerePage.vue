<template>
  <div>
    <form @submit.prevent="signUpHandle">
      <!-- 帳號 -->
      <div class="form-group row">
        <label for="username" class="col-sm-4 col-form-label">Account</label>
        <div class="col-sm-8">
          <input
            type="text"
            class="form-control"
            id="signUpUsername"
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
            id="signUpPassword"
            placeholder="Password"
            v-model="password"
            required="required"
          />
        </div>
      </div>

      <!-- 註冊按鈕 -->
      <button
        class="form-group btn btn-primary w-100"
        @click.stop="signUpHandle"
      >
        Sign Up & Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "registerePage",
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    // 註冊
    signUpHandle() {
      let params = {
        account: this.account,
        password: this.password,
      };

      this.$store
        .dispatch("account/create", params)
        .then(() => {
          // 切換成登入畫面 執行登入
          this.loginStatus(true);
          // this.login();
        })
        .catch(() => {
          console.log("註冊失敗");
        });
    },
  },
};
</script>

<style scoped>
</style>