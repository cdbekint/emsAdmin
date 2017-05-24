<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename">
        <span>选择类型：</span>
        <Select v-model="searchVal.type" slot="prepend" style="width:30%;">
          <Option value="1">系统公司</Option>
          <Option value="2">模板公司</Option>
          <Option value="3">商家公司</Option>
        </Select>
        <span style = "margin-left:25px;">选择是否可用：</span>
        <Select v-model="searchVal.use" slot="prepend" style="width:30%;">
          <Option value="1">可用</Option>
          <Option value="2">不可用</Option>
        </Select>
        <Button type="primary" icon="ios-search" @click = "search(1)">查询</Button>
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
    name: 'companyList',
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
            title: '公司名称',
            key: 'name'
          },
          {
            title: '公司logo',
            key: 'logoImg',
            className: 'giftavater-wrapper',
            render (row) {
              return '<img class="giftavater" :src="murl + row.logoImg" style="width:60px;height:60px;">'
            }
          },
          {
            title: '公司地址',
            key: 'address'
          },
          {
            title: '是否可用',
            key: 'useable',
            render (row) {
              return row.useable === 0 ? '<span>不可用</span>' : '<span>可用</span>'
            }
          },
          {
            title: '公司口号',
            key: 'slogan'
          },
          {
            title: '操作',
            key: 'action',
            render (row) {
              return '<i-button type="text" size="small" @click="update(row.id)">修改</i-button>'
            }
          }
        ],
        companyData: [],
        searchVal: {
          type: 1,
          use: 1
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
        this.http.get(this.$store.state.prefix + '/sys/company/list?type=1&pageNo=' + pageNo || 1).then(res => {
          if (res.success === true) {
            this.pager.totalPage = res.result.totalPage
            this.pager.pageNo = res.result.pageNo
            this.companyData = res.result.list
          }
        })
      },
      search (pageNo) {
        var type = this.searchVal.type;
        var use = this.searchVal.use;
        this.http.get(this.$store.state.prefix + '/sys/company/list?type=' + type + '&useable=' + use + '&pageNo=' + pageNo || 1).then(res => {
          if (res.success === true) {
            this.pager.totalPage = res.result.totalPage
            this.pager.pageNo = res.result.pageNo
            this.companyData = res.result.list
          }
        })
      },
      changePage () {
        this.getList(this.pager.pageNo)
      },
      update (id) {
        this.router.push({path: '/companyEdit', query: {id: id}});
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
