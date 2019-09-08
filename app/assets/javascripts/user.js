$(document).on('turbolinks:load', function(){

$(function() {

  // var search_list = $("#user-search-result");
  // var member_list = $("#member_search_result");

  // function appendUsers(user) {
  //   var html =`<div class="chat-group-user clearfix">
  //               <p class="chat-group-user__name">${ user.name }</p>
  //               <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</a>
  //             </div>`

  //   search_list.append(html);
  //   return html;
  // }

  // function appendMembers(name, user_id) {
  //             // <div class='chat-group-user'>
  //             //   <div class='chat-group-form__field--left'>
  //             //     <label class='chat-group-form__label' for='chat_group_チャットメンバー'>チャットメンバー</label>
  //             //   </div>
  //             // </div>
  //   var html =`<div class='chat-group-user clearfix'>
  //               <div class='chat-group-form__field--right'>
  //                 <input name='group[user_ids][]' type='hidden' value=${ user_id }>
  //                 <p class='chat-group-user__name'>${ name }</p>
  //                 <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  //               </div>
  //             </div>`

  //   member_list.append(html);
  //   return html;
  // }

  // function appendNoUsers(info) {
  //   var html =`<div class="chat-group-user clearfix">
  //               <p class="chat-group-user__name">${ info }</p>
  //             </div>`

  //   search_list.append(html);
  // }

  $(function(){
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
        console.log(input)
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){
            appendUsers(user);
            });
          }
          else {
            appendNoUsers("一致するユーザーはいません");
          }
        })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });

    $(function(){
      $(document).on('click', '.user-search-add', function() {
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        $(this).parent().remove();
        appendMembers(name, user_id);
      });

      $(document).on("click", '.user-search-remove', function() {
        $(this).parent().remove();
      });
    });
  });
});
});