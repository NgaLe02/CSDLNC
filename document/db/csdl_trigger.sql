-- Ràng buộc Trưởng/Phó phòng
-- Yêu cầu: Mỗi phòng ban có 1 Trưởng phòng và ít nhất 1 Phó phòng. Trigger này kiểm tra trạng thái khi cập nhật chức vụ.
DELIMITER $$

CREATE TRIGGER trg_check_truong_phong
AFTER INSERT ON chuc_vu
FOR EACH ROW
BEGIN
    IF NEW.ten_chuc_vu = 'TruongPhong' THEN
        IF (
            SELECT COUNT(*)
            FROM chuc_vu
            WHERE ma_phong_ban = NEW.ma_phong_ban
              AND ten_chuc_vu = 'TruongPhong'
        ) > 1 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Lỗi: Mỗi phòng ban chỉ được có 1 Trưởng phòng';
        END IF;
    END IF;
END$$

DELIMITER ;


-- Nhân viên chỉ thuộc một phòng ban tại một thời điểm
DELIMITER $$

CREATE TRIGGER trg_one_dept_at_a_time
AFTER INSERT ON chuc_vu
FOR EACH ROW
BEGIN
    IF (
        SELECT COUNT(DISTINCT ma_phong_ban)
        FROM chuc_vu
        WHERE ma_nhan_vien = NEW.ma_nhan_vien
          AND ngay_ap_dung = NEW.ngay_ap_dung
    ) > 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Một nhân viên chỉ thuộc một phòng ban tại một thời điểm';
    END IF;
END$$

DELIMITER ;


-- Mỗi dự án phải có một nhân viên chủ trì
DELIMITER $$

CREATE TRIGGER trg_project_must_have_leader
AFTER DELETE ON tham_gia_du_an
FOR EACH ROW
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM tham_gia_du_an
        WHERE ma_du_an = OLD.ma_du_an
          AND vai_tro = 'ChuTri'
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Mỗi dự án phải có ít nhất một Chủ trì';
    END IF;
END$$

DELIMITER ;


-- Ràng buộc 2: Giới hạn số nhân viên tối đa của dự án
DELIMITER $$

CREATE TRIGGER trg_check_max_nhan_vien_du_an
AFTER INSERT ON tham_gia_du_an
FOR EACH ROW
BEGIN
    DECLARE max_nv INT;
    DECLARE cur_nv INT;

    SELECT l.so_nhan_vien_toi_da
    INTO max_nv
    FROM du_an d
    JOIN loai_du_an l ON d.ma_loai_du_an = l.ma_loai_du_an
    WHERE d.ma_du_an = NEW.ma_du_an;

    SELECT COUNT(*)
    INTO cur_nv
    FROM tham_gia_du_an
    WHERE ma_du_an = NEW.ma_du_an;

    IF cur_nv > max_nv THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Số lượng nhân viên vượt quá giới hạn của dự án';
    END IF;
END$$

DELIMITER ;

# Công đoạn phải hoàn thành trước khi sang công đoạn tiếp theo
DELIMITER $$

CREATE TRIGGER trg_check_thu_tu_cong_doan
BEFORE UPDATE ON cong_doan
FOR EACH ROW
BEGIN
    IF NEW.thu_tu > 1 AND NEW.ngay_bat_dau IS NOT NULL THEN
        IF EXISTS (
            SELECT 1
            FROM cong_doan
            WHERE ma_du_an = NEW.ma_du_an
              AND thu_tu = NEW.thu_tu - 1
              AND ngay_hoan_thanh_thuc_te IS NULL
        ) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Lỗi: Công đoạn trước chưa hoàn thành';
        END IF;
    END IF;
END$$

DELIMITER ;


-- -- Kiểm tra xem nhân viên được phân công công đoạn có nằm trong danh sách tham gia dự án của tháng đó không
DELIMITER $$

CREATE DEFINER = `root`@`localhost`
TRIGGER trg_check_nv_trong_du_an
AFTER INSERT ON thuc_hien_cong_doan
FOR EACH ROW
BEGIN
    DECLARE v_thang INT;
    DECLARE v_nam INT;
    DECLARE v_msg VARCHAR(255);

    -- Lấy tháng/năm theo ngày bắt đầu công đoạn
    SELECT
        MONTH(ngay_bat_dau),
        YEAR(ngay_bat_dau)
    INTO v_thang, v_nam
    FROM cong_doan
    WHERE ma_du_an = NEW.ma_du_an
      AND stt_cong_doan = NEW.stt_cong_doan;

    -- Kiểm tra nhân viên có tham gia dự án trong tháng/năm đó không
    IF NOT EXISTS (
        SELECT 1
        FROM tham_gia_du_an tg
        WHERE tg.ma_nhan_vien = NEW.ma_nhan_vien
          AND tg.ma_du_an = NEW.ma_du_an
          AND tg.thang = v_thang
          AND tg.nam = v_nam
    ) THEN
        SET v_msg = CONCAT(
            'Nhan vien ', NEW.ma_nhan_vien,
            ' chua tham gia du an ',
            NEW.ma_du_an,
            ' trong thang ', v_thang,
            '/', v_nam
        );

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = v_msg;
    END IF;
END$$

DELIMITER ;

# không cho thêm công đoạn có thời gian bé hơn thời gian bắt đầu của dự án
DELIMITER $$

CREATE TRIGGER trg_check_thoi_gian_cong_doan_insert
BEFORE INSERT ON cong_doan
FOR EACH ROW
BEGIN
    DECLARE ngay_bat_dau_du_an DATE;

    -- Lấy ngày bắt đầu dự án
    SELECT da.ngay_bat_dau
    INTO ngay_bat_dau_du_an
    FROM du_an da
    WHERE da.ma_du_an = NEW.ma_du_an;

    -- Nếu thời gian công đoạn < thời gian bắt đầu dự án → chặn
    IF NEW.ngay_bat_dau < ngay_bat_dau_du_an THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Thời gian bắt đầu công đoạn không được nhỏ hơn thời gian bắt đầu dự án';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_check_thoi_gian_cong_doan_update
BEFORE UPDATE ON cong_doan
FOR EACH ROW
BEGIN
    DECLARE ngay_bat_dau_du_an DATE;

    SELECT da.ngay_bat_dau
    INTO ngay_bat_dau_du_an
    FROM du_an da
    WHERE da.ma_du_an = NEW.ma_du_an;

    IF NEW.ngay_bat_dau < ngay_bat_dau_du_an THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Thời gian bắt đầu công đoạn không được nhỏ hơn thời gian bắt đầu dự án';
    END IF;
END$$

DELIMITER ;

-- tạo mã phòng ban
DELIMITER $$

CREATE TRIGGER trg_phong_ban_auto_ma
BEFORE INSERT ON phong_ban
FOR EACH ROW
BEGIN
    DECLARE max_num INT;

    -- Lấy số lớn nhất hiện có sau PB
    SELECT
        IFNULL(MAX(CAST(SUBSTRING(ma_phong_ban, 3) AS UNSIGNED)), 0)
    INTO max_num
    FROM phong_ban;

    -- Gán mã mới dạng PB001, PB002...
    SET NEW.ma_phong_ban = CONCAT(
        'PB',
        LPAD(max_num + 1, 3, '0')
    );
END$$

DELIMITER ;


# Check nhân viên có thuộc phòng ban quản lý dự án
DELIMITER $$

CREATE TRIGGER trg_check_nv_phong_ban_du_an
BEFORE INSERT ON tham_gia_du_an
FOR EACH ROW
BEGIN
    DECLARE v_ma_phong_du_an varchar(15);
    DECLARE v_ma_phong_nv varchar(15);

    -- Lấy phòng ban quản lý của dự án
    SELECT ma_phong_quan_ly
    INTO v_ma_phong_du_an
    FROM du_an
    WHERE ma_du_an = NEW.ma_du_an;

    -- Lấy phòng ban HIỆN TẠI của nhân viên
    SELECT ma_phong_ban
    INTO v_ma_phong_nv
    FROM chuc_vu
    WHERE ma_nhan_vien = NEW.ma_nhan_vien
    ORDER BY ngay_ap_dung DESC
    LIMIT 1;

    -- Nếu không cùng phòng ban → chặn
    IF v_ma_phong_du_an IS NULL
       OR v_ma_phong_nv IS NULL
       OR v_ma_phong_du_an <> v_ma_phong_nv
    THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Nhan vien khong thuoc phong ban quan ly du an';
    END IF;
END$$

DELIMITER ;
