const db = require('../config/databaseConfig');

const createStaff = async (
    code,
    name,
    birthday,
    gender,
    numberPhone,
    pass,
    roleId,
    departmentId
) => {
    // Câu lệnh SQL để chèn dữ liệu vào bảng
    const sql = `INSERT INTO 
                    staff (code, name, birthday, gender, numberPhone, pass, roleId, departmentId, createdDate) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
};

const readStaff = async () => {
    // Câu lệnh SQL để truy vấn dữ liệu từ bảng
    const sql = `SELECT * FROM staff ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và lưu kết quả vào biến 'results'
    const [results] = await db.query(sql);

    // Trả về kết quả của truy vấn SQL
    return results;
};

const updateStaff = async (
    code,
    name,
    birthday,
    gender,
    numberPhone,
    pass,
    roleId,
    departmentId,
    id
) => {
    // Câu lệnh SQL để cập nhật dữ liệu vào bảng
    const sql = `UPDATE 
                    staff 
                SET 
                    code = ?, 
                    name = ?, 
                    birthday = ?, 
                    gender = ?, 
                    numberPhone = ?, 
                    pass = ?, 
                    roleId = ?, 
                    departmentId = ?, 
                    createdDate = ? 
                WHERE 
                    id = ?`;

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
};

const deleteStaff = async id => {
    // Câu lệnh SQL để xoá dữ liệu từ bảng
    const sql = `DELETE FROM staff WHERE id = ?`;

    // Thực hiện câu lệnh SQL
    await db.query(sql, [id]);
};

module.exports = { createStaff, readStaff, updateStaff, deleteStaff };
