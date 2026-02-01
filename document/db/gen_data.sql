INSERT INTO bac_luong (ten_bac_luong, muc_luong_co_ban) VALUES
('Bậc 1 ', 8000000),
('Bậc 2', 12000000),
('Bậc 3', 18000000);

INSERT INTO phong_ban (ten_phong_ban, ngay_thanh_lap, loai_phong) VALUES
('Phòng Quản Lý Dự Án', '2020-01-01', 'QuanLy'),
('Phòng Kỹ Thuật', '2020-01-01', 'ChuyenMon'),
('Phòng Hành Chính', '2020-01-01', 'HoTro');

INSERT INTO nhan_vien VALUES
('PB001-0001', 'Nguyễn Văn An',        '1985-05-10', 'Nam', true),
('PB001-0002', 'Trần Thị Bình',        '1990-08-20', 'Nữ',  true),
('PB001-0003', 'Phạm Quốc Cường',      '1992-03-14', 'Nam', true),
('PB001-0004', 'Lê Thị Diễm',          '1994-01-09', 'Nữ',  true),
('PB001-0005', 'Hoàng Minh Đức',       '1991-12-22', 'Nam', true),
('PB001-0006', 'Võ Quốc Huy',          '1993-06-17', 'Nam', true),
('PB001-0007', 'Đặng Thị Lan',         '1995-09-30', 'Nữ',  true),
('PB001-0008', 'Bùi Văn Long',          '1989-04-11', 'Nam', true),
('PB001-0009', 'Nguyễn Thị Mai',       '1996-02-25', 'Nữ',  true),
('PB001-0010', 'Trần Quốc Nam',        '1990-07-08', 'Nam', true),
('PB001-0011', 'Lý Hoàng Phúc',         '1992-11-19', 'Nam', true),
('PB001-0012', 'Phan Thị Quỳnh',        '1994-08-03', 'Nữ',  true),
('PB001-0013', 'Ngô Minh Quân',         '1993-10-14', 'Nam', true),
('PB001-0014', 'Huỳnh Thị Thanh',       '1997-05-27', 'Nữ',  true),
('PB001-0015', 'Đỗ Văn Tùng',           '1988-01-16', 'Nam', true),

('PB002-0001', 'Lê Văn Dũng',           '1993-01-22', 'Nam', true),
('PB002-0002', 'Hoàng Thị Hạnh',        '1996-09-05', 'Nữ',  true),
('PB002-0003', 'Nguyễn Minh Khôi',      '1995-12-11', 'Nam', true),

('PB003-0001', 'Đặng Thị Ngọc',         '1991-06-02', 'Nữ',  true),
('PB003-0002', 'Bùi Văn Phúc',          '1988-10-25', 'Nam', true);

INSERT INTO chuc_vu VALUES
('PB001-0001', 'PB001', 'TruongPhong', '2024-01-01'),
('PB001-0002', 'PB001', 'PhoPhong',    '2024-01-01'),
('PB001-0003', 'PB001', 'PhoPhong',    '2024-01-01'),
('PB001-0004', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0005', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0006', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0007', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0008', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0009', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0010', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0011', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0012', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0013', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0014', 'PB001', 'NhanVien',   '2024-01-01'),
('PB001-0015', 'PB001', 'NhanVien',   '2024-01-01'),

('PB002-0001', 'PB002', 'TruongPhong', '2024-01-01'),
('PB002-0002', 'PB002', 'PhoPhong',    '2024-01-01'),
('PB002-0003', 'PB002', 'NhanVien',    '2024-01-01'),

('PB003-0001', 'PB003', 'TruongPhong', '2024-01-01'),
('PB003-0002', 'PB003', 'NhanVien',    '2024-01-01');

INSERT INTO xep_bac_luong (ma_bac_luong, ma_nhan_vien, ngay_ap_dung) VALUES
(3, 'PB001-0001', '2024-01-01'), -- Trưởng phòng
(2, 'PB001-0002', '2024-01-01'), -- Phó phòng
(2, 'PB001-0003', '2024-01-01'), -- Phó phòng
(2, 'PB001-0004', '2024-01-01'),
(2, 'PB001-0005', '2024-01-01'),
(1, 'PB001-0006', '2024-01-01'),
(1, 'PB001-0007', '2024-01-01'),
(1, 'PB001-0008', '2024-01-01'),
(1, 'PB001-0009', '2024-01-01'),
(1, 'PB001-0010', '2024-01-01'),
(1, 'PB001-0011', '2024-01-01'),
(1, 'PB001-0012', '2024-01-01'),
(1, 'PB001-0013', '2024-01-01'),
(1, 'PB001-0014', '2024-01-01'),
(1, 'PB001-0015', '2024-01-01'),

(3, 'PB002-0001', '2024-01-01'), -- Trưởng phòng
(2, 'PB002-0002', '2024-01-01'), -- Phó phòng
(1, 'PB002-0003', '2024-01-01'),

(2, 'PB003-0001', '2024-01-01'), -- Trưởng phòng
(1, 'PB003-0002', '2024-01-01');

INSERT INTO loai_du_an (ten_loai_du_an, so_nhan_vien_toi_da, mo_ta) VALUES
('Phần mềm nội bộ', 20, 'Phát triển phần mềm phục vụ nội bộ doanh nghiệp'),
('Triển khai hệ thống', 20, 'Triển khai hệ thống CNTT cho khách hàng'),
('Nghiên cứu & phát triển', 10, 'Dự án R&D, thử nghiệm công nghệ mới');

INSERT INTO du_an
(ten_du_an, ngay_bat_dau, ngay_ket_thuc_du_kien, ngay_ket_thuc_thuc_te,
 trang_thai, ma_loai_du_an, ma_phong_quan_ly, luong_trach_nhiem)
VALUES
('Hệ thống quản lý nhân sự',
 '2025-01-01', '2025-03-31', NULL,
 'DangThucHien', 1, 'PB001', 3000000),

('Triển khai ERP doanh nghiệp',
 '2025-02-01', '2025-05-31', NULL,
 'DangThucHien', 2, 'PB001', 5000000),

('Nghiên cứu ứng dụng AI',
 '2025-01-15', '2025-04-15', NULL,
 'DangThucHien', 3, 'PB001', 4000000);

INSERT INTO tham_gia_du_an VALUES
-- Dự án 1
('PB001-0001', 1, 1, 2025, 'ChuTri'),
('PB001-0002', 1, 1, 2025, 'ThanhVien'),
('PB001-0003', 1, 1, 2025, 'ThanhVien'),
('PB001-0004', 1, 1, 2025, 'ThanhVien'),
('PB001-0005', 1, 1, 2025, 'ThanhVien'),
('PB001-0005', 1, 2, 2025, 'ThanhVien'),
('PB001-0006', 1, 2, 2025, 'ThanhVien'),
('PB001-0007', 1, 2, 2025, 'ThanhVien'),
-- Dự án 3
('PB001-0006', 3, 1, 2025, 'ChuTri'),
('PB001-0007', 3, 1, 2025, 'ThanhVien'),
('PB001-0008', 3, 1, 2025, 'ThanhVien'),
('PB001-0009', 3, 1, 2025, 'ThanhVien');

INSERT INTO tham_gia_du_an VALUES
-- Dự án 1
('PB001-0001', 1, 2, 2025, 'ChuTri'),
('PB001-0010', 1, 2, 2025, 'ThanhVien'),
('PB001-0011', 1, 2, 2025, 'ThanhVien'),

-- Dự án 2
('PB001-0002', 2, 2, 2025, 'ChuTri'),
('PB001-0012', 2, 2, 2025, 'ThanhVien'),
('PB001-0013', 2, 2, 2025, 'ThanhVien'),
('PB001-0014', 2, 2, 2025, 'ThanhVien'),
('PB001-0015', 2, 2, 2025, 'ThanhVien');

INSERT INTO cong_doan VALUES
(1, 1, 'Phân tích yêu cầu', 1,
 '2025-01-01', '2025-01-10', '2025-01-12',
 'TOT', 'DaThucHien'),

(2, 1, 'Thiết kế hệ thống', 2,
 '2025-01-13', '2025-01-25', '2025-01-25',
 'TOT', 'DaThucHien'),

(3, 1, 'Lập trình & kiểm thử', 3,
 '2025-02-01', '2025-02-28', NULL,
 NULL, 'DangThucHien');
INSERT INTO cong_doan VALUES
(1, 2, 'Khảo sát nghiệp vụ', 1,
 '2025-02-01', '2025-02-07', '2025-02-07',
 'TOT', 'DaThucHien'),

(2, 2, 'Triển khai hệ thống', 2,
 '2025-02-08', '2025-03-31', NULL,
 NULL, 'DangThucHien');

INSERT INTO thuc_hien_cong_doan VALUES
-- Dự án 1
(1, 1, 'PB001-0001', 'ChuTri'),
(1, 1, 'PB001-0002', 'ThanhVien'),
(1, 1, 'PB001-0003', 'ThanhVien'),

(2, 1, 'PB001-0002', 'ChuTri'),
(2, 1, 'PB001-0004', 'ThanhVien'),

(3, 1, 'PB001-0005', 'ChuTri'),
(3, 1, 'PB001-0006', 'ThanhVien'),
(3, 1, 'PB001-0007', 'ThanhVien'),

-- Dự án 2
(1, 2, 'PB001-0002', 'ChuTri'),
(1, 2, 'PB001-0012', 'ThanhVien'),

(2, 2, 'PB001-0013', 'ChuTri'),
(2, 2, 'PB001-0014', 'ThanhVien'),
(2, 2, 'PB001-0015', 'ThanhVien');

INSERT INTO loai_cong_viec
(ten_loai_cong_viec, muc_luong_nang_suat)
VALUES
('Công việc hành chính', 500000),
('Công việc hỗ trợ dự án', 1000000),
('Công việc chuyên môn', 1500000),
('Công việc quản lý dự án', 2000000);

INSERT INTO cong_viec
(ten_cong_viec, ma_loai_cv, ngay_bat_dau,
 ngay_hoan_thanh_du_kien, ngay_hoan_thanh_thuc_te,
 ket_qua, trang_thai_tien_do)
VALUES
('Lập báo cáo tiến độ tháng 01/2025', 1,
 '2025-01-01', '2025-01-31', '2025-01-31',
 'TOT', 'DaThucHien'),

('Soạn thảo biên bản họp dự án', 1,
 '2025-02-01', '2025-02-10', '2025-02-12',
 'KEM', 'DaThucHien');
INSERT INTO cong_viec
(ten_cong_viec, ma_loai_cv, ngay_bat_dau,
 ngay_hoan_thanh_du_kien, ngay_hoan_thanh_thuc_te,
 ket_qua, trang_thai_tien_do)
VALUES
('Tổng hợp tài liệu dự án A', 2,
 '2025-01-05', '2025-01-20', '2025-01-20',
 'TOT', 'DaThucHien'),

('Hỗ trợ theo dõi tiến độ công đoạn dự án B', 2,
 '2025-02-01', '2025-02-25', NULL,
 NULL, 'DangThucHien');
INSERT INTO cong_viec
(ten_cong_viec, ma_loai_cv, ngay_bat_dau,
 ngay_hoan_thanh_du_kien, ngay_hoan_thanh_thuc_te,
 ket_qua, trang_thai_tien_do)
VALUES
('Phân tích yêu cầu nghiệp vụ dự án A', 3,
 '2025-01-03', '2025-01-15', '2025-01-14',
 'TOT', 'DaThucHien'),

('Đánh giá rủi ro kỹ thuật dự án B', 3,
 '2025-02-01', '2025-02-18', '2025-02-22',
 'KEM', 'DaThucHien');
INSERT INTO cong_viec
(ten_cong_viec, ma_loai_cv, ngay_bat_dau,
 ngay_hoan_thanh_du_kien, ngay_hoan_thanh_thuc_te,
 ket_qua, trang_thai_tien_do)
VALUES
('Lập kế hoạch tổng thể dự án A', 4,
 '2025-01-01', '2025-01-07', '2025-01-07',
 'TOT', 'DaThucHien'),

('Điều phối nguồn lực dự án B', 4,
 '2025-02-01', '2025-02-28', NULL,
 NULL, 'DangThucHien');

INSERT INTO thuc_hien_cong_viec (ma_nhan_vien, ma_cong_viec) VALUES
-- Nhóm quản lý chính
('PB001-0001', 7),
('PB001-0001', 8),

('PB001-0002', 7),
('PB001-0002', 1),

('PB001-0003', 8),
('PB001-0003', 2),

-- Nhóm hỗ trợ dự án
('PB001-0004', 3),
('PB001-0004', 4),

('PB001-0005', 3),
('PB001-0006', 4),

-- Nhóm chuyên môn
('PB001-0007', 5),
('PB001-0007', 6),

('PB001-0008', 5),
('PB001-0009', 6),

-- Nhóm hành chính – báo cáo
('PB001-0010', 1),
('PB001-0011', 1),

('PB001-0012', 2),
('PB001-0013', 2),

-- Nhân viên đa nhiệm
('PB001-0014', 3),
('PB001-0014', 5),

('PB001-0015', 4),
('PB001-0015', 6);
