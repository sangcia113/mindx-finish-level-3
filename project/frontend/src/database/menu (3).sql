-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 24, 2023 lúc 06:18 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `menu`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account_type`
--

CREATE TABLE `account_type` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `account_type`
--

INSERT INTO `account_type` (`id`, `name`, `createdDate`) VALUES
(1, 'Administrator', '2023-10-20 11:51:57'),
(2, 'Manager', '2023-10-23 10:27:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `department`
--

INSERT INTO `department` (`id`, `name`, `createdDate`) VALUES
(1, 'OFFICE', '2023-10-20 11:25:29'),
(2, 'SHIROZAKE', '2023-10-20 11:25:39'),
(3, 'BOTTLING', '2023-10-20 11:25:47');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dish`
--

CREATE TABLE `dish` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `dishTypeId` int(11) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dish`
--

INSERT INTO `dish` (`id`, `name`, `dishTypeId`, `createdDate`) VALUES
(1, 'Cá Basa kho', 1, '2023-10-23 08:15:20'),
(2, 'Khổ qua xào', 2, '2023-10-23 08:15:42'),
(3, 'Canh rau má', 3, '2023-10-23 08:16:06'),
(4, 'Dưa hấu', 6, '2023-10-23 08:16:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dish_detail`
--

CREATE TABLE `dish_detail` (
  `id` int(11) NOT NULL,
  `dishId` int(11) NOT NULL,
  `ingredientId` int(11) NOT NULL,
  `standard` float NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dish_detail`
--

INSERT INTO `dish_detail` (`id`, `dishId`, `ingredientId`, `standard`, `createdDate`) VALUES
(1, 1, 2, 0.4, '2023-10-23 08:32:04'),
(2, 1, 3, 50, '2023-10-23 08:34:32'),
(3, 4, 4, 0.2, '2023-10-23 08:38:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dish_type`
--

CREATE TABLE `dish_type` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dish_type`
--

INSERT INTO `dish_type` (`id`, `name`, `createdDate`) VALUES
(1, 'Món mặn', '2023-10-23 08:12:22'),
(2, 'Món xào', '2023-10-23 08:12:34'),
(3, 'Món canh', '2023-10-23 08:12:48'),
(4, 'Món trứng', '2023-10-23 08:13:00'),
(5, 'Món chay', '2023-10-23 08:13:13'),
(6, 'Món tráng miệng', '2023-10-23 08:13:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `ingredientTypeId` int(11) NOT NULL,
  `unitId` int(11) NOT NULL,
  `minStock` float NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`, `ingredientTypeId`, `unitId`, `minStock`, `createdDate`) VALUES
(1, 'Collet heo', 2, 2, 10, '2023-10-23 08:10:12'),
(2, 'Cá Basa tươi', 2, 2, 10, '2023-10-23 08:11:06'),
(3, 'Tỏi phi', 3, 3, 500, '2023-10-23 08:11:37'),
(4, 'Dưa hấu nguyên trái', 1, 2, 5, '2023-10-23 08:35:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ingredient_detail`
--

CREATE TABLE `ingredient_detail` (
  `id` int(11) NOT NULL,
  `ingredientId` int(11) NOT NULL,
  `supplierId` int(11) NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ingredient_detail`
--

INSERT INTO `ingredient_detail` (`id`, `ingredientId`, `supplierId`, `quantity`, `price`, `createdDate`) VALUES
(1, 1, 1, 20, 200000, '2023-10-24 14:28:04'),
(2, 2, 2, 12, 60000, '2023-10-24 14:50:02'),
(3, 3, 3, 1000, 200, '2023-10-24 14:51:05'),
(5, 4, 2, 10, 12000, '2023-10-24 21:24:26'),
(10, 1, 1, 10, 1000, '2023-10-24 21:38:08'),
(11, 3, 3, 12, 11000, '2023-10-24 21:38:26'),
(12, 1, 3, 23, 52000, '2023-10-24 21:38:51'),
(13, 1, 1, 10, 1000, '2023-10-24 21:41:26'),
(14, 2, 3, 11, 22000, '2023-10-24 21:43:58');

--
-- Bẫy `ingredient_detail`
--
DELIMITER $$
CREATE TRIGGER `after_ingredient_detail_insert` AFTER INSERT ON `ingredient_detail` FOR EACH ROW BEGIN
    INSERT INTO `stock` (`ingredientDetailId`, `importQuantity`, `exportQuantity`, `createdDate`) VALUES (NEW.id, NEW.quantity, 0, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ingredient_type`
--

CREATE TABLE `ingredient_type` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ingredient_type`
--

INSERT INTO `ingredient_type` (`id`, `name`, `createdDate`) VALUES
(1, '(Xơ) Rau, Củ, Quả...', '2023-10-20 16:16:44'),
(2, '(Protein) Thịt, Cá, Trứng...', '2023-10-20 16:17:02'),
(3, '(Gia vị) Bột, Đường, Tiêu, Tỏi, Ớt...', '2023-10-20 16:17:17'),
(4, '(Khác) Gas, Điện, Nước...', '2023-10-20 16:17:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `menu`
--

INSERT INTO `menu` (`id`, `name`, `createdDate`) VALUES
(1, 'Tuần 40', '2023-10-23 09:28:15');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `menu_detail`
--

CREATE TABLE `menu_detail` (
  `id` int(11) NOT NULL,
  `menuId` int(11) NOT NULL,
  `dishId` int(11) NOT NULL,
  `servingSize` int(11) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `menu_detail`
--

INSERT INTO `menu_detail` (`id`, `menuId`, `dishId`, `servingSize`, `createdDate`) VALUES
(1, 1, 1, 60, '2023-10-23 11:54:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(500) NOT NULL,
  `birthday` date NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `numberPhone` varchar(10) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `accountType` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `staff`
--

INSERT INTO `staff` (`id`, `code`, `name`, `birthday`, `gender`, `numberPhone`, `pass`, `accountType`, `departmentId`, `createdDate`) VALUES
(1, 'BOD001', 'KIYOMICHI IWATA', '1948-12-02', 1, '908038920', '0', 2, 1, '2023-10-23 10:27:50'),
(2, 'BOD004', 'TORU NODA', '1965-09-20', 1, '707196550', '0', 2, 1, '2023-10-23 10:27:50'),
(3, 'WFC001', 'NGUYỄN THỊ BẠCH LAN', '1971-07-28', 0, '903911226', '0', 2, 3, '2023-10-23 10:27:50'),
(4, 'WFC002', 'NGUYỄN CẢNH NGỌC', '1966-08-03', 1, '909367957', '0', 2, 3, '2023-10-23 10:27:50'),
(5, 'WFC003', 'NGUYỄN PHAN TẤN TRỰC', '1969-12-18', 1, '', '0', 2, 2, '2023-10-23 10:27:50'),
(6, 'WFC004', 'NGUYỄN THỊ MAI', '1967-05-31', 0, '913910260', '0', 2, 1, '2023-10-23 10:27:50'),
(7, 'WFC005', 'NGUYỄN TUẤN ANH', '1978-09-30', 1, '908545460', '0', 2, 1, '2023-10-23 10:27:50'),
(8, 'WFC006', 'NGUYỄN QUỐC HÙNG', '1966-03-07', 1, '975960311', '0', 2, 2, '2023-10-23 10:27:50'),
(9, 'WFC007', 'PHẠM THỊ KIM HUẾ', '1970-01-03', 0, '908037740', '0', 2, 1, '2023-10-23 10:27:50'),
(10, 'WFC009', 'PHẠM VĂN RẠNG', '1970-09-27', 1, '904895606', '0', 2, 1, '2023-10-23 10:27:50'),
(11, 'WFC010', 'TRẦN THỊ TUYẾT DUNG', '1975-11-18', 0, '932686790', '0', 2, 1, '2023-10-23 10:27:50'),
(12, 'WFC012', 'BÙI QUỐC TUẤN', '1978-05-04', 1, '903888919', '0', 2, 3, '2023-10-23 10:27:50'),
(13, 'WFC013', 'KHUẤT THỊ THÀNH', '1958-10-07', 0, '938758937', '0', 2, 1, '2023-10-23 10:27:50'),
(14, 'WFC014', 'TRẦN ĐĂNG NHƯ Ý', '1981-05-24', 0, '908362212', '0', 2, 1, '2023-10-23 10:27:50'),
(15, 'WFC015', 'NGUYỄN THỊ KIM LOAN', '1984-03-19', 0, '902666927', '0', 2, 3, '2023-10-23 10:27:50'),
(16, 'WFC017', 'NGUYỄN THÀNH TRỌNG', '1989-05-02', 1, '395232565', '0', 2, 2, '2023-10-23 10:27:50'),
(17, 'WFC018', 'LÊ NGỌC TRƯỜNG', '1976-05-23', 1, '935211875', '0', 2, 3, '2023-10-23 10:27:50'),
(18, 'WFC019', 'PHẠM NGUYỄN TUẤN ANH', '1972-12-10', 1, '363478774', '0', 2, 2, '2023-10-23 10:27:50'),
(19, 'WFC020', 'HUỲNH THỊ ĐÀO', '1985-09-16', 0, '766958297', '0', 2, 3, '2023-10-23 10:27:50'),
(20, 'WFC021', 'NGUYỄN MINH HÀ', '1985-06-08', 1, '989618106', '0', 2, 1, '2023-10-23 10:27:50'),
(21, 'WFC023', 'LÊ VĂN TRUYỀN', '1983-06-02', 1, '906278916', '0', 2, 1, '2023-10-23 10:27:50'),
(22, 'WFC024', 'TRƯƠNG THANH LONG', '1979-05-20', 1, '909295282', '0', 2, 1, '2023-10-23 10:27:50'),
(23, 'WFC025', 'ĐẶNG THỊ MỸ DUYÊN', '1988-08-04', 0, '777708614', '0', 2, 1, '2023-10-23 10:27:50'),
(24, 'WFC026', 'MA DOÃN HOAN', '1990-02-24', 1, '984874712', '0', 2, 3, '2023-10-23 10:27:50'),
(25, 'WFC027', 'LÊ THỊ PHÔ', '1987-03-02', 0, '976064039', '0', 2, 1, '2023-10-23 10:27:50'),
(26, 'WFC028', 'LÂM HOÀNG VINH', '1989-09-14', 1, '903722884', '0', 2, 1, '2023-10-23 10:27:50'),
(27, 'WFC029', 'LỀU THỊ HẠNH', '1969-04-08', 0, '938792550', '0', 2, 1, '2023-10-23 10:27:50'),
(28, 'WFC030', 'PHẠM QUỐC GƯƠNG', '1983-01-01', 1, '934092019', '0', 2, 2, '2023-10-23 10:27:50'),
(29, 'WFC031', 'LÊ TUẤN SỰ', '1983-02-17', 1, '385976344', '0', 2, 3, '2023-10-23 10:27:50'),
(30, 'WFC032', 'NGUYỄN THÀNH CÔNG', '1990-04-30', 1, '394389387', '0', 2, 3, '2023-10-23 10:27:50'),
(31, 'WFC033', 'NGUYỄN QUỐC THỊNH', '1983-10-15', 1, '355128595', '0', 2, 3, '2023-10-23 10:27:50'),
(32, 'WFC035', 'NGUYỄN QUỐC VINH', '1984-01-01', 1, '907910499', '0', 2, 2, '2023-10-23 10:27:50'),
(33, 'WFC055', 'NGUYỄN THỊ THANH THÚY', '1969-05-05', 0, '908479347', '0', 2, 1, '2023-10-23 10:27:50'),
(34, 'WFC058', 'VĂN THỊ NGỌC', '1987-06-06', 0, '988772106', '0', 2, 1, '2023-10-23 10:27:50'),
(35, 'WFC067', 'VÕ THANH HÙNG', '1966-01-04', 1, '903142724', '0', 2, 1, '2023-10-23 10:27:50'),
(36, 'WFC068', 'NGUYỄN THỊ THANH MAI', '1975-05-28', 0, '784335855', '0', 2, 1, '2023-10-23 10:27:50'),
(37, 'WFC069', 'ĐÀO THỊ THỦY NGÂN', '1977-11-26', 0, '855732098', '0', 2, 3, '2023-10-23 10:27:50'),
(38, 'WFC077', 'NGUYỄN PHAN HUYỀN TRANG', '1994-01-29', 0, '986594653', '0', 2, 1, '2023-10-23 10:27:50'),
(39, 'WFC078', 'ĐINH THỊ HUỲNH ANH', '1988-04-28', 0, '938702814', '0', 2, 1, '2023-10-23 10:27:50'),
(40, 'WFC086', 'NGUYỄN THỊ DIỆU HẰNG', '1998-12-07', 0, '768755117', '0', 2, 2, '2023-10-23 10:27:50'),
(41, 'WFC090', 'PHẠM THANH SANG', '1995-05-19', 1, '972868740', '0', 1, 1, '2023-10-23 10:27:50'),
(42, 'WFC095', 'ĐOÀN VĂN THIỆU', '1997-06-15', 1, '972509961', '0', 2, 1, '2023-10-23 10:27:50'),
(43, 'WFC097', 'MAI ĐÌNH CHINH', '1987-02-22', 1, '906800276', '0', 2, 1, '2023-10-23 10:27:50'),
(44, 'WFC099', 'VÕ NGỌC THƠ', '1993-11-13', 1, '794560387', '0', 2, 2, '2023-10-23 10:27:50'),
(45, 'WFC105', 'BÙI MINH MẪN', '1987-07-07', 1, '369904365', '0', 2, 2, '2023-10-23 10:27:50'),
(46, 'WFC106', 'TRƯƠNG HỮU LỢI', '1999-02-08', 1, '985947422', '0', 2, 3, '2023-10-23 10:27:50'),
(47, 'WFC107', 'NGUYỄN HỒNG NHUNG', '1992-03-16', 0, '933774909', '0', 2, 1, '2023-10-23 10:27:50'),
(48, 'WFC108', 'PHAN THANH DỢN', '1989-10-25', 1, '388655038', '0', 2, 3, '2023-10-23 10:27:50'),
(49, 'WFC110', 'NGUYỄN THỊ TUYẾT LINH', '1988-09-26', 0, '785950020', '0', 2, 3, '2023-10-23 10:27:50'),
(50, 'WFC111', 'PHAN THỊ HỒNG MAI', '1999-09-16', 0, '352355877', '0', 2, 1, '2023-10-23 10:27:50'),
(51, 'WFC114', 'NGUYỄN THỊ KIM PHƯỢNG', '1999-07-12', 0, '857574408', '0', 2, 1, '2023-10-23 10:27:50'),
(52, 'WFC115', 'NGUYỄN TRẦN THANH THIÊN', '1998-06-20', 1, '934794422', '0', 2, 1, '2023-10-23 10:27:50'),
(53, 'WFC118', 'LÊ THỊ CẨM NHUNG', '2004-09-03', 0, '769614631', '0', 2, 3, '2023-10-23 10:27:50'),
(54, 'WFC119', 'ĐỖ THỊ THANH TÂM', '1999-03-21', 0, '978394546', '0', 2, 1, '2023-10-23 10:27:50'),
(55, 'WFC121', 'LÊ THỊ CẨM GIANG', '1992-10-29', 0, '389619730', '0', 2, 1, '2023-10-23 10:27:50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `staff_dish`
--

CREATE TABLE `staff_dish` (
  `id` int(11) NOT NULL,
  `staffId` int(11) NOT NULL,
  `menuDetailId` int(11) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `ingredientDetailId` int(11) NOT NULL,
  `importQuantity` float NOT NULL,
  `exportQuantity` float NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `stock`
--

INSERT INTO `stock` (`id`, `ingredientDetailId`, `importQuantity`, `exportQuantity`, `createdDate`) VALUES
(6, 14, 11, 0, '2023-10-24 21:43:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `numberPhone` varchar(10) NOT NULL,
  `address` varchar(500) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `numberPhone`, `address`, `createdDate`) VALUES
(1, 'Satra Foods', '972868740', '157-157a Bùi Văn Ba, Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam', '2023-10-20 15:29:37'),
(2, 'Big C Quận 7', '972868740', 'Lô A, Khu Dân Cư Cityland, 99 Nguyễn Thị Thập, Quận 7, Thành phố Hồ Chí Minh, Việt Nam', '2023-10-24 13:54:59'),
(3, 'San Hà', '972868740', 'Phường 12, Quận 4, Thành phố Hồ Chí Minh, Việt Nam', '2023-10-24 13:55:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `unit`
--

INSERT INTO `unit` (`id`, `name`, `createdDate`) VALUES
(1, 'Lít', '2023-10-16 08:14:07'),
(2, 'Kilogram', '2023-10-16 08:15:09'),
(3, 'Gram', '2023-10-16 09:12:38');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account_type`
--
ALTER TABLE `account_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `dish`
--
ALTER TABLE `dish`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `dish_detail`
--
ALTER TABLE `dish_detail`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `dish_type`
--
ALTER TABLE `dish_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `ingredient_detail`
--
ALTER TABLE `ingredient_detail`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `ingredient_type`
--
ALTER TABLE `ingredient_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `menu_detail`
--
ALTER TABLE `menu_detail`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `staff_dish`
--
ALTER TABLE `staff_dish`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account_type`
--
ALTER TABLE `account_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `dish`
--
ALTER TABLE `dish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `dish_detail`
--
ALTER TABLE `dish_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `dish_type`
--
ALTER TABLE `dish_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `ingredient_detail`
--
ALTER TABLE `ingredient_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `ingredient_type`
--
ALTER TABLE `ingredient_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `menu_detail`
--
ALTER TABLE `menu_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `staff_dish`
--
ALTER TABLE `staff_dish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
