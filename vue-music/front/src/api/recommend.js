import jsonp from "./jsonp";
import { commonParams, options, PURL_SERVER } from "./config";

export function getRecommend() {
  const url =
    "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";

  const data = {
    ...commonParams,
    platform: "h5",
    uin: 0,
    needNewCode: 1
  };

  return jsonp(url, data, options);
}

export function getDiscList() {
  let promise = new Promise((resolve, reject) => {
    fetch(PURL_SERVER + "/playlist")
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

export function getDiscDetail(id) {
  let promise = new Promise((resolve, reject) => {
    fetch(PURL_SERVER + "/cddetail?id=" + id)
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
