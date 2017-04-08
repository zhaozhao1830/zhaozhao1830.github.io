<template>
  <div id="app">
    <Vheader :seller="seller"></Vheader>
    <div class="tab border-1px">
      <div class="tab-item">
        <!--router-link还是相当于A标签 -->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  import {windowUrl} from "./common/js/until"
  const ERR_Ok=0
  export default{
      data(){
          return{
              seller:{
                id:(()=>{
                  return windowUrl().id||123
                })()
              }
          }
      },
      watch:{
        'seller'(){
           this.seller.id=windowUrl().id
        }
      },
      created(){
        this.$http.get("/api/seller").then((res)=>{
            res=res.body
           if(res.errno === ERR_Ok){
              this.seller=Object.assign({},this.seller,res.data)
           }
        },(res)=>{
            //error callback
        })
      },
      components:{
          "Vheader":header
      }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl";
#app
  .tab
    display:flex
    width:100%
    height:40px
    line-height:40px
    border-1px(rgba(7,17,27,0.2))
    .tab-item
      flex:1
      text-align:center
      & > a
        display:block
        font-size:14px
        color:rgb(77,85,93)
      & .active
        color:rgb(200,40,40)

</style>
