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

router.post('/updateAll',(req, res) => {
    /*
    params: {
        attr: '..',  //需要更新的属性列
        table: '..', //tablename
        newValue: '..' // new Value
    }
    */
    var params = req.body;
    var sql = `UPDATE ${params.table} SET ${params.attr} = ?`;
    conn.query(sql, [params.nValue],function(err, result){
        if(err) {
            console.log(err.sqlMessage);
            res.json({
                code: 300,
                msg: err.sqlMessage
            })
        }
        if(result) {
            if(result.affectedRows > 0){
                res.json({
                    code: 200,
                    data: result,
                    msg: '更新成功'
                })
            }
            else {
                res.json({
                    code: 301,
                    msg: '没有变化'
                })
            }
            
        }
    })
})

router.post('/updateOnly',(req, res) => {
    /*
    params: {
        attr: '..' //需要更新的属性列
        table: '..', //tablename
        nValue: '..' // new Value
        key: '',
        value: '',
    }
    */
    var params = req.body;
    var sql = `UPDATE ${params.table} SET ${params.attr} = ? where ${params.key} = ?`;
    conn.query(sql, [params.nValue, params.value], function(err, result) {
        if(err) {
            console.log(err.sqlMessage);
            res.json({
                code: 300,
                msg: err.sqlMessage
            })
        }
        if(result) {
            if(result.affectedRows > 0) {
                res.json({
                    code: 200,
                    data: result,
                    msg: '更新成功'
                })
            }
            else {
                res.json({
                    code: 301,
                    msg: '没有变化'
                })
            }
        }
    })
})
module.exports = router;