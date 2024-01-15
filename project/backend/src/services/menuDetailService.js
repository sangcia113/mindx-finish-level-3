const db = require('../config/databaseConfig');

const readMenuDetail = async id => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT
                    dd.id,
                    m.id AS menuId,
                    menuDate,
                    d.id AS dishId,
                    d.name AS dishName,
                    i.name AS ingredientName,
                    u.name AS unitName,
                    standard,
                    servingSize,
                    price
                FROM
                    menu AS m
                LEFT JOIN menu_detail AS md
                ON
                    m.id = md.menuId
                LEFT JOIN dish AS d
                ON
                    d.id = md.dishId
                LEFT JOIN dish_detail AS dd
                ON
                    dd.dishId = d.id
                LEFT JOIN ingredient AS i
                ON
                    i.id = dd.ingredientId
                LEFT JOIN unit AS u
                ON
                    u.id = i.unitId
                LEFT JOIN stock_in AS si
                ON
                    si.ingredientId = i.id
                WHERE
                    m.id = ?
                GROUP BY
                    d.id, i.id
                ORDER BY
                    md.dishId DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql, [id]);

    // Trả về kết quả của truy vấn SQL
    return results;
};

module.exports = { readMenuDetail };
