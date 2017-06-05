<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename">
        <span>选择类型：</span>
        <Select v-model="searchVal.type" slot="prepend" style="width:30%;">
          <Option value="1">安卓</Option>
          <Option value="2">苹果</Option>
          <Option value="3">web</Option>
          <Option value="4">异常</Option>
          <Option value="5">推送日志</Option>
          <Option value="6">推送</Option>
        </Select>
        <span style = "margin-left:25px;">输入创建者：</span>
        <Input style="width:30%;margin:auto;" v-model = "searchVal.name" >
        </Input>
        <Button type="primary" icon="ios-search" @click = "search(1)">查询</Button>
      </div>
    </div>
    <div class="content">
      <Table border :columns="companyCol" :data="companyData" class="giftlistable"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pager.totalPage" :current="pager.pageNo" @on-change="changePage($event)"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'systemLog',
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
            title: '接口',
            key: 'requestUri'
          },
          {
            title: '参数',
            key: 'params'
          },
          {
            title: '时间',
            key: 'endDate'
          },
          {
            title: '平台',
            key: 'userAgent'
          },
          {
            title: '异常',
            key: 'exception'
          },
          {
            title: '来源IP',
            key: 'remoteAddr'
          }
        ],
        companyData: [],
        searchVal: {
          type: 1,
          use: ''
        },
        pager: {
          totalPage: 1,
          pageNo: 1
        }
      }
    },
    created () {
      this.getList(1)
    },
    methods: {
      getList (pageNo) {
        this.http.get(this.$store.state.prefix + '/sys/log/list?pageNo=' + pageNo || 1).then(res => {
          if (res.success === true) {
            this.pager.totalPage = res.result.totalPage
            this.pager.pageNo = res.result.pageNo
            this.companyData = res.result.list;
          }
        })
      },
      search (pageNo) {
        var type = this.searchVal.type;
        var user = this.searchVal.use;
        this.http.get(this.$store.state.prefix + '/sys/log/list?type=' + type + '&createName=' + user + '&pageNo=' + pageNo || 1).then(res => {
          if (res.success === true) {
            this.pager.totalPage = res.result.totalPage
            this.pager.pageNo = res.result.pageNo
            this.companyData = res.result.list
          }
        })
      },
      changePage (e) {
        this.getList(e)
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
