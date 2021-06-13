<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="roleInfo">
      <el-form-item label="角色名称：">
        <el-input v-model="roleInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码：">
        <el-input v-model="roleInfo.code"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input
          type="textarea"
          :rows="5"
          v-model="roleInfo.description">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onhandleCreate">确 定</el-button>
    </span>
  </div>
</template>

<script>
import { saveOrUpdateRole } from '@/services/role'

export default {
  name: 'CreateOrEdit',
  data () {
    return {
      roleInfo: {
        code: '',
        name: '',
        description: ''
      }
    }
  },
  methods: {
    // 添加角色操作
    async onhandleCreate () {
      const { data } = await saveOrUpdateRole(this.roleInfo)
      if (data.code === '000000') {
        // 给父组件成功提示
        this.$emit('success')
        this.$message.success('添加成功')
        // 清空数组
        this.roleInfo = {}
      }
    },
    // 取消操作
    onCancel () {
      this.$emit('cancel')
    }
  }
}
</script>
