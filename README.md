# GraphQL Test

## Descripcion

GraphQl generado para el manejo de usuarios post y comentarios.

## Instalacion

- Sobre la raíz del proyecto
```bash
$ npm install
```

## Levantar app

- Sobre la raíz del proyecto
```bash
$ node index.js
```

## Funcionalidades

### Manejo de Usuarios

1. 'users'  
- Query para ver todos los usuarios existentes

2. 'user(id: Int!)' 
- Query para ver un usuario en especifico

3. 'createUser(name: String! age: Int! email: String! )' 
- Mutation para crear un usuario

4. 'updateUser(id: Int! name: String age: Int email: String address: AddressInput)'
- Mutation para editar los datos del usuario y agregar direccion 

### Manejo de Posts

1. 'posts'  
- Query para ver todos los posts existentes

2. 'post(id: Int!)' 
- Query para ver un post en especifico

3. 'createPost(title: String! content: String! author: Int!)'
- Mutation para crear un post

4. updatePost(idPost: Int! title: String! content: String!)
- Mutation para editar los datos del post 

### Manejo de Comentarios

1. 'comments'  
- Query para ver todos los comentarios existentes

2. 'comment(id: Int!)' 
- Query para ver un comentario en especifico

3. 'createComment(idPost: Int! idUser: Int! content: String!)'
- Mutation para crear un comentario

4. updateComment(idComment: Int! content: String!)
- Mutation para editar los datos del comentario 
