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

router.post('/deleteBykey', (req, res) => {
    var params = req.body;
    var sql = `DELETE FROM ${params.table} where ${params.key} = ?`;
    conn.query(sql, [params.value], function(err, result) {
        if(err) {
            res.json({
                code: 3000,
                msg: err.sqlMessage
            })
        }
        if(result) {
            if(result.affectedRows>0){
                res.json({
                    code: 200,
                    data: result,
                    msg: '删除成功'
                })
            }
            if(result.affectedRows ===0){
                res.json({
                    code: 200,
                    data: result,
                    msg: '操作没有影响，删除的数据原本就不存在~'
                })
            }
            
        }
    })
})

router.post('/selectBytwoKey',(req, res) => {
    var params = req.body;
    var sql = `DELETE FROM ${params.table} where ${params.key1} = ? and ${params.key2} = ?`
    conn.query(sql,[params.value1,params.value2],function(err, result) {
        if(err) {
            res.json({
                code: 3000,
                msg: err.sqlMessage
            })
        }
        if(result) {
            res.json({
                code: 200,
                data: result,
                msg: '删除成功'
            })
        }
    })
})
module.exports = router;