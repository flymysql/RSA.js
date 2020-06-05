const RSA = require('./rsa.js');


var p = new RSA.BigInt("106697219132480173106064317148705638676529121742557567770857687729397446898790451577487723991083173010242416863238099716044775658681981821407922722052778958942891831033512463262741053961681512908218003840408526915629689432111480588966800949428079015682624591636010678691927285321708935076221951173426894836169");
var q = new RSA.BigInt("144819424465842307806353672547344125290716753535239658417883828941232509622838692761917211806963011168822281666033695157426515864265527046213326145174398018859056439431422867957079149967592078894410082695714160599647180947207504108618794637872261572262805565517756922288320779308895819726074229154002310375209");

var t1 = new RSA.BigInt("1"); 
var t0 = new RSA.BigInt("0"); 

const keys = RSA.get_key(p, q);
const crt_key = RSA.get_crtkey(p,q,keys);

console.time("RSA算法编码时间");
var s = "Test2020";
console.log("编码前密文内容：",s);
var as = RSA.ToAssic(s,50); 
console.log("字符串转换为数字：",as);
var c = RSA.encrypt(as, keys[0]);
console.log("编码后明文内容：",c);
console.timeEnd("RSA算法编码时间");

console.time("RSA算法解码时间");
var m = RSA.decrypt(c, keys[1]);
console.log("解码后密文内容：",as);
var str = RSA.FromAssic(m);
console.log("密文转字符串：",str);

console.timeEnd("RSA算法解码时间");


console.time("使用CRT算法解码时间");
var m = RSA.CRTdecrypt(c, crt_key);
var str = RSA.FromAssic(m);
console.log("使用CRT算法解码得到结果：",str);
console.timeEnd("使用CRT算法解码时间");

