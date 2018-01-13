<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
			<el-form-item label="删除条件个数">
				<el-input v-model="form.num" placeholder="删除条件个数，最多为2"></el-input>
			</el-form-item>
			<el-form-item label="删除某关键字">
				<el-input v-model="form.key" placeholder="条件，逗号隔开"></el-input>
			</el-form-item>
			<el-form-item label="删除匹配值">
				<el-input v-model="form.value" placeholder="匹配值，逗号隔开"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">删除</el-button>
			</el-form-item>
		</el-form>
    </div>
</template>
<script>
    export default {
        name: 'deleteInput',
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
        methods: {
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
