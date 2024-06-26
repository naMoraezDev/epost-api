import { FastifyRequest } from "fastify";
import { AuthorizationMiddleware } from "./authorization-middleware";
import { firebaseAdmin } from "../../infrastructure/db/firebase/firebase-admin";
import { UnauthorizedError } from "../../infrastructure/errors/error-instances/unauthorized";

export async function authorizationMiddleware(request: FastifyRequest) {
  const { authorization } = request.headers as { authorization?: string };
  try {
    await new AuthorizationMiddleware(firebaseAdmin).authorize({
      idToken: authorization ?? "",
    });
  } catch {
    throw new UnauthorizedError();
  }
}
