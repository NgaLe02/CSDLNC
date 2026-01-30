CREATE DATABASE IF NOT EXISTS quan_ly_nhan_su_du_an
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE quan_ly_nhan_su_du_an;

-- 1. Bậc lương
CREATE TABLE bac_luong (
    ma_bac_luong VARCHAR(10) PRIMARY KEY,
    ten_bac_luong NVARCHAR(50) NOT NULL,
    muc_luong_co_ban DECIMAL(18, 2) NOT NULL
);

-- 2. Phòng ban
CREATE TABLE phong_ban (
    ma_phong_ban VARCHAR(10) PRIMARY KEY,
    ten_phong_ban NVARCHAR(100) NOT NULL,
    ngay_thanh_lap DATE,
    loai_phong NVARCHAR(50) NOT NULL
);

-- 3. Nhân viên
CREATE TABLE nhan_vien (
    ma_nhan_vien VARCHAR(15) PRIMARY KEY, -- Định dạng: MaPB + 4 số
    ho_ten NVARCHAR(100) NOT NULL,
    ngay_sinh DATE,
    gioi_tinh NVARCHAR(10),,

    CONSTRAINT CK_CD_KET_QUA_VALUE
    CHECK (ket_qua IN ('Nam','Nu','Khac')),
);

-- 4. Chức vụ
CREATE TABLE chuc_vu (
    ma_nhan_vien VARCHAR(15) REFERENCES nhan_vien(ma_nhan_vien),
    ma_phong_ban VARCHAR(10) REFERENCES phong_ban(ma_phong_ban),
    ten_chuc_vu ENUM('TruongPhong','PhoPhong','NhanVien'), 
    ngay_ap_dung DATE NOT NULL,
    PRIMARY KEY (ma_nhan_vien, ma_phong_ban, ngay_ap_dung)
);

-- 5. Xếp bậc lương
CREATE TABLE xep_bac_luong (
    ma_bac_luong VARCHAR(10) REFERENCES bac_luong(ma_bac_luong),
    ma_nhan_vien VARCHAR(15) REFERENCES nhan_vien(ma_nhan_vien),
    ngay_ap_dung DATE NOT NULL,
    PRIMARY KEY (ma_bac_luong, ma_nhan_vien, ngay_ap_dung)
);

-- 6. Loại dự án 
CREATE TABLE loai_du_an (
    ma_loai_du_an VARCHAR(10) PRIMARY KEY,
    ten_loai_du_an NVARCHAR(100) NOT NULL,
    so_nhan_vien_toi_da INT NOT NULL,
    mo_ta NVARCHAR(MAX)
);

-- 7. Dự án
CREATE TABLE du_an (
    ma_du_an VARCHAR(10) PRIMARY KEY,
    ten_du_an NVARCHAR(100) NOT NULL,
    ngay_bat_dau DATE NOT NULL,
    ngay_ket_thuc_du_kien DATE NOT NULL,
    ngay_ket_thuc_thuc_te DATE,
    trang_thai NVARCHAR(50) ENUM('ChuaThucHien','DangThucHien','DaThucHien'),
    ma_loai_du_an VARCHAR(10) REFERENCES loai_du_an(ma_loai_du_an) NOT NULL,
    ma_phong_quan_ly VARCHAR(10) REFERENCES phong_ban(ma_phong_ban)  NOT NULL,

    CONSTRAINT CK_DUAN_NGAY_KET_THUC
    CHECK (
        ngay_ket_thuc_thuc_te IS NULL
        OR ngay_ket_thuc_thuc_te >= ngay_bat_dau
    )
);

-- 8. Tham gia dự án
CREATE TABLE tham_gia_du_an (
    ma_nhan_vien VARCHAR(15) REFERENCES nhan_vien(ma_nhan_vien),
    ma_du_an VARCHAR(10) REFERENCES du_an(ma_du_an),
    thang INT NOT NULL CHECK (thang BETWEEN 1 AND 12),
    nam INT NOT NULL CHECK (nam > 2000),
    vai_tro ENUM('ChuTri','ThanhVien'), 
    luong_trach_nhiem DECIMAL(18, 2) NOT NULL,
    PRIMARY KEY (ma_nhan_vien, ma_du_an, thang, nam)
);

-- 9. Công đoạn (Có ràng buộc thứ tự thực hiện)
CREATE TABLE cong_doan (
    stt_cong_doan INT,
    ma_du_an VARCHAR(10) REFERENCES du_an(ma_du_an),
    ten_cong_doan NVARCHAR(100) NOT NULL,
    thu_tu INT NOT NULL,
    ngay_bat_dau DATE NOT NULL,
    ngay_hoan_thanh_du_kien DATE NOT NULL,
    ngay_hoan_thanh_thuc_te DATE,
    ket_qua NVARCHAR(10),
    trang_thai_tien_do ENUM('ChuaThucHien','DangThucHien','DaThucHien'), 
    PRIMARY KEY (stt_cong_doan, ma_du_an),
    CONSTRAINT CK_DUAN_NGAY_KET_THUC
    CHECK (
        ngay_hoan_thanh_thuc_te IS NULL
        OR ngay_hoan_thanh_thuc_te >= ngay_bat_dau
    ),

    CONSTRAINT CK_CD_KET_QUA
    CHECK (
        ngay_hoan_thanh_thuc_te IS NULL
        OR ket_qua IS NOT NULL
    ),

    CONSTRAINT CK_CD_KET_QUA_VALUE
    CHECK (ket_qua IN ('KEM','TOT')),
);

-- 10. Thực hiện công đoạn
CREATE TABLE thuc_hien_cong_doan (
    stt_cong_doan INT,
    ma_du_an VARCHAR(10),
    ma_nhan_vien VARCHAR(15) REFERENCES nhan_vien(ma_nhan_vien),
    vai_tro ENUM('ChuTri','ThanhVien'), 
    FOREIGN KEY (stt_cong_doan, ma_du_an) REFERENCES cong_doan(stt_cong_doan, ma_du_an),
    PRIMARY KEY (stt_cong_doan, ma_du_an, ma_nhan_vien)
);

-- 11. Loại công việc (Cho nhân viên không làm dự án)
CREATE TABLE loai_cong_viec (
    ma_loai_cv VARCHAR(10) PRIMARY KEY,
    ten_loai_cong_viec NVARCHAR(100) NOT NULL,
    muc_luong_nang_suat DECIMAL(18, 2) NOT NULL
);

-- 12. Công việc
CREATE TABLE cong_viec (
    ma_cong_viec VARCHAR(10) PRIMARY KEY,
    ten_cong_viec NVARCHAR(100) NOT NULL,
    ma_loai_cv VARCHAR(10) REFERENCES loai_cong_viec(ma_loai_cv) NOT NULL,
    ngay_bat_dau DATE NOT NULL,
    ngay_hoan_thanh_du_kien DATE NOT NULL,
    ngay_hoan_thanh_thuc_te DATE,
    ket_qua NVARCHAR(10),
    trang_thai_tien_do ENUM('ChuaThucHien','DangThucHien','DaThucHien'),
    CONSTRAINT CK_DUAN_NGAY_KET_THUC
    CHECK (
        ngay_hoan_thanh_thuc_te IS NULL
        OR ngay_hoan_thanh_thuc_te >= ngay_bat_dau
    ),

    CONSTRAINT CK_CD_KET_QUA
    CHECK (
        ngay_hoan_thanh_thuc_te IS NULL
        OR ket_qua IS NOT NULL
    ),

    CONSTRAINT CK_CD_KET_QUA_VALUE
    CHECK (ket_qua IN ('KEM','TOT')),
);

-- 13. Thực hiện công việc
CREATE TABLE thuc_hien_cong_viec (
    ma_nhan_vien VARCHAR(15) REFERENCES nhan_vien(ma_nhan_vien),
    ma_cong_viec VARCHAR(10) REFERENCES cong_viec(ma_cong_viec),
    PRIMARY KEY (ma_nhan_vien, ma_cong_viec)
);

-- 14. Bảng lương hàng tháng
CREATE TABLE bang_luong (
    ma_bang_luong IDENTITY(1,1) PRIMARY KEY,
    thang INT NOT NULL CHECK (thang BETWEEN 1 AND 12),
    nam INT NOT NULL CHECK (nam > 2000),
    ma_nhan_vien VARCHAR(15) REFERENCES nhan_vien(ma_nhan_vien) NOT NULL,
    luong_cung DECIMAL(18, 2) NOT NULL,
    luong_trach_nhiem DECIMAL(18, 2) NOT NULL,
    luong_nang_suat DECIMAL(18, 2) NOT NULL,
    so_phan_viec_khong_tot INT NOT NULL, -- Số lần trễ hạn/kết quả kém
    -- tong_luong AS (luong_cung + luong_trach_nhiem + luong_nang_suat) * (1 - (so_phan_viec_khong_tot * 0.08))
    CONSTRAINT UQ_Luong_NhanVien_Thang_Nam UNIQUE (ma_nhan_vien, thang, nam)
);