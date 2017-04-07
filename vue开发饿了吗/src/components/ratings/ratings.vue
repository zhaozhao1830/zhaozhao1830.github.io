<template>
  <div class="ratingArea" ref="ratingArea">
    <div>
      <div class="ratingWrap">
        <div class="overview">
          <div class="overview-left">
            <div class="score">{{seller.score}}</div>
            <div class="totalScore">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right ">
            <div class="star-wraper clearfix">
              <span class="title fl">服务态度</span>
              <star class="fl" :starType="36" :score="seller.score"></star>
              <span class="score fl">{{seller.score}}</span>
            </div>
            <div class="star-wraper clearfix">
              <span class="title fl">商品评价</span>
              <star class="fl" :starType="36" :score="seller.foodScore"></star>
              <span class="score fl">{{seller.foodScore}}</span>
            </div>
            <div class="delivery clearfix">
              <span class="title fl">送达时间</span>
              <span class="time fl">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <div class="rating-wraper">
          <div class="rating-top">
            <ratingSelect @onlyContentChange="onlyContentChange" @seleteTypeChange="seleteTypeChange" :ratings=ratings :select-type=selectType :only-content=onlyContent></ratingSelect>
          </div>
          <div class="rating-content">
            <ul>
              <li v-for="item in ratings" class="ratingItem" v-show="ratingShow(item.rateType,item.text)">
                <img width="28" height="28" :src="item.avatar" class="avatar">
                <div class="rating-right">
                  <div class="username">{{item.username}}</div>
                  <div class="star-wraper">
                    <star :starType="24" :score="item.score"></star>
                    <span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                  </div>
                  <div class="text">
                    {{item.text}}
                  </div>
                  <div class="recommendArea" v-show="item.recommend">
                    <span class="icon-thumb_up"></span>
                    <span v-for="reItem in item.recommend" class="item">{{reItem}}</span>
                  </div>
                </div>
                <div class="time">
                  {{item.rateTime | formatDate}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import star from "../star/star.vue"
    import split from "../split/split.vue"
    import ratingSelect from "../ratingSelect/ratingSelect.vue"
    import BScroll from "better-scroll"
    import {formatDate} from "../../common/js/date"

    const ALL = 2

    export default{
      props:{
        seller:{
            type:Object
        }
      },
      data(){
        return {
          selectType:ALL,
          onlyContent:false,
          ratings:[]
        }
      },
      created(){
        this.$http.get("/api/ratings").then((res)=>{
          console.log(this.ratings)
          res=res.body
          if(res.errno===0){
            this.ratings=res.data
            this.$nextTick(()=>{
              this.scroll=new BScroll(this.$refs.ratingArea,{
                click:true
              })
            })

          }
        })

      },
      computed:{

      },
      methods:{
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
          return formatDate(date,"yyyy-MM-DD hh:mm")
        }
      },
      components:{
        star,
        split,
        ratingSelect
      }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";

.ratingArea
  position:absolute
  left:0
  right:0
  top:174px
  bottom:0
  overflow:hidden
  .ratingWrap
    padding:18px 0
    .overview
      display:flex
      width:100%
      margin-bottom:18px
      .overview-left
        padding:6px 0
        flex:0 0 137px
        text-align:center
        width:137px
        border-right:1px solid rgba(7,17,27,0.1)
        @media only screen and (max-width: 320px)
          flex:0 0 120px
          width:120px

        .score
          margin-bottom:6px
          line-height:28px
          font-size:24px
          color:rgb(255,153,0)
        .totalScore
          margin-bottom:8px
          line-height:12px
          font-size:12px
          color:rgb(7,17,27)
        .rank

          line-height:10px
          font-size:10px
          color:rgb(147,153,159)
      .overview-right
        flex:1
        padding:0 24px
        @media only screen and (max-width: 320px)
          padding:0 10px
        .star-wraper
          line-height:18px
          margin-bottom:8px
          .title
            vertical-align:middle
            font-size:12px
            color:rgb(7,17,27)
          .star
            vertical-align:middle
            margin:0 12px
            @media only screen and (max-width: 320px)
              margin:0 5px
          .score
            vertical-align:middle
            font-size:12px
            color:rgb(255,153,0)

        .delivery
          line-height:18px
          .title
            font-size:12px
            color:rgb(7,17,27)
            margin-right:12px
           .time
              font-size:12px
              color:rgb(147,153,159)
    .rating-wraper
      padding-top:18px
      .rating-top
        padding:0 18px
        border-bottom:1px solid rgba(7,17,27,0.1)
      .rating-content
        padding:0 18px
        .ratingItem
          padding:18px 0
          display:flex
          borderBT-1px(rgba(7,17,27,0.1))
          .avatar
            flex:0 0 28px
            margin-right:12px
            width:28px
            border-radius:50%
          .rating-right
            flex:1
            .username
              margin-bottom:4px
              line-height:12px
              font-size:10px
              color:rgb(7,17,27)
            .star-wraper
              margin-bottom:6px
              .star
                margin-right:0px
                display:inline-block
                vertical-align:top
              .delivery
                line-height:12px
                display:inline-block
                vertical-align:top
                font-size:10px
                color:rgb(147,153,159)
            .text
              margin-bottom:8px
              line-height:18px
              color:rgb(7,17,27)
              font-size:12px
            .recommendArea
              line-height:16px
              .icon-thumb_up
                margin-right:6
                color:rgb(0,160,220)
              .item
                display:inline-block
                padding:0 6px
                margin:0 8px 6px 0
                border:1px solid rgba(7,17,27,0.1)
                border-radius:1px
                font-size:9px
                color:rgb(147,153,159)
                background:#fff
          .time
            position:absolute
            right:0
            top:18px
            line-height:12px
            font-size:10px
            color:rgb(147,153,159)
            font-weight:200
</style>
