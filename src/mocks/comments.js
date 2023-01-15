import Firebase from "firebase";

const comments = [
  {
    data: {
      likedBy: [],
      approved: false,
      pinned: false,
      post: {
        category: "Nutrition",
        id: "lt99LXpR5a2mrGM1JiIt",
        title: "new test image 3",
      },
      content: "second comment\n",
      dateCreated: Firebase.firestore.Timestamp.now(),
      user: {
        photo: "",
        name: "Unknown",
        id: "pVncVmm6ETMJUBltAmzRE6biknT2",
      },
      parentUserId: "pVncVmm6ETMJUBltAmzRE6biknT2",
      parentCommentId: "",
      subcomments: [
        {
          data: {
            dateCreated: Firebase.firestore.Timestamp.now(),
            likedBy: [],
            pinned: false,
            approved: false,
            content: "reaply to second comment",
            post: {
              id: "lt99LXpR5a2mrGM1JiIt",
              title: "new test image 3",
              category: "Nutrition",
            },
            user: {
              id: "pVncVmm6ETMJUBltAmzRE6biknT2",
              name: "Unknown",
              photo: "",
            },
            parentCommentId: "pk5m9kjL0SXKPyWuYFvZ",
            parentUserId: "pVncVmm6ETMJUBltAmzRE6biknT2",
          },
          id: "tJ1kN23g8Xu6Y0EgDYRU",
          addedAsChild: true,
        },
      ],
    },
    id: "pk5m9kjL0SXKPyWuYFvZ",
  },
  {
    data: {
      parentCommentId: "",
      likedBy: [],
      pinned: false,
      content: "comment\n",
      parentUserId: "pVncVmm6ETMJUBltAmzRE6biknT2",
      dateCreated: Firebase.firestore.Timestamp.now(),
      user: {
        id: "pVncVmm6ETMJUBltAmzRE6biknT2",
        photo: "",
        name: "Unknown",
      },
      approved: false,
      post: {
        category: "Nutrition",
        title: "new test image 3",
        id: "lt99LXpR5a2mrGM1JiIt",
      },
      subcomments: [
        {
          data: {
            dateCreated: Firebase.firestore.Timestamp.now(),
            approved: false,
            parentUserId: "pVncVmm6ETMJUBltAmzRE6biknT2",
            pinned: false,
            user: {
              photo: "",
              id: "pVncVmm6ETMJUBltAmzRE6biknT2",
              name: "Unknown",
            },
            content: "comment",
            likedBy: [],
            parentCommentId: "IOyUrPLK0XqpB5YSvAvH",
            post: {
              title: "new test image 3",
              id: "lt99LXpR5a2mrGM1JiIt",
              category: "Nutrition",
            },
          },
          id: "tpJ8bbehduE0dEZUCEPB",
          addedAsChild: true,
        },
        {
          data: {
            parentCommentId: "IOyUrPLK0XqpB5YSvAvH",
            user: {
              name: "Unknown",
              photo: "",
              id: "pVncVmm6ETMJUBltAmzRE6biknT2",
            },
            content: "dsadas",
            likedBy: [],
            pinned: false,
            dateCreated: Firebase.firestore.Timestamp.now(),
            parentUserId: "pVncVmm6ETMJUBltAmzRE6biknT2",
            post: {
              category: "Nutrition",
              id: "lt99LXpR5a2mrGM1JiIt",
              title: "new test image 3",
            },
            approved: false,
          },
          id: "hmehNwYSFLHs1y040sWg",
          addedAsChild: true,
        },
        {
          data: {
            parentUserId: "pVncVmm6ETMJUBltAmzRE6biknT2",
            parentCommentId: "IOyUrPLK0XqpB5YSvAvH",
            user: {
              photo: "",
              name: "Unknown",
              id: "pVncVmm6ETMJUBltAmzRE6biknT2",
            },
            content: "comment",
            approved: false,
            likedBy: [],
            post: {
              title: "new test image 3",
              id: "lt99LXpR5a2mrGM1JiIt",
              category: "Nutrition",
            },
            dateCreated: Firebase.firestore.Timestamp.now(),
            pinned: false,
          },
          id: "X0nyALTpaN3y8InPp82H",
          addedAsChild: true,
        },
      ],
    },
    id: "IOyUrPLK0XqpB5YSvAvH",
  },
];

export default comments;
