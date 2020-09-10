<template>
    <div class="Urls-seeDetail">
      <i-modal
        v-model="DetailWindowShow2"
        title="查看页面"
        fullscreen
        :closable="true"
        :mask-closable="false"
        :scrollable="true">
        <div class="Urls-seeDetail-main">
            <iframe ref="iframe" class="Urls-seeDetail-iframe" :src="website" frameborder="3"></iframe>
            <div class="Urls-seeDetail-operate">
                <i-button type="text" size="large" >有效</i-button>
                <i-button type="text" size="large" >无效</i-button>
                <br><br>
                <i-button type="text" size="large" >上一个</i-button>
                <i-button type="text" size="large" >下一个</i-button>
            </div>
        </div>
        <div slot="footer">
            <i-button type="text" size="large" @click="modalCancel('')">取消</i-button>
            <i-button type="primary" size="large" @click="modalOk('')">提交</i-button>
        </div>
      </i-modal>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
    export default {
        name: 'seeDetail',
        data () {
            return {
                // website: 'https://www.baidu.com'
            }
        },
        props: ['website'],
        computed: {
            ...mapState(['currentUserName','DetailWindowShow']),
            DetailWindowShow2:{
                get: function(){
                    return this.DetailWindowShow
                },
                set: function(){
                    this.changeDetailWindowShow(false)
                }

            }
        },
        beforeDestroy (){
        },
        methods: {
            ...mapMutations(['changeDetailWindowShow']),
            modalOk () {

            },
            modalCancel () {
                this.$refs.iframe.value = ''
                this.changeDetailWindowShow(false)
            }
        }
    }
</script>
<style scoped>
.Urls-seeDetail-iframe{
    height: 600px;
    width: 80%
}

.Urls-seeDetail-main{
    display: flex
}
</style>