// Simple in-memory rate limiter for Telegram bot
class RateLimiter {
  constructor() {
    this.requests = new Map(); // userId -> { count, resetTime }
    this.maxRequestsPerMinute =
      parseInt(process.env.MAX_REQUESTS_PER_MINUTE) || 10;
    this.maxRequestsPerUser = parseInt(process.env.MAX_REQUESTS_PER_USER) || 5;

    // Clean up old entries every minute
    setInterval(() => {
      this.cleanup();
    }, 60000);
  }

  cleanup() {
    const now = Date.now();
    for (const [userId, data] of this.requests.entries()) {
      if (now > data.resetTime) {
        this.requests.delete(userId);
      }
    }
  }

  isAllowed(userId) {
    const now = Date.now();
    const userData = this.requests.get(userId);

    if (!userData) {
      // First request from this user
      this.requests.set(userId, {
        count: 1,
        resetTime: now + 60000, // Reset in 1 minute
      });
      return { allowed: true, remainingRequests: this.maxRequestsPerUser - 1 };
    }

    if (now > userData.resetTime) {
      // Reset the counter
      this.requests.set(userId, {
        count: 1,
        resetTime: now + 60000,
      });
      return { allowed: true, remainingRequests: this.maxRequestsPerUser - 1 };
    }

    if (userData.count >= this.maxRequestsPerUser) {
      // Rate limit exceeded
      const timeUntilReset = Math.ceil((userData.resetTime - now) / 1000);
      return {
        allowed: false,
        remainingRequests: 0,
        resetInSeconds: timeUntilReset,
      };
    }

    // Increment counter
    userData.count++;
    return {
      allowed: true,
      remainingRequests: this.maxRequestsPerUser - userData.count,
    };
  }

  getRemainingTime(userId) {
    const userData = this.requests.get(userId);
    if (!userData) return 0;

    const now = Date.now();
    return Math.max(0, Math.ceil((userData.resetTime - now) / 1000));
  }
}

export const rateLimiter = new RateLimiter();
