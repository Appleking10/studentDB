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

router.post('/selectAll',(req, res) => {
    var params = req.body;
    var sql = `SELECT * from ${params.table}`
    conn.query(sql, function(err, result) {
        if(err) {
            console.log(err);
            res.send(500,{error: '出错: '+err.sqlMessage});
        }
        if(result) {
            jsonWrite(res, result);
        }
    })
})

router.post('/selectBykey',(req, res) => {
    var params = req.body;
    var sql = `SELECT * from ${params.table} where ${params.key} = ?`
    conn.query(sql,params.value,function(err, result) {
        if(err) {
            console.log(err);
        }
        if(result) {
            jsonWrite(res, result);
        }
    })
})

router.post('/selectBytwoKey',(req, res) => {
    var params = req.body;
    var sql = `SELECT * from ${params.table} where ${params.key1} = ? and ${params.key2} = ?`
    conn.query(sql,[params.value1,params.value2],function(err, result) {
        if(err) {
            console.log(err);
        }
        if(result) {
            jsonWrite(res, result);
        }
    })
})

router.post('/selectSth',(req, res) => {
    var params = req.body;
    var idx = params.attrArr.length;
    var attr = params.attrArr[0];
    console.log(attr, idx);
    for(var j = 1; j < idx; j++){
        if(j === idx-1) {
            attr = attr+','+params.attrArr[j];
        }
        else {
            attr = attr+','+params.attrArr[j]+',';
        }
        
    }
    console.log(attr);
    conn.query(`SELECT ${attr} from ${params.table}`, function(err, result) {
        if(err) {
            console.log(err);
            
        }
        if(result) {
            jsonWrite(res, result);
        }
    })
})

module.exports = router;