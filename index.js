import { ApolloServer, gql } from "apollo-server";
import db from "./db.js";

const typeDefs = `
    type User {
      id: Int!
      name: String!
      age: Int!
      email: String!
      address: Address
      posts: [Post]
    }
    type Post {
        id: Int!
        title: String!
        content: String!
        author: Int!
        comments: [Comment]
    }
    type Address {
      street: String!
      city: String!
      state: String!
      zip: String!
    }
    input AddressInput {
      street: String!
      city: String!
      state: String!
      zip: String!
    }
    type Comment {
        id: Int!
        content: String!
        author: User
    }
    type Query {
        users: [User]
        user(id: Int!): User
        posts: [Post]
        post(id: Int!): Post
        comments: [Comment]
        comment(id: Int!): Comment
    }
    type Mutation {
        createUser(name: String! age: Int! email: String! ): User
        createPost(title: String! content: String! author: Int!): Post
        createComment(idPost: Int! idUser: Int! content: String!): Comment
        updateUser(id: Int! name: String age: Int email: String address: AddressInput): User
        updatePost(idPost: Int! title: String! content: String!): Post
        updateComment(idComment: Int! content: String!): Comment
    }
`;

const resolvers = {
  Query: {
    users: () => db.users,

    user: (root, { id }) => {
      return db.users.find((user) => (user.id = id));
    },

    posts: () => db.posts,

    async post(root, { id }) {
      return db.posts.find((post) => (post.id = id)) || [];
    },

    comments: () => db.comments,

    async comment(root, { id }) {
      return db.comments.find((comment) => (comment.id = id));
    },
  },

  User: {
    posts: (root) => {
      if (root.posts) {
        return root.posts.map((post) =>
          db.posts.find((postFinded) => postFinded.id === post)
        );
      }
    },
  },

  Post: {
    comments: (root) => {
      if (root.comments) {
        return root.comments.map((comment) =>
          db.comments.find((commentFinded) => commentFinded.id === comment)
        );
      }
    },
  },

  Comment: {
    author: (root) =>
      db.users.find((userFinded) => userFinded.id === root.author),
  },

  Mutation: {
    createUser: (root, args) => {
      const newUser = { id: db.users.length + 1, ...args };
      db.users.push(newUser);
      return db.users.find((user) => user.id === newUser.id);
    },

    createPost: (root, args) => {
      const newPost = { id: db.posts.length + 1, ...args };
      // Buscamos los post del usuario para validar que existe el array
      const postCreados = db.users.find(
        (user) => user.id === newPost.author
      ).posts;
      // Validamos que existe el array de posts del usuario
      // si existe se agrega el post
      // si no existe se crea el array con el id del nuevo post
      postCreados
        ? db.users
            .find((user) => user.id === newPost.author)
            .posts.push(newPost.id)
        : (db.users.find((user) => user.id === newPost.author).posts = [
            newPost.id,
          ]);
      // Añadimos el nuevo post al arreglo db y devolvemos el post creado
      db.posts.push(newPost);
      return db.posts.find((post) => post.id === newPost.id);
    },

    createComment: (root, args) => {
      // Se realizan validaciones equivalentes al createPost
      const newComment = {
        id: db.comments.length + 1,
        content: args.content,
        author: args.idUser,
      };
      const comentariosCreados = db.posts.find(
        (post) => post.id === args.idPost
      ).comments;
      comentariosCreados
        ? db.posts
            .find((post) => post.id === args.idPost)
            .comments.push(newComment.id)
        : (db.posts.find((post) => post.id === args.idPost).comments = [
            newComment.id,
          ]);
      db.comments.push(newComment);
      return db.comments.find((comment) => comment.id === newComment.id);
    },

    updateUser: (root, args) => {
      const { id, ...data } = args;
      // Consultamos por el estado actual del usuario y su indice
      let oldUserIdx = db.users.findIndex((user) => user.id === id);
      let oldUser = db.users.find((user) => user.id === id);
      // Creamos el nuevo usuario validando los datos recibidos y conservando id
      const newUser = {
        id,
        name: data.name || oldUser.name,
        age: data.age || oldUser.age,
        email: data.email || oldUser.email,
        address: data.address || oldUser.address,
        posts: oldUser.posts,
      };
      // Validamos que el usuario a actualizar existe
      if (oldUserIdx) {
        // Eliminamos la version anterior del usuario e insertamos la nueva
        db.users.splice(oldUserIdx, 1);
        db.users.push(newUser);
        return db.users.find((user) => user.id === id);
      } else {
        return null;
      }
    },

    updatePost: (root, args) => {
      // Validaciones equivalentes al updateUser
      const { idPost, ...data } = args;
      let oldPostIdx = db.posts.findIndex((post) => post.id === idPost);
      let oldPost = db.posts.find((post) => post.id === idPost);
      const newPost = {
        id: oldPost.id,
        title: data.title || oldPost.title,
        content: data.content || oldPost.content,
        author: oldPost.author,
        comments: oldPost.comments,
      };
      if (oldPostIdx) {
        db.posts.splice(oldPostIdx, 1);
        db.posts.push(newPost);
        return db.posts.find((post) => post.id === idPost);
      } else {
        return null;
      }
    },

    updateComment: (root, args) => {
      // Validaciones equivalentes al updateUser
      const { idComment, ...data } = args;
      let oldCommentIdx = db.comments.findIndex(
        (comment) => comment.id === idComment
      );
      let oldComment = db.comments.find((comment) => comment.id === idComment);
      const newComment = {
        id: oldComment.id,
        content: data.content || oldComment.content,
        author: oldComment.author,
      };
      if (oldCommentIdx) {
        db.comments.splice(oldCommentIdx, 1);
        db.comments.push(newComment);
        return db.comments.find((comment) => comment.id === idComment);
      } else {
        return null;
      }
    },
  },
};

// Creamos y levantamos el servidor ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("estamos en el 4k: ", url);
});
