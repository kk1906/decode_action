//Fri Jul 19 2024 12:16:57 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
NAME = "乐音清扬";
VALY = ["lyqyck"];
CK = "";
LOGS = 0;
usid = 0;
var _0x58b826 = require("jsrsasign");
const _0x2f02bb = require("fs");
dcfhost = process.env.dcfhost;
nowhour = Math.round(new Date().getHours()).toString();
Notify = 1;
class _0x2f5023 {
  constructor(_0x2923d3) {
    this.rsakey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB";
    this.phone = _0x2923d3.split("#")[0];
    this.password = encodeURIComponent($.RSA(_0x2923d3.split("#")[1], this.rsakey));
    this.txtoken = _0x2923d3.split("#")[2];
    this.txun = _0x2923d3.split("#")[3];
    this.ts = $.time(13);
    this.reid = $.udid(1);
    this.logs = true;
  }
  async ["login"]() {
    let _0x548ec0 = "client_id=58&password=" + this.password + "&phone_number=" + this.phone,
      _0x561c08 = await $.task("post", "https://passport.tmuyun.com/web/oauth/credential_auth", {}, _0x548ec0);
    if (_0x561c08.code == 0) {
      this.code = _0x561c08.data.authorization_code.code;
      await this.gettoken();
    }
  }
  async ["gettoken"]() {
    let _0x3ef5c4 = $.SHA_Encrypt(1, "SHA256", "/api/zbtxz/login&&6539ed11eb852e639d7e51e3&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&41"),
      _0xd35361 = {
        "X-SESSION-ID": "6539ed11eb852e639d7e51e3",
        "X-REQUEST-ID": this.reid,
        "X-TIMESTAMP": this.ts,
        "X-SIGNATURE": _0x3ef5c4,
        "X-TENANT-ID": 41,
        "User-Agent": "1.1.4;" + this.reid + ";Xiaomi M2011K2C;Android;11;Release"
      },
      _0x484636 = "code=" + this.code + "&token=&type=-1&union_id=",
      _0x429e5a = await $.task("post", "https://vapp.tmuyun.com/api/zbtxz/login", _0xd35361, _0x484636);
    _0x429e5a.code == 0 ? (this.sessionid = _0x429e5a.data.session.id, this.accountid = _0x429e5a.data.session.account_id, this.name = _0x429e5a.data.account.nick_name, console.log("【" + this.name + "】登录成功"), this.logs = true) : this.logs = false;
  }
  async ["getreadinfo"]() {
    let _0x2f01dd = "accountId=" + this.accountid + "&sessionId=" + this.sessionid,
      _0x28b42f = await $.task("post", "https://s.yqbtv.cn/index.php/Api/App/getAppUserInfo", {}, _0x2f01dd);
    this.userinfo = _0x28b42f.data.userInfo;
  }
  async ["readlist1"]() {
    let _0x253f09 = await $.task("post", "https://s.yqbtv.cn/index.php/Api/App/getTaskListV2", {});
    if (_0x253f09.code == 1) {
      let _0x501f47 = $.timenow();
      for (let _0x1d8cdf of _0x253f09.data.list) {
        if (_0x1d8cdf.date == _0x501f47) {
          let _0x3b2c05 = _0x1d8cdf.id;
          await this.readlist2(_0x3b2c05);
        }
      }
    }
  }
  async ["readlist2"](_0x12701b) {
    let _0x12697d = $.timenow(),
      _0x4075fd = "date=" + _0x12697d + "&id=" + _0x12701b + "&accountId=" + this.accountid,
      _0xb0ee5a = await $.task("post", "https://s.yqbtv.cn/index.php/Api/App/getDutyNewsListV2", {}, _0x4075fd);
    if (_0xb0ee5a.code == 1) {
      const {
          list = [],
          token = ""
        } = _0xb0ee5a.data || {},
        _0x1e1797 = list.filter(_0x98deb9 => _0x98deb9.hasRead === "n"),
        _0x2e43cf = {
          "token": token,
          "notRead": _0x1e1797.map(({
            id: _0x328c50,
            url: _0x4220a4,
            d_id: _0xb28aae
          }) => ({
            "id": _0x328c50,
            "url": _0x4220a4,
            "d_id": _0xb28aae
          }))
        };
      if (_0x2e43cf.notRead.length != 0) {
        let _0x5a4696 = _0x2e43cf.token,
          _0x41d5b7 = _0x2e43cf.notRead[0].id,
          _0x504cea = _0x2e43cf.notRead[0].url,
          _0x19d8b7 = _0x504cea.match(/id=([\w\-]+)/)[1],
          _0xb72798 = _0x2e43cf.notRead[0].d_id;
        await this.doread(_0x41d5b7, _0x5a4696, _0xb72798, _0x19d8b7);
      }
    }
  }
  async ["doread"](_0x430024, _0x38f5c9, _0x1f142d, _0x1c2206) {
    let _0x92cabf = $.timenow(),
      _0x3e91e5 = $.time(10),
      _0x27bd78 = $.DecryptCrypto("0", "AES", "CBC", "ZeroPadding", "{\"time\":" + _0x3e91e5 + ",\"accountId\":\"" + this.accountid + "\"}", "2e32316663372d643135363263306529", "4778677a732f34744e4d6b3553444764"),
      _0x99f66c = encodeURIComponent(this.userinfo.createdAt).replace("%20", "+"),
      _0x431cb1 = encodeURIComponent(this.userinfo.headImgUrl),
      _0x58af40 = encodeURIComponent(this.userinfo.city),
      _0x53d9a3 = encodeURIComponent(this.userinfo.nickName),
      _0x3d40ba = encodeURIComponent(this.userinfo.recentActiveTime).replace("%20", "+"),
      _0x3310d0 = "id=" + _0x430024 + "&accountId=" + this.accountid + "&date=" + _0x92cabf + "&d_id=" + _0x1f142d + "&todayTask=8&userInfo%5BaccountId%5D=" + this.accountid + "&userInfo%5BisLogin%5D=1&userInfo%5BcreatedAt%5D=" + _0x99f66c + "&userInfo%5BheadImgUrl%5D=" + _0x431cb1 + "&userInfo%5Bcity%5D=" + _0x58af40 + "&userInfo%5BnickName%5D=" + _0x53d9a3 + "&userInfo%5BclientCode%5D=" + this.userinfo.clientCode + "&userInfo%5BrecentActiveTime%5D=" + _0x3d40ba + "&userInfo%5Bgrade%5D=" + this.userinfo.grade + "&userInfo%5Bmobile%5D=" + this.userinfo.mobile + "&userInfo%5BrefCode%5D=" + this.userinfo.refCode + "&userInfo%5BdeviceId%5D=" + this.userinfo.deviceId + "&token=" + _0x38f5c9,
      _0x30311a = {
        "Authorization": "Bearer " + _0x3e91e5 + "," + _0x27bd78
      },
      _0x2991a3 = await $.task("post", "https://s.yqbtv.cn/index.php/Api/App/setReadHistoryLogV2", _0x30311a, _0x3310d0);
    _0x2991a3.code == 1 && _0x2991a3.msg == "success" ? (console.log("【" + this.name + "】阅读文章成功"), await $.wait(1000), await this.endread(_0x1c2206), await this.readlist2(_0x1f142d), await $.wait(1000)) : await this.readlist2(_0x1f142d);
  }
  async ["endread"](_0x7c002c) {}
  async ["getMyLotteryCounts"]() {
    let _0x335ccf = "accountId=" + this.accountid,
      _0x5b5d30 = await $.task("post", "https://s.yqbtv.cn/index.php/Api/App/getMyLotteryCounts", {}, _0x335ccf);
    if (_0x5b5d30.code == 1) {
      let _0x30837d = _0x5b5d30.data.nums;
      await this.choujiangid(_0x30837d);
    }
  }
  async ["choujiangid"](_0x3db7e0) {
    for (let _0x265c51 = 0; _0x265c51 < _0x3db7e0; _0x265c51++) {
      let _0x564ff9 = await $.task("post", "https://s.yqbtv.cn/index.php/Api/App/getLotteryItem", {}),
        _0x3b9e92 = _0x564ff9.data.token,
        _0x1998ee = _0x564ff9.data.aid;
      await this.choujiang(_0x3b9e92, _0x1998ee);
    }
  }
  async ["choujiang"](_0x33f85c, _0x52da86) {
    let _0x56bbb0 = encodeURIComponent(this.userinfo.createdAt).replace("%20", "+"),
      _0x518399 = encodeURIComponent(this.userinfo.headImgUrl),
      _0x495223 = encodeURIComponent(this.userinfo.city),
      _0x5c5f9a = encodeURIComponent(this.userinfo.nickName),
      _0x10994b = encodeURIComponent(this.userinfo.recentActiveTime).replace("%20", "+"),
      _0x1c6ced = "lotteryItem%5B0%5D%5Bfonts%5D%5B0%5D%5Btext%5D=8.8%E5%85%83%E7%BA%A2%E5%8C%85&lotteryItem%5B0%5D%5Bfonts%5D%5B0%5D%5BfontSize%5D=1.3rem&lotteryItem%5B0%5D%5Bfonts%5D%5B0%5D%5Btop%5D=10%25&lotteryItem%5B0%5D%5Bfonts%5D%5B0%5D%5BfontColor%5D=%23da4c44&lotteryItem%5B0%5D%5Bid%5D=22&lotteryItem%5B0%5D%5BisLottery%5D=true&lotteryItem%5B0%5D%5Bnum%5D=8.8&lotteryItem%5B0%5D%5Bindex%5D=0&lotteryItem%5B0%5D%5Bbackground%5D=%23fce9ca&lotteryItem%5B0%5D%5Bimgs%5D%5B0%5D%5Bsrc%5D=https%3A%2F%2Fcos.yqbtv.cn%2Fuploads%2F20230421%2F4c86b178e1e1d224edf5bb615a4384cb.png&lotteryItem%5B0%5D%5Bimgs%5D%5B0%5D%5Bwidth%5D=18%25&lotteryItem%5B0%5D%5Bimgs%5D%5B0%5D%5Btop%5D=30%25&lotteryItem%5B1%5D%5Bfonts%5D%5B0%5D%5Btext%5D=50%E7%A7%AF%E5%88%86&lotteryItem%5B1%5D%5Bfonts%5D%5B0%5D%5BfontSize%5D=1.3rem&lotteryItem%5B1%5D%5Bfonts%5D%5B0%5D%5Btop%5D=10%25&lotteryItem%5B1%5D%5Bfonts%5D%5B0%5D%5BfontColor%5D=%23fff&lotteryItem%5B1%5D%5Bid%5D=23&lotteryItem%5B1%5D%5BisLottery%5D=false&lotteryItem%5B1%5D%5Bnum%5D=0&lotteryItem%5B1%5D%5Bindex%5D=1&lotteryItem%5B1%5D%5Bbackground%5D=%23d94c44&lotteryItem%5B1%5D%5Bimgs%5D%5B0%5D%5Bsrc%5D=https%3A%2F%2Fcos.yqbtv.cn%2Fuploads%2F20230421%2Ff3f098a9e703c8a6a8f7f63832856950.png&lotteryItem%5B1%5D%5Bimgs%5D%5B0%5D%5Bwidth%5D=18%25&lotteryItem%5B1%5D%5Bimgs%5D%5B0%5D%5Btop%5D=30%25&lotteryItem%5B2%5D%5Bfonts%5D%5B0%5D%5Btext%5D=3.8%E5%85%83%E7%BA%A2%E5%8C%85&lotteryItem%5B2%5D%5Bfonts%5D%5B0%5D%5BfontSize%5D=1.3rem&lotteryItem%5B2%5D%5Bfonts%5D%5B0%5D%5Btop%5D=10%25&lotteryItem%5B2%5D%5Bfonts%5D%5B0%5D%5BfontColor%5D=%23da4c44&lotteryItem%5B2%5D%5Bid%5D=24&lotteryItem%5B2%5D%5BisLottery%5D=true&lotteryItem%5B2%5D%5Bnum%5D=3.8&lotteryItem%5B2%5D%5Bindex%5D=2&lotteryItem%5B2%5D%5Bbackground%5D=%23fce9ca&lotteryItem%5B2%5D%5Bimgs%5D%5B0%5D%5Bsrc%5D=https%3A%2F%2Fcos.yqbtv.cn%2Fuploads%2F20230421%2F4c86b178e1e1d224edf5bb615a4384cb.png&lotteryItem%5B2%5D%5Bimgs%5D%5B0%5D%5Bwidth%5D=18%25&lotteryItem%5B2%5D%5Bimgs%5D%5B0%5D%5Btop%5D=30%25&lotteryItem%5B3%5D%5Bfonts%5D%5B0%5D%5Btext%5D=50%E7%A7%AF%E5%88%86&lotteryItem%5B3%5D%5Bfonts%5D%5B0%5D%5BfontSize%5D=1.3rem&lotteryItem%5B3%5D%5Bfonts%5D%5B0%5D%5Btop%5D=10%25&lotteryItem%5B3%5D%5Bfonts%5D%5B0%5D%5BfontColor%5D=%23fff&lotteryItem%5B3%5D%5Bid%5D=25&lotteryItem%5B3%5D%5BisLottery%5D=false&lotteryItem%5B3%5D%5Bnum%5D=0&lotteryItem%5B3%5D%5Bindex%5D=3&lotteryItem%5B3%5D%5Bbackground%5D=%23d94c44&lotteryItem%5B3%5D%5Bimgs%5D%5B0%5D%5Bsrc%5D=https%3A%2F%2Fcos.yqbtv.cn%2Fuploads%2F20230421%2Ff3f098a9e703c8a6a8f7f63832856950.png&lotteryItem%5B3%5D%5Bimgs%5D%5B0%5D%5Bwidth%5D=18%25&lotteryItem%5B3%5D%5Bimgs%5D%5B0%5D%5Btop%5D=30%25&lotteryItem%5B4%5D%5Bfonts%5D%5B0%5D%5Btext%5D=%E9%9A%8F%E6%9C%BA%E7%BA%A2%E5%8C%85&lotteryItem%5B4%5D%5Bfonts%5D%5B0%5D%5BfontSize%5D=1.3rem&lotteryItem%5B4%5D%5Bfonts%5D%5B0%5D%5Btop%5D=10%25&lotteryItem%5B4%5D%5Bfonts%5D%5B0%5D%5BfontColor%5D=%23da4c44&lotteryItem%5B4%5D%5Bid%5D=26&lotteryItem%5B4%5D%5BisLottery%5D=true&lotteryItem%5B4%5D%5Bnum%5D=0&lotteryItem%5B4%5D%5Bindex%5D=4&lotteryItem%5B4%5D%5Bbackground%5D=%23fce9ca&lotteryItem%5B4%5D%5Bimgs%5D%5B0%5D%5Bsrc%5D=https%3A%2F%2Fcos.yqbtv.cn%2Fuploads%2F20230421%2F4c86b178e1e1d224edf5bb615a4384cb.png&lotteryItem%5B4%5D%5Bimgs%5D%5B0%5D%5Bwidth%5D=18%25&lotteryItem%5B4%5D%5Bimgs%5D%5B0%5D%5Btop%5D=30%25&lotteryItem%5B5%5D%5Bfonts%5D%5B0%5D%5Btext%5D=50%E7%A7%AF%E5%88%86&lotteryItem%5B5%5D%5Bfonts%5D%5B0%5D%5BfontSize%5D=1.3rem&lotteryItem%5B5%5D%5Bfonts%5D%5B0%5D%5Btop%5D=10%25&lotteryItem%5B5%5D%5Bfonts%5D%5B0%5D%5BfontColor%5D=%23fff&lotteryItem%5B5%5D%5Bid%5D=27&lotteryItem%5B5%5D%5BisLottery%5D=false&lotteryItem%5B5%5D%5Bnum%5D=0&lotteryItem%5B5%5D%5Bindex%5D=5&lotteryItem%5B5%5D%5Bbackground%5D=%23d94c44&lotteryItem%5B5%5D%5Bimgs%5D%5B0%5D%5Bsrc%5D=https%3A%2F%2Fcos.yqbtv.cn%2Fuploads%2F20230421%2Ff3f098a9e703c8a6a8f7f63832856950.png&lotteryItem%5B5%5D%5Bimgs%5D%5B0%5D%5Bwidth%5D=18%25&lotteryItem%5B5%5D%5Bimgs%5D%5B0%5D%5Btop%5D=30%25&token=" + _0x33f85c + "&aid=" + _0x52da86 + "&userInfo%5BaccountId%5D=" + this.userinfo.accountId + "&userInfo%5BisLogin%5D=1&userInfo%5BcreatedAt%5D=" + _0x56bbb0 + "&userInfo%5BheadImgUrl%5D=" + _0x518399 + "&userInfo%5Bcity%5D=" + _0x495223 + "&userInfo%5BnickName%5D=" + _0x5c5f9a + "&userInfo%5BclientCode%5D=" + this.userinfo.clientCode + "&userInfo%5BrecentActiveTime%5D=" + _0x10994b + "&userInfo%5Bgrade%5D=" + this.userinfo.grade + "&userInfo%5Bmobile%5D=" + this.userinfo.mobile + "&userInfo%5BrefCode%5D=" + this.userinfo.refCode + "&userInfo%5BdeviceId%5D=" + this.userinfo.deviceId,
      _0x5df581 = await $.task("post", "https://s.yqbtv.cn/index.php/Api/App/getLotteryRes", {}, _0x1c6ced);
    if (_0x5df581.code == 1) {
      console.log("【" + this.name + "】" + _0x5df581.msg);
      if (_0x5df581.msg == "恭喜您，中奖啦～") {
        let _0xbb3db7 = _0x5df581.data.token,
          _0x4cf417 = _0x5df581.data.points;
        await this.tx(_0xbb3db7, _0x4cf417);
      }
      await $.wait(6000, 1000);
    }
  }
  async ["tx"](_0x229a42, _0x5c8781) {
    let _0x2ec9b4 = {
        "authorization": this.txtoken
      },
      _0x4b7857 = "{\"token\":\"" + _0x229a42 + "\",\"num\":\"" + _0x5c8781 + "\",\"tag\":null,\"openid\":\"" + this.txun + "\",\"timestamp\":" + $.time(10) + "}",
      _0x28dc39 = await $.task("post", "https://s.yqbtv.cn/index.php/Api/Wechat/takenRedpack", _0x2ec9b4, _0x4b7857);
    if (_0x28dc39.code == 1) {
      console.log("【" + this.name + "】" + _0x28dc39.msg);
    }
  }
}
$ = _0x5c0a38();
!(async () => {
  console.log(NAME);
  console.log("By: 不才");
  await $.ExamineCookie();
  if ($.cookie_list.length < 6) {
    await $.Multithreading("login");
    let _0x37523f = $.cookie_list.filter(_0x38a7d1 => _0x38a7d1.logs == true);
    if (_0x37523f.length == 0) {
      console.log("Cookie格式错误 或 账号被禁封");
      return;
    } else await $.Multithreading("getreadinfo"), await $.Multithreading("readlist1"), await $.Multithreading("getMyLotteryCounts");
  } else {
    console.log("账号数量超过限制，请减少账号数量后重试！");
  }
  let _0x4135b5 = [];
  for (let _0x16e5e2 of $.cookie_list) {
    _0x16e5e2.message && _0x4135b5.push(_0x16e5e2.message);
  }
  _0x4135b5.length > 0 && (await $.SendMsg(_0x4135b5.join("\n")));
})().catch(_0x22eb7e => {
  console.log(_0x22eb7e);
}).finally(() => {});
function _0x5c0a38() {
  return new class {
    constructor() {
      this.cookie_list = [];
      this.message = "";
      this.CryptoJS = require("crypto-js");
      this.NodeRSA = require("node-rsa");
      this.request = require("request");
      this.Sha_Rsa = require("jsrsasign");
    }
    async ["Multithreading"](_0xd50cb1, _0x51d140, _0x3f638e) {
      let _0x51778a = [];
      !_0x3f638e && (_0x3f638e = 1);
      while (_0x3f638e--) {
        for (let _0x412b2a of $.cookie_list) {
          _0x51778a.push(_0x412b2a[_0xd50cb1](_0x51d140));
        }
      }
      await Promise.allSettled(_0x51778a);
    }
    ["ExamineCookie"]() {
      let _0x1e843e = process.env[VALY] || CK,
        _0x2b5a2a = 0;
      if (_0x1e843e) {
        for (let _0x2edcac of _0x1e843e.split("\n").filter(_0x327b1a => !!_0x327b1a)) {
          $.cookie_list.push(new _0x2f5023(_0x2edcac));
        }
        _0x2b5a2a = $.cookie_list.length;
      } else {
        console.log("\n【" + NAME + "】：未填写变量: " + VALY);
      }
      return console.log("共找到" + _0x2b5a2a + "个账号"), $.cookie_list;
    }
    ["task"](_0x2605ae, _0x57d8d7, _0x3cc922, _0x4062a5, _0x35f438) {
      _0x2605ae == "delete" ? _0x2605ae = _0x2605ae.toUpperCase() : _0x2605ae = _0x2605ae;
      if (_0x2605ae == "post") {
        delete _0x3cc922["content-type"];
        delete _0x3cc922["Content-type"];
        delete _0x3cc922["content-Type"];
        if ($.safeGet(_0x4062a5)) {
          _0x3cc922["Content-Type"] = "application/json;charset=UTF-8";
        } else _0x3cc922["Content-Type"] = "application/x-www-form-urlencoded";
        _0x4062a5 && (_0x3cc922["Content-Length"] = $.lengthInUtf8Bytes(_0x4062a5));
      }
      return _0x2605ae == "get" && (delete _0x3cc922["content-type"], delete _0x3cc922["Content-type"], delete _0x3cc922["content-Type"], delete _0x3cc922["Content-Length"]), _0x3cc922.Host = _0x57d8d7.replace("//", "/").split("/")[1], new Promise(async _0x355522 => {
        if (_0x2605ae.indexOf("T") < 0) {
          var _0x549084 = {
            "url": _0x57d8d7,
            "headers": _0x3cc922,
            "body": _0x4062a5,
            "proxy": "http://" + _0x35f438
          };
        } else {
          var _0x549084 = {
            "url": _0x57d8d7,
            "headers": _0x3cc922,
            "form": JSON.parse(_0x4062a5),
            "proxy": "http://" + _0x35f438
          };
        }
        !_0x35f438 && delete _0x549084.proxy;
        this.request[_0x2605ae.toLowerCase()](_0x549084, (_0x246417, _0x4377eb, _0x44efd9) => {
          try {
            if (_0x44efd9) {
              if (LOGS == 1) {
                console.log("================ 请求 ================");
                console.log(_0x549084);
                console.log("================ 返回 ================");
                if ($.safeGet(_0x44efd9)) console.log(JSON.parse(_0x44efd9));else {
                  console.log(_0x44efd9);
                }
              }
            }
          } catch (_0x5bd401) {
            console.log(_0x5bd401, _0x57d8d7 + "\n" + _0x3cc922);
          } finally {
            let _0x2096df = "";
            if (!_0x246417) {
              if ($.safeGet(_0x44efd9)) {
                _0x2096df = JSON.parse(_0x44efd9);
              } else {
                _0x44efd9.indexOf("/") != -1 && _0x44efd9.indexOf("+") != -1 ? _0x2096df = _0x44efd9 : _0x2096df = _0x44efd9;
              }
            } else {
              _0x2096df = _0x57d8d7 + "   API请求失败，请检查网络重试\n" + _0x246417;
            }
            return _0x355522(_0x2096df);
          }
        });
      });
    }
    async ["readUUID"]() {
      const _0x1e46f6 = "uuid.txt";
      await $.generateUUID(_0x1e46f6);
      try {
        const _0x5d9582 = _0x2f02bb.readFileSync(_0x1e46f6, "utf8"),
          _0x4e3cfd = _0x5d9582.trim();
        return _0x4e3cfd;
      } catch (_0x13fefd) {
        return null;
      }
    }
    ["generateUUID"](_0x189c06) {
      if (_0x2f02bb.existsSync(_0x189c06)) return;
      const _0x4a1670 = uuidv4();
      _0x2f02bb.writeFile(_0x189c06, _0x4a1670, "utf8", _0x5c8b5d => {
        if (_0x5c8b5d) {
          console.error("写入文件出错: " + _0x5c8b5d.message);
          return;
        }
      });
    }
    async ["getkami"]() {
      let _0x14c94a = await $.readUUID(),
        _0x5347ac = await $.task("get", "http://" + dcfhost + ":5705/query?dcf=" + dcfkey + "&MA=" + _0x14c94a, {});
      return _0x5347ac;
    }
    async ["SendMsg"](_0x41eec7) {
      if (!_0x41eec7) return;
      if (Notify == 1) {
        var _0xfaf771 = require("./sendNotify");
        await _0xfaf771.sendNotify(NAME, _0x41eec7);
      }
    }
    ["lengthInUtf8Bytes"](_0x38d855) {
      let _0x699557 = encodeURIComponent(_0x38d855).match(/%[89ABab]/g);
      return _0x38d855.length + (_0x699557 ? _0x699557.length : 0);
    }
    ["randomArr"](_0x3c2026) {
      return _0x3c2026[parseInt(Math.random() * _0x3c2026.length, 10)];
    }
    ["wait"](_0x41bf6f) {
      return new Promise(_0x533cc6 => setTimeout(_0x533cc6, _0x41bf6f));
    }
    ["time"](_0x5eabfd) {
      return _0x5eabfd == 10 ? Math.round(+new Date() / 1000) : +new Date();
    }
    ["timenow"](_0x4d22c1) {
      let _0x3bc2cb = new Date();
      if (_0x4d22c1 == undefined) {
        let _0x201bf5 = new Date(),
          _0x5ba790 = _0x201bf5.getFullYear() + "",
          _0x1a7e9f = (_0x201bf5.getMonth() + 1 < 10 ? "0" + (_0x201bf5.getMonth() + 1) : _0x201bf5.getMonth() + 1) + "",
          _0x1ec90b = (_0x201bf5.getDate() + 1 < 10 ? "0" + _0x201bf5.getDate() : _0x201bf5.getDate() + 1) + " ";
        return _0x5ba790 + _0x1a7e9f + _0x1ec90b;
      } else {
        if (_0x4d22c1 == 0) return _0x3bc2cb.getFullYear();else {
          if (_0x4d22c1 == 1) return _0x3bc2cb.getMonth() + 1 < 10 ? "0" + (_0x3bc2cb.getMonth() + 1) : _0x3bc2cb.getMonth() + 1;else {
            if (_0x4d22c1 == 2) return _0x3bc2cb.getDate();else {
              if (_0x4d22c1 == 3) return _0x3bc2cb.getHours();else {
                if (_0x4d22c1 == 4) return _0x3bc2cb.getMinutes();else {
                  if (_0x4d22c1 == 5) return _0x3bc2cb.getSeconds() + 1 < 10 ? "0" + _0x3bc2cb.getSeconds() : _0x3bc2cb.getSeconds();
                }
              }
            }
          }
        }
      }
    }
    ["safeGet"](_0x2109c2) {
      try {
        if (typeof JSON.parse(_0x2109c2) == "object") {
          return true;
        }
      } catch (_0x28c244) {
        return false;
      }
    }
    ["SJS"](_0xcbca7b, _0x2b7702) {
      if (_0x2b7702 == 0) {
        let _0x1a7daa = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789",
          _0x329f8d = _0x1a7daa.length,
          _0x1de63e = "";
        for (let _0x1ef305 = 0; _0x1ef305 < _0xcbca7b; _0x1ef305++) {
          _0x1de63e += _0x1a7daa.charAt(Math.floor(Math.random() * _0x329f8d));
        }
        return _0x1de63e;
      } else {
        if (_0x2b7702 == 1) {
          let _0x2a3d78 = "qwertyuiopasdfghjklzxcvbnm0123456789",
            _0x4bf96c = _0x2a3d78.length,
            _0x4034cd = "";
          for (let _0x3fa07f = 0; _0x3fa07f < _0xcbca7b; _0x3fa07f++) {
            _0x4034cd += _0x2a3d78.charAt(Math.floor(Math.random() * _0x4bf96c));
          }
          return _0x4034cd;
        } else {
          let _0x50358f = "0123456789",
            _0xd489d4 = _0x50358f.length,
            _0x4f5e2a = "";
          for (let _0x5838ae = 0; _0x5838ae < _0xcbca7b; _0x5838ae++) {
            _0x4f5e2a += _0x50358f.charAt(Math.floor(Math.random() * _0xd489d4));
          }
          return _0x4f5e2a;
        }
      }
    }
    ["udid"](_0x23dc36) {
      function _0x38b5a7() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }
      let _0xbc4d23 = _0x38b5a7() + _0x38b5a7() + "-" + _0x38b5a7() + "-" + _0x38b5a7() + "-" + _0x38b5a7() + "-" + _0x38b5a7() + _0x38b5a7() + _0x38b5a7();
      return _0x23dc36 == 0 ? _0xbc4d23.toUpperCase() : _0xbc4d23.toLowerCase();
    }
    ["encodeUnicode"](_0x5ca62a) {
      var _0x4058d7 = [];
      for (var _0x4ff61c = 0; _0x4ff61c < _0x5ca62a.length; _0x4ff61c++) {
        _0x4058d7[_0x4ff61c] = ("00" + _0x5ca62a.charCodeAt(_0x4ff61c).toString(16)).slice(-4);
      }
      return "\\u" + _0x4058d7.join("\\u");
    }
    ["base64ToHex"](_0x2ea9fd) {
      const _0x4191b4 = atob(_0x2ea9fd),
        _0x254c41 = new Uint8Array(_0x4191b4.length);
      for (let _0x324b0f = 0; _0x324b0f < _0x4191b4.length; _0x324b0f++) {
        _0x254c41[_0x324b0f] = _0x4191b4.charCodeAt(_0x324b0f);
      }
      let _0x482e0b = "";
      for (let _0x354a2b = 0; _0x354a2b < _0x254c41.length; _0x354a2b++) {
        const _0x23bf76 = _0x254c41[_0x354a2b].toString(16).padStart(2, "0");
        _0x482e0b += _0x23bf76;
      }
      return _0x482e0b;
    }
    ["decodeUnicode"](_0x53f248) {
      return _0x53f248 = _0x53f248.replace(/\\u/g, "%u"), unescape(unescape(_0x53f248));
    }
    ["RT"](_0x53a996, _0x49fbdc) {
      return Math.round(Math.random() * (_0x49fbdc - _0x53a996) + _0x53a996);
    }
    ["arrNull"](_0x42272c) {
      var _0x3725ec = _0x42272c.filter(_0x22740e => {
        return _0x22740e && _0x22740e.trim();
      });
      return _0x3725ec;
    }
    ["nowtime"]() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
    }
    ["timecs"]() {
      let _0x15fc29 = $.nowtime();
      return JSON.stringify(_0x15fc29).indexOf(" ") >= 0 && (_0x15fc29 = _0x15fc29.replace(" ", "T")), new Date(_0x15fc29).getTime() - 28800000;
    }
    ["rtjson"](_0xaa7d37, _0x2b97ad, _0x550df3, _0x374917) {
      return _0x374917 == 0 ? JSON.stringify(_0xaa7d37.split(_0x2b97ad).reduce((_0x1d8165, _0x40c2ef) => {
        let _0x33520a = _0x40c2ef.split(_0x550df3);
        return _0x1d8165[_0x33520a[0].trim()] = _0x33520a[1].trim(), _0x1d8165;
      }, {})) : _0xaa7d37.split(_0x2b97ad).reduce((_0x504b0e, _0x1d1f52) => {
        let _0x35c32f = _0x1d1f52.split(_0x550df3);
        return _0x504b0e[_0x35c32f[0].trim()] = _0x35c32f[1].trim(), _0x504b0e;
      }, {});
    }
    ["MD5Encrypt"](_0x290001, _0x437a3b) {
      if (_0x290001 == 0) return this.CryptoJS.MD5(_0x437a3b).toString().toLowerCase();else {
        if (_0x290001 == 1) return this.CryptoJS.MD5(_0x437a3b).toString().toUpperCase();else {
          if (_0x290001 == 2) {
            return this.CryptoJS.MD5(_0x437a3b).toString().substring(8, 24).toLowerCase();
          } else {
            if (_0x290001 == 3) return this.CryptoJS.MD5(_0x437a3b).toString().substring(8, 24).toUpperCase();
          }
        }
      }
    }
    ["SHA_Encrypt"](_0x15a424, _0x3910fb, _0x2d8d01) {
      return _0x15a424 == 0 ? this.CryptoJS[_0x3910fb](_0x2d8d01).toString(this.CryptoJS.enc.Base64) : this.CryptoJS[_0x3910fb](_0x2d8d01).toString();
    }
    ["HmacSHA_Encrypt"](_0x471dd8, _0x1d8e19, _0x57ec12, _0x521466) {
      return _0x471dd8 == 0 ? this.CryptoJS[_0x1d8e19](_0x57ec12, _0x521466).toString(this.CryptoJS.enc.Base64) : this.CryptoJS[_0x1d8e19](_0x57ec12, _0x521466).toString();
    }
    ["Base64"](_0x4c37d8, _0x31febb) {
      return _0x4c37d8 == 0 ? this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x31febb)) : this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x31febb));
    }
    ["DecryptCrypto"](_0x10d283, _0xf5155f, _0x5cd7e1, _0x20a94a, _0x5b0946, _0x22e75a, _0x406f0e) {
      if (_0x10d283 == 0) {
        const _0x3811d8 = this.CryptoJS[_0xf5155f].encrypt(this.CryptoJS.enc.Utf8.parse(_0x5b0946), this.CryptoJS.enc.Hex.parse(_0x22e75a), {
          "iv": this.CryptoJS.enc.Hex.parse(_0x406f0e),
          "mode": this.CryptoJS.mode[_0x5cd7e1],
          "padding": this.CryptoJS.pad[_0x20a94a]
        });
        return _0x3811d8.toString();
      } else {
        const _0x2938b6 = this.CryptoJS[_0xf5155f].decrypt(_0x5b0946, this.CryptoJS.enc.Utf8.parse(_0x22e75a), {
          "iv": this.CryptoJS.enc.Utf8.parse(_0x406f0e),
          "mode": this.CryptoJS.mode[_0x5cd7e1],
          "padding": this.CryptoJS.pad[_0x20a94a]
        });
        return _0x2938b6.toString(this.CryptoJS.enc.Utf8);
      }
    }
    ["RSA"](_0x5f31e7, _0x11cf5c) {
      const _0x1d4067 = require("node-rsa");
      let _0x286aab = new _0x1d4067("-----BEGIN PUBLIC KEY-----\n" + _0x11cf5c + "\n-----END PUBLIC KEY-----");
      return _0x286aab.setOptions({
        "encryptionScheme": "pkcs1"
      }), _0x286aab.encrypt(_0x5f31e7, "base64", "utf8");
    }
    ["getSHA1withRSA"](_0x4edfd7) {
      const _0x1aee2d = _0x58b826.KEYUTIL.getKey(privateKeyString),
        _0x29d38b = new _0x58b826.KJUR.crypto.Signature({
          "alg": "SHA1withRSA"
        });
      _0x29d38b.init(_0x1aee2d);
      _0x29d38b.updateString(_0x4edfd7);
      const _0x1541e6 = _0x29d38b.sign(),
        _0x176bab = _0x58b826.hextob64u(_0x1541e6);
      return _0x176bab;
    }
    ["hexToBase64"](_0x3a12fd) {
      const _0x3ff955 = [];
      for (let _0x3fe8c5 = 0; _0x3fe8c5 < _0x3a12fd.length; _0x3fe8c5 += 2) {
        _0x3ff955.push(parseInt(_0x3a12fd.substr(_0x3fe8c5, 2), 16));
      }
      const _0x320cad = btoa(String.fromCharCode(..._0x3ff955));
      return _0x320cad;
    }
    ["Sha1withRsa"](_0x41ec95) {
      const {
          KEYUTIL: _0x1e2434,
          KJUR: _0x4f979b,
          b64utoutf8: _0x597f17,
          utf8tob64: _0x439f1b
        } = require("jsrsasign"),
        _0x329f41 = _0x1e2434.getKey(Key),
        _0x3e1c13 = new _0x4f979b.crypto.Signature({
          "alg": "SHA1withRSA"
        });
      _0x3e1c13.init(_0x329f41);
      _0x3e1c13.updateString(_0x41ec95);
      const _0x4add12 = _0x3e1c13.sign();
      let _0x3d6fa4 = $.hexToBase64(_0x4add12);
      return _0x3d6fa4;
    }
  }();
}