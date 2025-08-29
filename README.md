# Point Of Sale System API - Backend Developer Technical Test

Back-End Developer RESTful APIs untuk sebuah sistem Point Of Sale (POS) sederhana yang dibangun dengan NodeJs dan ExpressJs database menggunakan MySQL. API ini menyediakan beberapa fitur seperti manajemen proyek, pemrosesan pada transaksi produk, dan manajemen iventori.

## Technical Stack
- **Runtime**: NodeJs
- **Framework**: ExpressJS
- **Database**: MySQL
- **ORM**: Sequelize
- **Validation**: Express Validator + Joi

## Desain Database
### Tabel Produk
```sql
    CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock_quantity INT NOT NULL DEFAULT 0,
        sku VARCHAR(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
```
### Tabel Transaksi
```sql
    CREATE TABLE transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        transaction_code VARCHAR(50) UNIQUE NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        payment_method ENUM('cash', 'card', 'e-wallet') DEFAULT 'cash',
        cashier_name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
```
### Tabel Transaksi Item
```sql
    CREATE TABLE transaction_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        transaction_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );
```

