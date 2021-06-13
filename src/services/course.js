import request from '@/utils/request'

// 课程信息查询
export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 课程上下架
export const changeStatus = params => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

// 保存或者更新课程信息
export const saveOrUpdateCourse = data => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 课程图片上传
export const imgUpload = data => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data
  })
}

// 通过id获取章节和目录
export const getCourseContent = courseId => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    parmas: {
      courseId
    }
  })
}
