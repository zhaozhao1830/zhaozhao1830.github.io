<template>

  <div class="areaTitle">
    <div class="line"></div>
    <div class="text">{{text}}</div>
    <div class="line"></div>
  </div>

</template>

<script type="text/ecmascript-6">
    export default {
      props:['text'],
      computed:{

      }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
.areaTitle
  width:80%
  height:36px
  display:-webkit-box
  margin:0 auto
  .line
    height:100%
    -webkit-box-flex:1
    margin-top:-17px
    border-bottom:1px solid rgba(255,255,255,0.2)
  .text
    padding:0 12px
    text-align:center
    line-height:36px
    color:rgba(255,255,255,1)
    font-size:14px
    font-weight:700


</style>
