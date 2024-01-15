// Import module MySQL
const mysql = require('mysql2/promise');

// Tạo kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createPool({
    host: '192.168.1.228', // Địa chỉ host của cơ sở dữ liệu
    user: 'root', // Tên người dùng cơ sở dữ liệu
    password: '@Sang0972868740', // Mật khẩu cơ sở dữ liệu
    database: 'menu', // Tên cơ sở dữ liệu
});

module.exports = db;

// // Import module MySQL
// const mysql = require('mysql2');

// // Tạo kết nối đến cơ sở dữ liệu MySQL
// const db = mysql.createConnection({
//     host: 'localhost', // Địa chỉ host của cơ sở dữ liệu
//     user: 'root', // Tên người dùng cơ sở dữ liệu
//     password: '', // Mật khẩu cơ sở dữ liệu
//     database: 'menu', // Tên cơ sở dữ liệu
// });

// // Kết nối đến cơ sở dữ liệu và xử lý lỗi nếu có
// db.connect(err => {
//     if (err) {
//         console.error('Lỗi kết nối cơ sở dữ liệu:', err);
//     } else {
//         console.log('Kết nối cơ sở dữ liệu thành công');
//     }
// });

// module.exports = db;
