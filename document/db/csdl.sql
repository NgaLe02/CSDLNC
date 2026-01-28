-- 1. Tạo Database
CREATE DATABASE IF NOT EXISTS quan_ly_nhan_su_du_an
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE quan_ly_nhan_su_du_an;

-- 2. Bảng Phòng ban
CREATE TABLE phong_ban (
    ma_phong VARCHAR(10) PRIMARY KEY,
    ten_phong VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    ngay_thanh_lap DATE,
    loai_phong VARCHAR(50)
) ENGINE=InnoDB;

-- 3. Bảng Nhân viên
CREATE TABLE nhan_vien (
    ma_nhan_vien VARCHAR(15) PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    ngay_sinh DATE,
    gioi_tinh ENUM('Nam', 'Nữ', 'Khác'),
    chuc_vu ENUM('NhanVien', 'TruongPhong', 'PhoPhong') NOT NULL,
    bac_luong DECIMAL(12,2) NOT NULL,
    luong_co_ban DECIMAL(12,2) NOT NULL,
    ma_phong VARCHAR(10) NOT NULL,
    CONSTRAINT fk_nv_phongban FOREIGN KEY (ma_phong) REFERENCES phong_ban(ma_phong)
) ENGINE=InnoDB;

-- 4. Bảng Loại dự án
CREATE TABLE loai_du_an (
    ma_loai_du_an INT AUTO_INCREMENT PRIMARY KEY,
    ten_loai_du_an VARCHAR(100) NOT NULL,
    so_nhan_vien_toi_da INT NOT NULL,
    mo_ta TEXT
) ENGINE=InnoDB;

-- 5. Bảng Dự án
CREATE TABLE du_an (
    ma_du_an INT AUTO_INCREMENT PRIMARY KEY,
    ten_du_an VARCHAR(150) NOT NULL,
    loai_da INT NOT NULL,
    ma_phong_ql VARCHAR(10) NOT NULL,
    ngay_bat_dau DATE,
    ngay_ket_thuc_du_kien DATE,
    ngay_ket_thuc_thuc_te DATE,
    trang_thai ENUM('ChuaThucHien', 'DangThucHien', 'DungHan', 'QuaHan'),
    CONSTRAINT fk_da_loai FOREIGN KEY (loai_da) REFERENCES loai_du_an(ma_loai_du_an),
    CONSTRAINT fk_da_phongban FOREIGN KEY (ma_phong_ql) REFERENCES phong_ban(ma_phong)
) ENGINE=InnoDB;

-- 6. Bảng Công đoạn (Thực thể yếu của Dự án)
CREATE TABLE cong_doan (
    ma_du_an INT,
    stt_cd INT,
    ten_cong_doan VARCHAR(150) NOT NULL,
    thu_tu INT NOT NULL,
    ngay_bat_dau DATE NOT NULL,
    so_ngay_hoan_thanh INT NOT NULL,
    ngay_hoan_thanh_thuc_te DATE,
    ket_qua TEXT,
    trang_thai_tien_do VARCHAR(50),
    PRIMARY KEY (ma_du_an, stt_cd),
    CONSTRAINT fk_cd_duan FOREIGN KEY (ma_du_an) REFERENCES du_an(ma_du_an) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 1. Tạo bảng Loại công việc
CREATE TABLE loai_cong_viec (
    ma_loai_cv VARCHAR(10) PRIMARY KEY,
    ten_loai_cv VARCHAR(100) NOT NULL,
    muc_luong_nang_suat DECIMAL(12,2)
) ENGINE=InnoDB;

-- 7. Bảng Công việc
CREATE TABLE cong_viec (
    ma_cong_viec VARCHAR(10) PRIMARY KEY,
    ten_cong_viec VARCHAR(150) NOT NULL,
    ma_loai_cv VARCHAR(50) NOT NULL,
    CONSTRAINT fk_cv_loai FOREIGN KEY (ma_loai_cv) REFERENCES loai_cong_viec(ma_loai_cv)
) ENGINE=InnoDB;

-- 8. Bảng Tham gia dự án
CREATE TABLE tham_gia_du_an (
    ma_nhan_vien VARCHAR(15),
    ma_du_an INT,
    thang INT CHECK (thang BETWEEN 1 AND 12),
    nam INT,
    vai_tro ENUM('ThanhVien', 'ChuTri') NOT NULL,
    PRIMARY KEY (ma_nhan_vien, ma_du_an, thang, nam),
    CONSTRAINT fk_tg_nv FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien),
    CONSTRAINT fk_tg_da FOREIGN KEY (ma_du_an) REFERENCES du_an(ma_du_an)
) ENGINE=InnoDB;

-- 9. Bảng Thực hiện công việc
CREATE TABLE thuc_hien_cong_viec (
    ma_nhan_vien VARCHAR(15),
    ma_cong_viec VARCHAR(10),
    thang INT CHECK (thang BETWEEN 1 AND 12),
    nam INT,
    ket_qua TEXT,
    dung_han BOOLEAN,
    PRIMARY KEY (ma_nhan_vien, ma_cong_viec, thang, nam),
    CONSTRAINT fk_thcv_nv FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien),
    CONSTRAINT fk_thcv_cv FOREIGN KEY (ma_cong_viec) REFERENCES cong_viec(ma_cong_viec)
) ENGINE=InnoDB;

-- 10. Bảng Thực hiện công đoạn
CREATE TABLE thuc_hien_cong_doan (
    ma_nhan_vien VARCHAR(15),
    ma_du_an INT,
    stt_cd INT,
    vai_tro ENUM('ThanhVien', 'ChuTri') DEFAULT 'ThanhVien',
    PRIMARY KEY (ma_nhan_vien, ma_du_an, stt_cd),
    CONSTRAINT fk_thcd_nv FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien),
    CONSTRAINT fk_thcd_cd FOREIGN KEY (ma_du_an, stt_cd) REFERENCES cong_doan(ma_du_an, stt_cd)
) ENGINE=InnoDB;

-- 11. Bảng Bảng lương
CREATE TABLE bang_luong (
    ma_bang_luong INT AUTO_INCREMENT PRIMARY KEY,
    ma_nhan_vien VARCHAR(15) NOT NULL,
    thang INT NOT NULL,
    nam INT NOT NULL,
    luong_cung DECIMAL(12,2) DEFAULT 0,
    luong_trach_nhiem DECIMAL(12,2) DEFAULT 0,
    luong_nang_suat DECIMAL(12,2) DEFAULT 0,
    tong_tien_phat DECIMAL(12,2) DEFAULT 0,
    tien_phat DECIMAL(12,2) DEFAULT 0,
    tong_luong DECIMAL(12,2) DEFAULT 0,
    UNIQUE (ma_nhan_vien, thang, nam),
    CONSTRAINT fk_bl_nv FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien)
) ENGINE=InnoDB;

-- 12. Bảng Chi tiết phạt (Thực thể yếu của Bảng lương)
CREATE TABLE chi_tiet_phat (
    ma_bang_luong INT,
    stt_phat INT,
    ly_do VARCHAR(255),
    ty_le_phat DECIMAL(5,2) DEFAULT 8.00,
    so_tien_phat DECIMAL(12,2),
    PRIMARY KEY (ma_bang_luong, stt_phat),
    CONSTRAINT fk_phat_bl FOREIGN KEY (ma_bang_luong) REFERENCES bang_luong(ma_bang_luong) ON DELETE CASCADE
) ENGINE=InnoDB;