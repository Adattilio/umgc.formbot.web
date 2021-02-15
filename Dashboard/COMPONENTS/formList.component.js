Vue.component('form-list', {
/* Use this file as a template for building your list component.
 * The Prop is incoming data: 
 * - https://vuejs.org/v2/guide/components-props.html
 * 
 */
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
    <section id="formList" class="wrapper">
        <article v-for="form in filteredForms" class="form cf">
        {{form.name}} <div class="btn" @click="openThisForm(form)">Edit</div>
        </article>
    </section >
  `
})