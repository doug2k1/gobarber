import { Request, Response, NextFunction } from 'express'
import AppError from '@shared/errors/AppError'

export default function handleErrors(
  e: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  if (e instanceof AppError) {
    return res.status(e.statusCode).json({ error: e.message })
  }

  return res.status(500).json({
    error: 'Internal server error',
  })
}
