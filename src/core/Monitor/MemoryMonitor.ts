import { bytesToMegabytes } from "../../utils/number";

export interface MemoryMonitorStatistics {
  minMemoryUsage: string;
  maxMemoryUsage: string;
  minHeapUsage: string;
  maxHeapUsage: string;
  averageMemoryAvg: string;
  heapMemoryAvg: string;
}

class MemoryMonitor {
  private memoryUsage: Array<NodeJS.MemoryUsage> = [];
  private minMemoryUsage: number = 0;
  private maxMemoryUsage: number = 0;
  private minHeapUsage: number = 0;
  private maxHeapUsage: number = 0;

  public save() {
    const memoryInfo = process.memoryUsage();
    this.memoryUsage.push(memoryInfo);

    if (memoryInfo.rss > this.maxMemoryUsage) {
      this.maxMemoryUsage = memoryInfo.rss;
    }
    if (memoryInfo.rss < this.minMemoryUsage || this.minMemoryUsage === 0) {
      this.minMemoryUsage = memoryInfo.rss;
    }

    if (memoryInfo.heapUsed > this.maxHeapUsage) {
      this.maxHeapUsage = memoryInfo.heapUsed;
    }
    if (memoryInfo.heapUsed < this.minHeapUsage || this.minHeapUsage === 0) {
      this.minHeapUsage = memoryInfo.heapUsed;
    }
  }

  public getStatistics(): MemoryMonitorStatistics {
    const totalMemoryUsage = this.memoryUsage.reduce(
      (acc, memoryInfo) => acc + memoryInfo.rss,
      0,
    );
    const totalHeapUsage = this.memoryUsage.reduce(
      (acc, memoryInfo) => acc + memoryInfo.heapUsed,
      0,
    );

    return {
      minMemoryUsage: bytesToMegabytes(this.minMemoryUsage) + "MB",
      maxMemoryUsage: bytesToMegabytes(this.maxMemoryUsage) + "MB",
      minHeapUsage: bytesToMegabytes(this.minHeapUsage) + "MB",
      maxHeapUsage: bytesToMegabytes(this.maxHeapUsage) + "MB",
      averageMemoryAvg:
        bytesToMegabytes(totalMemoryUsage / this.memoryUsage.length) + "MB",
      heapMemoryAvg:
        bytesToMegabytes(totalHeapUsage / this.memoryUsage.length) + "MB",
    };
  }

  public clean() {
    this.memoryUsage = [];
    this.minMemoryUsage = 0;
    this.maxHeapUsage = 0;
    this.minHeapUsage = 0;
    this.maxHeapUsage = 0;
  }
}

export default MemoryMonitor;
