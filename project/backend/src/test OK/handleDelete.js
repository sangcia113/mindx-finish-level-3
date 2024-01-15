// Import module Express
const express = require('express');

// Import đối tượng db từ file handleConnectDatabase.js
const db = require('./handleDBConnect');

// Tạo một đối tượng Router từ module Express
const handleDelete = express.Router();

// Xử lý yêu cầu DELETE tới đường dẫn '/menu'
handleDelete.delete('/menu/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql =
            'DELETE menu, menu_detail FROM menu LEFT JOIN menu_detail ON menu.id = menu_detail.menuId WHERE menu.id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/dish'
handleDelete.delete('/dish/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql =
            'DELETE dish, dish_detail FROM dish LEFT JOIN dish_detail ON dish.id = dish_detail.dishId WHERE dish.id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/dish-detail'
handleDelete.delete('/dish-detail/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM dish_detail WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/dish-type'
handleDelete.delete('/dish-type/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM dish_type WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/ingredient'
handleDelete.delete('/ingredient/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM ingredient WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/ingredient-detail'
handleDelete.delete('/ingredient-detail/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM ingredient_detail WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/ingredient-type'
handleDelete.delete('/ingredient-type/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM ingredient_type WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/supplier'
handleDelete.delete('/supplier/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM supplier WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/staff'
handleDelete.delete('/staff/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM staff WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/department'
handleDelete.delete('/department/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM department WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/unit'
handleDelete.delete('/unit/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM unit WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xử lý yêu cầu DELETE tới đường dẫn '/role'
handleDelete.delete('/role/:id', async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Câu lệnh SQL để xoá dữ liệu từ bảng
        const sql = 'DELETE FROM role WHERE id = ?';

        // Thực hiện câu lệnh SQL
        await db.query(sql, [id]);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
});

// Xuất router để sử dụng trong file khác
module.exports = handleDelete;
