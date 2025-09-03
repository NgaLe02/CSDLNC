INSERT INTO NhanVien (hoTen, cmnd, soDienThoai) VALUES
('Nguyễn Văn An', '012345678901', '0901000001'),
('Trần Thị Bình',   '012345678902', '0901000002'),
('Lê Văn Công',     '012345678903', '0901000003'),
('Phạm Văn Tùng',   '012345678904', '0901000004'),
('Hoàng Văn Hiệp',  '012345678905', '0901000005'),
('Đỗ Văn Long',     '012345678906', '0901000006'),
('Bùi Văn Giang',    '012345678907', '0901000007'),
('Đặng Hữu Cường',   '012345678908', '0901000008'),
('Nguyễn Văn Tài', '012345678909', '0901000009'),
('Trần Văn Hà',   '012345678910', '0901000010'),
('Nguyễn Thị Lan',     '012345678911', '0901000011'),
('Phan Văn Dũng',      '012345678912', '0901000012'),
('Trương Thị Mai',     '012345678913', '0901000013'),
('Võ Văn Hùng',        '012345678914', '0901000014'),
('Lý Thị Hạnh',        '012345678915', '0901000015'),
('Ngô Văn Sơn',        '012345678916', '0901000016'),
('Trần Thị Ngọc',      '012345678917', '0901000017'),
('Đỗ Văn Phúc',        '012345678918', '0901000018'),
('Hoàng Thị Hòa',      '012345678919', '0901000019'),
('Bùi Văn Khoa',       '012345678920', '0901000020');

INSERT INTO HanhKhach (hoTen, cmnd, soDienThoai) VALUES
('Nguyen Van 1', '111111111111', '0912000001'),
('Nguyen Van 2', '111111111112', '0912000002'),
('Nguyen Van 3', '111111111113', '0912000003'),
('Nguyen Van 4', '111111111114', '0912000004'),
('Nguyen Van 5', '111111111115', '0912000005'),
('Nguyen Van 6', '111111111116', '0912000006'),
('Nguyen Van 7', '111111111117', '0912000007'),
('Nguyen Van 8', '111111111118', '0912000008'),
('Nguyen Van 9', '111111111119', '0912000009'),
('Nguyen Van 10','111111111120', '0912000010'),

('Tran Thi 11', '111111111121', '0912000011'),
('Tran Thi 12', '111111111122', '0912000012'),
('Tran Thi 13', '111111111123', '0912000013'),
('Tran Thi 14', '111111111124', '0912000014'),
('Tran Thi 15', '111111111125', '0912000015'),
('Tran Thi 16', '111111111126', '0912000016'),
('Tran Thi 17', '111111111127', '0912000017'),
('Tran Thi 18', '111111111128', '0912000018'),
('Tran Thi 19', '111111111129', '0912000019'),
('Tran Thi 20', '111111111130', '0912000020'),

('Le Van 21', '111111111131', '0912000021'),
('Le Van 22', '111111111132', '0912000022'),
('Le Van 23', '111111111133', '0912000023'),
('Le Van 24', '111111111134', '0912000024'),
('Le Van 25', '111111111135', '0912000025'),
('Le Van 26', '111111111136', '0912000026'),
('Le Van 27', '111111111137', '0912000027'),
('Le Van 28', '111111111138', '0912000028'),
('Le Van 29', '111111111139', '0912000029'),
('Le Van 30', '111111111140', '0912000030'),

('Pham Thi 31', '111111111141', '0912000031'),
('Pham Thi 32', '111111111142', '0912000032'),
('Pham Thi 33', '111111111143', '0912000033'),
('Pham Thi 34', '111111111144', '0912000034'),
('Pham Thi 35', '111111111145', '0912000035'),
('Pham Thi 36', '111111111146', '0912000036'),
('Pham Thi 37', '111111111147', '0912000037'),
('Pham Thi 38', '111111111148', '0912000038'),
('Pham Thi 39', '111111111149', '0912000039'),
('Pham Thi 40', '111111111150', '0912000040'),

('Hoang Van 41', '111111111151', '0912000041'),
('Hoang Van 42', '111111111152', '0912000042'),
('Hoang Van 43', '111111111153', '0912000043'),
('Hoang Van 44', '111111111154', '0912000044'),
('Hoang Van 45', '111111111155', '0912000045'),
('Hoang Van 46', '111111111156', '0912000046'),
('Hoang Van 47', '111111111157', '0912000047'),
('Hoang Van 48', '111111111158', '0912000048'),
('Hoang Van 49', '111111111159', '0912000049'),
('Hoang Van 50', '111111111160', '0912000050');

INSERT INTO LoaiXe (tenLoaiXe, soGhe) VALUES
('Ghế ngồi 29 chỗ', 29),
('Ghế ngồi 45 chỗ', 45),
('Giường nằm 34 chỗ', 34),
('Limousine 9 chỗ', 9);

INSERT INTO Xe (bienSo, tinhTrang, maLoaiXe) VALUES
('29A-12345', 'Đang hoạt động', 1),
('30B-67890', 'Đang hoạt động', 2),
('31C-11111', 'Đang hoạt động', 3),
('32D-22222', 'Đang hoạt động', 1),
('33E-33333', 'Đang hoạt động', 4),
('34F-44444', 'Đang hoạt động', 2),
('35G-55555', 'Đang hoạt động', 3),
('36H-66666', 'Đang hoạt động', 1),
('37I-77777', 'Đang hoạt động', 2),
('38K-88888', 'Đang hoạt động', 3),
('39L-99999', 'Đang hoạt động', 4),
('40M-10101', 'Đang hoạt động', 1);

INSERT INTO HanDangKiem (chiPhi, ngayDangKiem, maXe, hieuLuc) VALUES
(1500000, '2025-01-10', 'X001', 12),
(1500000, '2025-02-05', 'X002', 12),
(1600000, '2025-01-20', 'X003', 12),
(1400000, '2025-03-01', 'X004', 12),
(2000000, '2025-01-15', 'X005', 12),
(1500000, '2025-02-10', 'X006', 12),
(1600000, '2025-01-25', 'X007', 12),
(1400000, '2025-03-05', 'X008', 12),
(1500000, '2025-02-15', 'X009', 12),
(1600000, '2025-01-30', 'X010', 12),
(2000000, '2025-02-20', 'X011', 12),
(1500000, '2025-03-10', 'X012', 12);

INSERT INTO LichBaoDuong (ngayBaoDuong, chiPhi, maXe) VALUES
('2025-01-12', 3000000, 'X001'),
('2025-02-07', 3200000, 'X002'),
('2025-01-25', 3500000, 'X003'),
('2025-03-02', 2800000, 'X004'),
('2025-01-18', 4000000, 'X005'),
('2025-02-12', 3300000, 'X006'),
('2025-01-28', 3600000, 'X007'),
('2025-03-07', 3100000, 'X008'),
('2025-02-17', 2900000, 'X009'),
('2025-02-02', 3400000, 'X010'),
('2025-02-22', 3800000, 'X011'),
('2025-03-12', 3000000, 'X012');


INSERT INTO LuongTuyenDuong (doPhucTap, khoangCachTu, khoangCachDen, luongCoBan) VALUES
(1, 0,   50,  500000),
(1, 51, 150, 1000000),
(2, 151, 300, 2000000),
(2, 301, 500, 3500000),
(3, 501, 800, 5000000),
(3, 801, 1200, 7000000);

INSERT INTO TuyenDuong (diemKhoiHanh, diemDen, doPhucTap, khoangCach, thoiGianUocTinh, maLuongTuyen, heSoDuongKho) VALUES
('Hà Nội', 'Hải Phòng', 1, 120, 2, 2, 1.0),
('Hà Nội', 'Nam Định', 1, 90,  2, 2, 1.0),
('Hà Nội', 'Thanh Hóa', 2, 160, 3, 3, 1.1),
('Hà Nội', 'Nghệ An',   2, 300, 6, 3, 1.2),
('Hà Nội', 'Hà Giang',  3, 320, 7, 4, 1.5),
('Hà Nội', 'Lào Cai',   3, 280, 6, 3, 1.4),
('Hà Nội', 'Đà Nẵng',   3, 760, 15, 5, 1.3),
('Hà Nội', 'Huế',       3, 670, 13, 5, 1.2),
('Hà Nội', 'Quảng Ninh',1, 150, 3, 2, 1.0),
('Hà Nội', 'Thái Nguyên',1, 80,  2, 2, 1.0),
('Hải Phòng', 'Hà Nội', 1, 120, 2, 2, 1.0),
('Nam Định', 'Hà Nội', 1, 90,  2, 2, 1.0),
('Thanh Hóa', 'Hà Nội', 2, 160, 3, 3, 1.1),
('Nghệ An', 'Hà Nội',   2, 300, 6, 3, 1.2),
('Hà Giang', 'Hà Nội',  3, 320, 7, 4, 1.5),
('Lào Cai', 'Hà Nội',   3, 280, 6, 3, 1.4),
('Đà Nẵng', 'Hà Nội',   3, 760, 15, 5, 1.3),
('Huế', 'Hà Nội',       3, 670, 13, 5, 1.2),
('Quảng Ninh', 'Hà Nội',1, 150, 3, 2, 1.0),
('Thái Nguyên', 'Hà Nội',1, 80,  2, 2, 1.0);

INSERT INTO Mua (tenMua) VALUES
('Ngày thường'),
('Mùa du lịch'),
('Ngày lễ'),
('Ngày tết');


INSERT INTO GiaVe (giaVe, ngayBatDau, ngayKetThuc, maTuyen, maMua) VALUES
-- T001 Hà Nội - Hải Phòng
(80000,  '2025-01-01', null, 'T001', 'M1'),
(90000,  '2025-01-01', null, 'T001', 'M2'),
(100000, '2025-01-01', null, 'T001', 'M3'),
(120000, '2025-01-01', null, 'T001', 'M4'),

-- T011 Hải Phòng - Hà Nội
(80000,  '2025-01-01', null, 'T011', 'M1'),
(90000,  '2025-01-01', null, 'T011', 'M2'),
(100000, '2025-01-01', null, 'T011', 'M3'),
(120000, '2025-01-01', null, 'T011', 'M4'),

-- T002 Hà Nội - Nam Định
(70000,  '2025-01-01', null, 'T002', 'M1'),
(85000,  '2025-01-01', null, 'T002', 'M2'),
(95000,  '2025-01-01', null, 'T002', 'M3'),
(115000, '2025-01-01', null, 'T002', 'M4'),

-- T012 Nam Định - Hà Nội
(70000,  '2025-01-01', null, 'T012', 'M1'),
(85000,  '2025-01-01', null, 'T012', 'M2'),
(95000,  '2025-01-01', null, 'T012', 'M3'),
(115000, '2025-01-01', null, 'T012', 'M4'),

-- T003 Hà Nội - Thanh Hóa
(100000, '2025-01-01', null, 'T003', 'M1'),
(120000, '2025-01-01', null, 'T003', 'M2'),
(140000, '2025-01-01', null, 'T003', 'M3'),
(160000, '2025-01-01', null, 'T003', 'M4'),

-- T013 Thanh Hóa - Hà Nội
(100000, '2025-01-01', null, 'T013', 'M1'),
(120000, '2025-01-01', null, 'T013', 'M2'),
(140000, '2025-01-01', null, 'T013', 'M3'),
(160000, '2025-01-01', null, 'T013', 'M4'),

-- T004 Hà Nội - Nghệ An
(150000, '2025-01-01', null, 'T004', 'M1'),
(170000, '2025-01-01', null, 'T004', 'M2'),
(190000, '2025-01-01', null, 'T004', 'M3'),
(220000, '2025-01-01', null, 'T004', 'M4'),

-- T014  Nghệ An - Hà Nội
(150000, '2025-01-01', null, 'T014', 'M1'),
(170000, '2025-01-01', null, 'T014', 'M2'),
(190000, '2025-01-01', null, 'T014', 'M3'),
(220000, '2025-01-01', null, 'T014', 'M4'),

-- T005 Hà Nội - Hà Giang
(180000, '2025-01-01', null, 'T005', 'M1'),
(200000, '2025-01-01', null, 'T005', 'M2'),
(230000, '2025-01-01', null, 'T005', 'M3'),
(260000, '2025-01-01', null, 'T005', 'M4'),

-- T015 Hà Giang - Hà Nội
(180000, '2025-01-01', null, 'T015', 'M1'),
(200000, '2025-01-01', null, 'T015', 'M2'),
(230000, '2025-01-01', null, 'T015', 'M3'),
(260000, '2025-01-01', null, 'T015', 'M4'),

-- T006 Hà Nội - Lào Cai
(170000, '2025-01-01', null, 'T006', 'M1'),
(190000, '2025-01-01', null, 'T006', 'M2'),
(210000, '2025-01-01', null, 'T006', 'M3'),
(240000, '2025-01-01', null, 'T006', 'M4'),

-- T016 Lào Cai - Hà Nội
(170000, '2025-01-01', null, 'T016', 'M1'),
(190000, '2025-01-01', null, 'T016', 'M2'),
(210000, '2025-01-01', null, 'T016', 'M3'),
(240000, '2025-01-01', null, 'T016', 'M4'),

-- T007 Hà Nội - Đà Nẵng
(400000, '2025-01-01', null, 'T007', 'M1'),
(450000, '2025-01-01', null, 'T007', 'M2'),
(500000, '2025-01-01', null, 'T007', 'M3'),
(600000, '2025-01-01', null, 'T007', 'M4'),

-- T017 Đà Nẵng - Hà Nội
(400000, '2025-01-01', null, 'T017', 'M1'),
(450000, '2025-01-01', null, 'T017', 'M2'),
(500000, '2025-01-01', null, 'T017', 'M3'),
(600000, '2025-01-01', null, 'T017', 'M4'),

-- T008 Hà Nội - Huế
(350000, '2025-01-01', null, 'T008', 'M1'),
(400000, '2025-01-01', null, 'T008', 'M2'),
(450000, '2025-01-01', null, 'T008', 'M3'),
(550000, '2025-01-01', null, 'T008', 'M4'),

-- T018 Huế - Hà Nội
(350000, '2025-01-01', null, 'T018', 'M1'),
(400000, '2025-01-01', null, 'T018', 'M2'),
(450000, '2025-01-01', null, 'T018', 'M3'),
(550000, '2025-01-01', null, 'T018', 'M4'),

-- T009 Hà Nội - Quảng Ninh
(90000,  '2025-01-01', null, 'T009', 'M1'),
(100000, '2025-01-01', null, 'T009', 'M2'),
(120000, '2025-01-01', null, 'T009', 'M3'),
(140000, '2025-01-01', null, 'T009', 'M4'),

-- T019 Quảng Ninh - Hà Nội
(90000,  '2025-01-01', null, 'T019', 'M1'),
(100000, '2025-01-01', null, 'T019', 'M2'),
(120000, '2025-01-01', null, 'T019', 'M3'),
(140000, '2025-01-01', null, 'T019', 'M4'),

-- T010 Hà Nội - Thái Nguyên
(70000,  '2025-01-01', null, 'T010', 'M1'),
(80000,  '2025-01-01', null, 'T010', 'M2'),
(95000,  '2025-01-01', null, 'T010', 'M3'),
(110000, '2025-01-01', null, 'T010', 'M4'),

-- T020 Hà Nội - Thái Nguyên
(70000,  '2025-01-01', null, 'T020', 'M1'),
(80000,  '2025-01-01', null, 'T020', 'M2'),
(95000,  '2025-01-01', null, 'T020', 'M3'),
(110000, '2025-01-01', null, 'T020', 'M4');

DELIMITER $$

CREATE PROCEDURE taoChuyenXe()
BEGIN
    DECLARE d DATE;
    DECLARE xe INT;
    DECLARE gio INT;
    DECLARE idx INT DEFAULT 0;

    -- Bảng tạm để lưu chi phí theo tuyến
    DROP TEMPORARY TABLE IF EXISTS tmpCostMap;
    CREATE TEMPORARY TABLE tmpCostMap (
        maTuyen VARCHAR(4) PRIMARY KEY,
        chiPhi DECIMAL(12,0)
    );

    SET d = '2025-04-01';

    WHILE d <= '2025-08-31' DO
        SET gio = 6; -- chuyến đầu tiên lúc 6h sáng

        WHILE gio <= 18 DO
            -- Xe xoay vòng X001..X012
            SET xe = MOD(idx, 12) + 1;
            SET @xe = CONCAT('X', LPAD(xe, 3, '0'));

            -- Tuyến xoay vòng T001..T020
            SET @tuyen = CONCAT('T', LPAD(MOD(idx, 20) + 1, 3, '0'));

            -- Mùa: ngày lễ thì M3, còn lại M1
            IF d IN ('2025-04-29','2025-04-30','2025-05-01','2025-05-02') THEN
                SET @mua = 'M3';
            ELSE
                SET @mua = 'M1';
            END IF;

            -- Lấy chi phí từ map nếu có
            CASE
                WHEN @tuyen IN ('T001','T011') THEN
                    SET @chiPhi = 850000;
                    SET @tiLe   = 1.2;
                WHEN @tuyen IN ('T002','T012') THEN
                    SET @chiPhi = 800000;
                    SET @tiLe   = 1.2;
                WHEN @tuyen IN ('T003','T013') THEN
                    SET @chiPhi = 900000;
                    SET @tiLe   = 1.2;
                WHEN @tuyen IN ('T004','T014') THEN
                    SET @chiPhi = 1200000;
                    SET @tiLe   = 1.25;
                WHEN @tuyen IN ('T005','T015') THEN
                    SET @chiPhi = 1300000;
                    SET @tiLe   = 1.25;
                WHEN @tuyen IN ('T006','T016') THEN
                    SET @chiPhi = 900000;
                    SET @tiLe   = 1.3;
                WHEN @tuyen IN ('T007','T017') THEN
                    SET @chiPhi = 2000000;
                    SET @tiLe   = 1.35;
                WHEN @tuyen IN ('T008','T018') THEN
                    SET @chiPhi = 1500000;
                    SET @tiLe   = 1.35;
                WHEN @tuyen IN ('T009','T019') THEN
                    SET @chiPhi = 850000;
                    SET @tiLe   = 1.1;
                WHEN @tuyen IN ('T010','T020') THEN
                    SET @chiPhi = 900000;
                    SET @tiLe   = 1.1;
                ELSE
                    SET @chiPhi = 900000;
                    SET @tiLe   = 1.3;
            END CASE;

            -- Chèn chuyến xe
            INSERT INTO ChuyenXe (
                maXe, maTuyen, maChuyen, maMua, maGiaVe,
                ngayGioKhoiHanh, ngayGioDen, tinhTrangChuyen,
                chiPhiVanHanh, tiLeThuLao
            )
            VALUES (
                @xe,
                @tuyen,
                NULL,   -- để trigger sinh tự động maChuyen
                @mua,
               '001',
                CONCAT(d, ' ', LPAD(gio,2,'0'), ':00:00'),
                CONCAT(d, ' ', LPAD(gio+4,2,'0'), ':00:00'),
                'Chưa khởi hành',
                @chiPhi,
                @tiLe
            );

            SET gio = gio + 4; -- mỗi chuyến cách nhau 4 tiếng
            SET idx = idx + 1;
        END WHILE;

        SET d = DATE_ADD(d, INTERVAL 1 DAY);
    END WHILE;
END$$

DELIMITER ;

CALL taoChuyenXe();

DELIMITER $$

CREATE PROCEDURE taoPhanCong()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE maChuyen_cur varchar(5);
    DECLARE maTuyen_cur VARCHAR(4);
    DECLARE maXe_cur VARCHAR(4);

    DECLARE cur CURSOR FOR
        SELECT maChuyen, maTuyen, maXe
        FROM ChuyenXe;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO maChuyen_cur, maTuyen_cur, maXe_cur;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Gán nhân viên dựa vào tuyến
        INSERT INTO PhanCong(maChuyen, maTuyen, maXe, maNhanVien, vaiTro)
        VALUES
            (maChuyen_cur, maTuyen_cur, maXe_cur,
             CASE maTuyen_cur
                 WHEN 'T001' THEN 1
                 WHEN 'T011' THEN 1
                 WHEN 'T002' THEN 2
                 WHEN 'T012' THEN 2
                 WHEN 'T003' THEN 3
                 WHEN 'T013' THEN 3
                 WHEN 'T004' THEN 4
                 WHEN 'T014' THEN 4
                 WHEN 'T005' THEN 5
                 WHEN 'T015' THEN 5
                 WHEN 'T006' THEN 6
                 WHEN 'T016' THEN 6
                 WHEN 'T007' THEN 7
                 WHEN 'T017' THEN 7
                 WHEN 'T008' THEN 8
                 WHEN 'T018' THEN 8
                 WHEN 'T009' THEN 9
                 WHEN 'T019' THEN 9
                 WHEN 'T010' THEN 10
                 WHEN 'T020' THEN 10
                 ELSE 1 -- mặc định Lái xe
             END,
             'Lái xe');

        INSERT INTO PhanCong(maChuyen, maTuyen, maXe, maNhanVien, vaiTro)
        VALUES
            (maChuyen_cur, maTuyen_cur, maXe_cur,
             CASE maTuyen_cur
                 WHEN 'T001' THEN 11
                 WHEN 'T011' THEN 11
                 WHEN 'T002' THEN 12
                 WHEN 'T012' THEN 12
                 WHEN 'T003' THEN 13
                 WHEN 'T013' THEN 13
                 WHEN 'T004' THEN 14
                 WHEN 'T014' THEN 14
                 WHEN 'T005' THEN 15
                 WHEN 'T015' THEN 15
                 WHEN 'T006' THEN 16
                 WHEN 'T016' THEN 16
                 WHEN 'T007' THEN 17
                 WHEN 'T017' THEN 17
                 WHEN 'T008' THEN 18
                 WHEN 'T018' THEN 18
                 WHEN 'T009' THEN 19
                 WHEN 'T019' THEN 19
                 WHEN 'T010' THEN 20
                 WHEN 'T020' THEN 20
                 ELSE 11
             END,
             'Phụ xe');

    END LOOP;

    CLOSE cur;
END$$

DELIMITER ;

CALL taoPhanCong();

DELIMITER $$

CREATE PROCEDURE taoVe()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_maXe VARCHAR(4);
    DECLARE v_maTuyen VARCHAR(4);
    DECLARE v_maChuyen VARCHAR(5);
    DECLARE v_ngayGioKhoiHanh DATETIME;
    DECLARE v_soLuongHanhKhach INT;
    DECLARE seatNo INT;
    DECLARE v_maHanhKhach VARCHAR(10);

    -- Cursor lấy tất cả chuyến xe
    DECLARE curChuyenXe CURSOR FOR
        SELECT maXe, maTuyen, maChuyen, ngayGioKhoiHanh
        FROM ChuyenXe;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN curChuyenXe;

    read_loop: LOOP
        FETCH curChuyenXe INTO v_maXe, v_maTuyen, v_maChuyen, v_ngayGioKhoiHanh;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Xác định số lượng hành khách
        IF v_maXe IN ('X005','X011') THEN
            SET v_soLuongHanhKhach = 9;
        ELSE
            SET v_soLuongHanhKhach = 20;
        END IF;

        SET seatNo = 1;

        WHILE seatNo <= v_soLuongHanhKhach DO
            -- Chọn 1 hành khách chưa có trong chuyến, theo thứ tự tăng dần
            SELECT h.maHanhKhach
            INTO v_maHanhKhach
            FROM HanhKhach h
            WHERE h.maHanhKhach NOT IN (
                SELECT maHanhKhach
                FROM Ve
                WHERE maXe = v_maXe AND maTuyen = v_maTuyen AND maChuyen = v_maChuyen
            )
            ORDER BY h.maHanhKhach ASC
            LIMIT 1;

            -- Nếu không còn hành khách, thoát vòng WHILE
            IF v_maHanhKhach IS NULL THEN
                LEAVE read_loop;
            END IF;

            -- Chèn vé
            INSERT INTO Ve (maXe, maTuyen, maChuyen, ngayMua, gheNgoi, maHanhKhach)
            VALUES (
                v_maXe,
                v_maTuyen,
                v_maChuyen,
                DATE_SUB(v_ngayGioKhoiHanh, INTERVAL FLOOR(1 + (RAND() * 7)) DAY),
                seatNo,
                v_maHanhKhach
            );

            SET seatNo = seatNo + 1;
        END WHILE;

    END LOOP;

    CLOSE curChuyenXe;
END $$

DELIMITER ;

CALL taoVe();
