const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');
const static = require('koa-static');
const KoaBody = require('koa-body');
const config = require('./config');
const app = new Koa();
const uuidv1 = require('uuid/v1');

app.context.db = config.db;
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    await next();
});

// 静态资源访问地址
// app.use(static(config.BASE_PATH));
app.use(KoaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 50 * 1024 * 1024  //50M
    }
}));

const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

/**
 * 测试接口
 */
router.get('/', async ctx => {
    ctx.body = { msg: "success" };
})


/**
 * @desc song upload api
 * @port /upload/, public
 * @param ...
 */
router.post('/upload', async ctx => {
    try {
        const files = ctx.request.files;
        const song = files.music || '';
        const picture = files.picture || '';
        const data = ctx.request.body;
        // console.log(data);
        // console.log(song);

        // 先存音乐背景图片，返回url地址
        let picurl = ''
        if (picture.size > 0 && picture.size < 5242880) {
            const newFileName = await saveFile(picture, config.MUSIC_PIC)
            picurl = newFileName ? (config.PIC_SERVER_NAME + newFileName) : config.DEFAULT_PIC
        } else {
            picurl = config.DEFAULT_PIC
        }
        // 判断歌曲大小
        if (song.size > 0 && song.size < 52428800) {
            const title = data.title || song.name
            const mid = uuidv1()
            const singer = data.singer || '未知歌手'
            const album = data.album || '未知专辑'
            const size = song.size
            const text = data.text || '暂无歌词'

            const newFileName = await saveFile(song, config.MUSIC_PATH)
            const purl = newFileName ? (config.MUSIC_SERVER_NAME + newFileName) : ''
            // 整理要写入到数据库的数据
            const item = [title, mid, singer, album, size, picurl, purl, text];

            // 存储相关信息到数据库
            const savaSong = await ctx.db.query(
                "insert into songs set title=?,mid=?,singer=?,album=?,msize=?,picurl=?,purl=?,mtext=?",
                item
            );

            if (savaSong.affectedRows > 0) {
                ctx.status = 200;
                ctx.body = { msg: '歌曲文件上传成功' };
            } else {
                ctx.status = 200;
                ctx.body = { msg: '上传歌曲文件失败，请稍后再试' };
            }
        } else {
            ctx.status = 200;
            ctx.body = { msg: '歌曲文件大于50M或格式有误' };
        }
    } catch (e) {
        console.log(e)
        ctx.status = 500;
        ctx.body = { msg: 'server error' }
    }
});


/**
 * @desc get songlist api
 * @port /songlist, public
 * @param page
 */
router.get('/songlist', async ctx => {
    try {
        const num = parseInt(ctx.query.num) || 100;
        const singer = ctx.query.singer.toString()
        // num合法
        let re = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/gi
        if (num >= 0 && re.test(singer)) {
            const songlist = await ctx.db.query(
                "select * from songs where singer=? order by add_date desc limit ?",
                [singer, num]
            );
            if (songlist.length > 0) {
                ctx.status = 200;
                ctx.body = { msg: 'success', songlist };
            }
        } else {
            ctx.status = 200;
            ctx.body = { msg: '参数不合法' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: 'server error' };
    }
})

/**
 * @desc del fileitem api
 * @port /api/del/, private
 * @query id
 */
router.get('/del', async ctx => {
    try {
        const id = ctx.query.id;
        const token = ctx.headers.cookie;
        if (token) {
            await jwt.verify(token, config.SECRET, async (err, decode) => {
                // token验证通过
                console.log(decode);
                if (decode) {
                    const user = await ctx.db.query(
                        'select * from user where email = ?', decode.email
                    );
                    if (user.length > 0) {
                        const delResult = await ctx.db.query(
                            "update file set showable=0 where id = ?", id
                        );
                        if (delResult.affectedRows > 0) {
                            ctx.status = 200;
                            ctx.body = { msg: '删除成功' };
                        } else {
                            ctx.status = 200;
                            ctx.body = { msg: '删除失败' };
                        }
                    }
                }
            })
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或没有权限' };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = { msg: 'err' };
    }
})

/**
 * @desc search file
 * @port /api/find/, public
 * @query keywords
 */
router.get('/find', async ctx => {
    try {
        const keywords = ctx.query.k;
        let re = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/gi
        if (re.test(keywords)) {
            const findResult = await ctx.db.query(
                'select * from songs where title like ? or singer like ? order by add_date desc',
                ['%' + keywords + '%', '%' + keywords + '%']
            );
            if (findResult.length > 0) {
                ctx.status = 200;
                ctx.body = { msg: 'success', findResult };
            } else {
                ctx.status = 200;
                ctx.body = { msg: '没有搜索结果' };
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '参数不合法' };
        }

    } catch (e) {
        ctx.status = 500;
        ctx.body = { msg: 'server error' };
    }
})

/**
 * @desc admin login api
 * @port /api/login/,public
 * @params email,passwd
 */
router.post('/login', async ctx => {
    try {
        const data = ctx.request.body;
        // 数据验证
        // 查找用户
        const findUser = await ctx.db.query(
            'select * from user where email = ?',
            data.email
        );
        if (findUser.length > 0) {
            const user = findUser[0];
            const payLoad = {
                email: user.email,
                name: user.name
            }
            await bcrypt.compare(data.passwd, user.passwd).then(res => {
                if (res) {
                    // 生成token
                    var token = jwt.sign(payLoad, config.SECRET, { expiresIn: 3600 });
                    ctx.status = 200;
                    ctx.body = { msg: '管理员身份登录成功！', user: payLoad, token };
                } else {
                    ctx.status = 400;
                    ctx.body = { msg: '密码错误！' };
                }
            });
        } else {
            ctx.status = 400;
            ctx.body = { msg: '用户不存在！' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: 'err' };
    }
})


const port = process.env.PORT || 9090;
app.listen(port, () => {
    console.log(`app is running at port ${port}`);
})

async function saveFile(file, saveDir) {
    // 创建可读流
    const rs = fs.createReadStream(file.path);
    // 重命名(uuid)
    const type = file.name.split('.').pop()
    const newFileName = uuidv1() + '.' + type
    // 创建可写流
    const ws = fs.createWriteStream(saveDir + newFileName);
    // 管道链接传输并获取地址
    const file_path = await rs.pipe(ws).path
    if (file_path) {
        return newFileName
    } else {
        return ''
    }
}