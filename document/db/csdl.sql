CREATE TABLE NhanVien (
    maNhanVien INT PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(100),
    ngaySinh DATE,
    cmnd VARCHAR(20),
    kinhNghiem INT
);

CREATE TABLE LoaiXe (
    maLoaiXe INT PRIMARY KEY AUTO_INCREMENT,
    tenLoaiXe VARCHAR(50),
    soGhe INT
);

CREATE TABLE Xe (
	maXe CHAR(3) PRIMARY KEY,
    bienSo VARCHAR(20),
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
    cmnd VARCHAR(20),
    soDienThoai VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE TuyenDuong (
    maTuyen INT PRIMARY KEY AUTO_INCREMENT,
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
    maChuyen INT PRIMARY KEY AUTO_INCREMENT,
    tinhTrangChuyen VARCHAR(50),
    ngayGioKhoiHanh DATETIME,
    ngayGioDen DATETIME,
    chiPhiVanHanh DECIMAL(12,2),
    thulaoLaiXe DECIMAL(12,2),
    maXe CHAR(3),
    maTuyen INT,
    FOREIGN KEY (maXe) REFERENCES Xe(maXe),
    FOREIGN KEY (maTuyen) REFERENCES TuyenDuong(maTuyen)
);

CREATE TABLE Ve (
    maVe INT PRIMARY KEY AUTO_INCREMENT,
    ngayMua DATE,
    gheNgoi VARCHAR(10),
    maHanhKhach INT,
    maChuyen INT,
    FOREIGN KEY (maHanhKhach) REFERENCES HanhKhach(maHanhKhach),
    FOREIGN KEY (maChuyen) REFERENCES ChuyenXe(maChuyen)
);

CREATE TABLE GiaVe (
    maGiaVe INT PRIMARY KEY AUTO_INCREMENT,
    giaVe DECIMAL(12,2),
    doUuTien VARCHAR(50),
    ngayHieuLuc DATE,
    ngayKetThuc DATE,
    maTuyen INT,
    FOREIGN KEY (maTuyen) REFERENCES TuyenDuong(maTuyen)
);

CREATE TABLE Mua (
    maMua INT PRIMARY KEY AUTO_INCREMENT,
    tenMua VARCHAR(50)
);
