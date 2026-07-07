import re

def mask_sensitive_data(text):

    text = re.sub(
        r'\b\d{9,18}\b',
        '[ACCOUNT_NUMBER]',
        text
    )

    text = re.sub(
        r'[A-Z]{5}[0-9]{4}[A-Z]',
        '[PAN]',
        text
    )

    text = re.sub(
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b',
        '[EMAIL]',
        text
    )

    text = re.sub(
        r'\+?\d[\d\s-]{8,}',
        '[PHONE]',
        text
    )

    return text