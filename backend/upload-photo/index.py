import json
import base64
import os
import uuid
import urllib.request
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Upload photo and return CDN URL
    Args: event - dict with httpMethod, body (base64 encoded file)
          context - object with request_id attribute
    Returns: HTTP response with CDN URL
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
    
    file_data = body_data.get('file', '')
    file_name = body_data.get('filename', f'{uuid.uuid4()}.jpg')
    
    if not file_data:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'file data is required'})
        }
    
    try:
        if ',' in file_data:
            file_data = file_data.split(',')[1]
        
        file_bytes = base64.b64decode(file_data)
        
        project_id = 'a972bc37-a8fd-483e-b573-f52aa6f2509f'
        file_id = str(uuid.uuid4())
        
        ext = file_name.split('.')[-1] if '.' in file_name else 'jpg'
        cdn_url = f'https://cdn.poehali.dev/projects/{project_id}/files/{file_id}.{ext}'
        
        upload_url = 'https://api.poehali.dev/upload'
        
        boundary = f'----WebKitFormBoundary{uuid.uuid4().hex[:16]}'
        body_parts = []
        body_parts.append(f'--{boundary}'.encode())
        body_parts.append(f'Content-Disposition: form-data; name="file"; filename="{file_name}"'.encode())
        body_parts.append(f'Content-Type: image/{ext}'.encode())
        body_parts.append(b'')
        body_parts.append(file_bytes)
        body_parts.append(f'--{boundary}--'.encode())
        
        body = b'\r\n'.join(body_parts)
        
        req = urllib.request.Request(
            upload_url,
            data=body,
            headers={
                'Content-Type': f'multipart/form-data; boundary={boundary}',
                'Content-Length': str(len(body))
            },
            method='POST'
        )
        
        with urllib.request.urlopen(req) as response:
            upload_response = json.loads(response.read().decode('utf-8'))
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'url': upload_response.get('url', cdn_url)})
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
