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

1. Query para ver todos los usuarios existentes
- 'users'  

2. Query para ver un usuario en especifico
- 'user(id: Int!)' 

3. Mutation para crear un usuario
- 'createUser(name: String! age: Int! email: String! )' 

4. Mutation para editar los datos del usuario y agregar direccion 
- 'updateUser(id: Int! name: String age: Int email: String address: AddressInput)'

### Manejo de Posts

1. Query para ver todos los posts existentes
- 'posts'  

2. Query para ver un post en especifico
- 'post(id: Int!)' 

3. Mutation para crear un post
- 'createPost(title: String! content: String! author: Int!)'

4. Mutation para editar los datos del post 
- updatePost(idPost: Int! title: String! content: String!)

### Manejo de Comentarios

1. Query para ver todos los comentarios existentes
- 'comments'  

2. Query para ver un comentario en especifico
- 'comment(id: Int!)' 

3. Mutation para crear un comentario
- 'createComment(idPost: Int! idUser: Int! content: String!)'

4. Mutation para editar los datos del comentario 
- updateComment(idComment: Int! content: String!)
