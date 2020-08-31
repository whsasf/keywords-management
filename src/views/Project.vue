<template>
  <div class="Project">
    <myhead myTitle="关键词管理系统" :myProject="currentUpshow"  :myName="currentUserName" :myDepartment="currentUserDepartment"></myhead>
    <div class="Project-main">
    <component :is="currentComponent" :key="currentComponent"/>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import Myhead from '@/components/Myhead.vue'
import projectScope from '@/components/projectScope.vue'
import keywordsMan from '@/components/keywords-manage.vue'
import peopleMan from '@/components/people-manage.vue'
export default {
  name: 'Project',
  components: {
    'myhead': Myhead,
    'projectScope': projectScope,
    'keywordsMan': keywordsMan,
    'peopleMan': peopleMan
  },
  computed: {
    ...mapState(['currentUpshow','currentUserName','currentUserDepartment','currentComponent'])
  },
  created () {

  },
  methods: {
    ...mapMutations(['changeCurrentUpshow','changecurrentUserName','changeCurrentUserDepartment','changeCurrentComponent'])
  }
}
</script>
<style scoped>
.Project-main {
  margin: 50px;
}
</style>
