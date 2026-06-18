from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

from app.logger import logger


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info("API Request: %s %s", request.method, request.url.path)
        try:
            response = await call_next(request)
            logger.info(
                "API Response: %s %s -> %s",
                request.method,
                request.url.path,
                response.status_code,
            )
            return response
        except Exception:
            logger.exception("API Error: %s %s", request.method, request.url.path)
            raise
