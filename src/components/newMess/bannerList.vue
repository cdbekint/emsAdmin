<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename" style="overflow: hidden">
        <Tag color="blue" style="float: right;margin-right:30px;width:100px;height:30px;font-size:1.0em;line-height: 30px;">
          <router-link to="/bannerAdd" tag = "span">添加Banner</router-link>
        </Tag>
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
    name: 'menuGroupList',
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
            title: '图片',
            key: 'name'
          },
          {
            title: '链接',
            key: 'permission'
          },
          {
            title: '正标题',
            key: 'groupName'
          },
          {
            title: '副标题',
            key: 'groupName'
          },
          {
            title: '操作',
            key: 'action',
            render (row) {
              return '<i-button type="text" size="small" @click = "update(row.id)">修改</i-button>' +
                '<i-button type="text" size="small" @click="del(row.id)">删除</i-button>'
            }
          }
        ],
        companyData: [],
        pager: {
          totalPage: 23,
          pageNo: 1
        }
      }
    },
    created () {
      this.getList(1)
    },
    methods: {
      getList (pageNo) {
        this.http.get(this.$store.state.prefix + '/sys/menu/list?pageNo=' + pageNo || 1).then(res => {
          if (res.success === true) {
            this.companyData = res.result.list
          }
        })
      },
      update (id) {
        this.router.push({path: '/menuEdit', query: {id: id}});
      },
      del (id) {
        this.http.post(this.$store.state.prefix + '/sys/menu/delete', {id: id}).then(res => {
          if (res.success === true) {
            this.$Message.success('删除成功');
            this.getList(1);
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
