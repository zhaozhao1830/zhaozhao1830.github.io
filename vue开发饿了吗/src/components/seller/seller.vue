<template>
  <div class="sellerArea" ref="sellerArea">
    <div>
      <div class="overview">
        <h1 class="title">{{seller.name}}{{seller.id}}</h1>
        <div class="starArea borderBT-1px">
          <div class="clearfix">
            <star class="fl" :starType="36" :score="seller.score"></star>
            <span class="fl">({{seller.ratingCount}})</span>
            <span class="fl">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="otherInfo">
          <ul>
            <li>
              <div class="infoTitle">起送价</div>
              <div class="infoContent">
                <span>{{seller.minPrice}}</span>
                元
              </div>
            </li>
            <li>
              <div class="infoTitle">商家配送</div>
              <div class="infoContent">
                <span>{{seller.deliveryPrice}}</span>
                元
              </div>
            </li>
            <li>
              <div class="infoTitle">平均配送时间</div>
              <div class="infoContent">
                <span>{{seller.deliveryTime}}</span>
                元
              </div>
            </li>
          </ul>
        </div>
        <div class="favorite" @click="favorateEvent">
          <span class="icon-favorite" :class="{'active':ifFavorite}"></span>
          <span class="text">{{favorateText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin ">
        <h3 class="title">公告与活动</h3>
        <div class="text borderBT-1px">
          <p>{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supportArea">
          <li class="supportItem borderBT-1px" v-for="item,index in seller.supports">
            <icon :seller="seller" :size="16" :num="4" :index="index"></icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="sellerPic">
        <h3 class="title">商家实景</h3>
        <div class="picWrapper" ref="picWrapper" v-show="seller.pics && seller.pics.length>0">
          <ul ref="picUl">
            <li class="pic-item" v-for="item in seller.pics">
              <img width="120" height="90" :src="item">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="sellerInfo">
        <h3 class="title">商家信息</h3>
        <ul>
          <li v-for="item in seller.infos" class="infoItem">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
    import star from "../star/star.vue"
    import split from "../split/split.vue"
    import icon from "../icon/icon.vue"
    import BScroll from "better-scroll"
    import {saveToStorage,getFromStorage} from "../../common/js/store"
    export default{
      props:{
        "seller":{
          type:Object
        }
      },
      data(){
        return {
          ifFavorite:getFromStorage(this.seller.id,"favorite",false)
        }
      },
      computed:{
        favorateText(){
          return this.ifFavorite?"已收藏":"收藏";
        }
      },
      components:{
        star,
        split,
        icon
      },
      watch:{
        seller(){
            //当seller数据进来后，DOM渲染完毕，初始化BScroll
           this.$nextTick(()=>{
             this._initScroll()
             this._initPic()
           })
        }
      },
      mounted(){
        this.$nextTick(()=>{
          this._initScroll()
          this._initPic()
        })
      },
      methods:{
        favorateEvent(ev){
          if(!ev._constructed){
            return
          }

          this.ifFavorite=!this.ifFavorite
          saveToStorage(this.seller.id,"favorite",this.ifFavorite)
        },
        _initScroll(){
          if(!this.scroll){
            this.scroll=new BScroll(this.$refs.sellerArea,{
              click:true
            })
          }else {
            this.scroll.refresh()
          }
        },
        _initPic(){
          if(this.seller.pics){
            let width=120
            let margin_right=6
            let w=(width+margin_right)*this.seller.pics.length-margin_right
            this.$refs.picUl.style.width=w+"px"

            if(!this.picScroll){
              this.picScroll=new BScroll(this.$refs.picWrapper,{
                  scrollX:true,
                  eventPassthrough:'vertical'
              })
            }else {
              this.picScroll.refresh()
            }
          }
        }

      }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
.sellerArea
  position:absolute
  top:174px
  left:0
  right:0
  bottom:0
  overflow:hidden
  .overview
    position:relative
    padding:18px
    .title
      line-height:14px
      margin-bottom:8px
      font-size:14px
      color:rgb(7,17,27)
    .starArea
      padding-bottom:18px
      line-height:18px
      font-size:10px
      color:rgb(77,85,93)
      borderBT-1px(rgba(7,17,27,0.1))
      .star
        margin-right:8px
      &>span:nth-of-type(1)
        margin-right:12px
    .otherInfo
      ul
        width:100%
        display:flex
        padding:18px 0
        li
          flex:1
          border-right:1px solid rgba(7,17,27,0.1)
          text-align:center
          &:last-of-type
            border:none

          .infoTitle
            margin-bottom:4px
            line-height:10px
            font-size:10px
            color:rgb(147,153,159)
          .infoContent
            line-height:24px
            font-size:10px
            font-weight:200
            color:rgb(7,17,27)
            span
              font-size:24px
    .favorite
      width:50px
      position:absolute
      right:4px
      top:18px
      text-align:center
      .icon-favorite
        display:block
        margin-bottom;4px
        line-height:24px
        font-size:24px
        color:#d4d6d9
        &.active
          color:rgb(240,20,20)
      .text
        line-height:10px
        font-size:10px
        color:rgb(77,85,93)


  .bulletin
    padding:18px 18px 0 18px

    .title
      line-height:14px
      margin-bottom:8px
      font-size:14px
      color:rgb(7,17,27)
    .text
      padding:0 12px 16px 12px
      borderBT-1px(rgba(7,17,27,0.1))
      line-height:24px
      font-size:12px
      color:rgb(240,20,20)
      font-weight:200
    .supportArea
      .supportItem
        borderBT-1px(rgba(7,17,27,0.1))
        padding:16px 12px
        &:last-of-type
          border-none()
        .text
          line-height:16px
          padding:0
          font-size:12px
          color:rgb(7,17,27)
          &:after
            border-bottom:none
  .sellerPic
    padding:18px
    .title
       line-height:14px
       margin-bottom:12px
       font-size:14px
       color:rgb(7,17,27)
    .picWrapper
      height:90px
      overflow:hidden
      white-space:nowrap
      ul
        white-space:nowrap
        .pic-item
          display:inline-block
          margin-right:6px
          &:last-of-type
            margin-right:0
  .sellerInfo
    padding:18px 18px 0 18px
    .title
      line-height:14px
      padding-bottom:12px
      font-size:14px
      color:rgb(7,17,27)
      borderBT-1px(rgba(7,17,27,0.1))
    .infoItem
      padding:16px 12px
      line-height:16px
      borderBT-1px(rgba(7,17,27,0.1))
      color:rgb(7,17,27)
      font-size:12px
      &:last-of-type
        border-none()
</style>
