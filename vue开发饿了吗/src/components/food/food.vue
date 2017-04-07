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
          <div class="rating-top">
            <h3 class="title">商品评价</h3>
            <ratingSelect :ratings="food.ratings" :select-type=selectType :only-content=onlyContent :desc="desc" @seleteTypeChange="seleteTypeChange" @onlyContentChange="onlyContentChange"></ratingSelect>
          </div>
          <div class="rating-content">
            <ul v-show="food.ratings && food.ratings.length>0" ref="ratingList">
              <li v-for="item,index of food.ratings" class="rating-item borderBT-1px" v-show="ratingShow(item.rateType,item.text)">
                <div class="user">
                  <span class="username">{{item.username}}</span>
                  <img class="userImage" :src="item.avatar" width="12" height="12">
                </div>
                <div class="time">{{item.rateTime | formatDate}}</div>
                <div class="text">
                  <span :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>
                  {{item.text}}
                </div>
              </li>
            </ul>
            <div v-show="!food.ratings || food.ratings.length<=0" class="no-rating">暂无评价</div>
          </div>
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
    import {formatDate} from "../../common/js/date.js"

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
        computed:{
          noRating(){
            if(this.$refs.ratingList.children.length==0){
              return true
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
          },
          seleteTypeChange(type){
            this.selectType=type
//          改变完选择状态之后，要在DOM更新完成之后重新加载better scroll,否则页面高度会出现问题
            this.$nextTick(()=>{
              this.scroll.refresh()
            })

          },
          onlyContentChange(){
             this.onlyContent=!this.onlyContent
//          改变完选择状态之后，要在DOM更新完成之后重新加载better scroll,否则页面高度会出现问题
              this.$nextTick(()=>{
                this.scroll.refresh()
              })
          },
          ratingShow(type,text){
            if(this.onlyContent && !text){
              return false
            }
            if(this.selectType!==2 && this.selectType!==type){
              return false
            }
            return true

          }
        },
        filters:{
          formatDate(time){
            let date=new Date(time)
            return formatDate(date,"yyyy-MM-DD  hh:mm")
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
  @import "../../common/stylus/mixin.styl";
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
      padding:18px 0
      .rating-top
        padding:0 18px
        border-bottom:1px solid rgba(7,17,27,0.1)
        .title
          line-height:14px
          margin-bottom:6px
          font-size:14px
          color:rgb(7,17,27)
      .rating-content
        padding:0 18px
        .rating-item
          position:relative
          padding:16px 0
          borderBT-1px(rgba(7,17,27,0.1))
          .user
            position:absolute
            right:0
            top:16px
            line-height:12px
            .username
              vertical-align:middle
              font-size:10px
              color:rgb(147,153,159)
              margin-right:0px
            .userImage
              border-radius:50%
          .time
            line-height:12px
            margin-bottom:6px
            font-size:10px
            color:rgb(147,153,159)
          .text
            line-height:16px
            font-size:12px
            color:rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              margin-right:4px
              line-height:16px
              font-size:12px
            .icon-thumb_up
              color:rgb(0,160,220)
            .icon-thumb_down
              color:rgb(147,153,159)
        .no-rating
          padding:12px 0
          color:rgb(147,153,159)
          font-size:12px

</style>
