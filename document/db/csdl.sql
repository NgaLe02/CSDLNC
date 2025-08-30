use csdlnc;

CREATE TABLE NhanVien (
    maNhanVien INT PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(100),
    cmnd VARCHAR(20) UNIQUE,
    soDienThoai VARCHAR(20) UNIQUE
);

CREATE TABLE HanhKhach (
    maHanhKhach INT PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(100) NOT NULL,
    cmnd VARCHAR(12) UNIQUE,
    soDienThoai VARCHAR(20) UNIQUE
);

CREATE TABLE LoaiXe (
    maLoaiXe INT PRIMARY KEY AUTO_INCREMENT,
    tenLoaiXe VARCHAR(50) NOT NULL,
    soGhe INT NOT NULL
);

CREATE TABLE Xe (
	maXe CHAR(3) PRIMARY KEY,
    bienSo VARCHAR(20) NOT NULL UNIQUE,
    tinhTrang VARCHAR(50) NOT NULL CHECK (tinhTrang IN (
        'Đang hoạt động',
        'Sắp bảo dưỡng',
        'Đang bảo dưỡng',
        'Quá hạn bảo dưỡng',
        'Hết hạn đăng kiểm'
    )),
    maLoaiXe INT NOT NULL,
    FOREIGN KEY (maLoaiXe) REFERENCES LoaiXe(maLoaiXe)
);

-- Đang hoạt động
-- Xe đang chạy bình thường, chưa tới kỳ bảo dưỡng/đăng kiểm.
-- Sắp bảo dưỡng
-- Khi số ngày còn lại trong chu kỳ bảo dưỡng < X ngày (ví dụ 30 ngày) hoặc số km tính toán gần chạm ngưỡng → cảnh báo để chủ xe chuẩn bị.
-- Đang bảo dưỡng
-- Xe được đưa đi bảo dưỡng, tạm thời không hoạt động.
-- Quá hạn bảo dưỡng
-- Khi số ngày/khoảng cách vượt quá chu kỳ (360 ngày hoặc km tính toán vượt ngưỡng). Xe không nên hoạt động nếu quá hạn.
-- Hết hạn đăng kiểm
-- Nếu ngày đăng kiểm < ngày hiện tại → xe phải ngừng hoạt động cho đến khi đăng kiểm lại.
-- (Tuỳ chọn thêm) Ngừng hoạt động / Thanh lý
-- Khi xe bị loại bỏ khỏi hệ thống.

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
    thoiGianUocTinh INT,
    maLuongTuyen INT not null,
    heSoDuongKho DECIMAL(10,2) not null DEFAULT 1.0,
    FOREIGN KEY (maLuongTuyen) REFERENCES LuongTuyenDuong(maLuongTuyen)
);

CREATE TABLE Mua (
    maMua INT PRIMARY KEY AUTO_INCREMENT,
    tenMua VARCHAR(50) not null unique
);

CREATE TABLE GiaVe (
    maGiaVe INT ,
    giaVe DECIMAL(12,2) not null,
    ngayBatDau DATE not null,
    ngayKetThuc DATE,
    maTuyen VARCHAR(4) not null,
    maMua INT not null,
    PRIMARY KEY (maTuyen, maMua, maGiaVe),
    FOREIGN KEY (maTuyen) REFERENCES TuyenDuong(maTuyen),
    FOREIGN KEY (maMua) REFERENCES Mua(maMua)
);

CREATE TABLE ChuyenXe (
    maXe VARCHAR(10) NOT NULL,
    maTuyen VARCHAR(10) NOT NULL,
    maChuyen INT NOT NULL,
    maMua VARCHAR(10) NOT NULL,
    maGiaVe VARCHAR(10) NOT NULL,
    ngayGioKhoiHanh DATETIME NOT NULL,
    ngayGioDen DATETIME NOT NULL,
    tinhTrangChuyen VARCHAR(50) NOT NULL,
    chiPhiVanHanh DECIMAL(12,2) NOT NULL,
    tiLeThuLao DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (maXe, maTuyen, maChuyen),
    FOREIGN KEY (maXe) REFERENCES Xe(maXe),
    FOREIGN KEY (maTuyen) REFERENCES TuyenDuong(maTuyen),
    FOREIGN KEY (maMua) REFERENCES Mua(maMua),
    FOREIGN KEY (maGiaVe, maTuyen, maMua)
        REFERENCES GiaVe(maGiaVe, maTuyen, maMua),
    CONSTRAINT chk_tinhtrangchuyen 
        CHECK (tinhTrangChuyen IN ('Chưa khởi hành','Đang chạy','Hoàn thành','Hủy'))
);

CREATE TABLE PhanCong (
    maChuyen VARCHAR(4),
    maTuyen  VARCHAR(4),
    maXe     VARCHAR(10),
    maNhanVien INT,
    vaiTro VARCHAR(255),
    PRIMARY KEY (maChuyen, maTuyen, maXe, maNhanVien),
    FOREIGN KEY (maChuyen, maTuyen, maXe) 
        REFERENCES ChuyenXe(maChuyen, maTuyen, maXe),
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien),
    CONSTRAINT chk_vaiTro CHECK (vaiTro IN ('Lái xe', 'Phụ xe'))
);

CREATE TABLE Ve (
    maVe INT ,
    maXe VARCHAR(10) NOT NULL,
    maTuyen VARCHAR(10) NOT NULL,
    maChuyen INT NOT NULL,
    ngayMua DATE  not null, 
    gheNgoi VARCHAR(10)  not null,
    maHanhKhach INT  not null,
    PRIMARY KEY (maXe, maTuyen, maChuyen, maVe),
    FOREIGN KEY (maHanhKhach) REFERENCES HanhKhach(maHanhKhach),
    FOREIGN KEY (maXe, maTuyen, maChuyen) REFERENCES ChuyenXe(maXe, maTuyen, maChuyen),
    CONSTRAINT uq_ve_chuyen_ghe UNIQUE (maXe, maTuyen, maChuyen, gheNgoi) 
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
    DECLARE maxChuyen INT;

    -- Nếu người dùng không truyền maChuyen, thì tự sinh
    IF NEW.maChuyen IS NULL OR NEW.maChuyen = '' THEN
        SELECT COALESCE(MAX(CAST(SUBSTRING(maChuyen, 3) AS UNSIGNED)), 0) + 1
        INTO maxChuyen
        FROM ChuyenXe
        WHERE maXe = NEW.maXe AND maTuyen = NEW.maTuyen;

        -- Gắn ký tự CX trước số
        SET NEW.maChuyen = CONCAT('CX', LPAD(maxChuyen, 2, '0'));
    END IF;
END$$

DELIMITER ;


-- DELIMITER $$

-- CREATE TRIGGER trg_gen_maChuyen
-- BEFORE INSERT ON ChuyenXe
-- FOR EACH ROW
-- BEGIN
--     DECLARE newId INT;
--     DECLARE newCode VARCHAR(10);

--     -- Lấy số lớn nhất hiện có (bỏ ký tự 'C')
--     SELECT IFNULL(MAX(CAST(SUBSTRING(maChuyen, 2) AS UNSIGNED)), 0) + 1
--     INTO newId
--     FROM ChuyenXe;

--     -- Format thành C + số có 3 chữ số
--     SET newCode = CONCAT('C', LPAD(newId, 3, '0'));

--     SET NEW.maChuyen = newCode;
-- END$$

-- DELIMITER ;

-- gen mã vé

DELIMITER $$

CREATE TRIGGER trg_gen_maVe
BEFORE INSERT ON Ve
FOR EACH ROW
BEGIN
    DECLARE maxVe INT;

    -- Nếu chưa có maVe (NULL hoặc 0) thì tự sinh
    IF NEW.maVe IS NULL OR NEW.maVe = 0 THEN
        SELECT COALESCE(MAX(maVe), 0) + 1
        INTO maxVe
        FROM Ve
        WHERE maChuyen = NEW.maChuyen
          AND maXe = NEW.maXe
          AND maTuyen = NEW.maTuyen;

        SET NEW.maVe = maxVe;
    END IF;
END$$

DELIMITER ;


--gen ma mua
DELIMITER $$

CREATE TRIGGER trg_gen_maMua
BEFORE INSERT ON Mua
FOR EACH ROW
BEGIN
    DECLARE maxNum INT;

    -- Nếu người dùng không truyền maMua, thì tự sinh
    IF NEW.maMua IS NULL OR NEW.maMua = '' THEN
        -- Lấy số lớn nhất trong maMua hiện tại (bỏ chữ M)
        SELECT COALESCE(MAX(CAST(SUBSTRING(maMua, 2) AS UNSIGNED)), 0)
        INTO maxNum
        FROM Mua;

        -- Tăng lên 1 và gán cho NEW.maMua với prefix 'M'
        SET NEW.maMua = CONCAT('M', maxNum + 1);
    END IF;
END $$

DELIMITER ;

--gen mã giá vé
DELIMITER $$

CREATE TRIGGER trg_gen_maGiaVe
BEFORE INSERT ON GiaVe
FOR EACH ROW
BEGIN
    DECLARE maxNum INT;

    -- Nếu người dùng không truyền maGiaVe, thì tự sinh
    IF NEW.maGiaVe IS NULL OR NEW.maGiaVe = '' THEN
        -- Lấy số lớn nhất (bỏ padding) trong cùng (maTuyen, maMua)
        SELECT COALESCE(MAX(CAST(maGiaVe AS UNSIGNED)), 0)
        INTO maxNum
        FROM GiaVe
        WHERE maTuyen = NEW.maTuyen
          AND maMua  = NEW.maMua;

        -- Sinh mã mới, padding thành 3 chữ số
        SET NEW.maGiaVe = LPAD(maxNum + 1, 3, '0');
    END IF;
END $$

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
        SET MESSAGE_TEXT = 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
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
        SET MESSAGE_TEXT = 'Khoảng thời gian bị trùng với giá vé đã tồn tại';
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
        SET MESSAGE_TEXT = 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
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
        SET MESSAGE_TEXT = 'Khoảng thời gian bị trùng với giá vé đã tồn tại';
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

-- Vé:
-- Các ràng buộc cần có
-- ngayMua <= ngayGioKhoiHanh (không thể mua vé sau khi chuyến xe khởi hành).
-- maHanhKhach phải tồn tại trong bảng HanhKhach.
-- maChuyen phải tồn tại trong bảng ChuyenXe.
-- gheNgoi hợp lệ (ví dụ, số ghế nằm trong danh sách ghế hợp lệ của xe).
-- 1 hành khách không được mua nhiều vé cho cùng 1 chuyến.

-- Kiểm tra ngày mua phải trước giờ khởi hành
DELIMITER $$

CREATE TRIGGER trg_check_ngayMua
BEFORE INSERT ON Ve
FOR EACH ROW
BEGIN
    DECLARE v_khoiHanh DATETIME;

    SELECT ngayGioKhoiHanh INTO v_khoiHanh
    FROM ChuyenXe
    WHERE maChuyen = NEW.maChuyen;

    IF NEW.ngayMua > DATE(v_khoiHanh) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể mua vé sau khi chuyến xe khởi hành!';
    END IF;
END$$

DELIMITER ;

-- Kiểm tra 1 hành khách không mua trùng chuyến
DELIMITER $$

CREATE TRIGGER trg_check_trungVe
BEFORE INSERT ON Ve
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 FROM Ve
        WHERE maHanhKhach = NEW.maHanhKhach
          AND maChuyen = NEW.maChuyen
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Hành khách này đã có vé cho chuyến xe!';
    END IF;
END$$

DELIMITER ;
-- Kiểm tra khi UPDATE (cập nhật lại vé)
DELIMITER $$

CREATE TRIGGER trg_check_updateVe
BEFORE UPDATE ON Ve
FOR EACH ROW
BEGIN
    DECLARE v_khoiHanh DATETIME;

    -- Kiểm tra không đổi sang ngày mua > ngày khởi hành
    SELECT ngayGioKhoiHanh INTO v_khoiHanh
    FROM ChuyenXe
    WHERE maChuyen = NEW.maChuyen;

    IF NEW.ngayMua > DATE(v_khoiHanh) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể cập nhật vé với ngày mua sau khi xe đã khởi hành!';
    END IF;

    -- Kiểm tra trùng vé
    IF EXISTS (
        SELECT 1 FROM Ve
        WHERE maHanhKhach = NEW.maHanhKhach
          AND maChuyen = NEW.maChuyen
          AND maVe <> NEW.maVe
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Hành khách này đã có vé cho chuyến xe!';
    END IF;
END$$

DELIMITER ;


-- DELIMITER $$

-- CREATE TRIGGER trg_chuyenxe_set_maGiaVe
-- BEFORE INSERT ON ChuyenXe
-- FOR EACH ROW
-- BEGIN
--     DECLARE v_maGiaVe INT;

--     -- Tìm mã giá vé theo maTuyen + maMua và ngày khởi hành của chuyến
--     SELECT g.maGiaVe
--     INTO v_maGiaVe
--     FROM GiaVe g
--     WHERE g.maTuyen = NEW.maTuyen
--       AND g.maMua = NEW.maMua
--       AND g.ngayBatDau <= DATE(NEW.ngayGioKhoiHanh)
--       AND (g.ngayKetThuc IS NULL OR g.ngayKetThuc >= DATE(NEW.ngayGioKhoiHanh))
--     ORDER BY g.ngayBatDau DESC
--     LIMIT 1;

--     IF v_maGiaVe IS NOT NULL THEN
--         SET NEW.maGiaVe = v_maGiaVe;
--     ELSE
--         SIGNAL SQLSTATE '45000'
--             SET MESSAGE_TEXT = 'Không tìm thấy giá vé hợp lệ cho tuyến đường trong mùa này';
--     END IF;
-- END$$

-- DELIMITER ;

-- DELIMITER $$

-- CREATE TRIGGER trg_chuyenxe_update_maGiaVe
-- BEFORE UPDATE ON ChuyenXe
-- FOR EACH ROW
-- BEGIN
--     DECLARE v_maGiaVe INT;

--     SELECT g.maGiaVe
--     INTO v_maGiaVe
--     FROM GiaVe g
--     WHERE g.maTuyen = NEW.maTuyen
--       AND g.maMua = NEW.maMua
--       AND g.ngayBatDau <= DATE(NEW.ngayGioKhoiHanh)
--       AND (g.ngayKetThuc IS NULL OR g.ngayKetThuc >= DATE(NEW.ngayGioKhoiHanh))
--     ORDER BY g.ngayBatDau DESC
--     LIMIT 1;

--     IF v_maGiaVe IS NOT NULL THEN
--         SET NEW.maGiaVe = v_maGiaVe;
--     ELSE
--         SIGNAL SQLSTATE '45000'
--             SET MESSAGE_TEXT = 'Không tìm thấy giá vé hợp lệ cho tuyến đường trong mùa này';
--     END IF;
-- END$$

-- DELIMITER ;
DELIMITER $$

CREATE TRIGGER trg_cx_bi_set_or_check_maGiaVe
BEFORE INSERT ON ChuyenXe
FOR EACH ROW
BEGIN
    DECLARE v_maGiaVe INT;

    -- Tìm giá vé hợp lệ theo (maTuyen, maMua) tại ngày khởi hành
    SELECT gv.maGiaVe
      INTO v_maGiaVe
      FROM GiaVe gv
     WHERE gv.maTuyen = NEW.maTuyen
       AND gv.maMua   = NEW.maMua
       AND gv.ngayBatDau <= DATE(NEW.ngayGioKhoiHanh)
       AND (gv.ngayKetThuc IS NULL OR gv.ngayKetThuc >= DATE(NEW.ngayGioKhoiHanh))
     ORDER BY gv.ngayBatDau DESC, gv.maGiaVe DESC
     LIMIT 1;

    IF v_maGiaVe IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Không tìm thấy giá vé hợp lệ cho (maTuyen, maMua) tại ngày khởi hành';
    END IF;

    IF NEW.maGiaVe IS NULL THEN
        -- FE không gửi: tự gán
        SET NEW.maGiaVe = v_maGiaVe;
    ELSEIF NEW.maGiaVe <> v_maGiaVe THEN
        -- FE gửi sai: chặn
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'maGiaVe gửi lên không khớp giá vé đang hiệu lực tại ngày khởi hành';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

-- Trigger khi INSERT
CREATE TRIGGER trg_check_vaiTro_insert
BEFORE INSERT ON PhanCong
FOR EACH ROW
BEGIN
    IF NEW.vaiTro NOT IN ('Lái xe', 'Phụ xe') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Vai trò chỉ được phép: Lái xe hoặc Phụ xe';
    END IF;
END$$

-- Trigger khi UPDATE
CREATE TRIGGER trg_check_vaiTro_update
BEFORE UPDATE ON PhanCong
FOR EACH ROW
BEGIN
    IF NEW.vaiTro NOT IN ('Lái xe', 'Phụ xe') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Vai trò chỉ được phép: Lái xe hoặc Phụ xe';
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_check_PhanCong_insert
BEFORE INSERT ON PhanCong
FOR EACH ROW
BEGIN
    DECLARE cnt_lx INT DEFAULT 0;
    DECLARE cnt_px INT DEFAULT 0;

    -- Đếm số Lái xe đã có trong chuyến
    SELECT COUNT(*) INTO cnt_lx
    FROM PhanCong
    WHERE maChuyen = NEW.maChuyen
      AND maTuyen = NEW.maTuyen
      AND maXe = NEW.maXe
      AND vaiTro = 'Lái xe';

    -- Đếm số Phụ xe đã có trong chuyến
    SELECT COUNT(*) INTO cnt_px
    FROM PhanCong
    WHERE maChuyen = NEW.maChuyen
      AND maTuyen = NEW.maTuyen
      AND maXe = NEW.maXe
      AND vaiTro = 'Phụ xe';

    -- Nếu thêm 1 người nữa mà vượt quá số lượng cho phép thì báo lỗi
    IF (NEW.vaiTro = 'Lái xe' AND cnt_lx >= 1) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Trong một chuyến chỉ được có đúng 1 Lái xe';
    END IF;

    IF (NEW.vaiTro = 'Phụ xe' AND cnt_px >= 1) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Trong một chuyến chỉ được có đúng 1 Phụ xe';
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_check_phancong
BEFORE INSERT ON PhanCong
FOR EACH ROW
BEGIN
    DECLARE soLaiXe INT DEFAULT 0;
    DECLARE soPhuXe INT DEFAULT 0;

    -- Đếm số người đã phân công cho chuyến xe này
    SELECT 
        SUM(CASE WHEN vaiTro = 'Lái xe' THEN 1 ELSE 0 END),
        SUM(CASE WHEN vaiTro = 'Phụ xe' THEN 1 ELSE 0 END)
    INTO soLaiXe, soPhuXe
    FROM PhanCong
    WHERE maChuyen = NEW.maChuyen
      AND maTuyen  = NEW.maTuyen
      AND maXe     = NEW.maXe;

    -- Nếu thêm 1 Lái xe nữa mà đã có rồi thì báo lỗi
    IF NEW.vaiTro = 'Lái xe' AND soLaiXe >= 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Mỗi chuyến xe chỉ được phép có 1 Lái xe';
    END IF;

    -- Nếu thêm 1 Phụ xe nữa mà đã có rồi thì báo lỗi
    IF NEW.vaiTro = 'Phụ xe' AND soPhuXe >= 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Mỗi chuyến xe chỉ được phép có 1 Phụ xe';
    END IF;

    -- Nếu đã có 2 người thì không cho thêm nữa
    IF (soLaiXe + soPhuXe) >= 2 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Mỗi chuyến xe chỉ được phép có 2 người (1 lái xe, 1 phụ xe)';
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_capNhatTinhTrangXe
AFTER UPDATE ON ChuyenXe
FOR EACH ROW
BEGIN
    DECLARE kmLamViec DECIMAL(10,2);
    DECLARE tongKm DECIMAL(10,2);
    DECLARE ngayConLai INT;

    -- Chỉ xử lý khi chuyến xe được đánh dấu Hoàn thành
    IF NEW.trangThai = 'Hoàn thành' THEN
        -- Tính km làm việc của chuyến này
        SELECT NEW.khoangCach * T.heSoDuongKho
        INTO kmLamViec
        FROM TuyenDuong T
        WHERE T.maTuyen = NEW.maTuyen;

        -- Tính tổng km từ lần bảo dưỡng gần nhất
        SELECT SUM(C.khoangCach * T.heSoDuongKho)
        INTO tongKm
        FROM ChuyenXe C
        JOIN TuyenDuong T ON C.maTuyen = T.maTuyen
        WHERE C.maXe = NEW.maXe
          AND C.ngayGioKhoiHanh >= (
              SELECT MAX(B.ngayBaoDuong)
              FROM LichBaoDuong B
              WHERE B.maXe = NEW.maXe
          )
          AND C.trangThai = 'Hoàn thành';

        -- Tính số ngày còn lại
        SET ngayConLai = 360 - FLOOR(tongKm / 100);

        -- Cập nhật tình trạng xe
        IF ngayConLai > 30 THEN
            UPDATE Xe SET tinhTrang = 'Đang hoạt động' WHERE maXe = NEW.maXe;
        ELSEIF ngayConLai > 10 THEN
            UPDATE Xe SET tinhTrang = 'Sắp bảo dưỡng' WHERE maXe = NEW.maXe;
        ELSE
            UPDATE Xe SET tinhTrang = 'Quá hạn bảo dưỡng' WHERE maXe = NEW.maXe;
        END IF;
    END IF;
END $$

DELIMITER ;
