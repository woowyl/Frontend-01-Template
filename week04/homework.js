

var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect];

// 广度优先，拿到的新元素之间push到数组最后
var wideSet = new Set();
objects.forEach(o => wideSet.add(o));

for(var i = 0; i < objects.length; i++) {
    var o = objects[i]
    for(var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p)
        if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
            if(!wideSet.has(d.value))
                wideSet.add(d.value), objects.push(d.value);
        if( d.get )  // 为什么get 和 wideSet也算是固有对象？
        debugger
            if(!wideSet.has(d.get))
                wideSet.add(d.get), objects.push(d.get);
        if( d.set )
            if(!wideSet.has(d.set))
                wideSet.add(d.set), objects.push(d.set);
    }
}


// 深度优先  拿到新元素后直接放入set

var deepSet = new Set();

objects.forEach(o => {
    // 首先将对象放入set中
    deepSet.add(o)
    // 遍历此对象中是否有 并将其放入set中
    getChildObj(o);
});


function getChildObj(obj) {
    if( obj.value == null) return;

}


