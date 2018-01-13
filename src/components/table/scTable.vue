<template>
<div>
    <el-table
    :data="tData"
    border
    style="width: 100%;margin-top: 20px">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="sno"
            label="学号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="姓名"
            width="50">
        </el-table-column>
        <el-table-column
            prop="cno"
            label="课程编号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="score"
            label="分数"
            width="80">
        </el-table-column>
    </el-table> 
</div>
</template>
<script>

    export default {
        name: 'sctable',
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
