<template>
  <div class="ratingSelect">
    <div class="ratingType borderBT-1px">
      <div class="clearfix">
        <span class="fl block positive" :class="{'active':selectType===2}" @click="ratingSelect(2,$event)">
          {{desc.all}}
          <span class="count">{{ratings.length}}</span>
        </span>
        <span class="fl block positive" :class="{'active':selectType===0}" @click="ratingSelect(0,$event)">
          {{desc.positive}}
           <span class="count">{{positiveCount.length}}</span>
        </span>
        <span class="fl block negative" :class="{'active':selectType===1}" @click="ratingSelect(1,$event)">
          {{desc.negative}}
           <span class="count">{{negativeCount.length}}</span>
        </span>
      </div>
    </div>
    <div class="ifOnlyContent" :class="{'on':onlyContent}">
      <span class="icon-check_circle" @click="onlyContentEvent"></span>
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
            type:Object,
            default(){
              return {
                all:"全部",
                positive:"满意",
                negative:"不满意"
              }
            }
          }
        },
        computed:{
          positiveCount(){
            return this.ratings.filter((item)=>{
              return item.rateType===0
            })
          },
          negativeCount(){
            return this.ratings.filter((item)=>{
              return item.rateType===1
            })
          }
        },
        methods:{
          ratingSelect(type,ev){
            if(!ev._constructed){
              return
            }
            this.$emit('seleteTypeChange',type)

          },
          onlyContentEvent(){
            this.$emit('onlyContentChange')
          }
        }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
.ratingSelect

  .ratingType
    borderBT-1px(rgba(7,17,27,0.1))
    padding-bottom:18px
    .block
      padding:8px 12px
      margin-right:8px
      line-height:16px
      border-radius:1px
      font-size:12px
      color:rgb(77,85,93)
      &.active
        color:#fff
       .count
          font-size:8px
      &.positive
        background:rgba(0,160,220,0.2)
        &.active
          background:rgba(0,160,220,1)
      &.negative
        background:rgba(77,85,93,0.2)
        &.active
         background:rgba(77,85,93,1)
  .ifOnlyContent
    padding:12px 0
    line-height:24p
    color:rgb(147,153,158)
    &.on
     .icon-check_circle
        color:#00c850
    .icon-check_circle
      vertical-align:middle
      font-size:24px
    .text
      font-size:12px

</style>
