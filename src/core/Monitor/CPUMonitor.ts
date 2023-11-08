import * as osUtils from "os-utils";
import { toPercentage } from "../../utils/number";

export interface CPUMonitorStatistics {
  minCPUUsage: string;
  maxCPUUsage: string;
  averageCPUUsage: string;
}

class CPUMonitor {
  private cpuUsage: Array<number> = [];
  private minCPUUsage: number = 0;
  private maxCPUUsage: number = 0;
  private monitorInterval: number = 1000;
  private intervalId: NodeJS.Timeout | null = null;

  public start() {
    const monitorCPU = () => {
      osUtils.cpuUsage((cpuUsage: number) => {
        this.cpuUsage.push(cpuUsage);

        if (cpuUsage > this.maxCPUUsage) {
          this.maxCPUUsage = cpuUsage;
        }
        if (cpuUsage < this.minCPUUsage || this.minCPUUsage === 0) {
          this.minCPUUsage = cpuUsage;
        }
      });
    };
    this.intervalId = setInterval(monitorCPU, this.monitorInterval);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  public getStatistics(): CPUMonitorStatistics {
    const averageCpuUsage = this.calculateAverageCPUUsage();
    return {
      minCPUUsage: toPercentage(this.minCPUUsage),
      maxCPUUsage: toPercentage(this.maxCPUUsage),
      averageCPUUsage: toPercentage(averageCpuUsage),
    };
  }

  private calculateAverageCPUUsage() {
    const totalCPUUsage = this.cpuUsage.reduce(
      (acc, cpuUsage) => acc + cpuUsage,
      0,
    );
    return totalCPUUsage / this.cpuUsage.length;
  }

  public clean() {
    this.cpuUsage = [];
    this.minCPUUsage = 0;
    this.maxCPUUsage = 0;
    this.stop();
  }
}

export default CPUMonitor;
