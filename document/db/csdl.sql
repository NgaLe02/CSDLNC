use csdlnc;

CREATE TABLE NhanVien (
    maNhanVien INT PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(100),
    cmnd VARCHAR(20) UNIQUE
);

CREATE TABLE LoaiXe (
    maLoaiXe INT PRIMARY KEY AUTO_INCREMENT,
    tenLoaiXe VARCHAR(50) NOT NULL,
    soGhe INT NOT NULL
);

CREATE TABLE Xe (
	maXe CHAR(3) PRIMARY KEY,
    bienSo VARCHAR(20) NOT NULL UNIQUE,
    tinhTrang VARCHAR(50),
    maLoaiXe INT NOT NULL,
    FOREIGN KEY (maLoaiXe) REFERENCES LoaiXe(maLoaiXe)
);

CREATE TABLE HanDangKiem (
    maHanDangKiem INT PRIMARY KEY AUTO_INCREMENT,
    chiPhi DECIMAL(12,2),
    ngayDangKiem DATE,
    maXe CHAR(3),
    FOREIGN KEY (maXe) REFERENCES Xe(maXe)
);

CREATE TABLE LichBaoDuong (
    maLichBaoDuong INT PRIMARY KEY AUTO_INCREMENT,
    ngayBaoDuong DATE,
    chiPhi DECIMAL(12,2),
    maXe CHAR(3),
    FOREIGN KEY (maXe) REFERENCES Xe(maXe)
);

CREATE TABLE HanhKhach (
    maHanhKhach INT PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(100) NOT NULL,
    cmnd VARCHAR(12) UNIQUE,
    soDienThoai VARCHAR(20) UNIQUE
);

CREATE TABLE LuongTuyenDuong (
    maLuongTuyen INT PRIMARY KEY AUTO_INCREMENT,
    doPhucTap int not null CHECK (doPhucTap IN (1,2,3)),
    khoangCachTu DECIMAL(10,2) not null,
    khoangCachDen DECIMAL(10,2) not null,
    luongCoBan DECIMAL(10,2) not null
);

CREATE TABLE TuyenDuong (
    maTuyen VARCHAR(4) PRIMARY KEY,
    diemKhoiHanh VARCHAR(100) not null,
    doPhucTap int not null CHECK (doPhucTap IN (1,2,3)),
    diemDen VARCHAR(100) not null,
    khoangCach DECIMAL(10,2) not null,
    thoiGianUocTinh INT not null,
    maLuongTuyen INT not null,
    FOREIGN KEY (maLuongTuyen) REFERENCES LuongTuyenDuong(maLuongTuyen)
);

CREATE TABLE ChuyenXe (
    maChuyen VARCHAR(4) PRIMARY KEY,
    tinhTrangChuyen VARCHAR(50) not null,
    ngayGioKhoiHanh DATETIME not null,
    ngayGioDen DATETIME not null,
    chiPhiVanHanh DECIMAL(12,2) not null,
    tiLeThuLao DECIMAL(12,2) not null,
    maXe CHAR(3) not null,
    maTuyen VARCHAR(4) not null,
    FOREIGN KEY (maXe) REFERENCES Xe(maXe),
    FOREIGN KEY (maTuyen) REFERENCES TuyenDuong(maTuyen),
    CONSTRAINT chk_tinhtrangchuyen 
        CHECK (tinhTrangChuyen IN ('Chưa khởi hành','Đang chạy','Hoàn thành','Hủy'))
);


CREATE TABLE PhanCong (
	maNhanVien INT,
    maChuyen VARCHAR(4),
    vaiTro varchar(255),
    PRIMARY KEY (maChuyen, maNhanVien),
    FOREIGN KEY (maChuyen) REFERENCES ChuyenXe(maChuyen),
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien)
);

CREATE TABLE Ve (
    maVe INT PRIMARY KEY AUTO_INCREMENT,
    ngayMua DATE,
    gheNgoi VARCHAR(10),
    maHanhKhach INT,
    maChuyen VARCHAR(4),
    FOREIGN KEY (maHanhKhach) REFERENCES HanhKhach(maHanhKhach),
    FOREIGN KEY (maChuyen) REFERENCES ChuyenXe(maChuyen),
    UNIQUE (maChuyen, gheNgoi) -- đảm bảo 1 ghế chỉ được bán 1 lần cho 1 chuyến
);

CREATE TABLE Mua (
    maMua INT PRIMARY KEY AUTO_INCREMENT,
    tenMua VARCHAR(50) not null unique
);

CREATE TABLE GiaVe (
    maGiaVe INT PRIMARY KEY AUTO_INCREMENT,
    giaVe DECIMAL(12,2) not null,
    ngayBatDau DATE not null,
    ngayKetThuc DATE,
    maTuyen VARCHAR(4) not null,
    maMua INT not null,
    FOREIGN KEY (maTuyen) REFERENCES TuyenDuong(maTuyen),
    FOREIGN KEY (maMua) REFERENCES Mua(maMua)
);

-- gen maxe khi insert
DELIMITER $$

CREATE TRIGGER trg_gen_maXe
BEFORE INSERT ON Xe
FOR EACH ROW
BEGIN
    DECLARE newId INT;
    -- Lấy số lớn nhất hiện có
    SELECT IFNULL(MAX(CAST(maXe AS UNSIGNED)), 0) + 1 INTO newId
    FROM Xe;
    -- Gán mã mới cho bản ghi
    SET NEW.maXe = LPAD(newId, 3, '0');
END$$

DELIMITER ;

-- gen ma tuyen duong khi insert
DELIMITER $$

CREATE TRIGGER trg_gen_maTuyen
BEFORE INSERT ON TuyenDuong
FOR EACH ROW
BEGIN
    DECLARE newId INT;
    DECLARE newCode VARCHAR(10);

    -- Lấy số lớn nhất hiện có (bỏ ký tự 'T')
    SELECT IFNULL(MAX(CAST(SUBSTRING(maTuyen, 2) AS UNSIGNED)), 0) + 1 
    INTO newId
    FROM TuyenDuong;

    -- Format thành T + số có 3 chữ số
    SET newCode = CONCAT('T', LPAD(newId, 3, '0'));

    SET NEW.maTuyen = newCode;
END$$

DELIMITER ;

-- gen ma chuyen duong khi insert
DELIMITER $$

CREATE TRIGGER trg_gen_maChuyen
BEFORE INSERT ON ChuyenXe
FOR EACH ROW
BEGIN
    DECLARE newId INT;
    DECLARE newCode VARCHAR(10);

    -- Lấy số lớn nhất hiện có (bỏ ký tự 'C')
    SELECT IFNULL(MAX(CAST(SUBSTRING(maChuyen, 2) AS UNSIGNED)), 0) + 1
    INTO newId
    FROM ChuyenXe;

    -- Format thành C + số có 3 chữ số
    SET newCode = CONCAT('C', LPAD(newId, 3, '0'));

    SET NEW.maChuyen = newCode;
END$$

DELIMITER ;

-- gen mã vé
DELIMITER //
CREATE TRIGGER trg_generate_maVe
BEFORE INSERT ON Ve
FOR EACH ROW
BEGIN
    DECLARE tuyen VARCHAR(4);
    DECLARE xe VARCHAR(3);
    DECLARE newCode VARCHAR(50);

    -- lấy thông tin tuyến + xe từ bảng ChuyenXe
    SELECT maTuyen, maXe INTO tuyen, xe
    FROM ChuyenXe WHERE maChuyen = NEW.maChuyen;

    -- ghép thành mã vé (dùng maVe INT AUTO_INCREMENT nếu cần số thứ tự)
    SET newCode = CONCAT(NEW.maChuyen, '_', tuyen, '_', xe, '_', LPAD(NEW.maHanhKhach,4,'0'));

    SET NEW.maVe = newCode;
END //
DELIMITER ;


-- DELIMITER $$

-- CREATE TRIGGER trg_luongTuyenDuong_checkOverlap_insert
-- BEFORE INSERT ON LuongTuyenDuong
-- FOR EACH ROW
-- BEGIN
--     -- Kiểm tra khoangCachTu < khoangCachDen
--     IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
--         SIGNAL SQLSTATE '45000'
--             SET MESSAGE_TEXT = 'Khoảng cách từ phải nhỏ hơn khoảng cách đến';
--     END IF;

--     -- Kiểm tra chồng lấp về khoảng cách và thời gian cho cùng độ phức tạp
--     IF EXISTS (
--         SELECT 1
--         FROM LuongTuyenDuong
--         WHERE doPhucTap = NEW.doPhucTap
--           AND NOT (NEW.khoangCachDen < khoangCachTu OR NEW.khoangCachTu > khoangCachDen)
--           AND (
--                 (NEW.ngayKetThuc IS NULL AND NEW.ngayBatDau <= IFNULL(ngayKetThuc, NEW.ngayBatDau))
--                 OR
--                 (ngayKetThuc IS NULL AND ngayBatDau <= NEW.ngayKetThuc)
--                 OR
--                 (NEW.ngayBatDau <= ngayKetThuc AND NEW.ngayKetThuc >= ngayBatDau)
--               )
--     ) THEN
--         SIGNAL SQLSTATE '45000'
--             SET MESSAGE_TEXT = 'Khoảng cách hoặc thời gian chồng lấp với bản ghi hiện có cho độ phức tạp này';
--     END IF;
-- END$$

-- DELIMITER ;


-- DELIMITER $$

-- CREATE TRIGGER trg_luongTuyenDuong_checkOverlap_update
-- BEFORE UPDATE ON LuongTuyenDuong
-- FOR EACH ROW
-- BEGIN
--     -- Kiểm tra khoangCachTu < khoangCachDen
--     IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
--         SIGNAL SQLSTATE '45000'
--             SET MESSAGE_TEXT = 'Khoảng cách từ phải nhỏ hơn khoảng cách đến';
--     END IF;

--     -- Kiểm tra chồng lấp về khoảng cách và thời gian cho cùng độ phức tạp
--     IF EXISTS (
--         SELECT 1
--         FROM LuongTuyenDuong
--         WHERE doPhucTap = NEW.doPhucTap
--           AND maLuongTuyen <> NEW.maLuongTuyen
--           AND NOT (NEW.khoangCachDen < khoangCachTu OR NEW.khoangCachTu > khoangCachDen)
--           AND (
--                 (NEW.ngayKetThuc IS NULL AND NEW.ngayBatDau <= IFNULL(ngayKetThuc, NEW.ngayBatDau))
--                 OR
--                 (ngayKetThuc IS NULL AND ngayBatDau <= NEW.ngayKetThuc)
--                 OR
--                 (NEW.ngayBatDau <= ngayKetThuc AND NEW.ngayKetThuc >= ngayBatDau)
--               )
--     ) THEN
--         SIGNAL SQLSTATE '45000'
--             SET MESSAGE_TEXT = 'Khoảng cách hoặc thời gian chồng lấp với bản ghi hiện có cho độ phức tạp này';
--     END IF;
-- END$$

-- DELIMITER ;
DELIMITER $$

CREATE TRIGGER trg_check_khoangCach
BEFORE INSERT ON LuongTuyenDuong
FOR EACH ROW
BEGIN
    IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'KhoangCachTu phai nho hon KhoangCachDen';
    END IF;
END$$

CREATE TRIGGER trg_check_khoangCach_update
BEFORE UPDATE ON LuongTuyenDuong
FOR EACH ROW
BEGIN
    IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'KhoangCachTu phai nho hon KhoangCachDen';
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_check_trung_luong
BEFORE INSERT ON LuongTuyenDuong
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM LuongTuyenDuong
        WHERE doPhucTap = NEW.doPhucTap
          AND NOT (NEW.khoangCachDen <= khoangCachTu OR NEW.khoangCachTu >= khoangCachDen)
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'KhoangCach trung voi mot muc luong da ton tai';
    END IF;
END$$

CREATE TRIGGER trg_check_trung_luong_update
BEFORE UPDATE ON LuongTuyenDuong
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM LuongTuyenDuong
        WHERE doPhucTap = NEW.doPhucTap
          AND maLuongTuyen <> NEW.maLuongTuyen
          AND NOT (NEW.khoangCachDen <= khoangCachTu OR NEW.khoangCachTu >= khoangCachDen)
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'KhoangCach trung voi mot muc luong da ton tai';
    END IF;
END$$

DELIMITER ;


DELIMITER $$

-- Trigger BEFORE INSERT
CREATE TRIGGER trg_giave_before_insert
BEFORE INSERT ON GiaVe
FOR EACH ROW
BEGIN
    -- 1. Kiểm tra ngayKetThuc >= ngayBatDau nếu ngayKetThuc không null
    IF NEW.ngayKetThuc IS NOT NULL AND NEW.ngayKetThuc < NEW.ngayBatDau THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ngayKetThuc phai lon hon hoac bang ngayBatDau';
    END IF;

    -- 2. Kiểm tra trùng khoảng thời gian cho cùng maTuyen và maMua
    IF EXISTS (
        SELECT 1
        FROM GiaVe
        WHERE maTuyen = NEW.maTuyen
          AND maMua = NEW.maMua
          AND (
                (NEW.ngayBatDau BETWEEN ngayBatDau AND IFNULL(ngayKetThuc, '9999-12-31'))
             OR (NEW.ngayKetThuc IS NOT NULL AND ngayBatDau BETWEEN NEW.ngayBatDau AND NEW.ngayKetThuc)
              )
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Khoang thoi gian bi trung voi gia ve da ton tai';
    END IF;
END$$

-- Trigger BEFORE UPDATE
CREATE TRIGGER trg_giave_before_update
BEFORE UPDATE ON GiaVe
FOR EACH ROW
BEGIN
    -- 1. Kiểm tra ngayKetThuc >= ngayBatDau nếu ngayKetThuc không null
    IF NEW.ngayKetThuc IS NOT NULL AND NEW.ngayKetThuc < NEW.ngayBatDau THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ngayKetThuc phai lon hon hoac bang ngayBatDau';
    END IF;

    -- 2. Kiểm tra trùng khoảng thời gian cho cùng maTuyen và maMua (ngoại trừ chính bản ghi này)
    IF EXISTS (
        SELECT 1
        FROM GiaVe
        WHERE maTuyen = NEW.maTuyen
          AND maMua = NEW.maMua
          AND maGiaVe <> OLD.maGiaVe
          AND (
                (NEW.ngayBatDau BETWEEN ngayBatDau AND IFNULL(ngayKetThuc, '9999-12-31'))
             OR (NEW.ngayKetThuc IS NOT NULL AND ngayBatDau BETWEEN NEW.ngayBatDau AND NEW.ngayKetThuc)
              )
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Khoang thoi gian bi trung voi gia ve da ton tai';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

-- Trigger BEFORE INSERT
CREATE TRIGGER trg_handangkiem_before_insert
BEFORE INSERT ON HanDangKiem
FOR EACH ROW
BEGIN
    -- 1. Kiểm tra ngayDangKiem không null
    IF NEW.ngayDangKiem IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ngayDangKiem khong duoc de trong';
    END IF;

    -- 2. Kiểm tra chiPhi >= 0 nếu không null
    IF NEW.chiPhi IS NOT NULL AND NEW.chiPhi < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'chiPhi phai >= 0';
    END IF;

    -- 3. Kiểm tra trùng ngayDangKiem cho cùng maXe
    IF EXISTS (
        SELECT 1
        FROM HanDangKiem
        WHERE maXe = NEW.maXe
          AND ngayDangKiem = NEW.ngayDangKiem
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Da ton tai dang kiem cho xe nay trong ngay';
    END IF;
END$$

-- Trigger BEFORE UPDATE
CREATE TRIGGER trg_handangkiem_before_update
BEFORE UPDATE ON HanDangKiem
FOR EACH ROW
BEGIN
    -- 1. Kiểm tra ngayDangKiem không null
    IF NEW.ngayDangKiem IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ngayDangKiem khong duoc de trong';
    END IF;

    -- 2. Kiểm tra chiPhi >= 0 nếu không null
    IF NEW.chiPhi IS NOT NULL AND NEW.chiPhi < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'chiPhi phai >= 0';
    END IF;

    -- 3. Kiểm tra trùng ngayDangKiem cho cùng maXe (ngoại trừ bản ghi hiện tại)
    IF EXISTS (
        SELECT 1
        FROM HanDangKiem
        WHERE maXe = NEW.maXe
          AND ngayDangKiem = NEW.ngayDangKiem
          AND maHanDangKiem <> OLD.maHanDangKiem
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Da ton tai dang kiem cho xe nay trong ngay';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

-- Trigger BEFORE INSERT
CREATE TRIGGER trg_chuyenxe_before_insert
BEFORE INSERT ON ChuyenXe
FOR EACH ROW
BEGIN
    -- 1. ngayGioDen >= ngayGioKhoiHanh
    IF NEW.ngayGioDen < NEW.ngayGioKhoiHanh THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ngày giờ đến phải sau hoặc bằng ngày giờ khởi hành';
    END IF;

    -- 2. chiPhiVanHanh >= 0
    IF NEW.chiPhiVanHanh < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Chi phí vận hành phải >= 0';
    END IF;

    -- 3. tiLeThuLao >= 0 và <= 100
    IF NEW.tiLeThuLao < 0 OR NEW.tiLeThuLao > 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tỉ lệ thù lao phải nằm trong khoảng 0 - 100';
    END IF;

    -- 4. Không trùng giờ cho cùng xe
    IF EXISTS (
        SELECT 1
        FROM ChuyenXe
        WHERE maXe = NEW.maXe
          AND (
                (NEW.ngayGioKhoiHanh BETWEEN ngayGioKhoiHanh AND ngayGioDen)
             OR (NEW.ngayGioDen BETWEEN ngayGioKhoiHanh AND ngayGioDen)
             OR (ngayGioKhoiHanh BETWEEN NEW.ngayGioKhoiHanh AND NEW.ngayGioDen)
              )
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Xe này đã có chuyến trong khoảng thời gian trùng lặp';
    END IF;
END$$

-- Trigger BEFORE UPDATE
CREATE TRIGGER trg_chuyenxe_before_update
BEFORE UPDATE ON ChuyenXe
FOR EACH ROW
BEGIN
    -- 1. ngayGioDen >= ngayGioKhoiHanh
    IF NEW.ngayGioDen < NEW.ngayGioKhoiHanh THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ngày giờ đến phải sau hoặc bằng ngày giờ khởi hành';
    END IF;

    -- 2. chiPhiVanHanh >= 0
    IF NEW.chiPhiVanHanh < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Chi phí vận hành phải >= 0';
    END IF;

    -- 3. tiLeThuLao >= 0 và <= 100
    IF NEW.tiLeThuLao < 0 OR NEW.tiLeThuLao > 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tỉ lệ thù lao phải nằm trong khoảng 0 - 100';
    END IF;

    -- 4. Không trùng giờ cho cùng xe (bỏ qua chính bản ghi đang update)
    IF EXISTS (
        SELECT 1
        FROM ChuyenXe
        WHERE maXe = NEW.maXe
          AND maChuyen <> OLD.maChuyen
          AND (
                (NEW.ngayGioKhoiHanh BETWEEN ngayGioKhoiHanh AND ngayGioDen)
             OR (NEW.ngayGioDen BETWEEN ngayGioKhoiHanh AND ngayGioDen)
             OR (ngayGioKhoiHanh BETWEEN NEW.ngayGioKhoiHanh AND NEW.ngayGioDen)
              )
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Xe này đã có chuyến trong khoảng thời gian trùng lặp';
    END IF;
END$$

DELIMITER ;

-- Tự động đổi trạng thái dựa vào ngayGioKhoiHanh và ngayGioDen
CREATE EVENT IF NOT EXISTS ev_update_tinhtrangchuyen
ON SCHEDULE EVERY 15 MINUTE
DO
    UPDATE ChuyenXe
    SET tinhTrangChuyen =
        CASE
            WHEN NOW() < ngayGioKhoiHanh THEN 'Chưa khởi hành'
            WHEN NOW() >= ngayGioKhoiHanh AND NOW() < ngayGioDen THEN 'Đang chạy'
            WHEN NOW() >= ngayGioDen THEN 'Hoàn thành'
        END
    WHERE tinhTrangChuyen <> 'Hủy'
      AND (
          (NOW() < ngayGioKhoiHanh     AND tinhTrangChuyen <> 'Chưa khởi hành') OR
          (NOW() BETWEEN ngayGioKhoiHanh AND ngayGioDen AND tinhTrangChuyen <> 'Đang chạy') OR
          (NOW() >= ngayGioDen         AND tinhTrangChuyen <> 'Hoàn thành')
      );


-- Tự động đổi trạng thái dựa vào ngayGioKhoiHanh và ngayGioDen khi inset, update
DELIMITER $$

-- Trigger khi INSERT
CREATE TRIGGER trg_chuyenxe_insert
BEFORE INSERT ON ChuyenXe
FOR EACH ROW
BEGIN
    IF NEW.tinhTrangChuyen IS NULL OR NEW.tinhTrangChuyen <> 'Hủy' THEN
        IF NOW() < NEW.ngayGioKhoiHanh THEN
            SET NEW.tinhTrangChuyen = 'Chưa khởi hành';
        ELSEIF NOW() >= NEW.ngayGioKhoiHanh AND NOW() < NEW.ngayGioDen THEN
            SET NEW.tinhTrangChuyen = 'Đang chạy';
        ELSEIF NOW() >= NEW.ngayGioDen THEN
            SET NEW.tinhTrangChuyen = 'Hoàn thành';
        END IF;
    END IF;
END$$

-- Trigger khi UPDATE
CREATE TRIGGER trg_chuyenxe_update
BEFORE UPDATE ON ChuyenXe
FOR EACH ROW
BEGIN
    -- Nếu có thay đổi ngày giờ khởi hành hoặc ngày giờ đến
    IF (NEW.ngayGioKhoiHanh <> OLD.ngayGioKhoiHanh)
       OR (NEW.ngayGioDen <> OLD.ngayGioDen) THEN
        IF NEW.tinhTrangChuyen <> 'Hủy' THEN
            IF NOW() < NEW.ngayGioKhoiHanh THEN
                SET NEW.tinhTrangChuyen = 'Chưa khởi hành';
            ELSEIF NOW() >= NEW.ngayGioKhoiHanh AND NOW() < NEW.ngayGioDen THEN
                SET NEW.tinhTrangChuyen = 'Đang chạy';
            ELSEIF NOW() >= NEW.ngayGioDen THEN
                SET NEW.tinhTrangChuyen = 'Hoàn thành';
            END IF;
        END IF;
    END IF;
END$$

DELIMITER ;
