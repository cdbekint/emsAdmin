<template>
  <div class ="company">
  <Form ref="formValidate" :model="company" :rules="ruleValidate" :label-width="80">
    <Form-item label="姓名" prop="name">
      <Input v-model="company.name" placeholder="请输入姓名"></Input>
    </Form-item>
    <Form-item label="公司logo" class="text-left" prop="logoImg">
      <uploader :config="uploaderconfig"> </uploader>
      <input type="hidden" v-model="company.logoImg">
    </Form-item>
    <Form-item label="图片预览">
      <a :href="murl + company.logoImg" target="_blank" v-if="company.logoImg">
        <img :src="murl+company.logoImg" alt="" class="goodsimgthumb">
      </a>
    </Form-item>
    <Form-item label="邮箱" prop="mail">
      <Input v-model="company.mail" placeholder="请输入邮箱"></Input>
    </Form-item>
    <Form-item label="城市" prop="city">
      <Select v-model="company.city" placeholder="请选择所在地">
        <Option value="shenzhen">深圳市</Option>
      </Select>
    </Form-item>
    <Form-item label="选择日期">
      <Row>
        <Col span="11">
        <Form-item prop="date">
          <Date-picker type="date" placeholder="选择日期" v-model="company.date"></Date-picker>
        </Form-item>
        </Col>
        <Col span="2" style="text-align: center">-</Col>
        <Col span="11">
        <Form-item prop="time">
          <Time-picker type="time" placeholder="选择时间" v-model="company.time"></Time-picker>
        </Form-item>
        </Col>
      </Row>
    </Form-item>
    <Form-item label="性别" prop="gender">
      <Radio-group v-model="company.gender">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
      </Radio-group>
    </Form-item>
    <Form-item label="爱好" prop="interest">
      <Checkbox-group v-model="company.interest">
        <Checkbox label="吃饭"></Checkbox>
        <Checkbox label="睡觉"></Checkbox>
        <Checkbox label="跑步"></Checkbox>
        <Checkbox label="看电影"></Checkbox>
      </Checkbox-group>
    </Form-item>
    <Form-item label="介绍" prop="desc">
      <Input v-model="company.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="handleSubmit('company')">提交</Button>
      <Button type="ghost" @click="handleReset('company')" style="margin-left: 8px">重置</Button>
    </Form-item>
  </Form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        company: {
          name: '',
          parentId: '',
          areaId: '',
          type: '',
          address: '',
          logoImg: '',
          phone: '',
          username: '',
          password: [],
          fax: '',
          email: '',
          modelCid: '',
          slogan: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          parentId: [
            { required: true, message: '没有则为0', trigger: 'blur' },
          ],
          areaId: [
            { required: true, message: '', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          address: [
            { required: true, type: 'array', message: '至少选择一个爱好', trigger: 'change' },
          ],
          logoImg: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          phone: [
            { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
          ]
        },
        uploaderconfig: {
          maxSize: 5120,
          format: ['jpg', 'png', 'jpeg'],
          showUploadList: false,
          parent: 'Goods',
          child: 'goodsImg'
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .company
    margin-top 20px
</style>
