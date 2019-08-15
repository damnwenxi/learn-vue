import jsonp from "./jsonp";
import { songUrlParams, options, songUrlData, PURL_SERVER } from "./config";
import { Base64 } from "js-base64";

export default class Song {
  constructor({ ispay, id, mid, singer, name, album, duration, image, url }) {
    this.ispay = ispay;
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }

  getLyric() {
    if (this.lyric) {
      return new Promise.resolve(this.lyric);
    }

    const promise = new Promise((resolve, reject) => {
      fetch(PURL_SERVER + "/musicLyric?id=" + this.mid)
        .then(body => {
          return body.json();
        })
        .then(res => {
          if (res.code === 0) {
            this.lyric = Base64.decode(res.lyric);
            resolve(this.lyric);
          }
        })
        .catch(() => reject("no lyric"));
    });
    return promise;
  }
}

export function getSongUrl() {
  const url = "https://c.y.qq.com/v8/fcg-bin/v8.fcg";
  const data = Object.assign({}, songUrlParams, songUrlData);
  console.log(data);
  return jsonp(url, data, options);
}

export function getPlayUrl(mid) {
  const promise = new Promise((resolve, reject) => {
    fetch(PURL_SERVER + "/qqmusic?id=" + mid)
      .then(body => {
        return body.json();
      })
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
  return promise;
}

export function createSong(musicData) {
  return new Song({
    ispay: musicData.pay.payplay,
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`,
    url: `https://api.bzqll.com/music/tencent/url?id=${
      musicData.mid
    }&key=579621905&br=320`
  });
}

function filterSinger(singer) {
  let ret = [];
  if (!singer) {
    return "";
  }
  singer.forEach(s => {
    ret.push(s.name);
  });
  return ret.join("/");
}
