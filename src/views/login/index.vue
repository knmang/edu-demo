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
        <el-input v-model="loginInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { login } from '@/services/user'
import qs from 'qs'
import request from '@/utils/request'

export default {
  name: 'Login',
  data () {
    return {
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
      try {
        // 规则校验
        await this.$refs.from.validate()
        // 登录检验
        // const { data } = login(this.loginInfo)
        // console.log(data)
        request({
          method: 'POST',
          url: '/front/user/login',
          data: qs.stringify(this.loginInfo)
        })
      } catch (err) {
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
