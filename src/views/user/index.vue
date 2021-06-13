<template>
  <div class="user">
    <!-- 查询表单 -->
    <el-form :model="form" :rules="rule">
      <el-form-item label="手机号" prop="phone" >
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="createTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-button @click="onSeek">查询</el-button>
    </el-form>
    <el-card>
      <!-- 用户信息列表 -->
      <el-table
        :data="tableData">
        <el-table-column
          prop="id"
          label="用户id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名称">
        </el-table-column>
        <el-table-column
          prop="portrait"
          label="头像">
          <el-avatar icon="el-icon-user-solid" :src='form.portrait'></el-avatar>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="注册时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | changeData }}
            </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small" @click="onAssimtRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 分配框 -->
      <el-dialog
        title="分配角色"
        :visible.sync="dialogVisible"
        width="30%">
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSuber">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getAllUserInfo } from '@/services/user'
import { getAllRoleById, allocateUserRoles } from '@/services/role'

export default {
  name: 'User',
  data () {
    return {
      // 分配角色选项
      options: [
      ],
      // 记录已分配角色
      roleIdList: [],
      // 点击的用户id
      userId: '',
      // 查询条件
      form: {
        // 页数
        currentPage: 1,
        // 条数
        pageSize: 20,
        phone: '',
        userId: 0,
        startCreateTime: '',
        endCreateTime: ''
      },
      // 总条数
      total: 0,
      // 查询注册时间
      createTime: '',
      // 分配框显示控制
      dialogVisible: false,
      // 用户信息
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
      }
    }
  },
  methods: {
    // 提交分配角色
    async onSuber () {
      const { data } = await allocateUserRoles({
        userId: this.userId,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('分配成功')
      }
      this.dialogVisible = false
    },
    // 分配角色
    onAssimtRole (userInfo) {
      this.userId = userInfo.id
      // 清空已有角色存储
      this.roleIdList = []
      this.loadAllRoleInfo(this.userId)
      this.dialogVisible = true
    },
    // 加载所有角色
    async loadAllRoleInfo (uid) {
      const { data } = await getAllRoleById(uid)
      if (data.code === '000000') {
        this.options = data.data
        // 存储用户已有的角色
        data.data.map((i) => {
          if (i.hasPermission) {
            this.roleIdList.push(i.id)
          }
        })
      }
    },
    // 查询操作
    onSeek () {
      this.form.startCreateTime = this.createTime[0]
      this.form.endCreateTime = this.createTime[1]
      this.form.currentPage = 1
      this.loadAllUserInfo()
      this.createTime = ''
    },
    // 加载所有用户信息
    async loadAllUserInfo () {
      const { data } = await getAllUserInfo(this.form)
      if (data.code === '000000') {
        this.total = data.data.total
        this.tableData = data.data.records
      }
    },
    // 查询条数变更时操作
    handleSizeChange (val) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadAllUserInfo()
    },
    // 页数变更时操作
    handleCurrentChange (val) {
      this.form.currentPage = val
      this.loadAllUserInfo()
    }
  },
  created () {
    this.loadAllUserInfo()
  },
  filters: {
    // 时间转换 yyyy-mm-dd
    changeData (createTime) {
      const date = new Date(createTime)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let date1 = date.getDate()
      let hour = date.getHours()
      let minutes = date.getMinutes()
      let second = date.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (date1 < 10) {
        date1 = '0' + date1
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (second < 10) {
        second = '0' + second
      }
      return `${year}-${month}-${date1} ${hour}:${minutes}:${second}`
    }
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
