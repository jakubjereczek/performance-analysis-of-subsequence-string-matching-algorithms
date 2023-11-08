import measurePerformance from "../../utils/measurePerformance";

export interface PerformanceMonitorStatistics {
  minPerformance: string;
  maxPerformance: string;
  averagePerformance: string;
}

class PerformanceMonitor {
  private performances: Array<number> = [];
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
    this.performances.push(performance);
  }

  public getStatistics(): PerformanceMonitorStatistics {
    const averagePerformance = this.calculateAveragePerformance();
    return {
      minPerformance: this.minPerformance + " ms",
      maxPerformance: this.maxPerformance + " ms",
      averagePerformance: averagePerformance + " ms",
    };
  }

  private calculateAveragePerformance() {
    const totalPerformance = this.performances.reduce(
      (acc, performance) => acc + performance,
      0,
    );

    return totalPerformance / this.performances.length;
  }

  public clean() {
    console.log("clean");
    this.performances = [];
    this.minPerformance = 0;
    this.maxPerformance = 0;
  }
}

export default PerformanceMonitor;
