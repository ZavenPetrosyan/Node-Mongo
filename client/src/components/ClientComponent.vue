<template>
 <div class="ClientComponent">
   <h1>Clients</h1>
   <hr>
   <p class="error" v-if="error">{{ error }}</p>
   <div class="clients-container" 
    v-for="client in clients" 
    v-bind:item="client"
    v-bind:index="index" 
    v-bind:key="client._id"
   >
  {{ client.name }}
  <p class="text">{{ client.text }}</p>
   </div>
 </div>
</template>

<script>
import ClientService from "../ClientService"

export default {
  name: 'ClientComponent',
  data() {
    return {
      clients: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.clients = await ClientService.clientsList();
    } catch (err) {
      this.error = err.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clients-container {
  color: black;
  position: fixed
}
</style>
