// 路由配置信息
// 引入一级路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
// 引入一级路由组件
import Center from '@/pages/Center'
// 引入二级路由组件
import myOrder from '@/pages/Center/groupOrder'
import groupOrder from '@/pages/Center/myOrder'


//配置路由
export default
    //配置路由
[
    {
        path:'/home',
        component:Home,
        meta:{isShow:true}
    },
    {
        path:'/login',
        component:Login,
        meta:{isShow:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{isShow:false}
    },
    {
        path:'/search/:keyword?',
        component:Search,
        meta:{isShow:true},
        name:'search',
        // 路由组件能不能传递props数据
        // 布尔值写法:params
        // props:true,
        // 对象写法：额外给路由组件传递一些props
        // props:{a:1,b:2}
        //函数写法：可以把params参数，query参数，通过props传递给路由组件
        /* props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k}
        }  */

    },
    {
      path:'/detail/:skuid',
      component:Detail,
      meta:{isShow:true},
      name:"detail"
    },
    {
        path:'/addcartsuccess',
        name:"addcartsuccess",
        component:AddCartSuccess,
        meta:{isShow:true}
    },
    {
        path:'/shopcart',
        name:"shopcart",
        component:ShopCart,
        meta:{isShow:true}
    },
    {
        path:'/trade',
        name:"trade",
        component:Trade,
        meta:{isShow:true},
        // 路由独享守卫
        beforeEnter:(to,from,next)=>{
            //去交易页面，必须是从shopcart页面来
            if(from.pach=='/shopcart'){
                next()
            }else{
                // 其它的路由组件而来，停留在当前
                next(false)
            }
        }
    },
    {
        path:'/pay',
        name:'pay',
        component:Pay,
        meta:{isShow:true},
        // 路由独享守卫
        beforeEnter:(to,from,next)=>{
        //   去支付页面必须要从交易来
        if(from.path=='/trade'){
            next()
        }else{
            next(false)
        }
        }
    },
    {
        path:'/paysuccess',
        name:'paysuccess',
        component:PaySuccess,
        meta:{isShow:true}
    },
    {
        path:'/center',
        component:Center,
        meta:{isShow:true},
        // 二级路由组件
        children:[
            {
                path:'myorder',
                name:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                name:'grouporder',
                component:groupOrder
            },
            // 重定向
            {
                path:'center',
                redirect:'center/myorder'
            }
        ]
    },
    //  重定向，在项目跑起来的时候，立马访问首页
    {
        path:'*',
        redirect:'/home'
    }
]
