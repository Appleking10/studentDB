<template>
    <div>
        <el-table
        :data="tData"
        border
        style="width: 100%;margin-top: 20px"
        :default-sort = "{prop: 'class_no', order: 'descending'}"
        >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="class_no"
                label="班级号"
                width="100"
                sortable>
            </el-table-column>
            <el-table-column
                prop="header"
                label="班长"
                width="80">
            </el-table-column>
            <el-table-column
                prop="spno"
                label="专业号"
                width="80">
            </el-table-column>
        </el-table> 
    </div>
</template>
<script>
    export default {
        name: 'classtable',
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
