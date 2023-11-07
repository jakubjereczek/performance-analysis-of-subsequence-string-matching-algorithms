export interface MemoryMonitorStatistics {
  minMemoryUsage: number;
  maxMemoryUsage: number;
  minHeapUsage: number;
  maxHeapUsage: number;
  averageMemoryAvg: number;
  heapMemoryAvg: number;
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
      minMemoryUsage: this.minMemoryUsage,
      maxMemoryUsage: this.maxMemoryUsage,
      minHeapUsage: this.minHeapUsage,
      maxHeapUsage: this.maxHeapUsage,
      averageMemoryAvg:
        totalMemoryUsage / this.memoryUsage.length / (1024 * 1024),
      heapMemoryAvg: totalHeapUsage / this.memoryUsage.length / (1024 * 1024),
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
