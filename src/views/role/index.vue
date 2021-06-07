<template>
  <div class="user">
    <el-card>
      角色管理
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="address"
          label="添加时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Role',
  data () {
    return {
      userList: [
        {
          name: 'aaa'
        }
      ]
    }
  }
}
</script>
