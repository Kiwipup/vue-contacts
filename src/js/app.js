// This isn't set up to copy yet!

let app = new Vue({

    el: "#app",

    data: {

        buttonText: 'Add',
        showForm: true,
        toggleText: 'hide form',

        formFirst: '',

        formLast: '',

        formEmail: '',

        formPhone: '',
        formOldId: '',

        nextId: 3,


        contacts: [
            {
                id: 1,
                firstname: 'John',
                lastname: 'Deer',
                emailaddr: 'jdeer@example.com',
                phonenum: '867-5309'
            },
            {
                id: 2,
                firstname: 'Jane',
                lastname: 'Doe',
                emailaddr: 'janed@example.com',
                phonenum: '859-123-4567'
            }
        ]

    },

    methods: {
        addOrUpdateContact: function () {
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

          this.formFirst = '';
          this.formLast = '';
          this.formEmail = '';
          this.formPhone = '';
          this.formOldId = '';

          this.buttonText = 'Add';

        },

        editContact: function (contactId) {

          let index = this.findIndexById(contactId);

          this.formFirst = this.contacts[index].firstname;
          this.formLast = this.contacts[index].lastname;
          this.formEmail = this.contacts[index].emailaddr;
          this.formPhone = this.contacts[index].phonenum;
          this.formOldId = this.contacts[index].id;


          this.buttonText = 'Update';
          this.showForm = true;

        },

        deleteContact: function (contactId) {
          let index = this.findIndexById(contactId);
          this.contacts.splice(index, 1);

        },

        sortContacts: function (sortField)  {

          console.log('sorting contacts by [" + sortField + "]');
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

    }

  }



});
