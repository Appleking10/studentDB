<template>
    <div>
        <el-table
        :data="tData"
        border
        style="width: 100%;margin-top: 20px"
        :default-sort = "{prop: 'spno', order: 'descending'}"
        >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="spno"
                label="专业号"
                width="100"
                sortable>
            </el-table-column>
            <el-table-column
                prop="dno"
                label="院系号码"
                width="150">
            </el-table-column>
            <el-table-column
                prop="spname"
                label="专业名称"
                width="150">
            </el-table-column>
        </el-table> 
    </div>
</template>
<script>
    export default {
        name: 'sptable',
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
