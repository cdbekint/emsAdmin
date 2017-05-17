<template>
  <div id="app">
    <vheader class="header-wrapper" :userInfo="userInfo"></vheader>
    <div class="layout" v-if = "$store.state.token">
      <div class="layout-content">
        <Row>
          <i-col span="5">
            <Menu active-name="1-1" width="auto" :open-names="['1']">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  账户系统
                </template>
                <Menu-item name="1-1">
                  <router-link to="/companyList" tag = "div">公司列表</router-link>
                </Menu-item>
                <Menu-item name="1-2">
                  <router-link to="/companyAdd" tag = "div">新增公司</router-link>
                </Menu-item>
                <Menu-item name="1-3">
                  <router-link to="/companyInfo" tag = "div">公司信息</router-link>
                </Menu-item>
                <Menu-item name="1-4">
                  <router-link to="/systemInfo" tag = "div">系统用户查看</router-link>
                </Menu-item>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  财务系统
               </template>
                <Menu-item name="2-1">
                  <router-link to="/companyAdd" tag = "div">新增公司</router-link>
                </Menu-item>
                <Menu-item name="2-2">
                  <router-link to="/companyList" tag = "div">公司列表</router-link>
                </Menu-item>
                <Menu-item name="2-3">
                  <router-link to="/companyInfo" tag = "div">公司信息</router-link>
                </Menu-item>
                <Menu-item name="2-4">
                  <router-link to="/systemInfo" tag = "div">系统用户查看</router-link>
                </Menu-item>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-analytics"></Icon>
                  运营监控
                </template>
                <Menu-item name="3-1">
                  <router-link to="/systemLog" tag = "div">系统日志列表</router-link>
                </Menu-item>
                <Menu-item name="3-2">
                  <router-link to="/mobileLog" tag = "div">移动端日志列表</router-link>
                </Menu-item>
                <Menu-item name="3-3">
                  <router-link to="/android" tag = "div">安卓版本管理</router-link>
                </Menu-item>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-analytics"></Icon>
                  系统配置
                </template>
                <Menu-item name="4-1">
                  <router-link to="/menuGroupList" tag = "div">菜单分组管理</router-link>
                </Menu-item>
                <Menu-item name="4-2">
                  <router-link to="/menuList" tag = "div">菜单设置</router-link>
                </Menu-item>
                <Menu-item name="4-3">
                  <router-link to="/page" tag = "div">推广页面设置</router-link>
                </Menu-item>
              </Submenu>
            </Menu>
          </i-col>
          <i-col span="19">
            <router-view></router-view>
          </i-col>
        </Row>
      </div>
    </div>

    <div v-else>
      <login>

      </login>
    </div>
    <vfooter></vfooter>
  </div>
</template>

<script  type="text/ecmascript-6">
  import vheader from '@/components/Main/Header'
  import login from './Login.vue'
  import vfooter from '@/components/Main/Footer'
  export default {
    name: 'admin',
    data () {
      return {
        title: '营销系统',
        userInfo: {
          account: {},
          company: {
            companyName: ''
          },
          customer: {},
          employee: {}
        }
      }
    },
    components: { vheader, login, vfooter },
    methods: {
    },
    created () {
/*      this.http.get('/api/pubInfo/user').then(res => {
        this.userInfo = res.result
      })
      */
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus">
  html,
  body
    background:#E7E8EB !important

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
  .header-wrapper
    width:100%
    height:60px
    background:rgb(255,255,255)
    border-top:3px solid #44B549
    border-bottom:1px solid #eee
  .layout
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  .layout-logo
    width: 100px
    height: 30px
    background: #5b6270
    border-radius: 3px
    float: left
    position: relative
    top: 15px
    left: 20px
  .layout-nav
    width: 420px
    margin: 0 auto
  .layout-assistant
    width: 300px
    margin: 0 auto
    height: inherit

  .layout-breadcrumb
    padding: 10px 15px 0

  .layout-content
    min-height: 200px
    margin: 15px
    overflow: hidden
    background: #fff
    border-radius: 4px

  .layout-content-main
    padding: 10px

  .layout-copy
    text-align: center
    padding: 10px 0 20px
    color: #9ea7b4

</style>
