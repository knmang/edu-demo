<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <app-aside></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <app-header></app-header>
        </el-header>
        <el-main>
          <!-- 主要内容路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入侧边栏组件
import appAside from './components/appAside'
// 引入头部组件
import appHeader from './components/appHeader'

export default {
  name: 'Layout',
  components: {
    appAside,
    appHeader
  }
}
</script>

<style lang="scss" scoped>
 .el-container {
   height: 100vh;
 }

 .el-aside {
   background-color: rgb(84, 92, 100);
 }
 .el-header {
   background-color: #fff;
 }
</style>
