SELECT
    nv.ma_nhan_vien,
    nv.ho_ten,

    /* ===== LƯƠNG CỨNG ===== */
    bl.muc_luong_co_ban AS luong_co_ban,

    /* ===== LƯƠNG TRÁCH NHIỆM (chỉ quản lý) ===== */
    CASE
        WHEN cv.ten_chuc_vu IN ('TruongPhong','PhoPhong')
        THEN COALESCE(SUM(DISTINCT da.luong_trach_nhiem),0)
        ELSE 0
    END AS luong_trach_nhiem,

    /* ===== LƯƠNG NĂNG SUẤT ===== */
    (
        bl.muc_luong_co_ban *
        (
            0.1 * COUNT(DISTINCT tgda.ma_du_an)
            +
            0.05 * COUNT(DISTINCT CASE
                    WHEN tgda.vai_tro = 'ChuTri'
                    THEN tgda.ma_du_an
            END)
        )
        +
        COALESCE(SUM(lcv.muc_luong_nang_suat),0)
    ) AS luong_nang_suat,

    /* ===== SỐ PHẦN VIỆC BỊ PHẠT ===== */
    (
        COUNT(DISTINCT CASE
            WHEN cd.ket_qua = 'KEM'
             OR (cd.ngay_hoan_thanh_thuc_te > cd.ngay_hoan_thanh_du_kien)
            THEN CONCAT(cd.ma_du_an,'-',cd.stt_cong_doan)
        END)
        +
        COUNT(DISTINCT CASE
            WHEN cviec.ket_qua = 'KEM'
             OR (cviec.ngay_hoan_thanh_thuc_te > cviec.ngay_hoan_thanh_du_kien)
            THEN cviec.ma_cong_viec
        END)
    ) AS so_phan_viec_loi,

    /* ===== TỔNG LƯƠNG ===== */
    (
        bl.muc_luong_co_ban
        +
        CASE
            WHEN cv.ten_chuc_vu IN ('TruongPhong','PhoPhong')
            THEN COALESCE(SUM(DISTINCT da.luong_trach_nhiem),0)
            ELSE 0
        END
        +
        (
            bl.muc_luong_co_ban *
            (
                0.1 * COUNT(DISTINCT tgda.ma_du_an)
                +
                0.05 * COUNT(DISTINCT CASE
                        WHEN tgda.vai_tro='ChuTri'
                        THEN tgda.ma_du_an
                END)
            )
            +
            COALESCE(SUM(lcv.muc_luong_nang_suat),0)
        )
    ) AS tong_luong,

    /* ===== TIỀN PHẠT ===== */
    (
        0.08 *
        (
            bl.muc_luong_co_ban
            +
            CASE
                WHEN cv.ten_chuc_vu IN ('TruongPhong','PhoPhong')
                THEN COALESCE(SUM(DISTINCT da.luong_trach_nhiem),0)
                ELSE 0
            END
            +
            (
                bl.muc_luong_co_ban *
                (
                    0.1 * COUNT(DISTINCT tgda.ma_du_an)
                    +
                    0.05 * COUNT(DISTINCT CASE
                            WHEN tgda.vai_tro='ChuTri'
                            THEN tgda.ma_du_an
                    END)
                )
                +
                COALESCE(SUM(lcv.muc_luong_nang_suat),0)
            )
        )
        *
        (
            COUNT(DISTINCT CASE
                WHEN cd.ket_qua = 'KEM'
                 OR (cd.ngay_hoan_thanh_thuc_te > cd.ngay_hoan_thanh_du_kien)
                THEN CONCAT(cd.ma_du_an,'-',cd.stt_cong_doan)
            END)
            +
            COUNT(DISTINCT CASE
                WHEN cviec.ket_qua = 'KEM'
                 OR (cviec.ngay_hoan_thanh_thuc_te > cviec.ngay_hoan_thanh_du_kien)
                THEN cviec.ma_cong_viec
            END)
        )
    ) AS tien_phat

FROM nhan_vien nv

LEFT JOIN xep_bac_luong xbl
    ON nv.ma_nhan_vien = xbl.ma_nhan_vien

LEFT JOIN bac_luong bl
    ON bl.ma_bac_luong = xbl.ma_bac_luong

LEFT JOIN chuc_vu cv
    ON nv.ma_nhan_vien = cv.ma_nhan_vien

LEFT JOIN tham_gia_du_an tgda
    ON nv.ma_nhan_vien = tgda.ma_nhan_vien
    AND tgda.thang = :thang
    AND tgda.nam = :nam

LEFT JOIN du_an da
    ON tgda.ma_du_an = da.ma_du_an

LEFT JOIN thuc_hien_cong_doan thcd
    ON nv.ma_nhan_vien = thcd.ma_nhan_vien

LEFT JOIN cong_doan cd
    ON cd.ma_du_an = thcd.ma_du_an
    AND cd.stt_cong_doan = thcd.stt_cong_doan

LEFT JOIN thuc_hien_cong_viec thcv
    ON nv.ma_nhan_vien = thcv.ma_nhan_vien

LEFT JOIN cong_viec cviec
    ON cviec.ma_cong_viec = thcv.ma_cong_viec

LEFT JOIN loai_cong_viec lcv
    ON lcv.ma_loai_cv = cviec.ma_loai_cv

GROUP BY
    nv.ma_nhan_vien,
    nv.ho_ten,
    bl.muc_luong_co_ban,
    cv.ten_chuc_vu

ORDER BY tong_luong DESC;
