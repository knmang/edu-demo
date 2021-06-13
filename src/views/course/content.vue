<template>
  <div class="courseContent">
    <div class="hearder">
      <el-page-header @back="$router.push({ name: 'course' })" content="详情页面">
      </el-page-header>
      <el-button type="info">+添加阶段</el-button>
    </div>
    <el-card>
      <el-tree :data="form" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-card>
  </div>
</template>

<script>
import { getCourseContent } from '@/services/course'

export default {
  name: 'CourseContent',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      form: [],
      defaultProps: ''
    }
  },
  methods: {
    async loadCourseContent () {
      const { data } = await getCourseContent(this.courseId)
      console.log(data)
    },
    handleNodeClick () {}
  },
  created () {
    this.loadCourseContent()
  }
}
</script>

<style lang="scss" scoped>
.courseContent {
  .hearder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
