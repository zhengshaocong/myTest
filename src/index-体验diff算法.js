import {init}from "snabbdom/init"
import {classModule}from "snabbdom/modules/class"
import {propsModule}from "snabbdom/modules/props"
import {styleModule}from "snabbdom/modules/style"
import {eventListenersModule}from "snabbdom/modules/eventlisteners"
// import {h}from "snabbdom/h"

//创建patch

var patch=init([classModule,propsModule,styleModule,eventListenersModule])

// var myVnode1=h('a',
//     {
//         props:{href:'https://www.atguigu.com',target:'_blank'},
//         class:{ccc:true}
//     },
//     '尚硅谷'
//     )

// const myVnode2=h('div',{},'我是一个节点')

// const myVnode3=h('ul',[
//     h('li','苹果'),
//     h('li','香蕉')
// ])

// patch(container,myVnode3 )

import h from './mysnabbdom/h'

let v1=h('div',{},[
    h('div',{},'A'),
    h('div',{},'B'),
    h('div',{},'C'),
    h('div',{},'D')
])

const container=document.getElementById('container')

patch(container,v1)


let v2=h('div',{},[
    h('div',{},'A'),
    h('div',{},'B'),
    h('div',{},'C'),
    h('div',{},'D'),
    h('div',{},'E')
])

let btn=document.getElementById('btn')

btn.onclick=function(){
    patch(v1,v2)
}