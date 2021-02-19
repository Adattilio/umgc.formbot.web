Vue.component('form-editor', {
    props: {
      formData: Array,
    },
    data: function(){
      return { fields: this.formData.fields}
    },
    methods:{      
      addField: function () {
        // Add a new item. It must have a unique key!
        this.fields.push({
            x: (this.fields.length * 2) % (this.colNum || 12),
            y: this.fields.length + (this.colNum || 12), // puts it at the bottom
            w: 2,
            h: 2,
            i: this.index,
            id:fields.length + 1, // TODO neeed to think more about this one
            name:"",
            required:true,
            description:""
        });
        // Increment the counter to ensure key is always unique.
        this.index++;
      },
      removeField: function (val) {
          const index = this.fields.map(item => item.i).indexOf(val);
          this.fields.splice(index, 1);
      },
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    template: `
    <article>
      <header>
        <h2>Editor</h2>
        <div class="btn" @click="addField">Add</div>
      </header>
      <grid-layout
        :layout.sync="fields"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >

        <grid-item 
          v-for="field in fields"
          :x="field.x"
          :y="field.y"
          :w="field.w"
          :h="field.h"
          :i="field.i">
            {{field.name}}
            <div class="btn" @click="removeField(field.i)">Remove</div>
        </grid-item>
      </grid-layout>
    </article>
    `
  })