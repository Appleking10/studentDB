<template>
    <div>
        <el-row>
            <el-col :span="10" :offset="6">
                <el-form :model="form" class="demo-form-inline">
                    <el-form-item label="需要更新的属性列">
                        <el-input v-model="form.attr" placeholder="属性列的名字"></el-input>
                    </el-form-item>
                    <el-form-item label="更新的新值">
                        <el-input v-model="form.nValue" placeholder="新值"></el-input>
                    </el-form-item>
                    <el-form-item label="查询条件">
                        <el-input v-model="form.key" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="条件匹配值">
                        <el-input v-model="form.value" placeholder="匹配值"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="6">
                <p class="tips"><span style="color: red;">提示：</span>如果想更新此表的全部数据的某个属性列，则不用写查询条件和匹配值</p>
            </el-col>
        </el-row>

	</div>
</template>
<script>
    export default {
        name: 'updateInput',
        data() {
            return {
                form: {
                    attr: '', //需要更新的属性列
                    nValue: '', //新的值
                    key: '', //where 条件
                    value: ''   //与条件匹配的值
                }
            }
        },
        methods: {
            onSubmit() {
                var data = {
                    attr: this.form.attr,
                    nValue: this.form.nValue
                }
                if(this.form.attr === ''|| this.form.nValue ==='') {
                    this.$message({
                        type: "error",
                        message: "请输入值"
                    })
                    return ;
                }
                if(this.form.key ==='' && this.form.value === '') {
                    console.log('data', data);
                    this.$emit('getform',data);
                }
                if(this.form.key.length >0 && this.form.value.length > 0) {
                    console.log('data', this.form);
                    this.$emit('getform',this.form);
                }
            },

        }
    }
</script>
<style scoped>
    .tips {
        color: #AAA;
        font-size: 15px;
    }
</style>
