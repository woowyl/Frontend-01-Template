# JavaScript中的对象

![js的对象](JS_OBJ.svg)

## 哪些对象是我们无法实现的

    本地对象是无法实现的，
     - Object
     - Function
     - Array
     - String
     - Boolean
     - Number
     - Date
     - RegExp
     - arguments
     - Error

## 无法实现对象的特征

ECMA-262 把本地对象（native object）定义为“独立于宿主环境的 ECMAScript 实现提供的对象”。简单来说，本地对象就是 ECMA-262 定义的类（引用类型）。这些依赖于底层代码实现的功能，无法通过JS代码去实现。