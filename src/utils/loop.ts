function loop(
  iterations: number,
  delay: number,
  cb: (iteration: number) => void,
): void {
  let counter = 0;

  function performIteration() {
    if (counter < iterations) {
      console.log(`Iteration ${counter + 1}`);
      cb(counter);
      counter++;

      setTimeout(performIteration, delay);
    }
  }

  performIteration();
}

export default loop;
