DELIMITER $$

CREATE TRIGGER trg_phongban_before_insert
BEFORE INSERT ON phongban
FOR EACH ROW
BEGIN
    DECLARE next_id INT;

    -- Lấy id kế tiếp
    SELECT IFNULL(MAX(ma_phong), 0) + 1 INTO next_id FROM phongban;

    -- Sinh mã PB + 2 chữ số
    SET NEW.ma_phong = CONCAT('PB', LPAD(next_id, 2, '0'));
END$$

DELIMITER ;
