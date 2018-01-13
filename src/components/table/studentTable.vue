<template>
<div>
    <el-table
    :data="tData"
    border
    style="width: 100%;margin-top: 20px0"
    :default-sort = "{prop: 'sno', order: 'descending'}"
    >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="sno"
            label="学号"
            width="120"
            sortable>
        </el-table-column>
        <el-table-column
            prop="sname"
            label="姓名"
            width="80">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="50">
        </el-table-column>
        <el-table-column
            prop="sbirthday"
            label="出生日期"
            width="150">
        </el-table-column>
        <el-table-column
            prop="dno"
            label="院系号"
            width="70">
        </el-table-column>
        <el-table-column
            prop="spno"
            label="专业号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="class_no"
            label="班级号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机"
            width="150">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="200">
        </el-table-column>
        <el-table-column
            prop="enroll_day"
            label="入学时间"
            width="150">
        </el-table-column>
    </el-table> 
</div>
</template>
<script>

    export default {
        name: 'stable',
        props: ['tData'],
        data(){
            return {

            }
        },
        created(){
            console.log(this.tData);
        },
        methods: {
            handleEdit(idx, row) {
                console.log('idx is',idx);
                console.log('row is', row);
            }
        }
    }
</script>
