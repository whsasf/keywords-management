<template>
  <div class="Url">
      <div class="Url-part"> 
        <div class="Url-part1">
          <div class="Url-part11">
        <i-button class="Url-part111 Url-newItems-button" type="error" icon="md-trash"  @click="deleteItems" >删除</i-button>
        <i-button class="Url-part112 Url-newItems-button"  type="primary" size="large" @click="exportData(1)"><i-icon type="ios-download"></i-icon> 导出数据</i-button>
        <i-button class="Url-part113 Url-newItem-button" type="primary" icon="md-add-circle"  @click="addItem" >单条添加</i-button>
        <i-itemPage :formCustom="formCustom" :urlItemWindowShow= "urlItemWindowShow" :urlItemPageTitle="urlItemPageTitle" @createUrlNewItem="handleUrlNewItem" @deleteUrlNewItem="handleUrlDeleteItem" ></i-itemPage>
        <div class="Url-batchUpload">
        <i-upload class="Url-batchUpload-button" ref="upload" action="" :show-upload-list="true" :before-upload="handleBeforeUpload">
          <i-button class="Url-part114 Url-newItems-button" type="primary" icon="md-cloud-upload"  @click="addItems" >批量添加</i-button>
        </i-upload>
          <div class="Url-batchUpload-template">
            <a :href=" baseurl + 'static/Url-batchUpload-example.csv'" title="下载上传模板">下载添加模板</a>
          </div>
        </div>
        
        </div>
        <div class="Url-part12">
        <div>
        <i-input class="Url-part121"  v-model="searchItem"  @input="urlSearch" placeholder="请输入url进行模糊查询">
           <i-select v-model="select3" slot="prepend" style="width: 60px" >
               <i-option value="Url">Url</i-option>
           </i-select>
           <i-button slot="append" icon="ios-search"></i-button>
        </i-input>
        
        <i-dropdown placement="bottom-start" divided trigger="click"  :visible="searchReaultListvisible" @on-click="handleSelected" @on-clickoutside.prevent="handleClickOutside">
            <i-dropdownMenu slot="list">
            <i-dropdownItem v-for="(item,index) in searchResult" :name="item.rootUrl" :key="index">{{item.rootUrl}}</i-dropdownItem>
            </i-dropdownMenu>
        </i-dropdown>
        </div>
         <i-page class="Url-part122" :total="itemCount" :current="currentPage" :page-size="pageSize" :page-size-opts=[10,20,30,40,50,100] size="small" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
         </div>
      </div>
      <div class="Url-part2">
      <i-button  class=" Url-newItems-button" type="success" icon="md-power" @click="runcrawler">开始爬取</i-button>
      </div>
    </div>
   <i-table :columns="columns1" :data="UrlItemData" :loading="loading" @on-selection-change="handleSelectRow()" ref="table" stripe border>
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
      searchReaultListvisible: true,
      searchItem: '',
      searchResult: [{'rootUrl':'q'},{'rootUrl':'w'}],
      selectedItemList: [],
      loading: false,
      itemCount: 0,
      currentPage: 1,
      pageSize: 10,
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
      formCustom: {}
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
    handleClickOutside: function (){
      console.log('1')
    },
    urlSearch: function (e){
      let self = this
      self.searchItem = e.toLowerCase()
      //console.log(this.searchItem)
      //发往后端，进行查询
      let queryParams = {'keyword':self.searchItem}
      // console.log(queryParams)
      self.axios({
        method: 'get',
        url: self.baseurl + 'Urls/' + self.currentComponent,
        withCredentials: 'true',
        params: queryParams
      })
      .then( res => {
        // console.log(res)
        // if (res.data.count !== ''){
        //   self.projectCount = res.data.count
        // }
        self.searchResult = res.data.content
        console.log(self.searchResult)
      })
      .catch(err => {
        console.log(err)
      })

    },
    handleSelected: function (name){
      console.log(name)
    },
    handleBeforeUpload: function (file){
      // 批量上传
      let self = this
      // console.log('file',file)
      let Alldata= []
      self.$papa.parse(file,{
        delimiter: ",",
        complete: function(results) {
          for (let ele in results.data){
            // console.log(results.data[ele])
            let temp = {}
            if (ele >0){
              let rowData = JSON.stringify(results.data[ele])
              rowData = JSON.parse(rowData.replace(/;/g,','))
              //console.log(JSON.parse(rowData))
              temp['rootUrl'] = rowData[0]
              temp['urlIncludePath'] = eval(rowData[1])
              temp['urlExcludePath'] = eval(rowData[2])
              temp['category']= eval(rowData[3])
              temp['status']= '未开始'
            }
            else{
              continue
            }
            Alldata.push(temp)
          }
          // 上传到后端
          self.axios({
            method: 'post',
            url: self.baseurl + 'Urls/' + self.currentComponent,
            withCredentials: 'true',
            data: Alldata
          })
          .then( res => {
            // console.log(res)
            self.currentPage = 1
            if (res.data.count !== ''){
              self.itemCount = res.data.count
            }
            self.UrlItemData = res.data.content
            //self.formCustom = self.formCustomOrigin
          })
          .catch(err => {
            console.log(err)
            //self.formCustom = self.formCustomOrigin
          })
          console.log(Alldata)
          }
    });
    return false // 返回false 代表 不上传
    },
    deleteItems: function(){
      let self = this
      // 目前只需要把 每一行对应的uid取出来，发送到后端进行删除就好了
      // console.log(this.selectedItemList)
      
      // 当没有选项被选中时，不进行该操作
      if (self.selectedItemList.length === 0){
        //console.log('no delete')
        self.$Message.info('无待删除项');
      }else{
        let uids =[]
        for (let element in self.selectedItemList){
          uids.push(self.selectedItemList[element]['_id']['$oid'])
        }
        // console.log(uids)
        self.axios({
              method: 'delete',
              url: self.baseurl + 'Urls/' + self.currentComponent,
              withCredentials: 'true',
              data: uids
            })
            .then( res => {
              // console.log(res)
              self.currentPage = 1
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
    handleSelectRow: function(){
      this.selectedItemList = this.$refs.table.getSelection()
      // console.log(this.selectedItemList)
    },
    exportData: function(type){
      if (type === 1) {
          this.$refs.table.exportCsv({
          filename: this.currentComponent,
          columns: this.columns1.filter((col,index) =>{
            if (index >0 ){
              return col
            }
          }),
          data: this.UrlItemData.map(data=>{
            const target = Object.assign({}, data)
            // console.log(target)
            for (let x in target){
              target[x] = JSON.stringify(target[x])
              target[x] = target[x].replace(/,/g,';')
              target[x] = target[x].replace(/"/g,'\'')
            }
            return target
          })
      })
      }
    },
    Urledit: function (xrow){
      let self = this
      // console.log(xrow)
      //
      let formCustom = {}
      formCustom.itemName = xrow.rootUrl
      formCustom.categoriesEdit = xrow.category
      formCustom.uid = xrow['_id']['$oid']
      // formCustom.statusEdit = xrow.status
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
      formCustom.urlIncludeItems = urlIncludeTemp
      formCustom.urlExcludeItems = urlExcludeTemp
      formCustom.urlIncludeIndex = urlIncludeTemp.length,
      formCustom.urlExcludeIndex = urlExcludeTemp.length,

      this.urlItemPageTitle ='单条编辑'
      self.formCustom = formCustom
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
          self.currentPage = 1
          if (res.data.count !== ''){
            self.itemCount = res.data.count
          }
          self.UrlItemData = res.data.content
        })
        .catch(err => {
          console.log(err)
        })
      },
    handleUrlDeleteItem: function(uidInfo){
      let self = this
      let uid = uidInfo['uid']
      // 联系后台，进行删除
      self.axios({
            method: 'delete',
            url: self.baseurl + 'Urls/' + self.currentComponent,
            withCredentials: 'true',
            data: [uid]
          })
          .then( res => {
            // console.log(res)
            self.currentPage = 1
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
      // 注意，新建，发送的是 对象数组(配合批量创建)，而更新只能是单个的 对象
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
            self.currentPage = 1
            if (res.data.count !== ''){
              self.itemCount = res.data.count
            }
            self.UrlItemData = res.data.content
            //self.formCustom = self.formCustomOrigin
          })
          .catch(err => {
            console.log(err)
            //self.formCustom = self.formCustomOrigin
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
            self.currentPage = 1
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
          urlIncludeIndex: 1,
          urlExcludeIndex: 1,
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

.Url-batchUpload{
  border: 1px solid green;
  border-radius: 5px
}

.Url-batchUpload-button{
  padding: 5px;
}
.Url-batchUpload-template{
  border-top: 1px solid green;
  padding: 3px
}

</style>