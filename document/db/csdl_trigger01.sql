-- Tự động tạo mã nhân viên đúng quy tắc
CREATE TRIGGER trg_AutoGenerateMaNV
ON nhan_vien
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @MaPB VARCHAR(10), @NewID VARCHAR(15), @MaxSTT INT;

    -- Lấy thông tin từ bản ghi đang chèn
    SELECT @MaPB = ma_phong_ban FROM inserted;

    -- Tìm số thứ tự lớn nhất hiện tại của phòng ban đó
    SELECT @MaxSTT = ISNULL(MAX(CAST(RIGHT(ma_nhan_vien, 4) AS INT)), 0)
    FROM nhan_vien 
    WHERE ma_phong_ban = @MaPB;

    -- Tạo mã mới (Ví dụ: PB01 + 0001 = PB010001)
    SET @NewID = @MaPB + RIGHT('0000' + CAST(@MaxSTT + 1 AS VARCHAR(4)), 4);

    -- Thực hiện chèn thực tế
    INSERT INTO nhan_vien (ma_nhan_vien, ho_ten, ngay_birth, gioi_tinh, ma_phong_ban)
    SELECT @NewID, ho_ten, ngay_sinh, gioi_tinh, ma_phong_ban
    FROM inserted;
END;

-- Ràng buộc Trưởng/Phó phòng
-- Yêu cầu: Mỗi phòng ban có 1 Trưởng phòng và ít nhất 1 Phó phòng. Trigger này kiểm tra trạng thái khi cập nhật chức vụ.
CREATE TRIGGER trg_KiemTraCoCauPhongBan
ON chuc_vu
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    -- Kiểm tra Trưởng phòng (Phải duy nhất 1)
    IF EXISTS (
        SELECT ma_phong_ban FROM chuc_vu 
        WHERE ten_chuc_vu = 'TruongPhong'
        GROUP BY ma_phong_ban HAVING COUNT(ma_nhan_vien) <> 1
    )
    BEGIN
        RAISERROR (N'Lỗi: Mỗi phòng ban phải có duy nhất 1 Trưởng phòng!', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;

-- Nhân viên chỉ thuộc một phòng ban tại một thời điểm
CREATE TRIGGER trg_OneDeptAtATime
ON chuc_vu
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT ma_nhan_vien, ngay_ap_dung 
        FROM chuc_vu
        GROUP BY ma_nhan_vien, ngay_ap_dung
        HAVING COUNT(DISTINCT ma_phong_ban) > 1
    )
    BEGIN
        RAISERROR (N'Lỗi: Một nhân viên chỉ có thể thuộc một phòng ban tại một thời điểm!', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;

-- Mỗi dự án phải có một nhân viên chủ trì
CREATE TRIGGER trg_ProjectMustHaveLeader
ON tham_gia_du_an
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    IF EXISTS (
        SELECT d.ma_du_an 
        FROM du_an d
        LEFT JOIN tham_gia_du_an tg ON d.ma_du_an = tg.ma_du_an AND tg.vai_tro = 'ChuTri'
        GROUP BY d.ma_du_an
        HAVING COUNT(tg.ma_nhan_vien) = 0
    )
    BEGIN
        RAISERROR (N'Lỗi: Mỗi dự án phải có ít nhất một nhân viên đóng vai trò Chủ trì!', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;

-- Ràng buộc 2: Giới hạn số nhân viên tối đa của dự án
CREATE TRIGGER trg_CheckMaxNhanVienDuAn
ON tham_gia_du_an
AFTER INSERT
AS
BEGIN
    IF EXISTS (
        SELECT 1 FROM du_an d
        JOIN loai_du_an l ON d.ma_loai_du_an = l.ma_loai_du_an
        WHERE d.ma_du_an IN (SELECT ma_du_an FROM inserted)
        AND (SELECT COUNT(*) FROM tham_gia_du_an WHERE ma_du_an = d.ma_du_an) > l.so_nhan_vien_toi_da
    )
    BEGIN
        RAISERROR ('Số lượng nhân viên vượt quá giới hạn tối đa của loại dự án!', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
-- Ràng buộc 3: Công đoạn phải xong mới đến công đoạn tiếp theo
CREATE TRIGGER trg_CheckThuTuCongDoan
ON cong_doan
AFTER UPDATE
AS
BEGIN
    -- Chỉ cho phép bắt đầu công đoạn N nếu công đoạn N-1 đã có ngay_hoan_thanh_thuc_te
    IF EXISTS (
        SELECT 1 FROM cong_doan c1
        JOIN inserted c2 ON c1.ma_du_an = c2.ma_du_an
        WHERE c2.thu_tu > 1 AND c1.thu_tu = c2.thu_tu - 1
        AND c1.ngay_hoan_thanh_thuc_te IS NULL
        AND c2.ngay_bat_dau IS NOT NULL
    )
    BEGIN
        RAISERROR ('Công đoạn trước chưa hoàn thành!', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;

-- -- Kiểm tra xem nhân viên được phân công công đoạn có nằm trong danh sách tham gia dự án của tháng đó không
CREATE TRIGGER trg_CheckNhanVienTrongDuAn
ON thuc_hien_cong_doan
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM inserted i
        JOIN cong_doan cd ON i.stt_cong_doan = cd.stt_cong_doan AND i.ma_du_an = cd.ma_du_an
        WHERE NOT EXISTS (
            SELECT 1 
            FROM tham_gia_du_an tg
            WHERE tg.ma_nhan_vien = i.ma_nhan_vien 
              AND tg.ma_du_an = i.ma_du_an
              -- Khớp tháng và năm của công đoạn với tháng và năm nhân viên tham gia dự án
              AND tg.thang = MONTH(cd.ngay_bat_dau)
              AND tg.nam = YEAR(cd.ngay_bat_dau)
        )
    )
    BEGIN
        RAISERROR (N'Lỗi: Nhân viên phải được phân công tham gia dự án trong tháng/năm tương ứng trước khi giao công đoạn!', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;