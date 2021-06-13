<template>
  <div class="user">
    <!-- 查询表单 -->
    <el-form :model="form" label-position="right" label-width="80px">
      <div class="left">
        <el-form-item label="课程名称">
          <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button @click="onCheckCourseInfo">查询</el-button>
      </div>
      <el-button type="info"
      @click="$router.push({
        name: 'courseCreate'
      })"
      >十 新建课程</el-button>
    </el-form>
    <el-card>
      <!-- 用户信息列表 -->
      <el-table
        :data="tableData">
        <el-table-column
          prop="id"
          label="Id">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
          <template slot-scope="scope">
            ￥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value= "1"
              :inactive-value= "0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250px">
          <template slot-scope="scope">
            <el-button size="small" @click="onChangeStatus(scope.row)"
              v-if="scope.row.status" type="danger" :disabled="isStatusLock"
            >下架</el-button>
            <el-button size="small" @click="onChangeStatus(scope.row)"
              v-else type="success" :disabled="isStatusLock"
            >上架</el-button>
            <el-button size="small" @click="onEdit(scope.row)">编辑</el-button>
            <el-button size="small" @click="onContent(scope.row)">内容管理</el-button>
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
    </el-card>
  </div>
</template>

<script>
import { getQueryCourses, changeStatus } from '@/services/course'

export default {
  name: 'User',
  data () {
    return {
      form: {
        currentPage: 1,
        pageSize: 20,
        courseName: '',
        status: ''
      },
      // 总条数
      total: 0,
      // 状态变更锁
      isStatusLock: false,
      // 选项
      options: [
        {
          value: '',
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
    // 课程内容编辑
    onEdit () {
    },
    // 课程内容管理
    onContent (courseInfo) {
      this.$router.push({
        name: 'courseContent',
        params: {
          courseId: courseInfo.id
        }
      })
    },
    // 课程信息查询
    onCheckCourseInfo () {
      this.loadCoursesInfo()
    },
    // 上下架操作
    async onChangeStatus (courseInfo) {
      this.isStatusLock = true
      const { data } = await changeStatus({
        courseId: courseInfo.id,
        status: courseInfo.status === 0 ? '1' : '0'
      })
      if (data.code === '000000') {
        this.$message.success(`${courseInfo.status ? '上架' : '下架'}成功`)
        this.loadCoursesInfo()
        this.isStatusLock = false
      }
    },
    // 查询条数变更时操作
    handleSizeChange (val) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadCoursesInfo()
    },
    // 页数变更时操作
    handleCurrentChange (val) {
      this.form.currentPage = val
      this.loadCoursesInfo()
    },
    // 加载分页课程信息
    async loadCoursesInfo () {
      const { data } = await getQueryCourses(this.form)
      if (data.code === '000000') {
        this.total = data.data.total
        this.tableData = data.data.records
      }
    }
  },
  created () {
    this.loadCoursesInfo()
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
