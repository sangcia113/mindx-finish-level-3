const db = require('../configs/databaseConfig');

const createIngredient = async (name, ingredientTypeId, unitId, minStock) => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO 
                    ingredient (name, ingredientTypeId, unitId, minStock, createdDate) 
                VALUES (?, ?, ?, ?, ?)`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, ingredientTypeId, unitId, minStock, new Date()]);
};

const readIngredient = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT
                    i.*,
                    si.importQuantity - SUM(exportQuantity) AS stockQuantity
                FROM
                    ingredient AS i
                LEFT JOIN stock_in AS si
                ON
                    si.ingredientId = i.id
                LEFT JOIN stock_out AS so
                ON
                    so.stockInId = si.id
                GROUP BY
                    i.id`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateIngredient = async (name, ingredientTypeId, unitId, minStock, id) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE 
                    ingredient 
                SET 
                    name = ?, 
                    ingredientTypeId = ?, 
                    unitId = ?, 
                    minStock = ?, 
                    createdDate = ? 
                WHERE 
                    id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, ingredientTypeId, unitId, minStock, new Date(), id]);
};

const deleteIngredient = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = `DELETE FROM ingredient WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = { createIngredient, readIngredient, updateIngredient, deleteIngredient };
