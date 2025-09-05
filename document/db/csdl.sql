use csdlnc;

CREATE TABLE NhanVien (
    maNhanVien INT PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(100) NOT NULL,
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
	maXe VARCHAR(4) PRIMARY KEY,
    bienSo VARCHAR(20) NOT NULL UNIQUE,
    tinhTrang VARCHAR(50) NOT NULL CHECK (tinhTrang IN (
        'Đang hoạt động',
        'Sắp bảo dưỡng',
        'Đang bảo dưỡng',
        'Quá hạn bảo dưỡng',
        'Ngừng hoạt động'
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
    chiPhi DECIMAL(12,2) CHECK (chiPhi >= 0),
    ngayDangKiem DATE NOT NULL,
    hieuLuc INT NOT NULL, 
    maXe varCHAR(4),	    
	CONSTRAINT uq_xe_ngay UNIQUE (maXe, ngayDangKiem),
    FOREIGN KEY (maXe) REFERENCES Xe(maXe)
);

CREATE TABLE LichBaoDuong (
    maLichBaoDuong INT PRIMARY KEY AUTO_INCREMENT,
    ngayBaoDuong DATE not null,
    chiPhi DECIMAL(12,2) CHECK (chiPhi >= 0),
    maXe varCHAR(4),
    FOREIGN KEY (maXe) REFERENCES Xe(maXe)
);


CREATE TABLE LuongTuyenDuong (
    maLuongTuyen INT PRIMARY KEY AUTO_INCREMENT,
    doPhucTap int not null CHECK (doPhucTap IN (1,2,3)),
    khoangCachTu DECIMAL(10,2) not null,
    khoangCachDen DECIMAL(10,2) not null,
    luongCoBan DECIMAL(10,2) not null,
    CONSTRAINT ck_khoangCach CHECK (khoangCachTu < khoangCachDen)
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
    maMua varchar(3) PRIMARY KEY,
    tenMua VARCHAR(50) not null unique
);

CREATE TABLE GiaVe (
    maGiaVe varchar(3) ,
    giaVe DECIMAL(12,2) not null,
    ngayBatDau DATE not null,
    ngayKetThuc DATE,
    maTuyen VARCHAR(4) not null,
    maMua varchar(3) not null,
    PRIMARY KEY (maTuyen, maMua, maGiaVe),
    FOREIGN KEY (maTuyen) REFERENCES TuyenDuong(maTuyen),
    FOREIGN KEY (maMua) REFERENCES Mua(maMua),
    CONSTRAINT chk_ngay_giave CHECK (ngayKetThuc IS NULL OR ngayKetThuc > ngayBatDau)
);

CREATE TABLE ChuyenXe (
    maXe VARCHAR(4) NOT NULL,
    maTuyen VARCHAR(4) NOT NULL,
    maChuyen VARCHAR(5) NOT NULL,
    maMua varchar(3) NOT NULL,
    maGiaVe VARCHAR(3) NOT NULL,
    ngayGioKhoiHanh DATETIME NOT NULL,
    ngayGioDen DATETIME NOT NULL,
    tinhTrangChuyen VARCHAR(50) NOT NULL,
    chiPhiVanHanh DECIMAL(12,2) NOT NULL CHECK (chiPhiVanHanh > 0),
    tiLeThuLao DECIMAL(12,2) NOT NULL CHECK (tiLeThuLao > 1),
    PRIMARY KEY (maXe, maTuyen, maChuyen),
    FOREIGN KEY (maXe) REFERENCES Xe(maXe),
    FOREIGN KEY (maTuyen, maMua, maGiaVe)
		REFERENCES GiaVe(maTuyen, maMua, maGiaVe),
    CONSTRAINT chk_tinhtrangchuyen 
        CHECK (tinhTrangChuyen IN ('Chưa khởi hành','Đang chạy','Hoàn thành','Hủy')),
	CONSTRAINT chk_thoiGian  
		CHECK (ngayGioDen > ngayGioKhoiHanh)
);

CREATE TABLE PhanCong (
    maChuyen VARCHAR(5),
    maTuyen  VARCHAR(4),
    maXe     VARCHAR(4),
    maNhanVien INT,
    vaiTro VARCHAR(255),
    PRIMARY KEY (maChuyen, maTuyen, maXe, maNhanVien),
    FOREIGN KEY (maXe, maTuyen, maChuyen) 
        REFERENCES ChuyenXe(maXe, maTuyen, maChuyen),
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien),
    CONSTRAINT chk_vaiTro CHECK (vaiTro IN ('Lái xe', 'Phụ xe')),
	UNIQUE (maXe, maTuyen, maChuyen, vaiTro)
);

CREATE TABLE Ve (
    maVe INT ,
    maXe VARCHAR(4) NOT NULL,
    maTuyen VARCHAR(4) NOT NULL,
    maChuyen VARCHAR(5) NOT NULL,
    ngayMua DATE  not null, 
    gheNgoi VARCHAR(10)  not null,
    maHanhKhach INT  not null,
    PRIMARY KEY (maXe, maTuyen, maChuyen, maVe),
    FOREIGN KEY (maHanhKhach) REFERENCES HanhKhach(maHanhKhach),
    FOREIGN KEY (maXe, maTuyen, maChuyen) REFERENCES ChuyenXe(maXe, maTuyen, maChuyen),
    CONSTRAINT uq_ve_chuyen_ghe UNIQUE (maXe, maTuyen, maChuyen, gheNgoi),
    CONSTRAINT uq_hanhkhach_chuyen UNIQUE (maXe, maTuyen, maChuyen, maHanhKhach)
);


