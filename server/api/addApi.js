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
    console.log(params);
    conn.query(sql,
        [
            params.sno,
            params.sname,
            params.sex,
            params.sbirthday,
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

router.post('/addClass',(req, res) => {
    var sql = $sql.class.add;
    var params = req.body;
    conn.query(sql,[
        params.class_no,
        params.spno,
        params.header
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

router.post('/addSc',(req, res) => {
    var sql = `insert into sc(sno, sname, cno, score) values(?, ?, ?, ?)`;
    var params = req.body;
    var name = '';
    conn.query(`select sname from student where sno = ?`,[params.sno], function(err, result) {
        if(err) {
            console.log(err.sqlMessage);
            res.json({
                code: '5000',
                msg: err.sqlMessage
            })
        }
        if(result) {
            if(result.length === 0) {
                res.json({
                    code: '500',
                    msg: '此学号不存在'
                })
                return ;
            }
            name = result[0].sname;
            console.log(name);
            conn.query(sql,[
                params.sno,
                name,
                params.cno,
                params.score
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
        }
    })

})

router.post('/addDept',(req, res) => {
    var sql = $sql.department.add;
    var params = req.body;
    conn.query(sql,[
        params.dno,
        params.dept_name
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

router.post('/addSpec',(req, res) => {
    var sql = $sql.speciality.add;
    var params = req.body;
    conn.query(sql,[
        params.spno,
        params.dno,
        params.spname
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