const mysql = require('mysql');

const co = require('co-mysql');
const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'music',
    timezone: "08:00"
});

module.exports = {
    db: co(db),
    MUSIC_PATH: '/Users/kkboom/Desktop/music/',  //音乐文件保存地址
    DEFAULT_PIC: 'aa',
    MUSIC_PIC: '/Users/kkboom/Desktop/music/',
    MUSIC_SERVER_NAME: '198.181.33.20/musicsource/',
    PIC_SERVER_NAME: '198.181.33.20/musicpic/'
}