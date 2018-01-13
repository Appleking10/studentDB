// 管理页面（主页面），父组件
<template>
    <div>        
        
        <el-container>
            <el-header>
                <el-row>
					<el-col :span="10">
						<h1>学生信息管理系统</h1>
					</el-col>
					<el-col :span="10" class="info">
						<p>您的账号为<span class="username">{{ user.username }}</span>账号类型: <span>{{userMap[user.user_type]}}</span></p>
					</el-col>
					<el-col :span="4">
						<el-button @click="gotoPwd" class="pwd-button">修改密码</el-button>
					</el-col>
				</el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <sideMenu :type="user.user_type"></sideMenu>
                </el-aside>
                <el-main>
					<!-- 教师/管理员查询学生信息 -->
					<searchInput @getform="select" v-if="PipeiS('search', index) && shouldShow" ></searchInput>

					<!-- 修改密码组件 -->
					<changePwd @getform="changePwd" v-if="Pipei('change_password', index)"></changePwd>

					<!-- 查询学生信息组件 -->
					<div v-if="user.user_type === 0 && PipeiS('search', index) && !/course$/.test(index)">
						<el-form :inline="true" label-width="70px" :model="selfForm">
							<el-form-item label="学号">
								<el-input v-model="selfForm.sno" placeholder="请输入您的学号"></el-input>
							</el-form-item>
						</el-form>
						<el-button @click="onSubmit" type="primary" class="sno-commit-btn">提交</el-button>
					</div>
					<!-- 管理员删除学生 -->
					<deleteInput @getform="Delete" v-if="/^delete/.test(index) && user.user_type != 0"></deleteInput>
					<!-- 管理员更新学生信息 -->
					<updateInput @getform="Update" v-if="/^update/.test(index) && user.user_type != 0"></updateInput>

					<!-- 教师/管理员查找全部学生信息 -->
					<el-button type="primary" @click="selectAll" v-if="PipeiS('search_student', index) && PipeiUser(index) && user.user_type != 0">查找全部</el-button>

					<!-- 管理员查找全部用户 -->
					<el-button type="primary" @click="selectSth(['username','user_type'])" v-if="PipeiS('search_student', index) && Pipei('search_user', index)">查找全部用户</el-button>

                    <stable :tData="studentData" v-if="Pipei('search_student', index)"></stable>
					<ctable :tData="courseData" v-if="Pipei('search_course', index)"></ctable>
					<sctable :tData="scData" v-if="Pipei('search_sc', index)"></sctable>
					<classtable :tData="classData" v-if="Pipei('search_class', index)"></classtable>
					<depttable :tData="departmentData" v-if="Pipei('search_department', index)"></depttable>
					<sptable :tData="specialityData" v-if="Pipei('search_speciality', index)"></sptable>
					<utable :tData="userData" v-if="Pipei('search_user', index)"></utable>
					<addS v-if="Pipei('add_student', index)"></addS>
					<addC v-if="Pipei('add_course', index)"></addC>
					<addSc v-if="Pipei('add_sc', index)"></addSc>
					<addClass v-if="Pipei('add_class', index)"></addClass>
					<addDept v-if="Pipei('add_department', index)"></addDept>
					<addSpec v-if="Pipei('add_speciality', index)"></addSpec>
					<addUser v-if="Pipei('add_user', index)"></addUser>
                </el-main>
            </el-container>
        </el-container>
    </div>
    
</template>
<script>
	import deleteInput from './deleteInput';
	import sideMenu from './sideMenu';
	import searchInput from './searchInput';
	import updateInput from './updateInput';
	import addS from './addComponent/addStudent';
	import addC from './addComponent/addCourse';
	import addSc from'./addComponent/addSc';
	import addClass from'./addComponent/addClass';
	import addDept from'./addComponent/addDept';
	import addSpec from './addComponent/addSpec';
	import addUser from './addComponent/addUser';
	import stable from './table/studentTable';
	import ctable from './table/courseTable';
	import sctable from './table/scTable';
	import classtable from './table/classTable';
	import depttable from './table/deptTable';
	import sptable from './table/spTable';
	import utable from './table/userTable';
	import changePwd from './changePwd';
	

    export default {
        name: 'mg',
        props: {
            msg: {
            }
        },
        data() {
            return {
				studentData: [],
				courseData:[],
				scData:[],
				classData:[],
				departmentData:[],
				specialityData:[],
				userData:[],
				deleteData:[],
                index: '',
				clickKey: '',
				table: '',
				user: {},
				userMap: {
					'0' : '学生',
					'1' : '教师',
					'2' : '管理员'
				},
				selfForm:{

				}
            }
        },
        computed:{
			
            shouldShow() {
				if(/course$/.test(this.index)) return true;
				if(!/course$/.test(this.index) && this.user.user_type === 0)	return  false;
				if(this.user.user_type !== 0 ) return true;
			}
        },
        watch: {
            $route(to, from){
				 // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，它们也有一个param 属性
				this.index = to.params.msg;
				// cosole.log(to);
				this.table = this.index.split('_')[1];
				console.log('-----begin-----');
                console.log('table',this.table);
                console.log(to);
                console.log(this.index);
            }
        },
        components:{
            stable,
			sideMenu,
			searchInput,
			addS,
			addC,
			ctable,
			sctable,
			classtable,
			depttable,
			sptable,
			utable,
			addSc,
			addClass,
			addDept,
			addSpec,
			addUser,
			deleteInput,
			updateInput,
			changePwd
		},
        created() {
			this.user = this.msg;
			//如果用户没登录 怎么跳转到home路由
			if(this.user.username == undefined) {
				this.$router.push({path:'/'});
			}
        },
        methods: {
			//判断index是不是search开头，user结尾
			PipeiUser(index) {
				if(/^search.*user$/.test(index)){
					return !/^search.*user$/.test(index);
				}
				return true;
			},
            PipeiS(key, index) {
				if(key==='' && index==='') return ;
				return /^search/.test(index);
			},
			Pipei(key, index) {
				if(key==='' && index==='') return ;
				return key === index;
			},
			// 选择全部
            selectAll() {
                this.$http.post('/api/select/selectAll', {
					table: this.table
                }).then((res) => {
                    this[`${this.table}Data`] = res.body.data;
                    console.log(res.body);
                })
			},
			select(data){ 
				// data为子组件searchInput传给
				if(data.num == 1){
					this.selectBykey(data);
				}
				else if(data.num == 2) {
					this.selectByTwoKey(data);
					console.log('selectBy2');
				}
				console.log(data);

			},
			Delete(data){
				if(data.num == 1) {
					this.$confirm(`此操作将永久删除 ${data.key} = ${data.value} 的数据,是否继续?`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$http.post('/api/delete/deleteBykey', {
							key: data.key,
							value: data.value,
							table: this.table
						}).then((res) => {
							if(res.body.code === 200) {
								console.log(res.body);
								this.$message({
									type: 'success',
									message: res.body.msg
								})
							}
							else {
								this.$message({
									type: 'error',
									message: res.body.msg
								})
							}
						})
					}).catch((err) => {
						console.log(err);
						this.$message({
							type: 'info',
							message: '已取消删除'
						});          
					});
				}
			},
			Update(data) {
				if(data.key===undefined && data.value === undefined) {
					this.updateAll(data)
				}
				else {
					this.updateOnly(data)
				}
			},
			updateOnly(data) {
				this.$http.post('/api/update/updateOnly',{
					attr: data.attr,
					nValue: data.nValue,
					key: data.key,
					value: data.value,
					table: this.table
				}).then((res) => {
					console.log(res.body);
					if(res.body.code === 200) {
						this.$message({
							type: "success",
							message: res.body.msg
						})
					}
					else {
						this.$message({
							type: "error",
							message: res.body.msg
						})
					}
				})
			},
			updateAll(data) {
				this.$http.post('/api/update/updateAll',{
					attr: data.attr,
					nValue: data.nValue,
					table: this.table
				}).then((res) => {
					console.log(res.body);
					if(res.body.code === 200) {
						this.$message({
							type: "success",
							message: res.body.msg
						})
					}
					else {
						this.$message({
							type: "error",
							message: res.body.msg
						})
					}
				})
			},
			selectBykey(form) {
				this.$http.post('/api/select/selectBykey', {
					key: form.key,
					value: form.value,
					table: this.table
				}).then((res) => {
					this[`${this.table}Data`] = res.body.data;
					console.log(res.body);
				})
			},
			selectByTwoKey(form) {
				this.$http.post('/api/select/selectBytwoKey', {
					key1: form.key1,
					key2: form.key2,
					value1: form.value1,
					value2: form.value2,
					table: this.table
				}).then((res) => {
					this[`${this.table}Data`] = res.body.data;
					console.log(res.body);
				})
			},
			selectSth(attrArr){
				this.$http.post('/api/select/selectSth', {
					attrArr: attrArr,
					table: this.table
				}).then((res) => {
					this[`${this.table}Data`] = res.body.data;
					console.log(res.body);
				})
			},
			onSubmit() {
				var data = {
					key: 'sno',
					value: this.selfForm.sno
				}
				this.selectBykey(data)
			},
			gotoPwd() {
				this.$router.push({path: '/mg/change_password'})
			},
			changePwd(data) {
				this.$http.post('/api/user/changePwd',data).then((res) => {
					console.log(res.body);
					if(res.body.code === 200) {
						this.$message({
							type: "success",
							message: res.body.msg
						})
					}
					else {
						this.$message({
							type: "error",
							message: res.body.msg
						})
					}
				})
			}
        }
    }
</script>
<style scoped>
	h1 {
		text-align: left;
	}
	.info {
		margin: 0px auto;
		text-align: right;
	}
    .el-header, .el-footer {
        background-color: rgb(53,73, 94);
        color: #fff;
        text-align: center;
        line-height: 20px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 30px;
        min-height: 300px;
    }
    .el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}
	
	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	.username {
		font-size: 16px;
		font-weight: bolder;
		padding-left: 10px;
		margin-right: 20px;
		color: #409EFF;
	}
	.sno-commit-btn {
		margin: 25px 0;
	}

	.pwd-button {
		line-height: 10px;
		margin-top:10px;
	}

</style>
