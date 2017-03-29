<template>
  <div class="header" id="header">
   <div class="content-wrapper">
     <div class="avatar">
       <img width="64" height="64" :src="seller.avatar">
     </div>
     <div class="content">
       <div class="title">
         <span class="brand"></span>
         <span class="name">{{seller.name}}</span>
       </div>
       <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
       </div>
       <div class="support" v-if="seller.supports">
         <!--在这个位置需要判断一下seller.supports是否存在，因为代码在执行的时候是异步获取，可能执行这个位置的时候，还没获取到数据，如果不加这个，下面的嗲吗会报错-->
         <span class="icon" :class="classMap[seller.supports[0].type]"></span>
         <span class="text">{{seller.supports[0].description}}</span>
       </div>
     </div>
     <div class="support-count" v-if="seller.supports">
        <span class="count-num">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
     </div>
   </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
    export default{
      props:{
         seller:{
             type:Object
         }
      },
      data(){
          return{
            classMap:["decrease","discount","special","invoice","guarantee"]
          }
      }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  /*引入样式函数文件，可以实现不同分辨率下，展示不同的图片*/
  /*背景图片通常利用样式函数传入，然后根据不同的class显示不同的图片*/
  #header
    color:#fff
    background-color:#999
    .content-wrapper
      position:relative
      padding:24px 12px 18px 24px
      font-size:0
      .avatar
        display:inline-block
        img
          border-radius:2px
      .content
        display:inline-block
        margin-left:16px
        font-size:14px
        .title
          margin:2px 0 8px 0
          .brand
            display:inline-block
            width:30px
            height:18px
            bg-image(brand)
            /*使用样式函数*/
            background-size:30px 18px
            background-repeat:none
          .name
              margin-left:6px
              font-size:16px
              line-height:18px
              vertical-align:top
              font-weight:bold
        .description
          margin-bottom:10px
          line-height:12px
          font-size:12px
        .support
          .icon
            display:inline-block
            width:12px
            height:12px
            margin-right:4px
            background-size:12px 12px
            background-repeat:no-repeat
            vertical-align:top
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
             bg-image('special_1')
          .text
            line-height:12px
            vertical-align:top
            font-size:10px
      .support-count
        position:absolute
        right:12px
        bottom:14px
        padding:0 8px
        height:24px
        line-height:24px
        border-radius:14px
        background:rgba(0,0,0,0.2)
        text-align:center
        .count-num
          font-size:10px
          vertical-align:top
        .icon-keyboard_arrow_right
          line-height:24px
          margin-left:2px
          font-size:10px
    .bulletin-wrapper
      position:relative
      height:28px
      line-height:28px
      padding:0 22px 0 12px
      white-space:nowrap
      overflow:hidden
      text-overflow:ellipsis
      word-spacing:-6px
      background:rgba(7,17,27,0.2)
      .bulletin-title
        display:inline-block
        width:22px
        height:12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat:no-repeat
        /*vertical-align:top*/
      .bulletin-text
        /*display:inline-block*/
        vertical-align:top
        font-size:10px
        margin:0 4px
      .icon-keyboard_arrow_right
        position:absolute
        right:12px
        top:8px
        font-size:10px

</style>
