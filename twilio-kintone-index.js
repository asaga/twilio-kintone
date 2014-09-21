//--------------------------------------------------------------------------------------------------------------
//  Twilio × kintone ハンズオンサンプルプログラム
//  カスタマイズビューで表示したボタンをクリックされたらレコードを追加する
//  Cybozu, Inc.
//--------------------------------------------------------------------------------------------------------------
(function () {

	"use strict";

	//レコード一覧表示イベント
	kintone.events.on('app.record.index.show', function(event) {

		//カスタマイズビュー以外の場合は終了
		if (event.viewId != 5199191) return;

		//==================================================
		//Administrator以外の場合はメニューを隠す
		//内部仕様をハックしているため非推奨
		//==================================================
		var user = kintone.getLoginUser();
		if(user['code'] != "Administrator"){
			$(".header-cybozu").remove();
			$("#sidemenu-gaia").remove();
			$(".menu-gaia").remove();
			$(".gaia-ui-actionmenu-left").remove();
			$(".title-gaia").remove();
		}

		//==================================================
		//カスタマイズビューの登録ボタンクリック時の処理
		//==================================================
		$('#btn_reserve').click(function() {
		
			//入力データの取得
			var name = $("#visitor_name").val();
			var tel = $("#visitor_tel").val();
			var number = $("#visitor_number").val();
			var seat = $("input[name='visitor_seat']:checked").val();

			//kintone登録用のJSONデータ作成
			var kintoneData = {};
			kintoneData.app = kintone.app.getId();
			var record = {};
			record.name = {value: name};
			record.tel = {value: tel};
			record.number = {value: number};
			record.seat = {value: seat};
			kintoneData.record = record;
			
			//kintoneへデータを登録
			kintone.api('/k/v1/record', 'POST', kintoneData, function(resp) {
				alert("受け付けが完了しました。\n呼び出しまでお待ち下さい。");
				location.reload();
			},function(resp) {
				alert("登録に失敗しました。\n" + resp.message);
			});
			
		});

	});

})();
