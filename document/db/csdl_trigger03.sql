-- BẢNG HÀNH KHÁCH
DELIMITER $$

-- Trigger BEFORE INSERT
CREATE TRIGGER trg_check_hanhkhach_insert
BEFORE INSERT ON HanhKhach
FOR EACH ROW
BEGIN
    DECLARE msg TEXT;

    -- Kiểm tra họ tên
    IF NEW.hoTen IS NULL OR NEW.hoTen = '' THEN
        SET msg = 'Họ tên hành khách không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra CMND
    IF NEW.cmnd IS NULL OR NEW.cmnd = '' THEN
        SET msg = 'CMND không được để trống khi khai báo!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    ELSEIF CHAR_LENGTH(NEW.cmnd) <> 12 THEN
        SET msg = 'CMND phải đúng 12 ký tự!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra số điện thoại
    IF NEW.soDienThoai IS NULL OR NEW.soDienThoai = '' THEN
        SET msg = 'Số điện thoại không được để trống khi khai báo';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra trùng CMND
    IF NEW.cmnd IS NOT NULL AND EXISTS (
        SELECT 1 FROM HanhKhach WHERE cmnd = NEW.cmnd
    ) THEN
        SET msg = CONCAT('CMND "', NEW.cmnd, '" đã tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra trùng số điện thoại
    IF NEW.soDienThoai IS NOT NULL AND EXISTS (
        SELECT 1 FROM HanhKhach WHERE soDienThoai = NEW.soDienThoai
    ) THEN
        SET msg = CONCAT('Số điện thoại "', NEW.soDienThoai, '" đã tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END$$

-- Trigger BEFORE UPDATE
CREATE TRIGGER trg_check_hanhkhach_update
BEFORE UPDATE ON HanhKhach
FOR EACH ROW
BEGIN
    DECLARE msg TEXT;

    -- Kiểm tra họ tên
    IF NEW.hoTen IS NULL OR NEW.hoTen = '' THEN
        SET msg = 'Họ tên hành khách không được để trống';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra CMND 
    IF NEW.cmnd IS NULL OR NEW.cmnd = '' THEN
        SET msg = 'CMND không được để trống khi khai báo!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    ELSEIF CHAR_LENGTH(NEW.cmnd) <> 12 THEN
        SET msg = 'CMND phải đúng 12 ký tự!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra số điện thoại
    IF NEW.soDienThoai IS NULL OR NEW.soDienThoai = '' THEN
        SET msg = 'Số điện thoại không được để trống khi khai báo';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra trùng CMND (không tính bản ghi hiện tại)
    IF NEW.cmnd IS NOT NULL AND EXISTS (
        SELECT 1 FROM HanhKhach
        WHERE cmnd = NEW.cmnd AND maHanhKhach <> NEW.maHanhKhach
    ) THEN
        SET msg = CONCAT('CMND "', NEW.cmnd, '" đã tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Kiểm tra trùng số điện thoại (không tính bản ghi hiện tại)
    IF NEW.soDienThoai IS NOT NULL AND EXISTS (
        SELECT 1 FROM HanhKhach
        WHERE soDienThoai = NEW.soDienThoai AND maHanhKhach <> NEW.maHanhKhach
    ) THEN
        SET msg = CONCAT('Số điện thoại "', NEW.soDienThoai, '" đã tồn tại');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END$$

DELIMITER ;


-- BẢNG NHÂN VIÊN:
DELIMITER $$
create trigger trg_nhanvien_before_insert
    before insert
    on nhanvien
    for each row
BEGIN
    DECLARE message_text VARCHAR(255);

    -- Kiểm tra họ tên không rỗng
    IF NEW.hoTen IS NULL OR NEW.hoTen = '' THEN
        SET message_text = 'Họ tên nhân viên không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra CMND (nếu nhập thì phải đúng định dạng)
    IF NEW.cmnd IS NULL OR NEW.cmnd = '' THEN
        SET message_text = 'CMND không được để trống khi khai báo!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    ELSEIF CHAR_LENGTH(NEW.cmnd) <> 12 THEN
        SET message_text = 'CMND phải đúng 12 ký tự!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra số điện thoại (nếu nhập thì phải đúng định dạng)
    IF NEW.soDienThoai IS NULL OR NEW.soDienThoai = '' THEN
        SET message_text = 'Số điện thoại không được để trống.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra trùng CMND
    IF NEW.cmnd IS NOT NULL AND EXISTS (SELECT 1 FROM NhanVien WHERE cmnd = NEW.cmnd) THEN
        SET message_text = CONCAT('CMND "', NEW.cmnd, '" đã tồn tại trong hệ thống!');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra trùng số điện thoại
    IF NEW.soDienThoai IS NOT NULL AND EXISTS (SELECT 1 FROM NhanVien WHERE soDienThoai = NEW.soDienThoai) THEN
        SET message_text = CONCAT('Số điện thoại "', NEW.soDienThoai, '" đã tồn tại trong hệ thống!');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
END;

CREATE TRIGGER trg_nhanvien_before_update
BEFORE UPDATE ON nhanvien
FOR EACH ROW
BEGIN
    DECLARE message_text VARCHAR(255);

    -- Kiểm tra họ tên không rỗng
    IF NEW.hoTen IS NULL OR NEW.hoTen = '' THEN
        SET message_text = 'Họ tên nhân viên không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra CMND (nếu nhập thì không được rỗng)
    IF NEW.cmnd IS NULL OR NEW.cmnd = '' THEN
        SET message_text = 'CMND không được để trống khi khai báo!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    ELSEIF CHAR_LENGTH(NEW.cmnd) <> 12 THEN
        SET message_text = 'CMND phải đúng 12 ký tự!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra số điện thoại (nếu nhập thì không được rỗng)
    IF NEW.soDienThoai IS NULL OR NEW.soDienThoai = '' THEN
        SET message_text = 'Số điện thoại không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra trùng CMND (chỉ khi thay đổi CMND)
    IF NEW.cmnd <> OLD.cmnd AND EXISTS (
        SELECT 1 FROM NhanVien WHERE cmnd = NEW.cmnd
    ) THEN
        SET message_text = CONCAT('CMND "', NEW.cmnd, '" đã tồn tại trong hệ thống!');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra trùng số điện thoại (chỉ khi thay đổi số điện thoại)
    IF NEW.soDienThoai <> OLD.soDienThoai AND EXISTS (
        SELECT 1 FROM NhanVien WHERE soDienThoai = NEW.soDienThoai
    ) THEN
        SET message_text = CONCAT('Số điện thoại "', NEW.soDienThoai, '" đã tồn tại trong hệ thống!');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

END;
DELIMITER ;


-- BẢNG LỊCH BẢO DƯỠNG:
DELIMITER $$

CREATE TRIGGER trg_lichbaoduong_before_insert
BEFORE INSERT ON LichBaoDuong
FOR EACH ROW
BEGIN
    DECLARE message_text VARCHAR(255);

    -- Kiểm tra ngày bảo dưỡng không để trống
    IF NEW.ngayBaoDuong IS NULL THEN
        SET message_text = 'Ngày bảo dưỡng không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
    

    -- Kiểm tra chi phí hợp lệ
    IF NEW.chiPhi IS NULL OR (NEW.chiPhi IS NOT NULL AND NEW.chiPhi < 0) THEN
        SET message_text = 'Chi phí bảo dưỡng phải lớn hơn hoặc bằng 0!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra xe có tồn tại không
    IF NEW.maXe IS NULL OR NOT EXISTS (SELECT 1 FROM Xe WHERE maXe = NEW.maXe) THEN
        SET message_text = CONCAT('Xe với mã "', NEW.maXe, '" không tồn tại trong hệ thống!');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
END$$

CREATE TRIGGER trg_lichbaoduong_before_update
BEFORE UPDATE ON LichBaoDuong
FOR EACH ROW
BEGIN
    DECLARE message_text VARCHAR(255);

    -- Kiểm tra ngày bảo dưỡng không để trống
    IF NEW.ngayBaoDuong IS NULL THEN
        SET message_text = 'Ngày bảo dưỡng không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra chi phí hợp lệ
    IF NEW.chiPhi IS NULL OR (NEW.chiPhi IS NOT NULL AND NEW.chiPhi < 0) THEN
        SET message_text = 'Chi phí bảo dưỡng phải lớn hơn hoặc bằng 0!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra xe có tồn tại không
    IF NEW.maXe IS NULL OR NOT EXISTS (SELECT 1 FROM Xe WHERE maXe = NEW.maXe) THEN
        SET message_text = CONCAT('Xe với mã "', NEW.maXe, '" không tồn tại trong hệ thống!');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
END$$

DELIMITER ;

-- Bảng MÙA:
DELIMITER $$
-- gen mã mùa
create trigger trg_gen_maMua
    before insert
    on mua
    for each row
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
END;

CREATE TRIGGER trg_mua_before_insert
BEFORE INSERT ON Mua
FOR EACH ROW
BEGIN
    DECLARE message_text VARCHAR(255);

    -- Kiểm tra mã mùa không để trống
    IF NEW.maMua IS NULL OR NEW.maMua = '' THEN
        SET message_text = 'Mã mùa không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra tên mùa không để trống
    IF NEW.tenMua IS NULL OR NEW.tenMua = '' THEN
        SET message_text = 'Tên mùa không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra trùng tên mùa
    IF EXISTS (SELECT 1 FROM Mua WHERE tenMua = NEW.tenMua) THEN
        SET message_text = CONCAT('Tên mùa "', NEW.tenMua, '" đã tồn tại trong hệ thống!');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
END$$

CREATE TRIGGER trg_mua_before_update
BEFORE UPDATE ON Mua
FOR EACH ROW
BEGIN
    DECLARE message_text VARCHAR(255);

    -- Kiểm tra mã mùa không để trống
    IF NEW.maMua IS NULL OR NEW.maMua = '' THEN
        SET message_text = 'Mã mùa không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra tên mùa không để trống
    IF NEW.tenMua IS NULL OR NEW.tenMua = '' THEN
        SET message_text = 'Tên mùa không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra trùng tên mùa (không tính chính mình)
    IF EXISTS (SELECT 1 FROM Mua WHERE tenMua = NEW.tenMua AND maMua <> NEW.maMua) THEN
        SET message_text = CONCAT('Tên mùa "', NEW.tenMua, '" đã tồn tại trong hệ thống!');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
END$$

DELIMITER ;

-- BẢNG LOẠI XE:
DELIMITER $$

CREATE TRIGGER trg_loai_xe_before_ins
BEFORE INSERT ON LoaiXe
FOR EACH ROW
BEGIN
    DECLARE message_text VARCHAR(255);

    IF NEW.tenLoaiXe IS NULL OR NEW.tenLoaiXe = '' THEN
        SET message_text = 'Tên loại xe không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra số ghế không được để trống
    IF NEW.soGhe IS NULL THEN
        SET message_text = 'Số ghế không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
    -- Kiểm tra số ghế hợp lệ
    IF NEW.soGhe <= 0 THEN
        SET message_text = 'Số ghế của loại xe phải lớn hơn 0!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra tên loại xe trùng lặp
    IF EXISTS (
        SELECT 1 FROM LoaiXe WHERE tenLoaiXe = NEW.tenLoaiXe
    ) THEN
        SET message_text = 'Tên loại xe đã tồn tại!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
END$$

CREATE TRIGGER trg_loai_xe_before_upd
BEFORE UPDATE ON LoaiXe
FOR EACH ROW
BEGIN
    DECLARE message_text VARCHAR(255);

    IF NEW.tenLoaiXe IS NULL OR NEW.tenLoaiXe = '' THEN
        SET message_text = 'Tên loại xe không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra số ghế không được để trống
    IF NEW.soGhe IS NULL THEN
        SET message_text = 'Số ghế không được để trống!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
    -- Kiểm tra số ghế hợp lệ
    IF NEW.soGhe <= 0 THEN
        SET message_text = 'Số ghế của loại xe phải lớn hơn 0!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;

    -- Kiểm tra tên loại xe trùng lặp (ngoại trừ chính nó)
    IF EXISTS (
        SELECT 1 FROM LoaiXe WHERE tenLoaiXe = NEW.tenLoaiXe AND maLoaiXe <> OLD.maLoaiXe
    ) THEN
        SET message_text = 'Tên loại xe đã tồn tại!';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message_text;
    END IF;
END$$

DELIMITER ;

