<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename" style="overflow: hidden">
        <Button type="info" style="float: right;margin-right:30px;">
          <router-link to="/android" tag = "span">查看最新版本</router-link>
        </Button>
      </div>
    </div>
    <div class="content">
      <Form ref="formValidate" :model="android" class="gifteditform" :rules="Rule" :label-width="100">
        <Form-item label="版本号" prop="versionCode">
          <Input v-model="android.versionCode" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="版本名称" prop="versionName">
          <Input v-model="android.versionName" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="版本描述" prop="versionDesc">
          <Input v-model="android.versionDesc" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="下载地址" prop="versionUrl">
          <Input v-model="android.versionUrl" placeholder="请输入"></Input>
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
    name: 'androidUpdate',
    data () {
      return {
        android: {
          versionCode: 0,
          versionName: '',
          versionDesc: '',
          versionUrl: '',
          packgeSize: ''
        },
        Rule: {
          versionCode: [
            {required: true, message: '商品名称不能为空', trigger: 'blur'}
          ],
          versionName: [
            {required: true, message: '商品名称不能为空', trigger: 'blur'}
          ],
          versionDesc: [
            {required: true, message: '商品名称不能为空', trigger: 'blur'}
          ],
          versionUrl: [
            {required: true, message: '商品名称不能为空', trigger: 'blur'}
          ],
          versionSize: [
            {required: true, message: '图片必须上传'}
          ]
        },
        uploaderconfig: {
          maxSize: 5120,
          format: ['jdk'],
          showUploadList: false,
          parent: 'android',
          child: 'packgeSize'
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.http.post('/api/gift', this.android).then(res => {
              if (res.error === false) {
                this.$Message.success('保存成功')
                this.router.push('/gift')
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
