//引入数据接口
import { reqGetSearchInfo } from "@/api"
//search的小仓库
const state={
    // namespaced:true,
    // 仓库初始状态
    searchList:{}
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const actions={
    // 获取search模块的数据
    async getSearchList({commit},params={}){
        // 当前reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个对象
       let result= await reqGetSearchInfo(params)
       if(result.code==200){
           commit('GETSEARCHLIST',result.data)
       } 
  }
}
// 计算属性
// 项目中getters主要的作用是：简化仓库中的数据（简化数据而生）
// 可以把我们将来在组件中需要用的数据简化一下（将来组件在获取数据的时候就方便了）
const getters={
        goodsList(state){
        // 直接这样书写是有问题的,还有一种情况，就是网络出故障时返回值设置为空
        return state.searchList.goodsList||[];
        },
        trademarkList(state){
        return state.searchList.trademarkList||[];
        },
        attrsList(state){
        return state.searchList.attrsList||[];
        }
}
export default{
    state,
    mutations,
    actions,
    getters
}