const db = require('../config/databaseConfig');

const createStockOut = async => {};

const readStockOut = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT
                    si.*,
                    so.exportQuantity
                FROM
                    stock_in AS si
                LEFT JOIN stock_out AS so
                ON
                    so.stockInId = si.id
                ORDER BY
                    si.id
                DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateStockOut = async => {};

const deleteStockOut = async => {};

module.exports = { createStockOut, readStockOut, updateStockOut, deleteStockOut };
