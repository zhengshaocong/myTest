
import h from './mysnabbdom/h'

import patch from './mysnabbdom/patch'

const APP=document.getElementById('app')

// const myVnode1=h('h1',{},'你好')
let myVnode1=h('p',{},[
    h('div',{key:'A'},'A'),
    h('div',{key:'E'},'E'),
    h('div',{key:'B'},'B'),
    h('div',{key:'C'},'C'),
    h('div',{key:'D'},'D'),
])
let myVnode2=h('p',{},[
    // h('div',{key:'A'},'A'),
    // h('div',{key:'Z'},'Z'),
    // h('div',{key:'E'},'E'),
    // h('div',{key:'K'},'K'),
    // h('div',{key:'B'},'B'),
    h('div',{key:'G'},'G'),
])
patch(APP,myVnode1)
setTimeout(()=>{
    patch(myVnode1,myVnode2)
},500)



