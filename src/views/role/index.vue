<template>
  <div class="user">
    <el-card>
      <div slot="header">
        <div class="head">
          <span>筛选操作</span>
          <div>
            <el-button @click="check.name = ''">重置</el-button>
            <el-button type="info" @click="onCheck">查询搜索</el-button>
          </div>
        </div>
        <el-form label-position="right" style="margin-left:50px">
          <el-form-item label="输入名称:">
            <el-input style="width: 200px" placeholder="角色名称" v-model="check.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button style="margin-bottom: 30px" @click="onhandAdd">添加角色</el-button>
      </div>
      <el-table
        :data="roleList"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditClick(scope.row)">分配菜单</el-button>
            <el-button type="text" size="small" @click="handleEditClick(scope.row)">分配资源</el-button>
            <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleEditClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="50%"
      @success="onhandleSuccess"
      @cancel="onhandleCancel">
      <create-or-edit></create-or-edit>
    </el-dialog>
  </div>
</template>

<script>
import { getAllRole, getRolePages } from '@/services/role'
import CreateOrEdit from './components/createOrEdit.vue'

export default {
  name: 'Role',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      // 角色数据列表
      roleList: [],
      // 查询条件
      check: {
        name: ''
      },
      // 控制对话框显示
      dialogVisible: false
    }
  },
  methods: {
    // 取消操作
    onhandleCancel () {
      this.dialogVisible = false
    },
    // 添加成功
    onhandleSuccess () {
      this.dialogVisible = false
      // 刷新列表
      this.loadAllRole()
    },
    // 添加角色
    onhandAdd () {
      this.dialogVisible = true
    },
    // 查询操作
    async onCheck () {
      const { data } = await getRolePages(this.check)
      if (data.code === '000000') {
        this.roleList = data.data.records
        this.roleList.reverse()
      }
    },
    // 加载所有角色
    async loadAllRole () {
      const { data } = await getAllRole()
      if (data.code === '000000') {
        this.roleList = data.data
        this.roleList.reverse()
      }
    }
  },
  created () {
    this.loadAllRole()
  }
}
</script>

<style lang="scss" scoped>
  .head {
    display: flex;
    justify-content: space-between;
  }
</style>
