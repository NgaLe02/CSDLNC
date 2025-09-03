# 1. Hiển thị tên của các lái xe cùng với lương tháng của họ của một tháng cụ thể.
SELECT nv.hoTen,
       SUM(ltd.luongCoBan * cx.tiLeThuLao) AS tongLuong
FROM NhanVien nv
JOIN PhanCong pc
    ON nv.maNhanVien = pc.maNhanVien
   AND pc.vaiTro = 'Lái xe'
JOIN ChuyenXe cx
    ON pc.maXe = cx.maXe
   AND pc.maTuyen = cx.maTuyen
   AND pc.maChuyen = cx.maChuyen
JOIN TuyenDuong td
    ON cx.maTuyen = td.maTuyen
JOIN LuongTuyenDuong ltd
    ON td.maLuongTuyen = ltd.maLuongTuyen
WHERE cx.tinhTrangChuyen = 'Hoàn thành'
  AND cx.ngayGioDen >= '2024-08-01' AND cx.ngayGioDen < '2024-09-01'
GROUP BY nv.hoTen;

# 2. Hiển thị danh sách các xe đang hoạt động cùng doanh thu của mỗi xe trong một tháng cụ thể.
# Doanh thu được tính dựa trên số chuyến đã thực hiện và số vé bán được trên mỗi chuyến.
SELECT
    x.maXe,
    x.bienSo,
    SUM(gv.giaVe) AS doanhThu
FROM Xe x
JOIN ChuyenXe cx
    ON x.maXe = cx.maXe
JOIN Ve v
    ON cx.maXe = v.maXe
   AND cx.maTuyen = v.maTuyen
   AND cx.maChuyen = v.maChuyen
JOIN GiaVe gv
    ON cx.maTuyen = gv.maTuyen
   AND cx.maMua = gv.maMua
   AND cx.maGiaVe = gv.maGiaVe
WHERE x.tinhTrang = 'Đang hoạt động'
  AND cx.tinhTrangChuyen = 'Hoàn thành'
  AND cx.ngayGioDen >= '2024-08-01' AND cx.ngayGioDen < '2024-09-01'
  AND cx.ngayGioKhoiHanh >= gv.ngayBatDau
  AND (gv.ngayKetThuc IS NULL OR cx.ngayGioKhoiHanh <= gv.ngayKetThuc)
GROUP BY x.maXe, x.bienSo;

# 3. Hiển thị doanh thu của từng tuyến đường vận tải, doanh thu của từng loại xe,… trong tháng.
# Doanh thu theo tuyến đường trong một tháng
SELECT td.maTuyen,
       td.diemKhoiHanh,
       td.diemDen,
       SUM(gv.giaVe) AS doanhThu
FROM Ve v
JOIN ChuyenXe cx
  ON v.maChuyen = cx.maChuyen
 AND v.maXe = cx.maXe
 AND v.maTuyen = cx.maTuyen
JOIN GiaVe gv
  ON cx.maGiaVe = gv.maGiaVe
 AND cx.maTuyen = gv.maTuyen
 AND cx.maMua = gv.maMua
JOIN TuyenDuong td
  ON cx.maTuyen = td.maTuyen
WHERE cx.tinhTrangChuyen = 'Hoàn thành'
  AND cx.ngayGioDen >= '2024-08-01' AND cx.ngayGioDen < '2024-09-01'
  AND cx.ngayGioKhoiHanh >= gv.ngayBatDau
  AND (gv.ngayKetThuc IS NULL OR cx.ngayGioKhoiHanh <= gv.ngayKetThuc)
GROUP BY td.maTuyen, td.diemKhoiHanh, td.diemDen;

# Doanh thu theo loại xe trong một tháng
SELECT x.maLoaiXe,
       lx.tenLoaiXe,
       SUM(gv.giaVe) AS doanhThu
FROM Ve v
JOIN ChuyenXe cx
  ON v.maChuyen = cx.maChuyen
 AND v.maXe = cx.maXe
 AND v.maTuyen = cx.maTuyen
JOIN GiaVe gv
  ON cx.maGiaVe = gv.maGiaVe
 AND cx.maTuyen = gv.maTuyen
 AND cx.maMua = gv.maMua
JOIN Xe x
  ON cx.maXe = x.maXe
JOIN loaixe lx
  ON lx.maLoaiXe = x.maLoaiXe
WHERE cx.tinhTrangChuyen = 'Hoàn thành'
  AND cx.ngayGioDen >= '2024-08-01' AND cx.ngayGioDen < '2024-09-01'
  AND cx.ngayGioKhoiHanh >= gv.ngayBatDau
  AND (gv.ngayKetThuc IS NULL OR cx.ngayGioKhoiHanh <= gv.ngayKetThuc)
GROUP BY x.maLoaiXe, lx.tenLoaiXe;

#  4. Hiển thị danh sách các xe cùng ngày bảo dưỡng tiếp theo cho mỗi xe, hạn đăng kiểm
WITH BaoDuongGanNhat AS (
    SELECT lb.maXe, MAX(lb.ngayBaoDuong) AS ngayBaoDuongGanNhat
    FROM LichBaoDuong lb
    GROUP BY lb.maXe
),
BaoDuong AS (
    SELECT x.maXe,
           DATE_ADD(bd.ngayBaoDuongGanNhat,
                    INTERVAL (360 - FLOOR(SUM(COALESCE(td.khoangCach,0) * td.heSoDuongKho) / 100)) DAY
                   ) AS ngayBaoDuongTiepTheo
    FROM BaoDuongGanNhat bd
    JOIN Xe x ON x.maXe = bd.maXe
    LEFT JOIN ChuyenXe cx
           ON cx.maXe = x.maXe
          AND cx.ngayGioKhoiHanh >= bd.ngayBaoDuongGanNhat
          AND cx.tinhTrangChuyen = 'Hoàn thành'
    LEFT JOIN TuyenDuong td ON td.maTuyen = cx.maTuyen
    GROUP BY x.maXe, bd.ngayBaoDuongGanNhat
),
DangKiem AS (
    SELECT hd.maXe,
           DATE_ADD(MAX(hd.ngayDangKiem), INTERVAL 1 YEAR) AS hanDangKiemTiepTheo
    FROM HanDangKiem hd
    GROUP BY hd.maXe
)
SELECT x.maXe,
       x.bienSo,
       b.ngayBaoDuongTiepTheo,
       d.hanDangKiemTiepTheo
FROM Xe x
LEFT JOIN BaoDuong b ON b.maXe = x.maXe
LEFT JOIN DangKiem d ON d.maXe = x.maXe;


#  5. Hiển thị danh sách các xe quá hạn bảo dưỡng
WITH BaoDuong AS (
    SELECT x.maXe,
           DATE_ADD(lb.ngayBaoDuong,
                    INTERVAL (360 - FLOOR(SUM(td.khoangCach * td.heSoDuongKho) / 100)) DAY
                   ) AS ngayBaoDuongTiepTheo
    FROM Xe x
    JOIN LichBaoDuong lb ON lb.maXe = x.maXe
    LEFT JOIN ChuyenXe cx
           ON cx.maXe = x.maXe
          AND cx.ngayGioKhoiHanh >= lb.ngayBaoDuong
          AND cx.tinhTrangChuyen = 'Hoàn thành'
    LEFT JOIN TuyenDuong td ON td.maTuyen = cx.maTuyen
    GROUP BY x.maXe, lb.ngayBaoDuong
)
SELECT x.maXe, x.bienSo, b.ngayBaoDuongTiepTheo
FROM Xe x
JOIN BaoDuong b ON b.maXe = x.maXe
WHERE b.ngayBaoDuongTiepTheo < CURRENT_DATE;
