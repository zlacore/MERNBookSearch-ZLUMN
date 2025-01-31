
import { Context } from "vm";
import { User, Book } from "../models/index.js";
// import Book from "../models/index.js";
import { signToken } from "../services/auth.js";

// import { authenticateToken } from "../services/auth.js";
// interface UserI {
//   // _id: string;
//   username: string
//   password: string
//   email: string
// }
// interface SingleUserArgs {
//   username: string
//   id: number
// }

interface CreateUserArgs {
  username: string
  password: string
  email: string
}

interface LoginArgs {
  username: string
  password: string
  email: string
}

interface SaveBookArgs {
  input: {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
}
  
}

interface DeleteBookArgs {
  book: string
}

// interface Context {
//   userId: number,
//   user: string
// }
const resolvers = {
  Query: {
    helloWorld: (_a: any, _b: any, context: any) => {
      return "Hello World! also, this: " + context.user;
    },
    me: async (_parents: any, _: any, ctx: Context) => {
      console.log("YO", ctx);
      const user = ctx.user.data.username
      const me = await User.findOne({ username: user });
      console.log("my info:", me)
      return me
    }
  },
  Mutation: {
    createUser: async (_parents: any, { username, email, password }: CreateUserArgs): Promise<{ user: any, token: string }> => {
      const user = await User.create({ username: username, password: password, email: email });
      const token = signToken(user.username, user.email, user._id)
      console.log("TEST: createUser Token: ", token)
      return { token, user }

    },

    login: async (_parents: any, { username, password, email }: LoginArgs): Promise<{ user: any, token: string }> => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      if (!user) {
        throw new Error("User not found");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error("Incorrect password!")
      }

      const token = signToken(user.username, user.password, user._id);
      console.log("TEST: login Token", token)
      return { token, user };
    },
    saveBook: async (_parent: any, {input}: SaveBookArgs, context: Context) => {
      if (!context.user) {
        throw new Error("No user found!")
      }

      // create the book 
      const book = Book.create({...input})

      const updatedBookList = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: {savedBooks: book}},
        { new: true, runValidators: true }
      );

      console.log("Updated Book List", updatedBookList)

      return updatedBookList
    },
    deleteBook: async (_parent: any, { book }: DeleteBookArgs, context: Context) => {
      if (!context.user) {
        throw new Error("User not found")
      }
      const updatedBookList = await User.findOneAndUpdate(
        { _id: context.user.data._id },
        { $pull: { savedBooks: { bookId: book } } },
        { new: true, runValidators: true }
      );
      return updatedBookList;

    }
  }

}



  ;

export default resolvers;
