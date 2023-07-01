<template>
  <div class="vue-tempalte login-tem">
      <form>
          <h3>Log In</h3>
          <div class="form-group">
              <label>Email address</label>
              <input type="text" v-model="username" class="form-control form-control-lg" />
          </div>
          <div class="form-group">
              <label>Password</label>
              <input type="password"  v-model="password" class="form-control form-control-lg" />
          </div>
          <br>
          <button type="button" class="btn btn-dark btn-lg btn-block" @click="login" >Sign In</button>
      
         
      </form>
  </div>
</template>
<script>
import router from '@/router';

 export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      const credentials = {
        email: this.username,
        password: this.password
      };

      // Make the login API request
      fetch('https://test-frontend.devgosaas.app/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(response => response.json())
        .then(data => {
          // Handle the login response
          console.log(data);
          if(data.status == true){
            // router.push('/usersall'); // Replace '/dashboard' with the desired route path
            
            const token = data.user.email
            localStorage.setItem('token', token);
         
            this.$router
            .push({ path: '/usersall' })
            .then(() => { this.$router.go() })
          }else{
            alert(data.message)
            
          }
          
          // Perform additional actions based on the response
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    }
  }
};
</script>

<style>

.inner-block {

 /* overflow-x: auto; */
 height: 550px; /* Set the desired height for the table */
}
.login-tem {
  
  padding-top: 55px;
}
</style>

