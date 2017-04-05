<template>
  <div class="shopcart">
    <div class="content" @touchend="toggleList">
      <div class="content_left clearfix">
        <div class="logo_wrapper fl">
          <div class="logo" :class="{highLight:totalCount>0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <span class="num" v-show="totalCount>0">{{totalCount}}</span>
        </div>
        <span class="price fl" :class="{highLight:totalPrice>0}">
          ¥ {{totalPrice}}
        </span>
        <div class="desc fl">
          另需付配送费{{deliveryFee}}元
        </div>
      </div>
      <div class="content_right" @touchend.stop.prevent="toPay">
        <div class="pay" :class="checkClass">
          {{checkStatus}}
        </div>
      </div>

      <div class="ball-wrapper">
        <div v-for="item in balls">
          <transition name="drop" v-on:before-enter="beforeDrop" v-on:enter="dropping" v-on:after-enter="afterDrop">
            <div class="parabola" v-show="item.show" >
              <div class="inner"></div>
            </div>
          </transition>
        </div>
      </div>

    </div>
    <transition name="fold">
      <div class="ballList-wrapper" v-show="cartShow">
        <div class="ballList-header clearfix">
          <h3 class="title fl">购物车</h3>
          <span class="empty fr" @touchend="empty">清空</span>
        </div>
        <div class="ballList-content" ref="cartList">
          <ul>
            <li v-for="item of selectArray">
              <div class="name fl">{{item.name}}</div>
              <div class="fr cartcontrl-wrapper" >
                <cartContrl :food="item"></cartContrl>
              </div>
              <div class="price fr">¥{{item.price*item.count}}</div>

            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="shopcart-mask" v-show="cartShow" @touchend="hideList">
      </div>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
    import BScroll from "better-scroll"
    import cartContrl from "../cartContrl/cartContrl.vue"
    export default{
      props: {
        "deliveryFee":{},
        "minPrice":{},
        "selectArray": {
          type:Array,
          default(){
              return [
                {
                    price:10,
                    count:1
                }
              ]
          }
        }
      },
      methods:{
          drop(target){
              // 父组件调用的就是这个方法
            // 作用是 只让正在进行动画的小球显示出来
            // 小球的抛物线动画实际是transition做的，实际的动作只是将小球的状态改成true和绑定小球的起始点。
            for (let i = 0; i < this.balls.length; i++) {
              let ball = this.balls[i];
              if (!ball.show) {
                ball.show = true;
                ball.target = target;
                this.dropBalls.push(ball);

                return;
              }
            }
          },
          beforeDrop(el){
             // 这里的el是运动的DOM对象
            // 思路就是在运动一开始的第一针让小球定位到对应的位置，然后在运动过程中回到起始点，在运动完成之后将小球状态改变，
             let count = this.balls.length;
             while (count--) {
               let ball = this.balls[count];
               if (ball.show) {
                 let rect = ball.target.getBoundingClientRect();
                 let x = rect.left - 32;
                 let y = -(window.innerHeight - rect.top - 22);
//                 el.style.display = '';
                 el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                 el.style.transform = `translate3d(0,${y}px,0)`;
                 let inner = el.getElementsByClassName('inner')[0];
                 inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                 inner.style.transform = `translate3d(${x}px,0,0)`;
               }
             }
          },
          dropping(el,done){

            // 浏览器重绘,否则第一次点击没有小球出现
            let rf = el.offsetHeight;
            // NEXTTICK之后将状态回到000
            this.$nextTick(() => {
              el.style.webkitTransform = 'translate3d(0,0,0)';
              el.style.transform = 'translate3d(0,0,0)';
              let inner = el.getElementsByClassName('inner')[0];
              inner.style.webkitTransform = 'translate3d(0,0,0)';
              inner.style.transform = 'translate3d(0,0,0)';
              //如果不加这一条，会出现点击不出小球的情况，因为不加这条，她们会被同步调用，过度会立即完成
              el.addEventListener('transitionend', done);
            });
          },
          afterDrop(el){
            // 小球运动完成之后在dropBalls中移出，因为与Balls是引用关系，所以可以获取到对应运动的小球，将小球的状态改成false
            el.style.display = 'none';
            let ball = this.dropBalls.shift();
            if (ball) {
              ball.show = false;
              // 这一步可以让小球在运动完成之后马上消失

            }

          },
          toggleList(){

              if(this.totalCount===0){
                this.listShow=false
                return
              }
              this.listShow=!this.listShow
              //改变完状态之后会影响list的显示或者隐藏，也就是这个时候给list加scroll事，因为better scroll依赖DOM元素，所以在DOM更新完成之后启用
              this.$nextTick(()=>{
                  if(!this.scroll){
                    this.scroll=new BScroll(this.$refs.cartList,{})
                  }else{
                    this.scroll.refresh()
                  }
              })

          },
          empty(){
            this.selectArray.forEach((item)=>{
                item.count=0
            })
          },
          hideList(){
              this.listShow=false
          },
          toPay(){
            if(this.totalPrice<this.minPrice){
              return false
            }
            window.alert("需要支付"+this.totalPrice)
          }


      },
      data(){
        return {
          balls:[
            {
              show:false
            },
            {
              show:false
            },
            {
              show:false
            },
            {
              show:false
            },
            {
              show:false
            }
          ],
          dropBalls:[],
          listShow:false

        }
      },
      computed:{
          totalPrice(){
              let price1=0;
              this.selectArray.forEach((item)=>{
                  price1+=item.price*item.count
              })
              return price1
          },
          totalCount(){
              let count1=0
              this.selectArray.forEach((item)=>{
                count1+=item.count
              })
              return count1
          },
          checkStatus(){
              if(this.totalPrice===0){
                return  `¥${this.minPrice}元起送`
              }else if(this.totalPrice<this.minPrice){
                let diff=this.minPrice-this.totalPrice
                return `还差¥${diff}元配送`
              }else{
                  return `去结算`
              }
          },
          checkClass(){
            if(this.totalPrice<this.minPrice){
                return "not-enough"
            }else{
                return "enough"
            }
          },
          cartShow(){
            if(this.totalCount===0){
              this.listShow=false
            }
            return this.listShow
          }


      },
      components:{
        cartContrl
      }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .shopcart
    position:fixed
    bottom:0
    left:0
    width:100%
    height:46px
    background-color:#141d27
    z-index:48
    .content
      position:absolute
      left:0
      top:0
      display:flex
      width:100%
      height:100%
      background: #141d27;
      z-index:51

  .content_left
        flex:1
        .logo_wrapper
          width:57px
          height:57px
          position:relative
          top:-12px
          padding:6px
          margin:0 9px
          box-sizing:border-box
          background-color:#141d27
          border-radius:50%
          .logo
            width:100%
            height:100%
            background-color:#2b343c
            border-radius:50%
            text-align:center
            &.highLight
              background:rgb(0,160,220)
              .icon-shopping_cart
                color:#fff
            .icon-shopping_cart
              line-height:44px
              font-size:24px
              color:#80858a
          .num
            position:absolute
            top:0
            right:0
            height:16px
            line-height:16px
            padding:0 6px
            border-radius:16px
            font-size:9px
            color:#fff
            background:rgb(240,20,20)
            box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          line-height:24px
          vertical-align:top
          margin-top:12px
          padding-right:12px
          border-right:1px solid  rgba(255,255,255,0.1)
          font-size:16px
          font-weight:700
          color:rgba(255,255,255,0.4)
          &.highLight
            color:#fff

        .desc
          line-height:24px
          margin:12px 0 0 12px
          font-size:10px
          color:#80858a

      .content_right
        flex:0,0,105px
        width:105px
        height:100%
        .pay
          width:100%
          height:100%
          line-height:48px
          text-align:center
          font-size:12px
          color:rgba(255,255,255,0.4)
          font-weight:700
          &.not-enough
           background:#2b343c
          &.enough
            background:#00b43c
            color:#fff
      .ball-wrapper
        div
          .parabola
            position:fixed
            left:30px
            bottom:20px
            z-index:2000
            border-radius:50%
             /*纵轴改变的时候使用贝塞尔曲线就可以达到抛物线的效果*/
            transition:all 0.4s cubic-bezier(0.49,-0.29,.75,.67)
            .inner
              width:16px
              height:16px
              background:rgb(0,160,220)
              border-radius:50%
              transition:all 0.4s linear
    .ballList-wrapper
      position:absolute
      top:0
      left:0
      width:100%
      z-index:50
      transform:translate3d(0,-100%,0)

      &.fold-enter-active,&.fold-leave-active
        transition:all 0.4s linear
        /*transform:translate3d(0,0,0)*/
      &.fold-enter,&.fold-leave-active
        opacity:0
        transform:translate3d(0,0,0)
      .ballList-header
        line-height:40px
        height:40px
        padding:0 18px
        background:#f3f5f7
        border-1px(rgba(7,17,27,0.1))
        .title
          color:rgb(7,17,27)
          font-size:14px
        .empty
          color:rgb(0,16,220)
          font-size:12px
      .ballList-content
        max-height:200px
        background-color:#fff
        overflow:hidden
        padding:0 18px 3px
        li
          height:48px
          box-sizing:border-box
          padding:12px 0
          box-sizing:border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height:24px
            font-size:14px
            color:rgb(7,17,27)
          .price
            line-height:24px
            margin-right:12px
            font-size:14px
            font-weight:700
            color:rgb(240,20,20)

          .cartcontrl-wrapper
            line-height:24px
            margin-top:-5px

    .shopcart-mask
        position:fixed
        top:0
        left:0
        right:0
        bottom:0
        background:rgba(7,17,27,0.6)
        z-index:49
        &.mask-enter-active ,&.mask-leave-active
          transition:all 0.4s
        &.mask-enter ,&.mask-leave-active
          opacity:1

</style>
