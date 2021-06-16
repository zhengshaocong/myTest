import Dep from './Dep'
const hasProto = '__proto__' in {}
export default class Observer {
    constructor (value) {
      this.value = value
      // 给value新增一个__ob__属性，值为该value的Observer实例
      // 相当于为value打上标记，表示它已经被转化成响应式了，避免重复操作
      this.dep=new Dep()
      def(value,'__ob__',this)
      if (Array.isArray(value)) {
        // 当value为数组时的逻辑
        // ...
        value.__proto__=arrayMethods
        this.observeArray(value)
      } else {
        this.walk(value)
      }
    }
  
    walk (obj) {
      const keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i])
      }
    }

    observeArray (items) {
        for (let i = 0, l = items.length; i < l; i++) {
          if(typeof items[i] === 'object'){
            observe(items[i])
          }
        }
      }
  }




  /**
   * 使一个对象转化成可观测对象
   * @param { Object } obj 对象
   * @param { String } key 对象的key
   * @param { Any } val 对象的某个key的值
   */
  function defineReactive (obj,key,val) {
    // 如果只传了obj和key，那么val = obj[key]
    if (arguments.length === 2) {
      val = obj[key]
    }
    if(typeof val === 'object'){
        new Observer(val)
    }
    const dep=new Dep()
    let childOb = observe(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get(){
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
        console.log(`${key}属性被读取了`);
        return val;
      },
      set(newVal){
        if(val === newVal){
            return
        }
        console.log(`${key}属性被修改了${newVal}`);
        val = newVal;
        dep.notify()
      }
    })
  }

  const arrayProto = Array.prototype
  export const arrayMethods = Object.create(arrayProto);
   
  [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ].forEach(function (method) {
    // cache original method
    var original = arrayProto[method]
    def(arrayMethods, method, function mutator () {
      // avoid leaking arguments:
      // http://jsperf.com/closure-with-arguments
      var i = arguments.length
      var args = new Array(i)
      while (i--) {
        args[i] = arguments[i]
      }
      var result = original.apply(this, args)
      var ob = this.__ob__
      var inserted
      switch (method) {
        case 'push':
          inserted = args
          break
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }
  //same as object change
  //check change to reobserve and publish all dependencies
      if (inserted) ob.observeArray(inserted);
      // notify change
    //   console.log(ob)
      ob.dep.notify()
      return result
    })
  })
  


function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    })
  }


  function observe (value, asRootData){
    if (typeof value !=='object') {
      return
    }
    let ob
    if (value.__ob__ && value.__ob__ instanceof Observer) {
      ob = value.__ob__
    } else {
      ob = new Observer(value)
    }
    return ob
  }