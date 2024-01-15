const db = require('../config/databaseConfig');

const createRole = async name => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO role (name, createdDate) VALUES (?, ?)`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, new Date()]);
};

const readRole = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT * FROM role ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateRole = async (name, id) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE role SET name = ?, createdDate = ? WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, new Date(), id]);
};

const deleteRole = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = `DELETE FROM role WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = { createRole, readRole, updateRole, deleteRole };
