const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID
    title: String 
    author: Author
    pages: Int
    rating: Float
  }

  type Author {
    id: ID
    name: String
    drinks: String
    isGenious: Boolean
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
    users: [User]
  }

  type Mutation {
    addBook(title: String, pages: Int): Book
  }

  type Mutation {
    # This updates user email
    updateUserEmail(id: ID!, email: String!): User
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type UpdateUserEmailMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }
`;


// This is our mock database. Could be REST API, GraphQL, any database.
const authors = [
  {
    id: 1,
    name: 'Kate Chopin',
    drinks: 'vodka',
    isGenious: false
  },
  {
    id: 2,
    name: 'Paul Auster',
    drinks: 'tea',
    isGenious: true
  }
]

const books = [
  {
    id: 1,
    title: 'The Awakening',
    author: authors[0],
    pages: 100,
    rating: 5.5
  },
  {
    id: 2,
    title: 'City of Glass',
    author: authors[1],
    pages: 99,
    rating: 8.1,
    // lol: true
  },
];

const users = [
  {
    id: 1,
    name: 'oda',
    email: 'ooddaa@gmail.com'
  },
  {
    id: 2,
    name: 'mkat',
    email: 'mkat@gmail.com'
  },
]



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
    users: () => users,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});