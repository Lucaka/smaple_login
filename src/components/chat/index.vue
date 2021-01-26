<template>
    <div class="content">

    <nav class="nav__container">
      <svg class="send-box__icon nav__back" @click="backHandle">
        <use xlink:href="#icon-back"></use>
      </svg>
      <span>Chat</span>
      <svg class="send-box__icon">
        <use xlink:href="#icon-settings"></use>
      </svg>
    </nav>

    <div class="message" ref="message">
      <div class="message__more" v-show="isMoreMsg">顯示更多訊息....</div>
      <div class="message__text" v-for="(item,index) in items" :key="index">
        <span>{{ item.msg }}</span>
      </div>
    </div>

    <div class="send-box">
      <input class="send-box__message" ref="inputMsg" @keyup.enter="sendHandle">
      <button class="send-box--send" @click="sendHandle">
        <svg class="send-box__icon">
          <use xlink:href="#icon-sent-mail"></use>
        </svg>
      </button>

    </div>
  </div>
</template>

<script>
  import '@/assets/svg/sent-mail.svg'
  import '@/assets/svg/back.svg'
  import '@/assets/svg/settings.svg'

  export default {
    name: "index",
    data () {
      return {
        items :[],
        isMoreMsg : true,
        msgScrollHeight : 0
      }
    },
    mounted() {
      // 讀取假資料
      for (let i = 0; i < 50; i++) {
        let msg = { msg:`HEHEXD -- ${i}` };
        this.items.push(msg);
      }

      this.$refs.message.addEventListener('scroll',this.messageScrollHandle)
    },
    updated () {
      // 聊天訊息置底，當msgScrollHeight有值時代表讀取歷史訊息並計算載入完的高度
      this.$refs.message.scrollTop = this.$refs.message.scrollHeight - this.msgScrollHeight

      this.msgScrollHeight = 0;
    },
    methods :{
      // scroll 移動時
      messageScrollHandle (e) {
        if(e.target.scrollTop === 0){
          setTimeout(()=>{this.loadHistory()}, 1000);
        }
      },
      // 讀取歷史訊息
      loadHistory () {
        this.msgScrollHeight =  this.$refs.message.scrollHeight;

        for (let i = 100; i >= 50; i--) {
          let msg = { msg:`HEHEXD -- ${i}` };
          this.items.unshift(msg);
        }
      },
      // 發送訊息
      sendHandle () {
        if( this.$refs.inputMsg.value.length > 0) {
          let msg = { msg:this.$refs.inputMsg.value };
          this.items.push(msg);

          this.$refs.inputMsg.value = '';
        }
      },

      backHandle () {
        this.$router.back();
      }
    }
  }
</script>

<style lang="scss" scoped>

  .content {

    height: 100%;
    /* 為了讓message 可以分配剩餘高度*/
    display: flex;
    flex-flow: column;
  }
  .nav__container {
    color: white;
    background-color: #00a8ff;
    font-size: 1.5em;
    text-align: center;
    height: 60px;
    line-height: 60px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    svg {
      fill: #f1f1f1;
    }

    .nav__back:hover{
      cursor: pointer;
    }
  }

  .send-box__icon {
    width: 32px;
    height: 32px;
  }


  .message {
    height: 100%;
    overflow :auto;

    .message__more {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .message__text {
      margin-left: 10px;
    }
  }
  .send-box {
    border-width: 2px;
    display: flex;

    .send-box__message {
      width: 100%;
    }

    .send-box--send:hover {
      cursor: pointer;
    }

  }

</style>