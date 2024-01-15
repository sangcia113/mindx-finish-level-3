// Import module Express
const express = require('express');

// Import đối tượng db từ file handleConnectDatabase.js
const db = require('./handleDBConnect');

// Tạo một đối tượng Router từ module Express
const handlePost = express.Router();

// Xử lý yêu cầu POST tới đường dẫn '/menu'
handlePost.post('/menu', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { menuDate, menuDetail } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(menuDate || menuDetail)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql = 'INSERT INTO menu (menuDate, createdDate) VALUES (?, ?)';

        // Thực hiện câu lệnh SQL
        const [results] = await db.query(sql, [menuDate, new Date()]);

        // Lấy ID của bản ghi menu mới được chèn
        const menuId = results.insertId;

        // Tạo một mảng chứa các giá trị để chèn vào bảng 'menu_detail'
        const detailValues = menuDetail.flatMap(detail =>
            detail.dishId.map(dishId => [menuId, dishId, detail.servingSize, new Date()])
        );

        // Câu lệnh SQL để chèn dữ liệu vào bảng 'menu_detail'
        const insertMenuDetailSQL = `INSERT INTO menu_detail (menuId, dishId, servingSize, createdDate) VALUES ?`;

        // Thực hiện câu lệnh SQL
        await db.query(insertMenuDetailSQL, [detailValues]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/dish'
handlePost.post('/dish', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name, dishTypeId, dishDetail } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(name || dishTypeId || dishDetail)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql = 'INSERT INTO dish (name, dishTypeId, createdDate) VALUES (?, ?, ?)';

        // Thực hiện câu lệnh SQL
        const [results] = await db.query(sql, [name, dishTypeId, new Date()]);

        // Lấy ID của bản ghi dish mới được chèn
        const dishId = results.insertId;

        // Tạo một mảng chứa các giá trị để chèn vào bảng 'dish_detail'
        const detailValues = dishDetail.flatMap(detail => [
            [dishId, detail.ingredientId, detail.standard, new Date()],
        ]);

        // Câu lệnh SQL để chèn dữ liệu vào bảng 'menu_detail'
        const insertDishDetailSQL = `INSERT INTO dish_detail (dishId, ingredientId, standard, createdDate) VALUES ?`;

        // Thực hiện câu lệnh SQL
        await db.query(insertDishDetailSQL, [detailValues]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/dish-type'
handlePost.post('/dish-type', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!name) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql = 'INSERT INTO dish_type (name, createdDate) VALUES (?, ?)';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date()]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/ingredient'
handlePost.post('/ingredient', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name, ingredientTypeId, unitId, minStock } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(name || ingredientTypeId || unitId || minStock)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql =
            'INSERT INTO ingredient (name, ingredientTypeId, unitId, minStock, createdDate) VALUES (?, ?, ?, ?, ?)';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, ingredientTypeId, unitId, minStock, new Date()]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/ingredient-detail'
handlePost.post('/ingredient-detail', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { ingredientId, supplierId, quantity, price } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(ingredientId || supplierId || quantity || price)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql =
            'INSERT INTO ingredient_detail (ingredientId, supplierId, quantity, price, createdDate) VALUES (?, ?, ?, ?, ?)';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [ingredientId, supplierId, quantity, price, new Date()]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/ingredient-type'
handlePost.post('/ingredient-type', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!name) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql = 'INSERT INTO ingredient_type (name, createdDate) VALUES (?, ?)';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date()]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/supplier'
handlePost.post('/supplier', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name, numberPhone, address } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(name || numberPhone || address)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql =
            'INSERT INTO supplier (name, numberPhone, address, createdDate) VALUES (?, ?, ?, ?)';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, numberPhone, address, new Date()]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/staff'
handlePost.post('/staff', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { code, name, birthday, gender, numberPhone, pass, roleId, departmentId } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(code || name || birthday || gender || numberPhone || pass || roleId || departmentId)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql =
            'INSERT INTO staff (code, name, birthday, gender, numberPhone, pass, accountType, departmentId, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [
            code,
            name,
            birthday,
            gender,
            numberPhone,
            pass,
            roleId,
            departmentId,
            new Date(),
        ]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/department'
handlePost.post('/department', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!name) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql = 'INSERT INTO department (name, createdDate) VALUES (?, ?)';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date()]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/unit'
handlePost.post('/unit', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!name) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql = 'INSERT INTO unit (name, createdDate) VALUES (?, ?)';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date()]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu POST tới đường dẫn '/role'
handlePost.post('/role', async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!name) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql = 'INSERT INTO role (name, createdDate) VALUES (?, ?)';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date()]);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xuất router để sử dụng trong file khác
module.exports = handlePost;
