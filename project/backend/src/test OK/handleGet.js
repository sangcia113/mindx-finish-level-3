// Import module Express
const express = require('express');

// Tạo một đối tượng Router từ module Express
const handleGet = express.Router();

// Import đối tượng db từ file handleConnectDatabase.js
const db = require('./handleDBConnect');

// Định nghĩa một route GET cho '/menu'
handleGet.get('/menu', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM menu ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/menu-detail'
handleGet.get('/menu-detail/:id', async (req, res) => {
    try {
        // Lấy id cần truy vấn từ params
        const { id } = req.params;

        // Tạo một câu truy vấn SQL
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

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/dish'
handleGet.get('/dish', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM dish ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/dish-detail'
handleGet.get('/dish-detail/:id', async (req, res) => {
    try {
        // Lấy id cần truy vấn từ params
        const { id } = req.params;

        // Tạo một câu truy vấn SQL
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

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/dish-type'
handleGet.get('/dish-type', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM dish_type ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/ingredient'
handleGet.get('/ingredient', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
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

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/ingredient-type'
handleGet.get('/ingredient-type', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM ingredient_type ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/stock-in'
handleGet.get('/stock-in', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM stock_in ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/stock'
handleGet.get('/stock-out', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
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

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/supplier'
handleGet.get('/supplier', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM supplier ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/staff'
handleGet.get('/staff', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM staff ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/department'
handleGet.get('/department', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM department ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/unit'
handleGet.get('/unit', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM unit ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Định nghĩa một route GET cho '/role'
handleGet.get('/role', async (req, res) => {
    try {
        // Tạo một câu truy vấn SQL
        const sql = 'SELECT * FROM role ORDER BY id DESC';

        // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
        const [results] = await db.query(sql);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
});

// Xuất router để sử dụng trong file khác
module.exports = handleGet;
