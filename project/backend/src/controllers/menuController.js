const menuService = require('../services/menuService');

// const calculatorMenuDetailHandler = async (req, res, next) => {
//     // Lấy dữ liệu từ phần thân của yêu cầu
//     const { menuDetail } = req.body;

//     // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
//     if (!menuDetail) {
//         // Nếu không, trả về lỗi 400 và thông báo lỗi
//         return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
//     }

//     try {
//         // // Lưu kết quả vào biến 'results'
//         // const results = await menuService.calculatorMenuDetail(menuDetail);

//         // // Gửi kết quả truy vấn dưới dạng JSON
//         // res.json(results);

//         console.log(menuDetail);
//         next();
//     } catch (err) {
//         // Ghi log lỗi
//         console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

//         // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
//         res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
//     }
// };

const createMenuHandler = async (req, res) => {
    // Lấy dữ liệu từ phần thân của yêu cầu
    const { menuDate, menuDetail } = req.body;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!(menuDate || menuDetail)) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Thực hiện câu lệnh SQL
        await menuService.createMenu(menuDate, menuDetail);

        // Trả về thông báo thành công
        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

const readMenuHandler = async (req, res) => {
    try {
        // Lưu kết quả vào biến 'results'
        const results = await menuService.readMenu();

        // Gửi kết quả truy vấn dưới dạng JSON
        res.json(results);
    } catch (err) {
        // Nếu có lỗi xảy ra trong quá trình truy vấn, in lỗi ra console
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Gửi thông báo lỗi dưới dạng JSON với mã trạng thái 500
        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

const updateMenuHandler = async (req, res) => {
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
        // Thực hiện câu lệnh SQL
        await menuService.updateMenu(menuDate, menuDetail, id);

        // Trả về thông báo thành công
        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

const deleteMenuHandler = async (req, res) => {
    // Lấy id cần truy vấn từ params
    const { id } = req.params;

    // Kiểm tra xem liệu dữ liệu đã được cung cấp hay chưa
    if (!id) {
        // Nếu không, trả về lỗi 400 và thông báo lỗi
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Thực hiện câu lệnh SQL
        await menuService.deleteMenu(id);

        // Trả về thông báo thành công
        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        // Ghi log lỗi
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        // Trả về lỗi 500 và thông báo lỗi
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

module.exports = {
    createMenuHandler,
    readMenuHandler,
    updateMenuHandler,
    deleteMenuHandler,
};
