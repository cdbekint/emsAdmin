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
      <Row class="rows">
        <Col span="6" class="line1">版本名称</Col>
        <Col span="18" class="line2">{{android.versionName}}</Col>
      </Row>
      <Row class="rows">
        <Col span="6" class="line1">版本号</Col>
        <Col span="18" class="line2">{{android.versionCode}}</Col>
      </Row>
      <Row class="rows">
        <Col span="6" class="line1 line3">版本名简介</Col>
        <Col class="line2 line4">
          <p v-for="x in desc">{{x}}</p>
        </Col>
      </Row>
      <Row class="rows">
        <Col span="6" class="line1">发布时间</Col>
        <Col span="18" class="line2">{{new Date(android.versionTime)}}</Col>
      </Row>
      <Row class="rows">
        <Col span="6" class="line1">应用包大小</Col>
        <Col span="18" class="line2">{{android.packgeSize}}</Col>
      </Row>
      <Row class="rows">
        <Col span="6" class="line1">下载地址</Col>
        <Col span="18" class="line2">
          <a :href = "murl + android.versionUrl">{{murl + android.versionUrl}}</a>'
        </Col>
      </Row>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'android',
    data () {
      return {
//        companyCol: [
//          {
//            title: '版本名称',
//            key: 'versionName'
//          },
//          {
//            title: '版本号',
//            key: 'versionCode'
//          },
//          {
//            title: '版本简介',
//            key: 'versionDesc',
//            width: '50%'
//          },
//          {
//            title: '发布时间',
//            key: 'versionTime',
//            width: '15%',
//            render (row) {
//              return '<span>{{new Date(row.versionTime)}}</span>'
//            }
//          },
//          {
//            title: '应用包大小',
//            key: 'packgeSize'
//          },
//          {
//            title: '下载地址',
//            key: 'versionUrl',
//            width: '15%',
//            render (row) {
//              return '<a class="giftavater" :href = "murl + row.versionUrl">{{murl + row.versionUrl}}</a>'
//            }
//          }
//        ],
        android: null,
        desc: []
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.http.get(this.$store.state.prefix + '/base/baseVersion/findLatest').then(res => {
          if (res.success === true) {
            this.android = res.result
            this.android.packgeSize = (~~this.android.packgeSize / 1000000).toFixed(2) + '  M'
            this.desc = this.android.versionDesc.match(/(\d.*)/g);
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
  color = #52A8FF
  .rows
    width 90%
    margin auto
    .line1
      height:60px;
      border:2px solid color;
      font-size:1.3em;
      line-height: 60px;
      border-bottom: 0px
    .line2
      height:60px;
      font-size:1.3em;
      border:2px solid color;
      line-height: 60px;
      border-left 0px
      border-bottom: 0px
    .line3
      height 250px
      line-height 250px
    .line4
      height 250px
      line-height 250px
      p
        height 30px
        line-height 100px

</style>
