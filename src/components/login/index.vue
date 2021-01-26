<template>
  <div class="container-fluid h-100">
    <home></home>
    <div class="row flex-row-reverse h-100">
      <div class="col-md-6 login--form">
        <form class="login--form--container" @submit.prevent="login">

          <div class="form-group row">
            <label for="username" class="col-sm-4 col-form-label">Account</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="username" placeholder="Account" v-model="account">
            </div>
          </div>

          <div class="form-group row">
            <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
            <div class="col-sm-8">
              <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="password">
            </div>
          </div>

          <div class="form-group login-fail" v-show="loginFailInfo">
            帳號不存在、密碼錯誤
          </div>

          <div v-if="isLogin">
            <input type="checkbox" class="form-group"> Remember me
            <button class="form-group btn btn-primary w-100">Login</button>
            <div class="w-100 sign-un" style="text-align: right">
              <span @click="loginStatus(false)">Sign Up</span>
            </div>
          </div>
          <div v-else>
            <button class="form-group btn btn-primary w-100" @click="signUpHandle">Sign Up & Login</button>
            <div class="w-100 sign-un" style="text-align: right">
              <span @click="loginStatus(true)">Login</span>
            </div>
          </div>


        </form>
      </div>

      <div class="col-md-6 logo">
<!--        <img src="../../assets/svg/speech-bubble.svg">-->
        <svg>
          <use xlink:href="#icon-speech-bubble"></use>
        </svg>
      </div>
    </div>

  </div>

</template>

<script>
  import '../../assets/svg/speech-bubble.svg';
  import Home from "../home";

  export default {
    components: {Home},
    data() {
      return {
        isLogin: true,
        account : '',
        password : '',
        loginFailInfo : false
      }
    },
    created() {
      console.log('login created');
    },
    mounted() {
      console.log('login  mounted');
    },

    methods:{
      show(){
        console.log(this.isLogin)
      },
      login() {

        if(this.account.trim().length === 0 || this.password.trim().length ===0) return;

        let params = {
          account : this.account,
          password : this.password
        };
        // 登陸
        this.postRequest('/api/login/loginAccount',params)
            .then( res => {
              console.log(res);
              if (res.data.length > 0) {


                //登陸成功
                this.$store.commit('user/USER_LOGIN');
                this.loginFailInfo = false;

                this.$router.push('webchat/chat')
              }else {
                //登入失敗
                console.log('登陸失敗')
                this.loginFailInfo = true;
              }
            });
      },
      loginStatus (isLogin) {
        this.isLogin = isLogin;
        this.loginFailInfo = false;

        this.account = '';
        this.password = '';
      },
      signUpHandle () {

        let params = {
          account : this.account,
          password : this.password
        };

        this.postRequest('/api/login/createAccount',params)
            .then((response) => {
                console.log('sign up success',response);

                //註冊成功 & 登陸
                // this.$store.commit('user/USER_LOGIN');
                // this.$router.push('webchat/chat')
                // this.login();

              })
              .catch((reject) => {
                console.log(reject)
              });
      }
    }
  }
</script>

<style lang="scss">


  .logo{
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

</style>