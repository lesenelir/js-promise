/**
 *  大前提： 异步的回调，如果不提前指定回调函数，一旦异步完成，就会错过数据
 *
 *
 *  为什么要用Promise：
 *   1.指定回调函数的方式更加灵活:
 *      纯回调函数方式：必须在执行异步任务之前指定回调函数（先定义好回到函数，在异步任务开始的时候就传入成功和失败的回调函数）
 *      Promise方式：可以在异步任务开始之前或之后指定回调函数  （可以在请求发出甚至结束后指定回调函数）
 *                  启动异步任务 => 返回Promise对象 => promise对象绑定回调函数(甚至可以在异步任务结束后指定)
 *
 *    Note： 纯回调函数，在传递回调函数，和异步操作之前必须定义回调函数，
 *           但Promise把异步和回调拆开，可以先拿到异步任务执行的结果，再决定拿到结果做什么
 *
 *
 *   2.支持链式调用,可以解决回调地狱问题
 *      回调地狱：回调函数嵌套， 且外部回调函数异步执行的结果，是嵌套的回调函数执行的条件
 *      回调地狱缺点： 不便于阅读，不便于异常处理
 *
 *      回调地狱解决方案：
 *        Promise 还是会有回调函数 ， 只是解决的是回调嵌套问题
 *        async / await  看着没有回调函数
 *
 */
