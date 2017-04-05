<template>
  <transition name="trans">
    <div class="food" v-show="foodShow" ref="foodPage">
      <div>
        <div class="food-header">
          <img :src="food.image">
          <div class="back" @touchend="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h3 class="food-name">{{food.name}}</h3>
          <div class="detail">
            <span class="sell">月售{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartContrl-wrapper">
            <!--<transition name="fade">-->
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
            <!--</transition>-->
            <cartContrl @getPos="getPos" :food="food" v-show="food.count && food.count>0"></cartContrl>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <div class="title">商品信息</div>
          <div class="text">{{food.info}}</div>
        </div>
        <split v-show="food.ratings"></split>
        <div class="rating-wrapper" v-show="food.ratings">
          <h3 class="title">商品评价</h3>
          <ratingSelect :ratings="food.ratings" :select-type=selectType :only-content="false" :desc="desc"></ratingSelect>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
    import cartContrl from "../cartContrl/cartContrl.vue"
    import BScroll from "better-scroll"
    import Vue from "vue"
    import split from "../split/split.vue"
    import ratingSelect from "../ratingSelect/ratingSelect.vue"

    const POSITIVE =0
    const NEGATIVE =1
    const ALL = 2

    export default{
        props: [
          "food"
        ],
        data(){
          return {
            foodShow:false,
            selectType:ALL,
            onlyContent:false,
            desc:{
              all:"全部",
              positive:"推荐",
              negative:"吐槽"
            }
          }
        },
        methods:{
          showFood(){
            this.foodShow=true
            this.$nextTick(()=>{
              if(!this.scroll){
                this.scroll=new BScroll(this.$refs.foodPage,{
                    click:true
                })
              }else {
                this.scroll.refresh()
              }

            })

          },
          hide(){
            this.foodShow=false
          },
          addFirst(ev){
            if(!ev._constructed){
              return
            }
            this.$emit("getPos",ev.target)
            Vue.set(this.food,"count",1)
          },
          getPos(target){
            this.$emit("getPos",target)
          }
        },
        components:{
          cartContrl,
          split,
          ratingSelect
        }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .food
    position:fixed
    top:0
    left:0
    right:0
    bottom:42px
    overflow:hidden
    background:#fff
    z-index:47
    /*transition:all 0.4s*/
    transform:translate3d(0,0,0)
    &.trans-enter-active,&.trans-leave-active
      transition:all 0.4s
    &.trans-enter,&.trans-leave-active
      opacity:0
      transform:translate3d(100%,0,0)
    .food-header
      position:relative
      width:100%
      height:0
      padding-top:100%
      img
      /*img 是相对于food-header进行定位的*/
        position:absolute
        left:0
        top:0
        width:100%
        height:100%
      .back
        position:absolute
        left:0
        top:8px
        padding:10px
        i
          font-size:20px
          color:#fff

    .content
      position:relative
      padding:18px
      .food-name
        line-height:14px
        margin-bottom:8px
        color:rgb(7,17,27)
        font-weight:700
      .detail
        height:10px
        line-height:10px
        margin-bottom:18px
        font-size:10px
        color:rgb(147,153,159)
        .sell
          margin-right:12px
      .price
        .now
          line-height:24px
          font-weight:700
          font-size:14px
          color:rgb(240,20,20)
        .old
          line-height:24px
          color:rgb(147,153,159)
          font-size:10px
          font-weight:700
    .cartContrl-wrapper
      position:absolute
      right:18px
      bottom:18px
      .buy
        width:74px
        height:24px
        line-height:24px
        text-align:center
        border-radius:12px
        box-size:border-box
        font-size:10px
        color:#fff
        background:rgb(0,160,220)
      /*&.fade-enter-active,&.fade-leave-active*/
        /*transition:all 0.1s*/
      /*&.fade-enter,&.fade-leave-active*/
        /*opacity:1*/
    .info
      padding:18px
      .title
        line-height:14px
        margin-bottom:6px
        font-size:14px
        color:rgb(7,17,27)
      .text
        line-height:24px
        padding:0 8px
        font-size:12px
        color:rgb(77,85,93)
    .rating-wrapper
      padding:18px
      .title
        line-height:14px
        margin-bottom:6px
        font-size:14px
        color:rgb(7,17,27)


</style>
