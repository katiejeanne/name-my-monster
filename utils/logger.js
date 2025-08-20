import winston from "winston";
import fs from "fs";

const logsDir = "./logs";
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: `logs/app.log`,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// Token tracking
const tokenTotals = new Map();

function getTokenKey(service, period) {
  const now = new Date();
  const hour = now.toISOString().substring(0, 13); // 2024-01-15T14
  const day = now.toISOString().substring(0, 10); // 2024-01-15
  const month = now.toISOString().substring(0, 7); // 2024-01

  switch (period) {
    case "hour":
      return `${service}-${hour}`;
    case "day":
      return `${service}-${day}`;
    case "month":
      return `${service}-${month}`;
    default:
      return `${service}-${period}`;
  }
}

function updateTokenTotals(service, tokens) {
  const periods = ["hour", "day", "month"];
  const totals = {};

  periods.forEach((period) => {
    const key = getTokenKey(service, period);
    const current = tokenTotals.get(key) || 0;
    const newTotal = current + tokens;
    tokenTotals.set(key, newTotal);
    totals[period] = newTotal;
  });

  return totals;
}

logger.tokenUsage = (service, tokens, responseTime, success) => {
  const totals = updateTokenTotals(service, tokens);

  logger.info("API Token Usage", {
    service,
    thisRequest: tokens,
    totalsThisHour: totals.hour,
    totalsThisDay: totals.day,
    totalThisMonth: totals.month,
    responseTime: `${responseTime}ms`,
    success,
  });
};

logger.rateLimitHit = (type, currentCount, limit, minutesLeft = null) => {
  logger.warn("Rate Limit Hit", {
    type,
    currentCount,
    limit,
    ...(minutesLeft && { minutesLeft }),
  });
};

logger.usageSummary = (hourlyCount, hour) => {
  logger.info("Usage Summary", {
    hourlyCount,
    hour: hour || new Date().getHours(),
    timestamp: new Date().toISOString(),
  });
};
