import MyPromise from "./01-MyPromise-1.js"

// let promise1 = new MyPromise((resolve, reject) => {
//   resolve(1)
// })
// let promise2 = new MyPromise((resolve, reject) => {
//   resolve(2)
// })
// let promise3 = new MyPromise((resolve, reject) => {
//   resolve(3)
// })
//
// let pAll = MyPromise.all(promise1, promise2, promise3)
// pAll.then(value => {
//   console.log(value)
// }, (reason) => {
//   console.log(reason)
// })


let p = new MyPromise((resolve, reject) => {
  resolve(1)
})

p.then(value => {
  console.log(value)
})
