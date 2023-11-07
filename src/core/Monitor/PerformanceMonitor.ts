import measurePerformance from "../../utils/measurePerformance";

export interface PerformanceMonitorStatistics {
  minPerformance: number;
  maxPerformance: number;
  averagePerformance: number;
}

class PerformanceMonitor {
  private performance: Array<number> = [];
  private minPerformance: number = 0;
  private maxPerformance: number = 0;

  public measure(func: () => void) {
    const performance = measurePerformance(func);
    if (performance > this.maxPerformance) {
      this.maxPerformance = performance;
    }
    if (performance < this.minPerformance || this.minPerformance === 0) {
      this.minPerformance = performance;
    }
  }

  public getStatistics(): PerformanceMonitorStatistics {
    const averagePerformance = this.calculateAveragePerformance();
    return {
      minPerformance: this.minPerformance,
      maxPerformance: this.maxPerformance,
      averagePerformance,
    };
  }

  private calculateAveragePerformance() {
    const totalPerformance = this.performance.reduce(
      (acc, performance) => acc + performance,
      0,
    );
    return (totalPerformance / this.performance.length) * 100;
  }

  public clean() {
    this.performance = [];
    this.minPerformance = 0;
    this.maxPerformance = 0;
  }
}

export default PerformanceMonitor;
