// 查找组件：查询条件+查询关键字+匹配值
<template>
	<div>
		<el-form :inline="true" :model="form" class="demo-form-inline">
			<el-form-item label="查询条件个数">
				<el-input v-model="form.num" placeholder="查询条件个数，最多为2"></el-input>
			</el-form-item>
			<el-form-item label="查询关键字">
				<el-input v-model="form.key" placeholder="查询的关键字，逗号隔开"></el-input>
			</el-form-item>
			<el-form-item label="匹配值">
				<el-input v-model="form.value" placeholder="匹配值，逗号隔开"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
    export default {
		name: 'searchInput',
		data() {
			return {
				form: {
					key: '',
					value: '',
					num: 1
				}
			}
		},
		created() {

		},
		methods:{
			onSubmit() {
				var keyArr = this.form.key.split(',');
				var valueArr =  this.form.value.split(',');
				var formArr = {
					key1: keyArr[0],
					key2: keyArr[1],
					value1: valueArr[0],
					value2: valueArr[1],
					num: this.form.num
				}
				console.log(formArr);
				//对输入为空的处理
				if(this.form.key==='' || this.form.value ==='') {
					this.showErr('输入不能为空');
					return ;
				}
				//说明只输入了一个查询条件，只传一个
				if(this.form.num == 1) {
					this.$emit('getform',this.form);
				}
				else{
					this.$emit('getform',formArr)
				}
				//emit  把子组件的数据传给父组件
				
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
		},
	}
</script>

<style scoped>

</style>

