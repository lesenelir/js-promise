/**
 *  函数对象：将函数作为对象使用时，简称为函数对象
 *  实例对象：new 函数产生的对象，简称为对象
 */

// Note： 括号左边是函数；点.的左边是对象

function Fn() { // Fn函数

}
const fn = new Fn() // Fn 构造函数；fn实例对象
console.log(Fn.prototype) // Fn函数对象
Fn.call({}) // Fn函数对象


// 【扩展】： 函数对象的__proto__指向Function.prototype
