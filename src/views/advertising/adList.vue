<template>
  <el-card>
    <el-button slot="header">添加广告位</el-button>
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="id"
        label="spaceKey">
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告位名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getAdPositionListInfo } from '@/services/advertising'

export default {
  name: 'AdPositionList',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    // 加载广告位数据
    async loadAdPositionListInfo () {
      const { data } = await getAdPositionListInfo()
      console.log(data)
      if (data.state === 1) {
        this.tableData = data.content
      }
    },
    // 编辑
    handleEditClick () {}
  },
  created () {
    this.loadAdPositionListInfo()
  }
}
</script>
