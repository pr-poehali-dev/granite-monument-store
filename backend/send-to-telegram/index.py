import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send photo retouch request to Telegram
    Args: event - dict with httpMethod, body (photo_url, name, phone, comment)
          context - object with request_id attribute
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    photo_url = body_data.get('photo_url', '')
    name = body_data.get('name', 'Не указано')
    phone = body_data.get('phone', 'Не указано')
    comment = body_data.get('comment', 'Нет комментария')
    
    if not photo_url:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'photo_url is required'})
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Telegram credentials not configured',
                'has_token': bool(bot_token),
                'has_chat_id': bool(chat_id)
            })
        }
    
    caption = f"🖼 Новая заявка на ретушь\n\n👤 Имя: {name}\n📞 Телефон: {phone}\n💬 Комментарий: {comment}"
    
    url = f"https://api.telegram.org/bot{bot_token}/sendPhoto"
    payload = json.dumps({
        'chat_id': chat_id,
        'photo': photo_url,
        'caption': caption
    }).encode('utf-8')
    
    req = urllib.request.Request(
        url,
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    with urllib.request.urlopen(req) as response:
        telegram_response = json.loads(response.read().decode('utf-8'))
        
        if telegram_response.get('ok'):
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Sent to Telegram'})
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Telegram API error', 'details': telegram_response})
            }