const p1 = Promise.resolve(3);
const p2 = 1000;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hey');
  }, 2000);
});

Promise.All = promises => {
  const responses = [];
  const errorResponses = [];
  return new Promise((resolve, reject) => {
    promises.forEach(async (promise, i) => {
      try {
        const res = await promise;
        responses.push(res);
        if (i == promises.length - 1) {
          if (errorResponses.length > 0) {
            reject(errorResponses);
          } else {
            resolve(responses);
          }
        }
      } catch (err) {
        errorResponses.push(err);
        reject(err);
      }
    });
  });
};

Promise.All([p1, p2, p3]).then(i => console.log(i));
