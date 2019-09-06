const Koa = require("koa");
const Router = require("koa-router");
const rp = require("request-promise");
const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Headers", "*");
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();
});

// 获取qq音乐vkey
router.get("/qqmusic", async ctx => {
  try {
    const id = ctx.query.id.toString();
    const preurl =
      "https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey4583585168216277&g_tk=377014325&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=";

    const data = `{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1411302730","songmid":["${id}"],"songtype":[0],"uin":"1396956549","loginflag":1,"platform":"20"}},"comm":{"uin":1396956549,"format":"json","ct":24,"cv":0}}`;

    const returl = preurl + encodeURIComponent(data);

    await rp(returl)
      .then(res => {
        const jsonres = JSON.parse(res);
        const resdata = jsonres.req_0.data;
        ctx.body = { midurlinfo: resdata.midurlinfo[0], sip: resdata.sip };
      })
      .catch(e => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
    ctx.body = {
      msg: "error"
    };
  }
});

// 获取qq音乐歌词接口
router.get("/musicLyric", async ctx => {
  try {
    const id = ctx.query.id.toString();
    const preurl =
      "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1565861980177&g_tk=693935862&loginUin=1396956549&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";

    var options = {
      uri: preurl,
      qs: {
        songmid: id
        //   &=002qpjAV2lYx81
      },
      headers: {
        "User-Agent": "Request-Promise",
        referer: "https://y.qq.com/portal/player.html"
      },
      json: true // Automatically parses the JSON string in the response
    };

    await rp(options)
      .then(res => {
        ctx.body = { code: res.code, lyric: res.lyric };
      })
      .catch(e => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
    ctx.body = {
      msg: "error"
    };
  }
});

// 获取播放列表
router.get("/playlist", async ctx => {
  try {
    const preurl =
      "https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom49029912403646314&g_tk=693935862&loginUin=1396956549&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=";

    const data =
      '{"comm":{"ct":24},"playlist":{"method":"get_playlist_by_category","param":{"id":3317,"curPage":1,"size":40,"order":5,"titleid":3317},"module":"playlist.PlayListPlazaServer"}}';

    const returl = preurl + encodeURIComponent(data);

    await rp(returl)
      .then(res => {
        const jsonres = JSON.parse(res);
        if (jsonres.code === 0) {
          ctx.body = { msg: "sucess", playlist: jsonres.playlist.data };
        } else {
          ctx.body = { msg: "error" };
        }
      })
      .catch(e => {
        console.log(e);
      });
  } catch (error) {
    throw error;
  }
});

// 获取歌单详情接口
router.get("/cddetail", async ctx => {
  try {
    const id = ctx.query.id.toString();
    const preurl =
      "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&new_format=1&g_tk=693935862&loginUin=1396956549&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";

    var options = {
      uri: preurl,
      qs: {
        disstid: id
        // disstid=7001035571
      },
      headers: {
        "User-Agent": "Request-Promise",
        referer: `https://y.qq.com/n/yqq/playsquare/${id}.html`
      },
      json: true // Automatically parses the JSON string in the response
    };

    await rp(options)
      .then(res => {
        if (res.code === 0) {
          ctx.body = { code: res.code, cdlist: res.cdlist };
        } else {
          ctx.body = { code: res.code };
        }
      })
      .catch(e => {
        console.log(e);
      });
  } catch (e) {
    ctx.body = {
      msg: "error"
    };
  }
});

// 获取排行榜接口
router.get("/rank", async ctx => {
  try {
    let params = { "req_0": { "module": "musicToplist.ToplistInfoServer", "method": "GetAll", "param": {} }, "comm": { "g_tk": 5381, "uin": 0, "format": "json", "ct": 23, "cv": 0 } }
    var options = {
      method: 'POST',
      uri: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
      qs: {
        _:Date.now()
      },
      headers: {
        "User-Agent": "Request-Promise",
        'Content-Type': 'application/json'
      },
      body:params,
      json: true // Automatically parses the JSON string in the response
    };

    await rp(options)
      .then(res => {
        if (res.code === 0) {
          ctx.body = { code: res.code, rankList: res.req_0.data.group };
        } else {
          ctx.body = { code: res.code };
        }
      })
      .catch(e => {
        console.log(e);
      });
  } catch (e) {
    ctx.body = {
      msg: "error"
    };
  }
});

// 获取排行榜播放列表
router.get('/rankDetail', async ctx=>{
  try {
    const id = ctx.query.id.toString();
    let data = `{ "detail": { "module": "musicToplist.ToplistInfoServer", "method": "GetDetail", "param": { "topId": ${id}, "offset": 0, "num": 20, "period": "2019-09-05" } }, "comm": { "ct": 24, "cv": 0 } }`
    const preurl =
      "https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI9405228009692879&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";

    var options = {
      uri: preurl,
      qs: {
        data: data
      },
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true // Automatically parses the JSON string in the response
    };

    await rp(options)
      .then(res => {
        if (res.code === 0) {
          console.log(res)
          ctx.body = { code: res.code, detail:res.detail };
        } else {
          ctx.body = { code: res.code };
        }
      })
      .catch(e => {
        console.log(e);
      });
  } catch (e) {
    ctx.body = {
      msg: "error"
    };
  }
})

// 获取歌曲mid
router.get('/getSongMid', async ctx=>{
  try {
    let id = ctx.request.query.id.toString()
    let preurl = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?ct=24&g_tk=5381&loginUin=1396956549&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
    
    var options = {
      uri: preurl,
      qs: {
        albummid: id
      },
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true // Automatically parses the JSON string in the response
    };

    await rp(options)
      .then(res => {
        if (res.code === 0) {
          ctx.body = { code: res.code, data: res.data };
        } else {
          ctx.body = { code: res.code };
        }
      })
      .catch(e => {
        console.log(e);
      });
  
  } catch (e) {
    console.log(e)
  }
})


// 关键字搜索
router.get('/search', async ctx => {
  try {
    let key = ctx.request.query.w.toString()
    let preurl = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&searchid=53963511043613753&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&g_tk=5381&loginUin=1396956549&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'

    var options = {
      uri: preurl,
      qs: {
        w: key
      },
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true // Automatically parses the JSON string in the response
    };

    await rp(options)
      .then(res => {
        if (res.code === 0) {
          ctx.body = res;
        } else {
          ctx.body = { code: res.code };
        }
      })
      .catch(e => {
        console.log(e);
      });

  } catch (e) {
    console.log(e)
  }
})


// 热词推荐
router.get('/hotkey', async ctx => {
  try {
    let preurl = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&loginUin=1396956549&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'

    var options = {
      uri: preurl,
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true // Automatically parses the JSON string in the response
    };

    await rp(options)
      .then(res => {
        if (res.code === 0) {
          ctx.body = res;
        } else {
          ctx.body = { code: res.code };
        }
      })
      .catch(e => {
        console.log(e);
      });

  } catch (e) {
    console.log(e)
  }
})


app.use(router.routes()).use(router.allowedMethods());
app.listen(9999, () => {
  console.log("app id running on port 9999");
});
