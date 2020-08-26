export const state = () => ({
	items: [],
	filter: ''
})

export const mutations = {
	set(state, payload) {
   		state.items = payload
  	},
  	add(state, payload){
  		state.items.push( payload );
  	},
  	setFilter(state, payload) {
   		state.filter = payload
  	},
  	completed(state, payload){
  		state.items[ payload ].completed = !state.items[ payload ].completed;
  	},
  	remove(state, payload){
  		state.items.splice(payload, 1);
  	}
}