// eslint-disable-next-line no-unused-vars
import { getRequest, postRequest, deleteRequest, putRequest } from '../../api/axios/request'
import user from "./user";

const state = {
  // webstock
  webSocket: null,
  // 未讀訊息
  msgInfo: []
}

// eslint-disable-next-line no-unused-vars
let vuex;


// 連線成功 執行send方法 初始化
function websocketonopen(ws) {
  let actions = { id: user.state.userToken, type: "init" };
  websocketsend(ws.target, JSON.stringify(actions));
}

// 連接失敗 從新連線
function websocketonerror() {
  console.log('actions', actions);
  vuex.dispatch('initWebSocket');
}

// 數據接收
function websocketonmessage(e) {
  const data = JSON.parse(e.data);
  console.log('數據接收', data);
  switch (data.type) {
    // 私人訊息
    case 'send':
      vuex.dispatch('webSocket/addMessage', data);
      break;

    default:
      break;
  }

}
// 關閉
function websocketclose(e) {
  console.log('斷開連結', e);
}

// 傳送訊息
function websocketsend(ws, msg) {
  ws.send(msg)
}

const mutations = {
  // 初始化 webstock
  INTI_WEBSOCKET(state, wsuri) {
    vuex = this;
    state.webSocket = new WebSocket(wsuri);

    state.webSocket.onmessage = websocketonmessage;
    state.webSocket.onopen = websocketonopen;
    state.webSocket.onerror = websocketonerror;
    state.webSocket.onclose = websocketclose;
  },
  // 關閉 webstock
  CLOSE_WEBSOCKET(state) {
    state.websock.close()
  },
  // 初始化用戶訊息
  INTI_MESSAGE(state, data) {
    state.msgInfo = data;
  },
  // 新增訊息
  ADD_MESSAGE(state, data) {
    state.msgInfo.message.push(data);
  }

};

const actions = {
  // webSocket 初始化
  initWebSocket: function ({ commit }) {
    const wsuri = 'ws://localhost:3000';

    commit('INTI_WEBSOCKET', wsuri);
  },
  // webSocket 傳遞訊息
  wsSendMsg: function ({ state }, msgInfo) {
    websocketsend(state.webSocket, JSON.stringify(msgInfo));
  },
  // 清除 webSocket
  destroyed({ state }) {
    state.close();
  },
  // 儲存接收的私人訊息
  addMessage: async function ({ state, commit }, msgInfo) {
    console.log('state.msgInfo.message.length', state.msgInfo.message.length);
    if (state.msgInfo.message.length === 0) {
      return new Promise((resolve, reject) => {
        const addMessage = {
          userId: msgInfo.recipientId,
          message: msgInfo.context
        };
        postRequest('/api/message/addMessage', addMessage)
          .then(res => {
            if (res.data.length > 0) {
              console.log('init');
              commit('INTI_MESSAGE', addMessage)
              resolve(addMessage);
            } else {
              // 拋出Error code
              reject('100002');
            }
          })
      });
    }
    if (state.msgInfo.message.length > 0) {
      console.log('ttt', state.msgInfo, msgInfo);
      putRequest(`/api/message/putMessage/${msgInfo.recipientId}`);
    }
    // commit('ADD_MESSAGE', msgInfo)

  },
  getMessage: function ({ commit }) {
    return new Promise((resolve, reject) => {
      // 尋找當前用戶私人訊息
      getRequest(`/api/message/getMessage/${user.state.userToken}`).then(res => {
        if (res.data) {
          commit('INTI_MESSAGE', res.data)
          resolve(res.data);
        } else {
          // 沒有私人訊息
          reject('100003')
        }

      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}