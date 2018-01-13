// 修改密码组件
<template>
    <el-container>
        <el-form :inline="true" :model="form" class="demo-form-inline">
			<el-form-item label="用户名">
				<el-input v-model="form.username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item label="旧密码">
				<el-input v-model="form.oldPassword" placeholder="旧密码" type="password"></el-input>
			</el-form-item>
			<el-form-item label="新密码">
				<el-input v-model="form.newPassword" placeholder="新密码" type="password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">修改</el-button>
			</el-form-item>
		</el-form>
    </el-container>
</template>
<script>
import md5 from 'js-md5';
    export default {
        name: 'changePwd',
        data() {
            return {
                form: {
                    username: '',
                    oldPassword: '',
                    newPassword: ''
                }
            }
        },

        methods: {
            onSubmit() {
                var oldPassword = this.md5_pwd(this.form.oldPassword);
                var newPassword = this.md5_pwd(this.form.newPassword);

                var data = {
                    username: this.form.username,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }
                if(this.form.username === '' ||
                this.form.oldPassword === ''||
                this.form.newPassword === '')
                {
                    this.$message({
                        type:"error",
                        message: '输入不能为空'
                    })
                }
                else {
                    this.$emit('getform',data)
                }
            },
            md5_pwd(pwd) {
				return md5(pwd);
			}
            
            
        }
    }
</script>
<style scoped>

</style>

