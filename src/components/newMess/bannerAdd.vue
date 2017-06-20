<template>
  <div class="companyList">
    <div class="content-title">
      <div class="titlename" style="overflow: hidden">
        <Tag color="blue" style="float: right;margin-right:30px;width:100px;height:30px;font-size:1.0em;line-height: 30px;">
          <router-link to="/bannerList" tag = "span">Banner列表</router-link>
        </Tag>
      </div>
    </div>
    <div class="content" style = "width:70%;">
      <Form ref="formValidate" :model="datas" class="gifteditform" :rules="Rule" :label-width="100">
        <Form-item label="图片" class="text-left" >
          <fileLoad :config="uploaderconfig"> </fileLoad>
          <input type="hidden" v-model="datas.img">
        </Form-item>
        <Form-item label="图片预览">
          <a :href="murl + datas.img" target="_blank" v-if="datas.img">
            <img :src="murl+datas.img" alt="" class="goodsimgthumb" style = "width:125px;height:125px;">
          </a>
        </Form-item>
        <Form-item label="链接" prop="groupId">
          <Input v-model="datas.sort" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="正标题" >
          <Input v-model="datas.sort" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="正标题" >
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
  import fileLoad from '../Util/fileUploader.vue'
  export default {
    name: 'menuGroupAdd',
    components: { fileLoad },
    data () {
      return {
        datas: {
          name: '',
          parentId: 1,
          permission: '',
          isShow: 0,
          groupId: '',
          sort: 1,
          img:''
        },
        groupList: [],
        uploaderconfig: {
          maxSize: 102400,
          format: ['jpg', 'png', 'jpeg'],
          showUploadList: false,
          parent: 'datas',
          child: 'img'
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
