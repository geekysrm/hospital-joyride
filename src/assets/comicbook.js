import img1 from "./comic/1.png";
import img2 from "./comic/2.png";
import img3 from "./comic/3.png";
import img4 from "./comic/4.png";
import img5 from "./comic/5.png";
import img6 from "./comic/6.png";
import img7 from "./comic/7.png";
import img8 from "./comic/8.png";
import img9 from "./comic/9.png";
import img10 from "./comic/10.png";
import img11 from "./comic/11.png";

export default {
  part_1_1: {
    custom: false,
    image: img1,
    text: `Hello Friend, I am Gandalf, the Golden !`,
    pointers: {
      prev: null,
      next: "part_1_2"
    }
  },
  part_1_2: {
    custom: false,
    image: img2,
    text: `Hope you remember me !
    And Who you are ?
    
    Ohh well, let me remind you of everything.
    
    You are
    `,
    pointers: {
      prev: "part_1_1",
      next: "part_1_3"
    }
  },
  part_1_3: {
    custom: false,
    image: img3,
    text: `Omega Supreme, the protector of the realm, from the evil forces of`,
    pointers: {
      prev: "part_1_2",
      next: "part_1_4"
    }
  },
  part_1_4: {
    custom: false,
    image: img4,
    text: `Minotour, the monster who came from hell, and his allies.`,
    pointers: {
      prev: "part_1_3",
      next: "part_1_5"
    }
  },
  part_1_5: {
    custom: false,
    image: img5,
    text: `I was shocked to know that you recently lost a fight to him.
 
    Where he took away your powers, and thus I came to help you recover and throw the monster back to hell.
    `,
    pointers: {
      prev: "part_1_4",
      next: "part_1_6"
    }
  },
  part_1_6: {
    custom: true,
    image: img6,
    text: `That is why you are currently experiencing #symptoms`,
    pointers: {
      prev: "part_1_5",
      next: "part_1_7"
    }
  },
  part_1_7: {
    custom: false,
    image: img7,
    text: `You have to meet Captain Morris, who will help you recover your super powers.`,
    pointers: {
      prev: "part_1_6",
      next: "wait_part_1"
    }
  },
  wait_part_1: {
    custom: false,
    image: img8,
    text: `For now you take rest more adventure is coming your way...`,
    pointers: {
      prev: "part_1_7",
      next: null
    },
    action: "wait_part_1"
  },
  part_2_1: {
    custom: false,
    image: img9,
    text: `I have completed my tests your super power will be recovered soon.`,
    pointers: {
      prev: null,
      next: "part_2_2"
    }
  },
  part_2_2: {
    custom: false,
    image: img10,
    text: `I have prepared some magical potions which will speed up your recovery.`,
    pointers: {
      prev: "part_2_1",
      next: "wait_part_2"
    }
  },
  wait_part_2: {
    custom: false,
    image: img11,
    text: `Take those magical potions and take care of your self.`,
    pointers: {
      prev: "part_2_2",
      next: null
    },
    action: "wait_part_2"
  }
};
