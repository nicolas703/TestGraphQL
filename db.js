const db = {
  users: [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      address: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zip: "12345",
      },
      posts: [1, 2, 3],
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      email: "janesmith@example.com",
      address: {
        street: "456 Elm St",
        city: "Springfield",
        state: "IL",
        zip: "67890",
      },
      posts: [4, 5],
    },
  ],
  posts: [
    {
      id: 1,
      title: "My first post",
      content: "This is my first post!",
      author: 1,
      comments: [1, 2],
    },
    {
      id: 2,
      title: "My second post",
      content: "This is my second post!",
      author: 1,
      comments: [3],
    },
    {
      id: 3,
      title: "My third post",
      content: "This is my third post!",
      author: 1,
      comments: [],
    },
    {
      id: 4,
      title: "Jane's first post",
      content: "This is Jane's first post!",
      author: 2,
      comments: [4],
    },
    {
      id: 5,
      title: "Jane's second post",
      content: "This is Jane's second post!",
      author: 2,
      comments: [],
    },
  ],
  comments: [
    {
      id: 1,
      content: "Great post!",
      author: 2,
    },
    {
      id: 2,
      content: "I agree!",
      author: 3,
    },
    {
      id: 3,
      content: "I disagree.",
      author: 4,
    },
    {
      id: 4,
      content: "Nice post, Jane!",
      author: 1,
    },
  ],
};

export default db;
