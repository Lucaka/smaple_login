<template>
  <div id="app">
    <div class="container" style="margin-bottom: 10px">
      <b-button class="col-2 btn-info" variant="success" @click="websocketsend('666')">Client Send</b-button>
      <b-button class="col-2 btn-info" variant="success" @click="websocketsend('666')">Server Send</b-button>
    </div>
    <div class="container">
      <b-button class="col-4" variant="success" @click="getHandle">GET</b-button>
      <b-button class="col-4" variant="success" @click="postHandle">POST</b-button>
      <b-button class="col-2" variant="success" @click="deleteHandle">DELETE</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components :{
    },
    data () {
      return {
        websock:null,
      }
    },
    mounted () {
      // ws();
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      // this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket(){ //初始化weosocket
        const wsuri = 'ws://localhost:8088';


        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;

        // eslint-disable-next-line no-console
        console.log(this.websock);
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        let actions = {"test":"12345"};
        this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        // const redata = JSON.parse(e.data);
        // eslint-disable-next-line no-console
        console.log('数据接收',e);
      },
      websocketsend(Data){//数据发送
        // eslint-disable-next-line no-console
        console.log('数据发送',Data);
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        // eslint-disable-next-line no-console
        console.log('断开连接',e);
      },

      getHandle() {
        this.getRequest('http://localhost:3004/comments').then(res=>{
          console.log('response：',res.data)
        })
      },

      postHandle() {
        let obj = {body:'test'};

        this.postRequest('http://localhost:3004/comments',obj).then(res=>{
          console.log('post success：',res.data)
        })
      },

      deleteHandle() {
        this.deleteRequest('http://localhost:3004/comments/3').then(res=>{
          console.log('post success：',res.data)
        })
      }
    },

  }
</script>

<style>


  .container .btn{
    margin: 0 5px 0 5px;
  }
</style>
