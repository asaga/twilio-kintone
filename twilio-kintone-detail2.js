//--------------------------------------------------------------------------------------------------------------
//  Twilio × kintone ハンズオンサンプルプログラム
//  詳細画面にSMS送信用のボタンを表示し、クリックされたらSMSを送信する
//  Cybozu, Inc.
//--------------------------------------------------------------------------------------------------------------
(function () {

	"use strict";

	//Twilio認証パラメーター（Twilioダッシュボードで確認可能）
    var ACCOUNT_SID 	= 'AC52e689efffc9d8d9265dc4fc35fb11e8';
    var AUTH_TOKEN 		= 'f5d1b099d91b512d912fad3bbe20484c';

	//レコード詳細表示イベント
	kintone.events.on('app.record.detail.show', function (event) {
	
		//呼び出しボタンを表示
		var SendSMSButton = document.createElement('button');
	    SendSMSButton.id = 'send_sms_button';
	    SendSMSButton.innerHTML = '呼び出し';
		SendSMSButton.onclick = function () {
                sendSMS(event);
	    }
		kintone.app.record.getHeaderMenuSpaceElement().appendChild(SendSMSButton);
		
		//SMS送信処理
		function sendSMS(event){
		
			//レコードから名前と電話番号を取得
			var rec = kintone.app.record.get();
			var name = rec.record.name.value;
			var to = rec.record.tel.value;

			//Twilio APIのURL
			var url = "https://" + ACCOUNT_SID + ":" + AUTH_TOKEN + "@api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages";
			
			//HTTPヘッダー
			var headers = {'Content-Type' : 'application/x-www-form-urlencoded'};

			//取得した電話番号を指定
			var FROM 	= encodeURIComponent("+1999999999");
			//SMS送信先の電話番号（トライアルアカウントの場合は検証済み電話番号のみ送信先可能）
			var TO	= encodeURIComponent("+819099999999");
			//送信データ
			var data = "From=" + FROM + "&To=" + TO + "&Body=" + name + "様\n間もなく順番です。";
			
			kintone.proxy(url, 'POST', headers, data, function (body, status, headers) {
				if (status === 201){
					alert('SMSの送信が完了しました。');
					location.replace("/k/" + kintone.app.getId());
				}else{
					alert('SMSの送信に失敗しました。¥n' + status + '¥n' + body);
				}
			});
		}
		
	});

})();
