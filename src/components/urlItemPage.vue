<template>
    <div class="Url-itemPage">
      <i-modal
        v-model="urlItemWindowShow"
        :title="urlItemPageTitle"
        :closable="false"
        :mask-closable="false"
        :scrollable="true">

        <div class="Url-itemPage-form">

            <i-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
            
            <i-formItem label="url" prop="itemName">
                <i-input class="management-newProject-name-input" type="text" v-model="formCustom.itemName" placeholder="请输入名称"></i-input>
            </i-formItem>

            <div class="Url-itemPage-form-urlIncludePath">
                <i-formItem
                    v-for="(item, xindex) in shownformCustomUrlIncludeItems"
                    :key="xindex"
                    :label="'运行路径 ' + item.index"
                    :prop="item.value + ''"
                    >
                    <i-row>
                        <i-col class="Url-itemPage-form-urlIncludePath-inputs">
                            <i-input  class="Url-itemPage-form-urlIncludePath-inputs-input" type="text" v-model="item.value.path" placeholder="请输入运行路径"></i-input>
                            <i-select class="Url-itemPage-form-urlIncludePath-inputs-select" v-model="item.value.type" >
                                <i-option v-for="(item,index) in urlIncludePathSets" :value="item" :key="index">{{ item }}</i-option>
                            </i-select>
                            <i-button class="Url-itemPage-form-urlIncludePath-inputs-delete" @click="handleRemove('include',xindex)">删除</i-button>
                        </i-col>
                    </i-row>
                </i-formItem>

                <i-formItem>
                    <i-row>
                        <i-col span="12">
                            <i-button type="dashed" long @click="handleAdd('include')" icon="md-add">添加运行路径项</i-button>
                        </i-col>
                    </i-row>
                </i-formItem>
            </div>

            <div class="Url-itemPage-form-urlExcludePath">
                <i-formItem
                    v-for="(item, xindex) in shownformCustomUrlExcludeItems"
                    :key="xindex"
                    :label="'排除路径 ' + item.index"
                    :prop="item.value + ''"
                    >
                    <i-row>
                        <i-col class="Url-itemPage-form-urlExcludePath-inputs">
                            <i-input  class="Url-itemPage-form-urlExcludePath-inputs-input" type="text" v-model="item.value.path" placeholder="请输入排除路径"></i-input>
                            <i-select class="Url-itemPage-form-urlExcludePath-inputs-select" v-model="item.value.type" >
                                <i-option v-for="(item,index) in urlIncludePathSets" :value="item" :key="index">{{ item }}</i-option>
                            </i-select>
                            <i-button class="Url-itemPage-form-urlExcludePath-inputs-delete" @click="handleRemove('exclude',xindex)">删除</i-button>
                        </i-col>
                    </i-row>
                </i-formItem>

                <i-formItem>
                    <i-row>
                        <i-col span="12">
                            <i-button type="dashed" long @click="handleAdd('exclude')" icon="md-add">添加排除路径项</i-button>
                        </i-col>
                    </i-row>
                </i-formItem>
            </div>
            
                <div class="Url-itemPage-form-category">
                <i-formItem prop="categoriesEdit">
                    <div class="Url-itemPage-form-category-inside">
                <label class="Url-itemPage-form-category-label" >分类(可多选)</label>
                <i-select class="Url-itemPage-form-category-select" multiple  v-model="formCustom.categoriesEdit">
                    <i-option v-for="item in categories" :value="item" :key="item">{{ item }}</i-option>
                </i-select>
                </div>
                 </i-formItem>
                </div>


            </i-form>
        
        </div>
        <div slot="footer">
            <i-button type="text" size="large" @click="modalCancel()">取消</i-button>
            <i-button type="primary" size="large" @click="modalOk('formCustom')">提交</i-button>
        </div>
      </i-modal>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
    export default {
        name: 'itemPage',
        data () {
            const validateUrl = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('url不能为空'));
                   
                } else if ( !value.toLowerCase().startsWith('https://') && !value.toLowerCase().startsWith('http://') ) {
                    callback(new Error('url应以http://或https://开头'));
                }else {
                    callback();
                }
            };
            return {
                categories: [
                   '分类1',
                   '分类2',
                   '分类3',
                   '分类4',
                   '分类5'
                ],
                urlIncludePathSets: [
                    'regex',
                    '包含'
                ],
                urlIncludeIndex: 1,
                urlExcludeIndex: 1,
                
                //formCustom: {
                //    itemName: '',
                //    categoriesEdit: [],
                //    statusEdit: '未开始',
                //    urlIncludeItems: [
                //        {
                //            value: {'path':'','type':'regex'},
                //            index: 1,
                //            status: 1
                //        }
                //    ],
                //    urlExcludeItems: [
                //        {
                //            value: {'path':'','type':'regex'},
                //            index: 1,
                //            status: 1
                //        }
                //    ]
                //},
                ruleCustom: {
                    itemName: [
                        { validator: validateUrl, trigger: 'blur' }
                    ]
                },
            }
        },
        props: ['urlItemPageTitle','urlItemWindowShow','formCustom'],
        computed: {
            ...mapState(['currentUserName']),
            shownformCustomUrlIncludeItems: function (){
                let shownformCustomUrlIncludeItemsData = []
                for (let element in this.formCustom.urlIncludeItems) {
                    if (this.formCustom.urlIncludeItems[element].status !== 0){
                        shownformCustomUrlIncludeItemsData.push(this.formCustom.urlIncludeItems[element])
                    }
                }
                return shownformCustomUrlIncludeItemsData
            },
            shownformCustomUrlExcludeItems: function (){
                let shownformCustomUrlExcludeItemsData = []
                for (let element in this.formCustom.urlExcludeItems) {
                    if (this.formCustom.urlExcludeItems[element].status !== 0){
                        shownformCustomUrlExcludeItemsData.push(this.formCustom.urlExcludeItems[element])
                    }
                }
                return shownformCustomUrlExcludeItemsData
            }
        },
        beforeDestroy (){
        },
        mounted(){
            console.log('mounted')
            // console.log(this.formCustom)
            // 计算 urlIncludeIndex 的值 
            // console.log(this.formCustom)
            // this.urlIncludeIndex = this.formCustom.urlIncludeItems.length
            // this.urlExcludeIndex = this.formCustom.urlExcludeItems.length
        },
        methods: {
            ...mapMutations(['changeUrlItemWindowShow']),
            handleAdd (type) {
                if (type === 'include'){
                    this.urlIncludeIndex++
                    this.formCustom.urlIncludeItems.push({
                        value: {'path':'',type:'regex'},
                        index: this.urlIncludeIndex,
                        status: 1
                    });
                }else if (type === 'exclude'){
                    this.urlExcludeIndex++
                    this.formCustom.urlExcludeItems.push({
                        value: {'path':'',type:'regex'},
                        index: this.urlExcludeIndex,
                        status: 1
                    });
                }
                
            },
            handleRemove (urlType,index) {
                // console.log(index)
                if (urlType === 'include'){
                    this.shownformCustomUrlIncludeItems[index].status = 0;
                }else if (urlType === 'exclude') {
                    this.shownformCustomUrlExcludeItems[index].status = 0;
                }
            },
            modalOk (name) {
                let self = this
                // check 项目 是否为空
                self.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log('验证成功')

                        // console.log(self.formCustom.itemName)
                        // console.log(self.shownformCustomUrlIncludeItems)
                        // console.log(self.shownformCustomUrlExcludeItems)
                        // console.log(self.formCustom.categoriesEdit)
                        // console.log(self.formCustom.statusEdit)
                        // 构造最终结果集
                        let itemInfo = {}
                        itemInfo['rootUrl'] = self.formCustom.itemName
                        itemInfo['category'] =  self.formCustom.categoriesEdit
                        itemInfo['status'] = '未开始'
                        let tempUrlIncludeItems = []
                        let tempUrlExcludeItems = []
                        for (let indexy in self.shownformCustomUrlIncludeItems){
                            tempUrlIncludeItems.push(self.shownformCustomUrlIncludeItems[indexy]['value'])
                        }
                        for (let indexy in self.shownformCustomUrlExcludeItems){
                            tempUrlExcludeItems.push(self.shownformCustomUrlExcludeItems[indexy]['value'])
                        }
                        itemInfo['urlIncludePath'] =  tempUrlIncludeItems
                        itemInfo['urlExcludePath'] =  tempUrlExcludeItems
                        //console.log(itemInfo)

                        // 得到 项目添加的有效数据，并返回到父组件
                        // 判断是新建还是  编辑， formCustom 中包含 uid的是编辑
                        if ( !self.formCustom.uid) {
                            //新建
                            self.$emit('createUrlNewItem',[itemInfo])
                        }else{
                            // 编辑模式，此时需要将uid传递回去
                            self.$emit('createUrlNewItem',{'uid':self.formCustom.uid,'data':itemInfo})
                        }
                         self.$refs[name].resetFields()
                         self.urlIncludeIndex = 1
                         self.urlExcludeIndex = 1
                         self.changeUrlItemWindowShow(false)
                        // self.formCustom.urlIncludeItems =[
                        //        {
                        //            value: {'path':'','type':'regex'},
                        //            index: 1,
                        //            status: 1
                        //        }
                        //],
                        //  self.formCustom.urlExcludeItems = [
                        //     {
                        //         value: {'path':'','type':'regex'},
                        //         index: 1,
                        //         status: 1
                        //     }
                        // ]
                        
                    } else {
                        // console.log('验证失败')
                        self.$Message.error('提交失败');
                        // self.modal1 = true
                    }
                })
            },
            modalCancel () {
                let self = this
                self.urlIncludeIndex = 1
                self.urlExcludeIndex = 1
                self.changeUrlItemWindowShow(false) 
                
            }
        }
    }
</script>
<style scoped>

.Url-itemPage-form-urlIncludePath ,.Url-itemPage-form-urlExcludePath {
    border: 1px dashed #81b165;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 25px

}

.Url-itemPage-form-urlIncludePath-inputs , .Url-itemPage-form-urlExcludePath-inputs{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.Url-itemPage-form-urlIncludePath-inputs-input , .Url-itemPage-form-urlExcludePath-inputs-input{
    flex:4;
}
.Url-itemPage-form-urlIncludePath-inputs-select ,.Url-itemPage-form-urlExcludePath-inputs-select{
    flex: 2;
    margin-left: 5px
}

.Url-itemPage-form-urlIncludePath-inputs-delete, .Url-itemPage-form-urlExcludePath-inputs-delete{
    flex: 1;
    margin-left: 5px
}

.Url-itemPage-form-urlIncludePath .ivu-form-item , .Url-itemPage-form-urlExcludePath .ivu-form-item{
    margin-bottom: 20px;
}


.Url-itemPage-form-category-inside , .Url-itemPage-form-status-inside{
    display: flex
}

.Url-itemPage-form-category-label , .Url-itemPage-form-status-label{
    flex: 1
}
.Url-itemPage-form-category-select, .Url-itemPage-form-status-input{
    flex: 4
}


.Url-itemPage-form  .Url-itemPage-form-category >>> .ivu-form-item-content , .Url-itemPage-form  .Url-itemPage-form-status >>> .ivu-form-item-content {
    margin-left: 10px !important
}

.ivu-form-item{
    margin-bottom: 5px
}
</style>