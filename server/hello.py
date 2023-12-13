from flask import Flask, render_template, flash, redirect, url_for, request
import pymysql

app = Flask(__name__)
app.secret_key = 'my_secret_key'


app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = ""
app.config['MYSQL_DB'] = "dulieu_cnw2"

mysql = pymysql.connect(
    host=app.config['MYSQL_HOST'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    db=app.config['MYSQL_DB']
)

@app.route('/')
def index():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM user')  
    users = cursor.fetchall()
    cursor.close()
    
    return render_template('index.html', users=users)

@app.route('/add_user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        note = request.form['note']

        cursor = mysql.cursor()
        cursor.execute('INSERT INTO user (Username, Password, Role, Note) VALUES (%s, %s, %s, %s)', (username, password, role, note))
        mysql.commit()
        cursor.close()

        flash('Người dùng đã được thêm mới thành công', 'success')
        return redirect(url_for('index'))

    return render_template('add_user.html')

@app.route('/edit_user/<int:user_id>', methods=['GET', 'POST'])
def edit_user(user_id):
    cursor = mysql.cursor()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        note = request.form['note']
        cursor.execute('UPDATE user SET hoten = %s, age = %s WHERE id = %s', (hoten, age, user_id))
        mysql.commit()
        flash('Người dùng đã được chỉnh sửa thành công', 'success')
        return redirect(url_for('index'))
    cursor.execute('SELECT * FROM user WHERE id = %s', (user_id,))
    user = cursor.fetchone()
    cursor.close()
    return render_template('edit_user.html', user=user)

@app.route('/delete_user/<int:user_id>', methods=['GET'])
def delete_user(user_id):
    cursor = mysql.cursor()
    cursor.execute('DELETE FROM user WHERE UserID = %s', (user_id,))
    mysql.commit()
    cursor.close()
    flash('Người dùng đã được xóa thành công', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
