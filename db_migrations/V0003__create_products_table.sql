-- Создание таблицы продуктов (памятников)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    shape VARCHAR(100),
    size VARCHAR(100),
    dimensions VARCHAR(100),
    material VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_material ON products(material);

-- Вставка примеров данных
INSERT INTO products (name, category, shape, size, dimensions, material, price, description, image_url) VALUES
('Классика 1', 'standard', 'classic', 'medium', '100×50×5 см', 'black-granite', 25000, 'Классический вертикальный памятник из чёрного гранита', 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png'),
('Элегант', 'premium', 'rounded', 'medium', '110×55×5 см', 'gray-granite', 28000, 'Элегантный памятник со скруглёнными углами', 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png'),
('Арка', 'standard', 'arch', 'medium', '100×50×5 см', 'black-granite', 30000, 'Памятник с арочным верхом', 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png'),
('Премиум', 'premium', 'rounded', 'large', '120×60×8 см', 'black-granite', 42000, 'Большой премиальный памятник', 'https://cdn.poehali.dev/files/3347e17b-650e-405f-820c-760c6cf5c12e.png')
ON CONFLICT DO NOTHING;