//--------------------------------------------------------------------------------------------------------------
//  Twilio × kintone ハンズオンサンプルプログラム
//  詳細画面にボタンを表示する
//  Cybozu, Inc.
//--------------------------------------------------------------------------------------------------------------
(function () {

	"use strict";

	//レコード詳細表示イベント
	kintone.events.on('app.record.detail.show', function (event) {
	
		//呼び出しボタンを表示
		var SendSMSButton = document.createElement('button');
	    SendSMSButton.id = 'send_sms_button';
	    SendSMSButton.innerHTML = '呼び出し';
		SendSMSButton.onclick = function () {
                alert("ボタンがクリックされました。");
	    }
		kintone.app.record.getHeaderMenuSpaceElement().appendChild(SendSMSButton);
				
	});

})();
