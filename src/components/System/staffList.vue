<template>
  <div class="staffList">
    <div class="content-title">
      <div class="titlename" style="margin:10px;">
        <span>输入员工姓名或者联系电话：</span>
        <Input v-model="searchVal" slot="prepend" style="width:60%;">
        </Input>
        <Button type="primary" icon="ios-search" @click = "search()">查询</Button>
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
    name: 'staffList',
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
            title: '员工名称',
            key: 'name'
          },
          {
            title: '公司名称',
            key: 'companyName'
          },
          {
            title: '头像',
            key: 'headImg',
            className: 'giftavater-wrapper',
            render (row) {
              return '<img class="giftavater" :src="murl + row.headImg" style = "width:30px;height:30px;"/>'
            }
          },
          {
            title: '离职情况',
            key: 'isDimission',
            render (row) {
              if (row.isDimission === 0) {
                return '<img style="width:25px" src="../../static/images/staffon.png" title="在职" alt="在职" >'
              } else {
                return '<img style="width:25px" src="../../static/images/staffoff.png" title="离职" alt="离职">'
              }
            }
          },
          {
            title: '联系方式',
            key: 'phone'
          }
        ],
        companyData: [],
        searchVal: '',
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
        this.http.get(this.$store.state.prefix + '/operation/getAllUserInfo').then(res => {
          if (res.success === true) {
            this.pager = res.result
            this.companyData = res.result.list
          }
        })
      },
      search (pageNo) {
        this.http.get(this.$store.state.prefix + '/operation/getAllUserInfo?name=' + this.searchVal).then(res => {
          if (res.success === true) {
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
