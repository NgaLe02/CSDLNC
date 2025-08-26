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
    doPhucTap int not null CHECK (doPhucTap IN (1,2,3)),,
    khoangCachTu DECIMAL(10,2) not null,
    khoangCachDen DECIMAL(10,2) not null,
    luongCoBan DECIMAL(12,2) not null,
    ngayBatDau DATE NOT NULL,
    ngayKetThuc DATE NULL
);
CREATE TABLE TuyenDuong (
    maTuyen VARCHAR(4) PRIMARY KEY,
    diemKhoiHanh VARCHAR(100),
    diemDen VARCHAR(100),
    khoangCach DECIMAL(10,2),
    thoiGianUocTinh INT,
    giaVeCoBan DECIMAL(12,2),
	maLuongTuyen INT,
	FOREIGN KEY (maLuongTuyen) REFERENCES LuongTuyenDuong(maLuongTuyen)
);


CREATE TABLE ChuyenXe (
    maChuyen VARCHAR(4) PRIMARY KEY,
    tinhTrangChuyen VARCHAR(50),
    ngayGioKhoiHanh DATETIME,
    ngayGioDen DATETIME,
    chiPhiVanHanh DECIMAL(12,2),
    thulaoLaiXe DECIMAL(12,2),
    maXe CHAR(3),
    maTuyen VARCHAR(4),
    FOREIGN KEY (maXe) REFERENCES Xe(maXe),
    FOREIGN KEY (maTuyen) REFERENCES TuyenDuong(maTuyen)
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
    ngayHieuLuc DATE not null,
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



DELIMITER $$

CREATE TRIGGER trg_luongTuyenDuong_checkOverlap_insert
BEFORE INSERT ON LuongTuyenDuong
FOR EACH ROW
BEGIN
    -- Kiểm tra khoangCachTu < khoangCachDen
    IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Khoảng cách từ phải nhỏ hơn khoảng cách đến';
    END IF;

    -- Kiểm tra chồng lấp về khoảng cách và thời gian cho cùng độ phức tạp
    IF EXISTS (
        SELECT 1
        FROM LuongTuyenDuong
        WHERE doPhucTap = NEW.doPhucTap
          AND NOT (NEW.khoangCachDen < khoangCachTu OR NEW.khoangCachTu > khoangCachDen)
          AND (
                (NEW.ngayKetThuc IS NULL AND NEW.ngayBatDau <= IFNULL(ngayKetThuc, NEW.ngayBatDau))
                OR
                (ngayKetThuc IS NULL AND ngayBatDau <= NEW.ngayKetThuc)
                OR
                (NEW.ngayBatDau <= ngayKetThuc AND NEW.ngayKetThuc >= ngayBatDau)
              )
    ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Khoảng cách hoặc thời gian chồng lấp với bản ghi hiện có cho độ phức tạp này';
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_luongTuyenDuong_checkOverlap_update
BEFORE UPDATE ON LuongTuyenDuong
FOR EACH ROW
BEGIN
    -- Kiểm tra khoangCachTu < khoangCachDen
    IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Khoảng cách từ phải nhỏ hơn khoảng cách đến';
    END IF;

    -- Kiểm tra chồng lấp về khoảng cách và thời gian cho cùng độ phức tạp
    IF EXISTS (
        SELECT 1
        FROM LuongTuyenDuong
        WHERE doPhucTap = NEW.doPhucTap
          AND maLuongTuyen <> NEW.maLuongTuyen
          AND NOT (NEW.khoangCachDen < khoangCachTu OR NEW.khoangCachTu > khoangCachDen)
          AND (
                (NEW.ngayKetThuc IS NULL AND NEW.ngayBatDau <= IFNULL(ngayKetThuc, NEW.ngayBatDau))
                OR
                (ngayKetThuc IS NULL AND ngayBatDau <= NEW.ngayKetThuc)
                OR
                (NEW.ngayBatDau <= ngayKetThuc AND NEW.ngayKetThuc >= ngayBatDau)
              )
    ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Khoảng cách hoặc thời gian chồng lấp với bản ghi hiện có cho độ phức tạp này';
    END IF;
END$$

DELIMITER ;
