<template>
  	<div>
        <el-container>
            <el-row>
                <el-col :span="20">
                    <el-form label-width="80px" :model="form">
                                <el-form-item label="用户名">
                                    <el-input v-model="form.username"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input type="password" v-model="form.password"></el-input>
                                </el-form-item>
                                <el-form-item label="用户类型" >
                                    <el-input v-model="form.user_type" placeholder="0为学生，1为老师，2为管理员"></el-input>
                                </el-form-item>
                                <p class="tips">用户类型说明(0为学生，1为老师，2为管理员)</p>
                    </el-form>
                </el-col>
                <el-col :span="20">
                    <el-button @click="onSubmit" type="primary">提交</el-button>
                </el-col>
            </el-row>
        </el-container>
	</div>  
</template>
<script>
import md5 from 'js-md5';

    export default {
        name: 'addUser',
        data() { 
            return{
                form: {
                    username:'',
                    password: '',
                    user_type: 0
                }
            }
        },
        computed: {
			md5_pwd() {
				return md5(this.form.password);
			}
		},
        methods: {
            onSubmit() {
                if(this.form.username ==='' || 
                this.form.password ==='' || 
                this.form.user_type === '' ) 
                {
                    this.$message({
                        type: 'error',
                        message:"数据请填写完整"
                    });
                    return ;
                }
                else {
                    console.log(this.form);
                    this.addUser(this.form);
                }
            },
            addUser(data) {
                var password = this.md5_pwd;
                this.$http.post('/api/user/register', {
                    username: data.username,
                    password: password,
                    user_type: data.user_type
                }).then((res) => {
					console.log(res.body);
					if(res.body.code === 202) {
						this.$message({
                            showClose: true,
                            type: 'error',
                            message: '账号已存在',
                            duration: 2500
                        })
					}
					else if(res.body.code === 200) {
						this.$message({
                            type: 'success',
                            message: res.body.msg
                        })
					}
				})
            }
        },
    }
</script>
<style scoped>
    .tips{
        color: #AAA;
        font-size: 16px;
    }
</style>
