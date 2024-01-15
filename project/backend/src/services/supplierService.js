const db = require('../configs/databaseConfig');

const createSupplier = async (name, numberPhone, address) => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO supplier (name, numberPhone, address, createdDate) VALUES (?, ?, ?, ?)`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, numberPhone, address, new Date()]);
};

const readSupplier = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT * FROM supplier ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateSupplier = async (name, numberPhone, address, id) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE supplier SET name = ?, numberPhone = ?, address = ?, createdDate = ? WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, numberPhone, address, new Date(), id]);
};

const deleteSupplier = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = 'DELETE FROM supplier WHERE id = ?';

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = { createSupplier, readSupplier, updateSupplier, deleteSupplier };
