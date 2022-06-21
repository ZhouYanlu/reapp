import { reqGetDetailInfo,reqAddOrUpdateShopCart} from "@/api"
// 封装游客身份模块uuid---->生成一个随机字符串（不能再改变了）
import {getUUID} from '@/utils/uuid_token'
const state = {
    detailInfo: {},
    // 游客的临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETDETAILINFO(state, detailInfo) {
        state.detailInfo = detailInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getDetailInfo({ commit }, skuId) {
        let result = await reqGetDetailInfo(skuId)
        if (result.code == 200) {
            commit('GETDETAILINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async AddOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的解构，加入购物车之后前台将参数带给服务器
         // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表着此操作成功
         // 服务器没有返回其余的数据，所以就不需要三连环存储数据
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        // 判断服务器返回数据是否成功
        if(result.code==200){
            // 返回的成功的标记
            return 'ok'
           
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))  
        }
      
    },
 
}
// 简化数据而生
const getters = {
    // 路径导航简化的数据
    categoryView(state){
        // 当detailInfo为一个空对象的时候，返回的是undefined，渲染到结构中就会出现假报错
      //当前计算出来的categoryView属性值至少是一个空对象，这样假的报错就不会有了
        return state.detailInfo.categoryView||{};
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.detailInfo.skuInfo||{}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}