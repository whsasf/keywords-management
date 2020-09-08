<template>
  <div class="Url">

     <i-page :total="itemCount" :current="currentPage" :page-size="pageSize" :page-size-opts=[10,20,30,40,50,100] size="small" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
     <br>
     <i-button class="Url-newItem-button" type="primary"  @click="addItem" >单条添加</i-button>
     <i-itemPage :urlItemWindowShow= "urlItemWindowShow" :urlItemPageTitle="urlItemPageTitle" @createUrlNewItem="handleUrlNewItem" ></i-itemPage>
     <i-button class="Url-newItems-button" type="primary"  @click="addItems" >批量添加</i-button>
     <i-button class="Url-newItems-button" type="error"  @click="deleteItem" >删除</i-button>
     <i-button class="Url-newItems-button" type="success"  @click="runcrawler">开始爬取</i-button>
     <i-button class="Url-newItems-button" type="primary"  @click="exportOut" >结果导出</i-button>
      <br><br>
      <i-input v-model="value13">
        <i-select v-model="select3" slot="prepend" style="width: 80px">
            <i-option value="day">Day</i-option>
            <i-option value="month">Month</i-option>
        </i-select>
        <i-button slot="append" icon="ios-search"></i-button>
    </i-input>
    <br>
   <i-table :columns="columns1" :data="UrlItemData" :loading="loading" stripe border>
      <template slot-scope="{ row, index }" slot="action">
        <div class="Url-actions">
            <i-button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</i-button>
            <i-button type="error" size="small" style="margin-right: 5px" @click="remove(index)">查看详情</i-button>
            <i-button type="error" size="small" @click="remove(index)">动作</i-button>
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
      select3: 'day',
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
              align: 'center',
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
              align: 'center',
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
              align: 'center',
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
              align: 'center',
              width: 200,
              filters: [],
              resizable: true,
              render: (h, params) => {
                console.log(params.row)
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
      UrlItemData: []
    }
  },
  computed: {
    ...mapState(['baseurl','urlItemWindowShow','currentComponent']),
  },
  created(){
    this.fetchAllItems() // 获取当前
  },
  components: {
    'i-itemPage':itemPage,
  } ,
  methods: {
    ...mapMutations(['changeUrlItemWindowShow']),
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
      console.log(itemInfo)
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
      })
      .catch(err => {
        console.log(err)
      })
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
      console.log('3')
      this.urlItemPageTitle ='单条添加'
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
</style>