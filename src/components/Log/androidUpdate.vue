<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename" style="overflow: hidden">
          <Tag color="blue" style="float: right;margin-right:30px;width:100px;height:30px;font-size:1.0em;line-height: 30px;">
          <router-link to="/android" tag = "span">查看最新版本</router-link>
        </Tag>
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
        <Form-item label="下载包" class="text-left" >
          <uploader :config="uploaderconfig"></uploader>
        </Form-item>
        <Form-item label="应用大小" >
          <Input v-model="android.packgeSize"></Input>
        </Form-item>
        <Form-item label="下载地址" >
          <Input v-model="android.versionUrl" ></Input>
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
    name: 'androidUpdate',
    components: { uploader },
    data () {
      return {
        android: {
          versionCode: '',
          versionName: '',
          versionDesc: '',
          versionUrl: '',
          packgeSize: 0
        },
        Rule: {
          versionName: [
            {required: true, message: '版本名称不能为空', trigger: 'blur'}
          ],
          versionDesc: [
            {required: true, message: '版本描述不能为空', trigger: 'blur'}
          ]
        },
        uploaderconfig: {
          maxSize: 5120,
          format: ['jpg', 'apk'],
          showUploadList: false,
          parent: 'android',
          size: 'packgeSize',
          child: 'versionUrl'
        }
      }
    },
    methods: {
      handleSubmit (name) {
        var result = JSON.parse(JSON.stringify(this.android));
        result['versionCode'] = ~~(result['versionCode']);
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.http.post(this.$store.state.prefix + '/base/baseVersion/save', result).then(res => {
              if (res.success === true) {
                this.$Message.success('保存成功')
                this.router.push('/android')
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
