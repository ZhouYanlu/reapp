import {reqBannerList, reqCategoryList, reqFloorList} from '@/api'
//home的小仓库
const state={
    // state中的数据默认初始值不能乱写，服务器返回对象，服务器返回数组[根据接口返回值初始化的]
    // home仓库中存储三级菜单的数据
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    // floorList数据
    floorList:[]

}
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList
        // console.log('修改仓库中bannerList数据');
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
    
    
}
const actions={
    // 通过API里面的接口函数调用,向服务器发送请求，获取服务器的数据
   async categoryList({commit}){
        let result= await reqCategoryList();
        // console.log(result);//返回promise对象
        if(result.code==200){
            commit('CATEGORYLIST',result.data)
        }
       
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
       
        // console.log('向服务器发送ajax请求，获取轮播图的数据');
        let result=await reqBannerList()
        // console.log(result);
        if(result.code==200){
            commit('BANNERLIST',result.data)
        }
    },
    // 获取floor属性
    async getFloorList({commit}){
        let result=await reqFloorList()
        if(result.code==200){
            // 提交mutation
            commit('GETFLOORLIST',result.data)
        }
    }

}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}