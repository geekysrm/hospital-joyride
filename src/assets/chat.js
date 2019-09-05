export default {
  start: {
    bot: {
      message: "Hello, from HealthBot,<br /> Is your child sick?"
    },
    user: {
      message: "Please Select : ",
      options: [
        {
          label: "Yes",
          value: "form1"
        },
        {
          label: "No",
          value: "exit"
        }
      ]
    }
  },
  form1: {
    bot: {
      message: "Hello"
    },
    user: {
      message: "form1"
    }
  },
  exit: {
    bot: {
      message: "Bye.<br /> It was a pleasure helping you. <br />",
      options: [
        {
          label: "Start Over",
          value: "start"
        }
      ]
    }
  }
};
