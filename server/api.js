"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

router.post('/api/login/loginAccount', (req, res) => {
  models.Login.find(req.body, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password
  });
  // 保存数据newAccount数据进mongoDB
  newAccount.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('createAccount successed');
    }
  });
});

// 获取已有账号接口
router.get('/api/login/getAccount', (req, res) => {
  // 通过模型去查找数据库
  models.Login.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 新增私人訊息
router.post('/api/message/addMessage', (req, res) => {
  console.log('api/message/addMessage', req.body);
  let addMessage = new models.Message({
    userId: req.body.userId,
    message: req.body.message
  });

  addMessage.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('createAccount successed');
    }
  });
});

// 更新未讀訊息
router.put('/api/message/putMessage/:userId', (req, res) => {
  console.log('putMessage', req.params);
  // let id;

  // models.Message.findOne({ userId: req.body.userId }, (err, data) => {
  //   id = data._id;
  //   console.log('findOne', id, data)
  // });

  // const updatedUser = {}
  // updatedUser.userId = req.body.userId
  // updatedUser.Message = req.body.Message

  // models.Message.findByIdAndUpdate(id, updatedUser, (err, updatedData) => {
  //   if (err) {
  //     console.log('addMessage updated Error', updatedData)
  //   }
  //   else {
  //     console.log(updatedData)
  //     res.send('addMessage updated');
  //     //res.redirect or res.send whatever you want to do
  //   }
  // })

});

router.get('/api/message/getMessage/:userId', async (req, res) => {
  // 通过模型去查找数据库
  await models.Message.findOne({ userId: req.params.userId }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }

  });
});

module.exports = router;