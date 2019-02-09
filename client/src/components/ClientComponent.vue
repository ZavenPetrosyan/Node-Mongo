<template>
  <div class="hello">
    <div id="todo-list-example" class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <h1 class="text-center">Clients</h1>
          <form v-on:submit.prevent="addClient">
            <label for="clientnameinput">Client name</label>
              <input type="text" v-model="clientname" id="clientnameinput" class="form-control" placeholder="Client name">
            <label for="clientphoneinput">Client phone</label>
              <input type="text" v-model="phone" id="clientphoneinput" class="form-control" placeholder="Client phone">
            <label for="clientemailinput">Client email</label>
              <input type="text" v-model="email" id="clientemailinput" class="form-control" placeholder="Client">

            <button v-if="this.isEdit==false" type="submit" class="btn btn-success btn-block mt-3">Submit</button>
            <button v-else v-on:click="updateClient()" class="btn btn-success btn-block mt-3">Update</button>
          </form>
          <table class="table">
            <tr v-for="(client) in clients" 
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
                <button class="btn btn-info" v-on:click="editClient(client.name, client._id, client.phone,client.email, client.providers)">Edit</button>
                <button class="btn btn-danger" v-on:click="deleteClient(client._id)">Delete</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      clients: [],
      id: '',
      clientname: '',
      phone: '',
      email: '',
      providers: [],
      isEdit: false
    }
  },

  mounted() {
    this.getClients();
  },
  methods: {
    getClients() {
      axios.get('http://localhost:5001/clients').then(result => {
        console.log(result.data);
        this.clients = result.data;
      }).catch(err => console.error(err));
    },
    addClient() {
      axios.post('http://localhost:5001/clients', { name: this.clientname,phone: this.phone, email: this.email, providers: this.providers })
      .then((res) => {
        this.clientname = ''
        this.getClients()
        console.log(res)
      }).catch(err => console.error(err));
    },
    editClient(name, id, phone, email, providers) {
      this.id = id,
      this.clientname = name,
      this.phone = phone,
      this.email = email,
      this.providers = providers
    },
    updateClient() {
      axios.put('http://localhost:5001/${this.id}', {name: this.clientname, phone: this.phone, email: this.email, providers: this.providers})
      .then((res) => {
        this.clientname = '',
        this.isEdit = false,
        this.getClients()
      }).catch(err => console.error(res));
    },
    deleteClient(id) {
      axios.delete('http://localhost:5001/clients/$id').then((res) => {
        this.clientname = '',
        this.getClients()
        console.log(res)
      }).catch(err => console.error(err));
    }
  }
}
</script>
