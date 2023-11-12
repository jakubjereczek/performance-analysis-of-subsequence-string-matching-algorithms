import FileStream from "./FileStream";
import MonitorInstance from "./Monitor";
import { PatternMatchingSuiteCallbacks } from "./patternMatchingSuite";

interface TestSuiteArgs {
  name: string;
  testname: string;
  callbacks: PatternMatchingSuiteCallbacks;
  resolveFn?: (value: unknown) => void;
  iteration?: number;
}

async function testSuite({
  name,
  testname,
  callbacks,
  iteration = 1,
  resolveFn,
}: TestSuiteArgs) {
  const { ...iterationInfo } = {
    iterations: 10,
    delay: 300,
  };

  return new Promise((resolve) => {
    const monitorInstance = new MonitorInstance();
    monitorInstance.init({
      ...iterationInfo,
      callback: () => {
        callbacks[0]();
      },
      onFinishCallback: (results) => {
        const fileStream = new FileStream(
          `${name}-${testname}-iteration-${iteration}.txt`,
        );
        fileStream.create();
        fileStream.write(
          `${name.toUpperCase()} (${
            iterationInfo.iterations
          } iterations were performed)`,
        );
        Object.entries(results).forEach((entry) => {
          fileStream.write(`${entry[0]}: ${entry[1]}`);
        });
        console.log(`${name}-${testname} results`, results);
        fileStream.close();
        monitorInstance.dispose();

        const restCallbacks = callbacks.splice(1);
        if (restCallbacks.length > 0) {
          return testSuite({
            name,
            testname,
            callbacks: restCallbacks,
            resolveFn: resolveFn || resolve,
            iteration: iteration + 1,
          });
        } else {
          if (resolveFn) {
            resolveFn(true);
          } else {
            resolve(true);
          }
          console.log("end");
        }
      },
    });
  });
}

export default testSuite;
