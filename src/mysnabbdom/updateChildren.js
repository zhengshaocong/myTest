import pacthVnode from './pacthVnode'
import createElement from './createElement'
function checkSameVnode(a,b){
    return a.sel===b.sel&&a.key===b.key
}

export default function updateChildren(parentElm,olCh,newCh){
    console.log(olCh)
    console.log(newCh)

    let newStartIdx=0
    let newEndIdx=newCh.length-1
    let oldStartIdx=0
    let oldEndIdx=olCh.length-1

    let newStartVnode=newCh[0]
    let newEndVnode=newCh[newEndIdx]
    let oldStartVnode=olCh[0]
    let oldEndVnode=olCh[oldEndIdx]


    let newOther=[]//收录新列表内新增模块 却存在边缘外的对象

    while(oldStartIdx<=oldEndIdx&&newStartIdx<=newEndIdx){
        if(checkSameVnode(newStartVnode,oldStartVnode)){
            pacthVnode(newStartVnode,oldStartVnode)
            newPlus()
            oldPlus()
        }else if(checkSameVnode(newEndVnode,oldEndVnode)){
            pacthVnode(newEndVnode,oldEndVnode)
            newSubtract()
            oldSubtract()
        }else if(checkSameVnode(newEndVnode,oldStartVnode)){
            pacthVnode(newEndVnode,oldStartVnode)
            //新后与旧前命中 节点需要移动到旧后之后 方向看新的对比项
            parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling )
            newSubtract()
            oldPlus()
        }else if(checkSameVnode(newStartVnode,oldEndVnode)){
            pacthVnode(newStartVnode,oldEndVnode)
            //新后与旧前命中 节点需要移动到旧后之后 方向看新的对比项
            parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm)
            newPlus()
            oldSubtract()
        }else{
            let issuccess=false
            for(let i=oldStartIdx;i<=oldEndIdx;i++){
                if(checkSameVnode(newStartVnode,olCh[i])){
                    pacthVnode(newStartVnode,olCh[i])
                    parentElm.insertBefore(olCh[i].elm,oldStartVnode.elm)
                    newStartIdx++
                    olCh[i]=undefined
                    newStartVnode=newCh[newStartIdx]
                    issuccess=true
                    break
                }
            }
            if(!issuccess){
                parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
                newStartIdx++
                newStartVnode=newCh[newStartIdx]
            }
        }
    }
    //剩余
    // if(newStartIdx<=newEndIdx){
    //     console.log(newStartIdx,newEndIdx)
    //     // console.log('new有剩余') 新增 位于新后+1之前 若没有新后+1 则会直接加在最后
    //     const before=olCh[oldEndIdx+1]?olCh[oldEndIdx+1].elm:null
    //     for(let i=newStartIdx;i<=newEndIdx;i++){
    //         parentElm.insertBefore(createElement(newCh[i]),before)
    //     }
    // }
    if(oldStartIdx<=oldEndIdx){
        console.log('old有剩余')
        console.log(oldStartIdx,oldEndIdx)
        for(let i=oldStartIdx;i<=oldEndIdx;i++){
            olCh[i].elm.parentNode.removeChild(olCh[i].elm)
        }
    }


    function newPlus(){//新对象获取下一节
        let index=newStartIdx
        let val=newCh[++index]
        if(val){
            newStartVnode=val
            newStartIdx=index
        }else if(index<newEndIdx){
            newPlus()
        }else{
            newStartVnode=val
            newStartIdx=index
        }
    }

    function oldPlus(){//新对象获取下一节
        let index=oldStartIdx
        let val=olCh[++index]
        if(val){
            oldStartVnode=val
            oldStartIdx=index
        }else if(index<newEndIdx){
            oldPlus()
        }else{
            oldStartVnode=val
            oldStartIdx=index
        }
    }

    function newSubtract(){//新对象获取下一节
        let index=newEndIdx
        let val=newCh[--index]
        if(val){
            newEndVnode=val
            newEndIdx=index
        }else if(index>newStartIdx){
            newSubtract()
        }else{
            newEndVnode=val
            newEndIdx=index
        }
    }

    function oldSubtract(){//新对象获取下一节
        let index=oldEndIdx
        let val=olCh[--index]
        if(val){
            oldEndVnode=val
            oldEndIdx=index
        }else if(index>newStartIdx){
            oldSubtract()
        }else{
            oldEndVnode=val
            oldEndIdx=index
        }
    }
}