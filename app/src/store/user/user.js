// 注册与登录的模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqUserLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
const state={
    code:'',
    token:getToken(),
    userInfo:''
}
const mutations={
   GETCODE(state,code){
       state.code=code
   },
   USERLOGIN(state,token){
       state.token=token
   },
   USERINFO(state,userInfo){
       state.userInfo=userInfo
   },
   UASERLOGOUT(state){
       state.token=''
       state.userInfo={}
       removeToken()
   }
}
const actions={
    // 获取验证码
    async getCode({commit},phone){
        // 获取验证码的这个接口，把验证码返回，但是正常情况，后台把验证码发到用户手机上（省钱）
        let  result= await reqGetCode(phone)
      if(result.code===200){
          commit('GETCODE',result.data)
          return 'ok'
      }else{
          return Promise.reject(new Error('faile'))
      }
    },
    // 用户注册
    async userRegister({commit},data){
      let result=await reqUserRegister(data)
      console.log(result);
      if(result.code==200){
          return 'ok'
      }else{
          return Promise.reject(new Error('faile'))
      }
    },
    // 用户登录
    async userLogin({commit},data){
        let result=await reqUserLogin(data)
    // 服务器下发token，用户唯一的标识
    // 将来经常会通过token找服务器要用户信息进行展示
    if(result.code===200){
     commit('USERLOGIN',result.data.token)
    // 持久化储存token
     setToken(result.data.token)
    // localStorage.setItem('TOKEN',result.data.token)
     return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    }     
    },
    // 获取用户信息
    async userInfo({commit},data){
        let result= await reqUserInfo(data)
        console.log(result);
        if(result.code===200){
            // 提交用户的信息
            commit('USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户退出登录
    async userLogout({commit}){
        // z只是向服务器发送一次请求，通知服务器清除commit
       let result= await reqUserLogout()
    //    action中是不能操作state，要提交给mutations才可以
       if(result.code==200){
           commit('UASERLOGOUT')
           return 'ok'
       }else{
          return Promise.reject(new Error('faile'))
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