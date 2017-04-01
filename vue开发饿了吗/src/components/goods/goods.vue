<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuwrapper">
      <ul v-show="goods.length">
        <li v-for="item,index of goods" class="memuItem" :class="{active:activeIndex===index}">
         <div>
           <!--在这个位置不能达到内容垂直居中的效果，在外面包一层div,可以解决这个问题-->
           <icon v-show="iconShow(item)" :seller="seller" :size="12" :num="3" :index="itemType(item)"></icon>
           <span class="text border-1px">{{item.name}}</span>
         </div>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodwrapper">
      <div>
        <dl v-for="item,index of goods" class="foodList" >

          <dt class="listTitle">{{item.name}}</dt>
          <dd v-for="listItem,listIndex of item.foods" class="item">
            <div class="listItemLeft">
              <img width="57" height="57" :src="listItem.icon">
            </div>
            <div class="listItemRight">
              <h3 class="name">{{listItem.name}}</h3>
              <div class="des">{{listItem.description}}</div>
              <div class="extra">
                <span>月售{{listItem.sellCount}}份</span>
                <span>好评率{{listItem.rating}}%</span>
              </div>
              <div class="price">
                <span>¥{{listItem.price}}</span>
                <span v-show="listItem.oldPrice">¥{{listItem.oldPrice}}</span>
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
    import icon from "../icon/icon.vue"
    import BScroll from "better-scroll"
    const ERR_NO=0
    export default{
      props:["seller"],// 将seller内容传递给子组件
      data(){
          return {
              goods:[],
              iconShow(item){
                return item.type > 0
              },
              itemType(item){
                return item.type>0?item.type:0
              },
              scrollHeight:[],
              scrollPos:0

          }
      },
      computed:{
        activeIndex(){
            for(var i=0;i<this.scrollHeight.length;i++){
                console.log(this.scrollPos)
                if(this.scrollPos>this.scrollHeight[i]){
                    alert(1)
                    return i
                }
//                return 0
            }
        }
      },
      created(){

        this.$http.get("/api/goods").then((res)=>{
          res=res.body
          if(res.errno===ERR_NO){
            this.goods=res.data
//            console.log(this.goods)
            this.$nextTick(function () {
              this._initScroll()
              this._computedScroll()
            })
          }

        })
      },
      components:{
          icon
      },
      methods:{
        _initScroll(){
            this.menuScroll=new BScroll(this.$refs.menuwrapper,{})
            this.foodScroll=new BScroll(this.$refs.foodwrapper,{
                probeType:3
            })
          this.foodScroll.on("scroll",function (pos) {
            this.scrollPos=Math.abs(pos.y)
//            console.log(this.scrollPos)
          })
        },
        _computedScroll(){
            let heights=0;
            this.scrollHeight.push(heights);
            let items=this.$refs.foodwrapper.getElementsByClassName("foodList");
            for(let i=0;i<items.length;i++){
              heights+=items[i].clientHeight;

              this.scrollHeight.push(heights)
            }

        }
      }

    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .goods
    display:flex
    position:absolute
    top:174px
    left:0
    right:0
    bottom:46px
    overflow:hidden
    .menu-wrapper
      flex:0,0,80px
      width:80px
      background:#f3f5f7
      text-align:center
      .memuItem
        display:table
        width:56px
        height:54px
        line-height:14px
        padding:0 12px

        &.active
          background:#fff
          font-weight:700
          position:relative
          margin-top:-1px
        div
          display:table-cell
          vertical-align:middle

          .icon
            margin-right:0
            vertical-align:middle
          .text
            width:56px
            font-size:12px
            border-1px(rgba(7,17,27,0.1))
            vertical-align:middle


    .food-wrapper
      flex:1

      .listTitle
        padding-left:14px
        height:26px
        line-height:26px
        border-left:2px solid #d9dde1
        font-size:12px
        color:rgb(147,153,159)
        background:#f3f5f7
      .item
        display:flex
        padding:18px 18px 18px 0
        margin-left:18px
        border-1px(rgba(7,17,27,0.1))
        &:last-of-type
          border-none()
        .listItemLeft
          flex:0,0,57px
          margin-right:10px
        .listItemRight
          .name
            padding-top:2px
            margin-bottom:8px
            height:14px
            line-height:14px
            font-size:14px
            color:rgb(7,17,27)

          .des,.extra
            margin-bottom:8px
            line-height:10px
            font-size:10px
            color:rgb(147,153,159)
          .des
            line-height:12px
          .extra
            span:first-child
              margin-right:4px
          .price
              line-height:14px
              font-weight:700
              span:first-child
                color:rgb(240,20,20)
                font-size:14px
                margin-right:8
              span:last-child
                color:rgb(147,153,159)
                text-decoration:line-through
                font-size:12px




</style>
