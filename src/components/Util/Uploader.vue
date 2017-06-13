<template>
<div class="uploader" ref="uploader" id="qiniu-container">

   <Upload action="http://up.qiniu.com/" encyte="multipart/form-data" ref="upload"
        :show-upload-list="config.showUploadList"
        :format="config.format"
        :max-size="config.maxSize"
        :data="{token: $store.state.qiniutoken,key:fileName}"
        :on-success="uploadSuccess"
        :on-progress="uploadProgress"
        :before-upload="uploadBefore"
        :on-error="uploadError"
        :on-exceeded-size="uploaderSize"
        >
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
     <Progress v-if="item.showProgress" :percent="item.percentage"></Progress>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Uploader',
  props: ['config', 'name'],
  data () {
    return {
      item: {
        showProgress: false,
        percentage: 0
      },
      fileName: ''
    }
  },
  watch: {
    name (val) {
      var name = val.replace(/\./g, '_')
      this.fileName = this.$store.state.userName + '/英雄联盟生态系统_' + name + '.apk';
    }
  },
  created () {
    this.http.get(this.$store.state.prefix + '/sys/common/getUploadToken').then(res => {
      if (res.success === true) {
        this.$store.state.qiniutoken = res.result.token
        this.util.setCookie('qiniutoken', res.result.token)
      }
    })
  },
  methods: {
    uploadBefore (file) {
      this.item.showProgress = true
    },
    uploadSuccess (res, file) {
      this.item.showProgress = false
      if (this.config.parent !== undefined) {
        var _this = this;
        for (var i = 0; i < 100; i++) {
          if (_this[this.config.parent] === undefined) {
            _this = _this.$parent
          } else {
            if (this.config.child !== void 0) {
              _this[this.config.parent][this.config.child] = res.key
            }
            if (this.config.size !== void 0) {
              _this[this.config.parent][this.config.size] = file.size
            }
            break
          }
        }
      } else if (this.config.parent) {
        this.$parent[this.config.parent] = res.key
      }
    },
    uploadError (error, res, file) {
      this.item.showProgress = false
      console.log(error)
      this.$Notice.error('文件上传失败')
    },
    uploadProgress (event, file, fileList) {
      this.item.percentage = parseInt(event.percent)
    },
    uploaderSize (file, fileList) {
      this.$Notice.error('文件超出规定大小')
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
