export interface Category {
  cardType: string;
  mcc: string;
  cardName: string;
}

export interface Merchant {
  id: string;
  name: string;
  location: string;
  categories: Category[];
}

export class RateLimitError extends Error {
  public statusCode: number;
  public retryAfter: number; // Time in seconds or milliseconds until retry is allowed

  constructor(message: string, retryAfter: number) {
    super(message); // Call the base Error constructor
    this.name = "RateLimitError"; // Set the error name
    this.statusCode = 429; // HTTP status code for rate limiting
    this.retryAfter = retryAfter;

    // Maintain proper stack trace (for Node.js environments)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
