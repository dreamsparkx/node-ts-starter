import logger from "./logger";

export class GeneralError extends Error {
  errors?: unknown[];
  constructor(message: string, errors?: unknown[]) {
    super();
    this.message = message;
    this.errors = errors;
  }
  /**
   * Returns status code of the type of error initialized
   * @returns status code of the type of error initialized
   */
  getCode() {
    if (this instanceof BadRequestError) {
      return 400;
    } else if (this instanceof UnAuthorizedRequestError) {
      return 401;
    } else if (this instanceof ForbiddenError) {
      return 403;
    } else if (this instanceof NotAcceptableError) {
      return 406;
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
  constructor(
    message: string = "Internal Server Error",
    errors?: unknown[],
  ) {
    super(message);
    logger.error(message, errors);
  }
}

export class UnAuthorizedRequestError extends GeneralError {
  constructor(message: string) {
    super(message);
  }
}
