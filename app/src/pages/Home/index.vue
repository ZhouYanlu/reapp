<template>
  <div>
    <!-- 三级联动全局组件 ：三级联动已经注册为全局组件，所以说就不需要引入-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id"  :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer';
import Recommend from './Recommend';
import Rank from './Rank/index.vue';
import Like from './Like/index.vue';
import Floor from './Floor/index.vue';
import Brand from './Brand/index.vue';
import { mapState } from 'vuex';
export default {
    name: "Home",
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
    mounted(){
      // 派发action，获取floor的数据
     this.$store.dispatch('getFloorList')
    //  获取用户信息在首页进行展示
      this.$store.dispatch('userInfo')
      },
  computed:{
     ...mapState({floorList:state=>state.home.floorList})
 }
}
</script>

<style>

</style>