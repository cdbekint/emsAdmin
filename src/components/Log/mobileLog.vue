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
            title: '用户',
            key: 'phoneNum'
          },
          {
            title: '请求时间',
            key: 'startDate'
          },
          {
            title: '软件版本',
            key: 'appVersion'
          },
          {
            title: '手机类型',
            key: 'phoneType'
          },
          {
            title: '错误码',
            key: 'errorCode'
          },
          {
            title: '错误日志',
            key: 'errorInfo'
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
      this.getList()
    },
    methods: {
      getList () {
        this.http.get(this.$store.state.prefix + '/sys/log/getMobileLog?systemType=1').then(res => {
          if (Object.keys(res.result).length > 0) {
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
