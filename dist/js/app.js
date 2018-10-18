// This isn't set up to copy yet!

let app = new Vue({

    el: "#app",

    data: {

        buttonText: 'add',
        showForm: true,
        toggleText: 'hide form',

        formFirst: '',

        formLast: '',

        formEmail: '',

        formPhone: '',

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

        },

        sortContacts: function (sortField)  {

          console.log('sorting contacts by [" + sortField + "]');
        },


    toggleForm: function () {
      console.log('showing or hidning form');
      this.showForm = !this.showForm;
    }

  }



});
