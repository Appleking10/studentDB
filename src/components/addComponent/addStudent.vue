<template>
	<div>
	<el-container>
		<el-row>
			<el-col :span="20">
				<el-form label-width="80px" :model="form">
					<el-row>
						<el-col :span="12">
							<el-form-item label="学生学号">
								<el-input v-model="form.sno" placeholder="类似3115005139"></el-input>
							</el-form-item>
							<el-form-item label="学生姓名">
								<el-input v-model="form.sname"></el-input>
							</el-form-item>
							<el-form-item label="性别">
								<el-select v-model="form.sex" placeholder="性别">
									<el-option label="男" value="男"></el-option>
									<el-option label="女" value="女"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="出生日期">
								<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.sbirthday" style="width: 100%;"></el-date-picker>
							</el-form-item>
							<el-form-item label="院系号码">
								<el-input v-model="form.dno"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="专业号码">
								<el-input v-model="form.spno"></el-input>
							</el-form-item>
							<el-form-item label="班级编号">
								<el-input v-model="form.class_no"></el-input>
							</el-form-item>
							<el-form-item label="手机号码">
								<el-input v-model="form.phone"></el-input>
							</el-form-item>
							<el-form-item label="地址">
								<el-input v-model="form.address"></el-input>
							</el-form-item>
							<el-form-item label="入学日期">
								<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.enroll_day" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-col>
			<el-col :span="8">
				<el-button @click="onSubmit" type="primary">提交</el-button>
			</el-col>
		</el-row>

		
	</el-container>
	</div>
</template>
<script>
	export default {
		name: 'addS',
		data() {
			return {
				form: {
					sno: '',
					sname: '',
					sex: '',
					dno: '',
					spno: '',
					class_no: '',
					phone: '',
					address: ''
				}
			}
		},
		created() {
		},
		methods: {
			getdno(attrArr, table) {
				this.$http.post('/api/select/selectSth', {
					attrArr: ['dno'],
					table: 'department'
				}).then((res) => {
					console.log(res.body.data)
				})
			},
			onSubmit(){
				if(this.form.sno ==='' || this.form.sname ===''){
					this.showErr('学号、姓名不能为空');
					return ;
				}
				this.addS();
			},
			addS() {
				this.$http.post('/api/add/addStudent', this.form).then((res) => {
					if(res.body.code === 5000) {
						this.showErr(res.body.msg)
					}
					if(res.body.code == 200) {
						this.showSuccess('数据插入成功');
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
				this.$message({
					showClose: true,
					message: msg,
					type: 'error',
					duration: 3000
				})
			}
		}
	}
</script>
<style scoped>

</style>

