<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename" style="overflow: hidden">
        <Tag color="blue" style="float: right;margin-right:30px;width:100px;height:30px;font-size:1.0em;line-height: 30px;">
          <router-link to="/androidUpdate" tag = "span">更新版本</router-link>
        </Tag>
      </div>
    </div>
    <div class="content">
      <Table border :columns="companyCol" :data="companyData" class="giftlistable"></Table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'android',
    data () {
      return {
        companyCol: [
          {
            title: '序号',
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '版本名称',
            key: 'versionName'
          },
          {
            title: '版本号',
            key: 'versionCode'
          },
          {
            title: '版本简介',
            key: 'versionDesc'
          },
          {
            title: '发布时间',
            key: 'versionTime'
          },
          {
            title: '应用包大小',
            key: 'packgeSize'
          },
          {
            title: '下载地址',
            key: 'versionUrl',
            render (row) {
              return '<a target="_blank" :href = "murl + row.versionUrl">{{row.versionUrl}}</a>'
            }
          }
        ],
        companyData: []
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.http.get('/api/a/base/baseVersion/findLatest').then(res => {
          if (res.success === true) {
            this.companyData.push(res.result)
          }
        })
      }
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .companyList
    .titlename
      margin 10px 0
      font-size 14px
  .ivu-table
    td,th
      text-align:center
      .giftavater
        width:100px
      height:auto
      max-height:100px
</style>
