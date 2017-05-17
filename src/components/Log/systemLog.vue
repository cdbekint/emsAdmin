<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename">
        <Input style="width:60%;margin:auto;" placeholder="请输入查询公司名称">
        <Button slot="append" icon="ios-search"></Button>
        </Input>
      </div>
    </div>
    <div class="content">
      <Table border :columns="companyCol" :data="companyData" class="giftlistable"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pager.totalPage" :current="pager.pageNo" @on-change="changePage"></Page>
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
        this.http.get('/api/a/sys/log/list?page=' + pageNo || 1).then(res => {
          if (res.result.count > 0) {
            this.pager = res.result
            this.companyData = res.result.list
          }
        })
      },
      changePage () {
        this.getList(this.pager.pageNo)
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
