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


router.post('/addStudent',(req, res) => {
    var sql = $sql.student.add;
    var params = req.body;
    conn.query(sql,
        [
            params.sno,
            params.sname,
            params.sex,
            params.birthday,
            params.dno,
            params.spno,
            params.class_no,
            params.phone,
            params.address,
            params.enroll_day
        ],function(err, result){
            if(err) {
                console.log(err.sqlMessage);
                res.json({
                    code: 5000,
                    msg: err.sqlMessage
                })
            }
            if(result) {
                jsonWrite(res, result);
            }
        })
})

module.exports = router;