const heapdump = require('heapdump');

class MemoryMonitor {
  private memoryUsage: Array<NodeJS.MemoryUsage>;
  private intervalId: NodeJS.Timeout | undefined;
  private maxMemoryUsage: number = 0;
  private minMemoryUsage: number = 0;

  constructor() {
    this.memoryUsage = [];
    this.intervalId = undefined;
  }

  start() {
    this.intervalId = setInterval(() => {
      const memoryInfo = process.memoryUsage();
      this.memoryUsage.push(memoryInfo);

      if (memoryInfo.rss > this.maxMemoryUsage) {
        this.maxMemoryUsage = memoryInfo.rss;
      }

      if (memoryInfo.rss < this.minMemoryUsage || this.minMemoryUsage === 0) {
        this.minMemoryUsage = memoryInfo.rss;
      }

      console.log(`Memory Usage: ${memoryInfo.rss / (1024 * 1024)} MB`);
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.calculateAverageMemoryUsage();
    }
  }

  calculateAverageMemoryUsage() {
    const totalMemoryUsage = this.memoryUsage.reduce(
      (acc, memoryInfo) => acc + memoryInfo.rss,
      0,
    );
    const averageMemoryUsage = totalMemoryUsage / this.memoryUsage.length;
    console.log(
      `Average Memory Usage: ${averageMemoryUsage / (1024 * 1024)} MB`,
    );
    console.log(`Max Memory Usage: ${this.maxMemoryUsage / (1024 * 1024)} MB`);
    console.log(`Min Memory Usage: ${this.minMemoryUsage / (1024 * 1024)} MB`);
  }
}

export default new MemoryMonitor();