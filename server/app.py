from flask import Flask, render_template, flash, redirect, url_for, request, jsonify, session, abort
from functools import wraps
from datetime import datetime
import pymysql, random

app = Flask(__name__)
app.secret_key = 'my_secret_key'


app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = "123456"
app.config['MYSQL_DB'] = "hk5_python_prj"

mysql = pymysql.connect(
    host=app.config['MYSQL_HOST'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    db=app.config['MYSQL_DB']
)

def generate_random_user_id():
    random_number = random.randint(0, 999999)
    user_id = f"us{random_number:06d}"
    return user_id
def generate_random_sanpham_id():
    random_number = random.randint(0, 999999)
    user_id = f"sp{random_number:06d}"
    return user_id
def generate_random_nhanvien_id():
    random_number = random.randint(0, 999999)
    user_id = f"nv{random_number:06d}"
    return user_id
def generate_random_khachhang_id():
    random_number = random.randint(0, 999999)
    user_id = f"kh{random_number:06d}"
    return user_id
def generate_random_donhang_id():
    random_number = random.randint(0, 999999)
    user_id = f"dh{random_number:06d}"
    return user_id
def generate_random_danhmuc_id():
    random_number = random.randint(0, 999999)
    user_id = f"dm{random_number:06d}"
    return user_id
def generate_random_chitietdonhang_id():
    random_number = random.randint(0, 999999)
    user_id = f"ctdh{random_number:06d}"
    return user_id

@app.route('/')
def index():    
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM user')  
    users = cursor.fetchall()
    cursor.close()
    
    # Convert the data to a list of dictionaries
    users_list = [{'UserID': user[0], 'Username': user[1], 'Password': user[2], 'Role': user[3], 'Note': user[4]} for user in users]

    # Return JSON response
    return jsonify(users_list)

@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()

    if 'Username' not in data or 'Password' not in data:
        return jsonify({'error': 'Missing Username or Password'}), 400

    username = data['Username']
    password = data['Password']

    # Thực hiện kiểm tra username và password trong CSDL
    # Replace đoạn mã này bằng cách sử dụng thư viện ORM hoặc cách thích hợp với CSDL của bạn
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM user WHERE Username = %s AND Password = %s', (username, password))
    user = cursor.fetchone()
    cursor.close()

    if user and user[3] == 'admin':  # Ở đây, 3 là vị trí cột của Role trong bảng user
        # Thực hiện đăng nhập thành công, có thể sinh token và trả về cho người dùng
        return jsonify({'token': 'admin'})
    else:
        return jsonify({'error': 'Invalid credentials or insufficient permissions'}), 401

# Hàm decorator để kiểm tra quyền admin
def check_admin_permission():
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Thực hiện kiểm tra quyền admin
            # Thay thế đoạn mã này bằng cách sử dụng session hoặc cách xác thực phù hợp với ứng dụng của bạn
            if 'user' not in session or session['user']['Role'] != 'admin':
                return jsonify({'error': 'Unauthorized'}), 403

            return func(*args, **kwargs)

        return wrapper

    return decorator

# Sử dụng decorator cho API cần kiểm tra quyền admin
@app.route('/api/user_index', methods=['GET'])
@check_admin_permission()
def api_user_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM user')  
    users = cursor.fetchall()
    cursor.close()

    users_list = [{'UserID': user[0], 'Username': user[1], 'Password': user[2], 'Role': user[3], 'Note': user[4]} for user in users]

    return jsonify(users_list)

# ==============================================================================================

@app.route('/user_index')
def user_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM user')  
    users = cursor.fetchall()
    cursor.close()
    
    users_list = [{'UserID': user[0], 'Username': user[1], 'Password': user[2], 'Role': user[3], 'Note': user[4]} for user in users]

    return jsonify(users_list)

@app.route('/user_add', methods=['POST'])
def user_add():
    if request.method == 'POST':
        id = generate_random_user_id()
        username = request.json.get('username')  # Access JSON data using request.json
        password = request.json.get('password')
        role = request.json.get('role')
        note = request.json.get('note')

        cursor = mysql.cursor()
        cursor.execute('INSERT INTO user (UserID, Username, Password, Role, Note) VALUES (%s, %s, %s, %s, %s)', (id, username, password, role, note))
        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Người dùng đã được thêm mới thành công'})

    return jsonify({'message': 'Invalid request method'})  # Return an error message for other methods

@app.route('/user_update/<string:user_id>', methods=['PUT'])
def user_update(user_id):
    cursor = mysql.cursor()
    if request.method == 'PUT':
        data = request.json  # Access JSON data using request.json
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')
        note = data.get('note')

        cursor.execute('UPDATE user SET Username = %s, Password = %s, Role = %s, Note = %s  WHERE UserID = %s', (username, password, role, note, user_id))
        mysql.commit()

        return jsonify({'message': 'Người dùng đã được chỉnh sửa thành công'})

    return jsonify({'message': 'Invalid request method'})  # Return an error message for other methods

@app.route('/user_delete/<string:user_id>', methods=['DELETE'])
def user_delete(user_id):
    cursor = mysql.cursor()
    
    if request.method == 'DELETE':
        cursor.execute('DELETE FROM user WHERE UserID = %s', (user_id,))
        mysql.commit()
        cursor.close()
        return jsonify({'message': 'Người dùng đã được xóa thành công'})
    
    return jsonify({'message': 'Invalid request method'})  # Return an error message for other methods


# ==============================================================================================

@app.route('/nhanvien_index', methods=['GET'])
def nhanvien_index():
    cursor = mysql.cursor()

    if request.method == 'GET':
        cursor.execute('SELECT * FROM nhanvien')  
        nhanviens = cursor.fetchall()
        cursor.close()
        
        # Convert the data to a JSON format
        nhanviens_json = jsonify({'nhanviens': nhanviens})
        
        return nhanviens_json

    return jsonify({'message': 'Invalid request method'})

@app.route('/nhanvien_add', methods=['GET', 'POST'])
def nhanvien_add():
    if request.method == 'POST':
        id = generate_random_nhanvien_id()
        hoten = request.form['hoten']
        ngaysinh = datetime.strptime(request.form['ngaysinh'], '%Y-%m-%d')
        phone = request.form['phone']
        diachi = request.form['diachi']
        gmail = request.form['gmail']
        ghichu = request.form['ghichu']
        userid = request.form['userid']

        cursor = mysql.cursor()
        cursor.execute('INSERT INTO nhanvien (NhanVienID, HoTen, NgaySinh, Phone, DiaChi, Gmail, GhiChu, UserID) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (id, hoten, ngaysinh, phone, diachi, gmail, ghichu, userid))
        mysql.commit()
        cursor.close()

        # Return success message as JSON
        response = {'message': 'Người dùng đã được thêm mới thành công'}
        return jsonify(response)

    return jsonify({'message': 'Invalid request method'})


@app.route('/nhanvien_update/<string:nhanvien_id>', methods=['GET', 'POST'])
def nhanvien_update(nhanvien_id):
    cursor = mysql.cursor()

    if request.method == 'POST':
        hoten = request.form['hoten']
        ngaysinh = datetime.strptime(request.form['ngaysinh'], '%Y-%m-%d')
        phone = request.form['phone']
        diachi = request.form['diachi']
        gmail = request.form['gmail']
        ghichu = request.form['ghichu']

        cursor.execute('UPDATE nhanvien SET HoTen = %s, NgaySinh = %s, Phone = %s, DiaChi = %s, Gmail = %s, GhiChu = %s  WHERE NhanVienID = %s',
                       (hoten, ngaysinh, phone, diachi, gmail, ghichu, nhanvien_id))
        mysql.commit()

        flash('Người dùng đã được chỉnh sửa thành công', 'success')
        return redirect(url_for('nhanvien_index'))

    cursor.execute('SELECT * FROM nhanvien WHERE NhanVienID = %s', (nhanvien_id,))
    nhanvien = cursor.fetchone()
    cursor.close()

    # Convert tuple to dictionary
    nhanvien_dict = {
        'NhanVienID': nhanvien[0],
        'HoTen': nhanvien[1],
        'NgaySinh': nhanvien[2].strftime('%Y-%m-%d'),
        'Phone': nhanvien[3],
        'DiaChi': nhanvien[4],
        'Gmail': nhanvien[5],
        'GhiChu': nhanvien[6],
        'UserID': nhanvien[7],
    }

    # Return nhanvien details as JSON
    return jsonify({'nhanvien': nhanvien_dict})

from flask import jsonify

@app.route('/nhanvien_delete/<string:nhanvien_id>', methods=['DELETE'])
def nhanvien_delete(nhanvien_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM nhanvien WHERE NhanVienID = %s', (nhanvien_id,))
    mysql.commit()
    cursor.close()
    flash('Người dùng đã được xóa thành công', 'success')
    return jsonify({'message': 'Người dùng đã được xóa thành công'})


# ==============================================================================================
@app.route('/khachhang_index', methods=['GET'])
def khachhang_index():
    cursor = mysql.cursor()

    if request.method == 'GET':
        cursor.execute('SELECT * FROM khachhang')
        khachhangs = cursor.fetchall()
        cursor.close()
        return jsonify({'khachhangs': khachhangs})

    return jsonify({'message': 'Invalid request method'})

@app.route('/khachhang_add', methods=['POST'])
def khachhang_add():
    if request.method == 'POST':
        id = generate_random_khachhang_id()
        hoten = request.form['hoten']
        ngaysinh = request.form['ngaysinh']
        phone = request.form['phone']
        diachi = request.form['diachi']
        ghichu = request.form['ghichu']
        userid = request.form['userid']

        cursor = mysql.cursor()
        cursor.execute('INSERT INTO khachhang (KhachHangID, HoTen, NgaySinh, Phone, DiaChi, GhiChu, UserID) VALUES (%s, %s, %s, %s, %s, %s, %s)', (id, hoten, ngaysinh, phone, diachi, ghichu, userid))
        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Người dùng đã được thêm mới thành công'})

    return jsonify({'message': 'Invalid request method'})

@app.route('/khachhang_update/<string:khachhang_id>', methods=['POST'])
def khachhang_update(khachhang_id):
    cursor = mysql.cursor()
    if request.method == 'POST':
        hoten = request.form['hoten']
        ngaysinh = request.form['ngaysinh']
        phone = request.form['phone']
        diachi = request.form['diachi']
        ghichu = request.form['ghichu']
        cursor.execute('UPDATE khachhang SET HoTen = %s, NgaySinh = %s, Phone = %s, DiaChi = %s, GhiChu = %s  WHERE KhachHangID = %s', (hoten, ngaysinh, phone, diachi, ghichu, khachhang_id))
        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Người dùng đã được chỉnh sửa thành công'})

    return jsonify({'message': 'Invalid request method'})

@app.route('/khachhang_delete/<string:khachhang_id>', methods=['DELETE'])
def khachhang_delete(khachhang_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM khachhang WHERE KhachHangID = %s', (khachhang_id,))
    mysql.commit()
    cursor.close()

    return jsonify({'message': 'Người dùng đã được xóa thành công'})

# ==============================================================================================

from flask import jsonify

@app.route('/danhmuc_index')
def danhmuc_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM danhmuc')  
    danhmucs = cursor.fetchall()
    cursor.close()

    # Chuyển danh sách thành từ điển để jsonify có thể xử lý
    danhmucs_dict_list = []
    for danhmuc in danhmucs:
        danhmuc_dict = {
            'DanhMucID': danhmuc[0],
            'TenDanhMuc': danhmuc[1],
            'MoTa': danhmuc[2]
        }
        danhmucs_dict_list.append(danhmuc_dict)

    return jsonify({'danhmucs': danhmucs_dict_list})

@app.route('/danhmuc_add', methods=['POST'])
def danhmuc_add():
    if request.method == 'POST':
        id = generate_random_danhmuc_id()
        tendanhmuc = request.form['tendanhmuc']
        mota = request.form['mota']

        cursor = mysql.cursor()
        cursor.execute('INSERT INTO danhmuc (DanhMucID, TenDanhMuc, MoTa) VALUES (%s, %s, %s)', (id, tendanhmuc, mota))
        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Người dùng đã được thêm mới thành công', 'status': 'success'})

    return jsonify({'message': 'Invalid request method', 'status': 'error'})

@app.route('/danhmuc_update/<string:danhmuc_id>', methods=['POST'])
def danhmuc_update(danhmuc_id):
    cursor = mysql.cursor()
    if request.method == 'POST':
        tendanhmuc = request.form['tendanhmuc']
        mota = request.form['mota']
        cursor.execute('UPDATE danhmuc SET TenDanhMuc = %s, MoTa = %s WHERE DanhMucID = %s', (tendanhmuc, mota, danhmuc_id))
        mysql.commit()
        cursor.close()

        return jsonify({'message': 'Người dùng đã được chỉnh sửa thành công', 'status': 'success'})

    return jsonify({'message': 'Invalid request method', 'status': 'error'})

@app.route('/danhmuc_delete/<string:danhmuc_id>', methods=['DELETE'])
def danhmuc_delete(danhmuc_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM danhmuc WHERE DanhMucID = %s', (danhmuc_id,))
    mysql.commit()
    cursor.close()

    return jsonify({'message': 'Người dùng đã được xóa thành công', 'status': 'success'})


# ==============================================================================================

@app.route('/sanpham_index')
def sanpham_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM sanpham')  
    sanphams = cursor.fetchall()

    sanphams_list = []
    for sanpham in sanphams:
        cursor.execute('SELECT TenDanhMuc FROM danhmuc WHERE DanhMucID = %s', sanpham[5])
        ten = cursor.fetchone()
        sanpham_dict = {
            'SanPhamID': sanpham[0],
            'TenSanPham': sanpham[1],
            'ThongTinSanPham': sanpham[2],
            'GiaBan': sanpham[3],
            'DanhMucID': sanpham[5],
            'TenDanhMuc': ten[0] if ten else None
        }
        sanphams_list.append(sanpham_dict)

    cursor.close()
    
    return jsonify({'sanphams': sanphams_list})

@app.route('/sanpham_add', methods=['POST'])
def sanpham_add():
    cursor = mysql.cursor()
    if request.method == 'POST':
        id = generate_random_sanpham_id()
        tensanpham = request.form['tensanpham']
        thongtinsanpham = request.form['thongtinsanpham']
        giaban = request.form['giaban']
        tendanhmuc = request.form['tendanhmuc']

        cursor.execute('SELECT DanhMucID FROM danhmuc WHERE TenDanhMuc = %s', tendanhmuc)
        danhmucid = cursor.fetchone()[0]

        cursor.execute('INSERT INTO sanpham (SanPhamID, TenSanPham, ThongTinSanPham, GiaBan, DanhMucID) VALUES (%s, %s, %s, %s, %s)', (id, tensanpham, thongtinsanpham, giaban, danhmucid))
        mysql.commit()

        cursor.close()
        return jsonify({'message': 'Người dùng đã được thêm mới thành công', 'status': 'success'})
    
    cursor.execute('SELECT TenDanhMuc FROM danhmuc')
    tendanhmuc = cursor.fetchall()
    cursor.close()
    return jsonify({'message': 'Invalid request method', 'status': 'error'})

@app.route('/sanpham_update/<string:sanpham_id>', methods=['POST'])
def sanpham_update(sanpham_id):
    cursor = mysql.cursor()
    if request.method == 'POST':
        tensanpham = request.form['tensanpham']
        thongtinsanpham = request.form['thongtinsanpham']
        giaban = request.form['giaban']
        tendanhmuc = request.form['tendanhmuc']
        cursor.execute('SELECT DanhMucID FROM danhmuc WHERE TenDanhMuc = %s', tendanhmuc)
        danhmucid = cursor.fetchone()[0]
        cursor.execute('UPDATE sanpham SET TenSanPham = %s, ThongTinSanPham = %s, GiaBan = %s, DanhMucID = %s WHERE SanPhamID = %s', (tensanpham, thongtinsanpham, giaban, danhmucid, sanpham_id))
        mysql.commit()

        cursor.close()
        return jsonify({'message': 'Người dùng đã được chỉnh sửa thành công', 'status': 'success'})

    cursor.execute('SELECT * FROM sanpham WHERE SanPhamID = %s', (sanpham_id,))
    sanpham = cursor.fetchone()
    cursor.execute('SELECT TenDanhMuc FROM danhmuc')
    tendanhmuc = cursor.fetchall()
    cursor.close()
    
    return jsonify({'message': 'Invalid request method', 'status': 'error'})


@app.route('/sanpham_delete/<string:sanpham_id>', methods=['DELETE'])
def sanpham_delete(sanpham_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM sanpham WHERE SanPhamID = %s', (sanpham_id,))
    mysql.commit()
    cursor.close()

    return jsonify({'message': 'Người dùng đã được xóa thành công', 'status': 'success'})


# ==============================================================================================

@app.route('/donhang_index')
def donhang_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM donhang')  
    donhangs = cursor.fetchall()

    donhangs_list = []
    for donhang in donhangs:
        cursor.execute('SELECT HoTen FROM khachhang WHERE KhachHangID = %s', donhang[1])
        tenkh = cursor.fetchone()
        tenkhachhang = tenkh[0] if tenkh else None

        donhang_dict = {
            'DonHangID': donhang[0],
            'KhachHangID': donhang[1],
            'NhanVienID': donhang[2],
            'NgayMua': donhang[3],
            'SoLuong': donhang[4],
            'TongTien': donhang[5],
            'TenKhachHang': tenkhachhang
        }
        donhangs_list.append(donhang_dict)

    cursor.close()
    
    return jsonify({'donhangs': donhangs_list})

@app.route('/donhang_add', methods=['POST'])
def donhang_add():
    cursor = mysql.cursor()
    if request.method == 'POST':
        id = generate_random_donhang_id()
        tenkhachhang = request.form['tenkhachhang']
        tennhanvien = request.form['tennhanvien']
        ngaymua = request.form['ngaymua']
        soluong = request.form['soluong']
        tongtien = request.form['tongtien']
        
        cursor.execute('SELECT KhachHangID FROM khachhang WHERE HoTen = %s', tenkhachhang)
        khachhangid = cursor.fetchone()[0]
        cursor.execute('SELECT NhanVienID FROM nhanvien WHERE HoTen = %s', tennhanvien)
        nhanvienid = cursor.fetchone()[0]
        
        cursor.execute('INSERT INTO donhang (DonHangID, KhachHangID, NhanVienID, NgayMua, SoLuong, TongTien) VALUES (%s, %s, %s, %s, %s, %s)', (id, khachhangid, nhanvienid, ngaymua, soluong, tongtien))
        mysql.commit()

        cursor.close()
        return jsonify({'message': 'Người dùng đã được thêm mới thành công', 'status': 'success'})
    
    cursor.execute('SELECT HoTen FROM khachhang')
    tenkhachhangs = cursor.fetchall()
    cursor.execute('SELECT HoTen FROM nhanvien')
    tennhanviens = cursor.fetchall()

    cursor.close()
    return jsonify({'message': 'Invalid request method', 'status': 'error'})

@app.route('/donhang_update/<string:donhang_id>', methods=['POST'])
def donhang_update(donhang_id):
    cursor = mysql.cursor()
    if request.method == 'POST':
        tenkhachhang = request.form['tenkhachhang']
        tennhanvien = request.form['tennhanvien']
        ngaymua = request.form['ngaymua']
        soluong = request.form['soluong']
        tongtien = request.form['tongtien']
        cursor.execute('SELECT KhachHangID FROM khachhang WHERE HoTen = %s', tenkhachhang)
        khachhangid = cursor.fetchone()[0]
        cursor.execute('SELECT NhanVienID FROM nhanvien WHERE HoTen = %s', tennhanvien)
        nhanvienid = cursor.fetchone()[0]

        cursor.execute('UPDATE donhang SET KhachHangID = %s, NhanVienID = %s, NgayMua = %s, SoLuong = %s, TongTien = %s WHERE DonHangID = %s', (khachhangid, nhanvienid, ngaymua, soluong, tongtien, donhang_id))
        mysql.commit()

        cursor.close()
        return jsonify({'message': 'Người dùng đã được chỉnh sửa thành công', 'status': 'success'})

    cursor.execute('SELECT * FROM donhang WHERE DonHangID = %s', (donhang_id,))
    donhang = cursor.fetchone()
    cursor.execute('SELECT HoTen FROM khachhang')
    tenkhachhangs = cursor.fetchall()
    cursor.execute('SELECT HoTen FROM nhanvien')
    tennhanviens = cursor.fetchall()

    cursor.execute('SELECT HoTen FROM khachhang WHERE KhachHangID = %s', (donhang[1],))
    tenkhachhang = cursor.fetchone()
    cursor.execute('SELECT HoTen FROM nhanvien WHERE NhanVienID = %s', (donhang[2],))
    tennhanvien = cursor.fetchone()

    tenkhachhang_old = tenkhachhang[0] if tenkhachhang else ""
    tennhanvien_old = tennhanvien[0] if tennhanvien else ""

    cursor.close()
    return jsonify({'message': 'Invalid request method', 'status': 'error'})

@app.route('/donhang_delete/<string:donhang_id>', methods=['DELETE'])
def donhang_delete(donhang_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM donhang WHERE DonHangID = %s', (donhang_id,))
    mysql.commit()
    cursor.close()

    return jsonify({'message': 'Người dùng đã được xóa thành công', 'status': 'success'})


# ==============================================================================================

@app.route('/ctdh_index')
def ctdh_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM chitietdonhang')  
    ctdhs = cursor.fetchall()

    ctdhs_list = []
    for ctdh in ctdhs:
        cursor.execute('SELECT TenSanPham, GiaBan FROM sanpham WHERE SanPhamID = %s', ctdh[2])
        sp = cursor.fetchone()
        tensanpham, giaban = sp if sp else (None, None)

        ctdh_dict = {
            'ChiTietDonHangID': ctdh[0],
            'DonHangID': ctdh[1],
            'SanPhamID': ctdh[2],
            'SoLuong': ctdh[3],
            'TenSanPham': tensanpham,
            'GiaBan': giaban
        }
        ctdhs_list.append(ctdh_dict)

    cursor.close()
    
    return jsonify({'ctdhs': ctdhs_list})

@app.route('/ctdh_add', methods=['POST'])
def ctdh_add():
    cursor = mysql.cursor()
    if request.method == 'POST':
        id = generate_random_chitietdonhang_id()
        donhangid = request.form['donhangid']
        tensanpham = request.form['tensanpham']
        soluong = request.form['soluong']
        
        cursor.execute('SELECT SanPhamID FROM sanpham WHERE TenSanPham = %s', tensanpham)
        sanphamid = cursor.fetchone()[0]
        
        cursor.execute('INSERT INTO chitietdonhang (ChiTietDonHangID, DonHangID, SanPhamID, SoLuong) VALUES (%s, %s, %s, %s)', (id, donhangid, sanphamid, soluong))
        mysql.commit()

        cursor.close()
        return jsonify({'message': 'Người dùng đã được thêm mới thành công', 'status': 'success'})
    
    cursor.execute('SELECT TenSanPham FROM sanpham')
    tensanphams = cursor.fetchall()
    cursor.execute('SELECT DonHangID FROM donhang')
    donhangids = cursor.fetchall()

    cursor.close()
    return jsonify({'message': 'Invalid request method', 'status': 'error'})

@app.route('/ctdh_update/<string:ctdh_id>', methods=['POST'])
def ctdh_update(ctdh_id):
    cursor = mysql.cursor()
    if request.method == 'POST':
        donhangid = request.form['donhangid']
        tensanpham = request.form['tensanpham']
        soluong = request.form['soluong']
        
        cursor.execute('SELECT SanPhamID FROM sanpham WHERE TenSanPham = %s', tensanpham)
        sanphamid = cursor.fetchone()[0]

        cursor.execute('UPDATE chitietdonhang SET DonHangID = %s, SanPhamID = %s, SoLuong = %s WHERE ChiTietDonHangID = %s', (donhangid, sanphamid, soluong, ctdh_id))
        mysql.commit()

        cursor.close()
        return jsonify({'message': 'Người dùng đã được chỉnh sửa thành công', 'status': 'success'})

    cursor.execute('SELECT * FROM chitietdonhang WHERE ChiTietDonHangID = %s', (ctdh_id,))
    ctdh = cursor.fetchone()
    cursor.execute('SELECT DonHangID FROM donhang')
    donhangids = cursor.fetchall()
    cursor.execute('SELECT TenSanPham FROM sanpham')
    tensanphams = cursor.fetchall()

    cursor.execute('SELECT TenSanPham FROM sanpham WHERE SanPhamID = %s', (ctdh[2],))
    tensanpham = cursor.fetchone()

    donhangid_old = ctdh[1]
    tensanpham_old = tensanpham[0] if tensanpham else ""

    cursor.close()
    return jsonify({'message': 'Invalid request method', 'status': 'error'})

@app.route('/ctdh_delete/<string:ctdh_id>', methods=['DELETE'])
def ctdh_delete(ctdh_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM chitietdonhang WHERE ChiTietDonHangID = %s', (ctdh_id,))
    mysql.commit()
    cursor.close()
    
    return jsonify({'message': 'Người dùng đã được xóa thành công', 'status': 'success'})


if __name__ == '__main__':
    app.run(debug=True)
