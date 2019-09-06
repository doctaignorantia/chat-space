$(function(){
  // function buildHTML(message){
  //   var html = :plain
                // $(.message
                // .upper-message
                //   .upper-message__user-name
                //     = message.user.name
                //   .upper-message__date
                //     = message.created_at.strftime("%Y/%m/%d %H:%M")
                // .lower-message
                //   - if message.content.present?
                //     %p.lower-message__content
                //       = message.content
                //   = image_tag message.image.url, class: 'lower-message__image' if message.image.present?)
  //   return html;  
  // }
  $('#new_message').on('submit', function(e){ //#new_message?の送信ボタンを押すとイベントが発火
    // debugger
    e.preventDefault(); //フォームが送信された時に、デフォルトだとフォームを送信するための通信がされてしまうので、preventDefault()を使用してデフォルトのイベントを止める。
    console.log(this);  //console.log(this) value="M7GrP+x7v4WrJQxgSGi2pQvPu/rf9RxD4bcxMccMeQjiwFvzGVKpyrW+4n7FGr4nofSlntRn1piH59ceDoU+vw==" が入ってると思うがちょっと分からなない。
    var formData = new FormData(this); //インスタンスがしてまとまった情報として扱う？type="file" name="message[image]"が一緒に入るか分からない
    var url = $(this).attr('action')  //attr()の第2引数へ送信したいサーバーへのパスを記述すれば、フォームの送信先が変更される
    $.ajax({
    //  http://localhost:3000/groups/1/messages
      url: @groups/messages,    //Ajaxリクエストを送信するURLを指定します。<a class="submit-btn" href="/groups/1/edit">Edit グループ１のメッセージを選択している?hrefでいいのか？urlの可能性もある。
  // rake routes
  // Prefix Verb   URI Pattern                          Controller#Action
  // group_messages GET    /groups/:group_id/messages(.:format) messages#index
  //                POST   /groups/:group_id/messages(.:format) messages#create
  //ソースコード
  //<form class="new_message" id="new_message" enctype="multipart/form-data" action="/groups/1/messages" accept-charset="UTF-8" method="post">
      type: "POST",   //リクエストタイプはPOSTのはず
      data: formData,   //コントローラーへformData = new FormData(this)を送信
      dataType: 'json',   // データの型はjsonで指定
      processData: false,  //クエリ文字列に変換するかしないか。しないで良いらしい。
      contentType: false  //FormDataをつかってフォームの情報を取得した時には必ずfalseにするという認識で構いらしい。
    })
    
    .done(function(data){   // 通信に成功した場合の処理 前述の data: formData をの取ってくる
      var html = buildHTML(data);  //前述のメソッド function buildHTML(message) を実行
      $('.messages').append(html);  //append関数は操作後はDOMに要素が追加された状態になる。
      $('form__message').val('');   //form__messageを空にする
    })
    .fail(function(){   // 通信に失敗した場合の処理
      alert('error');   // alertで検索失敗の旨を表示
    })
  });
});