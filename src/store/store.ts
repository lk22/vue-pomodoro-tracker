// import define store from pinia
import { defineStore } from 'pinia'

export type Pomodoro = {
  time: number;
  isRunning: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isReset: boolean;
  isCompleted: boolean;
  timesCompleted: number;
  breakComplete: boolean;
  shortBreakInitiated: boolean;
  longBreakInitiated: boolean;
  breakCompleted: boolean;
  settings: PomodoroSettings;
}

type PomodoroSettings = {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
  autoStart: boolean;
  autoStartBreak: boolean;
  autoStartLongBreak: boolean;
}

/**
 * Pomodoro store
 */
export const usePomodoroStore = defineStore('pomodoro', {
  // a function that returns a fresh state
  state: (): Pomodoro => (
    {
      time: 1500,
      isRunning: false,
      isPaused: false,
      isStopped: true,
      isReset: false,
      isCompleted: false,
      timesCompleted: 0,
      breakComplete: false,
      shortBreakInitiated: false,
      longBreakInitiated: false,
      breakCompleted: false,
      settings: {
        workTime: 1500,
        shortBreakTime: 300,
        longBreakTime: 900,
        longBreakInterval: 4,
        autoStart: true,
        autoStartBreak: false,
        autoStartLongBreak: false,
      }
    }
  ),

  // optional getters
  actions: {
    // action to start pomodoro timer
    start() {
      this.isRunning = true;
      this.isPaused = false;
      this.isStopped = false;
    },

    stop() {
      this.isRunning = false;
      this.isPaused = false,
      this.isStopped = true;
      this.isReset = false;
    },

    reset() {
      this.isPaused = false,
      this.isStopped = false;
      this.isReset = true;
      this.time = this.settings.workTime;
    },

    complete() {
      this.isRunning = false;
      this.isPaused = false;
      this.isStopped = true;
      this.isReset = false;
      this.isCompleted = true;
      console.log(this.timesCompleted);
      console.log("short break initiated: " + this.shortBreakInitiated);
      console.log("long break initiated: " + this.longBreakInitiated);
      console.log("interval" + this.settings.longBreakInterval);
      
      if ( ! this.shortBreakInitiated && this.timesCompleted < this.settings.longBreakInterval) {
          this.timesCompleted = this.timesCompleted ? this.timesCompleted + 1 : 1; // only increment if break is not initiated
          this.shortBreakInitiated = true;
          console.log("short break initiated");
          this.time = this.settings.shortBreakTime;
      } else if ( ! this.longBreakInitiated && this.timesCompleted === this.settings.longBreakInterval ) {
        this.timesCompleted = this.timesCompleted ? this.timesCompleted + 1 : 1; // only increment if break is not initiated
        console.log("long break initiated");
        this.time = this.settings.longBreakTime;
        this.shortBreakInitiated = false;
        this.longBreakInitiated = true;
        this.settings.longBreakInterval += this.settings.longBreakInterval; // increment the long break interval
        console.log("new interval: " + this.settings.longBreakInterval);
      } else {
        console.log("break completed");
        this.breakCompleted = true;
        this.shortBreakInitiated = false;
        this.longBreakInitiated = false;
        this.time = this.settings.workTime;
      }
    }
  },
  persist: false
});