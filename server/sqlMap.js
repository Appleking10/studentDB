// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(username, password, user_type) values (?, ?, ?)',
        select_name: 'SELECT * from user where username = ?',  //查询用户名
        select_password: 'SELECT username,user_type from user where username = ? and password = ?' //查询用户密码
    },
    student: {

        add: 'insert into student(sno, sname, sex, sbirthday, dno, spno, class_no, phone, address, enroll_day) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
        delete: 'DELETE FROM student where ? = ?',
        select_all: 'SELECT * from student where sno = ?'
    },
    department: {
        add: 'insert into department(dno, dept_name) values (?, ?)',
        delete: 'DELETE FROM department where ? = ?'
    },
    speciality: {
        add: 'insert into speciality(spno, dno, spname) values (?, ?, ?)',
        delete: 'DELETE FROM speciality where ? = ?'
    },
    course: {
        add: 'insert into course(cno, cname, spno, lecture, credit) values (?, ?, ?, ?, ?)',
        select_info: 'SELECT * from student where sno = ?',
        select_score: 'SELECT sno,score from sc,student where student.sno = ? and sc.sno = student.sno ',
        select_course: 'SELECT * from sc where sno = ?'
    },
    class: {
        add: 'insert into class(class_no, spno, header) values (?, ?, ?)',
        delete: 'DELETE FROM class where ? = ?'
    },
    sc: {
        add: 'insert into sc(sno, sname, cno, score) values(?, ?, ?, ?)',
        delete: 'DELETE FROM sc where sno = ? and cno = ?'
    }

}

module.exports = sqlMap;