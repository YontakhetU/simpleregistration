<template>
  <div class="vue-tempalte regiter-tem">
      <form>
          <h3>My Profile</h3>
          <div class="row">
            <div class="col-6">
            <div class="form-group">
                
                <img :src="imageUrl" alt="Image" width="200px" class="centered-image" />
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" v-model="firstname" class="form-control form-control-lg" readonly />
          </div>
          <div class="form-group">
              <label>Last Name</label>
              <input type="text" v-model="lastname" class="form-control form-control-lg" readonly/>
          </div>
          <div class="form-group">
              <label>Username</label>
              <input type="text" v-model="email" class="form-control form-control-lg" readonly />
          </div>
          <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" v-model="age" class="form-control form-control-lg" readonly />
          </div>
          <div class="form-group">
              <label>Gender</label>
              <input type="text" v-model="gender" class="form-control form-control-lg" readonly />
          </div>
          <div class="form-group">
              <label>Socail</label>
              <input type="text" v-model="socailed" class="form-control form-control-lg" readonly />
          </div>
          </div>
          </div>
     
        
          
      </form>
  </div>
</template>
<script>
import router from '@/router';
import axios from 'axios';
export default {
  data() {
    return {
      tokenValue: '' ,// Initialize the data property for the input field value
      firstname: '' ,
      lastname: '' ,
      email: '',
      age:'',
      gender:'',
      socailed:'',
      imageUrl:''
    };
  },
  mounted() {
    this.tokenValue = localStorage.getItem('token'); // Set the initial value using localStorage.getItem('token')
    
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch('https://test-frontend.devgosaas.app/api/users.php')
        .then(response => response.json())
        .then(data => {
          this.apiData = data; // Assign the retrieved data to the component's data property
          console.log(data);

          const foundObject = data.data.find(item => item.email === this.tokenValue);

          if (foundObject) {
            console.log("Found object:", foundObject);
            this.firstname = foundObject.firstname
            this.lastname = foundObject.lastname
            this.email = foundObject.email
            this.age = foundObject.birthdate
            this.gender = foundObject.gender
            this.socailed = foundObject.social
            this.imageUrl = foundObject.profile_image
            console.log(foundObject.social)
            // firstname = foundObject.firstname
            // firstname = foundObject.firstname
            // firstname = foundObject.firstname
          } else {
            console.log("Object not found");
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
};
</script>


<style>
.centered-image {
  display: block;
  margin: 0 auto;
}
.inner-block{
  width: 640px;
}
</style>