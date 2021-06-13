<template>
  <div class="course">
    <el-card>
      <!-- 步骤条 -->
      <div slot="header">
        <span class="el-icon-back" @click="$router.push({
            name: 'course'
          })"
          >返回</span>
        <el-steps :space="200" :active="active" finish-status="success" align-center>
          <el-step title="基本信息" @click.native="active = 0"></el-step>
          <el-step title="销售信息" @click.native="active = 1"></el-step>
          <el-step title="秒杀互动" @click.native="active = 2"></el-step>
          <el-step title="课程详细" @click.native="active = 3"></el-step>
        </el-steps>
      </div>
      <el-form label-width="80px" :model="form">
        <!-- 基本信息 -->
        <div v-show="active === 0">
          <h3>基本信息</h3>
          <el-form-item label="名称">
            <el-input v-model="form.courseName" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.brief" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="form.teacherDTO.teacherName" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="form.teacherDTO.position" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="form.teacherDTO.description" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input v-model="form.previewFirstField" maxlength="20" show-word-limit style="width: 49%;margin-right: 15px;"></el-input>
            <el-input v-model="form.previewSecondField" maxlength="20" show-word-limit style="width: 49%"></el-input>
          </el-form-item>
          <el-form-item label="课程封面">
            <!-- <image-upload v-model="form.courseListImg"></image-upload> -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="onUpload">
              <img v-if="form.courseListImg" :src="form.courseListImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="解锁封面">
            <image-upload v-model="form.courseImgUrl"></image-upload>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input v-model="form.sortNum" controls-position="right" type="number" :min=0>
              <template slot="append">数字控制排序，数字越大越靠后</template>
            </el-input>
          </el-form-item>
        </div>
        <!-- 销售信息 -->
        <div v-show="active === 1">
          <h3>销售信息</h3>
          <el-form-item label="售卖价格">
            <el-input v-model="form.discounts" controls-position="right" type="number" :min=0>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="form.price" controls-position="right" type="number" :min=0>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="form.sales" controls-position="right" type="number" :min=0>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="form.discountsTag" maxlength="4" show-word-limit></el-input>
          </el-form-item>
        </div>
        <!-- 秒杀互动 -->
        <div v-show="active === 2">
          <h3>秒杀活动</h3>
          <el-form-item label="限时秒杀开关" label-width="120px">
            <el-switch
              v-model="form.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="form.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form.activityCourseDTO.beginTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form.activityCourseDTO.endTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input v-model="form.amount" controls-position="right" type="number" :min=0>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input v-model="form.stock" controls-position="right" type="number" :min=0>
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <!-- 课程详细 -->
        <div v-show="active === 3">
          <h3>课程详情</h3>
          <text-editor v-model="form.courseConemt"></text-editor>
          <el-form-item label="是否上架" style="margin-top:20px">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </div>
      </el-form>
      <div style="display: flex;justify-content: center;">
        <el-button type="info" @click="next" style="margin-top: 12px;width: 80%;">{{ active === 3 ? '完成' : '下一步' }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import ImageUpload from './imageUpload.vue'
import TextEditor from '@/components/textEditor/index'
import { saveOrUpdateCourse } from '@/services/course'

export default {
  name: 'CourseCreateOrEdit',
  components: {
    ImageUpload,
    TextEditor
  },
  data () {
    return {
      // 表单数据
      form: {
        id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          id: 0,
          courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: false,
        activityCourseDTO: {
          id: 0,
          courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      },
      // 步骤条
      active: 0,
      // 秒杀开关
      isAuto: false
    }
  },
  methods: {
    next () {
      if (this.active++ > 2) {
        this.saveOrUpdate()
      }
    },
    async saveOrUpdate () {
      const { data } = await saveOrUpdateCourse(this.form)
      console.log(data)
    },
    // 自定义图片上传
    onUpload (option) {
      console.log(option)
    },
    // 成功回调
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传前回调
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-back:hover {
  cursor: pointer;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
