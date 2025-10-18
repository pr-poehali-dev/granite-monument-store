'''
Business: CRUD API для управления товарами с поддержкой загрузки Excel
Args: event - dict with httpMethod, body, queryStringParameters, pathParams
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with products data or operation status
'''

import json
import os
import base64
from typing import Dict, Any, List, Optional
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
import openpyxl
from io import BytesIO

DATABASE_URL = os.environ.get('DATABASE_URL')

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    path_params = event.get('pathParams', {})
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    if method == 'GET':
        product_id = path_params.get('id')
        if product_id:
            return get_product(product_id, headers)
        else:
            return get_all_products(event, headers)
    
    elif method == 'POST':
        body_str = event.get('body', '{}')
        
        if event.get('isBase64Encoded'):
            body_bytes = base64.b64decode(body_str)
            return import_excel(body_bytes, headers)
        else:
            body_data = json.loads(body_str)
            return create_product(body_data, headers)
    
    elif method == 'PUT':
        product_id = path_params.get('id')
        body_data = json.loads(event.get('body', '{}'))
        return update_product(product_id, body_data, headers)
    
    elif method == 'DELETE':
        product_id = path_params.get('id')
        return delete_product(product_id, headers)
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }

def get_all_products(event: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    query_params = event.get('queryStringParameters', {}) or {}
    category = query_params.get('category')
    
    if category:
        cur.execute("SELECT * FROM products WHERE category = %s ORDER BY created_at DESC", (category,))
    else:
        cur.execute("SELECT * FROM products ORDER BY created_at DESC")
    
    products = cur.fetchall()
    cur.close()
    conn.close()
    
    products_list = []
    for product in products:
        product_dict = dict(product)
        if 'price' in product_dict and product_dict['price']:
            product_dict['price'] = float(product_dict['price'])
        if 'created_at' in product_dict and product_dict['created_at']:
            product_dict['created_at'] = product_dict['created_at'].isoformat()
        if 'updated_at' in product_dict and product_dict['updated_at']:
            product_dict['updated_at'] = product_dict['updated_at'].isoformat()
        products_list.append(product_dict)
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'products': products_list}),
        'isBase64Encoded': False
    }

def get_product(product_id: str, headers: Dict[str, str]) -> Dict[str, Any]:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT * FROM products WHERE id = %s", (product_id,))
    product = cur.fetchone()
    
    cur.close()
    conn.close()
    
    if not product:
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Product not found'}),
            'isBase64Encoded': False
        }
    
    product_dict = dict(product)
    if 'price' in product_dict and product_dict['price']:
        product_dict['price'] = float(product_dict['price'])
    if 'created_at' in product_dict and product_dict['created_at']:
        product_dict['created_at'] = product_dict['created_at'].isoformat()
    if 'updated_at' in product_dict and product_dict['updated_at']:
        product_dict['updated_at'] = product_dict['updated_at'].isoformat()
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'product': product_dict}),
        'isBase64Encoded': False
    }

def create_product(data: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("""
        INSERT INTO products (name, category, shape, size, dimensions, material, price, description, image_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    """, (
        data.get('name'),
        data.get('category'),
        data.get('shape'),
        data.get('size'),
        data.get('dimensions'),
        data.get('material'),
        data.get('price'),
        data.get('description'),
        data.get('image_url')
    ))
    
    product = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    product_dict = dict(product)
    if 'price' in product_dict and product_dict['price']:
        product_dict['price'] = float(product_dict['price'])
    if 'created_at' in product_dict and product_dict['created_at']:
        product_dict['created_at'] = product_dict['created_at'].isoformat()
    if 'updated_at' in product_dict and product_dict['updated_at']:
        product_dict['updated_at'] = product_dict['updated_at'].isoformat()
    
    return {
        'statusCode': 201,
        'headers': headers,
        'body': json.dumps({'product': product_dict}),
        'isBase64Encoded': False
    }

def update_product(product_id: str, data: Dict[str, Any], headers: Dict[str, str]) -> Dict[str, Any]:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("""
        UPDATE products 
        SET name = %s, category = %s, shape = %s, size = %s, dimensions = %s, 
            material = %s, price = %s, description = %s, image_url = %s, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
        RETURNING *
    """, (
        data.get('name'),
        data.get('category'),
        data.get('shape'),
        data.get('size'),
        data.get('dimensions'),
        data.get('material'),
        data.get('price'),
        data.get('description'),
        data.get('image_url'),
        product_id
    ))
    
    product = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    if not product:
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Product not found'}),
            'isBase64Encoded': False
        }
    
    product_dict = dict(product)
    if 'price' in product_dict and product_dict['price']:
        product_dict['price'] = float(product_dict['price'])
    if 'created_at' in product_dict and product_dict['created_at']:
        product_dict['created_at'] = product_dict['created_at'].isoformat()
    if 'updated_at' in product_dict and product_dict['updated_at']:
        product_dict['updated_at'] = product_dict['updated_at'].isoformat()
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'product': product_dict}),
        'isBase64Encoded': False
    }

def delete_product(product_id: str, headers: Dict[str, str]) -> Dict[str, Any]:
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("DELETE FROM products WHERE id = %s RETURNING id", (product_id,))
    deleted = cur.fetchone()
    
    conn.commit()
    cur.close()
    conn.close()
    
    if not deleted:
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Product not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'message': 'Product deleted successfully'}),
        'isBase64Encoded': False
    }

def import_excel(file_bytes: bytes, headers: Dict[str, str]) -> Dict[str, Any]:
    wb = openpyxl.load_workbook(BytesIO(file_bytes))
    ws = wb.active
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    imported_count = 0
    errors = []
    
    for idx, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=2):
        if not row[0]:
            continue
        
        name = row[0]
        category = row[1] if len(row) > 1 else None
        shape = row[2] if len(row) > 2 else None
        size = row[3] if len(row) > 3 else None
        dimensions = row[4] if len(row) > 4 else None
        material = row[5] if len(row) > 5 else None
        price = row[6] if len(row) > 6 else 0
        description = row[7] if len(row) > 7 else None
        image_url = row[8] if len(row) > 8 else None
        
        if isinstance(price, str):
            price = price.replace(' ', '').replace(',', '.')
        
        try:
            cur.execute("""
                INSERT INTO products (name, category, shape, size, dimensions, material, price, description, image_url)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (name, category, shape, size, dimensions, material, price, description, image_url))
            imported_count += 1
        except Exception as e:
            errors.append(f'Row {idx}: {str(e)}')
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({
            'message': f'Successfully imported {imported_count} products',
            'imported': imported_count,
            'errors': errors
        }),
        'isBase64Encoded': False
    }
