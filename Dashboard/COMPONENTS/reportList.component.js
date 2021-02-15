Vue.component('report-list', {
/* Use this file as a template for building your list component.
 * The Prop is incoming data: 
 * - https://vuejs.org/v2/guide/components-props.html
 * 
 */
  props: {
    list: Array,      // See line 47 on index.html
    filterKey: String // See line 48 on index.html
  },
  computed: { 
    // computed functions are used to alter the list of data without actually starting the alteration
    filteredList: function () {
      // This function takes the list data, line 8, and filters all of the property values within the list object against the filtered key, line 9. it will then return the list items that contains the filtered key.
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
    /* this is where you will build you methods for the component
     * there are a few wys to write each method 
     *  - functionName(){}
     *  - fucntionName: function(){}
     *  
     *  please refer to https://vuejs.org/v2/style-guide/
     */
    openThisForm(form){
      var self = this;
      self.$emit('openMyForm',form.id);
      console.log("FORM "+form.id+" SENT");
    },
    convertDate(d){
      var newD = moment(d).format("MMM Do YYYY");
      return newD;
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
    <section id="formList" class="wrapper">
        <article v-for="report in filteredList" class="form cf">
        {{report.name}} {{convertDate(report.created)}}<div class="btn" @click="openThisForm(form)">Edit</div>
        </article>
    </section >
  `
})