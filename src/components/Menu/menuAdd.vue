<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename" style="overflow: hidden">
        <Button type="info" style="float: right;margin-right:30px;">
          <router-link to="/menuGroupList" tag = "span">菜单列表</router-link>
        </Button>
      </div>
    </div>
    <div class="content" style = "width:70%;">
      <Form ref="formValidate" :model="menuGroup" class="gifteditform" :rules="Rule" :label-width="100">
        <Form-item label="名称" prop="name">
          <Input v-model="menuGroup.name" placeholder="请输入"></Input>
        </Form-item>

        <Form-item label="链接" prop="href">
          <Input v-model="menuGroup.href" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="权限标记" prop="permission">
          <Input v-model="menuGroup.permission" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="打开目标">
          <Input v-model="menuGroup.target" placeholder="请输入"></Input>
        </Form-item>

        <Form-item label="图标" class="text-left" >
          <uploader :config="uploaderconfig"> </uploader>
          <input type="hidden" v-model="menuGroup.icon">
        </Form-item>
        <Form-item label="图片预览">
          <a :href="murl + menuGroup.icon" target="_blank" v-if="menuGroup.icon">
            <img :src="murl+menuGroup.icon" alt="" class="goodsimgthumb">
          </a>
        </Form-item>
        <Form-item label="是否显示" prop="isShow">
          <Select v-model="menuGroup.isShow" placeholder="请选择">
            <Option value="0">不显示</Option>
            <Option value="1">显示</Option>
          </Select>
        </Form-item>
        <Form-item label="分组" prop="groupId">
          <Select v-model="menuGroup.groupId" placeholder="请选择">
            <Option value="0">不显示</Option>
          </Select>
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
  import uploader from '../Util/Uploader'
  export default {
    name: 'menuGroupAdd',
    components: { uploader },
    data () {
      return {
        menuGroup: {
          name: '',
          parentId: '',
          href: '',
          permission: '',
          target: '',
          icon: '',
          isShow: 0,
          groupId: '',
          sort: 0
        },
        Rule: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        },
        uploaderconfig: {
          maxSize: 5120,
          format: ['jpg', 'png', 'jpeg'],
          showUploadList: false,
          parent: 'menuGroup',
          child: 'icon'
        }
      }
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
