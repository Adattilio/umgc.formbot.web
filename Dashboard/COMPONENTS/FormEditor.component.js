Vue.component('form-list', {
    props: {
      list: Array,
      filterKey: String
    },
    computed: {
      filteredList: function () {
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
      dayCal: function(date){
        return  moment(date).format('DD');
      },
      monthCal: function(date){
        return moment(date).format('MMM');
      },
      catGen: function(cat){
       var cats = '';
       if(cat!== null){
           var cItem = cat,
               cEnd = '',
               cl = cItem.length;
           if(cl > 1){ 
               cEnd = '; ';
           }
           for(i = 0; i<cl; i++){
               cats+= cItem + cEnd;
           }
           return cats;
        }
  
      },  	 	
      updateStatus: function(pid, pV){
          var self= this,
              rData =  self.readData,
              msg = '<p class="nogo">You have not read this policy</p>';
  //    		console.log('P: ' + pid + ' V: ' + pV);
          self.readData.forEach(function (policyRead) {
              var rID = policyRead.pID,
                  rV = policyRead.Verision;
   //   		console.log('rP: ' + rID + ' rV: ' + rV);
              if(rID === pid && rV >= pV){
   //   			console.log('YES');
                  msg = '<p class="go">You have read this policy</p>';
              }else{
   //   			console.log('NO');
              }
          });
          return msg;
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    template: `
      <section id="formList" class="wrapper">
          <article v-for="form in filteredList" class="form cf">
            {{form.name}}
          </article>
      </section >
    `
  })