<template>
  <span class="icon" v-bind:class="[ClassName,classMap[num-1][seller.supports[index].type]]"></span>

</template>

<script type="text/ecmascript-6">
    export default{
        props:["seller","size","num","index"],
        data(){
           return {
             classMap:[["decrease_1","discount_1","special_1","invoice_1","guarantee_1"],
                        ["decrease_2","discount_2","special_2","invoice_2","guarantee_2"],
                        ["decrease_3","discount_3","special_3","invoice_3","guarantee_3"],
                        ["decrease_4","discount_4","special_4","invoice_4","guarantee_4"]
                      ],
             ClassName:"icon"+this.size
//           如果class在计算属性里面报错，放在data试试
           }
         }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .icon
    display:inline-block
    vertical-align:top
    &.icon12
      width:12px
      height:12px
      background-size:12px 12px
    &.icon16
      width:16px
      height:16px
      background-size:16px 16px


    &.decrease_1
      bg-image("decrease_1")
    &.discount_1
      bg-image("discount_1")
    &.special_1
      bg-image("special_1")
    &.invoice_1
      bg-image("invoice_1")
    &.guarantee_1
      bg-image("guarantee_1")
    &.decrease_2
     bg-image("decrease_2")
    &.discount_2
     bg-image("discount_2")
    &.special_2
     bg-image("special_2")
    &.invoice_2
     bg-image("invoice_2")
    &.guarantee_2
     bg-image("guarantee_2")

    &.decrease_3
     bg-image("decrease_3")
    &.discount_3
      bg-image("discount_3")
    &.special_3
     bg-image("special_3")
    &.invoice_3
      bg-image("invoice_3")
    &.guarantee_3
     bg-image("guarantee_3")
    &.decrease_4
      bg-image("decrease_4")
    &.discount_4
      bg-image("discount_4")
    &.special_4
     bg-image("special_4")
    &.invoice_4
      bg-image("invoice_4")
    &.guarantee_4
     bg-image("guarantee_4")






</style>
