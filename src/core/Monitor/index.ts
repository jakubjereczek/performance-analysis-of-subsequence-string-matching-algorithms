import loop from "../../utils/loop";
import CPUMonitor, { CPUMonitorStatistics } from "./CPUMonitor";
import MemoryMonitor, { MemoryMonitorStatistics } from "./MemoryMonitor";
import PerformanceMonitor, {
  PerformanceMonitorStatistics,
} from "./PerformanceMonitor";

interface MonitorInstanceInitArgs {
  iterations: number;
  delay: number;
  callback: () => void;
  onFinishCallback: (
    results: CPUMonitorStatistics &
      MemoryMonitorStatistics &
      PerformanceMonitorStatistics,
  ) => void;
}

class MonitorInstance {
  private memoryMonitor: MemoryMonitor;
  private cpuMonitor: CPUMonitor;
  private performanceMonitor: PerformanceMonitor;

  constructor() {
    this.memoryMonitor = new MemoryMonitor();
    this.cpuMonitor = new CPUMonitor();
    this.performanceMonitor = new PerformanceMonitor();
  }

  public init({
    iterations,
    delay,
    callback,
    onFinishCallback,
  }: MonitorInstanceInitArgs) {
    loop(iterations, delay, (iteration) => {
      if (iteration === 0) {
        this.cpuMonitor.start();
      }
      this.performanceMonitor.measure(callback);
      this.memoryMonitor.save();

      if (iteration === iterations - 1) {
        this.cpuMonitor.stop();
        onFinishCallback({
          ...this.cpuMonitor.getStatistics(),
          ...this.performanceMonitor.getStatistics(),
          ...this.memoryMonitor.getStatistics(),
        });
      }
    });
  }

  public dispose() {
    this.cpuMonitor.clean();
    this.memoryMonitor.clean();
    this.performanceMonitor.clean();
  }
}

export default MonitorInstance;
