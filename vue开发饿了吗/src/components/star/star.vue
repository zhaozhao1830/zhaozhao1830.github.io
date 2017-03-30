<template>
  <div class="star" v-bind:class="starType">
    <span v-for="item in itemClass" v-bind:class="[classItem,item]" class="itemStar" >{{item}}</span>
  </div>

</template>

<script type="text/ecmascript-6">
    const LENGTH=5
    const STAR_ON="on"
    const STAR_HALF="half"
    const STAR_OFF="off"

    export default {
      props:{
        starType:{
            type:Number
        },
        score:{
            type:Number
        }
      },
      data(){
          return {

          }
      },
//      通过计算生成的数据，都放在计算属性中，不能直接放在data中
      computed:{
        classItem(){
          return "star"+this.starType
        },
        itemClass(){
          let arr=[]
          let score=Math.floor(this.score*2)/2
          let decimal=score%1!==0
          let integer=Math.floor(score)
          for(let i=0;i<integer;i++){
            arr.push(STAR_ON)
          }
          if(decimal){
            arr.push(STAR_HALF)
          }
          while(arr.length<LENGTH){
            arr.push(STAR_OFF)
          }

          return arr
        }
      }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
.star
  font-size:0
  .itemStar
    display:inline-block
    background-repeat:no-repeat
    &.star48
      width:20px
      height:20px
      background-size:20px 20px
      margin-right:22px
      &:last-of-type
        margin-right:0
      &.on
        bg-image("star48_on")
      &.half
        bg-image("star48_half")
      &.off
        bg-image("star48_off")
    &.star36
      width:15px
      height:15px
      margin-right:6px
      background-size:15px 15px
      &:last-of-type
        margin-right:0
      &.on
        bg-image("star36_on")
      &.half
        bg-image("star36_half")
      &.off
        bg-image("star36_off")
    &.star24
      width:10px
      height:10px
      margin-right:3px
      background-size:10px 10px
      &:last-of-type
        margin-right:0
      &.on
        bg-image("star24_on")
      &.half
        bg-image("star24_half")
      &.off
        bg-image("star24_off")



</style>
