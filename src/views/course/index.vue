<template>
  <div class="user">
    <!-- 查询表单 -->
    <el-form :model="form" :label-position="right" label-width="80px">
      <div class="left">
        <el-form-item label="课程名称">
          <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button>查询</el-button>
      </div>
      <el-button type="info">十 新建课程</el-button>
    </el-form>
    <el-card>
      <!-- 用户信息列表 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="uid"
          label="Id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="课程名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="img"
          label="价格"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="code"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <el-button type="text" size="small">禁用</el-button>
          <el-button type="text" size="small">分配角色</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      form: {
        name: '',
        // 选中状态
        value: '-1'
      },
      // 选项
      options: [
        {
          value: '-1',
          label: '全部'
        },
        {
          value: '0',
          label: '下架'
        },
        {
          value: '1',
          label: '上架'
        }
      ],
      // 课程信息
      tableData: [
      ]
    }
  },
  methods: {
    handleSizeChange () {
    },
    handleCurrentChange () {}
  }
}
</script>

<style lang="scss" scoped>
  .el-form {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
    }
    .el-button {
      margin: 1px 0 0 20px;
      height: 40px;
    }
  }
  .el-card {
    .el-pagination {
      display: flex;
      align-items: center;
      height: 40px;
      float: right;
    }
  }
</style>
