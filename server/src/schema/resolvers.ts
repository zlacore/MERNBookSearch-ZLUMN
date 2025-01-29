
import { User } from "../models/index.js";
import { signToken } from "../services/auth.js";

interface User {
  username: string
  password: string
  email: string
}
interface SingleUserArgs {
  username: string
  id: number
}

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
  book: string
}

interface DeleteBookArgs {
  book: string
}

interface Context {
  userId: number,
  user: string
}
const resolvers = {
  Query: {
    helloWorld: (_a, _b, context: any) => {
      return "Hello World! also, this: " + context.user;
    },
    me: async (_parents: any, { username, id }: SingleUserArgs) => {
      return await User.findOne({ $or: [{ _id: id ? id : id }, { username: username }] })
    }
  },
  Mutation: {
    createUser: async (_parents: any, { username, email, password }: CreateUserArgs): Promise<{ user: User, token: string }> => {
      const user = await User.create({ username: username, password: password, email: email});
      const token = signToken(user.username, user.email, user.password)
      return { token, user }
    },

    login: async (_parents: any, { username, password, email }: LoginArgs): Promise<{ user: User, token: string }> => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      if (!user) {
        throw new Error("User not found");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error("Incorrect password!")
      }

      const token = signToken(user.username, user.password, user._id);
      return { token, user };
    },
    saveBook: async (_parent: any, { book }: SaveBookArgs, context: Context) => {
      if (!context.user) {
        throw new Error("No user found!")
      }
      const updatedBookList = await User.findOneAndUpdate(
        { _id: context.userId },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );

      return updatedBookList
    },
    deleteBook: async (_parent: any, { book }: DeleteBookArgs, context: Context) => {
      if (!context.user) {
        throw new Error("User not found")
      }
      const updatedBookList = await User.findOneAndUpdate(
        { _id: context.userId },
        { $pull: { savedBooks: { bookId: book } } },
        { new: true, runValidators: true }
      );
      return updatedBookList;

    }
  }

}



  ;

export default resolvers;
