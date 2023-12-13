from flask import Flask, render_template, flash, redirect, url_for, request, jsonify 
import pymysql, random

app = Flask(__name__)
app.secret_key = 'my_secret_key'


app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = ""
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
    
    # return render_template('user_index.html', users=users)
    # Convert the data to a list of dictionaries
    users_list = [{'UserID': user[0], 'Username': user[1], 'Password': user[2], 'Role': user[3], 'Note': user[4]} for user in users]

    # Return JSON response
    return jsonify(users_list)


# ==============================================================================================

@app.route('/user_index')
def user_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM user')  
    users = cursor.fetchall()
    cursor.close()
    
    # return render_template('user_index.html', users=users)
    users_list = [{'UserID': user[0], 'Username': user[1], 'Password': user[2], 'Role': user[3], 'Note': user[4]} for user in users]

    return jsonify(users_list)

@app.route('/user_add', methods=['GET', 'POST'])
def user_add():
    if request.method == 'POST':
        id = generate_random_user_id()
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        note = request.form['note']

        cursor = mysql.cursor()
        cursor.execute('INSERT INTO user (UserID, Username, Password, Role, Note) VALUES (%s, %s, %s, %s, %s)', (id, username, password, role, note))
        mysql.commit()
        cursor.close()

    #     flash('Người dùng đã được thêm mới thành công', 'success')
    #     return redirect(url_for('user_index'))

    # return render_template('user_add.html')
        return jsonify({'message': 'Người dùng đã được thêm mới thành công'})

    return jsonify({'message': 'Invalid request method'})  # Return an error message for other methods

@app.route('/user_update/<string:user_id>', methods=['GET', 'POST'])
def user_update(user_id):
    cursor = mysql.cursor()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        note = request.form['note']
        cursor.execute('UPDATE user SET Username = %s, Password = %s, Role = %s, Note = %s  WHERE UserID = %s', (username, password, role, note, user_id))
        mysql.commit()
        flash('Người dùng đã được chỉnh sửa thành công', 'success')
        return redirect(url_for('user_index'))
    cursor.execute('SELECT * FROM user WHERE UserID = %s', (user_id,))
    user = cursor.fetchone()
    cursor.close()
    return render_template('user_update.html', user=user)

@app.route('/user_delete/<string:user_id>', methods=['GET'])
def user_delete(user_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM user WHERE UserID = %s', (user_id,))
    mysql.commit()
    cursor.close()
    flash('Người dùng đã được xóa thành công', 'success')
    return redirect(url_for('user_index'))

# ==============================================================================================

@app.route('/nhanvien_index')
def nhanvien_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM nhanvien')  
    nhanviens = cursor.fetchall()
    cursor.close()
    
    return render_template('nhanvien_index.html', nhanviens=nhanviens)

@app.route('/nhanvien_add', methods=['GET', 'POST'])
def nhanvien_add():
    if request.method == 'POST':
        id = generate_random_nhanvien_id()
        hoten = request.form['hoten']
        ngaysinh = request.form['password']
        phone = request.form['phone']
        diachi = request.form['diachi']
        gmail = request.form['gmail']
        ghichu = request.form['ghichu']
        userid = request.form['userid']

        cursor = mysql.cursor()
        cursor.execute('INSERT INTO nhanvien (NhanVienID, HoTen, NgaySinh, Phone, DiaChi, Gmail, GhiChu, UserID) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (id, hoten, ngaysinh, phone, diachi, gmail, ghichu, userid))
        mysql.commit()
        cursor.close()

        flash('Người dùng đã được thêm mới thành công', 'success')
        return redirect(url_for('nhanvien_index'))

    return render_template('nhanvien_add.html')

@app.route('/nhanvien_update/<string:nhanvien_id>', methods=['GET', 'POST'])
def nhanvien_update(nhanvien_id):
    cursor = mysql.cursor()
    if request.method == 'POST':
        hoten = request.form['hoten']
        ngaysinh = request.form['ngaysinh']
        phone = request.form['phone']
        diachi = request.form['diachi']
        gmail = request.form['gmail']
        ghichu = request.form['ghichu']
        cursor.execute('UPDATE nhanvien SET HoTen = %s, NgaySinh = %s, Phone = %s, DiaChi = %s, Gmail = %s, GhiChu = %s  WHERE NhanVienID = %s', (hoten, ngaysinh, phone, diachi, gmail, ghichu, nhanvien_id))
        mysql.commit()
        flash('Người dùng đã được chỉnh sửa thành công', 'success')
        return redirect(url_for('nhanvien_index'))
    cursor.execute('SELECT * FROM nhanvien WHERE NhanVienID = %s', (nhanvien_id,))
    nhanvien = cursor.fetchone()
    cursor.close()
    return render_template('nhanvien_update.html', nhanvien=nhanvien)

@app.route('/nhanvien_delete/<string:nhanvien_id>', methods=['GET', 'POST'])
def nhanvien_delete(nhanvien_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM nhanvien WHERE NhanVienID = %s', (nhanvien_id,))
    mysql.commit()
    cursor.close()
    flash('Người dùng đã được xóa thành công', 'success')
    return redirect(url_for('nhanvien_index'))

# ==============================================================================================

@app.route('/khachhang_index')
def khachhang_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM khachhang')  
    khachhangs = cursor.fetchall()
    cursor.close()
    
    return render_template('khachhang_index.html', khachhangs=khachhangs)

@app.route('/khachhang_add', methods=['GET', 'POST'])
def khachhang_add():
    if request.method == 'POST':
        id = generate_random_khachhang_id()
        hoten = request.form['hoten']
        ngaysinh = request.form['password']
        phone = request.form['phone']
        diachi = request.form['diachi']
        ghichu = request.form['ghichu']
        userid = request.form['userid']

        cursor = mysql.cursor()
        cursor.execute('INSERT INTO khachhang (KhachHangID, HoTen, NgaySinh, Phone, DiaChi, GhiChu, UserID) VALUES (%s, %s, %s, %s, %s, %s, %s)', (id, hoten, ngaysinh, phone, diachi, ghichu, userid))
        mysql.commit()
        cursor.close()

        flash('Người dùng đã được thêm mới thành công', 'success')
        return redirect(url_for('khachhang_index'))

    return render_template('khachhang_add.html')

@app.route('/khachhang_update/<string:khachhang_id>', methods=['GET', 'POST'])
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
        flash('Người dùng đã được chỉnh sửa thành công', 'success')
        return redirect(url_for('khachhang_index'))
    cursor.execute('SELECT * FROM khachhang WHERE KhachHangID = %s', (khachhang_id,))
    khachhang = cursor.fetchone()
    cursor.close()
    return render_template('khachhang_update.html', khachhang=khachhang)

@app.route('/khachhang_delete/<string:khachhang_id>', methods=['GET', 'POST'])
def khachhang_delete(khachhang_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM khachhang WHERE KhachHangID = %s', (khachhang_id,))
    mysql.commit()
    cursor.close()
    flash('Người dùng đã được xóa thành công', 'success')
    return redirect(url_for('khachhang_index'))

# ==============================================================================================

@app.route('/danhmuc_index')
def danhmuc_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM danhmuc')  
    danhmucs = cursor.fetchall()
    cursor.close()
    
    return render_template('danhmuc_index.html', danhmucs=danhmucs)

@app.route('/danhmuc_add', methods=['GET', 'POST'])
def danhmuc_add():
    if request.method == 'POST':
        id = generate_random_danhmuc_id()
        tendanhmuc = request.form['tendanhmuc']
        mota = request.form['mota']

        cursor = mysql.cursor()
        cursor.execute('INSERT INTO danhmuc (DanhMucID, TenDanhMuc, MoTa) VALUES (%s, %s, %s)', (id, tendanhmuc, mota))
        mysql.commit()
        cursor.close()

        flash('Người dùng đã được thêm mới thành công', 'success')
        return redirect(url_for('danhmuc_index'))

    return render_template('danhmuc_add.html')

@app.route('/danhmuc_update/<string:danhmuc_id>', methods=['GET', 'POST'])
def danhmuc_update(danhmuc_id):
    cursor = mysql.cursor()
    if request.method == 'POST':
        tendanhmuc = request.form['tendanhmuc']
        mota = request.form['mota']
        cursor.execute('UPDATE danhmuc SET TenDanhMuc = %s, MoTa = %s WHERE DanhMucID = %s', (tendanhmuc, mota, danhmuc_id))
        mysql.commit()
        flash('Người dùng đã được chỉnh sửa thành công', 'success')
        return redirect(url_for('danhmuc_index'))
    cursor.execute('SELECT * FROM danhmuc WHERE DanhMucID = %s', (danhmuc_id,))
    danhmuc = cursor.fetchone()
    cursor.close()
    return render_template('danhmuc_update.html', danhmuc=danhmuc)

@app.route('/danhmuc_delete/<string:danhmuc_id>', methods=['GET', 'POST'])
def danhmuc_delete(danhmuc_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM danhmuc WHERE DanhMucID = %s', (danhmuc_id,))
    mysql.commit()
    cursor.close()
    flash('Người dùng đã được xóa thành công', 'success')
    return redirect(url_for('danhmuc_index'))

# ==============================================================================================

@app.route('/sanpham_index')
def sanpham_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM sanpham')  
    sanphams = cursor.fetchall()
    tendanhmucs = []
    for sanpham in sanphams:
        cursor.execute('SELECT TenDanhMuc FROM danhmuc WHERE DanhMucID = %s', sanpham[5])
        ten = cursor.fetchone()
        tendanhmucs.append(ten[0])
    cursor.close()
    
    return render_template('sanpham_index.html', sanphams=sanphams, tendanhmuc=tendanhmucs)

@app.route('/sanpham_add', methods=['GET', 'POST'])
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

        flash('Người dùng đã được thêm mới thành công', 'success')
        return redirect(url_for('sanpham_index'))
    
    cursor.execute('SELECT TenDanhMuc FROM danhmuc')
    tendanhmuc = cursor.fetchall()
    cursor.close()
    return render_template('sanpham_add.html', tendanhmuc=tendanhmuc)

@app.route('/sanpham_update/<string:sanpham_id>', methods=['GET', 'POST'])
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
        flash('Người dùng đã được chỉnh sửa thành công', 'success')
        return redirect(url_for('sanpham_index'))
    cursor.execute('SELECT * FROM sanpham WHERE SanPhamID = %s', (sanpham_id,))
    sanpham = cursor.fetchone()
    cursor.execute('SELECT TenDanhMuc FROM danhmuc')
    tendanhmuc = cursor.fetchall()

    cursor.close()
    return render_template('sanpham_update.html', sanpham=sanpham, tendanhmuc=tendanhmuc)

@app.route('/sanpham_delete/<string:sanpham_id>', methods=['GET', 'POST'])
def sanpham_delete(sanpham_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM sanpham WHERE SanPhamID = %s', (sanpham_id,))
    mysql.commit()
    cursor.close()
    flash('Người dùng đã được xóa thành công', 'success')
    return redirect(url_for('sanpham_index'))

# ==============================================================================================

@app.route('/donhang_index')
def donhang_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM donhang')  
    donhangs = cursor.fetchall()
    tenkhachhangs = []
    for donhang in donhangs:
        cursor.execute('SELECT HoTen FROM khachhang WHERE KhachHangID = %s', donhang[1])
        tenkh = cursor.fetchone()
        tenkhachhangs.append(tenkh[0])
    cursor.close() 
    
    return render_template('donhang_index.html', donhangs=donhangs, tenkhachhangs=tenkhachhangs)

@app.route('/donhang_add', methods=['GET', 'POST'])
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

        flash('Người dùng đã được thêm mới thành công', 'success')
        return redirect(url_for('donhang_index'))
    
    cursor.execute('SELECT HoTen FROM khachhang')
    tenkhachhangs = cursor.fetchall()
    cursor.execute('SELECT HoTen FROM nhanvien')
    tennhanviens = cursor.fetchall()

    cursor.close()
    return render_template('donhang_add.html', tenkhachhangs=tenkhachhangs, tennhanviens=tennhanviens)

@app.route('/donhang_update/<string:donhang_id>', methods=['GET', 'POST'])
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
        flash('Người dùng đã được chỉnh sửa thành công', 'success')
        return redirect(url_for('donhang_index'))
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
    return render_template('donhang_update.html', donhang=donhang, tenkhachhangs=tenkhachhangs, tennhanviens=tennhanviens, tenkhachhang_old=tenkhachhang_old, tennhanvien_old=tennhanvien_old)

@app.route('/donhang_delete/<string:donhang_id>', methods=['GET', 'POST'])
def donhang_delete(donhang_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM donhang WHERE DonHangID = %s', (donhang_id,))
    mysql.commit()
    cursor.close()
    flash('Người dùng đã được xóa thành công', 'success')
    return redirect(url_for('donhang_index'))

# ==============================================================================================

@app.route('/ctdh_index')
def ctdh_index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM chitietdonhang')  
    ctdhs = cursor.fetchall()
    sanphams = []
    for ctdh in ctdhs:
        cursor.execute('SELECT TenSanPham, GiaBan FROM sanpham WHERE SanPhamID = %s', ctdh[2])
        sp = cursor.fetchone()
        sanphams.append(sp)
    cursor.close() 
    
    return render_template('ctdh_index.html', ctdhs=ctdhs, sanphams=sanphams)

@app.route('/ctdh_add', methods=['GET', 'POST'])
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

        flash('Người dùng đã được thêm mới thành công', 'success')
        return redirect(url_for('ctdh_index'))
    
    cursor.execute('SELECT TenSanPham FROM sanpham')
    tensanphams = cursor.fetchall()
    cursor.execute('SELECT DonHangID FROM donhang')
    donhangids = cursor.fetchall()

    cursor.close()
    return render_template('ctdh_add.html', tensanphams=tensanphams, donhangids=donhangids)

@app.route('/ctdh_update/<string:ctdh_id>', methods=['GET', 'POST'])
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
        flash('Người dùng đã được chỉnh sửa thành công', 'success')
        return redirect(url_for('ctdh_index'))
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
    return render_template('ctdh_update.html', ctdh=ctdh, donhangids=donhangids, tensanphams=tensanphams, donhangid_old=donhangid_old, tensanpham_old=tensanpham_old)

@app.route('/ctdh_delete/<string:ctdh_id>', methods=['GET', 'POST'])
def ctdh_delete(ctdh_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM chitietdonhang WHERE ChiTietDonHangID = %s', (ctdh_id,))
    mysql.commit()
    cursor.close()
    flash('Người dùng đã được xóa thành công', 'success')
    return redirect(url_for('ctdh_index'))

if __name__ == '__main__':
    app.run(debug=True)
