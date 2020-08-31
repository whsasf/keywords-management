<template>
  <div class="singnin">
    <i-form ref="formInline" :model="formInline" :rules="ruleInline">
        <i-formItem prop="user">
            <i-input type="text" v-model="formInline.user" placeholder="用户名为公司邮箱" :clearable=true>
                <i-icon type="ios-mail-outline" slot="prepend"></i-icon>
            </i-input>
        </i-formItem>
        <i-formItem prop="password">
            <i-input type="password" v-model="formInline.password" placeholder="密码" :clearable=true>
                <i-icon type="ios-lock-outline" slot="prepend"></i-icon>
            </i-input>
        </i-formItem>
        <i-formItem>
            <i-button type="primary" @click="handleSubmit('formInline')">登录</i-button>
            <div class="singnin-signup">
              <p>还没有账户？</p>
              <router-link to='/Account/Signup'>注册账户</router-link>
            </div>
        </i-formItem>
    </i-form>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Signin',
  data () {
      return {
          formInline: {
              user: 'test@dianbaobao.com',
              password: '123456'
          },
          ruleInline: {
              user: [
                  { required: true, message: '用户名不能为空', trigger: 'blur' },
                  { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
              ],
              password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { type: 'string', min: 6, message: '密码长度要大于6', trigger: 'blur' }
              ]
          }
      }
  },
    computed: {
    ...mapState(['currentUserName','currentUserDepartment'])
  },
  methods: {
      ...mapMutations(['changecurrentUserName','changeCurrentUserDepartment']),
      handleSubmit(name) {
        let self = this
          self.$refs[name].validate((valid) => {
              if (valid) {
                  self.$Message.success('登录成功!');
                  self.changecurrentUserName(self.formInline.user)
                  setTimeout(() => {self.$router.push('/Project')}, 2)
              } else {
                  self.$Message.error('登录失败!');
              }
          })
      }
  }
}
</script>

<style scoped>
</style>
