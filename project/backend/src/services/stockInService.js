const db = require('../config/databaseConfig');

const createStockIn = async (ingredientId, supplierId, quantity, price) => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO 
                    stock_in (ingredientId, supplierId, quantity, price, createdDate) 
                VALUES (?, ?, ?, ?, ?)`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [ingredientId, supplierId, quantity, price, new Date()]);
};

const readStockIn = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT * FROM stock_in ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateStockIn = async (ingredientId, supplierId, quantity, price, id) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE 
                    stock_in 
                SET 
                    ingredientId = ?, 
                    supplierId = ?, 
                    quantity = ?, 
                    price = ?, 
                    createdDate = ? 
                WHERE 
                    id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [ingredientId, supplierId, quantity, price, new Date(), id]);
};

const deleteStockIn = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = `DELETE FROM stock_in WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = { createStockIn, readStockIn, updateStockIn, deleteStockIn };
