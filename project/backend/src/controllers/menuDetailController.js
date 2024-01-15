const menuDetailService = require('../services/menuDetailService');

const readMenuDetailHandler = async (req, res) => {
    try {
        // Lấy id cần truy vấn từ params
        const { id } = req.params;

        // Lưu kết quả vào biến 'results'
        const results = await menuDetailService.readMenuDetail(id);

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

module.exports = { readMenuDetailHandler };
