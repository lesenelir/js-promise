// function send() {
//   new Promise(ajaxA).then(ajaxB)
// }
//
// send()
//
// function ajaxA(resolve, reject) {
//   console.log('ajaxA开始')
//   setTimeout(() => {
//     console.log('ajaxA完成')
//     resolve()
//   }, 1000)
// }
//
// function ajaxB() {
//   console.log('ajaxB开始')
//   setTimeout(() => {
//     console.log('ajaxB完成')
//   }, 1000)
// }
//

new Promise((resolve, reject) => {
  console.log('ajaxA开始')
  setTimeout(() => {
    console.log('ajaxA完成')
    resolve()
  }, 1000)
}).then(
    value => {
      console.log('ajaxB开始')
      setTimeout(() => {
        console.log('ajaxB完成')
      }, 1000)
    }
)

// Note: promise 解决的是异步编程
