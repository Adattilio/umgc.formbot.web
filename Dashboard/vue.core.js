new Vue({
    // The following will set where in the HTML you will use VUE
    el: '#dashboard.app',
    // Data is your data for the app. it can be preloaded or empty
    data: {
        title:"FormBot",
        logo:"",
        about:"This app will give you a basic intro to VUE",
        form:{},
        formDetails:{},
        formFieldMetaData:{
            name:"",
            description:"",
            type:"",
            i:0,
            show:false
        },
        formFieldIndex:0,
        formList:{},
        helpArticleList:{},
        reportList:{},
        currentUser:{
            id:0,
            name:"",
            toekn:"",
            role: 1,
        },
        userList:{}, 
        filterKey:{
            users:"",
            forms:"",
            reports:"",
            helpArticles:""
        },
        formEditor:{
            show:false,
            data:{}
        },
        test:"nada",
        showManager:0,
		error:[]
    },
    // you would use this to load data. for this you will not need to wory about it
    mounted: function () {
        var self = this;
        self.formList = formList.d;
        self.userList = userList.d;
        self.reportList = getFormReportList.d;
        self.helpArticleList = helpArticleList.d;
    
    /*  TODO: build once Web Service is up 

        axios.all([
            axios.get(filePath + "GetFormList.JSON",{headers: {"Access-Control-Allow-Origin": "*"}}),
            axios.get(filePath + "GetFormDetails-NewPrescription.JSON",{headers: {"Access-Control-Allow-Origin": "*"}}),
            axios.get(filePath + "GetFormEntryList.JSON",{headers: {"Access-Control-Allow-Origin": "*"}})
        ])
        .then(responseArr => {
        //this will be executed only when all requests are complete
            console.log('-- Applying Pulled Data--');
            console.log(responseArr[0]);
            self.formList = responseArr[0];
            self.entryList = responseArr[3];
        })//*/
        
    },
    // computer is where you can create functions that can mutated that data as the view is refreshed
    computed:{
    },
    // methods are functions that react to user action
    methods: {
        toggleTabs(tab){
            var self = this;
            this.showManager = tab;
        },
        openFormEditor: function (action,formID){
            switch(action){
                case "create":
                    this.form = {
                        "name": "", 
                        "description":"",
                        "activeIntent": true,
                        "fields":[]};
                    this.formEditor.show = true;
                    break;
                case "edit":
                    this.form = form2.d;
                    this.formEditor.show = true;
                    this.formFieldIndex = this.form.fields.length;


                    
                    break;
            }
            /*TODO : create axios call to get form details */
        },
        openForm: function (formID){
            console.log("TEST")
            console.log("Form "+formID+" recived");
            this.formEditor.show = true;
            
        },
        addUser(loadata){
            var self = this;
                self.users.push(loadata);
                self.userForm.name = "";
                self.userForm.email = "";
        },   
        addField: function () {
          // Add a new item. It must have a unique key!
          var self = this,
            xLoc = 0,
            yLoc = 0;
          
          if(self.form.fields > 0){
            xLoc = (self.form.fields.length * 2) % (self.colNum || 12);
            yLoc = self.form.fields.length + (self.colNum || 12); // puts it at the bottom
          }
          console.log("X: "+xLoc);
          var field = {
            x: xLoc,
            y: yLoc,
            w: 4,
            h: 2,
            i: self.formFieldIndex,
            id:self.form.fields.length + 1, // TODO neeed to think more about this one
            name:"field " + (self.form.fields.length + 1),
            required:true,
            description:"",
            type:""
          };

          console.log(field);
          this.form.fields.push(field);
          // Increment the counter to ensure key is always unique.
          this.formFieldIndex++;
        },
        removeField: function (val) {
            const index = this.form.fields.map(item => item.i).indexOf(val);
            this.form.fields.splice(index, 1);
        },
        saveFormDetails(){
        },
        editFormFieldMetaData(i){
 //           var tempArray = form.fields;
            //Find index of specific object using findIndex method.
            console.log("IDEX: "+i);
            fieldIndex = this.form.fields.findIndex((obj => obj.i == i));
            console.log(this.form.fields);
            console.log(this.form.fields[fieldIndex]);

            this.formFieldMetaData.name = this.form.fields[fieldIndex].name;
            this.formFieldMetaData.description = this.form.fields[fieldIndex].description;
            this.formFieldMetaData.type = this.form.fields[fieldIndex].type;
            this.formFieldMetaData.required = this.form.fields[fieldIndex].required;
            this.formFieldMetaData.i = this.form.fields[fieldIndex].i;

            this.formFieldMetaData.show = true;

        },
        saveFieldMetaData(i){  
            fieldIndex = this.form.fields.findIndex((obj => obj.i == i));

            this.form.fields[fieldIndex].name = this.formFieldMetaData.name;
            this.form.fields[fieldIndex].description = this.formFieldMetaData.description;
            this.form.fields[fieldIndex].type = this.formFieldMetaData.type;
            this.form.fields[fieldIndex].required = this.formFieldMetaData.required;

            this.formFieldMetaData.show = false;

            //  TODO: add save to DB
        },
        deleteForm(id){
            //  TOFO: delete form & remove from data
        }
    }
});

