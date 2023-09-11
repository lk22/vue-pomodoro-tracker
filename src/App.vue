<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue';
import { computed, watch } from 'vue'

import { usePomodoroStore } from './store/store';
const pomodoroState = usePomodoroStore();

type Timer = any | null;

let timer: Timer = null;

const formattedTime = computed(() => {
  let time = pomodoroState.$state.time;
  return Math.floor(time / 60) + ':' + ('0' + time % 60).slice(-2);
})

// watch the time and stop the timer when it reaches 0 seconds and reset the time state
watch(formattedTime, (time) => {
  if ( time === '0:00' ) {
    clearInterval(timer);
    pomodoroState.complete();
  }
})

const startPomodoro = () => {
  timer = setInterval(() => {
    pomodoroState.$state.time--;
  }, 1000);
  
  if ( pomodoroState.$state.time === 0 ) {
    clearInterval(timer);
    pomodoroState.complete();
  }
}

const stopPomodoro = (time: string) => {
  pomodoroState.stop();
  pomodoroState.$state.time = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
  clearInterval(timer);
}

const resetPomodoro = () => {
  pomodoroState.reset();
  if ( ! pomodoroState.$state.isRunning ) {
    clearInterval(timer)
  }
}

// start the timer if it was running before the page was refreshed
if ( pomodoroState.$state.isRunning ) {
  startPomodoro();
}
</script>

<template>
  <AppLayout>
    <div class="container">
    <div class="row">
      <div class="pomodoro-timer__title">
        <h1>Pomodoro tracker</h1>
      </div>
    </div>
    <div class="row">
      <div class="pomodoro-timer">
        <div class="pomodoro-timer__buttons">
          <button class="pomodoro-timer__button pomodoro-timer__button--start" @click="startPomodoro()">Start</button>
          <button class="pomodoro-timer__button pomodoro-timer__button--stop" @click="stopPomodoro(formattedTime)">Stop</button>
          <button class="pomodoro-timer__button pomodoro-timer__button--reset" @click="resetPomodoro()">Reset</button>
        </div>
        <div class="pomodoro-timer__time">{{ formattedTime }}</div>
      </div>
    </div>
  </div>
  </AppLayout>
</template>
