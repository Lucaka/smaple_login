// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
// mongoose.connect('mongodb://localhost:27017/test');
mongoose.connect('mongodb+srv://chitahoros:s0955651709@cluster0-kqbzu.gcp.mongodb.net/test?retryWrites=true&w=majority');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
// 登入資訊
const loginSchema = mongoose.Schema({
  account: String,
  password: String
});

// 未讀訊息
const messageSchema = mongoose.Schema({
  userId: String,
  message: Array,
});

/************** 定义模型Model **************/
const Models = {
  Login: mongoose.model('Login', loginSchema),
  Message: mongoose.model('Message', messageSchema),
}

module.exports = Models;