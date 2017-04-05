<template>
  <div class="cartContrl clearfix">
    <transition name="trans">
      <span class="cart-decrease fl" v-show="food.count>0" @touchend.stop.prevent="decreaseCount">
        <span class="inner icon-remove_circle_outline"></span>
      </span>
    </transition>

    <span class="cart-count fl" v-show="food.count>0">{{food.count}}</span>
    <span class="cart-add fl icon-add_circle" @touchend.stop.prevent="addCount"></span>


  </div>

</template>

<script type="text/ecmascript-6">
    import Vue from "vue"
    export default{
        props:{
            food:{
                type:Object
            }
        },
        data(){
            return {
                isSelect:true,
                pos(obj){
                  console.log(obj.clientLeft,obj.clientTop)
                }
            }
        },
        computed:{

        },
        created(){
//            console.log(this.food)
        },
        methods:{
          addCount(ev){
            if(!this.food.count){
//           Vue不能直接给一个对象添加没有的属性，需要在全局引入vue，然后通过set方法给这个对象添加原本不存在的属性
              Vue.set(this.food,"count",1)
            }else{
               this.food.count++
            }
            this.$emit("getPos",ev.target)
          },
          decreaseCount(){
            this.food.count--
          }
        },
        components:{

        }

    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartContrl
    positon:relative
    .cart-decrease
      padding:6px
      transform:translate3d(0,0,0)
               /*1.transtion的样式需要写在&后面
                 2.需要给元素加正常显示的状态在正常的class里面
                 3.一个元素如果存在两种显示状态，可以拆分成父子级，分别给父子级加运动样式
               */
      &.trans-enter-active,&.trans-leave-active
        transition:all 0.4s linear
      &.trans-enter,&.trans-leave-active
        transform:translate3d(24px,0,0)
        opacity:0
        .inner
          transform:rotate(180deg)
      .inner
        display:block
        font-size:24px
        color:rgb(0,160,220)
        transition:all 0.4s linear
        transform:rotate(0)
    .cart-count
      width:12px
      line-height:36px
      font-size:10px
      color:rgb(147,153,159)
      text-align:center
    .cart-add
      padding:6px
      font-size:24px
      color:rgb(0,160,220)
    .parabola
      position:absolute
      right:10px
      bottom:12px

</style>
