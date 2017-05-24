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
              return '<img class="giftavater" :src="murl + row.logoImg"/>'
            }
          },
          {
            title: '公司地址',
            key: 'address'
          },
          {
            title: '公司口号',
            key: 'slogan'
          },
          {
            title: '操作',
            key: 'action',
            render (row) {
              return '<i-button type="text" size="small" @click="del(row.id)">删除</i-button>'
            }
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
        this.http.get(this.$store.state.prefix + '/sys/company/list?pageNo=' + pageNo || 1).then(res => {
          if (res.result.count > 0) {
            this.pager = res.result
            this.companyData = res.result.list
          }
        })
      },
      changePage () {
        this.getList(this.pager.pageNo)
      },
      del (id) {
        this.http.delete('/gift', {id: id}).then(res => {
          if (res.error === false) {
            this.$Message.success('删除成功');
            this.getList(1);
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
