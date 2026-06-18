from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import settings
from app.logger import logger

engine = create_engine(settings.DATABASE_URL, echo=settings.DEBUG)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        logger.debug("DB session opened")
        yield db
    finally:
        db.close()
        logger.debug("DB session closed")


def init_db():
    from app.models import course, enrollment, student  # noqa: F401

    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created")
