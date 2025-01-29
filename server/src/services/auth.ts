// import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
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

    try {
      const { data }: any = jwt.verify(token, secretKey, { maxAge: '2hr'});
      req.user = data
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
