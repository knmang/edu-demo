<template>
  <div class="user">
    <!-- 查询表单 -->
    <el-form :model="form" :rules="rule">
      <el-form-item label="手机号" prop="phone" >
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="form.createTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-button>查询</el-button>
    </el-form>
    <el-card>
      <!-- 用户信息列表 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="uid"
          label="用户id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="img"
          label="头像"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
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
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 50]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      form: {
        phone: '',
        createTime: ''
      },
      tableData: [
      ],
      // 时间快捷选项
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 规则校验
      rule: {
        phone: [
          { request: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '请输入正确手机号', trigger: 'blur' }
        ]
      },
      // 页数
      currentPage: 1
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
    align-items: center;
    .el-form-item {
      margin-right: 20px;
    }
    .el-button {
      margin-top: 19px;
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
