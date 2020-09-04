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
  name: 'Main',
  components: {
    'myhead': Myhead,
  },
  computed: {
    ...mapState(['currentUpshow','currentUserName','currentUserDepartment','currentComponent'])
  },
  created () {

  },
  beforeDestroy (){
  },
  methods: {
    ...mapMutations(['changeCurrentUpshow','changecurrentUserName','changeCurrentUserDepartment','changeCurrentComponent'])
  }
}
</script>
<style >
.Project-main {
  margin: 20px 50px;
}

.projectScope .ivu-tabs-nav-scroll {
  display: flex !important;
  justify-content: center !important

}

.projectScope .ivu-tabs-bar {
    border-bottom: 0px
}
</style>
