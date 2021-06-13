<template>
  <el-card>
    <el-button slot="header">添加广告</el-button>
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告名称">
      </el-table-column>
      <el-table-column
        prop="address"
        label="广告位置">
      </el-table-column>
      <el-table-column
        label="广告图片">
        <el-image
          style="width: 100px; height: 100px"
          :src="tableData.img"
          fit="fill">
        </el-image>
      </el-table-column>
      <el-table-column
        label="广告时间">
        <template slot-scope="scope">
          <span>开始时间</span> {{ scope.row.startTime }}
          <span>结束时间</span> {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="上线/下线">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value= "1"
            :inactive-value= "0"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
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
import { getAdvertisingListInfo } from '@/services/advertising'

export default {
  name: 'AdvertisingList',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    // 加载广告数据
    async loadAdvertisingListvInfo () {
      const { data } = await getAdvertisingListInfo()
      if (data.state === 1) {
        this.tableData = data.content
      }
    },
    // 编辑
    handleEditClick () {}
  },
  created () {
    this.loadAdvertisingListvInfo()
  }
}
</script>
