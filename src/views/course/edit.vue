<template>
  <course-create-or-edit
    is-edit
    :course-id="courseId"
  ></course-create-or-edit>
</template>

<script>
import CourseCreateOrEdit from './components/courseCreateOrEdit.vue'

export default {
  name: 'CourseEdit',
  data () {
    return {
      props: {
        courseId: {
          type: [Number, String],
          required: true
        }
      }
    }
  },
  components: {
    CourseCreateOrEdit
  }
}
</script>
