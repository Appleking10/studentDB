<template>
    <div>
        <el-table
        :data="tData"
        border
        style="width: 100%;margin-top: 20px"
        :default-sort = "{prop: 'dno', order: 'descending'}"
        >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="dno"
                label="院系号"
                width="100"
                sortable>
            </el-table-column>
            <el-table-column
                prop="dept_name"
                label="学院名称"
                width="150">
            </el-table-column>
        </el-table> 
    </div>
</template>
<script>
    export default {
        name: 'depttable',
        props: ['tData'],
        data() {
            return {

            }
        },
        created(){
            console.log(this.tData);
        }
    }
</script>
