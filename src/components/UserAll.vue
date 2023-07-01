<template>
  <div class="vuetable-wrapper">
   
    <div class="mb-3">

    <input type="text" class="form-control" v-model="searchQuery" placeholder="Search..." @input="search" />
    
  </div>
    <vuetable
      ref="vuetable"
      :api-url="apiUrl"
      :fields="tableFields"
      data-path="data"
      :append-params="searchParams"
    ></vuetable>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      searchQuery: '',
      searchParams: {},
      apiUrl: 'https://test-frontend.devgosaas.app/api/users.php',
      tableFields: [
        { name: 'id', title: 'ID' },
        { name: 'firstname', title: 'Full Name' },
        { name: 'birthdate', title: 'Age', formatter: this.formatAge },
        { name: 'email', title: 'Email' },
        { name: 'gender', title: 'Gender', formatter: this.formatGender },
        { name: 'social', title: 'Social' },
        { name: 'profile_image', title: 'Profile Image', formatter: this.profileImage }
      ]
    };
  },
  methods: {
    search() {
      this.searchParams = { search: this.searchQuery };
      this.$refs.vuetable.refresh();
    },
    formatFullName(value, row) {
      return row.firstname + ' ' + row.lastname;
    },
    formatAge(value, row) {
      const birthdate = new Date(value);
      const today = new Date();

      const diffTime = Math.abs(today - birthdate);
      const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
      return age;
    },
    formatGender(value) {
      return value.toUpperCase();
    },
    profileImage(value) {
      return `<img src="${value}" alt="Profile Image" style="width: 50px; height: 50px;">`;
    }
  }
}
</script>

<style>
.vuetable-wrapper {
  width: 100%;
  overflow-x: auto;
  height: 500px; /* Set the desired height for the table */
}
.inner-block {
  width: 90%;
}
</style>
