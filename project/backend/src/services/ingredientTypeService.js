const db = require('../configs/databaseConfig');

const createIngredientType = async name => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO ingredient_type (name, createdDate) VALUES (?, ?)`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, new Date()]);
};

const readIngredientType = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT * FROM ingredient_type ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateIngredientType = async (name, id) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE ingredient_type SET name = ?, createdDate = ? WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, new Date(), id]);
};

const deleteIngredientType = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = `DELETE FROM ingredient_type WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = {
    createIngredientType,
    readIngredientType,
    updateIngredientType,
    deleteIngredientType,
};
