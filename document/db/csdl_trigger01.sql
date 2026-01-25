DELIMITER $$

CREATE TRIGGER trg_phongban_before_insert
BEFORE INSERT ON phongban
FOR EACH ROW
BEGIN
    DECLARE next_num INT;

    SELECT IFNULL(MAX(CAST(SUBSTRING(ma_phong, 3) AS UNSIGNED)), 0) + 1
    INTO next_num
    FROM phongban;

    SET NEW.ma_phong = CONCAT('PB', LPAD(next_num, 2, '0'));
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_generate_ma_nv
BEFORE INSERT ON nhanvien
FOR EACH ROW
BEGIN
    DECLARE next_num INT;

    SELECT
        IFNULL(
            MAX(
                CAST(SUBSTRING_INDEX(ma_nv, '_NV', -1) AS UNSIGNED)
            ),
            0
        ) + 1
    INTO next_num
    FROM nhanvien
    WHERE ma_phong = NEW.ma_phong;

    SET NEW.ma_nv = CONCAT(
        NEW.ma_phong,
        '_NV',
        LPAD(next_num, 3, '0')
    );
END$$

DELIMITER ;

