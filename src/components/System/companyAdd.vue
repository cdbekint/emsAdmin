<template>
  <div class ="company">
  <Form ref="formValidate" :model="company" :rules="ruleValidate" :label-width="100">
    <Form-item label="公司名称" prop="name">
      <Input v-model="company.name" placeholder="请输入姓名"></Input>
    </Form-item>
    <Form-item label="公司logo" class="text-left" >
      <fileLoad :config="uploaderconfig"> </fileLoad>
      <input type="hidden" v-model="company.logoImg">
    </Form-item>
    <Form-item label="图片预览">
      <a :href="murl + company.logoImg" target="_blank" v-if="company.logoImg">
        <img :src="murl+company.logoImg" class="goodsimgthumb" style = "width:125px;height:125px;">
      </a>
    </Form-item>
    <Form-item label="公司类型" prop="type">
      <Select v-model="company.type" placeholder="请选择公司类型">
        <Option value="1">系统公司</Option>
        <Option value="2">模板公司</Option>
        <Option value="3">商家公司</Option>
      </Select>
    </Form-item>
    <Form-item label="公司区域" >
      <Select v-model="areaOne.id" style="width:32%;" placeholder="请选择所在地" @on-change="change($event,1)" :label-in-value=true>
        <Option v-for = "area in areasOne" :value="area.region_id" :key = "area" >{{area.region_name}}</Option>
      </Select>
      <Select v-model="areaTwo.id" style="width:32%;" placeholder="请选择所在地" :disabled="!areaOne.id" @on-change="change($event,2)" :label-in-value=true>
        <Option v-for = "area in areasTwo" :value="area.region_id" :key = "area">{{area.region_name}}</Option>
      </Select>
      <Select v-model="company.areaId" style="width:32%;" placeholder="请选择所在地" :disabled="!areaTwo.id" @on-change="change($event,3)" :label-in-value=true>
        <Option v-for = "area in areasThree" :value="area.region_id" :key = "area">{{area.region_name}}</Option>
      </Select>
    </Form-item>
    <Form-item label="具体地址" prop="address">
      <Input v-model="company.address"></Input>
    </Form-item>
    <Form-item label="管理员用户名" prop="username">
      <Input v-model="company.username"></Input>
    </Form-item>
    <Form-item label="管理员密码" prop="password">
      <Input v-model="company.password"></Input>
    </Form-item>
    <Form-item label="联系方式" prop="phone">
      <Input v-model="company.phone"></Input>
    </Form-item>
    <Form-item label="邮箱" prop="email">
      <Input v-model="company.email"></Input>
    </Form-item>
    <Form-item label="初始化设置" prop="modelCid">
      <Select v-model="company.modelCid" placeholder="请选择模板">
        <Option v-for = "model in models" :key="model" :value="model.modelCid">{{model.modelName}}</Option>
      </Select>
    </Form-item>
    <Form-item label="公司口号" >
      <Input v-model="company.slogan"></Input>
    </Form-item>
    <Form-item label="传真" >
      <Input v-model="company.fax"></Input>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="handleSubmit('company')">提交</Button>
      <Button type="ghost" @click="handleReset('company')" style="margin-left: 8px">重置</Button>
    </Form-item>
  </Form>
  </div>
</template>
<script>
  import fileLoad from '../Util/fileUploader.vue'
  export default {
    data () {
      return {
        company: {
          name: '',
          parentId: '0',
          areaId: '',
          type: '',
          address: '',
          logoImg: '',
          phone: '',
          username: '',
          password: '',
          fax: '',
          email: '',
          modelCid: '',
          slogan: ''
        },
        areaOne: {
          id: null,
          name: ''
        },
        areaTwo: {
          id: null,
          name: ''
        },
        areaThree: {
          id: null,
          name: ''
        },
        areasOne: [],
        areasTwo: [],
        areasThree: [],
        models: [],
        ruleValidate: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '联系方式不能为空', trigger: 'blur' }
          ],
          logoImg: [
            { required: true, message: 'logo不能为空', trigger: 'change' }
          ],
          type: [
            { required: true, message: '选择类型', trigger: 'change' }
          ],
          address: [
            { required: true, message: '输入具体地区', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '输入管理员用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '输入管理员密码', trigger: 'blur' }
          ],
          modelCid: [
            { required: true, message: '选择初始化模板', trigger: 'change' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ]
        },
        uploaderconfig: {
          maxSize: 5120,
          format: ['jpg', 'png', 'jpeg'],
          showUploadList: false,
          parent: 'company',
          child: 'logoImg'
        }
      }
    },
    components: { fileLoad },
    created () {
      this.getArea();
      this.getModel();
    },
    methods: {
      change (e, val) {
        if (val === 1) {
          this.areaOne.name = e.label;
          this.http.get(this.$store.state.prefix + '/sys/area/getRegion?parentId=' + e.value).then((res) => {
            if (res.success === true) {
              this.areasTwo = res.result;
            }
          });
        } else if (val === 2) {
          this.areaTwo.name = e.label;
          this.http.get(this.$store.state.prefix + '/sys/area/getRegion?parentId=' + e.value).then((res) => {
            if (res.success === true) {
              this.areasThree = res.result;
            }
          });
        } else {
          this.areaThree.name = e.label;
        }
      },
      handleSubmit () {
        this.company.address = this.areaOne.name + '-' + this.areaTwo.name + '-' + this.areaThree.name + '-' + this.company.address;
        var ai = JSON.parse(JSON.stringify(this.company))
        console.log(ai)
        if (!ai.name) {
          this.$Notice.info({title: '请完善信息', desc: '请填写活动名称'})
          return false
        }
        if (!ai.areaId) {
          this.$Notice.info({title: '请完善信息', desc: '请填写活动分享介绍'})
          return false
        }
        if (!ai.type) {
          this.$Notice.info({title: '请完善信息', desc: '请上传分享缩略图'})
          return false
        }
        if (!ai.address) {
          this.$Notice.info({title: '请完善信息', desc: '请上传活动大图'})
          return false
        }
        if (!ai.phone) {
          this.$Notice.info({title: '请完善信息', desc: '请选择活动开始时间'})
          return false
        }
        if (!ai.username) {
          this.$Notice.info({title: '请完善信息', desc: '请选择活动结束时间'})
          return false
        }
        if (!ai.password) {
          this.$Notice.info({title: '请完善信息', desc: '请选择分享礼品'})
          return false
        }
        if (!ai.modelCid) {
          this.$Notice.info({title: '请完善信息', desc: '请输入活动定金'})
          return false
        }
        this.http.post(this.$store.state.prefix + '/sys/company/save', this.company).then((res) => {
          if (res.success === true) {
            this.$Message.success('新增成功')
          }
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      getModel () {
        this.http.get(this.$store.state.prefix + '/sys/company/getModelCompanyInfo').then((res) => {
          if (res.success === true) {
            this.models = res.result;
          }
        });
      },
      getArea () {
        this.http.get(this.$store.state.prefix + '/sys/area/getRegion').then((res) => {
          if (res.success === true) {
            this.areasOne = res.result
          }
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .company
    margin-top 20px
    width 70%
</style>
