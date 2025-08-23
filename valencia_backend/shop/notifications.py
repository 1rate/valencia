import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)

def send_telegram_message(message: str) -> None:
    url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        'chat_id': settings.TELEGRAM_CHAT_ID,
        'text': message,
    }
    try:
        response = requests.post(url, data=payload)
        response.raise_for_status()  # если статус не 200, возбуждает исключение
        logger.info("Telegram response: %s", response.text)
    except requests.RequestException as e:
        logger.error("Ошибка отправки сообщения в Telegram: %s", e)
        if e.response is not None:
            logger.error("Ответ сервера: %s", e.response.text)
