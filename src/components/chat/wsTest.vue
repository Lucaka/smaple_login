<template>
  <div id="app">
    <div class="container" style="margin-bottom: 10px">
      <div class="d-flex my-3 align-items-center">
        <b-dropdown :text="sendType">
          <b-dropdown-item
            v-for="type in sendTypeList"
            :key="'sendTypeList_' + type"
            @click="sendTypeHandle"
          >{{ type }}</b-dropdown-item>
        </b-dropdown>
        <!-- 當類型為send 私人訊息才開啟 -->
        <template v-if="sendType === sendTypeList[1]">
          UserId
          <b-input class="mx-3" style="width: 100px" v-model="privateMsg.userId" />
        </template>
        Message
        <b-input class="mx-3" style="width: 250px" v-model="privateMsg.context" />

        <b-button class="col-2 btn-info" variant="success" @click="sendMsgHandle">Send</b-button>
      </div>
    </div>
    <!-- <div class="container">
      <b-button class="col-4" variant="success" @click="getHandle">GET</b-button>
      <b-button class="col-4" variant="success" @click="postHandle">POST</b-button>
      <b-button class="col-2" variant="success" @click="deleteHandle">DELETE</b-button>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      // 傳送訊息類別清單
      sendTypeList: ["global", "send"],
      // 當前訊息類別
      sendType: "global",
      // 傳送訊息資訊
      privateMsg: { userId: "", context: "" }
    };
  },
  mounted() {
    // ws()
  },
  created() {},
  destroyed() {},
  methods: {
    sendMsgHandle() {
      const objMsg = {
        senderId: this.userToken,
        recipientId: this.privateMsg.userId,
        type: this.sendType,
        context: this.privateMsg.context
      };
      console.log("sendMsgHandle", objMsg);
      this.$store.dispatch("webSocket/wsSendMsg", objMsg);
    },
    sendTypeHandle(e) {
      this.sendType = e.target.childNodes[0].data;
    }

    // getHandle() {
    //   this.getRequest('http://localhost:3004/comments').then(res=>{
    //     console.log('response：',res.data)
    //   })
    // },

    // postHandle() {
    //   let obj = {body:'test'};

    //   this.postRequest('http://localhost:3004/comments',obj).then(res=>{
    //     console.log('post success：',res.data)
    //   })
    // },

    // deleteHandle() {
    //   this.deleteRequest('http://localhost:3004/comments/3').then(res=>{
    //     console.log('post success：',res.data)
    //   })
    // }
  },
  computed: {
    userToken() {
      return this.$store.state.user.userToken;
    }
  }
};
</script>

<style>
.container .btn {
  margin: 0 5px 0 5px;
}
</style>
