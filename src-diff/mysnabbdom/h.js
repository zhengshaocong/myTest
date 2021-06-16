import vnode from "./vnode"
export default  function(sel,data,c){
    if(arguments.length!=3){throw new Error('低配版,参数固定')}
    if(typeof c==='string'||typeof c ==='number'){
        return vnode(sel,data,undefined,c,undefined)
    }else if(Array.isArray(c)){
        let children=[]
        for(let i=0;i<c.length;i++){
            if(!(Object.prototype.toString.call(c[i])==='[object Object]' && c[i]['sel'])){
                throw new Error('参数3 类型数组内的有元素不是h函数  ')
            }
            children.push(c[i])
        }
        return vnode(sel,data,children,undefined,undefined)
    }else if(typeof c ==='object' && c.hasOwnproperty('sel')){
        let children=[c]
        return vnode(sel,data,children,undefined,undefined)
    }else{
        throw new Error('参数3类型有误')
    }
}