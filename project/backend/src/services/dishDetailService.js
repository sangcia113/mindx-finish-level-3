const db = require('../config/databaseConfig');

const readDishDetail = async id => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT
                    i.id,
                    i.name AS ingredientName,
                    it.name AS ingredientTypeName,
                    u.name AS unitName,
                    standard,
                    price
                FROM
                    dish_detail AS dd
                LEFT JOIN ingredient AS i
                ON
                    i.id = dd.ingredientId
                LEFT JOIN ingredient_type AS it
                ON
                    it.id = i.ingredientTypeId
                LEFT JOIN stock_in AS si
                ON
                    si.ingredientId = i.id
                LEFT JOIN unit AS u
                ON
                    u.id = i.unitId
                WHERE
                    dishId = ?
                ORDER BY
                    i.id
                DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql, [id]);

    // Trả về kết quả của truy vấn SQL
    return results;
};

module.exports = { readDishDetail };
