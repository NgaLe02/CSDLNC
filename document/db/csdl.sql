CREATE TABLE NhanVien (
    maNhanVien INT PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(100),
    ngaySinh DATE,
    cmnd VARCHAR(20) UNIQUE,
    kinhNghiem INT
);

CREATE TABLE LoaiXe (
    maLoaiXe INT PRIMARY KEY AUTO_INCREMENT,
    tenLoaiXe VARCHAR(50),
    soGhe INT
);

CREATE TABLE Xe (
	maXe CHAR(3) PRIMARY KEY,
    bienSo VARCHAR(20) UNIQUE,
    tinhTrang VARCHAR(50),
    maLoaiXe INT,
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
    hoTen VARCHAR(100),
    cmnd VARCHAR(20) UNIQUE,
    soDienThoai VARCHAR(20) UNIQUE,
    email VARCHAR(100)
);

CREATE TABLE TuyenDuong (
    maTuyen VARCHAR(4) PRIMARY KEY,
    diemKhoiHanh VARCHAR(100),
    diemDen VARCHAR(100),
    khoangCach DECIMAL(10,2),
    thoiGianUocTinh INT,
    giaVeCoBan DECIMAL(12,2)
);

CREATE TABLE LuongTuyenDuong (
    maLuongTuyen INT PRIMARY KEY AUTO_INCREMENT,
    doPhucTap VARCHAR(50),
    khoangCachTu DECIMAL(10,2),
    khoangCachDen DECIMAL(10,2),
    luongCoBan DECIMAL(12,2)
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

CREATE TABLE Ve (
    maVe INT PRIMARY KEY AUTO_INCREMENT,
    ngayMua DATE,
    gheNgoi VARCHAR(10),
    maHanhKhach INT,
    maChuyen VARCHAR(4),
	maTuyen VARCHAR(4),
    maXe VARCHAR(3),
    FOREIGN KEY (maHanhKhach) REFERENCES HanhKhach(maHanhKhach),
    FOREIGN KEY (maChuyen) REFERENCES ChuyenXe(maChuyen),
	FOREIGN KEY (maTuyen) REFERENCES TuyenDuong(maTuyen),
	FOREIGN KEY (maXe) REFERENCES Xe(maXe),
    UNIQUE (maChuyen, gheNgoi) -- đảm bảo 1 ghế chỉ được bán 1 lần cho 1 chuyến
);

CREATE TABLE PhanCong (
	maNhanVien INT,
    maChuyen VARCHAR(4),
    maXe VARCHAR(3),
    vaiTro varchar(255),
    PRIMARY KEY (maChuyen, maXe, maNhanVien),
    FOREIGN KEY (maChuyen) REFERENCES ChuyenXe(maChuyen),
    FOREIGN KEY (maXe) REFERENCES Xe(maXe),
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien)
);

CREATE TABLE GiaVe (
    maGiaVe INT PRIMARY KEY AUTO_INCREMENT,
    giaVe DECIMAL(12,2),
    doUuTien VARCHAR(50),
    ngayHieuLuc DATE,
    ngayKetThuc DATE,
    maTuyen VARCHAR(4),
    maMua INT,
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



