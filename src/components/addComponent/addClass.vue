<template>
  	<div>
	<el-container>
		<el-row>
			<el-col :span="20">
				<el-form label-width="80px" :model="form">
							<el-form-item label="班级号">
								<el-input v-model="form.class_no"></el-input>
							</el-form-item>
							<el-form-item label="专业号">
								<el-input v-model="form.spno"></el-input>
							</el-form-item>
							<el-form-item label="header">
								<el-input v-model="form.header"></el-input>
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
        name: 'addClass',
        data() {
            return {
                form: {
                    class_no: '',
                    spno: '',
                    header: ''
                }
            }
        },
        methods: {
            onSubmit() {
                if(this.form.class_no ==='' || 
                this.form.spno ==='' || 
                this.form.header === '' ) 
                {
                    this.showErr("数据请填写完整");
                    return ;
                }
                else {
                    this.addClass();
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
            addClass() {
                this.$http.post('/api/add/addClass',this.form).then((res) => {
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
