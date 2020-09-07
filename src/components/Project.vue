<template>
  <div class="Management-projects-i-layout layout">
    <i-layout :default-collapsed="false">
        <i-sider  class="layout-sider" ref="side1" hide-trigger collapsible :collapsed-width="50" v-model="isCollapsed">
            <i-menu class="layout-sider-menu" active-name="1-2" theme="light" width="auto" :class="menuitemClasses">
                <i-submenu class="layout-sider-menu-title" name="1">
                    <template slot="title">
                       <span><el-icon class="el-icon-s-management"></el-icon>
                        <span v-show="collpsed" >语料资源管理</span>
                        </span>
                    </template>
                    <i-menuItem v-show="collpsed" name="1-1"><router-link :to="'/Main/Project/'+ (currentComponent) + '/Url'">Url</router-link></i-menuItem>
                    <i-menuItem v-show="collpsed" name="1-2"><router-link :to="'/Main/Project/'+ (currentComponent) + '/Articles'">查看语料</router-link></i-menuItem>
                </i-submenu>
                
                <i-submenu name="2">
                    <template slot="title">
                      <span>
                      <i-poptip v-show="!collpsed" trigger="hover" placement="right">
                          <el-icon class="el-icon-notebook-2"></el-icon>
                          <div  slot="content">
                            
                            <a href="baidu.com">baidu</a><br>
                            <a href="https://www.baidu.com">google</a>
                          </div>
                      </i-poptip>
                      <el-icon  v-show="collpsed" class="el-icon-notebook-2"></el-icon>
                        <span v-show="collpsed">词根管理</span>
                      </span>
                    </template>
                    <i-menuItem v-show="collpsed" name="2-1"><router-link :to="'/Main/Project/'+ (currentComponent) + '/basicWords'">基础词表</router-link></i-menuItem>
                    <i-menuItem v-show="collpsed" name="2-2"><router-link :to="'/Main/Project/'+ (currentComponent) + '/extendedWords'">拓展词表</router-link></i-menuItem>
                    <i-menuItem v-show="collpsed" name="2-3"><router-link :to="'/Main/Project/'+ (currentComponent) + '/ignoreDict'">停止词典</router-link></i-menuItem>
                    <i-menuItem v-show="collpsed" name="2-4"><router-link :to="'/Main/Project/'+ (currentComponent) + '/userDict'">用户词典</router-link></i-menuItem>
                    <i-menuItem v-show="collpsed" name="2-5"><router-link :to="'/Main/Project/'+ (currentComponent) + '/usageTag'">用途标签</router-link></i-menuItem>
                    <i-menuItem v-show="collpsed" name="2-6"><router-link :to="'/Main/Project/'+ (currentComponent) + '/invalidDict'">无效词典</router-link></i-menuItem>
                </i-submenu>
            </i-menu>
        </i-sider >
        <i-layout>
            <i-content class="layout-content">
                <router-view/>
            </i-content>
        </i-layout>
        </i-layout>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import { Icon } from 'element-ui';
export default {
  name: 'Project',
   data () {
            return {
                isCollapsed: false,
                content:['hi','hello']
            }
        },
  computed: {
      ...mapState(['collpsed','currentComponent']),
     rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
      menuitemClasses () {
          return [
              'menu-item',
              this.isCollapsed ? 'collapsed-menu' : ''
          ]
      }
  },
  created (){
    this.changeCurrentComponent(this.$route.params.project)
  },
  components: {
      'el-icon': Icon
  },
  watch: {
    collpsed: function () {
      console.log('waitch')
      this.collapsedSider()
    }
  },
  methods: {
    ...mapMutations(['changeCurrentComponent']),
    collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
  }
}
</script>

<style scoped>
 .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        
    }
    .layout-sider{
      height: calc(100vh - 60px);
      background: #fff;
      width:200px !important;
      min-width:0px !important;;
      max-width:200px !important;
      
    }

    .layout-sider.ivu-layout-sider{
        text-align: left !important;
        font-weight: bold
    }

    .layout-sider.ivu-layout-sider span{
        width: auto
    } 

    .layout-sider.ivu-layout-sider span{
        width: auto
    } 
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }

    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
