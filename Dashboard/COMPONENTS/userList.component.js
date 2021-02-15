Vue.component('user-list', {
  props: {
    list: Array,
    filterKey: String
  },
  computed: {
    filteredList: function () {
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var data = this.list;
      if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
            })
          })
      }
      return data;
    }
  }, 

  methods:{
    openThisForm(form){
      var self = this;
      self.$emit('openMyForm',form.id);
      console.log("FORM "+form.id+" SENT");
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  template: `
    <table id="userList" class="wrapper">
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>ACTION</th>
        </tr>
        <tr v-for="user in filteredList" class="form cf">
          <td>{{user.lastName}}</td>
          <td>{{user.firstName}}</td>
          <td><div class="btn" @click="openThisForm(form)">Edit</div></td>
        </tr>
    </table >
  `
})