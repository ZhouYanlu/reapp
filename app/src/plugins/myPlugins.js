// Vue插件一定要暴露一个对象
let myPlugins={}
myPlugins.install=function(Vue,options){
    console.log(Vue);
    // 全局指令
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML=params.value.toUpperCase()
    })
}

export default myPlugins