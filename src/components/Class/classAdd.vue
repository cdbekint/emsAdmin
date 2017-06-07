<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename" style="overflow: hidden">
        <Tag color="blue" style="float: right;margin-right:30px;width:100px;height:30px;font-size:1.0em;line-height: 30px;">
          <router-link to="/classList" tag = "span">课程列表</router-link>
        </Tag>
      </div>
    </div>
    <div class="content" style = "width:70%;">
      <Form ref="formValidate" :model="datas" class="gifteditform" :rules="Rule" :label-width="100">
        <Form-item label="主讲人" prop="groupId">
          <Input v-model="datas.sort" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="标题" prop="groupId">
          <Input v-model="datas.sort" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="封面" class="text-left" >
          <uploader :config="uploaderconfig"> </uploader>
          <input type="hidden" v-model="datas.img">
        </Form-item>
        <Form-item label="图片预览">
          <a :href="murl + datas.logoImg" target="_blank" v-if="datas.logoImg">
            <img :src="murl+datas.logoImg" alt="" class="goodsimgthumb" style = "width:125px;height:125px;">
          </a>
        </Form-item>
        <Form-item label="简介" prop="groupId">
          <Input type="textarea" v-model="datas.sort" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="热度" >
          <Input v-model="datas.sort" placeholder="请输入"></Input>
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
        datas: {
          name: '',
          parentId: 1,
          permission: '',
          isShow: 0,
          groupId: '',
          sort: 1
        },
        groupList: [],
        uploaderconfig: {
          maxSize: 102400,
          showUploadList: false,
          parent: 'android',
          size: 'packgeSize',
          child: 'versionUrl'
        },
        Rule: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.http.get(this.$store.state.prefix + '/sys/datas/list').then(res => {
        if (res.success === true) {
          this.groupList = res.result;
        }
      })
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.http.post(this.$store.state.prefix + '/sys/menu/save', this.datas).then(res => {
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
