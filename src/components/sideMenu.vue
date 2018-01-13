// 侧边菜单栏
<template>
<div>
	<el-menu
	default-active="1"
	class="el-menu-vertical-demo"
	@select="handleSelect"
	background-color="#545c64"
	text-color="#fff"
	router
	active-text-color="#ffd04b">
	<el-submenu index="1">
		<template slot="title">
		<i class="el-icon-setting"></i>
		<span>学生管理</span>
		</template>
		<el-menu-item index="add_student" v-if="userType === 2">新增学生</el-menu-item>
		<el-menu-item index="search_student" >查询学生信息</el-menu-item>
		<el-menu-item index="update_student" v-if="userType === 2">修改学生信息</el-menu-item>
        <el-menu-item index="delete_student" v-if="userType === 2">删除学生</el-menu-item>
	</el-submenu>
	<el-submenu index="2">
		<template slot="title">
			<i class="el-icon-setting"></i>
			<span slot="title">课程管理</span>
		</template>
		<el-menu-item index="add_course" v-if="userType !== 0">增加课程</el-menu-item>
		<el-menu-item index="search_course">查找课程</el-menu-item>
		<el-menu-item index="update_course" v-if="userType !== 0">修改课程信息</el-menu-item>
		<el-menu-item index="delete_course" v-if="userType === 2">删除课程信息</el-menu-item>
	</el-submenu>
	<el-submenu index="3">
		<template slot="title">
			<i class="el-icon-setting"></i>
			<span slot="title">成绩管理</span>
		</template>
		<el-menu-item index="add_sc" v-if="userType !== 0">增加成绩</el-menu-item>
		<el-menu-item index="search_sc">查找成绩</el-menu-item>
		<el-menu-item index="update_sc" v-if="userType !== 0">修改成绩</el-menu-item>
		<el-menu-item index="delete_sc" v-if="userType === 2">删除成绩</el-menu-item>
	</el-submenu>
	<el-submenu index="4" v-if="userType === 2">
		<template slot="title">
			<i class="el-icon-setting"></i>
			<span slot="title">班级管理</span>
		</template>
		<el-menu-item index="add_class" v-if="userType !== 0">增加班级</el-menu-item>
		<el-menu-item index="search_class">查看班级</el-menu-item>
		<el-menu-item index="update_class" v-if="userType !== 0">修改班级信息</el-menu-item>
		<el-menu-item index="delete_class" v-if="userType === 2">删除班级</el-menu-item>
	</el-submenu>
	<el-submenu index="5" v-if="userType === 2">
		<template slot="title">
			<i class="el-icon-setting"></i>
			<span slot="title">系别管理</span>
		</template>
		<el-menu-item index="add_department" v-if="userType !== 0">增加系别</el-menu-item>
		<el-menu-item index="search_department">查看系别</el-menu-item>
		<el-menu-item index="update_department" v-if="userType !== 0">修改系别信息</el-menu-item>
		<el-menu-item index="delete_department" v-if="userType === 2">删除系别</el-menu-item>
	</el-submenu>
	<el-submenu index="6" v-if="userType !== 0">
		<template slot="title">
			<i class="el-icon-setting"></i>
			<span slot="title">专业管理</span>
		</template>
		<el-menu-item index="add_speciality" v-if="userType === 2">增加专业</el-menu-item>
		<el-menu-item index="search_speciality">查看专业</el-menu-item>
		<el-menu-item index="update_speciality" v-if="userType === 2">修改专业信息</el-menu-item>
		<el-menu-item index="delete_speciality" v-if="userType === 2">删除专业</el-menu-item>
	</el-submenu>
	<el-submenu index="7" v-if="userType === 2">
		<template slot="title">
			<i class="el-icon-setting"></i>
			<span slot="title">用户管理</span>
		</template>
		<el-menu-item index="add_user" v-if="userType !== 0">增加用户</el-menu-item>
		<el-menu-item index="search_user">查看用户</el-menu-item>
		<el-menu-item index="update_user" v-if="userType !== 0">修改用户</el-menu-item>
		<el-menu-item index="delete_user" v-if="userType === 2">删除用户</el-menu-item>
	</el-submenu>

	</el-menu>
</div>
 	
</template>
<script>
	export default {
        name: 'sideMenu',
        props:['type'],
		data() {
			return {
                userType: ''
			}
		},
		methods: {
			handleSelect(key) {
                console.log(key);
            }
        },
        created() {
            this.userType = this.type;
            //console.log(typeof(this.userType));
        }
	}
</script>
