import rateLimit from "express-rate-limit";
import { logger } from "../utils/logger.js";

// 1 minute limit
export const nameMonsterLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    if (req.rateLimit.current === req.rateLimit.limit + 1) {
      logger.rateLimitHit("per-user-minute", options.max, options.max, 1);
    }
    res.status(options.statusCode).json({
      success: false,
      error:
        "Too many monster naming requests. Please wait a minute before trying again.",
    });
  },
});

// 1 hour limit
export const hourlyUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 requests per hour per user
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    if (req.rateLimit.current === req.rateLimit.limit + 1) {
      logger.rateLimitHit("per-user-hour", options.max, options.max, 60);
    }
    res.status(options.statusCode).json({
      success: false,
      error: "You've made too many requests this hour. Please try again later.",
    });
  },
});

// 1 day limit
export const dailyUserLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    if (req.rateLimit.current === req.rateLimit.limit + 1) {
      logger.rateLimitHit("per-user-day", options.max, options.max, 1440);
    }
    res.status(options.statusCode).json({
      success: false,
      error: "Daily limit reached. Please try again tomorrow.",
    });
  },
});
