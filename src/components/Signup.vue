<template>
    <div class="vue-tempalte regiter-tem">
        <form>
            <h3>Register</h3>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" v-model="firstname" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" v-model="lastname" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Date of Birth</label>
                <input type="date" v-model="age" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Profile Image</label>
                <input type="file" @change="handleFileChange" class="form-control form-control-lg" />
            </div>

            <br>
            <div class="form-group">
                <div>
                  <label>Gender</label>
                </div>
                <!-- <label>Gender</label> -->
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="one" name="inlineRadioOptions" value="Male" v-model="picked" />
                  <label for="one">Male</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="two" name="inlineRadioOptions" value="Famale" v-model="picked" />
                <label for="two">Famale</label>
                </div>
           
            </div>
            <br>
            <div class="form-group">
                <!-- <label>Gender</label> -->
                <div>
                  <label>Social</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox"  v-model="socialMedia" id="inlineCheckbox1" value="facebook">
                <label class="form-check-label" for="inlineCheckbox1">Facebook</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="socialMedia"  id="inlineCheckbox2" value="twitter">
                <label class="form-check-label" for="inlineCheckbox2">Twitter</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="socialMedia"  id="inlineCheckbox3" value="instagram">
                <label class="form-check-label" for="inlineCheckbox3">Instagram</label>
              </div>
          
              <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="socialMedia"  id="inlineCheckbox4" value="line">
                  <label class="form-check-label" for="inlineCheckbox4">Line</label>
               </div>
               <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="socialMedia"  id="inlineCheckbox5" value="tiktok">
                  <label class="form-check-label" for="inlineCheckbox5">Tiktok</label>
               </div>
            </div>
            <br>
            <div class="form-group">
                <label>Email</label>
                <input type="text" v-model="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" v-model="confirmpassword" class="form-control form-control-lg" />
            </div>
            <br>
            <button type="button" class="btn btn-dark btn-lg btn-block" @click="register" >Sign Up</button>
            
        </form>
    </div>
</template>
<script>
import router from '@/router';
import axios from 'axios';
 export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      age: '',
      profileImage: null,
      picked: 'Male',
      socialMedia: [],
      email: '',
      password: '',
      confirmpassword: ''
    };
  },
  methods: {
    handleFileChange(event) {
      this.profileImage = event.target.files[0];
    },
    register() {
      if (this.firstname === '' || this.lastname === '' || this.age === '' || this.profileImage === '' || this.picked === '' || this.email === '' || this.confirmpassword === ''|| this.password === '') {

        alert('Please fill in the required information')
        return
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       if (emailPattern.test(this.email) != true) {
        alert('Email not in correct format')
        return
       }


      if (this.password !== this.confirmpassword) {
        console.log(this.password);
        console.log(this.confirmpassword);
        alert('Password not match')
        return
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
      if (passwordRegex.test(this.password)) {
        // this.passwordError = '';
        console.log('Password is valid');
      } else {
        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.')
        return
        // this.passwordError = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.';
      }
     // Prepare the data to send to the API
     const formData = new FormData();
      formData.append('firstname', this.firstname);
      formData.append('lastname', this.lastname);
      formData.append('age', this.age);
      formData.append('profile_image', this.profileImage);
      formData.append('gender', this.picked);
      formData.append('social', this.socialMedia);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('confirmPassword', this.confirmPassword);

      // Make the API request using Axios
      axios.post('https://test-frontend.devgosaas.app/api/signin.php', formData)
        .then(response => {
          // Handle the API response here
          console.log('Registration success!', response.data);
          // Reset the form after successful registration
          // this.resetForm();
          // alert('test');
          if(response.data.status == true){
            // router.push('/usersall'); // Replace '/dashboard' with the desired route path
            
            // const token = data.user.email
            // localStorage.setItem('token', token);
         
            this.$router
            .push({ path: '/' })
            .then(() => { this.$router.go() })
            
          }else{
            alert(response.data.message)
          }

        })
        
        .catch(error => {
          // Handle API errors here
          console.error('Registration failed!', error.response.data);
        });
    }
  }
};
</script>

 <style>
   .regiter-tem {
    overflow-x: auto;
  
}
 .inner-block {

    /* overflow-x: auto; */
    height: 550px; /* Set the desired height for the table */
  }
 ::-webkit-scrollbar {
   /* Set the width of the scrollbar */
  margin-right: 2px;
}
.form-check {

    padding-left: 4.5em;

}
  </style>
  
