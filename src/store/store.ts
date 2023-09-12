// import define store from pinia
import { defineStore } from 'pinia'

export type Pomodoro = {
  time: number;
  isRunning: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isReset: boolean;
  isCompleted: boolean;
  timesCompleted?: number;
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
      settings: {
        workTime: 1500,
        shortBreakTime: 300,
        longBreakTime: 900,
        longBreakInterval: 4,
        autoStart: false,
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
      this.timesCompleted = this.timesCompleted ? this.timesCompleted + 1 : 1;
    }
  },
});