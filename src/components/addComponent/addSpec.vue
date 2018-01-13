<template>
  	<div>
	<el-container>
		<el-row>
			<el-col :span="20">
				<el-form label-width="80px" :model="form">
                            <el-form-item label="专业号">
								<el-input v-model="form.spno"></el-input>
							</el-form-item>
							<el-form-item label="院系号">
								<el-input v-model="form.dno"></el-input>
							</el-form-item>
							<el-form-item label="专业名称">
								<el-input v-model="form.spname"></el-input>
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
        name: 'addSpec',
        data() {
            return {
                form: {
                    spno:'',
                    dno: '',
                    spname: '',
                }
            }
        },
        methods: {
            onSubmit() {
                if(
                this.form.spno ==='' ||
                this.form.dno ==='' || 
                this.form.spname ==='') 
                {
                    this.showErr("数据请填写完整");
                    return ;
                }
                if(!/^.{6}$/.test(this.form.spno) ||
                !/^.{6}$/.test(this.form.dno)){
                    this.showErr("spno& dno 为6位字符串");
                }
                else {
                    this.addSpec();
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
            addSpec() {
                this.$http.post('/api/add/addSpec',this.form).then((res) => {
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
