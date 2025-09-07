import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [%(name)s] %(message)s",
    handlers=[
        logging.FileHandler("logs/app.log"),  # logs to a file
        logging.StreamHandler()               # logs to console
    ]
)
logger = logging.getLogger("fastapi_app")