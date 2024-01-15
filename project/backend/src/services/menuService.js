const db = require('../config/databaseConfig');

const createMenuDetail = async (id, menuDetail) => {
    // Tạo một mảng chứa các giá trị để chèn vào bảng 'menu_detail'
    const detailValues = menuDetail.flatMap(detail =>
        detail.dishId.map(dishId => [id, dishId, detail.servingSize, new Date()])
    );

    // Câu lệnh SQL để chèn dữ liệu vào bảng 'menu_detail'
    const sql = `INSERT INTO menu_detail (menuId, dishId, servingSize, createdDate) VALUES ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [detailValues]);
};

const createMenu = async (menuDate, menuDetail) => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO menu (menuDate, createdDate) VALUES (?, ?)`;

    // Thực hiện câu lệnh SQL
    const [results] = await db.query(sql, [menuDate, new Date()]);

    // Lấy ID của bản ghi menu mới được chèn
    const menuId = results.insertId;

    createMenuDetail(menuId, menuDetail);
};

const readMenu = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT * FROM menu ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateMenu = async (menuDate, menuDetail, id) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE menu SET menuDate = ?, createdDate = ? WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [menuDate, new Date(), id]);

    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const deleteMenuDetailSQL = 'DELETE FROM menu_detail WHERE menuId = ?';

    // Thực hiện câu lệnh SQL
    await db.query(deleteMenuDetailSQL, [id]);

    createMenuDetail(id, menuDetail);
};

const deleteMenu = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = `DELETE FROM menu WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = { createMenu, readMenu, updateMenu, deleteMenu };
