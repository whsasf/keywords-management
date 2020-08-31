<template>
  <div class="projectScope" label="选择项目查看:">
      <i-select v-model="selcted" prefix="md-pricetags" style="width:400px" size="large" :filterable=true :label-in-value="true" @on-change="perChange">
          <i-option v-for="item in projectLists" :value="item.value" :key="item.value">{{ item.label }}</i-option>
      </i-select>
      <br>
      x
     <i-divider type="vertical" orientation="center"/>
     <span @click="switch2(myselect)">{{ myselect.label }}</span>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'projectScope',
  data () {
    return {
        projectLists: [
            {
                label: '关键词管理系统',
                value: 'keywordsMan',
                categiroes: ['目录1','目录2','目录3','目录4']
            },
            {
                label: '人员管理系统',
                value: 'peopleMan',
                categiroes: ['目录2-1','目录2-2','目录2-3','目录2-4']
            },
            {
                label: '奖金管理系统',
                value: 'moneyMan',
                categiroes: ['目录3-1','目录3-2','目录3-3','目录3-4']
            },
            {
                label: '回头客管理系统',
                value: 'backMan',
                categiroes: ['目录4-1','目录4-2','目录4-3','目录4-4']
            }
        ],
        selcted: '',
        myselect: ''
      
    }
  },
  computed: {
    ...mapState(['currentComponent'])
  },
  created (){
    this.selcted = this.projectLists[0].value
    this.myselect = {'value': this.projectLists[0].value, 'label': this.projectLists[0].label}
  }, 
  methods: {
    ...mapMutations(['changeCurrentComponent','changeCurrentUpshow']),
    switch2: function (new2){
      this.changeCurrentComponent(new2.value)
      this.changeCurrentUpshow(new2.label)
    },
    perChange: function (e){
      console.log(this.selcted)
      this.selcted = e.value
      this.myselect = {'value': e.value, 'label': e.label}
    }
  }, 
  props: {
  }
}
</script>

<style scoped>
.projectScope-form {
  display:flex;
  align-items: center;
  justify-content: center
}
.projectScope-lable{
  font-weight: bold;
  font-size: 1.1rem
}
</style>
