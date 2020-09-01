<template>
  <div class="Management">
      Management
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
                value: '项目1',
                categiroes: ['目录1','目录2','目录3','目录4']
            },
            {
                value: '项目2',
                categiroes: ['目录2-1','目录2-2','目录2-3','目录2-4']
            },
            {
                value: '项目3',
                categiroes: ['目录3-1','目录3-2','目录3-3','目录3-4']
            },
            {
                value: '项目4',
                categiroes: ['目录4-1','目录4-2','目录4-3','目录4-4']
            }
        ]
      
    }
  },
  computed: {
    ...mapState(['currentComponent'])
  },
  created (){
  }, 
  methods: {
    ...mapMutations(['changeCurrentComponent','changeCurrentUpshow'])
  }, 
  props: {
  }
}
</script>

<style scoped>


</style>
