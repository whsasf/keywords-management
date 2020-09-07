<template>
  <div class="Myhead">
    <i-menu class="Mymenu" mode="horizontal" :theme="theme1" active-name="" @on-select="signout">
      <i-menuItem class="Mymenu-title" name="title" >{{ myTitle }}</i-menuItem>
      <i-menuItem class="Mymenu-collpse" name="collpse" v-show="showTogether">
         <span title="隐藏侧边栏" v-if="collpsed"  @click="changeCollpsed(false)"><el-icon class="el-icon-s-fold" ></el-icon></span>
         <span title="隐藏侧边栏" v-else @click="changeCollpsed(true)"><el-icon class="el-icon-s-unfold" ></el-icon></span>
       </i-menuItem>
       <i-menuItem @click="refresh" class="Mymenu-refresh" name="refresh">
        <i-icon @click="refresh" size="25" type="md-refresh" title="刷新列表" ></i-icon>
       </i-menuItem>
      <i-menuItem class="Mymenu-project" name="projecctName"> {{ myProject}}</i-menuItem>
      <i-submenu name="user" class="Mymenu-user" >
          <template slot="title">
              <i-icon type="ios-contact"/>
              {{ myName|getName}}
          </template>
          <i-menuItem class="Mymenu-user-sub Mymenu-user-disable" name="user-department">
            <i-icon type="md-people"></i-icon>
            {{myDepartment}}
          </i-menuItem>
          <i-menuItem class="Mymenu-user-sub" name="user-setting">
            <i-icon type="ios-settings"></i-icon>
            设置
          </i-menuItem>
          <i-menuItem class="Mymenu-user-sub" name="user-signout">
            <i-icon type="md-exit"></i-icon>
            退出登录
          </i-menuItem>
      </i-submenu>
    </i-menu>
  </div>
</template>

<script>
import { Icon } from 'element-ui';
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'Myhead',
  data () {
            return {
                theme1: 'light'
            }
        },
  props: {
    myTitle: String,
    myProject: String,
    myName: String,
    myDepartment: String
  },
  computed: {
    ...mapState(['currentComponent','collpsed','refreshRouteKey']),
    showTogether: function (){
      if (this.currentComponent === '项目管理'){
      return false
      }else {
        return true
      }
    }
  },
  components: {
    'el-icon':Icon
  },
  filters: {
    getName: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split('@')[0]
      }
  },
  methods: {
    ...mapMutations(['changeCollpsed','changeRefreshRouteKey']),
    refresh: function (){
      this.changeRefreshRouteKey(this.refreshRouteKey + 1)
      this.changeCollpsed(true)
    },
    signout: function (name){
      if (name === 'user-signout'){
        this.$Message.success('登出...');
        this.$router.push('/Account/Signin')
      }
    },
    sayhello: function(){
      console.log('hello')
    }
  }
}
</script>

<style scoped>

.Myhead {
  display: sticky;
  margin: 0;
  top: 0px
}
.Mymenu {
  display: flex;
  font-weight: bold;
  font-size: 1.1rem;
  align-items: flex-end
}
.Mymenu-title {
  flex: 4;
  font-size: 1.5rem;
  color: #212891 !important;
  text-align: left;
  pointer-events: none;
}
.Mymenu-collpse{
  flex: 1;
  font-size: 1.5rem;
  color: #212891 !important;
  text-align: left;
}
.Mymenu-refresh{
  flex: 1;
  font-size: 1.5rem;
  color: #212891 !important;
  text-align: left;
}

.Mymenu-project{
  flex: 6;
  font-size: 1.5rem;
  color: black !important;
  pointer-events: none;
}
.Mymenu-user{
  flex: 6;
}

.Mymenu-user-sub{
  text-align: left
}

.Mymenu-user-disable{
  pointer-events: none;
}

.Mymenu-collpse{
  font-size: 1.3rem
}
</style>
