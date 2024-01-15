const db = require('../configs/databaseConfig');

const createDishType = async name => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO dish_type (name, createdDate) VALUES (?, ?)`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, new Date()]);
};

const readDishType = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT * FROM dish_type ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateDishType = async (name, id) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE dish_type SET name = ?, createdDate = ? WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, new Date(), id]);
};

const deleteDishType = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = `DELETE FROM dish_type WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = { createDishType, readDishType, updateDishType, deleteDishType };
