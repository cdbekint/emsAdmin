<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename" style="overflow: hidden">
        <Tag color="blue" style="float: right;margin-right:30px;width:100px;height:30px;font-size:1.0em;line-height: 30px;">
          <router-link to="/menuAdd" tag = "span">新增菜单分组</router-link>
        </Tag>
        <Tag color="blue" style="float: right;margin-right:30px;width:100px;height:30px;font-size:1.0em;line-height: 30px;">
          <router-link to="/menuList" tag = "span">菜单分组列表</router-link>
        </Tag>
      </div>
    </div>
    <div class="content" style = "width:70%;">
      <Form ref="formValidate" :model="menuGroup" class="gifteditform" :rules="Rule" :label-width="100">
        <Form-item label="名称" prop="name">
          <Input v-model="menuGroup.name" placeholder="请输入"></Input>
        </Form-item>


        <Form-item>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button type="ghost" style="margin-left: 8px" @click="handleReset('formValidate')">取消</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'menuGroupAdd',
    data () {
      return {
        menuGroup: {
          name: '',
          id: ''
        },
        Rule: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      var query = this.util.getQuery(location.hash)
      this.http.get('/api/a/sys/menu/get?id=' + query.id).then(res => {
        if (res.success === true) {
          this.menuGroup = res.result
        }
      })
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.http.post('/api/a/sys/menu/save', this.menuGroup).then(res => {
              if (res.success === true) {
                this.$Message.success('保存成功')
                this.router.push('/menuList')
              }
            })
          } else {
            this.$Message.error('验证失败')
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
