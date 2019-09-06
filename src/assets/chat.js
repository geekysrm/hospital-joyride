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
      message: "Please provide details about your child"
    },
    user: {
      message: "Fill Form",
      inputs: [
        {
          label: "name",
          type: "string"
        },
        {
          label: "age",
          type: "number"
        },
        {
          label: "gender",
          type: "string"
        },
        {
          label: "Blood Group",
          type: "string"
        }
      ]
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
