//  配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//  使用插件
Vue.use(VueRouter)


// 先把VueRouter原型对象的push,先保存一份
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace

// 重写push和replace
//第一个参数:告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败回调
VueRouter.prototype.push=function (location,resolve,reject) {
    if(resolve&&reject){
        originPush.call(this,location,resolve,resolve)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function (location,resolve,reject) {
    if(resolve&&reject){
        originReplace.call(this,location,resolve,resolve)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

//配置路由
let router= new VueRouter({
    //配置路由
    routes,//kv一致省略v
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {x:0,y:0}
      },
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to,from,next)=>{
    next();
    // 用户登录了才会有token，未登录一定不会有token
    let token=store.state.user.token
    // 用户信息
    let name=store.state.user.userInfo.name
    if (token) {
        // 用户已经登陆了还想去login[不能去，停留在首页]
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
            // console.log(111);
        } else {
            //  登陆了去的不是login(可能是home|search|detail|shop)
            // 如果用户名已有
            if (name) {
                // console.log(222);
                next()
            } else {
                // 没有用户信息，派发action让仓库存储用户信息在跳转
                try {
                    // 获取用户信息成功，并且跳转到下一步
                    await store.dispatch('userInfo')
                    next()
                    // console.log(333);     
                } catch (error) {
                    // token失效 身份过期就会请求不到，需要重新登录
                    await store.dispatch('userLogout')
                    next('/login')
                    // console.log(444);
                }
            }
            next();
        }
    } else {
        // 用户未登录：不能去交易,支付，支付成功(pay|paysuccess)，个人中心的页面
        // 但是用户能够去以下界面 登录界面
        // 注意indexOf可以判断是否含有某个字符，数字，数组对象，没有的话就返回-1
        if(to.path.indexOf('/trade')!=-1||to.path.indexOf('/pay')!=-1||to.path.indexOf('/center')!=-1){
        // 把未登录的想去但是没有去成的信息，存储在地址栏中
            next('/login?redirect='+to.path)
        }else{
            // 去的不是上面这些路由，遇到home，search，shopcart就放行
            next()
        }
    
        // console.log(555)  
    }
})

export default router
