function loop(
  iterations: number,
  delay: number,
  cb: () => void,
  finishCb: () => void,
): void {
  let counter = 0;

  function performIteration() {
    if (counter < iterations) {
      console.log(`Iteration ${counter + 1}`);
      counter++;
      cb();

      setTimeout(performIteration, delay);

      if (counter === iterations - 1) {
        finishCb();
      }
    }
  }

  performIteration();
}

export default loop;

