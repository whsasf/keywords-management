<template>
  <div class="Management">

    <createNewproject @createNeWProject="handleNewProject"></createNewproject>

    <i-table :columns="columns" :data="projectLists"  :border="true"  :stripe="true">
    
    <template slot-scope="{ row, index }" slot="project">
      <div class="Management-input-project" >
        <div class="Management-input-project-name">
          <i-input type="text" v-model="editProject" v-if="editIndexProject === index" />
          <div class="Management-input-project-title" v-else><a href="https://www.stockhey.com" target="_blank">{{ row.project }}</a></div>
        </div>
        <div class="Management-input-project-action">
          <div v-if="editIndexProject === index">
            <i-button class="Management-input-project-normal" @click="handleSave(row,'project',index,editProject)" size="small" type="success">保存</i-button>
            <i-button class="Management-input-project-normal" @click="handleCancle()" size="small">取消</i-button>
            <i-button class="Management-input-project-normal Management-input-project-delete" @click="handleDelete(row,'project',index,editProject)" size="small" type="error">删除</i-button>
          </div>
          <div v-else>
            <i-button @click="handleEditProject(row, index)" size="small">修改项目</i-button>
          </div>
        </div>
      </div>
    </template>
    <template slot-scope="{ row, index }" slot="timestamp">
      {{row.timestamp}}
    </template>
    
    <template slot-scope="{ row, index }" slot="creater">
      {{row.creater}}
    </template>

    <template slot-scope="{ row, index }" slot="category">
    <div class="Management-input-category">
      <div class="Management-input-category-item" v-for="(category, innerIndex) in row.categories" :key="innerIndex">
        <i-input type="text" v-model="editCategory" v-if="EditIndexcategory === index + '-' + innerIndex" />
        <span v-else @dblclick="handleEditCategory(row,index,innerIndex)">{{ category}}</span>
        <i-button v-if="EditIndexcategory === index + '-' + innerIndex" class="Management-input-project-normal" @click="handleSave(row,'categories',innerIndex,editCategory)" size="small" type="success">保存</i-button>
        <i-button v-if="EditIndexcategory === index + '-' + innerIndex" class="Management-input-project-normal" @click="handleCancle()" size="small">取消</i-button>
        <i-button v-if="EditIndexcategory === index + '-' + innerIndex" class="Management-input-project-normal Management-input-project-delete" @click="handleDelete(row,'categories',innerIndex)" size="small" type="error">删除</i-button>
      </div>
      <i-button type="dashed" icon="md-add" @click="addCategory(row,index)" :disabled="createCategoryBottonStatus">创建分类</i-button>  
    </div>
    </template>
  </i-table>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import createNewproject from '@/components/createNewproject.vue'
export default {
  name: 'projectScope',
  data () {
    return {
      createCategoryBottonStatus: false,
      columns: [
          {
            title: '项目名称',
            slot: 'project'
          },
          {
            title: '创建时间',
            slot: 'timestamp'
          },
          {
            title: '创建人',
            slot: 'creater'
          },
          {
            title: '分类',
            slot: 'category'
          }
        ],
        editIndexProject: -1,  // 当前聚焦的输入框的行数
        EditIndexcategory: -1,
        editProject: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editCategory: '',
        projectLists: [
            {
                project: '项目1',
                timestamp: '20200901',
                creater: '1@dbb.com',
                categories: ['目录134','目录2','目录3','目录4','目录1','目录2','目录3','目录4','目录1','目录2','目录3','目录4','目录1','目录2','目录3','目录4','目录1','目录2','目录3','目录4']
            },
            {
                project: '项目2',
                timestamp: '20200902',
                creater: '2@dbb.com',
                categories: ['目录2-1','目录2-2','目录2-3','目录2-4']
            },
            {
                project: '项目3',
                timestamp: '20200903',
                creater: '3@dbb.com',
                categories: ['目录3-1','目录3-2','目录3-3','目录3-4']
            },
            {
                project: '项目4',
                timestamp: '20200904',
                creater: '4@dbb.com',
                categories: ['目录4-1','目录4-2','目录4-3','目录4-4']
            }
        ]
    }
  },
  computed: {
  },
  components:{
    'createNewproject': createNewproject
  },
  created (){
    this.changeCurrentUpshow('项目管理')
  }, 
  methods: {
      ...mapMutations(['changeCurrentUpshow']),
      handleEditProject: function (row, index) {
        this.editProject = row.project;
        this.editIndexProject = index;
      },
      handleEditCategory: function (row, index,InnerIndex) {
        this.editCategory = row.categories[InnerIndex];
        this.EditIndexcategory = index + '-' + InnerIndex;
        // console.log(this.EditIndexcategory,this.editCategory)
      },
      handleCancle: function (){
        this.editIndexProject = -1
        this.EditIndexcategory = -1
        this.createCategoryBottonStatus = false
      },
      handleDelete: function (xrow,xtype,xindex){
        //console.log(xrow,xtype,xindex)
        if (xtype === 'project'){
          // 删除项目
          this.projectLists.splice(xindex,1)
        }else if(xtype === 'categories'){
          //删除目录
          xrow.categories.splice(xindex,1)
        }
        this.editIndexProject = -1
        this.EditIndexcategory = -1
        this.createCategoryBottonStatus = false
      },
      handleSave: function(xrow,xtype,xindex,xvalue){
        console.log (xrow,xtype,xindex,xvalue)
        if(xtype === 'project'){
          //保存项目
          xrow.project = xvalue
        }else if (xtype === 'categories'){
          //保存目录
          xrow.categories[xindex] = xvalue
        }
        this.EditIndexcategory = -1
        this.editIndexProject = -1
        this.createCategoryBottonStatus = false
      },
      addCategory: function (xrow,xindex){
        xrow.categories.push('默认值')
        let currentIndex = xrow.categories.length - 1
        this.createCategoryBottonStatus = true
        this.editCategory = '默认值'
        this.EditIndexcategory = xindex + '-' + currentIndex
      },
      handleNewProject: function (data){
        //console.log(data)
        this.projectLists.push(data)
      }
  }, 
  props: {
  }
}
</script>

<style scoped>

.Management-input-project {
  display: flex;
  align-items: center
}
.Management-input-project-title{
  font-size: 1.1rem;
  font-weight: bold
}
.Management-input-project-action{
  margin-left: 10px
}
.Management-input-project-normal{
  margin-left: 3px
}
.Management-input-project-delete{
  margin-left: 10px
}
.Management-input-category{
  display: flex;
  flex-wrap: wrap;
  align-items: center
}
.Management-input-category-item{
  border: 1px solid #bdbbbb;
  margin: 5px;
  border-radius: 3px;
  padding: 3px 3px;
}
</style>