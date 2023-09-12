<script setup lang="ts">
  import {ref} from 'vue'
  import { usePomodoroStore } from '../store/store';
  
  type DialogProps = {
    isOpened: boolean
  }
  
  type EmitEvents = {
    (e: 'close-settings-dialog'): void
  }

  defineProps<DialogProps>()

  const emit = defineEmits<EmitEvents>();

  const pomodoroStore = usePomodoroStore();
  const store = pomodoroStore; 

  const workTime = ref(Math.floor(store.$state.settings.workTime / 60));
  const shortBreakDuration = ref(store.$state.settings.shortBreakTime / 60);
  const longBreakDuration = ref(store.$state.settings.longBreakTime / 60);

  /**
   * Updating pomodoro settings
   */
  const updatePomodoroSettings = () => {
    store.$state.settings.workTime = workTime.value * 60;
    store.$state.time = workTime.value * 60;
    store.$state.settings.shortBreakTime = shortBreakDuration.value * 60;
    store.$state.settings.longBreakTime = longBreakDuration.value * 60;
    store.$state.settings.longBreakInterval = store.$state.settings.longBreakInterval;
    emit('close-settings-dialog');
  }

</script>

<template>
  <dialog v-if="isOpened" class="pomodoro-settings-dialog active">
      <div class="dialog-header">
        <h2>Pomodoro settings</h2>
      </div>
      <div class="dialog-body">
        <form>
          <div class="form-group">
            <label for="pomodoro-duration">Pomodoro duration (minutes)</label>
            <input 
              type="number" 
              id="pomodoro-duration" 
              name="pomodoro-duration" 
              v-model="workTime"
              @change="store.$state.settings.workTime = workTime * 60"
            />
          </div>
          <div class="form-group">
            <label for="short-break-duration">Short break duration (minutes)</label>
            <input 
              type="number"
              id="short-break-duration" 
              name="short-break-duration"
              v-model="shortBreakDuration"
            />
          </div>
          <div class="form-group">
            <label for="long-break-duration">Long break duration (minutes)</label>
            <input 
              type="number" 
              id="long-break-duration" 
              name="long-break-duration" 
              v-model="longBreakDuration"
            />
          </div>
          <div class="form-group">
            <label for="long-break-interval">Long break interval</label>
            <input 
              type="number" 
              id="long-break-interval" 
              name="long-break-interval" 
              v-model="store.$state.settings.longBreakInterval"
            />
          </div>
        </form>
      </div>
      <div class="dialog-footer">
        <button type="button" class="btn btn-primary" @click="updatePomodoroSettings()">Save & close</button>
        <button type="button" class="btn btn-secondary" @click="$emit('close-settings-dialog');">Cancel</button>
      </div>
  </dialog>
</template>

<style scoped>
  dialog {
    position: fixed;
    top: 25%;
    left: 0;
    width: 50%;
    height: 600px;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 1);
    z-index: 2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    color: #1a1a1a;
    border: none;
    transform: translateY(-50%);
    padding: 0;
  }

  dialog.active {
    display: block;
    transform: translateY(0%);
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  dialog.active .dialog-header {
    flex: 0 0 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  dialog.active .dialog-body {
    flex: 1 1 80%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
  }

  dialog.active .dialog-footer {
    flex: 0 0 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 10px;
    gap: 10px;
  }

  form {
    width: 50%;
  }

  .form-group {
    display: flex;
    flex-flow: column nowrap;
  }

  .form-group label {
    margin-bottom: 0.5rem;
  }

  form input {
    margin-bottom: 1rem;
    background-color: transparent;
    border: none;
    border: 2px solid purple;
    height: 35px;
    border-radius: 5px;
    color: purple;
    padding-left: 10px;
  }
</style>