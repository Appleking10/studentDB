<template>
  	<div>
	<el-container>
		<el-row>
			<el-col :span="20">
				<el-form label-width="80px" :model="form">
							<el-form-item label="学号">
								<el-input v-model="form.sno"></el-input>
							</el-form-item>
							<el-form-item label="课程号">
								<el-input v-model="form.cno"></el-input>
							</el-form-item>
							<el-form-item label="成绩">
								<el-input v-model="form.score"></el-input>
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
        name: 'addSc',
        data() {
            return {
                form: {
                    sno: '',
                    cno: '',
                    score: ''
                }
            }
        },
        methods: {
            onSubmit() {
                if(this.form.sno ==='' || 
                this.form.cno ==='' || 
                this.form.score === '' ) 
                {
                    this.showErr("数据请填写完整");
                    return ;
                }
                else {
                    this.addSc();
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
            addSc() {
                this.$http.post('/api/add/addsc',this.form).then((res) => {
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
