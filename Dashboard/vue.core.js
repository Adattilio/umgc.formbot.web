new Vue({
    // The following will set where in the HTML you will use VUE
    el: '#dashboard.app',
    // Data is your data for the app. it can be preloaded or empty
    data: {
        about:"This app will give you a basic intro to VUE",
        formList:{},
        reportList:{},
        currentUser:{
            id:0,
            name:"",
            toekn:""
        },
        userList:{},
        filterKey:{
            users:"",
            forms:"",
            reports:""
        },
        formEditor:{
            show:false,
            data:{}
        },
        test:"nada",
        show:false,
		error:[]
    },
    // you would use this to load data. for this you will not need to wory about it
    mounted: function () {
        var self = this;
        self.formList = formList.d;
        self.userList = userList.d;
        self.reportList = getFormReportList.d;
    
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
    	toggelInstructions(){
    		var self = this;
    		if (self.show === false){self.show = true;}
    		else{self.show = false;}
    	}
    }
});

