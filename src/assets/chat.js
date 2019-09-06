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
      message: "Please provide details of your child."
    },
    user: {
      message: "Please fill this form : ",
      inputs: [
        {
          label: "Child's Name",
          value: "childName",
          type: "text"
        },
        {
          label: "Child's Age",
          value: "age",
          type: "number"
        },
        {
          label: "Child's gender",
          value: "gender",
          type: "text"
        },
        {
          label: "Child's Blood Group",
          value: "bloodGroup",
          type: "text"
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
