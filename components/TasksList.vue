<template>
	<div>
		<div
			v-if="tasks.length"
		>
			<fade-transition tag="div" v-if="filtered.length" group>
				<div 
					v-for="(task, index) in filtered"
					:key="index"
					class="flex justify-between px-2 py-3 relative hover:bg-blue-100 rounded select-none tasks-list"
				>
			        <p class="flex text-gray-700">
			        	<svg class="w-2 text-gray-500 mx-2" viewBox="0 0 8 8" fill="currentColor">
			            	<circle cx="4" cy="4" r="3" />
			          	</svg>
			          	{{ task.content }}
			        </p>
			        <div
			        	class="task-completed absolute right-0"
			        	v-if="task.completed"
			        >
			        	<svg class="ml-auto flex items-center fill-current" enable-background="new 0 0 512 512" height="32" viewBox="0 0 512 512" width="32" xmlns="http://www.w3.org/2000/svg">
							<g>
								<path style="fill:#3BB54A;" d="M183.903,0.001c101.566,0,183.902,82.336,183.902,183.902s-82.336,183.902-183.902,183.902 S0.001,285.469,0.001,183.903l0,0C-0.288,82.625,81.579,0.29,182.856,0.001C183.205,0,183.554,0,183.903,0.001z"/>
								<polygon style="fill:#D4E1F4;" points="285.78,133.225 155.168,263.837 82.025,191.217 111.805,161.96 155.168,204.801 256.001,103.968 	"/>
							</g>
						</svg>
			        </div>
			        <div class="task-actions absolute right-0 pl-5 pr-2 bg-blue-100">
			        	<button
			        		@click="toggleTaskCompleted( index )"
                			class="px-2 rounded font-semibold text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                			:class="{
                				'bg-red-600 hover:bg-red-700': task.completed,
                				'bg-green-600 hover:bg-green-700': !task.completed
                			}"
                		>{{ task.completed ? 'Uncheck' : 'Completed' }}</button>
			        	<button
			        		@click="taskDelete( index )"
                			class="px-2 rounded font-semibold text-white bg-red-600 hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                		>Delete</button>
			        </div>
			 	</div>
			</fade-transition>
			<div
				v-else 
				class="text-center text-gray-500 font-bold text-base py-2"
			>
				<svg class="mx-auto mb-3 fill-current" enable-background="new 0 0 512 512" height="60" viewBox="0 0 512 512" width="60" xmlns="http://www.w3.org/2000/svg">
					<g>
						<path d="M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474
							c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323
							c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848
							S326.847,409.323,225.474,409.323z"/>
					</g>
					<g>
						<path d="M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328
							c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z"/>
					</g>
				</svg>
				<p>No results</p>
			</div>
		</div>
		<div
			v-else 
			class="text-center text-gray-500 font-bold text-base py-2"
		>
			<svg class="mx-auto mb-3 fill-current" enable-background="new 0 0 512 512" height="60" viewBox="0 0 512 512" width="60" xmlns="http://www.w3.org/2000/svg">
				<path d="m512 256c0 68.38-26.629 132.667-74.98 181.02-48.353 48.351-112.64 74.98-181.02 74.98-47.869 0-93.723-13.066-133.518-37.482l29.35-29.35c30.91 17.088 66.42 26.832 104.168 26.832 119.103 0 216-96.897 216-216 0-37.748-9.744-73.258-26.833-104.167l29.351-29.35c24.416 39.794 37.482 85.648 37.482 133.517zm-482.858 255.142-28.284-28.284 60.528-60.528c-39.719-46.325-61.386-104.661-61.386-166.33 0-68.38 26.629-132.667 74.98-181.02 48.353-48.351 112.64-74.98 181.02-74.98 61.669 0 120.005 21.667 166.33 61.386l60.528-60.528 28.284 28.284zm60.711-117.28 304.009-304.009c-37.431-31.114-85.497-49.853-137.862-49.853-119.103 0-216 96.897-216 216 0 52.365 18.738 100.431 49.853 137.862z"/>
			</svg>
			<p>No tasks assigned</p>
		</div>
	</div>
</template>

<script>
	import { FadeTransition } from 'vue2-transitions'

	export default {
		components: {
			FadeTransition
		},
		computed: {
			filtered(){
				const filter = this.$store.state.task.filter;
	    		const tasks = this.tasks;
	    		return tasks.filter(task => {
			        return task.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
			    })
			},
	    	tasks(){
	    		const tasks = this.$store.state.task.items;
	    		return tasks;
	    	}
	    },
	    methods: {
	    	toggleTaskCompleted( index ){
	    		this.$store.commit('task/completed', index)
	    	},
	    	taskDelete( index ){
	    		this.$store.commit('task/remove', index)
	    	}
	    }
	}
</script>

<style>
	.tasks-list div.task-actions, .tasks-list:hover div.task-completed { 
		display: none;
	}

	.tasks-list:hover div.task-actions {
		display: block;
	} 
</style>