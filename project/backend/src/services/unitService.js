const db = require('../config/databaseConfig');

const createUnit = async name => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO unit (name, createdDate) VALUES (?, ?)`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, new Date()]);
};

const readUnit = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT * FROM unit ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateUnit = async (name, id) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE unit SET name = ?, createdDate = ? WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, new Date(), id]);
};

const deleteUnit = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = `DELETE FROM unit WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = { createUnit, readUnit, updateUnit, deleteUnit };
