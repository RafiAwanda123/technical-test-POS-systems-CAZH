<img width="923" height="638" alt="Cuplikan layar 2025-08-29 201824" src="https://github.com/user-attachments/assets/d8c4df71-3cbc-43c3-89cf-f1cb0a64dda1" /># Point Of Sale System API - Backend Developer Technical Test

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
  <img width="700" alt="Cuplikan layar 2025-08-29 202013" src="https://github.com/user-attachments/assets/15d57916-70ba-4a6d-9783-7117a49a7c32" />

### Melihat Produk
- ### GET http://localhost:3000/api/products
  - Respon
  <img width="700" alt="Cuplikan layar 2025-08-29 201801" src="https://github.com/user-attachments/assets/2bc1f377-b19a-40e3-a642-49966c3e90b2" />

### Melihat Produk sesuai ID
- ### GET http://localhost:3000/api/products/:id
  - Respon
  <img width="700" alt="Cuplikan layar 2025-08-29 201824" src="https://github.com/user-attachments/assets/ed82ab5c-83f9-4b3d-9100-b00adb3877e6" />

### Mengupdate Produk
- ### PUT http://localhost:3000/api/products/:id
  - Request
  ```bash
      {
          "name": "Laptop ASUS ROG",
          "description": "Laptop Gaming yang harganya murah",
          "price": 10000000,
          "stock_quantity":  20,
          "sku": "ASUS-ROG-001"
      }
  ```
  - Respon
  <img width="700" alt="Cuplikan layar 2025-08-29 202143" src="https://github.com/user-attachments/assets/acde805c-7439-43d9-8e69-0a6f7a991d0c" />

### Menghapus Produk
- ### DELETE http://localhost:3000/api/products/:id
  - Respon
  <img width="700" alt="Cuplikan layar 2025-08-29 202237" src="https://github.com/user-attachments/assets/48e05fd8-c633-42a4-bf2b-c511e52eceee" />

### Menambah Stok Produk
- ### PATCH http://localhost:3000/api/products/:id
  - Request
  ```bash
      {
          'quantity': 5
      }
  ```
  - Respon
  <img width="700" alt="Cuplikan layar 2025-08-29 202534" src="https://github.com/user-attachments/assets/9085ab7c-615e-486a-ba37-f34df7df0a63" />


### Memproses Transaksi
- ### POST http://localhost:3000/api/transactions
  - Request
  ```bash
      {
          "payment_method": "cash",
          "cashier_name": "Ahmad Sahroni",
          "items": [
                  {
                    "product_id": 4,
                    "quantity": 7
                  }
              ]    
      }
  ```
  - Respon
  <img width="700" alt="Cuplikan layar 2025-08-29 202844" src="https://github.com/user-attachments/assets/8ebd6116-30dd-4f95-8a4d-84813a78d376" />

  ### Melihat History Transaksi
- ### GET http://localhost:3000/api/transactions
  - Respon
  <img width="700" alt="Cuplikan layar 2025-08-29 202623" src="https://github.com/user-attachments/assets/1358b3b8-e689-46fa-b1ba-208ba68a4c5e" />

  ### Melihat History Transaksi Sesuai ID
- ### GET http://localhost:3000/api/transactions/:id
  - Respon
  <img width="923" height="641" alt="Cuplikan layar 2025-08-29 202647" src="https://github.com/user-attachments/assets/f044c59b-84c5-46f0-aea9-a1d8f45e0234" />











