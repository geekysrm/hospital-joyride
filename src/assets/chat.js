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
      message: "Can you please provide details of your child."
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
      ],
      buttons: [
        {
          label: "Next",
          value: "form2",
          icon: "arrow right"
        }
      ]
    }
  },
  form2: {
    bot: {
      message:
        "Can you please provide details about the symptoms your child is facing."
    },
    user: {
      message: "Please provide details of the symptoms your child is facing : ",
      inputs: [
        {
          label: "Child's Symptoms (please provide comma(,) separeted values)",
          value: "symptoms",
          type: "select"
        }
      ],
      buttons: [
        {
          label: "Previous",
          value: "form1",
          icon: "arrow left"
        },
        {
          label: "Next",
          value: "form3",
          icon: "arrow right"
        }
      ]
    }
  },
  form3: {
    bot: {
      message:
        "Can you please provide details about your child's medical history and his ongoing treatments (if any)."
    },
    user: {
      message: "Please fill this form : ",
      inputs: [
        {
          label: "Child's medical history",
          value: "medicalHistory",
          type: "textarea",
          placeholder: "He was suffering from dengue last month."
        },
        {
          label: "Child's ongoing treatment (if any) ",
          value: "ongoingTreatments",
          type: "textarea",
          placeholder: "He is currently taking medicines for flu."
        }
      ],
      buttons: [
        {
          label: "Previous",
          value: "form2",
          icon: "arrow left"
        },
        {
          label: "Next",
          value: "bookDoc",
          icon: "arrow right"
        }
      ]
    }
  },
  bookDoc: {
    bot: {
      message:
        "We have recorded your child's data.<br /> Do you want to book an appointment with our doctor ?"
    },
    user: {
      message: "Please Select : ",
      options: [
        {
          label: "Yes",
          value: "pickDateTime"
        },
        {
          label: "No",
          value: "exit"
        }
      ]
    }
  },
  pickDateTime: {
    bot: {
      message:
        "Please pick a date & time which is suitable for you for the doctor's appointment."
    },
    user: {
      message: "Please select Date & Time : ",
      inputs: [
        {
          label: "Select Date",
          value: "appointmentDate",
          type: "date"
        },
        {
          label: "Select Time (in 24hrs format)",
          value: "appointmentTime",
          type: "text"
        }
      ],
      buttons: [
        {
          label: "Previous",
          value: "form3",
          icon: "arrow left"
        },
        {
          label: "Book",
          value: "thanks",
          icon: "arrow right"
        }
      ]
    }
  },
  thanks: {
    bot: {
      message:
        "We are searching for an appropriate doctor for your child.<br /> Your appointment will be confirmed soon.<br /> Your booking has been added to your Child's current treatments list.<br /> Thank you for your patience.<br /> It was a pleasure helping you."
    },
    user: {
      message: "Please Select : ",
      options: [
        {
          label: "Go Home",
          value: "home"
        },
        {
          label: "Start Over",
          value: "start"
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
        },
        {
          label: "Go Home",
          value: "home"
        }
      ]
    }
  }
};
