-- BẢNG XE
DELIMITER $$
-- 1,2. Kiểm tra các lỗi như not null, unique, foreign key khi insert, update
CREATE TRIGGER trg_xe_before_insert
BEFORE INSERT ON Xe
FOR EACH ROW
BEGIN
    DECLARE msg_text VARCHAR(255);

    -- ===== NOT NULL + rỗng =====
    IF NEW.bienSo IS NULL OR NEW.bienSo = '' THEN
        SET msg_text = 'Biển số không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tinhTrang IS NULL OR NEW.tinhTrang = '' THEN
        SET msg_text = 'Tình trạng không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maLoaiXe IS NULL THEN
        SET msg_text = 'Mã loại xe không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== UNIQUE Biển số =====
    IF EXISTS (SELECT 1 FROM Xe WHERE bienSo = NEW.bienSo) THEN
        SET msg_text = CONCAT('Biển số ', NEW.bienSo, ' đã tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== CHECK Tình trạng =====
    IF NEW.tinhTrang NOT IN (
        'Đang hoạt động',
        'Sắp bảo dưỡng',
        'Đang bảo dưỡng',
        'Quá hạn bảo dưỡng',
        'Ngừng hoạt động'
    ) THEN
        SET msg_text = CONCAT('Tình trạng không hợp lệ: ', NEW.tinhTrang);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== FOREIGN KEY Loại xe =====
    IF NOT EXISTS (SELECT 1 FROM LoaiXe WHERE maLoaiXe = NEW.maLoaiXe) THEN
        SET msg_text = CONCAT('Loại xe ', NEW.maLoaiXe, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

END;

CREATE TRIGGER trg_xe_before_update
BEFORE UPDATE ON Xe
FOR EACH ROW
BEGIN
    DECLARE msg_text VARCHAR(255);

    -- ===== NOT NULL + rỗng =====
    IF NEW.bienSo IS NULL OR NEW.bienSo = '' THEN
        SET msg_text = 'Biển số không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tinhTrang IS NULL OR NEW.tinhTrang = '' THEN
        SET msg_text = 'Tình trạng không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maLoaiXe IS NULL THEN
        SET msg_text = 'Mã loại xe không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== UNIQUE Biển số =====
    IF NEW.bienSo <> OLD.bienSo THEN
        IF EXISTS (
            SELECT 1
            FROM Xe
            WHERE bienSo = NEW.bienSo
            AND maXe <> OLD.maXe  -- loại trừ bản ghi hiện tại
        ) THEN
            SET msg_text = CONCAT('Biển số ', NEW.bienSo, ' đã tồn tại');
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
        END IF;
    END IF;


    -- ===== CHECK Tình trạng =====
    IF NEW.tinhTrang NOT IN (
        'Đang hoạt động',
        'Sắp bảo dưỡng',
        'Đang bảo dưỡng',
        'Quá hạn bảo dưỡng',
        'Ngừng hoạt động'
    ) THEN
        SET msg_text = CONCAT('Tình trạng không hợp lệ: ', NEW.tinhTrang);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== FOREIGN KEY Loại xe =====
    IF NOT EXISTS (SELECT 1 FROM LoaiXe WHERE maLoaiXe = NEW.maLoaiXe) THEN
        SET msg_text = CONCAT('Loại xe ', NEW.maLoaiXe, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;
END;

-- 3. Tạo mã xe
create trigger trg_gen_maXe
    before insert
    on xe
    for each row
BEGIN
    DECLARE newId INT;

    -- Lấy số lớn nhất hiện có (bỏ chữ X đi rồi cast sang số)
    SELECT IFNULL(MAX(CAST(SUBSTRING(maXe, 2) AS UNSIGNED)), 0) + 1
    INTO newId
    FROM Xe;

    -- Gán mã mới cho bản ghi với format: X001, X002, ...
    SET NEW.maXe = CONCAT('X', LPAD(newId, 3, '0'));
END;

DELIMITER ;

-- BẢNG TUYẾN ĐƯỜNG:
DELIMITER $$

-- 1, 2 Kiểm tra các lỗi như not null, unique, foreign key khi insert, update
create trigger trg_tuyenduong_before_insert
    before insert
    on tuyenduong
    for each row
BEGIN
    DECLARE msg TEXT;

    -- Kiểm tra điểm khởi hành
    IF NEW.diemKhoiHanh IS NULL OR NEW.diemKhoiHanh = '' THEN
        SET msg = 'Lỗi: Điểm khởi hành không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra điểm đến
    IF NEW.diemDen IS NULL OR NEW.diemDen = '' THEN
        SET msg = 'Lỗi: Điểm đến không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Không cho khởi hành = điểm đến
    IF NEW.diemKhoiHanh = NEW.diemDen THEN
        SET msg = CONCAT('Lỗi: Điểm khởi hành "', NEW.diemKhoiHanh,
                         '" và điểm đến "', NEW.diemDen,
                         '" không được trùng nhau');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra độ phức tạp
    IF NEW.doPhucTap NOT IN (1,2,3) THEN
        SET msg = CONCAT('Lỗi: Độ phức tạp "', NEW.doPhucTap, '" không hợp lệ (chỉ nhận 1,2,3)');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra khoảng cách
    IF NEW.khoangCach <= 0 THEN
        SET msg = 'Lỗi: Khoảng cách phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra thời gian ước tính (nếu nhập)
    IF NEW.thoiGianUocTinh IS NOT NULL AND NEW.thoiGianUocTinh <= 0 THEN
        SET msg = 'Lỗi: Thời gian ước tính phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END;

create trigger trg_tuyenduong_before_update
    before update
    on tuyenduong
    for each row
BEGIN
    DECLARE msg TEXT;

    -- Kiểm tra điểm khởi hành
    IF NEW.diemKhoiHanh IS NULL OR NEW.diemKhoiHanh = '' THEN
        SET msg = 'Lỗi: Điểm khởi hành không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra điểm đến
    IF NEW.diemDen IS NULL OR NEW.diemDen = '' THEN
        SET msg = 'Lỗi: Điểm đến không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Không cho khởi hành = điểm đến
    IF NEW.diemKhoiHanh = NEW.diemDen THEN
        SET msg = CONCAT('Lỗi: Điểm khởi hành "', NEW.diemKhoiHanh,
                         '" và điểm đến "', NEW.diemDen,
                         '" không được trùng nhau');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra độ phức tạp
    IF NEW.doPhucTap NOT IN (1,2,3) THEN
        SET msg = CONCAT('Lỗi: Độ phức tạp "', NEW.doPhucTap, '" không hợp lệ (chỉ nhận 1,2,3)');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra khoảng cách
    IF NEW.khoangCach <= 0 THEN
        SET msg = 'Lỗi: Khoảng cách phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra thời gian ước tính (nếu nhập)
    IF NEW.thoiGianUocTinh IS NOT NULL AND NEW.thoiGianUocTinh <= 0 THEN
        SET msg = 'Lỗi: Thời gian ước tính phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END;

-- 3, 4. Kiểm tra với khoangCach trong TuyenDuong phải nằm trong khoảng (khoangCachTu, khoangCachDen) của LuongTuyenDuong mà nó tham chiếu (maLuongTuyen) khi insert và update có phù hợp hay không
create trigger trg_tuyenduong_before_insert_checkLuongTuyenDuong
    before insert
    on tuyenduong
    for each row
BEGIN
    DECLARE kcTu DECIMAL(10,2);
    DECLARE kcDen DECIMAL(10,2);

    -- Lấy khoảng cách từ bảng LuongTuyenDuong
    SELECT khoangCachTu, khoangCachDen
    INTO kcTu, kcDen
    FROM LuongTuyenDuong
    WHERE maLuongTuyen = NEW.maLuongTuyen;

    -- Kiểm tra nếu khoangCach không nằm trong khoảng
    IF NEW.khoangCach < kcTu OR NEW.khoangCach > kcDen THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Khoảng cách không phù hợp với LuongTuyenDuong';
    END IF;
END;

create trigger trg_tuyenduong_before_update_checkLuongTuyenDuong
    before update
    on tuyenduong
    for each row
BEGIN
    DECLARE kcTu DECIMAL(10,2);
    DECLARE kcDen DECIMAL(10,2);

    SELECT khoangCachTu, khoangCachDen
    INTO kcTu, kcDen
    FROM LuongTuyenDuong
    WHERE maLuongTuyen = NEW.maLuongTuyen;

    IF NEW.khoangCach < kcTu OR NEW.khoangCach > kcDen THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Khoảng cách không phù hợp với LuongTuyenDuong';
    END IF;
END;

-- 5. Tạo mã tuyến đường mỗi khi insert
create trigger trg_gen_maTuyen
    before insert
    on tuyenduong
    for each row
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
END;


DELIMITER ;

-- BẢNG GIÁ VÉ:
DELIMITER $$

-- 1, 2 Kiểm tra các lỗi như not null, unique, foreign key khi insert, update
create trigger trg_giave_before_insert
    before insert
    on giave
    for each row
BEGIN
    DECLARE msg TEXT;

    -- Kiểm tra giá vé
    IF NEW.giaVe IS NULL OR NEW.giaVe <= 0 THEN
        SET msg = 'Giá vé phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra ngày bắt đầu
    IF NEW.ngayBatDau IS NULL THEN
        SET msg = 'Ngày bắt đầu không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra ngày kết thúc
    IF NEW.ngayKetThuc IS NOT NULL AND NEW.ngayKetThuc <= NEW.ngayBatDau THEN
        SET msg = CONCAT('Ngày kết thúc (', NEW.ngayKetThuc,
                         ') phải lớn hơn ngày bắt đầu (', NEW.ngayBatDau, ')');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra mã tuyến
    IF NEW.maTuyen IS NULL OR NEW.maTuyen = '' THEN
        SET msg = 'Tuyến đường không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra mã mùa
    IF NEW.maMua IS NULL OR NEW.maMua = '' THEN
        SET msg = 'Mùa không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END;

create trigger trg_giave_before_update
    before update
    on giave
    for each row
BEGIN
    DECLARE msg TEXT;

    -- Kiểm tra giá vé
    IF NEW.giaVe IS NULL OR NEW.giaVe <= 0 THEN
        SET msg = 'Giá vé phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra ngày bắt đầu
    IF NEW.ngayBatDau IS NULL THEN
        SET msg = 'Ngày bắt đầu không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra ngày kết thúc
    IF NEW.ngayKetThuc IS NOT NULL AND NEW.ngayKetThuc <= NEW.ngayBatDau THEN
        SET msg = CONCAT('Ngày kết thúc (', NEW.ngayKetThuc,
                         ') phải lớn hơn ngày bắt đầu (', NEW.ngayBatDau, ')');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra mã tuyến
    IF NEW.maTuyen IS NULL OR NEW.maTuyen = '' THEN
        SET msg = 'Tuyến đường không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra mã mùa
    IF NEW.maMua IS NULL OR NEW.maMua = '' THEN
        SET msg = 'Mùa không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END;

-- 3, 4. Ngày kết thúc phải lớn hơn ngày bắt đầu, trong cùng khoảng thời gian chỉ có 1 mã tuyến, mã mùa có hiệu lực:
create trigger trg_giave_before_insert_chkTime
    before insert
    on giave
    for each row
BEGIN
    -- 1. Kiểm tra ngày
    IF NEW.ngayKetThuc IS NOT NULL AND NEW.ngayKetThuc < NEW.ngayBatDau THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
    END IF;

    -- 2. Kiểm tra overlap
    IF EXISTS (
        SELECT 1
        FROM GiaVe g
        WHERE g.maTuyen = NEW.maTuyen
          AND g.maMua   = NEW.maMua
          AND NEW.ngayBatDau <= COALESCE(g.ngayKetThuc, '9999-12-31')
          AND g.ngayBatDau   <= COALESCE(NEW.ngayKetThuc, '9999-12-31')
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Khoảng thời gian giá vé bị trùng (INSERT)';
    END IF;
END;

create trigger trg_giave_before_update_chkTime
    before update
    on giave
    for each row
BEGIN
    -- 1. Kiểm tra ngày
    IF NEW.ngayKetThuc IS NOT NULL AND NEW.ngayKetThuc < NEW.ngayBatDau THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
    END IF;

    -- 2. Kiểm tra overlap (loại bỏ chính bản ghi đang update)
    IF EXISTS (
        SELECT 1
        FROM GiaVe g
        WHERE g.maTuyen = NEW.maTuyen
          AND g.maMua   = NEW.maMua
          AND NOT (g.maTuyen = OLD.maTuyen
                   AND g.maMua = OLD.maMua
                   AND g.maGiaVe = OLD.maGiaVe)
          AND NEW.ngayBatDau <= COALESCE(g.ngayKetThuc, '9999-12-31')
          AND g.ngayBatDau   <= COALESCE(NEW.ngayKetThuc, '9999-12-31')
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Khoảng thời gian giá vé bị trùng (UPDATE)';
    END IF;
END;

-- 5. Không cho thay đổi ngayKetThuc nếu ngayKetThuc mới < ngayKhoiHanh của bất kỳ ChuyenXe đang tham chiếu
create trigger trg_giave_before_update_chkChangeNgayKetThuc
    before update
    on giave
    for each row
BEGIN
    DECLARE v_count INT;

    -- Chỉ kiểm tra khi ngayKetThuc được thay đổi và khác NULL
    IF NEW.ngayKetThuc IS NOT NULL AND NEW.ngayKetThuc <> OLD.ngayKetThuc THEN

        -- Kiểm tra xem có chuyến xe nào dùng giá vé này và có ngayKhoiHanh > ngayKetThuc mới không
        SELECT COUNT(*) INTO v_count
        FROM ChuyenXe
        WHERE maTuyen = NEW.maTuyen
          AND maMua = NEW.maMua
          AND maGiaVe = NEW.maGiaVe
          AND DATE(ngayGioKhoiHanh) > NEW.ngayKetThuc;

        IF v_count > 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Không thể cập nhật: ngày kết thúc giá vé nhỏ hơn ngày khởi hành của chuyến xe đang tham chiếu';
        END IF;
    END IF;
END;


-- 6. Tạo mã giá vé dựa trên mã tuyến đường và mã mùa mỗi khi insert
create trigger trg_gen_maGiaVe
    before insert
    on giave
    for each row
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
END;

DELIMITER ;

-- BẢNG LƯƠNG TUYẾN ĐƯỜNG:
DELIMITER $$

-- 1, 2 Kiểm tra các lỗi như not null, unique, foreign key khi insert, update
create trigger trg_luongtuyenduong_before_insert
    before insert
    on luongtuyenduong
    for each row
BEGIN
    DECLARE msg TEXT;

    -- Kiểm tra độ phức tạp
    IF NEW.doPhucTap NOT IN (1,2,3) THEN
        SET msg = CONCAT('Độ phức tạp "', NEW.doPhucTap, '" không hợp lệ (chỉ nhận 1,2,3)');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra khoảng cách từ
    IF NEW.khoangCachTu IS NULL OR NEW.khoangCachTu < 0 THEN
        SET msg = 'Khoảng cách TỪ phải >= 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra khoảng cách đến
    IF NEW.khoangCachDen IS NULL OR NEW.khoangCachDen <= 0 THEN
        SET msg = 'hoảng cách ĐẾN phải > 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Khoảng cách từ < đến
    IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
        SET msg = CONCAT('Khoảng cách TỪ (', NEW.khoangCachTu,
                         ') phải nhỏ hơn khoảng cách ĐẾN (', NEW.khoangCachDen, ')');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra lương cơ bản
    IF NEW.luongCoBan IS NULL OR NEW.luongCoBan <= 0 THEN
        SET msg = 'Lương cơ bản phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END;

create trigger trg_luongtuyenduong_before_update
    before update
    on luongtuyenduong
    for each row
BEGIN
    DECLARE msg TEXT;

    -- Kiểm tra độ phức tạp
    IF NEW.doPhucTap NOT IN (1,2,3) THEN
        SET msg = CONCAT('Độ phức tạp "', NEW.doPhucTap, '" không hợp lệ (chỉ nhận 1,2,3)');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra khoảng cách từ
    IF NEW.khoangCachTu IS NULL OR NEW.khoangCachTu < 0 THEN
        SET msg = 'Khoảng cách TỪ phải >= 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra khoảng cách đến
    IF NEW.khoangCachDen IS NULL OR NEW.khoangCachDen <= 0 THEN
        SET msg = 'hoảng cách ĐẾN phải > 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Khoảng cách từ < đến
    IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
        SET msg = CONCAT('Khoảng cách TỪ (', NEW.khoangCachTu,
                         ') phải nhỏ hơn khoảng cách ĐẾN (', NEW.khoangCachDen, ')');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra lương cơ bản
    IF NEW.luongCoBan IS NULL OR NEW.luongCoBan <= 0 THEN
        SET msg = 'Lương cơ bản phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END;

-- 3, 4. Trong cùng 1 khoảng cách chỉ có 1 mức lương tồn tại
create trigger trg_luongtuyenduong_before_insert_checkTrungLuong
    before insert
    on luongtuyenduong
    for each row
BEGIN
    IF EXISTS (
        SELECT 1
        FROM LuongTuyenDuong
        WHERE doPhucTap = NEW.doPhucTap
          AND NOT (NEW.khoangCachDen <= khoangCachTu OR NEW.khoangCachTu >= khoangCachDen)
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Khoảng cách trùng với 1 mức lương đã tồn tại';
    END IF;
END;

create trigger trg_luongtuyenduong_before_update_checkTrungLuong
    before update
    on luongtuyenduong
    for each row
BEGIN
    IF EXISTS (
        SELECT 1
        FROM LuongTuyenDuong
        WHERE doPhucTap = NEW.doPhucTap
          AND maLuongTuyen <> NEW.maLuongTuyen
          AND NOT (NEW.khoangCachDen <= khoangCachTu OR NEW.khoangCachTu >= khoangCachDen)
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Khoảng cách trùng với 1 mức lương đã tồn tại';
    END IF;
END;

-- BẢNG HẠN ĐĂNG KIỂM
DELIMITER $$

-- 1, 2 Kiểm tra các lỗi như not null, unique, foreign key khi insert, update
create trigger trg_handangkiem_before_insert
    before insert
    on handangkiem
    for each row
BEGIN
     DECLARE msg TEXT;

    -- Kiểm tra chi phí
    IF NEW.chiPhi IS NOT NULL AND NEW.chiPhi < 0 THEN
        SET msg = 'Chi phí đăng kiểm không được âm';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra ngày đăng kiểm
    IF NEW.ngayDangKiem IS NULL THEN
        SET msg = 'Ngày đăng kiểm không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra hiệu lực
    IF NEW.hieuLuc IS NULL OR NEW.hieuLuc <= 0 THEN
        SET msg = 'Hiệu lực (số ngày) phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra xe
    IF NEW.maXe IS NULL OR NEW.maXe = '' THEN
        SET msg = 'Xe không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra trùng ngày đăng kiểm của cùng 1 xe
    IF EXISTS (
        SELECT 1 FROM HanDangKiem
        WHERE maXe = NEW.maXe
          AND ngayDangKiem = NEW.ngayDangKiem
    ) THEN
        SET msg = CONCAT('Xe ', NEW.maXe, ' đã có đăng kiểm vào ngày ', NEW.ngayDangKiem);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END;



create trigger trg_handangkiem_before_update
    before update
    on handangkiem
    for each row
BEGIN
    DECLARE msg TEXT;

    -- Kiểm tra chi phí
    IF NEW.chiPhi IS NOT NULL AND NEW.chiPhi < 0 THEN
        SET msg = 'Chi phí đăng kiểm không được âm';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra ngày đăng kiểm
    IF NEW.ngayDangKiem IS NULL THEN
        SET msg = 'Ngày đăng kiểm không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra hiệu lực
    IF NEW.hieuLuc IS NULL OR NEW.hieuLuc <= 0 THEN
        SET msg = 'Hiệu lực (số ngày) phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra xe
    IF NEW.maXe IS NULL OR NEW.maXe = '' THEN
        SET msg = 'Xe không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra trùng ngày đăng kiểm (trừ chính bản ghi hiện tại)
    IF EXISTS (
        SELECT 1 FROM HanDangKiem
        WHERE maXe = NEW.maXe
          AND ngayDangKiem = NEW.ngayDangKiem
          AND maHanDangKiem <> NEW.maHanDangKiem
    ) THEN
        SET msg = CONCAT('Xe ', NEW.maXe, ' đã có đăng kiểm vào ngày ', NEW.ngayDangKiem);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END;


-- BẢNG CHUYẾN XE

DELIMITER $$

-- 1. Cập nhật tình trạng xe sau khi mỗi chuyến xe hoàn thành
create definer = root@localhost trigger trg_chuyenxe_after_update_capNhatTinhTrangXe
    after update
    on chuyenxe
    for each row
BEGIN
    DECLARE kmLamViec DECIMAL(10,2);
    DECLARE tongKm DECIMAL(10,2);
    DECLARE ngayConLai INT;

    -- ===== Trường hợp 1: chuyến vừa được hoàn thành =====
    IF NEW.tinhTrangChuyen = 'Hoàn thành' THEN

        SELECT SUM(T.khoangCach * T.heSoDuongKho)
        INTO tongKm
        FROM ChuyenXe C
        JOIN TuyenDuong T ON C.maTuyen = T.maTuyen
        WHERE C.maXe = NEW.maXe
          AND C.ngayGioKhoiHanh >= (
              SELECT COALESCE(MAX(B.ngayBaoDuong), '1900-01-01')
              FROM LichBaoDuong B
              WHERE B.maXe = NEW.maXe
          )
          AND C.tinhTrangChuyen = 'Hoàn thành';

        SET ngayConLai = 360 - FLOOR(tongKm / 100);

        IF ngayConLai > 30 THEN
            UPDATE Xe SET tinhTrang = 'Đang hoạt động' WHERE maXe = NEW.maXe;
        ELSEIF ngayConLai > 10 THEN
            UPDATE Xe SET tinhTrang = 'Sắp bảo dưỡng' WHERE maXe = NEW.maXe;
        ELSE
            UPDATE Xe SET tinhTrang = 'Quá hạn bảo dưỡng' WHERE maXe = NEW.maXe;
        END IF;

    -- ===== Trường hợp 2: chuyến bị gỡ khỏi trạng thái Hoàn thành =====
    ELSEIF OLD.tinhTrangChuyen = 'Hoàn thành' AND NEW.tinhTrangChuyen <> 'Hoàn thành' THEN

        SELECT SUM(T.khoangCach * T.heSoDuongKho)
        INTO tongKm
        FROM ChuyenXe C
        JOIN TuyenDuong T ON C.maTuyen = T.maTuyen
        WHERE C.maXe = NEW.maXe
          AND C.ngayGioKhoiHanh >= (
              SELECT COALESCE(MAX(B.ngayBaoDuong), '1900-01-01')
              FROM LichBaoDuong B
              WHERE B.maXe = NEW.maXe
          )
          AND C.tinhTrangChuyen = 'Hoàn thành';

        SET ngayConLai = 360 - FLOOR(COALESCE(tongKm, 0) / 100);

        IF ngayConLai > 30 THEN
            UPDATE Xe SET tinhTrang = 'Đang hoạt động' WHERE maXe = NEW.maXe;
        ELSEIF ngayConLai > 10 THEN
            UPDATE Xe SET tinhTrang = 'Sắp bảo dưỡng' WHERE maXe = NEW.maXe;
        ELSE
            UPDATE Xe SET tinhTrang = 'Quá hạn bảo dưỡng' WHERE maXe = NEW.maXe;
        END IF;
    END IF;
END;



-- 2,3 Kiểm tra các lỗi như not null, unique, foreign key khi insert, update
create trigger trg_chuyenxe_before_insert
    before insert
    on chuyenxe
    for each row
BEGIN
    DECLARE msg_text VARCHAR(255);

    -- ===== NOT NULL + rỗng =====
    IF NEW.maXe IS NULL OR NEW.maXe = '' THEN
        SET msg_text = 'Xe không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maTuyen IS NULL OR NEW.maTuyen = '' THEN
        SET msg_text = 'Tuyến đường không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maMua IS NULL OR NEW.maMua = '' THEN
        SET msg_text = 'Mùa không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maGiaVe IS NULL OR NEW.maGiaVe = '' THEN
        SET msg_text = 'Giá vé không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.ngayGioKhoiHanh IS NULL THEN
        SET msg_text = 'Ngày giờ khởi hành không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.ngayGioDen IS NULL THEN
        SET msg_text = 'Ngày giờ đến không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tinhTrangChuyen IS NULL OR NEW.tinhTrangChuyen = '' THEN
        SET msg_text = 'Tình trạng chuyến không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.chiPhiVanHanh IS NULL THEN
        SET msg_text = 'Chi phí vận hành không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tiLeThuLao IS NULL THEN
        SET msg_text = 'Tỉ lệ thù lao không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== CHECK =====
    IF NEW.chiPhiVanHanh <= 0 THEN
        SET msg_text = 'Chi phí vận hành phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tiLeThuLao <= 1 THEN
        SET msg_text = 'Tỉ lệ thù lao phải lớn hơn 1';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tinhTrangChuyen NOT IN ('Chưa khởi hành','Đang chạy','Hoàn thành','Hủy') THEN
        SET msg_text = CONCAT('Tình trạng chuyến không hợp lệ: ', NEW.tinhTrangChuyen);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.ngayGioDen <= NEW.ngayGioKhoiHanh THEN
        SET msg_text = 'Ngày giờ đến phải sau ngày giờ khởi hành';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== FOREIGN KEY =====
    IF NOT EXISTS (SELECT 1 FROM Xe WHERE maXe = NEW.maXe) THEN
        SET msg_text = CONCAT('Xe ', NEW.maXe, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM GiaVe
        WHERE maTuyen = NEW.maTuyen
          AND maMua = NEW.maMua
          AND maGiaVe = NEW.maGiaVe
    ) THEN
        SET msg_text = CONCAT('Giá vé không hợp lệ: ', NEW.maTuyen,'-',NEW.maMua,'-',NEW.maGiaVe);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;
END;

create trigger trg_chuyenxe_before_update
    before update
    on chuyenxe
    for each row
BEGIN
    DECLARE msg_text VARCHAR(255);

    -- ===== NOT NULL + rỗng =====
    IF NEW.maXe IS NULL OR NEW.maXe = '' THEN
        SET msg_text = 'Xe không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maTuyen IS NULL OR NEW.maTuyen = '' THEN
        SET msg_text = 'Tuyến đường không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maChuyen IS NULL OR NEW.maChuyen = '' THEN
        SET msg_text = 'Chuyến không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maMua IS NULL OR NEW.maMua = '' THEN
        SET msg_text = 'Mùa không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maGiaVe IS NULL OR NEW.maGiaVe = '' THEN
        SET msg_text = 'Giá vé không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.ngayGioKhoiHanh IS NULL THEN
        SET msg_text = 'Ngày giờ khởi hành không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.ngayGioDen IS NULL THEN
        SET msg_text = 'Ngày giờ đến không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tinhTrangChuyen IS NULL OR NEW.tinhTrangChuyen = '' THEN
        SET msg_text = 'Tình trạng chuyến không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.chiPhiVanHanh IS NULL THEN
        SET msg_text = 'Chi phí vận hành không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tiLeThuLao IS NULL THEN
        SET msg_text = 'Tỉ lệ thù lao không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== CHECK =====
    IF NEW.chiPhiVanHanh <= 0 THEN
        SET msg_text = 'Chi phí vận hành phải lớn hơn 0';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tiLeThuLao <= 1 THEN
        SET msg_text = 'Tỉ lệ thù lao phải lớn hơn 1';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.tinhTrangChuyen NOT IN ('Chưa khởi hành','Đang chạy','Hoàn thành','Hủy') THEN
        SET msg_text = CONCAT('Tình trạng chuyến không hợp lệ: ', NEW.tinhTrangChuyen);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.ngayGioDen <= NEW.ngayGioKhoiHanh THEN
        SET msg_text = 'Ngày giờ đến phải sau ngày giờ khởi hành';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== FOREIGN KEY =====
    IF NOT EXISTS (SELECT 1 FROM Xe WHERE maXe = NEW.maXe) THEN
        SET msg_text = CONCAT('Xe ', NEW.maXe, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM GiaVe
        WHERE maTuyen = NEW.maTuyen
          AND maMua = NEW.maMua
          AND maGiaVe = NEW.maGiaVe
    ) THEN
        SET msg_text = CONCAT('Giá vé không hợp lệ: ', NEW.maTuyen,'-',NEW.maMua,'-',NEW.maGiaVe);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;
END;

-- 4. Kiểm tra giá vé mỗi khi insert
create trigger trg_chuyenxe_before_insert_chkGiaVe
    before insert
    on chuyenxe
    for each row
BEGIN
    DECLARE v_maGiaVe INT;
    DECLARE msg_text VARCHAR(255);
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
        SET msg_text = CONCAT('Không tìm thấy giá vé hợp lệ');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maGiaVe IS NULL THEN
        -- FE không gửi: tự gán
        SET NEW.maGiaVe = v_maGiaVe;
    ELSEIF NEW.maGiaVe <> v_maGiaVe THEN
        -- FE gửi sai: chặn
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Giá vé gửi lên không khớp giá vé đang hiệu lực tại ngày khởi hành';
    END IF;
END;

-- 5. Không được tạo chuyến với những xe: đang bảo dưỡng, ngừng hoạt động, hoặc quá hạn đăng kiểm
create trigger trg_chuyenxe_before_insert_chkTinhTrangXe
    before insert
    on chuyenxe
    for each row
BEGIN
    DECLARE v_tinhTrang VARCHAR(50);

    -- Lấy tình trạng xe
    SELECT tinhTrang
    INTO v_tinhTrang
    FROM Xe
    WHERE maXe = NEW.maXe;

    -- Nếu tình trạng không hợp lệ thì báo lỗi
    IF v_tinhTrang IN ('Đang bảo dưỡng', 'Ngừng hoạt động', 'Quá hạn bảo dưỡng') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể tạo chuyến: Xe đang bảo dưỡng, ngừng hoạt động hoặc quá hạn đăng kiểm';
    END IF;
END;

-- 6,7. Kiểm tra xe đã có chuyến trong khoảng thời gian khi insert, update chưa
create trigger trg_chuyenxe_before_insert_chkValidateTimeXe
    before insert
    on chuyenxe
    for each row
BEGIN
    -- Không trùng giờ cho cùng xe
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
END;

CREATE TRIGGER trg_chuyenxe_before_update_chkValidateTimeXe
BEFORE UPDATE ON ChuyenXe
FOR EACH ROW
BEGIN
    -- Chỉ kiểm tra khi có thay đổi về thời gian
    IF (NEW.ngayGioKhoiHanh <> OLD.ngayGioKhoiHanh OR NEW.ngayGioDen <> OLD.ngayGioDen) THEN
        IF EXISTS (
            SELECT 1
            FROM ChuyenXe
            WHERE maXe = NEW.maXe
              AND NOT (maTuyen = OLD.maTuyen AND maChuyen = OLD.maChuyen)
              AND (
                    (NEW.ngayGioKhoiHanh BETWEEN ngayGioKhoiHanh AND ngayGioDen)
                 OR (NEW.ngayGioDen BETWEEN ngayGioKhoiHanh AND ngayGioDen)
                 OR (ngayGioKhoiHanh BETWEEN NEW.ngayGioKhoiHanh AND NEW.ngayGioDen)
                  )
        ) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Xe này đã có chuyến trong khoảng thời gian trùng lặp';
        END IF;
    END IF;
END;


-- 8. Cập nhật tình trạng chuyến theo thời gian
create trigger trg_chuyenxe_before_insert_tinhTrangChuyen
    before insert
    on chuyenxe
    for each row
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
END;

create trigger trg_chuyenxe_before_update_tinhTrangChuyen
    before update
    on chuyenxe
    for each row
BEGIN
    -- Nếu có thay đổi ngày giờ khởi hành hoặc ngày giờ đến
    IF(NEW.ngayGioKhoiHanh <> OLD.ngayGioKhoiHanh) OR (NEW.ngayGioDen <> OLD.ngayGioDen) THEN
        IF NEW.tinhTrangChuyen IS NULL OR NEW.tinhTrangChuyen <> 'Hủy' THEN
            IF NOW() < NEW.ngayGioKhoiHanh THEN
                SET NEW.tinhTrangChuyen = 'Chưa khởi hành';
            ELSEIF NOW() >= NEW.ngayGioKhoiHanh AND NOW() < NEW.ngayGioDen THEN
                SET NEW.tinhTrangChuyen = 'Đang chạy';
            ELSEIF NOW() >= NEW.ngayGioDen THEN
                SET NEW.tinhTrangChuyen = 'Hoàn thành';
            END IF;
        END IF;
    END IF;
END;

-- 9. Tạo mã chuyến dựa trên mã xe và mã tuyến đường mỗi khi insert:
create trigger trg_gen_maChuyen
    before insert
    on chuyenxe
    for each row
BEGIN
    DECLARE maxChuyen INT;

    -- Nếu người dùng không truyền maChuyen, thì tự sinh
    IF NEW.maChuyen IS NULL OR NEW.maChuyen = '' THEN
        SELECT COALESCE(MAX(CAST(SUBSTRING(maChuyen, 2) AS UNSIGNED)), 0) + 1
        INTO maxChuyen
        FROM ChuyenXe
        WHERE maXe = NEW.maXe AND maTuyen = NEW.maTuyen;

        -- Gắn tiền tố C và số 3 chữ số
        SET NEW.maChuyen = CONCAT('C', LPAD(maxChuyen, 3, '0'));
    END IF;
END;

DELIMITER ;


-- BẢNG VÉ:
DELIMITER $$

-- 1, 2 Kiểm tra các lỗi như not null, unique, foreign key khi insert, update
create trigger trg_ve_before_insert
    before insert
    on ve
    for each row
BEGIN
    DECLARE msg_text VARCHAR(255);
    -- NOT NULL kiểm tra
    IF NEW.maXe IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Xe không được để trống';
    END IF;
    IF NEW.maTuyen IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tuyến đường không được để trống';
    END IF;
    IF NEW.maChuyen IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Chuyến xe không được để trống';
    END IF;
    IF NEW.ngayMua IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ngayMua không được để trống';
    END IF;
    IF NEW.gheNgoi IS NULL OR NEW.gheNgoi = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ghế ngồi không được để trống';
    END IF;
    IF NEW.maHanhKhach IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Hành khách không được để trống';
    END IF;

    -- UNIQUE ghế trên 1 chuyến (nếu không có constraint UNIQUE)
    IF EXISTS (
        SELECT 1 FROM Ve
        WHERE maXe = NEW.maXe
          AND maTuyen = NEW.maTuyen
          AND maChuyen = NEW.maChuyen
          AND gheNgoi = NEW.gheNgoi
    ) THEN
       SET msg_text = CONCAT('Ghế ', NEW.gheNgoi, ' đã được đặt trên chuyến ',
                              NEW.maXe,'-', NEW.maTuyen,'-', NEW.maChuyen);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;

    END IF;

    -- FOREIGN KEY maHanhKhach
    IF NOT EXISTS (
        SELECT 1 FROM HanhKhach
        WHERE maHanhKhach = NEW.maHanhKhach
    ) THEN
        SET msg_text = CONCAT('Hành khách với mã ', NEW.maHanhKhach, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- FOREIGN KEY maXe-maTuyen-maChuyen
    IF NOT EXISTS (
        SELECT 1 FROM ChuyenXe
        WHERE maXe = NEW.maXe
          AND maTuyen = NEW.maTuyen
          AND maChuyen = NEW.maChuyen
    ) THEN
        SET msg_text = CONCAT('Chuyến ', NEW.maXe,'-', NEW.maTuyen,'-', NEW.maChuyen,' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;
END;

create trigger trg_ve_before_update
    before update
    on ve
    for each row
BEGIN
    DECLARE msg_text VARCHAR(255);
    -- NOT NULL kiểm tra
    IF NEW.maVe IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'maVe không được để trống';
    END IF;
    IF NEW.maXe IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Xe không được để trống';
    END IF;
    IF NEW.maTuyen IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tuyến đường không được để trống';
    END IF;
    IF NEW.maChuyen IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Chuyến xe không được để trống';
    END IF;
    IF NEW.ngayMua IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ngayMua không được để trống';
    END IF;
    IF NEW.gheNgoi IS NULL OR NEW.gheNgoi = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ghế ngồi không được để trống';
    END IF;
    IF NEW.maHanhKhach IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Hành khách không được để trống';
    END IF;

    -- UNIQUE ghế trên 1 chuyến (nếu không có constraint UNIQUE)
    IF EXISTS (
        SELECT 1 FROM Ve
        WHERE maXe = NEW.maXe
          AND maTuyen = NEW.maTuyen
          AND maChuyen = NEW.maChuyen
          AND gheNgoi = NEW.gheNgoi
    ) THEN
       SET msg_text = CONCAT('Ghế ', NEW.gheNgoi, ' đã được đặt trên chuyến ',
                              NEW.maXe,'-', NEW.maTuyen,'-', NEW.maChuyen);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;

    END IF;

    -- FOREIGN KEY maHanhKhach
    IF NOT EXISTS (
        SELECT 1 FROM HanhKhach
        WHERE maHanhKhach = NEW.maHanhKhach
    ) THEN
        SET msg_text = CONCAT('Hành khách với mã ', NEW.maHanhKhach, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- FOREIGN KEY maXe-maTuyen-maChuyen
    IF NOT EXISTS (
        SELECT 1 FROM ChuyenXe
        WHERE maXe = NEW.maXe
          AND maTuyen = NEW.maTuyen
          AND maChuyen = NEW.maChuyen
    ) THEN
        SET msg_text = CONCAT('Chuyến ', NEW.maXe,'-', NEW.maTuyen,'-', NEW.maChuyen,' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;
END;

-- 3. Kiểm tra ngày mua vé mỗi khi insert, update:
create trigger trg_ve_before_insert_chkNgayMua
    before insert
    on ve
    for each row
BEGIN
    DECLARE ngayKhoiHanh DATETIME;

    SELECT ngayGioKhoiHanh
    INTO ngayKhoiHanh
    FROM ChuyenXe
    WHERE maChuyen = NEW.maChuyen
      AND maXe = NEW.maXe
      AND maTuyen = NEW.maTuyen;

    IF NEW.ngayMua > ngayKhoiHanh THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ngày mua không được sau ngày khởi hành';
    END IF;
END;

create trigger trg_ve_before_update_chkNgayMua
    before update
    on ve
    for each row
BEGIN
    DECLARE v_khoiHanh DATETIME;

    -- Lấy ngày khởi hành dựa trên 3 khóa chính
    SELECT ngayGioKhoiHanh INTO v_khoiHanh
    FROM ChuyenXe
    WHERE maChuyen = NEW.maChuyen
      AND maXe = NEW.maXe
      AND maTuyen = NEW.maTuyen;

    -- Kiểm tra ngày mua không vượt ngày khởi hành
    IF NEW.ngayMua > v_khoiHanh THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể cập nhật vé với ngày mua sau khi xe đã khởi hành!';
    END IF;
END;


-- 4. Tạo mã vé dựa trên mã xe, mã chuyến và mã tuyến đường mỗi khi insert:
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
END;

DELIMITER ;


-- BẢNG PHÂN CÔNG:
DELIMITER $$

-- 1, 2 Kiểm tra các lỗi như not null, unique, foreign key khi insert, update
create trigger trg_phancong_before_insert
    before insert
    on phancong
    for each row
BEGIN
    DECLARE msg_text VARCHAR(255);

    -- ===== NOT NULL + rỗng =====
    IF NEW.maChuyen IS NULL OR NEW.maChuyen = '' THEN
        SET msg_text = 'Chuyến không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maTuyen IS NULL OR NEW.maTuyen = '' THEN
        SET msg_text = 'Tuyến đường không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maXe IS NULL OR NEW.maXe = '' THEN
        SET msg_text = 'Xe không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maNhanVien IS NULL THEN
        SET msg_text = 'Nhân viên không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.vaiTro IS NULL OR NEW.vaiTro = '' THEN
        SET msg_text = 'Vai trò không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== CHECK Vai trò =====
    IF NEW.vaiTro NOT IN ('Lái xe', 'Phụ xe') THEN
        SET msg_text = CONCAT('Vai trò không hợp lệ: ', NEW.vaiTro);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== FOREIGN KEY =====
    IF NOT EXISTS (
        SELECT 1 FROM ChuyenXe
        WHERE maXe = NEW.maXe
          AND maTuyen = NEW.maTuyen
          AND maChuyen = NEW.maChuyen
    ) THEN
        SET msg_text = CONCAT('Chuyến ', NEW.maChuyen, ' - Tuyến ', NEW.maTuyen, ' - Xe ', NEW.maXe, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM NhanVien WHERE maNhanVien = NEW.maNhanVien) THEN
        SET msg_text = CONCAT('Nhân viên ', NEW.maNhanVien, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== UNIQUE Vai trò trên 1 chuyến =====
    IF EXISTS (
        SELECT 1 FROM PhanCong
        WHERE maXe = NEW.maXe
          AND maTuyen = NEW.maTuyen
          AND maChuyen = NEW.maChuyen
          AND vaiTro = NEW.vaiTro
    ) THEN
        SET msg_text = CONCAT('Vai trò ', NEW.vaiTro, ' đã được phân công trên chuyến ', NEW.maChuyen, '-', NEW.maTuyen, '-', NEW.maXe);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

END;



create trigger trg_phancong_before_update
    before update
    on phancong
    for each row
BEGIN
    DECLARE msg_text VARCHAR(255);

    -- ===== NOT NULL + rỗng =====
    IF NEW.maChuyen IS NULL OR NEW.maChuyen = '' THEN
        SET msg_text = 'Chuyến không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maTuyen IS NULL OR NEW.maTuyen = '' THEN
        SET msg_text = 'Tuyến đường không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maXe IS NULL OR NEW.maXe = '' THEN
        SET msg_text = 'Xe không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.maNhanVien IS NULL THEN
        SET msg_text = 'Nhân viên không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NEW.vaiTro IS NULL OR NEW.vaiTro = '' THEN
        SET msg_text = 'Vai trò không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== CHECK Vai trò =====
    IF NEW.vaiTro NOT IN ('Lái xe', 'Phụ xe') THEN
        SET msg_text = CONCAT('Vai trò không hợp lệ: ', NEW.vaiTro);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== FOREIGN KEY =====
    IF NOT EXISTS (
        SELECT 1 FROM ChuyenXe
        WHERE maXe = NEW.maXe
          AND maTuyen = NEW.maTuyen
          AND maChuyen = NEW.maChuyen
    ) THEN
        SET msg_text = CONCAT('Chuyến ', NEW.maChuyen, ' - Tuyến ', NEW.maTuyen, ' - Xe ', NEW.maXe, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM NhanVien WHERE maNhanVien = NEW.maNhanVien) THEN
        SET msg_text = CONCAT('Nhân viên ', NEW.maNhanVien, ' không tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

    -- ===== UNIQUE Vai trò trên 1 chuyến =====
    IF EXISTS (
        SELECT 1 FROM PhanCong
        WHERE maXe = NEW.maXe
          AND maTuyen = NEW.maTuyen
          AND maChuyen = NEW.maChuyen
          AND vaiTro = NEW.vaiTro
    ) THEN
        SET msg_text = CONCAT('Vai trò ', NEW.vaiTro, ' đã được phân công trên chuyến ', NEW.maChuyen, '-', NEW.maTuyen, '-', NEW.maXe);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg_text;
    END IF;

END;



-- 3. Kiểm tra nhân viên có bị trùng giờ phân công không:
create trigger trg_phancong_before_insert_chkTrungGioPhanCongNhanVien
    before insert
    on phancong
    for each row
BEGIN
    DECLARE cnt INT;

    SELECT COUNT(*)
    INTO cnt
    FROM PhanCong pc
    JOIN ChuyenXe cx1 ON pc.maXe = cx1.maXe
                     AND pc.maTuyen = cx1.maTuyen
                     AND pc.maChuyen = cx1.maChuyen
    JOIN ChuyenXe cx2 ON NEW.maXe = cx2.maXe
                     AND NEW.maTuyen = cx2.maTuyen
                     AND NEW.maChuyen = cx2.maChuyen
    WHERE pc.maNhanVien = NEW.maNhanVien
      AND (
           (cx1.ngayGioKhoiHanh < cx2.ngayGioDen)
       AND (cx2.ngayGioKhoiHanh < cx1.ngayGioDen)
      ); -- điều kiện giao nhau về thời gian

    IF cnt > 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Nhân viên này đã được phân công vào chuyến xe khác trùng giờ!';
    END IF;
END;

