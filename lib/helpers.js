const compose2 = (f, g) => (...args) => f(g(...args));

const compose = (...fns) => fns.reduce(compose2);

const chain = (...fns) => (...args) => fns.slice(1).reduce(
  (promise, fn) => promise.then(fn),
  Promise.resolve(
    fns[0](...args)
  )
);

const parseJson = res => {
  try {
    return res.json().catch(err => err);
  } catch(err) {
    console.log('ERROR================')
    // console.log(res, err);
  }
}

const raiseError = res => (
  res.ok ? Promise.resolve(res) : Promise.reject(res)
);

module.exports = {
  compose,
  chain,
  parseJson,
  raiseError,
};