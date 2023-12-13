from flask_sqlalchemy import SQLAlchemy
from app import app

db = SQLAlchemy(app)

class User(db.Model):
    UserID = db.Column(db.String(10), primary_key=True)
    Username = db.Column(db.String(255), nullable=False)
    Password = db.Column(db.String(255), nullable=False)
    Role = db.Column(db.String(10))
    Note = db.Column(db.Text)

    def __repr__(self):
        return '<User %r>' % self.username
    
class KhachHang(db.Model):
    KhachHangID = db.Column(db.String(10), primary_key=True)
    HoTen = db.Column(db.String(255), nullable=False)
    Phone = db.Column(db.String(20))
    DiaChi = db.Column(db.String(255))
    NgaySinh = db.Column(db.Date)
    Avatar = db.Column(db.String(255))
    UserID = db.Column(db.String(10), db.ForeignKey('user.UserID'))
    GhiChu = db.Column(db.Text)

class NhanVien(db.Model):
    NhanVienID = db.Column(db.String(10), primary_key=True)
    HoTen = db.Column(db.String(255), nullable=False)
    NgaySinh = db.Column(db.Date)
    Phone = db.Column(db.String(20))
    DiaChi = db.Column(db.String(255))
    Avatar = db.Column(db.String(255))
    Gmail = db.Column(db.String(255))
    UserID = db.Column(db.String(10), db.ForeignKey('user.UserID'))
    GhiChu = db.Column(db.Text)

class DonHang(db.Model):
    DonHangID = db.Column(db.String(10), primary_key=True)
    KhachHangID = db.Column(db.String(10), db.ForeignKey('khachhang.KhachHangID'))
    NhanVienID = db.Column(db.String(10), db.ForeignKey('nhanvien.NhanVienID'))
    NgayMua = db.Column(db.Date)
    SoLuong = db.Column(db.Integer)
    TongTien = db.Column(db.Numeric(10, 2))

class DanhMuc(db.Model):
    DanhMucID = db.Column(db.String(10), primary_key=True)
    TenDanhMuc = db.Column(db.String(255), nullable=False)
    MoTa = db.Column(db.Text)

class SanPham(db.Model):
    SanPhamID = db.Column(db.String(10), primary_key=True)
    TenSanPham = db.Column(db.String(255), nullable=False)
    ThongTinSanPham = db.Column(db.Text)
    GiaBan = db.Column(db.Numeric(10, 2))
    Image = db.Column(db.String(255))
    DanhMucID = db.Column(db.String(10), db.ForeignKey('danhmuc.DanhMucID'))

class ChiTietDonHang(db.Model):
    ChiTietDonHangID = db.Column(db.String(10), primary_key=True)
    DonHangID = db.Column(db.String(10), db.ForeignKey('donhang.DonHangID'))
    SanPhamID = db.Column(db.String(10), db.ForeignKey('sanpham.SanPhamID'))
    SoLuong = db.Column(db.Integer)
