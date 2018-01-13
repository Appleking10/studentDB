<template>
<div>
    <el-table
    :data="tData"
    border
    style="width: 100%;margin-top: 20px"
    :default-sort = "{prop: 'cno', order: 'descending'}"
    >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="cno"
            label="课程号"
            width="100"
            sortable>
        </el-table-column>
        <el-table-column
            prop="cname"
            label="课程名字"
            width="80">
        </el-table-column>
        <el-table-column
            prop="spno"
            label="专业号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="lecture"
            label="学时"
            width="50">
        </el-table-column>
        <el-table-column
            prop="credit"
            label="学分"
            width="50">
        </el-table-column>
    </el-table> 
</div>
</template>
<script>

    export default {
        name: 'ctable',
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
