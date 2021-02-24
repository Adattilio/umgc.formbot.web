Vue.component('help-articles-list', {
  props: {
    list: Array,
    filterKey: String
  },
  computed: { 
      filteredForms: function () {
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var data = this.list
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
    readForm(form){
      this.$emit('openformreader',form.id);
      
    },
    editForm(form){
      this.$emit('openformeditor',form.id);
    },
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  template: `
    <ul id="helpArticleList" class="wrapper">
        <li v-for="article in filteredForms" class="form cf">
        {{article.name}} 
        </li>
    </ul >
  `
})