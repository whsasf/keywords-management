<template>
  <div class="Url">

     <i-page :total="projectCount" :current="currentPage" :page-size="pageSize" :page-size-opts=[10,20,30,40,50,100] size="small" show-elevator show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
     <br>
     <i-button class="Url-newItem-button" type="primary"  @click="addItem" >单条添加</i-button>
     <i-itemPage :urlItemWindowShow= "urlItemWindowShow" :urlItemPageTitle="urlItemPageTitle"></i-itemPage>
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
   <i-table :columns="columns1" :data="data1" :loading="loading" stripe border>
      <template slot-scope="{ row, index }" slot="action">
        <div class="Url-actions">
            <i-button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</i-button>
            <i-button type="error" size="small" style="margin-right: 5px" @click="remove(index)">查看详情</i-button>
            <i-button type="error" size="small" @click="remove(index)">动作</i-button>
            </div>
      </template>
      
   </i-table>
   
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
      projectCount: 0,
      currentPage: 1,
      pageSize: 20,
      value13: '',
      select3: 'day',
      urlItemPageShow: false,
      urlItemPageTitle:'单条添加',
      columns1: [
          {
              type: 'selection',
              width: 40,
              align: 'center',
              resizable: true,
              fixed: 'left'
          },
          {   
              type: 'index',
              title: 'Id',
              key: 'id',
              width: 80,
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
              
          },
          {
              title: '运行路径',
              key: 'urlIncludePath',
              align: 'center',
              width: 200,
              resizable: true,
          },
          {
              title: '排除路径',
              key: 'urlExcludePath',
              align: 'center',
              width: 200,
              resizable: true,
          },
          {
              title: '分类',
              key: 'category',
              align: 'center',
              width: 200,
              filters: [],
              resizable: true,
          },
          {
              title: '状态',
              key: 'status',
              align: 'center',
              width: 100,
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
              fixed: 'right'
          }
      ],
      data1: [
          {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
              date: '2016-10-01'
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
              date: '2016-10-02'
          },
          {
              name: 'Jon Snow',
              age: 26,
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
          }
      ]
    }
  },
  computed: {
    ...mapState(['urlItemWindowShow']),
  },
  components: {
    'i-itemPage':itemPage,
  } ,
  methods: {
    ...mapMutations(['changeUrlItemWindowShow']),
    pageChange: function (){
      console.log('1')
    },
    pageSizeChange: function(){
      console.log('2')
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

</style>