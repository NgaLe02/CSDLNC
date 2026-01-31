CREATE DATABASE IF NOT EXISTS quan_ly_nhan_su_du_an
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE quan_ly_nhan_su_du_an;

-- 1. Bậc lương
CREATE TABLE bac_luong (
    ma_bac_luong bigint auto_increment PRIMARY KEY,
    ten_bac_luong VARCHAR(50) NOT NULL,
    muc_luong_co_ban DECIMAL(18,2) NOT NULL
) ENGINE=InnoDB;

-- 2. Phòng ban
CREATE TABLE phong_ban (
    ma_phong_ban bigint auto_increment PRIMARY KEY,
    ten_phong_ban VARCHAR(100) NOT NULL,
    ngay_thanh_lap DATE,
    loai_phong VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- 3. Nhân viên
CREATE TABLE nhan_vien (
    ma_nhan_vien VARCHAR(15) PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    ngay_sinh DATE,
    gioi_tinh VARCHAR(10),
    hoat_dong boolean,
    CONSTRAINT CK_NV_GIOI_TINH
        CHECK (gioi_tinh IN ('Nam','Nu','Khac'))
) ENGINE=InnoDB;

-- 4. Chức vụ
CREATE TABLE chuc_vu (
    ma_nhan_vien VARCHAR(15),
    ma_phong_ban bigint,
    ten_chuc_vu ENUM('TruongPhong','PhoPhong','NhanVien'),
    ngay_ap_dung DATE NOT NULL,
    PRIMARY KEY (ma_nhan_vien, ma_phong_ban, ngay_ap_dung),
    CONSTRAINT FK_CV_NV FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien),
    CONSTRAINT FK_CV_PB FOREIGN KEY (ma_phong_ban) REFERENCES phong_ban(ma_phong_ban)
) ENGINE=InnoDB;

-- 5. Xếp bậc lương
CREATE TABLE xep_bac_luong (
    ma_bac_luong bigint,
    ma_nhan_vien VARCHAR(15),
    ngay_ap_dung DATE NOT NULL,
    PRIMARY KEY (ma_bac_luong, ma_nhan_vien, ngay_ap_dung),
    CONSTRAINT FK_XBL_BL FOREIGN KEY (ma_bac_luong) REFERENCES bac_luong(ma_bac_luong),
    CONSTRAINT FK_XBL_NV FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien)
) ENGINE=InnoDB;

-- 6. Loại dự án
CREATE TABLE loai_du_an (
    ma_loai_du_an bigint auto_increment PRIMARY KEY,
    ten_loai_du_an VARCHAR(100) NOT NULL,
    so_nhan_vien_toi_da INT NOT NULL,
    mo_ta TEXT
) ENGINE=InnoDB;

-- 7. Dự án
CREATE TABLE du_an (
    ma_du_an bigint auto_increment PRIMARY KEY,
    ten_du_an VARCHAR(100) NOT NULL,
    ngay_bat_dau DATE NOT NULL,
    ngay_ket_thuc_du_kien DATE NOT NULL,
    ngay_ket_thuc_thuc_te DATE,
    trang_thai ENUM('ChuaThucHien','DangThucHien','DaThucHien'),
    ma_loai_du_an bigint NOT NULL,
    ma_phong_quan_ly bigint NOT NULL,
    CONSTRAINT FK_DA_LDA FOREIGN KEY (ma_loai_du_an) REFERENCES loai_du_an(ma_loai_du_an),
    CONSTRAINT FK_DA_PB FOREIGN KEY (ma_phong_quan_ly) REFERENCES phong_ban(ma_phong_ban),
    CONSTRAINT CK_DA_NGAY_KT
        CHECK (ngay_ket_thuc_thuc_te IS NULL OR ngay_ket_thuc_thuc_te >= ngay_bat_dau)
) ENGINE=InnoDB;

-- 8. Tham gia dự án
CREATE TABLE tham_gia_du_an (
    ma_nhan_vien VARCHAR(15),
    ma_du_an bigint,
    thang INT NOT NULL CHECK (thang BETWEEN 1 AND 12),
    nam INT NOT NULL CHECK (nam > 2000),
    vai_tro ENUM('ChuTri','ThanhVien'),
    luong_trach_nhiem DECIMAL(18,2) NOT NULL,
    PRIMARY KEY (ma_nhan_vien, ma_du_an, thang, nam),
    CONSTRAINT FK_TGDA_NV FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien),
    CONSTRAINT FK_TGDA_DA FOREIGN KEY (ma_du_an) REFERENCES du_an(ma_du_an)
) ENGINE=InnoDB;

-- 9. Công đoạn
CREATE TABLE cong_doan (
    stt_cong_doan INT,
    ma_du_an bigint,
    ten_cong_doan VARCHAR(100) NOT NULL,
    thu_tu INT NOT NULL,
    ngay_bat_dau DATE NOT NULL,
    ngay_hoan_thanh_du_kien DATE NOT NULL,
    ngay_hoan_thanh_thuc_te DATE,
    ket_qua VARCHAR(10),
    trang_thai_tien_do ENUM('ChuaThucHien','DangThucHien','DaThucHien'),
    PRIMARY KEY (stt_cong_doan, ma_du_an),
    CONSTRAINT FK_CD_DA FOREIGN KEY (ma_du_an) REFERENCES du_an(ma_du_an),
    CONSTRAINT CK_CD_NGAY_KT
        CHECK (ngay_hoan_thanh_thuc_te IS NULL OR ngay_hoan_thanh_thuc_te >= ngay_bat_dau),
    CONSTRAINT CK_CD_KQ
        CHECK (ngay_hoan_thanh_thuc_te IS NULL OR ket_qua IS NOT NULL),
    CONSTRAINT CK_CD_KQ_VALUE
        CHECK (ket_qua IN ('KEM','TOT'))
) ENGINE=InnoDB;

-- 10. Thực hiện công đoạn
CREATE TABLE thuc_hien_cong_doan (
    stt_cong_doan INT,
    ma_du_an bigint,
    ma_nhan_vien VARCHAR(15),
    vai_tro ENUM('ChuTri','ThanhVien'),
    PRIMARY KEY (stt_cong_doan, ma_du_an, ma_nhan_vien),
    CONSTRAINT FK_THCD_CD FOREIGN KEY (stt_cong_doan, ma_du_an)
        REFERENCES cong_doan(stt_cong_doan, ma_du_an),
    CONSTRAINT FK_THCD_NV FOREIGN KEY (ma_nhan_vien)
        REFERENCES nhan_vien(ma_nhan_vien)
) ENGINE=InnoDB;

-- 11. Loại công việc
CREATE TABLE loai_cong_viec (
    ma_loai_cv bigint auto_increment PRIMARY KEY,
    ten_loai_cong_viec VARCHAR(100) NOT NULL,
    muc_luong_nang_suat DECIMAL(18,2) NOT NULL
) ENGINE=InnoDB;

-- 12. Công việc
CREATE TABLE cong_viec (
    ma_cong_viec bigint auto_increment PRIMARY KEY,
    ten_cong_viec VARCHAR(100) NOT NULL,
    ma_loai_cv bigint NOT NULL,
    ngay_bat_dau DATE NOT NULL,
    ngay_hoan_thanh_du_kien DATE NOT NULL,
    ngay_hoan_thanh_thuc_te DATE,
    ket_qua VARCHAR(10),
    trang_thai_tien_do ENUM('ChuaThucHien','DangThucHien','DaThucHien'),
    CONSTRAINT FK_CV_LCV FOREIGN KEY (ma_loai_cv) REFERENCES loai_cong_viec(ma_loai_cv),
    CONSTRAINT CK_CV_NGAY_KT
        CHECK (ngay_hoan_thanh_thuc_te IS NULL OR ngay_hoan_thanh_thuc_te >= ngay_bat_dau),
    CONSTRAINT CK_CV_KQ
        CHECK (ngay_hoan_thanh_thuc_te IS NULL OR ket_qua IS NOT NULL),
    CONSTRAINT CK_CV_KQ_VALUE
        CHECK (ket_qua IN ('KEM','TOT'))
) ENGINE=InnoDB;

-- 13. Thực hiện công việc
CREATE TABLE thuc_hien_cong_viec (
    ma_nhan_vien VARCHAR(15),
    ma_cong_viec bigint,
    PRIMARY KEY (ma_nhan_vien, ma_cong_viec),
    CONSTRAINT FK_THCV_NV FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien),
    CONSTRAINT FK_THCV_CV FOREIGN KEY (ma_cong_viec) REFERENCES cong_viec(ma_cong_viec)
) ENGINE=InnoDB;

-- 14. Bảng lương
CREATE TABLE bang_luong (
    ma_bang_luong BIGINT AUTO_INCREMENT PRIMARY KEY,
    thang TINYINT NOT NULL CHECK (thang BETWEEN 1 AND 12),
    nam INT NOT NULL CHECK (nam > 2000),
    ma_nhan_vien VARCHAR(15) NOT NULL,
    luong_cung DECIMAL(18,2) NOT NULL,
    luong_trach_nhiem DECIMAL(18,2) NOT NULL,
    luong_nang_suat DECIMAL(18,2) NOT NULL,
    so_phan_viec_khong_tot INT NOT NULL,
    CONSTRAINT FK_BL_NV FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien),
    CONSTRAINT UQ_BL_NV_THANG_NAM UNIQUE (ma_nhan_vien, thang, nam)
) ENGINE=InnoDB;
