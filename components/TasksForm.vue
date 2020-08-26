<template>
	<div>
		<fade-transition>
			<div
				v-show="error"
				class="text-center text-sm font-bold text-red-500 py-3"
			>The content of the task is mandatory</div>
		</fade-transition>
		<div class="bg-gray-300 px-2 py-3">
			<p class="text-sm text-gray-600 font-bold px-1 pb-2">Add new task</p>
			<form 
				class="flex flex-row-reverse"
				@submit.prevent="addTask"
			>
		    	<button 
		    		type="submit" 
		    		class="bg-blue-500 ml-2 py-2 px-6 rounded text-white font-bold"
		    	>Add</button>
		    	<input
		    		type="text"
		    		v-model="content"
		        	placeholder="Task content"
			        class="pl-3 p-1 bg-gray-200 w-full rounded relative"
			        rows="1"
			        maxlength="120"
			        required
			        @keydown.enter.prevent="addTask"
		      	/>
		    </form>
		</div>
	</div>
</template>

<script>
	import { FadeTransition } from 'vue2-transitions'

	export default {
		data: () => ({
			content: '',
			error: false
		}),
		components: {
			FadeTransition
		},
		methods: {
			addTask(){

				this.error = false

				if( !this.content ){
					this.error = true;
					return false;
				}

				this.$store.commit('task/add', {
					content: this.content,
					completed: false
				})

				this.content = '';
			}
		}
	}
</script>