<template>
  <div class="staffList">
    <div class="content-title">
      <div class="titlename" style="margin:10px;">
        <Input style="width:40%;margin:auto;margin-right:20px;" placeholder="请输入员工姓名" v-model="staffName"></Input>
        <Input style="width:40%;margin:auto;" placeholder="请输入公司名称" v-model="companyName"></Input>
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
                return '<span>离职</span>'
              } else {
                return '<span>在职</span>'
              }
            }
          },
          {
            title: '联系方式',
            key: 'phone'
          }
        ],
        companyData: [],
        datas: [],
        staffName: '',
        companyName: '',
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
        this.http.get('/api/a/operation/getAllUserInfo').then(res => {
          if (res.result.count > 0) {
            this.pager = res.result
            this.datas = res.result.list
            this.companyData = this.datas
          }
        })
      },
      changePage () {
        this.getList(this.pager.pageNo)
      }
    },
    watch: {
      companyName: function (nval, oval) {
        if (this.util.isNull(nval) === false) {
          this.companyData = this.companyData.filter(function (item) {
            return item.name.indexOf(nval) !== -1;
          })
          if (this.companyData.length === 0) {
            this.companyData = this.datas;
          }
        } else {
          this.companyData = this.datas;
        }
      },
      staffName: function (nval, oval) {
        if (this.util.isNull(nval) === false) {
          this.companyData = this.companyData.filter(function (item) {
            return item.name.indexOf(nval) !== -1;
          })
          if (this.companyData.length === 0) {
            this.companyData = this.datas;
          }
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
