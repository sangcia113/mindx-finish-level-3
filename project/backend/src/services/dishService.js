const db = require('../configs/databaseConfig');

const createDishDetail = async (id, dishDetail) => {
    // Tạo một mảng chứa các giá trị để chèn vào bảng 'dish_detail'
    const detailValues = dishDetail.flatMap(detail => [
        [id, detail.ingredientId, detail.standard, new Date()],
    ]);

    // Câu lệnh SQL để chèn dữ liệu vào bảng 'menu_detail'
    const sql = `INSERT INTO dish_detail (dishId, ingredientId, standard, createdDate) VALUES ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [detailValues]);
};

const createDish = async (name, dishTypeId, dishDetail) => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO dish (name, dishTypeId, createdDate) VALUES (?, ?, ?)`;

    // Thực hiện câu lệnh SQL
    const [results] = await db.query(sql, [name, dishTypeId, new Date()]);

    // Lấy ID của bản ghi dish mới được chèn
    const dishId = results.insertId;

    createDishDetail(dishId, dishDetail);
};

const readDish = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT * FROM dish ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateDish = async (name, dishTypeId, dishDetail, id) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE dish SET name = ?, dishTypeId = ?, createdDate = ? WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [name, dishTypeId, new Date(), id]);

    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const deleteDishDetailSQL = 'DELETE FROM dish_detail WHERE dishId = ?';

    // Thực hiện câu lệnh SQL
    await db.query(deleteDishDetailSQL, [id]);

    createDishDetail(id, dishDetail);
};

const deleteDish = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = `DELETE FROM dish WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = { createDish, readDish, updateDish, deleteDish };
