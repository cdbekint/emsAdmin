<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename" style="overflow: hidden">
        <Button type="info" style="float: right;margin-right:30px;">
          <router-link to="/menuGroupAdd" tag = "span">添加分组</router-link>
        </Button>
      </div>
    </div>
    <div class="content">
      <Table border :columns="companyCol" :data="companyData" class="giftlistable"></Table>
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
            title: '名称',
            key: 'name'
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
        companyData: []
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.http.get('/api/a/sys/menuGroup/list').then(res => {
          if (res.success === true) {
            this.companyData = res.result
          }
        })
      },
      update (id) {
        this.router.push({path: '/menuGroupEdit', query: {id: id}});
      },
      del (id) {
        this.http.delete('/api/a/sys/menuGroup/delete', {id: id}).then(res => {
          if (res.success === true) {
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
