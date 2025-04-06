/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  let counter = 0;
  const start = Date.now();
  for (let i = 0; i < data; i++) {
    counter += i;
  }
  const end = Date.now();
  const response = `total count is ${counter}`;
  postMessage(response);
  postMessage(`executed in ${end - start} ms`);
});
