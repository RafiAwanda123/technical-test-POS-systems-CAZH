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

## Step-step instalasi

### Step
1. Clone Repo
   ```bash
       git clone <repo-url>
       cd nama-repo
   ```
2. Install Library
   ```bash
       npm install
   ```
3. Setup Database
   ```bash
       mysql -u root -p -e "CREATE DATABASE nama-database;"
       nano .env
       # Membuat envoriment untuk menyimpan key yang diperlukan
   ```
4. Inisiasi Database
   ```bash
        npm run init-db
   ```
5. Jalankan Server
   ```bash
       # Untuk Development mode
       npm run dev
       # Untuk Product mode
       npm run start
   ```

## API Endpoint
### Produk Manajemen
- `GET /api/products` - Mendapatkan semua produk
- `GET /api/products/:id` - Mendapatkan detail produk
- `POST /api/products` - Membuat produk baru
- `PUT /api/products/:id` - Mengupdate produk
- `DELETE /api/products/:id` - Menghapus produk
- `PATCH /api/products/:id/stock` - Menambah stok produk

### Transactions
- `POST /api/transactions` - Memproses transaksi baru
- `GET /api/transactions` - Mendapatkan riwayat transaksi
- `GET /api/transactions/:id` - Mendapatkan detail transaksi

## Contoh Memanggil API 

Untuk melakukan testing ini saya menggunakan Postman 

### Membuat Produk
- ### POST http://localhost:3000/api/products
  - Request
  ```bash
      {
          "name": "Laptop Ideapad Slim 1",
          "description": "Laptop Kantoran cocok untuk semua pekerjaan",
          "price": 6000000,
          "stock_quantity": 13,
          "sku": "LNV-IDS-001"
      }
  ```
  - Respon
  <img width="500" alt="Cuplikan layar 2025-08-29 202013" src="https://github.com/user-attachments/assets/15d57916-70ba-4a6d-9783-7117a49a7c32" />

  ### Memproses Transaksi
- ### POST http://localhost:3000/api/transactions
  - Request
  ```bash
      {
          "payment_method": "cash",
          "cashier_name": "Rafi Awanda",
          "items": [
                  {
                    "product_id": 6,
                    "quantity": 7
                  }
              ]    
      }
  ```
  - Respon
  <img width="700" alt="Cuplikan layar 2025-08-29 202844" src="https://github.com/user-attachments/assets/8ebd6116-30dd-4f95-8a4d-84813a78d376" />

  






