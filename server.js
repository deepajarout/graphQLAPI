const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const books = [
  { id: 1, title: "Harry Potter Series 1", author: 1 },
  { id: 2, title: "Harry Potter Series 2", author: 2 },
  { id: 3, title: "Harry Potter Series 3", author: 3 },
  { id: 4, title: "Harry Potter Series 4", author: 1 },
  { id: 5, title: "Harry Potter Series 5", author: 2 },
  { id: 6, title: "Harry Potter Series 6", author: 1 },
];

const authors = [
  { id: 1, title: "Harry Potter" },
  { id: 2, title: "Harry Potter" },
  { id: 3, title: "Harry Potter" },
];

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This Represents an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.author === author.id);
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This Represents a book writtn by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    author: { type: GraphQLNonNull(GraphQLInt) },
    authorName: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.author);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "single book",
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => {
        return books.find((book) => book.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of All Books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of Author",
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      description: "single book",
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => {
        return authors.find((author) => author.id === args.id);
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "add a book",
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          title: args.title,
          author: args.author,
        };
        console.log(book);
        books.push(book);
        return book;
      },
    },
  }),
});

const bookSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/",
  graphqlHTTP({
    schema: bookSchema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("server is running on port 5000"));
