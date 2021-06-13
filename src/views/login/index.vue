<template>
  <div class="login">
    <el-form label-position="top" label-width="80px" :model="loginInfo"
      ref="from"
      :rules="rules"
    >
      <h2>登录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="loginInfo.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginInfo.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="isLock">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/services/user'

export default {
  name: 'Login',
  data () {
    return {
      // 登录锁
      isLock: false,
      // 用户登录数据
      loginInfo: {
        phone: '18201288771',
        password: '111111'
      },
      // 表单校验规则
      rules: {
        phone: [
          { request: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        password: [
          { request: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录按钮
    async onSubmit () {
      this.isLock = true
      try {
        // 规则校验
        await this.$refs.from.validate()
        // 登录检验
        const { data } = await login(this.loginInfo)
        this.isLock = false
        if (data.state === 1) {
          this.$message.success('登录成功')
          // 存储用户信息到VUEX
          this.$store.commit('saveUser', data.content)
          // 跳转到上次停留页面，没有跳回主页
          this.$router.push(this.$route.query.fullpath || '/')
        } else {
          this.$message.error('登录失败')
        }
      } catch (err) {
        this.isLock = false
        this.$message('输入的手机号与密码不正确')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    .el-form {
      background-color: #fff;
      padding: 20px;
      width: 300px;
      .el-button {
        width: 100%;
      }
    }
  }
</style>
