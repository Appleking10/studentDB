<template>
	<div>
	<el-container>
		<el-row>
			<el-col :span="20">
				<el-form label-width="80px" :model="form">
							<el-form-item label="课程号码">
								<el-input v-model="form.cno"></el-input>
							</el-form-item>
							<el-form-item label="课程名字">
								<el-input v-model="form.cname"></el-input>
							</el-form-item>
							<el-form-item label="专业号码">
								<el-input v-model="form.spno"></el-input>
							</el-form-item>
							<el-form-item label="学时">
								<el-input v-model="form.lecture"></el-input>
							</el-form-item>
                            <el-form-item label="学分">
								<el-input v-model="form.credit"></el-input>
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
        name: 'addC',
        data() {
            return {
                form: {
                    cno: '',
                    cname: '',
                    spno: '',
                }
            }
        },
        created(){

        },
        methods: {
            onSubmit() {
                if(this.form.lecture ===undefined || 
                this.form.credit == undefined || 
                this.form.cno ==='' || 
                this.form.cname === '' || 
                this.form.spno === '') 
                {
                    this.showErr("数据请填写完整");
                    return ;
                }
                else {
                    this.addCourse();
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
					duration: 6000
				})
			},
            addCourse() {
                this.$http.post('/api/add/addCourse', this.form).then((res) => {
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
<style scoped>

</style>
