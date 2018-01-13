<template>
  	<div>
	<el-container>
		<el-row>
			<el-col :span="20">
				<el-form label-width="80px" :model="form">
							<el-form-item label="院系号">
								<el-input v-model="form.dno"></el-input>
							</el-form-item>
							<el-form-item label="院系名称">
								<el-input v-model="form.dept_name"></el-input>
							</el-form-item>
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
    export default {
        name: 'addDept',
        data() {
            return {
                form: {
                    dno: '',
                    dept_name: '',
                }
            }
        },
        methods: {
            onSubmit() {
                if(this.form.dno ==='' || 
                this.form.dept_name ==='') 
                {
                    this.showErr("数据请填写完整");
                    return ;
                }
                if( !/^.{6}$/.test(this.form.dno)){
                    this.showErr("dno 为6位字符串");
                    return ;
                }
                if(!/学院$/.test(this.form.dept_name)){
                    this.showErr("名字格式为：'某某学院'");
                    return ;
                }
                else {
                    this.addDept();
                }
            },
            showSuccess(msg) {
				this.$message({
					message: msg,
					type: 'success'
				})
			},
			showErr(msg) {
				this.$message({
					showClose: true,
					message: msg,
					type: 'error',
					duration: 3000
				})
            },
            addDept() {
                this.$http.post('/api/add/addDept',this.form).then((res) => {
                    if(res.body.code === 200) {
                        this.showSuccess("添加成功");
                    }
                    else{
                        this.showErr(res.body.msg)
                    }
                })
            }
        }

    }
</script>
