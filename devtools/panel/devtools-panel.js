function onError(error) {
  console.log(error);
}


/*
  let tableList = browser.storage.local.get('tableList');
  tableList.then((result) => {
    _.each(result.tableList, item => {
        let checkbox;
        if(item.checked){
          checkbox = `<input type="checkbox" checked>`
        }else{
          checkbox = `<input type="checkbox">`
        }
        let tr = `
            <tr>
              <td>${checkbox}</td>
              <td><input class="form-control matchStr" value="${item.matchStr}"><input type="file" select></td>
              <td><textarea class="form-control result" rows="3">${item.result}</textarea></td>
              <td><textarea class="form-control formData" rows="3">${item.formData}</textarea></td>
              <td><button class="btn btn-default del">删除</button></td>
            </tr>
        `;
        $('#list tbody').append(tr)
    })
  }, onError);

*/


$('#add').click(function(){
let tr = `
    <tr>
      <td><input type="checkbox"></td>
      <td><input class="form-control matchStr"><input type="file"></td>
      <td><textarea class="form-control result" rows="3"></textarea></td>
      <td><textarea class="form-control formData" rows="3"></textarea></td>
      <td><button class="btn btn-default del">删除</button></td>
    </tr>
`;
$('#list tbody').append(tr)
})

$('#save').click(function(){
  let list = [];
  _.each($('#list tbody tr'), item => {
    let obj = {
      checked: $(item).find('[type="checkbox"]').is(':checked'),
      matchStr: $(item).find('.matchStr').val(),
      result: $(item).find('.result').val(),
      formData: $(item).find('.formData').val()
    };
    list.push(obj);
  });
  var storingNote = browser.storage.local.set({tableList : list });
  storingNote.then(() => {
    //console.log(2222)
  }, onError);
})



$('#list').on('click', '.btn.del', function(){
  $(this).closest('tr').remove()
}).on('click', 'thead [type="checkbox"]', function(){
  let isChecked = $(this).is(':checked');
  $('#list tbody [type="checkbox"]').prop("checked", isChecked);
}).on('change', 'tbody [type="file"]', function(e){
  let file = this.files[0];
  $(this).closest('tr').find('.matchStr').val(file.name);
  console.log(window.f = file)
})


﻿
﻿
