<template>
    <div>
        <el-table
        :data="tData"
        border
        style="width: 100%;margin-top: 20px"
        :default-sort = "{prop: 'username', order: 'descending'}"
        >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户名"
                width="150"
                sortable>
            </el-table-column>
            <el-table-column
                prop="user_type"
                label="用户类型"
                width="50">
            </el-table-column>
        </el-table> 
    </div>
</template>
<script>
    export default {
        name: 'utable',
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
