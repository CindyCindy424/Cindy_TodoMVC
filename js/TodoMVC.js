var $ = function(sel) {
    return document.querySelector(sel);
  };
  var $All = function(sel) {
    return document.querySelectorAll(sel);
  };

var CL_completed = 'completed';
var CL_SELECTED = 'selected';
var CL_EDITING = 'editing';

var isSearching = false;
const colorArr=['rgba(240,240,240,1)','rgba(220,159,180,0.3)','rgba(239,187,36,0.3)','rgba(93,172,129,0.3)'];


// for localStorage
itemListStore = []
searchResult = []

function showRightPanel(){
  if(isSearching){
    showSearch();
  }
  else{
    showNormal();
  }
}

function getId(tmpNode){
  while(true){
    if(!tmpNode.parentNode){
      return null;
    }else if(tmpNode.parentNode.id){
        return tmpNode.parentNode.id;
    }else{
        tmpNode=tmpNode.parentNode;
    }
  }
}

//更新状态为已完成/取消
function updateTodo(itemId, done) {
    var item = $('#' + itemId);
    if (done) item.classList.add(CL_completed);
    else item.classList.remove(CL_completed);
    // itemListStore

    for(i=0;i<itemListStore.length;i++){
        if(itemListStore[i].timeStp === itemId){
            itemListStore[i].done=!itemListStore[i].done;
            break;
        }
    }
    update();
    updateStorage();
}

//删除todo item
function removeTodo(itemId) {
    var todoList = $('#list');
    var item = $('#' + itemId);
    todoList.removeChild(item);
    for(i=0;i<itemListStore.length;i++){
        if(itemListStore[i].timeStp===item.id){
            itemListStore.splice(i,1);
            break;
        }
    }

    update();
    updateStorage();
}

//更新storagedata
function updateStorage(){
    localStorage.setItem('itemData',JSON.stringify(itemListStore));
}

// function getStorage(){
//     // itemListStore = JSON.parse(localStorage.itemData);
//     if(!localStorage.itemData){
//         var tempArr=JSON.parse(localStorage.itemData);
//     }else{
//         var tempArr = [];
//     }
    
//     for(var i=0;i<tempArr.length;i++){
//         itemListStore.push({
//             content:tempArr[i].content,
//             timeStp:tempArr[i].timeStp,
//             done:tempArr[i].done
//         });
//     }
// }

//更新localstorage
// function updateStorage(items){
//     // itemListStore = items
//     for (i=0;i<items.length;++i){
//         item=items[i];
//         itemListStore.push({
//             content:item.innerText,
//             timeStp: new Date().getTime().toString(),
//             done:((item.classList.contains(CL_completed))? true:false)
//         })
//     }    
    
    
//     localStorage.setItem('itemData',JSON.stringify(itemListStore));
// }

function update() {
  // showRightPanel();
  var items = $All('.itemList div.itemNo');
  var filter = $('.filter-header  div.selected').innerHTML;
  var leftNum = 0;
  var item, i, display;

  for (i = 0; i < items.length; ++i) {
    item = items[i];
    if (!item.classList.contains(CL_completed)) leftNum++;

    // filters
    display = 'none';
    if (filter === 'All' 
        || (filter === 'NotYet' && !item.classList.contains(CL_completed)) 
        || (filter === 'Finished' && item.classList.contains(CL_completed))) {

      display = 'block';
    }
    item.style.display = display;
  }

  var completedNum = items.length - leftNum;
  var count = $('#Num-cnt');
  count.innerHTML = leftNum +" left";

  // 清楚已完成
  var clearcompleted = $('.clear-completed');
  // clearcompleted.style.visibility = completedNum > 0 ? 'visible' : 'hidden';

  // 全选完成
  var toggleAll = $('.toggle-all');
  // toggleAll.style.visibility = items.length > 0 ? 'visible' : 'hidden';
  toggleAll.checked = items.length === completedNum;

  // updateStorage();
  // localStorage.setItem('itmData',JSON.stringify(itemListStore));
}

//初始化列表
function initiateList(){
  var todoList = $('#list');
  // var l =itemListStore.length;
  // var leftNum = 0;
  for(i=0;i<itemListStore.length;i++){
      var item = document.createElement('div');
      item.timeStp = itemListStore[i].timeStp;
      var id = item.timeStp;
      item.id = itemListStore[i].timeStp;
      item.setAttribute('class',"itemNo");
      item.innerHTML = [
          '<div class="itemInner">',
          '  <input class="toggle" type="checkbox">',
          '  <div class="content">' + itemListStore[i].content + '</div>',
          '  <button class="deleteBtn">×</button>',
          '</div>'
      ].join('');
      todoList.insertBefore(item, todoList.firstChild);
      console.log(itemListStore[i].done);
      if(itemListStore[i].done){
        item.children[0].children[0].checked=true;
        //划线
        item.classList.add("completed");
      }
      
    


      item.querySelector('.toggle').addEventListener('change', function() {
          updateTodo(id, this.checked);
        }, false);
      
      item.querySelector('.deleteBtn').addEventListener('click', function() {
          removeTodo(id);
        }, false);
      //勾选图标同步
      //左右滑动功能同步
      item.addEventListener("touchstart",touchControler.start);
      item.addEventListener("touchmove",touchControler.move);
      item.addEventListener("touchcancel",touchControler.cancel);
      item.addEventListener("touchend",touchControler.end);

  }
    
}

function modifyContent(id,newContent){
    for(var i=0;i<itemListStore.length;i++){
        if(itemListStore[i].timeStp===id){
            itemListStore[i].content=newContent;
            break;
        }
    }
    update();
    updateStorage();
    $(id).childNodes[0].childNodes[0].innerHTML=newContent;
}

function deleteAllComplete(){
  for(let i=0; i<itemListStore.length; i++){
      if(itemListStore[i].done){
        itemListStore.splice(i,1);
        i--;
        removeTodo(itemListStore[i].timeStp);
      }

  }
  
  console.log(itemListStore);
  update();
  updateStorage();
  // initiateList();
}

function addTodo(msg) {
    var todoList = $('#list');
  
    var item = document.createElement('div');
    // var id = 'item' + guid++;
    item.timeStp = "id"+new Date().getTime().toString();
    var id = item.timeStp;
    item.setAttribute('id', item.timeStp);
    item.setAttribute('class',"itemNo");
    item.innerHTML = [
      '<div class="itemInner">',
      '  <input class="toggle" type="checkbox">',
      '  <div class="content">' + msg + '</div>',
      '  <button class="deleteBtn">×</button>',
      '</div>'
    ].join('');

    itemListStore.push({
        content:msg,
        timeStp:item.timeStp,
        done:false
    })

    item.addEventListener("touchstart",touchControler.start);
    item.addEventListener("touchmove",touchControler.move);
    item.addEventListener("touchcancel",touchControler.cancel);
    item.addEventListener("touchend",touchControler.end);

    var label = item.querySelector('.content');
    // label.addEventListener('dblclick', function() {

    // longTapTime=setTimeout(() => {
    //     editPanel.show(lastTargetId);
    // }, 500);

  //   item.addEventListener("touchstart", function (e) {
  //     console.log('touchstart');
  //     timer = setTimeout(function () {
  //         console.log('LongPress');
  //         e.preventDefault();
  //         LongPress();
  //     }, 200);
  //   });

  //   item.addEventListener("touchmove", function (e) {
  //     console.log('touchmove');
  //     clearTimeout(timer);
  //     timer = 0;
  // });

  //   item.addEventListener("touchend", function (e) {
  //     console.log('touchend');
  //     clearTimeout(timer);
  //     //if (timer != 0) {
  //     //    alert('这是点击，不是长按');
  //     //}
  //     return false;
  // });

    label.addEventListener("dblclick", function() {
    // longTapTime=setTimeout(()=>{
    // function EditContent(){
      console.log("time out");
      item.classList.add(CL_EDITING);
  
      // var edit = document.createElement('input');
      // var finished = false;
      // edit.setAttribute('type', 'text');
      // edit.setAttribute('class', 'edit');
      // edit.setAttribute('value', label.innerHTML);

      $('.editColumn').style.display="display";
      var finished = false;
      var edit = $('#EditinputBlock');
      edit.setAttribute('value',label.innerHTML);
  
      function finish() {
        if (finished) return;
        finished = true;
        item.removeChild(edit);
        item.classList.remove(CL_EDITING);
        $('.editColumn').style.display="none";
        $('#EditinputBlock').value='';
      }
  
      edit.addEventListener('blur', function() {
        finish();
      }, false);
  
      edit.addEventListener('keyup', function(ev) {
        if (ev.keyCode === 27) { // Esc
          finish();
        } else if (ev.keyCode === 13) {
          label.innerHTML = this.value;
          finish();
        }
      }, false);
 
      item.appendChild(edit);
      edit.focus();
    })


       
  
    item.querySelector('.toggle').addEventListener('change', function() {
      updateTodo(id, this.checked);
    }, false);
  
    item.querySelector('.deleteBtn').addEventListener('click', function() {
      removeTodo(id);
    }, false);
  
    todoList.insertBefore(item, todoList.firstChild);
    update();
    updateStorage();
  }

  function EditContent(itemId){

    var item = $('#'+itemId);
    // console.log("time out");
    item.classList.add(CL_EDITING);
    var label = item.querySelector('.content');
    

    // var edit = document.createElement('input');
    // var finished = false;
    // edit.setAttribute('type', 'text');
    // edit.setAttribute('class', 'edit');
    // edit.setAttribute('value', label.innerHTML);

    // $('.editColumn').style.display="block";
    var finished = false;
    var edit = $('#EditinputBlock');
    edit.setAttribute('value',label.innerHTML)
    // ('.editColumn').style.display = "block";
    function finish() {
      if (finished) return;
      finished = true;
      // item.removeChild(edit);
      // edit.style.display = "none";
      item.classList.remove(CL_EDITING);
      // $('.editColumn').style.display="none";
      $('.editNcolor').style.display="none";
      $('#EditinputBlock').value='';
    }

    edit.addEventListener('blur', function() {
      finish();
    }, false);

    edit.addEventListener('keyup', function(ev) {
      if (ev.keyCode === 27) { // Esc
        finish();
      } else if (ev.keyCode === 13) {
        label.innerHTML = this.value;
        finish();
      }
    }, false);

    // item.appendChild(edit);
    
    edit.focus();
  }

function toggleAllTodoList() {
    var items = $All('.itemList div.itemNo');
    var toggleAll = $('.toggle-all');
    var checked = toggleAll.checked;
    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var toggle = item.querySelector('.toggle');
        if (toggle.checked !== checked) {
        toggle.checked = checked;
        if (checked) item.classList.add(CL_completed);
        else item.classList.remove(CL_completed);
        }

        for(j=0;j<itemListStore.length;j++){
            if(itemListStore[j].timeStp == item.id){
                itemListStore[j].done=!itemListStore[j].done;
                break;
            }
        }
    }

    update();
    updateStorage();
}

function clearcompletedTodoList() {
    var todoList = $('.itemList');
    var items = $All('.itemList div.itemNo');
    for (var i = items.length - 1; i >= 0; --i) {
      var item = items[i];
      if (item.classList.contains(CL_completed)) {
        todoList.removeChild(item);
      }

      for(j=0;j<itemListStore.length;j++){
        if(itemListStore[i].done){
            itemListStore.splice(i,1);
            i--;
        }
    }
    }
    update();
    updateStorage();
  }

function changeColor(itemId){
  console.log("change color");
  // $('.editNcolor').style.display="block";
  // var colorInputBox = $('#colorInputBox');
  itemDiv = $('#'+itemId);
  for(var item of colorArr){
    var el=document.createElement('div');
    el.classList.add('colorSelector');
    var subel=document.createElement('span');
    subel.classList.add('iconfont','icon-round-copy');
    subel.style.color=item;
    subel.style.fontSize='28px';
    el.appendChild(subel);
    el.addEventListener('touchstart',(e)=>{
        // document.getElementsByTagName('body')[0].style.backgroundColor=e.target.style.color;
        itemDiv.children[0].getElementsByTagName("div")[0].style.backgroundColor=e.target.style.color;
        console.log(itemDiv.children[0].getElementsByTagName("div"));
        // $('#colorInputBox').removeChild(el);
        // $('.editNcolor').style.display="none";
        var colorSelectorToDelete = document.getElementsByClassName('colorSelector');
        for(var i = colorSelectorToDelete.length - 1; i >= 0; i--) { 
        colorSelectorToDelete[i].parentNode.removeChild(colorSelectorToDelete[i]); 
}
    })
    $('#colorInputBox').appendChild(el);
}


}

function showSearchPanel(){
  $('.Search-container').style.display="block";
  console.log("11");
}

function search(searchContent) {
  // searchResult = itemListStore;
  console.log("search func");
  var searchbox = $('#SearchinputBlock');
  searchResult = JSON.parse(JSON.stringify(itemListStore));
  searchResult.splice(0,searchResult.length);
  for(i=0;i<itemListStore.length;i++){
    if(itemListStore[i].content.indexOf(searchContent)>-1){
      searchResult.push({
        content:itemListStore[i].content,
        done:itemListStore[i].done,
        timeStp:itemListStore[i].timeStp
      });
    }
  }
  update();
  showSearch();
  
  searchbox.value = '';
  $('#displayDone').style.display = "none";
  $('#displayUnfinished').style.display = "none";
  $('.searchResultIcon').style.display="";
  isSearching = true;
    // updateStorage();
  console.log("search result:");
  console.log(searchResult);
  console.log(itemListStore);
}

function showNormal(){
  todoList = $('.itemList');
  items = $All('.itemList div.itemNo');
  //first clear all lists
  for (var i = items.length - 1; i >= 0; --i) {
    var itemRemove = items[i];
    todoList.removeChild(itemRemove);
  }
  for(j=itemListStore.length-1;j>=0;--j){
    var normalResultItem = itemListStore[j];
    var item = document.createElement('div');
    item.setAttribute('id', normalResultItem.timeStp);
    item.setAttribute('class',"itemNo");
    item.timeStp = normalResultItem.timeStp;
    if(normalResultItem.done){
      item.classList.add(CL_completed);
    }
    // item.innerHTML = searchResult[j].content;
    item.innerHTML = [
      '<div class="itemInner">',
      '  <input class="toggle" type="checkbox">',
      '  <div class="content">' + itemListStore[j].content + '</div>',
      '  <button class="deleteBtn">×</button>',
      '</div>'
  ].join('');

    // console.log(item);
    todoList.appendChild(item);
  }
  update();
}

function showSearch(){
  todoList = $('.itemList');
  items = $All('.itemList div.itemNo');
  //first clear all lists
  for (var i = items.length - 1; i >= 0; --i) {
    var itemRemove = items[i];
    todoList.removeChild(itemRemove);
  }
  for(j=searchResult.length-1;j>=0;--j){
    var searchResultItem = searchResult[j];
    var item = document.createElement('div');
    item.setAttribute('id', searchResultItem.timeStp);
    item.setAttribute('class',"itemNo");
    item.timeStp = searchResultItem.timeStp;
    if(searchResultItem.done){
      item.classList.add(CL_completed);
    }
    // item.innerHTML = searchResult[j].content;
    item.innerHTML = [
      '<div class="itemInner">',
      '  <input class="toggle" type="checkbox">',
      '  <div class="content">' + searchResultItem.content + '</div>',
      '  <button class="deleteBtn">×</button>',
      '</div>'
  ].join('');

    console.log(item);
    todoList.appendChild(item);
  }
  update();
  // updateStorage();
}

var lastTouch;
var currentTouch;
var lastTargetId;
var currentTargetId;
var longTapTime;
//touch control
touchControler={
  start:function(e){
      lastTouch=e.touches[0];
      if(!lastTouch){return;}
      // lastTargetId=element.getId(lastTouch.target);
      lastTargetId = getId(lastTouch.target);
      longTapTime=setTimeout(() => {
          // editPanel.show(lastTargetId);
      }, 500);
  },
  move:function(e){
      currentTouch=e.touches[0];
      if (Math.abs(currentTouch.clientX-lastTouch.clientX)>10||Math.abs(currentTouch.clientY-lastTouch.clientY)>10){
          clearTimeout(longTapTime);
      } 
  },
  cancel:function(e){
      clearTimeout(longTapTime);
  },
  end:function(e){
      var clearAll=function(){
          lastTouch=null;
          currentTouch=null;
          lastTargetId=null;
          currentTargetId=null;
      };
      clearTimeout(longTapTime);
      if(!lastTouch||!currentTouch){
          clearAll();
          return;
      }

      // currentTargetId=element.getId(currentTouch.target);
      currentTargetId = getId(currentTouch.target);
      console.log(currentTargetId);
      console.log(lastTargetId);

      if(currentTargetId===lastTargetId&&
          currentTouch.clientX-lastTouch.clientX>=60&&
          Math.abs(currentTouch.clientY-lastTouch.clientY)<=60)
          {
              // itemOp.delete(lastTargetId); 
              //右滑删除
              removeTodo(lastTargetId);
              clearAll();
              console.log("右滑");
              return;
          }
      else if(currentTargetId===lastTargetId&&
          currentTouch.clientX-lastTouch.clientX<=-60&&
          Math.abs(currentTouch.clientY-lastTouch.clientY)<=60)
          {
              // itemOp.modify(lastTargetId); 
              //左滑修改
              // removeTodo(lastTargetId);
              $('.editNcolor').style.display="block";
              var colorSelectorToDelete = document.getElementsByClassName('colorSelector');
              for(var i = colorSelectorToDelete.length - 1; i >= 0; i--) { 
              colorSelectorToDelete[i].parentNode.removeChild(colorSelectorToDelete[i]); 
              }
              EditContent(lastTargetId);
              //显示调色盘
              changeColor(lastTargetId);
              clearAll();
              console.log("左滑");
              return;
          }
  }
}




function init() {
    var newItem = $('#inputBlock');
    newItem.addEventListener('keyup', function(ev) {
      // Enter
      if (ev.keyCode !== 13) return;
  
      var msg = newItem.value;
      if (msg === '') {
        console.warn('msg is empty');
        return;
      }
  
      addTodo(msg);
      newItem.value = '';
    }, false);

    var toolAreaIcon = $('#toolAreaBtn');
    toolAreaIcon.addEventListener('click',function(){
      search();
      console.log("toolAreaClick");
    }, false);



    var searchItem = $('#SearchinputBlock');
    searchItem.addEventListener('keyup',function(ev){
      // Enter
      if (ev.keyCode !== 13) return;
  
      var msg = searchItem.value;
      if (msg === '') {
        console.warn('search content is empty');
        return;
      }
  
      search(msg);
      $('.Search-container').style.display="none";
      // newItem.value = '';

    }, false);
  
    var clearCompleted = $('.clear-completed');
    clearCompleted.addEventListener('click', function() {
      // clearCompletedTodoList();
      deleteAllComplete();
    }, false);
  
    var toggleAll = $('.toggle-all');
    toggleAll.addEventListener('click', function() {
      toggleAllTodoList();
      console.log("toggle-all changed");
    }, false);
  
    var filters = $All('.filter-header div.filter');
    for (var i = 0; i < filters.length; ++i) {
      (function(filter) {
        filter.addEventListener('click', function() {
          for (var j = 0; j < filters.length; ++j) {
            filters[j].classList.remove(CL_SELECTED);
          }
          filter.classList.add(CL_SELECTED);
          if($('#displayAll').classList.contains(CL_SELECTED)){
            // isSearching = false;
            showNormal();
            $('#displayDone').style.display="";
            $('#displayUnfinished').style.display="";
            $('.searchResultIcon').style.display="none";
          }
          update();
        }, false);
      })(filters[i])
    }

    //color change panel
  //   for(var item of colorArr){
  //     var el=document.createElement('div');
  //     el.classList.add('colorSelector');
  //     var subel=document.createElement('span');
  //     subel.classList.add('iconfont','icon-round-copy');
  //     subel.style.color=item;
  //     subel.style.fontSize='28px';
  //     el.appendChild(subel);
  //     el.addEventListener('touchstart',(e)=>{
  //         document.getElementsByTagName('body')[0].style.backgroundColor=e.target.style.color;
  //     })
  //     $('#colorInputBox').appendChild(el);
  // }
  
    update();
    // updateStorage();
};






if(localStorage.todos){
    // Former User with stored data
    // getStorage();
    init();
    console.log(localStorage.itemData);
    var tempArr=JSON.parse(localStorage.itemData);
    for(var i=0;i<tempArr.length;i++){
        itemListStore.push({
            content:tempArr[i].content,
            timeStp:tempArr[i].timeStp,
            done:tempArr[i].done
        });
    }
    update();
    updateStorage();
    initiateList();
}else{
    // New User
    localStorage.setItem('todos',true);
    // getStorage();
    init();
    itemListStore=[
      {
        content:'点击左上方菜单栏进行批量操作',
        timeStp:("id"+new Date().getTime()+parseInt(Math.random()*10+1)).toString(),
        done:false
    },
      {
        content:'点击下方工具栏进行“搜索”',
        timeStp:("id"+new Date().getTime()+parseInt(Math.random()*10+1)).toString(),
        done:false
    },
        {
            content:'左滑编辑/修改颜色',
            timeStp:("id"+new Date().getTime()+parseInt(Math.random()*10+1)).toString(),
            done:false
        },
        {
            content:'右滑删除项目',
            timeStp:("id"+new Date().getTime()+parseInt(Math.random()*100+1)).toString(),
            done:false
        },
        {
          content:'欢迎使用Todos',
          timeStp:("id"+new Date().getTime().toString()),
          done:false
        },
    ];
    update();
    updateStorage();
    initiateList();
}
// items=[
//     {
//         content:'欢迎使用Todos',
//         timeStp:new Date().getTime().toString(),
//         done:false
//     },
//     {
//         content:'左滑切换完成/取消',
//         timeStp:(new Date().getTime()+parseInt(Math.random()*10+1)).toString(),
//         done:false
//     },
//     {
//         content:'右滑删除项目',
//         timeStp:(new Date().getTime()+parseInt(Math.random()*100+1)).toString(),
//         done:false
//     },
// ];
// updateData();
// diff(items);
// 
