<template>
  <div class="ratingSelect">
    <div class="ratingType ">
      <div class="clearfix">
        <span class="fl">{{desc.all}}</span>
        <span class="fl">{{desc.positive}}</span>
        <span class="fl">{{desc.negative}}</span>
      </div>
    </div>
    <div class="ifOnlyContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">

    const POSITIVE =0
    const NEGATIVE =1
    const ALL = 2

    export default{
        props:{
          ratings:{
            type:Array,
            default(){
              return []
            }
          },
          selectType:{
            type:Number,
            default:ALL
          },
          onlyContent:{
            type:Boolean,
            default:false
          },
          desc:{
            all:"全部",
            positive:"满意",
            negative:"不满意"
          }
        }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
.ratingSelect

  .ratingType
    borderBT-1px(rgba(7,17,27,0.1))
    margin-bottom:18px
    span
      padding:8px 12px
      margin-right:8px
      border-radius:1px
      font-size:12px


</style>
