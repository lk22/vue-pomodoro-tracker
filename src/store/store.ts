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
        autoStartBreak: true,
        autoStartLongBreak: true,
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
      console.log("was short break initiated: " + this.shortBreakInitiated);
      console.log("was long break initiated: " + this.longBreakInitiated);
      console.log("interval" + this.settings.longBreakInterval);
      
      this.timesCompleted =  ! this.shortBreakInitiated && ! this.longBreakInitiated ? this.timesCompleted + 1 : this.timesCompleted;

      if ( this.longBreakInitiated ) {
        console.log("Long break completed");
        this.longBreakInitiated = false;
        this.shortBreakInitiated = true;
        this.time = this.settings.workTime;
        this.settings.longBreakInterval += this.settings.longBreakInterval; // increment the long break interval with itself
      }

      if ( ! this.shortBreakInitiated && this.timesCompleted < this.settings.longBreakInterval) {
        this.shortBreakInitiated = true;
        this.longBreakInitiated = false; // make sure long break timer is not initiated
        console.log("short break initiated");
        this.time = this.settings.shortBreakTime;
      } else if ( this.timesCompleted === this.settings.longBreakInterval ) {
        // only increment if break is not initiated
        console.log("long break initiated");
        this.time = this.settings.longBreakTime;
        this.shortBreakInitiated = false;
        this.longBreakInitiated = true;
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
  // persist: false
});