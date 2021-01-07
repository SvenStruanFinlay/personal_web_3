<template>
  <form class="contact-form" @submit.prevent="sendEmail">
    <label>Name</label>
    <input type="text" name="name" 
            placeholder="Your Name" v-model="name">
    <label>Email</label>
    <input type="email" name="email" 
            placeholder="Your Email" v-model="email">
    <label>Message</label>
    <textarea name="message" 
            placeholder="Message" v-model="message"></textarea>
    <input type="submit" value="Send">
  </form>
</template>

<script>
import emailjs from 'emailjs-com';
export default {
  name: 'Email',
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm('service_0dysvu9', 'template_53rbcxk', e.target,
        'user_j937c4LPafM0kNFR0tjzP', {
          name: this.name,
          email: this.email,
          message: this.message
        })
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
            this.$alert("Email Sent! Thank you! Please check inbox for confirmation.");
        }, (error) => {
            console.log('FAILED...', error);
            this.$warrning("Email Sent! Thank you! Please check inbox for confirmation.");
        });

      } catch(error) {
          console.log({error})
      }
      // Reset form field
      this.name = ''
      this.email = ''
      this.message = ''
    },
  }
}
</script>