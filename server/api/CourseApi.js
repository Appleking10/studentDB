var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json({
            code: 200, 
            data: ret, 
            msg: 'success'
        });
    }
};

router.post('/addCourse',(req, res) => {
    var sql = $sql.course.add;
    var params = req.body;
    conn.query(sql,[
        params.cno,
        params.cname,
        params.spno,
        params.lecture,
        params.credit
    ],function(err, result) {
        if(err) {
            console.log(err.sqlMessage);
            res.json({
                code: '5000',
                msg: err.sqlMessage
            })
        }
        if(result) {
            jsonWrite(res, result);
        }
    })
})




module.exports = router;