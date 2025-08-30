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
       DB_HOST=127.0.0.1
       DB_PORT=3306
       DB_NAME=nama-database
       DB_USER=user
       DB_PASSWORD=password
       NODE_ENV=development
       PORT=3000
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
  <img width="700" alt="Cuplikan layar 2025-08-29 202647" src="https://github.com/user-attachments/assets/f044c59b-84c5-46f0-aea9-a1d8f45e0234" />

## Key Challenges dan Solusi
1. **Stock Management**
   Tangani inventaris dengan benar saat terjadi penjualan. Apa yang terjadi jika seseorang mencoba membeli lebih banyak daripada stok yang tersedia?

   **Solusi:**
   - Impelementasikan database transaksi untuk memastikan konsistensi data
   - Validasikan ketersediaan stok data sebelum memproses transaksi
   - Atomic operations untuk mengupdate stok
   - Berikan kostum error handling untuk memberi tahu kalau stok ga bisa di transaksi
     
     ```javascript
         static async checkStockAvailability(productId, requiredQuantity) {
            const product = await Product.findByPk(productId);
            
            if (!product) {
              throw new Error(`Produk dengan ID ${productId} tidak ada dalam sistem.`);
            }
            
            if (product.stock_quantity < requiredQuantity) {
              throw new Error(`Stok tidak mencukupi untuk produk ${product.name}. Tersedia: ${product.stock_quantity}, Butuh: ${requiredQuantity}`);
            }
            
            return true;
          }
     ```
     
     **Hasil:**
     
     <img width="750" alt="Cuplikan layar 2025-08-29 202809" src="https://github.com/user-attachments/assets/870b73f8-2d72-482b-a1a4-207c6e6b0001" />

2. **Transaction Logic**
   Penjualan melibatkan beberapa produk dengan jumlah yang berbeda. Bagaimana Anda memastikan konsistensi data?

   **Solusi:**
   - Menggunakan transaksi data (BEGIN, COMMIT, ROLLBACK)
   - Memproses semuanya dalam satu transaksi
   - Rollback bila ada error

3. **Error Handling**
   Apa yang seharusnya terjadi jika terjadi kesalahan? Data tidak valid, produk hilang, atau kesalahan basis data?

   **Solusi:**
   - Format Error harus konsisten
   - Kode Error yang tepat
   - Pesan error terperinci untuk Development
   - Pesan error umum untuk Product

   <img width="700" alt="image" src="https://github.com/user-attachments/assets/625c83a9-7882-46c6-9fe0-df2cb3caa7c5" />
   
4. **Data Validation**
    Pengguna akan mengirimkan data yang buruk. Bagaimana Anda menangani dan menanggapinya?

   **Solusi:**
   - Validasi multi-lapis (Controller, Services, Databases)
   - Menggunakan express-validator untuk input validation
   - Sequelize validation untuk model-level validation
   - Kostum validators untuk business logic di Service dan memudahkan untuk melakukan penambahan fitur

## Apa yang Telah Diimplementasikan

**Core Requirement**
  - Desain Database untuk products, transactions, transaction_items
  - Product management (CRUD operations)
  - Process sales transactions
  - View transaction history

**Key Challenges**
  - Stock Management dengan inventory validation
  - Product Management (CRUD operations)
  - Process sales transactions
  - View transaction history

**Technical Expectations**
  - Maintainable code structure dengan pola service
  - Efficient database queries dengan Sequelize ORM
  - Consistent API responses dengan appropriate HTTP status codes
  - Correct business logic implementation

## Submission
Untuk Technical Test ini sudah dilakuksan sesuai requirement:
  - Working API dengan semua endpoint CRUD
  - Database schema/setup files
  - README dengan setup instructions
  - Dengan contoh memanggil API untuk test

Repository siap dikirim ke email developer@cazh.id 













