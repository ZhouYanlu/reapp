import {reqUserAddress,reqOrderInfo} from '@/api'
const state={
    address:[],
    orderInfo:{}
}
const mutations={
    USERADDRESS(state,address){
        state.address=address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
const actions={
    // 获取用户地址信息
   async userAddress({commit}){
      let result=await reqUserAddress()
      if(result.code==200){
          commit('USERADDRESS',result.data)
      }
      console.log(result);
    },
    // 获取商品清单的数据
   async getOrderInfo({commit}){
        let result=await reqOrderInfo()
        if(result.code==200){
            commit('GETORDERINFO',result.data)
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