import jwt from 'jsonwebtoken';
import { getUserId, APP_SECRET } from '../utils';

const Mutation = {
  signup: async (_, args, context, info) => {
    const user = await context.prisma.mutation.createUser(
      {
        data: args,
      },
      // info
    );
    console.log('user', user);
    const token  = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      token,
      user,
    };
  },
  addFriend: (_, args, context, info) => {
    const userId = getUserId(context);
    return context.prisma.mutation.updateUser(
      {
        data: args,
      },
    );
  }
};

export default Mutation;
