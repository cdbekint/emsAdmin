<template>
  <div class = "page">
    <div class = "btn">
      dfger
    </div>
  </div>
</template>

<script>
export default{
  name: 'page'
}

let html = document.documentElement;
html.style.fontSize = html.getBoundingClientRect().width / 10 + 'px';
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/45px)rem
  }
  .page
    position relative
    height rrem(724px);
    width 100%
    display flex
    .bg
      width 100%
      height rrem(724px);
      position absolute;
      top 0px;
      left 0px
    .btn
      justify-content center
      background red
      z-index 100
      height rrem(44px)
      width rrem(258px)



</style>
