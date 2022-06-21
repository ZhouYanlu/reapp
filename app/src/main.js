import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// Carousel全局组件
import Carousel from "@/components/Carousel"
// Pagination分页器全局组件
import Pagination from "@/components/Pagination"
import { Button,MessageBox} from 'element-ui';
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 注册全局组件
Vue.component(Button.name,Button)
// elementUI注册组件的时候还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from './router'
// 引入仓库
import store from './store'
// 引入MockServer.js-----mock数据
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css"
let h=1
if(function f(){}){
  h+=typeof 1
}
console.log( h+=typeof 1);

/* // 测试
import {reqCategoryList} from '@/api'
reqCategoryList(); */
/* import { reqGetSearchInfo } from './api'
console.log(reqGetSearchInfo({})); */

//统一接口api文件里面全部请求函数
import * as API from '@/api' 
import atm from '@/assets/1.gif'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:atm
})


// 引入自定义插件
import myPlugins from './plugins/myPlugins'
// 注册插件
Vue.use(myPlugins,{
  name:'upper'
})

// 引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  // 全局事件总线配置
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API
  },
  // 注册路由 底下的写法kv一致省略v[router是小写的]
  router,
  // 注册仓库：组建实例对象身上会多出一个$store属性
  store
}).$mount('#app')
