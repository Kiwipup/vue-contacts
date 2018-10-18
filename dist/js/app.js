// This isn't set up to copy yet!

let app = new Vue({

    el: "#app",

    data: {

        showForm: true,
        errorMessage: '',
        toggleText: 'hide form',

        formFirst: '',

        formLast: '',

        formEmail: '',

        formPhone: '',
        formOldId: '',

        nextId: 1,

        sortIsAscending: false,
        sortByField: '',

        filterText: '',


        contacts: []

    },

    mounted() {
      if(localStorage.getItem('contacts')) {
        this.contacts = JSON.parse(localStorage.getItem('contacts'));


      }
        this.resetNextId();
    },

      computed: {

        sortedFilteredContacts: function () {

          let filteredContacts = this.contacts;
          let search = this.filterText.trim().toLowerCase();

          if(search) {

            filteredContacts = filteredContacts.filter(function(contact){

              if(contact.firstname.toLowerCase().indexOf(search) !== -1 ||contact.lastname.toLowerCase().indexOf(search) !== -1 ||contact.emailaddr.toLowerCase().indexOf(search) !== -1 ||
              contact.phonenum.toLowerCase().indexOf(search) !== -1){

              return contact;
            }
          });
        }

        filteredContacts.sort(this.compare);

        //if()

          //return filteredContacts;

        }

      },




    methods: {

          compare: function (a, b) {

            //sort is ascending
            //sortByField
              if(a[this.sortByField] > b[this.sortByField]){
                return 1;
              }
              else if(a[this.sortByField] < b[this.sortByField]){
                return -1;

              }
              return 0;
          },

        addOrUpdateContact: function () {

          let validemail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
          let validPhone = /[0-9-xX\.+(\)]+/;

          if(!this.formFirst && !this.formLast) {
            this.errorMessage = "Please fill in either <strong>First Name</strong> or <strong>Last Name</strong> or both";
          } else if (this.formEmail && this.formEmail.match(validemail)){
            this.errorMessage = 'email addresses must follow the usual pattern';
          }

          else if (this.formPhone && !this.formPhone.match(validPhone)) {
            this.errorMessage = "only certain characters are allowed in the phone number field.";
          }

          else{

          console.log('adding or updating contact');

          if(this.formOldId != '') {
            //logic for removing the old copy of this contact
            this.deleteContact(this.formOldId);
          }

          //what kind of input validation do we want to do?
          let newContact = {
            id: this.nextId,
            firstname: this.formFirst,
            lastname: this.formLast,
            emailaddr: this.formEmail,
            phonenum: this.formPhone
          };

          this.nextId++;

          this.contacts.push(newContact);

          localStorage.setItem('contacts', JSON.stringify(this.contacts));
          this.contacts = JSON.parse(localStorage.getItem('contacts'));



          this.formFirst = '';
          this.formLast = '';
          this.formEmail = '';
          this.formPhone = '';
          this.formOldId = '';

          this.cancel();
        }

        },

        editContact: function (contactId) {

          let index = this.findIndexById(contactId);

          this.formFirst = this.contacts[index].firstname;
          this.formLast = this.contacts[index].lastname;
          this.formEmail = this.contacts[index].emailaddr;
          this.formPhone = this.contacts[index].phonenum;
          this.formOldId = this.contacts[index].id;


          this.showForm = true;

        },

        deleteContact: function (contactId) {
          let index = this.findIndexById(contactId);
          this.contacts.splice(index, 1);

        },

        sortContacts: function (request)  {

          console.log('sorting contacts by [' + request + ']');
          if(request == this.sortByField) {
            this.sortIsAscending = !this.sortIsAscending;


          }else{
          this.sortByField = request;
          this.sortIsAscending = true;
        }
        },


    toggleForm: function () {
      console.log('showing or hidning form');
      this.showForm = !this.showForm;
    },

    findIndexById: function (contactId) {

      let index = -1;

      for (let i = 0; i < this.contacts.length; i++) {

        if(contactId == this.contacts[i].id) {

          index = i;
        }
      }

      return index;

    },

    cancel: function () {

      this.formFirst = '';
      this.formLast = '';
      this.formEmail = '';
      this.formPhone = '';
      this.formOldId = '';


    },

    resetNextId: function () {

      let maxId = 0;

      this.contacts.forEach(function(contact){
        if (contact.id > maxId) {
          maxId = contact.id;
        }

      });

      this.nextId = ++maxId;

    }

  }



});
