<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename">
        <Input style="width:60%;margin:auto;" v-model = "searchVal" placeholder="请输入接口地址" >
        </Input>
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
        datas: [],
        searchVal: '',
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
        this.http.get('/api/a/sys/log/list?pageNo=' + pageNo || 1).then(res => {
          if (res.success === true) {
            this.pager.totalPage = res.result.totalPage
            this.pager.pageNo = res.result.pageNo
            this.datas = res.result.list;
            this.companyData = this.datas;
          }
        })
      },
      changePage (e) {
        this.getList(e)
      }
    },
    watch: {
      searchVal: function (nval, oval) {
        if (this.util.isNull(nval) === false) {
          this.companyData = this.companyData.filter(function (item) {
            return item.requestUri.indexOf(nval) !== -1;
          })
        } else {
          this.companyData = this.datas;
        }
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
