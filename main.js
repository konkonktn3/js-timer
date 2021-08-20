//要素の取得
const timeElement = document.getElementById("timer");

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

//経過時間　スタートを押して何秒経過したか（スタートとリセット両方で使うためにココ）
let elapsed = 0;
//初期値null　（setintervalで出てきた返り値をストップでも参照したからココ）
let intervalId = null;

//時間を計算と表示
function updateTime(){
     //ミリ秒　1秒は1000ミリ秒　余りがミリ秒
     const ms = elapsed % 1000;

     //秒(整数・切り捨て)　ミリ秒を1000で割ると秒 時/分/秒の秒にするために60で割った余り　
     const s = Math.floor(elapsed / 1000) % 60;

     //分(整数・切り捨て)　秒を60で割ると分　時/分/秒の分にするために60で割った余り
     const m = Math.floor(elapsed / (1000*60)) % 60;

     //時(整数・切り捨て)　分を60で割ると時　時/分/秒の時にするために24で割った余り
     const h = Math.floor(elapsed / (1000*60*60)) % 24;

     const msStr = ms.toString().slice(0,1)
     const sStr = s.toString().slice(0,1)
     const mStr = m.toString().slice(0,1)
     const hStr = h.toString().slice(0,1)

     timeElement.innerHTML = hStr + ":" + mStr + ":" + sStr + ":" + msStr;
}

start.addEventListener('click', function(){
     /*スタートを複数回押すと何回もセットインタバルに関数が入るけど
     ストップで止めれるのは最後だけで他タイマーが動いてしまうので、
　　　null以外（スタート済み）なら帰る*/
     if(intervalId !== null){ return;}

     let pre = new Date();//setIntervalが読まれた時の一個前の時間がpre
     
     intervalId = setInterval(function(){
          const now = new Date();//nowはfanction内のローカル変数
          elapsed += now - pre;//時刻の差　今−過去の差をelapsedに足す
          pre =　now;
          updateTime();
     },10);
});

stop.addEventListener('click', function(){
     clearInterval(intervalId);
     intervalId = null;
     //ストップするとnull（初期値）になって上記のsetintervalが動けるようになる。
});

reset.addEventListener('click', function(){
     elapsed = 0;//カウントが０に戻る
     updateTime();
});