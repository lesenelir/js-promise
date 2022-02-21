# js-promise
 Asynchronous programming in JS

### 一、异步操作概述

#### 1.1 单线程模式

单线程模式让JavaScript可能不会出现“堵塞”问题



**事件循环机制Event Loop：**

*       JS引擎一遍遍检查：只要同步任务执行完后，JS引擎就检查挂起来的异步任务能否进入主线程
*       这种循环检查机制，就叫事件循环
*       Promise回调函数是微任务，是一种特殊的异步任务；正常异步任务是在下一次事件循环执行，微任务是在本次事件循环执行

---

#### 1.2 同步任务和异步任务

同步任务：

- 没有被引擎挂起，在主线程排队执行的任务
- 只有前一个任务执行完毕，才能执行后一个任务

异步任务：

- 被引擎挂起，不进入主线程，进入任务队列的任务
- **异步任务的写法都是采用回调函数方式**
- 异步任务不具有“堵塞”效应



举例：

>  Ajax 操作可以当作同步任务处理，也可以当作异步任务处理， 由开发者决定。
>
> 如果是同步任务，主线程就等着 Ajax 操作返回结果，再往下执行（会存在等待时延）。
>
> 如果是异步任务，主线程在发出 Ajax 请求后，就直接往下执行，等到 Ajax 操作有了结果，主线程再执行对应的**回调函数（异步任务）**。



> Note:
>
> 1. 异步任务重新进入主线程是采用回调函数（函数作为参数）的方式
>
> 2. 回调函数： 函数作为参数；定义了、执行了、但没调用

---

#### 1.3 任务队列和事件循环

JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。



JS运行流程：

主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务通过回调函数的形式重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。



- 任务队列里存放异步任务
- 异步任务写法通常都是回调函数
- 一旦异步任务重新进入主线程，就会执行对应的回调函数
- 如果一个异步任务没有回调函数，就不会进入任务队列，即不会重新进入主线程（没有回调函数执行指定的操作）

>通过编写回调函数的方式实现异步任务，一旦异步任务重新进入主线程，就执行回调函数

---

#### 1.4 异步操作的模式

- 回调函数
- 事件监听
- 发布/订阅

---

#### 1.5 异步操作的流程控制

Problem： 多个异步操作，如何确定异步操作执行的顺序，以及如何保证遵守这种顺序

---

### 二、定时器

`setTimeout`函数用来指定某个函数或某段代码，在多少毫秒之后执行

`setInterval`指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。



**定时器运行机制：**

`setTimeout`和`setInterval`的运行机制，是**将指定的代码移出本轮事件循环**，等到下一轮事件循环，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就继续等待。

`setTimeout`和`setInterval`指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完，才会开始执行。

---

### 三、Promise对象简单介绍

#### 	3.1 概述

> Promise对象是Js的异步操作解决方案，为异步操作提供统一的接口。
>
> 充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口



Promise是一个对象，也是一个构造函数

> Promise设计思想：所有异步任务返回一个Promise实例，Promise实例有一个.then方法，用来指定下一步的回调函数



```javascript
function f1(resolve, reject) {
  // 异步代码...
}

var p1 = new Promise(f1);
p1.then(f2); // f1执行完才会去执行f2
// 传统写法把f2作为回调函数传入f1，比如写成f1(f2)
```

---

#### 3.2 Promise对象状态

Promise实例有三种状态

- 异步操作未完成 pending
- 执行异步操作后，异步操作成功 resolved，传回一个值value
- 执行异步操作后，异步操作失败 rejected，抛出一个错误error



> 一旦发生状态变化，就凝固，不会有新的状态变化。即，Promise实例状态变化只发生一次。

---

#### 3.3 Promise构造函数

```javascript
var promise = new Promise(function (resolve, reject) {
  // ...

  if (/* 异步操作成功 */){
    resolve(value);
  } else { /* 异步操作失败 */
    reject(new Error());
  }
});
```

Promise构造函数接受一个函数作为参数（该函数称之为构造器函数），构造器函数的参数是resolve和reject，这两个也是函数，并由JavaScript引擎提供。

**resolve和reject本身都是一个函数**

>resolve，在异步操作成功时调用，将异步操作的结果，作为参数传递出去。
>
>reject，在异步操作失败时调用，将异步操作抛出的错误，作为参数传递出去

****

#### 3.4 Promise.prototype.then()

Promise 实例的`then`方法，用来指定添加回调函数

> .then()可以接受两个回调函数参数：
>
> 1. 一个是异步操作成功的回调函数
> 2. 一个是异步操作失败的回调函数

```javascript
var p1 = new Promise(function (resolve, reject) {
  resolve('成功');
});
p1.then(console.log, console.error);
// "成功"

var p2 = new Promise(function (resolve, reject) {
  reject(new Error('失败'));
});
p2.then(console.log, console.error);
// Error: 失败
```

**.then()方法可以链式使用**

```javascript
 p1
  .then(step1) // step都是回调函数
  .then(step2)
  .then(step3) // step3是函数有返回值，后一个then的log可以显示
  .then(
    console.log,
    console.error
  );
```

p1后面有四个then方法，即有四个回调函数，只要上一步为resolved就会依次执行后面的回调函数。

最后一个then方法，log只显示step3的返回值；**error可以显示step1、step2、step3任意一个的错误**。eg.如果`step1`的状态变为`rejected`，那么`step2`和`step3`都不会执行了。

> Promise对象的报错具有传递性

**Note：简单来说：then()方法用来添加回调函数**

---

#### 3.5 微任务

Promise的回调函数不是正常的异步任务，而是微任务（microtask）

微任务和正常异步任务之间的区别：

- 正常异步任务追加到下一轮事件循环
- 微任务（另外一种异步任务）追加到本轮事件循环
- 即：微任务的执行时间一定早于正常异步任务



```javascript
setTimeout(function() {
  console.log(1);
}, 0);

new Promise(function (resolve, reject) {
  resolve(2);
}).then(console.log);

console.log(3);
// 3
// 2
// 1
```

---

#### 3.6 总结

Promise让回调函数变成了链式写法。可以同时执行多个异步操作，等它们状态都改变以后，再执行一个回调函数。

> Promise状态一旦改变，无论何时都可以看到这个状态。所以，可以随便什么时候都可以为Promise对象实例通过then方法添加回调函数，且都能执行。

**即：Promise指定回调函数的方式更加灵活**



指定回调函数方式：

- 纯回调函数方式
  - 必须在异步任务之前指定回调函数（异步任务开始之前传入成功和失败的回调函数）
- Promise方式
  - 可以在异步任务之前和之后指定回调函数（可以在请求发出甚至结束之后指定回调函数）
  - 启动异步任务 => 返回Promise对象 => promise对象绑定回调函数(甚至**可以在异步任务结束后指定**）

---

### 四、Promise对象总体介绍

#### 4.1 Promise含义

Promise是一种异步编程的解决方案，传统的异步编程解决方案是：回调函数和事件。

Promise是一个容器，里面保存一个异步操作的结果；Promise也是一个对象，从Promise可以获得异步操作的消息。

> Promise可以将异步操作以同步操作的流程表达出来，避免层层嵌套。



Promise对象的特点：

- Promise对象状态只取决于异步操作的结果，不受外界影响。
- Promise对象状态一旦改变，就不会再变化，且任何时候都可以得到这个结果；事件Event不同，一旦错过，再去监听也得不到结果。

---

#### 4.2 基本用法

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

**Promise实例对象生成后可以通过then()方法指定resolved状态和rejected状态的回调函数**

then()方法接受两个参数，且这两个参数都是回调函数形式，都接受Promise对象传出的值作为参数。



```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

Promise新建后就会立即执行，即，Promise参数的执行器函数是一个同步回调，里面不是异步的代码都会立即执行。



```javascript
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

p2的resolve方法将p1作为参数，即p2异步操作的结果是返回p1的异步操作。

此时，p1的状态会传递给p2，即p1的状态决定了p2的状态。

> 例子：

```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```

> p1三秒变为rejected状态，p2一秒后改变状态，resolve方法返回p1，此时p2自己状态无效，返回了另一个Promise对象的状态即p1状态。
>
> 此时针对p2的then方法，实质就是针对p1的then方法。

**一般而言resolve()和rejected()方法都写在执行器函数的代码段最后，且在这两个函数之前加上return，保证执行器后面的代码不执行**

---

#### 4.3 then()方法

then()为Promise实例对象指定状态改变后的回调函数。

> 重点：then()方法返回的是一个**新的Promise实例**（不是原来的Promise实例），所以then()可以采用链式写法，调用另一个then方法；同理，catch()方法返回的也是一个**新的Promise实例**

```javascript
getJSON("/post/1.json")
.then(
  post => getJSON(post.commentURL) // getJSON返回一个新的Promise对象
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
```

该代码指定了两个回调函数，第一个then回调函数完成后，将返回结果作为参数，传入第二个then回调函数。第二个then回调函数，会等待新的Promise对象状态发生改变，如果状态变为resolved，就调用第一个回调函数，如果状态变为rejected，就调用第二个回调函数。

---

#### 4.4 catch()方法

catch（）用来指定发生错误的回调函数，catch()返回的还是一个新的Promise对象

`Promise.prototype.catch() === .then(null, reject) === .then(undefined, reject)`

```javascript
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
```



捕获错误与抛出错误

```javascript
// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```



**Promise对象执行器函数中只能返回一个resolve或者reject，如果有两个，则返回第一个出现的函数（因为Promise状态一旦改变，就不会再变）**

```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test'); // 后一个不执行，promise状态改变就不发生变化
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```



**Promise对象的错误具有“冒泡性质”，会一直往后传递，直到被then处理err(reason)捕获为止**

> 不建议写then的第二个参数即err(reson)参数；建议使用catch()方法，来捕获错误处理的回调函数

---

#### 4.5 finally()方法

finally()用来指定不管Promise对象最后状态如何，都会执行的操作。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});

server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```

finally()方法不关心调用finally()的Promise实例状态，不依赖于Promise执行的结果。

---

#### 4.6 all()方法

all()将多个Promise实例，包装成一个新的Promise实例

```javascript
const p = Promise.all([p1, p2, p3]);
```

特点：

- p1 p2 p3都为resolved，p的状态才是resolved。此时，p1 p2 p3 返回值组成一个数组，传递给p的回调函数。
- p1 p2 p3有一个为rejected，p的状态就为rejected。此时，第一个被rejected的实例返回值，会传递给p的回调函数。

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2]) // 此时p2执行上述代码的then方法
.then(result => console.log(result)) // 调用这个回调函数
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```

上述代码解读：p1首先变为resolved，p2先变为rejected，但p2有自己的catch方法，该方法返回一个新的Promise实例对象，all函数中的p2Promise实例对象，其实是这个Promise实例对象。导致，all方法参数里的两个Promise实例对象都是resolved状态。

> **重点：如果一个promise中有reject()，但是其对应的回调函数then方法中有对应解决的reason，则该then返回新的Promise对象状态由回调函数执行结果return来决定**



```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// Error: 报错了
```

上述代码解读：由于p2没有catch方法，就会调用all当中的catch方法

---

#### 4.7 race()方法

race() 英文有“比赛”意思。也是将多个Promise实例对象，包装成一个新的Promise实例对象，其中新的Promise实例对象状态和最先完成的子Promise实例对象有关。

```javascript
const p = Promise.race([p1, p2, p3]);
```

其中，`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

---

#### 4.8 resolve()方法

Promise.resolve()方法返回一个新的Promise实例对象，将现有对象转为Promise对象。

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

---

#### 4.9 reject()方法

Promise.reject()方法返回一个新的Promise实例对象，该实例状态为rejected

```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

---

#### 4.10 Promise关键点

1. 如何改变Promise对象的状态：

   - resolve(value) 当前pending状态变为resolved状态
   - reject(reason) 当前pending状态变为rejected状态
   - throw new Error('xxx') 抛出异常，当前pending状态变为rejected状态



2. 一个Promise对象可以指定多个回调函数，并都会调用

```javascript
const p = new Promise((resolve, reject) => {
  resolve(1)
})
p.then(
    value => {
      console.log('value1', value)
    }
)
p.then(
    value => {
      console.log('value2', value)
    }
)
// value1 1
// value2 1
```



3. 改变Promise状态和指定回调函数谁先谁后的问题

   > 指定回调函数指的是，调用then()方法

   - 都有可能，正常情况下，是先指定回调函数，再改变Promise状态（纯回调函数先指定回调函数）；但也可以先Promise改变状态，再指定回调函数
   - 如何先改变状态再指定回调函数？
     - 在Promise的执行器函数中直接调用resolve() / reject()，执行器函数中没有异步代码
     - 延长更长的时间才调用then()
   - 什么时候得到数据？
     - 如果先指定回调，当状态改变时，回调函数就会调用，得到数据
     - 如果先改变状态，当指定回调时，回调函数就会直接调用，得到数据

   > 如果执行器函数有异步回调，则先指定回调函数（then），后改变状态；
   >
   > 如果执行器函数中没有异步回调，则先改变状态，再通过then指定回调函数，并立即执行



4. promise.then()返回的新promise实例对象的结果状态由什么决定？【重要】

   - 简单来说：由then指定回调函数执行的结果决定
   - 复杂来说：
     - 如果then()回调函数抛出异常，则新promise实例对象状态为rejected，reason为抛出异常
     - 如果then()回调函数返回的是非promise对象的任意指，例如，return 3 / return undefined；则新Promise实例对象状态为resolved，value为回调函数返回值
     - 如果then()回调函数返回的是一个新的Promise对象，则此Promise对象的结果为then回调函数后生成新的Promise对象的值 return Promise.resolve(3)

   ```javascript
   new Promise((resolve, reject) => {
     reject(1)
   }).then(
       value => {
         console.log('onResolved1()', value)
         // return 1
       },
       reason => {
         console.log('onRejected1()', reason)
         return Promise.resolve(2)
         // return Promise.reject(2)
       }
   ).then(
       value => {
         console.log('onResolved2()', value)
       },
       reason => {
         console.log('onRejected2()', reason)
       }
   )
   ```



5. Promise串联多个操作任务方法

   - Promise的then方法返回一个新的Promise，可以当作then方法的链式调用
   - 通过then链式调用串联多个同步 / 异步 任务

   ```javascript
   new Promise((resolve, reject) => {
     setTimeout(() => {
       console.log("执行任务1(异步)")
       resolve(1)
     }, 1000);
   }).then(
       value => {
         console.log('任务1的结果: ', value)
         console.log('执行任务2(同步)')
         return 2
       }
   ).then(
       value => {
         console.log('任务2的结果:', value)
         return new Promise((resolve, reject) => {
           // 启动任务3(异步)
           setTimeout(() => {
             console.log('执行任务3(异步))')
             resolve(3)
           }, 1000);
         })
       }
   ).then(
       value => {
         console.log('任务3的结果: ', value)
       }
   )
   ```



6. Promise的异常穿透

   - 当使用Promise的then链式调用，可以在最后指定失败的回调

   - 链式操作，前面的操作出现了异常，都可以穿到最后失败的回调函数处

   - **Promise错误具有“冒泡性质”，会一直往后面传递，直至被then处理reason捕获为止**

   - > 不建议写then的第二个参数即err(reson)参数；建议使用catch()方法，来捕获错误处理的回调函数



7. 中断Promise链

   - 中断Promise链，意思是，在Promise的then链式调用中，在中间中断，不再调用后面的回调函数

   - 方案：在某个then回调函数中返回一个pending状态的Promise对象

     - ```javascript
       return new Promise(() => {
       })
       ```

---

### 五、async和await使用

#### 5.1 async

async function用来定义一个异步函数（通过事件循环异步执行的函数）



async特点：

*    **async函数的返回值是promise对象**   return {promise}
*    async函数返回的promise对象结果值是由async函数执行的返回值决定

```javascript
async function fn1() {
  return 1
}
const result1 = fn1()
console.log(result1)
// Promise { 1 }


async function fn2() {
  throw 2 // async返回一个失败的promise对象
}
const result2 = fn2()
result2.catch(
    reason => {
      console.log("onRejected()", 2)
    }
)
// onRejected() 2
```

---

#### 5.2 await

await expression

expression表达式一般为promise对象，也可以是其他值



await特点：

*    await 返回的是promise要处理的结果
*    如果表达式是promise对象，await返回的是【promise成功的值】
*    如果表达是其他值，直接将此值作为await的返回值



await 作用：可以去掉then繁琐的操作

```javascript
// 1. await得到成功的结果
async function fn3() {
  return Promise.resolve(3)
}
async function fn4() { // 使用await一定要用async函数
  // const value = fn3()
  // value.then(
  //     value => {
  //       console.log(value)
  //     }
  // )
  const value = await fn3() // await 可以省去繁琐的then操作
  console.log(value)
}
fn4()
// 3


// 2. await得到失败的结果
async function fn5() {
  return Promise.reject(4)
}
async function fn6() {
  try {
    const value = await fn5()
    console.log("Value: ", value)
  } catch (e) {
    console.log("Error: ", e)
  }
}
fn6()
// Error:  4
```

---

### 六、宏队列和微队列

宏队列：

- 用来保存待执行的宏任务(回调)， 比如: 定时器回调/DOM事件回调/ajax回调

微队列：

- 用来保存待执行的微任务(回调)， 比如: promise的回调/MutationObserver的回调



JS引擎执行顺序：

- 首先执行所有的同步任务代码
- 再执行微队列里的所有微任务
- 等微队列清空后，再去执行宏队列中的某个宏任务；如果某个宏任务里嵌套微任务，则把该微任务放入微队列，宏队列之后的宏任务要在该微任务之后执行。

> 关键点：执行宏队列中某个宏任务之前，需要清空微队列里的所有任务
