import Observer from './Observer'
import Watcher from './Watcher'
let object={
    aa:[],
    cc:123
}

new Observer(object)
new Watcher(object,'aa',function(){
    console.log(object['aa'])
})
// new Watcher(object,'cc',function(){
//     console.log('6666')
// })

object.aa.push(123)
object.aa.push(222)