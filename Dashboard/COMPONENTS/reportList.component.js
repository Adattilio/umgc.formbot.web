Vue.component('report-list', {
  props: {
    list: Array,      
    searchKey: String 
  },
  data: function() {
    var sortOrders = {};
    var columns = ['name','created'];
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
    filteredList() {
      var sortKey = this.sortKey;
      var searchKey = this.searchKey && this.searchKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var data = this.list;
      if (searchKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(searchKey) > -1;
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
    editReport(report){
      this.$emit('openreportreader',report.id);
    },
    convertDate(d){
      var newD = moment(d).format("MMM Do YYYY");
      return newD;
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  },
  filters: {
    // here you can create custome filters
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  // the template section is where you write your html hat you want to insert into the index.html. You will need to use the grave accent ( ` ) [Also know as the back-tic, backquote, inverted comma, and quasiquote] to open and close the template. 
  template: `
  <table id="userList" class="wrapper">
      <tr>
        <th @click="sortBy('name')" :class="{ active: sortKey == 'name' }">
          Form Name
          <span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'"></span>
        </th>
        <th @click="sortBy('created')" :class="{ active: sortKey == 'created' }">
          Date Created
          <span class="arrow" :class="sortOrders['created'] > 0 ? 'asc' : 'dsc'"></span>
        </th>
        <th>ACTION</th>
      </tr>
      <tr v-for="report in filteredList" class="form cf">
        <td>{{report.name}}</td>
        <td>{{convertDate(report.created)}}</td>
        <td><div class="btn" @click="editReport(form)">Edit</div></td>
      </tr>
  </table >
  `
})