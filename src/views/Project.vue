<template>
  <div class="Project">
    <myhead myTitle="关键词管理系统" :myProject="currentUpshow"  :myName="currentUserName" :myDepartment="currentUserDepartment"></myhead>
    <div class="Project-main">
      <router-view/>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import Myhead from '@/components/Myhead.vue'
export default {
  name: 'Project',
  components: {
    'myhead': Myhead,
  },
  computed: {
    ...mapState(['currentUpshow','currentUserName','currentUserDepartment','currentComponent'])
  },
  created () {

  },
  beforeDestroy (){
    this.changeCurrentComponent ('项目管理')
    this.changeCurrentUpshow ('项目管理')
  },
  methods: {
    ...mapMutations(['changeCurrentUpshow','changecurrentUserName','changeCurrentUserDepartment','changeCurrentComponent'])
  }
}
</script>
<style >
.Project-main {
  margin: 50px;
}

.projectScope .ivu-tabs-nav-scroll {
  display: flex !important;
  justify-content: center !important

}

.projectScope .ivu-tabs-bar {
    border-bottom: 0px
}
</style>
