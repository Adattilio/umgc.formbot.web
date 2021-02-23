Vue.component('user-list', {
  props: {
    list: Array,
    filterKey: String
  },
  data: function() {
    var sortOrders = {};
    var columns = ['lastName','firstName'];
    columns.forEach(function(key) {
      sortOrders[key] = 1;
    });
    console.log(sortOrders);
    return {
      sortKey: "",
      sortOrders: sortOrders
    };
  },
  computed: {
    filteredList: function () {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var data = this.list;
      if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
            })
          })
      }
      if (sortKey) {
        data = data.slice().sort(function(a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    }
  }, 

  methods:{
    openThisForm(form){
      var self = this;
      self.$emit('openMyForm',form.id);
      console.log("FORM "+form.id+" SENT");
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
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
          <th @click="sortBy('lastName')" :class="{ active: sortKey == 'lastName' }">
            Last Name
            <span class="arrow" :class="sortOrders['lastName'] > 0 ? 'asc' : 'dsc'"></span>
          </th>
          <th @click="sortBy('firstName')" :class="{ active: sortKey == 'firstName' }">
            First Name
            <span class="arrow" :class="sortOrders['firstName'] > 0 ? 'asc' : 'dsc'"></span>
          </th>
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