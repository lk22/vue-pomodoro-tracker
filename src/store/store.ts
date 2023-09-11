// import define store from pinia
import { defineStore } from 'pinia'

type Pomodoro = {
  time: number;
  isRunning: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isReset: boolean;
  isCompleted: boolean;
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
      isCompleted: false
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
      this.time = 1500;
    },

    complete() {
      this.isRunning = false;
      this.isPaused = false;
      this.isStopped = true;
      this.isReset = false;
      this.isCompleted = true;
    }
  },
});