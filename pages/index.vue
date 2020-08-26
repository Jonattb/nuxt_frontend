<template>
  <div class="my-8">
    <div 
      class="rounded-lg overflow-hidden shadow-lg bg-white min-h-64 lg:w-2/4 md:w-2/3 md:mx-auto mx-5"
    >
      <p class="px-2 text-gray-600 mb-2 text-2xl font-thin px-4 pt-3 font-semibold">Tasks</p>
      <fade-transition group>
        <div 
          v-if="error"
          :key="1"
        >
          <tasks-error :load="loadTasks"></tasks-error>
        </div>
        <div 
          v-else-if="loading"
          :key="2"
        >
          <tasks-spinner></tasks-spinner>
        </div>
        <div 
          v-else
          :key="3"
        >
          <tasks-search></tasks-search>
          <div class="py-5 px-3">
            <tasks-list></tasks-list>
          </div>
          <tasks-form></tasks-form>
        </div>
      </fade-transition>
    </div>
    <tasks-footer></tasks-footer>
  </div>
</template>

<script>
  import axios from 'axios'

  import TasksSearch from '@/components/TasksSearch'
  import TasksList from '@/components/TasksList'
  import TasksForm from '@/components/TasksForm'
  import TasksSpinner from '@/components/TasksSpinner'
  import TasksError from '@/components/TasksError'
  import TasksFooter from '@/components/TasksFooter'

  import { FadeTransition } from 'vue2-transitions'

  export default {
    head: {
      bodyAttrs: {
        class: 'bg-gray-200'
      }
    },
    components: {
      TasksSearch,
      TasksList,
      TasksForm,
      TasksSpinner,
      TasksError,
      TasksFooter,
      FadeTransition
    },
    data: () => ({
      loading: true,
      error: false
    }),
    computed: {
      tasks(){
        return this.$store.state.task.items;
      }
    },
    mounted(){
      this.loadTasks();
    },
    methods: {
      loadTasks(){
        this.error = false;
        this.loading = true;
        axios.get('/db.json')
        .then(res => {
          this.$store.commit('task/set', res.data)
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
        })
      }
    }
  }
</script>