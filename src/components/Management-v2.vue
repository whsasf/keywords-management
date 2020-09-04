<template>
  <div class="Management">

    <createNewproject @createNeWProject="handleNewProject"></createNewproject>
    <div class="Management-cards">
    <i-card class="Management-card" style="width:350px" v-for="(rowData,index) in projectLists" :key="index">
      <div class="Management-card-in">
      <div class="Management-input-project-name">
      <div>
         <i-input type="text" v-model="editProject" v-if="editIndexProject === index" />
         <div class="Management-input-project-title" v-else>
           <i-icon type="ios-film"></i-icon>
           <a  class="Management-input-project-title-main" href="https://www.stockhey.com" target="_blank">{{ rowData.projectName }}</a>
         </div>
      </div>

      <div>
        <div v-if="editIndexProject === index">
            <i-button class="Management-input-project-normal" @click="handleSave(rowData,'project',index,editProject)" size="small" type="success">保存</i-button>
            <i-button class="Management-input-project-normal" @click="handleCancle()" size="small">取消</i-button>
            <i-button class="Management-input-project-normal Management-input-project-delete" @click="handleDelete(rowData,'project',index,editProject)" size="small" type="error">删除</i-button>
          </div>
          <div v-else>
            <i-button class="Management-input-project-name-midify" @click="handleEditProject(rowData, index)" size="small">修改项目</i-button>
          </div>
      </div>
      </div>
      
      <div class="Management-input-project-categories">
        <div class="Management-input-category-item" v-for="(category, innerIndex) in rowData.categories" :key="innerIndex">
              <i-input type="text" v-model="editCategory" v-if="EditIndexcategory === index + '-' + innerIndex" />
              <span v-else @dblclick="handleEditCategory(rowData,index,innerIndex)">{{ category.categoryName}}</span>
              <i-button v-if="EditIndexcategory === index + '-' + innerIndex" class="Management-input-project-normal" @click="handleSave(rowData,'categories',innerIndex,editCategory)" size="small" type="success">保存</i-button>
              <i-button v-if="EditIndexcategory === index + '-' + innerIndex" class="Management-input-project-normal" @click="handleCancle()" size="small">取消</i-button>
              <i-button v-if="EditIndexcategory === index + '-' + innerIndex" class="Management-input-project-normal Management-input-project-delete" @click="handleDelete(rowData,'categories',innerIndex)" size="small" type="error">删除</i-button>
        </div>
        <i-button id="createCategoryScroll" type="dashed" icon="md-add" @click="addCategory(rowData,index)" :disabled="createCategoryBottonStatus">创建分类</i-button>
      </div>
      
      <div class="Management-cards-footer">
      <div class="Management-cards-footer-time">
        {{rowData.timestamp}} 
      </div>

      <div class="Management-cards-creater">
        {{rowData.creater}}
      </div>
      </div>
      </div>
  </i-card>
  </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
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
        projectLists: ''
    }
  },
  computed: {
    ...mapState(['baseurl'])
  },
  components:{
    'createNewproject': createNewproject
  },
  created (){
    this.changeCurrentUpshow('项目管理')
    // 获取所有项目数据
    this.fetchAllProjects()
  }, 
  methods: {
      ...mapMutations(['changeCurrentUpshow']),
      handleEditProject: function (row, index) {
        this.editProject = row.projectName;
        this.editIndexProject = index;
      },
      handleEditCategory: function (row, index,InnerIndex) {
        this.editCategory = row.categories[InnerIndex].categoryName;
        this.EditIndexcategory = index + '-' + InnerIndex;
        // console.log(this.EditIndexcategory,this.editCategory)
      },
      handleCancle: function (){
        this.editIndexProject = -1
        this.EditIndexcategory = -1
        this.editCategory = ''
        this.editProject = ''
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
        // console.log (xrow,xtype,xindex,xvalue)
        if(xtype === 'project'){
          //保存项目
          xrow.projectName = xvalue
        }else if (xtype === 'categories'){
          //保存目录
          xrow.categories.xindex.push({'categoryName':xvalue})
        }
        this.EditIndexcategory = -1
        this.editIndexProject = -1
        this.createCategoryBottonStatus = false
      },
      addCategory: function (xrow,xindex){
        console.log(xrow.categories)
        // xrow.categories.push({'categoryName':'默认值'})
        let currentIndex = xrow.categories.length - 1
        this.createCategoryBottonStatus = true
        this.editCategory = '默认值'
        this.EditIndexcategory = xindex + '-' + currentIndex
      },
      handleNewProject: function (projectData){
        let self = this
        // console.log(projectData)
        // this.projectLists.push(data)
        // fetch projectLists
        // console.log(self.baseurl)
        self.axios({
          method: 'post',
          url: self.baseurl + 'Projects/',
          withCredentials: 'true',
          data: projectData
        })
        .then( res => {
          // console.log(res)
          self.projectLists = res.data
        })
        .catch(err => {
          console.log(err)
        })
      },
      fetchAllProjects: function (){
        let self = this
        self.axios({
          method: 'get',
          url: self.baseurl + 'Projects/',
          withCredentials: 'true'
        })
        .then( res => {
          console.log(res)
          self.projectLists = res.data
        })
        .catch(err => {
          console.log(err)
        })
      }
  }, 
  props: {
  }
}
</script>

<style scoped>

.Management-cards{
  display: flex;
  justify-content:  flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 5px;
}

.Management-card{
  margin: 10px 10px;
  height: 250px
}

.Management-card-in{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: space-around
}

.Management-input-project-name{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 5px

}

.Management-cards-footer{
  display: flex;
  font-size: 1.1rem;
}

.Management-input-project-categories{
  height: 150px;
  overflow: scroll;
  border-top: 1px solid #DBDEE2;
  border-bottom: 1px solid #DBDEE2;
  margin: 5px auto;
  padding: 5px

}

.Management-cards-footer-creater{

}

.Management-input-project-categories{
  display: flex;
  jusitify-content: center;
  align-items: center;
  flex-wrap: wrap
}


.Management-input-project {
  display: flex;
  align-items: center
}
.Management-input-project-title{
  font-size: 1.1rem;
  font-weight: bold;
}
.Management-input-project-title-main{
  color: #212891
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
  z-index: 5
}
</style>