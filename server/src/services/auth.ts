// import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';






import dotenv from 'dotenv';
// import { Context } from 'vm';
// import { Context } from 'vm';
dotenv.config();

// interface JwtPayload {
//   _id: unknown;
//   username: string;
//   email: string,
// }

export const authenticateToken = ({ req }: any) => {
  console.log(req.headers)
  
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';


    // I keep getting an error with the resolver not returning any data. 
    try {
      const verifiedToken = jwt.verify(token, secretKey, { maxAge: '2hr'});
      console.log(verifiedToken)
      req.user = verifiedToken
      console.log("auth.ts data", req.user)
    } catch (err) {
      console.log("Error decoding jwt: ", err);
    }
  }
  
  return req
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY || '';

  return jwt.sign({data: payload}, secretKey, {expiresIn: '2h'});
};


export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: { code: 'UNAUTHENTICATED' }
    });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};