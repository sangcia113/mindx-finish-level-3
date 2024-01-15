const db = require('../config/databaseConfig');

const readStockCurrent = async id => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT 
                    importQuantity - SUM(exportQuantity) AS currentQuantity
                FROM 
                    stock_in AS si
                LEFT JOIN 
                    stock_out AS so
                ON 
                    si.id = so.stockInId
                WHERE 
                    si.ingredientId = ?`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql, [id]);

    // Trả về kết quả của truy vấn SQL
    return results;
};

module.exports = { readStockCurrent };
