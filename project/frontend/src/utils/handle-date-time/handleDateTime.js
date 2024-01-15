export class handleDateTime {
    // Hàm convertDate được sử dụng để chuyển đổi một chuỗi ngày thành định dạng cụ thể
    convertDate = dateString => {
        // Chuyển đổi chuỗi ngày sang đối tượng Date
        const date = new Date(dateString);

        // Trích xuất thông tin về năm, tháng và ngày
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 phía trước nếu cần
        const day = date.getDate().toString().padStart(2, '0');

        // Tạo chuỗi ngày mới theo định dạng yyyy-mm-dd
        const formattedDate = `${year}-${month}-${day}`;

        // Trả về chuỗi ngày đã được định dạng
        return formattedDate;
    };

    convertDateTime = dateTimeString => {
        // Chuyển đổi chuỗi ngày tháng sang đối tượng Date
        const dateTime = new Date(dateTimeString);

        // Trích xuất thông tin về năm, tháng và ngày
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 phía trước nếu cần
        const day = dateTime.getDate().toString().padStart(2, '0');
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const seconds = dateTime.getSeconds().toString().padStart(2, '0');

        // Tạo chuỗi ngày mới theo định dạng yyyy-mm-dd hh:mm:ss
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        // Trả về chuỗi ngày đã được định dạng
        return formattedDateTime;
    };
}
