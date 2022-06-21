<template>
<div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在home,search中显示的，在登录，注册的时候是隐藏的 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
</div>
 
  
</template>

<script>
// 引入组件
import Header from './components/Header'
import Footer from './components/Footer'
export default {
 name:'App',
 components:{Header,Footer},
 data(){
     return{
         msg:'abc'
     }
 },
 mounted(){
    //  派发一个action获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList'),
     //  获取用户信息在首页进行展示
      this.$store.dispatch('userInfo')
 }
}
</script>

<style>

</style>