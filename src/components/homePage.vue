// 登录注册页
<template>

	<div>
		<img src="../assets/logo.png">
		<el-container>
			<el-header class="helloTitle">欢迎来到学生信息管理系统</el-header>
			<el-main>
				<el-row>
					<el-col :span="12" :offset="6">
						<el-input type="text" name="username" v-model="username" placeholder="输入账号" clearable class="input"></el-input>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12" :offset="6">
						<el-input type="password" name="password" v-model="password" placeholder="输入密码" clearable class="input"></el-input>
					</el-col>
				</el-row>
				<!-- 当点击按钮时 -->
				<el-button @click="register" type="primary" class="button">注册</el-button>
				<el-button @click="login" type="primary" class="button">登录</el-button>
			</el-main>
		</el-container>
		
	</div>
</template>

<script>
	import md5 from 'js-md5';//密码加密模块
	import mg from './management';


    export default {
		name: 'home',
		data(){
			return {
				username: '',
				password: ''
			}
		},
		components:{
			mg
		},//注册组件

		computed: {
			md5_pwd() {
				return md5(this.password);//密码加密
			}
		},
		methods: {
			//注册
			register() {
				var username = this.username;
				var password = this.md5_pwd;
				if(username === '' || password === ''){
					this.showErr('账号和密码不可为空');
					return ;
				}

				//console.log(this.md5_pwd);
				//请求路由
				this.$http.post('/api/user/register', {
					username: username,
					password: password,
					user_type: 0
				}).then((res) => {
					//当post成功后，异步回调
					console.log(res.body);//显示返回数据：username,user_type
					if(res.body.code === 202) {
						this.showErr('账号已存在');
					}
					else if(res.body.code === 200) {
							this.showSuccess(res.body.msg);	
							//路由跳转页面
							this.$router.push({path:`/mg/${res.body.msg}`})
					}
				})
			},
			// 登录
			login() {
				var username = this.username;
				var password = this.md5_pwd;

				if(username === '' || password === ''){
					this.showErr('账号和密码不可为空');
					return ;
				}

				this.$http.post('/api/user/login', {
					username: username,
					password: password
				}).then((res) => {
					// this.$router.push({path: `/mg/${res.body.data[0]}`})
					console.log(res.body)
					if(res.body.code === 203) {
						this.showErr('账号不存在')
					}
					else if(res.body.code !== 200) {
						this.showErr(res.body.msg)
					}
					else if(res.body.code === 200) {
						this.$router.push({name:'mg',params:{msg: res.body.data[0]}})
					}
				})
				
			},
			showSuccess(msg) {
				this.$message({
					message: msg,
					type: 'success'
				})
			},
			showErr(msg) {
				this.$message.error(msg);
			}
		}
	}
</script>

<style scoped>
	.button {
		margin-top: 20px;
		background: rgb(53,73, 94);
	}

	.input {
		margin-top: 10px;
	}

	.helloTitle {
		font-weight: bolder;
		font-size: 20px;
	}
</style>

