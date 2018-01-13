//后端服务器
const userApi = require('./api/userApi');
const selectApi = require('./api/select');
const deleteApi = require('./api/delete');
const updateApi = require('./api/update');
const cApi = require('./api/courseApi');
const sApi = require('./api/studentApi');
const addApi = require('./api/addApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/student',sApi);
app.use('/api/course', cApi);
app.use('/api/select',selectApi);
app.use('/api/add', addApi);
app.use('/api/delete', deleteApi);
app.use('/api/update', updateApi);
//app.use(app.router);
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');