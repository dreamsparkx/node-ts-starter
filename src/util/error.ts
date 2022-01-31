import logger from "./logger";

export class GeneralError extends Error {
  errors?: unknown[];
  constructor(message: string, errors?: unknown[]) {
    super();
    this.message = message;
    this.errors = errors;
  }
  getCode() {
    if (this instanceof ForbiddenError) {
      return 403;
    } else if (this instanceof NotAcceptableError) {
      return 406;
    } else if (this instanceof BadRequestError) {
      return 400;
    } else if (this instanceof ConflictError) {
      return 409;
    } else if (this instanceof InternalServerError) {
      return 500;
    }
  }
}

export class ForbiddenError extends GeneralError {
  constructor(message: string, errors?: unknown[]) {
    super(message, errors);
  }
}

export class NotAcceptableError extends GeneralError {
  constructor(message: string) {
    super(message);
  }
}

export class ConflictError extends GeneralError {
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends GeneralError {
  constructor(message: string, errors?: unknown[]) {
    super(message, errors);
  }
}

export class InternalServerError extends GeneralError {
  constructor(message: string, errors?: unknown[]) {
    super(message);
    logger.error("Internal Server Error", errors);
  }
}
