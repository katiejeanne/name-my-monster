const hourlyRequests = new Map();

export function createHourlyLimit() {
  return (req, res, next) => {
    // Check kill switch
    if (process.env.API_DISABLED === "true") {
      return res.status(503).json({
        succes: false,
        error:
          "API temporarily unavailable for maintenance. Please check back later!",
      });
    }

    const limit = parseInt(process.env.HOURLY_REQUEST_LIMIT) || 150;
    const currentHour = new Date().toISOString().substring(0, 13); //YYYY-MM-DDTHH

    if (!hourlyRequests.has(currentHour)) {
      hourlyRequests.set(currentHour, 0);
    }

    const requestCount = hourlyRequests.get(currentHour);

    if (requestCount >= limit) {
      const nextHour = new Date();
      nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
      const minutesLeft = Math.ceil((nextHour - Date.now()) / 60000);

      return res.status(429).json({
        success: false,
        error: `Hourly limit for requests reached. Try again in ${minutesLeft} minutes. This helps to keep the demo running for everyone!`,
      });
    }

    hourlyRequests.set(currentHour, requestCount + 1);
    next();
  };
}
