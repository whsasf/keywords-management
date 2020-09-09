<template>
  <div class="Url">
      <div class="Url-part"> 
        <div class="Url-part1">
          <div class="Url-part11">
        <i-button class="Url-part111 Url-newItems-button" type="error"  @click="deleteItem" >删除</i-button>
        <i-button class="Url-part112 Url-newItems-button" type="primary"  @click="exportOut" >结果导出</i-button>
        <i-button class="Url-part113 Url-newItem-button" type="primary"  @click="addItem" >单条添加</i-button>
        <i-itemPage :formCustom="formCustom" :urlItemWindowShow= "urlItemWindowShow" :urlItemPageTitle="urlItemPageTitle" @createUrlNewItem="handleUrlNewItem" ></i-itemPage>
        <i-button class="Url-part114 Url-newItems-button" type="primary"  @click="addItems" >批量添加</i-button>
        </div>
        <div class="Url-part12">
        <i-input class="Url-part121"  v-model="value13" placeholder="请输入url进行模糊查询">
           <i-select v-model="select3" slot="prepend" style="width: 60px" >
               <i-option value="Url">Url</i-option>
           </i-select>
           <i-button slot="append" icon="ios-search"></i-button>
        </i-input>
         <i-page class="Url-part122" :total="itemCount" :current="currentPage" :page-size="pageSize" :page-size-opts=[10,20,30,40,50,100] size="small" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
         </div>
      </div>
      <div class="Url-part2">
      <i-button  class=" Url-newItems-button" type="success"  @click="runcrawler">开始爬取</i-button>
      </div>
    </div>
   <i-table :columns="columns1" :data="UrlItemData" :loading="loading" stripe border>
      <template slot-scope="{ row }" slot="action">
        <div class="Url-actions">
            <i-button type="primary" size="small" style="margin-right: 5px" @click="Urledit(row)">编辑</i-button>
            <i-button type="error" size="small" style="margin-right: 5px" @click="UrlDetail(row)">查看详情</i-button>
            <i-button type="error" size="small" @click="UrlAction(row)">动作</i-button>
            </div>
      </template>
      
   </i-table>
   <i-page :total="itemCount" :current="currentPage" :page-size="pageSize" :page-size-opts=[10,20,30,40,50,100] size="small" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import itemPage from '@/components/urlItemPage.vue'
export default {
  name: 'Url',
  data (){
    return {
      loading: false,
      itemCount: 0,
      currentPage: 1,
      pageSize: 10,
      value13: '',
      select3: 'Url',
      urlItemPageShow: false,
      urlItemPageTitle:'单条添加',
      columns1: [
          {
              type: 'selection',
              width: 30,
              align: 'center',
              resizable: true,
              fixed: 'left'
          },
          {   
              title: '#id',
              key: 'id',
              width: 70,
              align: 'center',
              sortable: true,
              resizable: true,
          },
          {
              title: 'Url',
              key: 'rootUrl',
              align: 'left',
              width: 200,
              resizable: true,
              render: (h, params) => {
                // console.log(params)
                    return h('a',params.row.rootUrl)
                }
              
          },
          {
              title: '运行路径',
              key: 'urlIncludePath',
              align: 'left',
              width: 200,
              resizable: true,
              render: (h, params) => {
                    let urlIncludePathList = []
                    let temp= params.row.urlIncludePath
                    for (let ele in temp){
                      urlIncludePathList.push(temp[ele]['path']+'['+ temp[ele]['type'] +']')
                    }
                    return h('p',urlIncludePathList.join(';'))
                }
          },
          {
              title: '排除路径',
              key: 'urlExcludePath',
              align: 'left',
              width: 200,
              resizable: true,
              render: (h, params) => {
                    let urlExcludePathList = []
                    let temp= params.row.urlExcludePath
                    for (let ele in temp){
                      urlExcludePathList.push(temp[ele]['path']+'['+ temp[ele]['type'] +']')
                    }
                    return h('p',urlExcludePathList.join(';'))
                }
          },
          {
              title: '分类',
              key: 'category',
              align: 'left',
              width: 200,
              filters: [],
              resizable: true,
              render: (h, params) => {
                // console.log(params.row)
                    return (h('p',params.row.category.join(';')))
                }
          },
          {
              title: '状态',
              key: 'status',
              align: 'center',
              width: 80,
              filters: [],
              resizable: true,
          },
          {
              title: '变更时间',
              key: 'modifiedTime',
              align: 'center',
              width: 120,
              filters: [],
              resizable: true,
          },
          {
              title: '操作',
              key: 'action',
              slot: 'action',
              align: 'center',
              width: 200,
              resizable: true,
          }
      ],
      UrlItemData: [],
      formCustom: {},
      formCustomOrigin: {
          itemName: '',
          categoriesEdit: [],
          statusEdit: '未开始',
          urlIncludeItems: [
              {
                  value: {'path':'','type':'regex'},
                  index: 1,
                  status: 1
              }
          ],
          urlExcludeItems: [
              {
                  value: {'path':'','type':'regex'},
                  index: 1,
                  status: 1
              }
          ]
      },
    }
  },
  computed: {
    ...mapState(['baseurl','urlItemWindowShow','currentComponent'])
  },
  created(){
    this.fetchAllItems() // 获取当前
  },
  components: {
    'i-itemPage':itemPage,
  } ,
  methods: {
    ...mapMutations(['changeUrlItemWindowShow']),
    Urledit: function (xrow){
      let self = this
      // console.log(xrow)
      self.formCustom = {}
      self.formCustom.itemName = xrow.rootUrl
      self.formCustom.categoriesEdit = xrow.category
      self.formCustom.uid = xrow['_id']['$oid']
      self.statusEdit = xrow.status
      let urlIncludeTemp = []
      // change urlIncludeItems and urlExcludeItems
      for (let ele in xrow.urlIncludePath){
        urlIncludeTemp.push({'value': xrow.urlIncludePath[ele], 'status': 1, 'index': parseInt(ele)+1})
      }

      let urlExcludeTemp = []
      // change urlIncludeItems and urlExcludeItems
      for (let ele in xrow.urlExcludePath){
        urlExcludeTemp.push({'value': xrow.urlExcludePath[ele], 'status': 1, 'index': parseInt(ele)+1})
      }
      self.formCustom.urlIncludeItems = urlIncludeTemp
      self.formCustom.urlExcludeItems = urlExcludeTemp
      console.log(self.formCustom)
      this.urlItemPageTitle ='单条编辑'
      this.changeUrlItemWindowShow(true)
    },
    fetchAllItems: function (){
        let self = this
        let pageParams = {'currentPage':self.currentPage,'pageSize':self.pageSize}
        console.log(pageParams)
        self.axios({
          method: 'get',
          url: self.baseurl + 'Urls/' + self.currentComponent,
          withCredentials: 'true',
          params: pageParams
        })
        .then( res => {
          //console.log(res)
          if (res.data.count !== ''){
            self.itemCount = res.data.count
          }
          self.UrlItemData = res.data.content
        })
        .catch(err => {
          console.log(err)
        })
      },
    handleUrlNewItem: function (itemInfo){
      let self = this
      //区分 新建 还是 修改
      if (!itemInfo['uid']){
        // 新建
          // 发送到 后端
          self.axios({
            method: 'post',
            url: self.baseurl + 'Urls/' + self.currentComponent,
            withCredentials: 'true',
            data: itemInfo
          })
          .then( res => {
            // console.log(res)
            if (res.data.count !== ''){
              self.itemCount = res.data.count
            }
            self.UrlItemData = res.data.content
            self.formCustom = self.formCustomOrigin
          })
          .catch(err => {
            console.log(err)
            self.formCustom = self.formCustomOrigin
          })
      }else{
        console.log(itemInfo)
          // 修改
          self.axios({
            method: 'put',
            url: self.baseurl + 'Urls/' + self.currentComponent + '/' + itemInfo.uid,
            withCredentials: 'true',
            data: itemInfo['data']
          })
          .then( res => {
            // console.log(res)
            if (res.data.count !== ''){
              self.itemCount = res.data.count
            }
            self.UrlItemData = res.data.content
          })
          .catch(err => {
            console.log(err)
          })
      }
      
    },
    pageChange: function (pageIndex){
        // console.log(pageIndex)
        this.currentPage = pageIndex
        this.fetchAllItems()
      },
      pageSizeChange: function (pageSize){
        this.pageSize = pageSize
        this.currentPage = 1
        // console.log(pageSize)
        this.fetchAllItems()
      },
    addItem: function (){
      this.urlItemPageTitle ='单条添加'
      // this.formCustom = this.formCustomOrigin
      // console.log(this.formCustom)
      // console.log(this.formCustomOrigin)
      this.formCustom = {
          itemName: '',
          categoriesEdit: [],
          statusEdit: '未开始',
          urlIncludeItems: [
              {
                  value: {'path':'','type':'regex'},
                  index: 1,
                  status: 1
              }
          ],
          urlExcludeItems: [
              {
                  value: {'path':'','type':'regex'},
                  index: 1,
                  status: 1
              }
          ]
      },
      this.changeUrlItemWindowShow(true)
    },
    addItems: function (){
      console.log('4')
      this.urlItemPageTitle = '多条添加'
    },
    runcrawler: function (){
      console.log('5')
    },
    deleteItem: function(){
      console.log('6')
    },
    exportOut: function(){
      console.log('7')
    },
    show: function(index){
      console.log(index)
    },
    remove: function(index){
      console.log(index)
    }
  }
}
</script>

<style scoped>
.Url{
  margin: 5px;
  overflow: scroll !important
}

.Url-actions {
  display: flex
}
.Url >>> .ivu-table-cell{
  padding: 0 5px !important
}


.Url-part{
  display: flex
}

.Url-part1{
   flex: 4;
}

.Url-part2{
   flex: 1;
}

.Url-part11{
   display: flex;
   margin:5px;
   justify-content: space-around
}

.Url-part12{
   display: flex;
   margin: 5px
}

.Url-part121{
  flex: 2
}

.Url-part122{
  flex: 3
}

.Url  >>> .ivu-input-group .ivu-input{
  
}
</style>