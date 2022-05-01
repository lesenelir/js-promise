const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.reject(3)

const pAll = Promise.all([p1,p2, 12])

pAll.then(
    value => {
      console.log(value)
    },
    reason => {
      console.log(reason)
    }
)

const pAll2 = Promise.allSettled([p1, p2, p3])
pAll2.then(
    value => {
      console.log(value)
    },
    reason => {
      console.log(reason)
    }
)
