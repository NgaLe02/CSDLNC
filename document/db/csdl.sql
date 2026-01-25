CREATE DATABASE quan_ly_nhan_su_du_an
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE quan_ly_nhan_su_du_an;

CREATE TABLE phongban (
    ma_phong VARCHAR(10) PRIMARY KEY,
    ten_phong VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    ngay_thanh_lap DATE
) ENGINE=InnoDB;

CREATE TABLE nhanvien (
    ma_nv VARCHAR(15) PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    ngay_sinh DATE,
    gioi_tinh ENUM('Nam', 'Nữ', 'Khác'),
    chuc_vu ENUM('NhanVien', 'TruongPhong', 'PhoPhong') NOT NULL,
    bac_luong DECIMAL(12,2) NOT NULL,
    luong_co_ban DECIMAL(12,2) NOT NULL,
    ma_phong VARCHAR(10) NOT NULL,

    CONSTRAINT fk_nv_phongban
        FOREIGN KEY (ma_phong)
        REFERENCES phongban(ma_phong)
) ENGINE=InnoDB;

CREATE TABLE duan (
    ma_da VARCHAR(10) PRIMARY KEY,
    ten_da VARCHAR(150) NOT NULL,
    loai_da VARCHAR(50),
    so_nhan_vien_toi_da INT NOT NULL,
    ma_phong_ql VARCHAR(10) NOT NULL,
    ma_nv_chu_tri VARCHAR(15) NOT NULL,
    ngay_bat_dau DATE,
    ngay_ket_thuc_du_kien DATE,
    trang_thai VARCHAR(50),

    CONSTRAINT fk_da_phongban
        FOREIGN KEY (ma_phong_ql)
        REFERENCES phongban(ma_phong),

    CONSTRAINT fk_da_chutri
        FOREIGN KEY (ma_nv_chu_tri)
        REFERENCES nhanvien(ma_nv)
) ENGINE=InnoDB;

CREATE TABLE congdoan (
    ma_cd VARCHAR(10) PRIMARY KEY,
    ten_cong_doan VARCHAR(150) NOT NULL,
    thu_tu INT NOT NULL,
    ngay_bat_dau DATE,
    so_ngay_hoan_thanh INT NOT NULL,
    ngay_hoan_thanh_thuc_te DATE,
    ket_qua TEXT,
    trang_thai_tien_do ENUM('DungHan', 'TreHan'),
    ma_da VARCHAR(10) NOT NULL,

    CONSTRAINT fk_cd_duan
        FOREIGN KEY (ma_da)
        REFERENCES duan(ma_da)
) ENGINE=InnoDB;

CREATE TABLE thamgia_duan (
    ma_nv VARCHAR(15),
    ma_da VARCHAR(10),
    vai_tro ENUM('ThanhVien', 'ChuTri'),
    thang INT CHECK (thang BETWEEN 1 AND 12),
    nam INT,

    PRIMARY KEY (ma_nv, ma_da, thang, nam),

    CONSTRAINT fk_tg_nv
        FOREIGN KEY (ma_nv)
        REFERENCES nhanvien(ma_nv),

    CONSTRAINT fk_tg_da
        FOREIGN KEY (ma_da)
        REFERENCES duan(ma_da)
) ENGINE=InnoDB;

CREATE TABLE thuchien_congdoan (
    ma_nv VARCHAR(15),
    ma_cd VARCHAR(10),
    vai_tro ENUM('ThucHien', 'ChuTri'),
    ket_qua TEXT,
    dung_han BOOLEAN,

    PRIMARY KEY (ma_nv, ma_cd),

    CONSTRAINT fk_thcd_nv
        FOREIGN KEY (ma_nv)
        REFERENCES nhanvien(ma_nv),

    CONSTRAINT fk_thcd_cd
        FOREIGN KEY (ma_cd)
        REFERENCES congdoan(ma_cd)
) ENGINE=InnoDB;

CREATE TABLE congviec (
    ma_cv VARCHAR(10) PRIMARY KEY,
    ten_cv VARCHAR(150) NOT NULL,
    loai_cv VARCHAR(50),
    muc_luong_nang_suat DECIMAL(12,2)
) ENGINE=InnoDB;

CREATE TABLE thuchien_congviec (
    ma_nv VARCHAR(15),
    ma_cv VARCHAR(10),
    thang INT CHECK (thang BETWEEN 1 AND 12),
    nam INT,
    ket_qua TEXT,
    dung_han BOOLEAN,

    PRIMARY KEY (ma_nv, ma_cv, thang, nam),

    CONSTRAINT fk_thcv_nv
        FOREIGN KEY (ma_nv)
        REFERENCES nhanvien(ma_nv),

    CONSTRAINT fk_thcv_cv
        FOREIGN KEY (ma_cv)
        REFERENCES congviec(ma_cv)
) ENGINE=InnoDB;

CREATE TABLE bangluong (
    ma_bang_luong INT AUTO_INCREMENT PRIMARY KEY,
    ma_nv VARCHAR(15) NOT NULL,
    thang INT CHECK (thang BETWEEN 1 AND 12),
    nam INT,
    luong_cung DECIMAL(12,2),
    luong_trach_nhiem DECIMAL(12,2),
    luong_nang_suat DECIMAL(12,2),
    tong_tien_phat DECIMAL(12,2),
    tong_luong DECIMAL(12,2),

    CONSTRAINT fk_bl_nv
        FOREIGN KEY (ma_nv)
        REFERENCES nhanvien(ma_nv)
) ENGINE=InnoDB;

CREATE TABLE chitiet_phat (
    ma_phat INT AUTO_INCREMENT PRIMARY KEY,
    ma_bang_luong INT NOT NULL,
    ly_do VARCHAR(255),
    ty_le_phat DECIMAL(5,2),
    so_tien_phat DECIMAL(12,2),

    CONSTRAINT fk_phat_bangluong
        FOREIGN KEY (ma_bang_luong)
        REFERENCES bangluong(ma_bang_luong)
) ENGINE=InnoDB;

