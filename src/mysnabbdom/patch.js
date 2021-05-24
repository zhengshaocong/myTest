import vnode from './vnode'
import createElement from './createElement'
import pathVnode from './pacthVnode'
export default function (oldVnode,newVnode){
    if(oldVnode.sel===''||oldVnode.sel===undefined){
        oldVnode=  vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode)
    }

    if(oldVnode.key===newVnode.key&&oldVnode.sel===newVnode.sel){
        pathVnode(newVnode,oldVnode)
    }else{
        let newVnodeDom= createElement(newVnode,oldVnode.elm)
        if(oldVnode.elm.parentNode&&newVnodeDom){
            oldVnode.elm.parentNode.insertBefore(newVnodeDom, oldVnode.elm)
        }
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}