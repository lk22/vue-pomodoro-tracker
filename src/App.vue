<script setup lang="ts">
import { 
  computed, 
  watch, 
  ref
} from 'vue'
import AppLayout from './layouts/AppLayout.vue';
import SettingsModal from './components/SettingsModal.vue';

const settingsDialogOpened = ref(false);

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
    console.log("Timer completed");
    
    // if the auto start setting is enabled, start the timer again
    if ( pomodoroState.$state.settings.autoStart ) {
      startPomodoro();
    }
  }
})

const startPomodoro = () => {
  timer = setInterval(() => {
    pomodoroState.$state.time--;
  }, 1000);

  console.log("Timer started")
  
  if ( pomodoroState.$state.time === 0 ) {
    if ( ! pomodoroState.$state.settings.autoStart ) {
      clearInterval(timer);
    }
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

/**
 * Toggling settings dialog component
 */
const toggleSettingsModal = () => {
  settingsDialogOpened.value =! settingsDialogOpened.value;
}

</script>

<template>
  <AppLayout>
    <div class="container">
    <div class="row">
      <div class="pomodoro-timer__title">
          <h1>Pomodoro tracker</h1>
          <button class="open-settings-dialog" @click="toggleSettingsModal()">
            Settings
          </button>
        <br>
        <br>
      </div>
    </div>
    <div class="row">
      <div class="pomodoro-timer">
        <div class="pomodoro-timer__buttons">
          <button class="pomodoro-timer__button pomodoro-timer__button--start" @click="startPomodoro()">Start</button>
          <button class="pomodoro-timer__button pomodoro-timer__button--stop" @click="stopPomodoro(formattedTime)">Stop</button>
          <button class="pomodoro-timer__button pomodoro-timer__button--reset" @click="resetPomodoro()">Reset</button>
        </div>
        <div class="pomodoro-timer__time">
          {{ formattedTime }}
          <div class="pomodoro-timer__completed">{{ pomodoroState.$state.timesCompleted }} Pomodoro's completed</div>
        </div>
      </div>
    </div>
    <div class="row">
      <SettingsModal v-on:close-settings-dialog="toggleSettingsModal()" :isOpened="settingsDialogOpened" />
    </div>
  </div>
  </AppLayout>
</template>
