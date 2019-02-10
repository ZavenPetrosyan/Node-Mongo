<template>
  <div id="app">
    <h1>Clients</h1>
    <div id="clients-list" class="container">
       <table class="table">
            <tr v-for="client in clients" 
            v-bind:key="client.id" 
            v-bind:name="client.name" 
            v-bind:email="client.email"
            v-bind:phone="client.phone"
            v-bind:providers="client.providers">
              <td class="text-left">{{ client.name }}</td>
              <td class="text-left">{{ client.email }}</td>
              <td class="text-left">{{ client.phone }}</td>
              <td class="text-left">{{ client.providers }}</td>
              <td class="text-right">
                <button class="btn btn-info" v-on:click="editClient(client.name, client._id, client.phone, client.email, client.providers)">Edit</button>
                <button class="btn btn-danger" v-on:click="deleteClient(client._id)">Delete</button>
              </td>
            </tr>
          </table>
    </div>
    <div class="add-client">
    <div class="row">
    <form v-on:submit.prevent="addClient" class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input v-model="name" id="nameinput" type="text" placeholder="Client name" class="validate">
          <label  class="active" for="nameinput">First Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input v-model="email" id="clientemailinput" type="email" class="validate" placeholder="email">
          <label class="active" for="clientemailinput">Email</label>
        </div>
         <div class="input-field col s12">
          <input v-model="phone" id="clientphoneinput" type="text" class="validate"  placeholder="Client phone">
          <label class="active" for="clientphoneinput">Phone</label>
        </div>
      </div>
      <select class="select-provider">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </form>
    </div>
  <button v-if="this.isEdit==false" type="submit">Submit</button>
   <button v-else v-on:click="updateClient()">Update</button>
    </div>
</div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      clients: [],
      providers: [],
      id: '',
      name: '',
      phone: '',
      email: '',
      isEdit: false
    }
  },
  mounted () {
    this.getClients();
    this.getProviders();
  },
   methods: {
    getProviders() {
      axios.get('http://localhost:5001/providers').then(response => {
        this.providers = response.data.data
      })
    },
    getClients() {
       axios.get('http://localhost:5001/clients').then(response => {
      this.clients = response.data.data
    });
    },
    addClient() {
      axios.post('http://localhost:5001/clients', {
        name: this.name,
        phone: this.phone,
        email: this.email,
        providers: this.providers
      }).then(() => {
        this.name = '',
        this.getClients()
      });
    },
    editClient(id, name, email, phone, providers) {
      this.id = id,
      this.name = name,
      this.phone =phone,
      this.email =email,
      this.providers = providers
    },
    updateClient() {
      axios.put('http://localhost://5001/${this.id}', {
        name: this.name,
        phone: this.phone,
        email: this.email,
        providers: this.providers
      }).then(() => {
        this.name = '',
        this.getClients(),
        this.isEdit = false
      });
    },
    deleteClient(id) {
      axios.delete('http://localhost:5001/${id}').then(() => {
        this.name = '',
        this.getClients()
      });
    }
  }
}
</script>

<style>
.row {
  display: flex;
  flex-direction: column;
  align-content: center;
}
</style>





















            