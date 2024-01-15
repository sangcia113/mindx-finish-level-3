// Import module Express
const express = require('express');

// Import đối tượng db từ file handleConnectDatabase.js
const db = require('./handleDBConnect');

// Tạo một đối tượng Router từ module Express
const handlePut = express.Router();

// Xử lý yêu cầu PUT tới đường dẫn '/dish'
handlePut.put('/menu/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { menuDate, menuDetail } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(menuDate || menuDetail)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để chèn dữ liệu vào bảng
        const sql = 'UPDATE menu SET menuDate = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [menuDate, new Date(), id]);

        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const deleteMenuDetailSQL = 'DELETE FROM menu_detail WHERE menuId = ?';

        // Thực hiện câu lệnh SQL
        await db.query(deleteMenuDetailSQL, [id]);

        // Tạo một mảng chứa các giá trị để chèn vào bảng 'menu_detail'
        const detailValues = menuDetail.flatMap(detail =>
            detail.dishId.map(dishId => [id, dishId, detail.servingSize, new Date()])
        );

        // Câu lệnh SQL để chèn dữ liệu vào bảng 'menu_detail'
        const insertMenuDetailSQL = `INSERT INTO menu_detail (menuId, dishId, servingSize, createdDate) VALUES ?`;

        // Thực hiện câu lệnh SQL
        await db.query(insertMenuDetailSQL, [detailValues]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/dish'
handlePut.put('/dish/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name, dishTypeId, dishDetail } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(name || dishTypeId || dishDetail)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql = 'UPDATE dish SET name = ?, dishTypeId = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, dishTypeId, new Date(), id]);

        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const deleteDishDetailSQL = 'DELETE FROM dish_detail WHERE dishId = ?';

        // Thực hiện câu lệnh SQL
        await db.query(deleteDishDetailSQL, [id]);

        // Tạo một mảng chứa các giá trị để chèn vào bảng 'dish_detail'
        const detailValues = dishDetail.flatMap(detail => [
            [id, detail.ingredientId, detail.standard, new Date()],
        ]);

        // Câu lệnh SQL để chèn dữ liệu vào bảng 'menu_detail'
        const insertDishDetailSQL = `INSERT INTO dish_detail (dishId, ingredientId, standard, createdDate) VALUES ?`;

        // Thực hiện câu lệnh SQL
        await db.query(insertDishDetailSQL, [detailValues]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/dish-detail'
handlePut.put('/dish-detail/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { dishId, ingredientId, standard } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(dishId || ingredientId || standard)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql =
            'UPDATE dish_detail SET dishId = ?, ingredientId = ?, standard = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [dishId, ingredientId, standard, new Date(), id]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/dish-type'
handlePut.put('/dish-type/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!name) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql = 'UPDATE dish_type SET name = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date(), id]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/ingredient'
handlePut.put('/ingredient/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name, ingredientTypeId, unitId, minStock } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(name || ingredientTypeId || unitId || minStock)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql =
            'UPDATE ingredient SET name = ?, ingredientTypeId = ?, unitId = ?, minStock = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, ingredientTypeId, unitId, minStock, new Date(), id]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/ingredient-detail'
handlePut.put('/ingredient-detail/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { ingredientId, supplierId, quantity, price } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(ingredientId || supplierId || quantity || price)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql =
            'UPDATE ingredient_detail SET ingredientId = ?, supplierId = ?, quantity = ?, price = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [ingredientId, supplierId, quantity, price, new Date(), id]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/ingredient-type'
handlePut.put('/ingredient-type/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!name) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql = 'UPDATE ingredient_type SET name = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date(), id]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/supplier'
handlePut.put('/supplier/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name, numberPhone, address } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(name || numberPhone || address)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql =
            'UPDATE supplier SET name = ?, numberPhone = ?, address = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, numberPhone, address, new Date(), id]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/staff'
handlePut.put('/staff/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { code, name, birthday, gender, numberPhone, pass, roleId, departmentId } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(code || name || birthday || gender || numberPhone || pass || roleId || departmentId)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql =
            'UPDATE staff SET code = ?, name = ?, birthday = ?, gender = ?, numberPhone = ?, pass = ?, roleId = ?, departmentId = ?, createdDate = ? WHERE id = ?';

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
            id,
        ]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/department'
handlePut.put('/department/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(id || name)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql = 'UPDATE department SET name = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date(), id]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/unit'
handlePut.put('/unit/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(id || name)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql = 'UPDATE unit SET name = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date(), id]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu PUT tới đường dẫn '/role'
handlePut.put('/role/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { name } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(id || name)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để cập nhật dữ liệu vào bảng
        const sql = 'UPDATE role SET name = ?, createdDate = ? WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [name, new Date(), id]);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xuất router để sử dụng trong file khác
module.exports = handlePut;
