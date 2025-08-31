
-- 1. gen maxe khi insert
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

-- 2. gen ma tuyen duong khi insert
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

-- 3. gen ma chuyen xe khi insert
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

-- 4. gen mã vé

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


-- 5. gen mã mùa
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

-- 6.gen mã giá vé
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

-- 6. check khoảng cách từ - đến bảng LuongTuyenDuong

DELIMITER $$

CREATE TRIGGER trg_check_khoangCach
BEFORE INSERT ON LuongTuyenDuong
FOR EACH ROW
BEGIN
    IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Khoảng cách từ phải nhỏ hơn khoảng cách đến';
    END IF;
END$$

CREATE TRIGGER trg_check_khoangCach_update
BEFORE UPDATE ON LuongTuyenDuong
FOR EACH ROW
BEGIN
    IF NEW.khoangCachTu >= NEW.khoangCachDen THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Khoảng cách từ phải nhỏ hơn khoảng cách đến';
    END IF;
END$$

DELIMITER ;

-- 7. Kiểm tra giá trị khoảng cách: Trong cùng 1 khoảng cách chỉ có 1 mức lương tồn tại

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
        SET MESSAGE_TEXT = 'Khoảng cách trùng với 1 mức lương đã tồn tại';
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
        SET MESSAGE_TEXT = 'Khoảng cách trùng với 1 mức lương đã tồn tại';
    END IF;
END$$

DELIMITER ;


-- 8. Bảng giá vé: Ngày kết thúc phải lớn hơn ngày bắt đầu, trong cùng khoảng thời gian chỉ có 1 mã tuyến, mã mùa có hiệu lực


DELIMITER $$
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

-- 9. Bảng HanDangKiem: Kiểm tra giá trị Ngày đăng kiểm không được null, chi phí phải lớn hơn 0,  1 zxe không thể bị trùng ngày đăng kiểm
DELIMITER $$

-- Trigger BEFORE INSERT
CREATE TRIGGER trg_handangkiem_before_insert
BEFORE INSERT ON HanDangKiem
FOR EACH ROW
BEGIN
    -- 1. Kiểm tra ngayDangKiem không null
    IF NEW.ngayDangKiem IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ngày đăng kiểm không được để trống';
    END IF;
    -- 2. Kiểm tra chiPhi >= 0 nếu không null
    IF NEW.chiPhi IS NOT NULL AND NEW.chiPhi < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Chi phí phải >= 0';
    END IF;
    -- 3. Kiểm tra trùng ngayDangKiem cho cùng maXe
    IF EXISTS (
        SELECT 1
        FROM HanDangKiem
        WHERE maXe = NEW.maXe
          AND ngayDangKiem = NEW.ngayDangKiem
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Đã tồm tại đăng kiểm xe này trong ngày';
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
        SET MESSAGE_TEXT = 'Ngày đăng kiểm không được để trống';
    END IF;
    -- 2. Kiểm tra chiPhi >= 0 nếu không null
    IF NEW.chiPhi IS NOT NULL AND NEW.chiPhi < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Chi phí phải >= 0';
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
        SET MESSAGE_TEXT = 'Đã tồm tại đăng kiểm xe này trong ngày';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

-- 10. Bảng ChuyenXe: Kiếm tra các giá trị sao cho ngày giờ đến phải sau ngày giờ khởi hành, chi phí vận hành phải lớn hơn bằng 0, tỉ lệ thù sao lớn hơn 1
-- 1 xe chỉ có thể ở trong 1 chuyến xe trong 1 khoảng thời gian

CREATE TRIGGER trg_chuyenxe_before_insert
BEFORE INSERT ON ChuyenXe
FOR EACH ROW
BEGIN
    -- 1. ngayGioDen >= ngayGioKhoiHanh
    IF NEW.ngayGioDen <= NEW.ngayGioKhoiHanh THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ngày giờ đến phải sau ngày giờ khởi hành';
    END IF;
    -- 2. chiPhiVanHanh >= 0
    IF NEW.chiPhiVanHanh < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Chi phí vận hành phải >= 0';
    END IF;
    -- 3. tiLeThuLao > 1
    IF NEW.tiLeThuLao <= 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tỉ lệ thù lao phải lớn hơn 1';
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

-- 11. Tự động đổi trạng thái dựa vào ngayGioKhoiHanh và ngayGioDen
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


-- 12. Tự động đổi trạng thái dựa vào ngayGioKhoiHanh và ngayGioDen khi inset, update
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

-- 13. Kiểm tra ngày mua phải trước giờ khởi hành
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
    IF NEW.tinhTrangChuyen = 'Hoàn thành' THEN
    
        -- Tính km làm việc của chuyến này
        SELECT T.khoangCach * T.heSoDuongKho
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
          AND C.tinhTrangChuyen = 'Hoàn thành';
          
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
