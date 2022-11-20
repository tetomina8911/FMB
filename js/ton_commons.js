// 숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function(){
  if(this==0) return 0;

  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = (this + '');

  while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

  return n;
};

String.prototype.nvl = function(string) {
var returnValue = this;
if (this == null || this == 'null' || this == undefined || this == '') {
returnValue = string;
}
return returnValue;
};

$.fn.serializeObjectJson = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name]) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};

/**
* IOS -> new Date( 'YYYY/MM/DD'나 YYYY,MM,DD 형태로 변환해야함);
* ex)  new Date(forIOSFormatDate(date))
*/
function forIOSFormatDate(date) {
if (typeof date === 'string' ) {
  date = date.replaceAll('.','/').replaceAll('-','/');
}
return date;
}


function dateAdd(sDate, v, t) {

var yy = parseInt(sDate.split('-')[0]);
var mm = parseInt(sDate.split('-')[1]);
var dd = parseInt(sDate.split('-')[2]);

if(t == "d"){
  d = new Date(yy, mm - 1, dd + v);
}else if(t == "m"){
  d = new Date(yy, mm - 1 + v, dd);
}else if(t == "y"){
  d = new Date(yy + v, mm - 1, dd);
}else{
  d = new Date(yy, mm - 1, dd + v);
}

date = formatDate(d);

return '' + date.split('-')[0] + '-' +  date.split('-')[1]  + '-' + date.split('-')[2];

}

function formatYear(date) {
if(date){
    var d = new Date(forIOSFormatDate(date)),
         year = d.getFullYear();
      return year;
}else{
  return "";
}
}

function formatMonth(date ,iskor) {
if(date){
    var d = new Date(forIOSFormatDate(date)),
        month = '' + (d.getMonth() + 1),
          year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
      if(iskor == 1){
        return year +'년 '+ month+'월 '
  }else{
        return [year, month].join('-');	
  }
      
      
}else{
  return "";
}
}

function formatDate(date, iskor) {
if(date){
    var d = new Date(forIOSFormatDate(date)),
      day = ('0' + (d.getDate())).slice(-2),
        month = ('0' + (d.getMonth() + 1)).slice(-2),
          year = d.getFullYear();
  if(iskor == 1){
        return year +'년 '+ month+'월 '+ day+'일';
  }else{
        return [year, month, day].join('-');	
  }
  
}else{
  return "";
}
}


function formatMonthDay(date, iskor) {
if(date){
    var d = new Date(forIOSFormatDate(date)),
      day = ('0' + (d.getDate())).slice(-2),
        month = ('0' + (d.getMonth() + 1)).slice(-2),
          year = d.getFullYear();
  if(iskor == 1){
        return  month+'월 '+ day+'일';
  }else{
        return [month, day].join('-');	
  }
  
}else{
  return "";
}
}

function getWeek(date, isFull){
let d = new Date(forIOSFormatDate(date))
let week = d.getDay();
let weekKor = ['일', '월', '화', '수', '목', '금', '토']
let postfix = '';
(isFull==1) ? postfix ='요일':''; 
return weekKor[week] + postfix;
} 



function formatDateTime(date, iskor) {
 if(date == "" || date == undefined || date == null || date == "null" || date == "undefined"){
      return "";
  }
if(date){
    var d = new Date(forIOSFormatDate(date)),
      mm = '' + d.getMinutes(),
      hh = '' + d.getHours(),
      day = '' + (d.getDate()),
        month = '' + (d.getMonth() + 1),
          year = d.getFullYear();

  if (mm.length < 2) mm = '0' + mm;
  if (hh.length < 2) hh = '0' + hh;
  if (day.length < 2) day = '0' + day;
  if (month.length < 2) month = '0' + month;
  if(iskor == 1){
    return year+'년 '+month+'월 '+ day+'일 '+' '+[hh,mm].join(":");			
  }else{
    return [year, month, day].join('-')+' '+[hh,mm].join(":");	
  }
}else{
  return "";
}
}

function formatLocalDate(date) {
if(date){
  let year =  date.year;
  let month =  '' +date.monthValue;
  let day = '' + date.dayOfMonth;
  if (day.length < 2) day = '0' + day;
  if (month.length < 2) month = '0' + month;
      return [year, month, day].join('-');
}else{
  return "-";
}
}

function formatLocalDateTime(date) {
if(date){
  let year =  date.year;
  let month =  '' +date.monthValue;
  let day =  '' +date.dayOfMonth;
  let hh = '' + date.hour;
    let	mm = '' + date.minute;
    
  if (mm.length < 2) mm = '0' + mm;
  if (hh.length < 2) hh = '0' + hh;
  if (day.length < 2) day = '0' + day;
  if (month.length < 2) month = '0' + month;
  
      return [year, month, day].join('-')+' '+[hh,mm].join(":");
}else{
  return "-";
}
}

/*
* 숫자금액을 한글금액으로 변환하기
* */
function changeHangul(munber) {
  var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
  var danA = new Array("","십","백","천","","십","백","천","","십","백","천");
  var num = munber;
  var result = "";
  if(isNumeric(munber)) {
      for(i=0; i<num.length; i++) {
          str = "";
          han = hanA[num.charAt(num.length-(i+1))];
          if(han != "") str = han+danA[i];
          if(i == 4) str += "만";
          if(i == 8) str += "억";
          result = str + result;
      }
  }
  return result;
} 

function isNumeric(munber) {
  var objVal = munber;
  
  for(var i = 0 ; i < objVal.length; i++) {
      var vChr = objVal.charAt(i);
      if(vChr!=".") {
          var code = vChr.charCodeAt(0);
          if ( code < 48 || code > 57 ) {
              alert('숫자 타입이 아닙니다.');
              obj.value = '';
              obj.focus();
              return false;
          } else {
              return true;
          }
      } else {
          return true;
      }
  }
}

//"info":           "Showing _START_ to _END_ of _TOTAL_ entries",
//"infoEmpty":      "Showing 0 to 0 of 0 entries",
//"lengthMenu":     "Show _MENU_ entries",
var datatableKorean =  {
    "decimal":        "",
      "emptyTable":     "조회된 데이터가 없습니다.",
      "info":           "_START_ - _END_  (전체 _TOTAL_개 중)",
      "infoEmpty":      "전체 0 개",
      "infoFiltered":   "(filtered from _MAX_ total entries)",
      "infoPostFix":    "",
      "thousands":      ",",
      "lengthMenu":     "_MENU_ 개씩 보기",
      "loadingRecords": "Loading...",
      "processing":     "로딩중...",
      "search":         "Search:",
      "zeroRecords":    "검색 결과가 없습니다.",
      "paginate": {
          "first":      "First",
          "last":       "Last",
          "next":       "다음",
          "previous":   "이전"
      },
      "aria": {
          "sortAscending":  ": activate to sort column ascending",
          "sortDescending": ": activate to sort column descending"
      }
  }


$(document).ready(function(){


$.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name]) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };


$("input").attr("autocomplete","off");

// 숫자만 입력 input 처리
$(document).on("input", "input.number", function(){
  var val = $(this).val();
  if(val.lastIndexOf("-") > 0){
    if(val.indexOf("-") == 0){
      val = "-" + val.replace(/-/g, "");
    }else{
      val = val.replace(/-/g, "");
    }
  }
  $(this).val(val.replace(/[^-0-9]/g, ""));
});

// 전화번호 형식 입력 input 처리
$(document).on("input", "input.tel", function(e){
  // 11자리 이상 입력한 경우 더 입력할 수 없도록 처리
  if($(this).val().replace(/[^0-9]/g, '').length > 11){
    $(this).val($(this).val().replace(/[^0-9]/g, '').substring(0,11));
  }
  // 00-0000-0000 형식인 경우 처리
  if($(this).val().replace(/[^0-9]/g, '').length == 10){
    $(this).val($(this).val().replace(/[^0-9]/g, '')
          .replace(/^(\d{2})(\d{4})(\d{4})$/g, "$1-$2-$3")
          .replace(/(\-{1,2})$/g, ""));
  }else{
    $(this).val($(this).val().replace(/[^0-9]/g, '')
          .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/g, "$1-$2-$3")
          .replace(/(\-{1,2})$/g, ""));
  }
});

  /*
   * FMB
  */
  // common-email 
  var commonEmail = document.querySelectorAll('.common-email');
  if ( commonEmail.length ) {
    $(document).on('input', 'input.email-front, input.email-back', function(e) {
      var target = this.parentNode.querySelector('input.email-avg'); 
      if ( !target ) return;

      var email = target.value.indexOf("@") !== -1 ? target.value : "@";
      email = email.split('@');
      var val = this.value;

      if( this.classList.contains('email-front') ) email[0] = val; // email: front
      else email[1] = val; // email: back

      target.value = email.join('@'); // update value

      if ( !checkEmail(target.value ) ) {
        // email format == false
        console.log('email format false ...');
      }
    });
  }

  // common-textarea <textarea> 초기화
  var commonTextarea = document.querySelectorAll('.common-textarea')
  if ( commonTextarea.length ) {
    
    Array.prototype.slice.call(commonTextarea).forEach(function(item) {
      // item == .common-textarea
      var textarea = item.querySelector('textarea');
      var score = item.querySelector('span');
    
      if ( !textarea || !textarea.maxLength || !score ) return;
      score.innerText = "0/" + String(textarea.maxLength);
    });

    // common-textarea <textarea>
    $(document).on('input', '.common-textarea textarea', function() {
      var maxLength = this.maxLength; 
      if ( !maxLength ) return;

      var valLength = this.value.length;
      var score = $(this).next();
      if( score.length ) score.text(String(valLength) + "/" + String(maxLength));
    });
  }

  // 입력폼 그룹 추가 / 제거
  if ( $('.group-inc').length ) {

    // 파일추가(common-input-file) : (item) 추가
    $('.group-inc .inc-add').on('click', function() {
      var list = $(this).closest('.group-inc');

      var count = list.children('li:not(.og)').length + 1;
      var label = list.data('label');
      if ( !label ) label = '';
      label += "-" + String(count);

      var target = $(this).closest('li'); // current
      
      var cloneItem = list.find('li.og').clone(true, true);
      cloneItem.removeClass('og').addClass(label);

      //cloneItem.appendTo(target);
      cloneItem.insertAfter(target);
    });
    // 파일추가(common-input-file) : (item) 제거
    $('.group-inc .inc-remove').on('click', function() {
      var list = $(this).closest('.group-inc');

      var count = list.children('li:not(.og)').length;
      
      var target = $(this).closest('li');
      target.remove(); // remove item
      if ( count <= 1 ) list.find('li.og button.inc-add').click(); // init item
    });
  }

  if ( $('.common-input-file').length ) {
    // 파일추가(common-input-file) : <label> onclick
    $('.common-input-file .upload-for-file').on('click', function() {
      var inputwrap = this.parentNode; // common-input-file
      if ( !inputwrap ) return;

      // inputfile 
      var inputfile = inputwrap.querySelector('.upload-file');
      if ( inputfile ) inputfile.click();
    });

    // 파일추가(common-input-file) : <file> onchange
    $('.common-input-file input[type=file]').on('change', function(e){
      // input "file" onchnage
      // formData -> append
      var file = this.files[0];
      // filename

      var inputwrap = this.parentNode; // common-input-file
      if ( !inputwrap ) return;

      // input text
      var inputtext = inputwrap.querySelector('.upload-name');
      if ( inputtext ) inputtext.value = file.name;
    });
  }
  // ~ FMB
});
 /*
  * FMB
 */
 
// ~ FMB


// 날짜 몇분전, 며칠전 계산
function strTerm(strDate){
   let calcTime = new Date() - new Date(forIOSFormatDate(strDate))
   let calMin = Math.floor(calcTime/1000/60)
   let strTerm = ""
   
   if(calMin<60){
       if(calMin <= 0) {
         strTerm = "방금"
       }else {
         strTerm = calMin+"분 전";
       }
   }else if(calMin >= 60 && calMin < 24*60){
       let calHour = Math.floor(calMin/60)
       strTerm = calHour+"시간 전";
   }else if(calMin >= 24*60  && calMin < 24*60*14){
       let calDay = Math.floor(calMin/60/24)
       strTerm = calDay+"일 전";
   }else if(calMin >= 24*60*14 && calMin < 24*60*30){
       let calWeek = Math.floor(calMin/60/24/7)
       strTerm = calWeek+"주 전";
   }else if(calMin >= 24*60*30 && calMin < 24*60*30*12){
       let calMonth = Math.floor(calMin/60/24/30)
       strTerm = calMonth+"개월 전";
   }else if(calMin >= 24*60*30*12){
       let calYear = Math.floor(calMin/60/24/30/12)
       strTerm = calYear+"년 전";
   }
   return strTerm;
}// strTerm()
           
// 24시간단위 오후,오전 계산
function strTime(time, type){
var date = new Date(forIOSFormatDate(time));
var timeHtml = '';
var hour = date.getHours();
var min = ('0' + date.getMinutes()).slice(-2)
if ( hour < 12) {
  timeHtml = '오전 ' + hour + ':' + min;
  
  }else {
    if( date.getHours() == 12) {
      hour = 12;
    }else {
      hour = date.getHours() - 12;
    }
    timeHtml = '오후 ' + hour + ':' + min; 
  }
  
if(type == 24){
  timeHtml = date.getHours()+":"+	('0' + date.getMinutes()).slice(-2)
}

return timeHtml;
}

// 날짜 계산 YY-MM-DD / YY-MM
function strDate(time , format ){
var day = new Date(forIOSFormatDate(time))
var month = day.getMonth() +1;
if (format == null || format == '') {
  //YY-MM-DD
  var lastDate = day.getFullYear() +'-' +  month + '-' + day.getDate();
  return lastDate;
}else {
  if (format === 'YY-MM') {
    //YY-MM
    const monthText = '0' + month;
    var lastDate = day.getFullYear() +'-' +  monthText.slice(-2);
    return lastDate;
  }else {
    var lastDate = day.getFullYear();
    return lastDate;
  }
}
}
// 날짜 계산 YY.MM.DD
function strDateDot(time){
var day = new Date(forIOSFormatDate(time))
var month = day.getMonth() +1;
var lastDate = day.getFullYear() +'.' +  month + '.' + day.getDate();
return lastDate;
}

//common.js
const SEC_TOKEN = $("meta[name='_csrf']").attr("content");
const SEC_HEADER = $("meta[name='_csrf_header']").attr("content");
var defaultAjaxError = function(data){
modal.showAlertNoHeaderModal('done',{ title: '네트워크가 원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.', btn: '확인' },function(){})
}

var comAjax={
requestAsync : function(method, url, param, dataType, callback) {
  if(method.toLowerCase() == "get" && param != null && param != "") {
    var curParam = JSON.parse(param);
    var jsonKeys = Object.keys(curParam);
    var queryParam = "?";
    
    for(var i = 0; i < jsonKeys.length; i++) {
      if(queryParam != "?") {
        queryParam += "&";
      }
      
      var curKey = jsonKeys[i];
      
      queryParam += curKey + "=" + curParam[curKey];
    }
    
    param = "";
    url += queryParam;
  }
  
  $.ajax({
    url:url,
    type:method,
    data:param,
    dataType:dataType,
    beforeSend: function(xhr) {
      if(method.toLowerCase()!="get"){
        xhr.setRequestHeader(SEC_HEADER, SEC_TOKEN);
      }
      LoadingWithMask();
    },complete: function() {
      closeLoadingWithMask();
      removeAutoTopBottomBtn();
      }
  }).done(callback)
  .fail(function(xhr, status, error) {
//			console.log(xhr);
  });
  
},

requestAsyncJson : function(method, url, param, dataType, callback, errorCallback) {
  if(errorCallback == undefined || errorCallback == null){
    errorCallback=defaultAjaxError
  }
  
  $.ajax({
    url:url,
    contentType:"application/json",
    type:method,
    data:param,
    dataType:dataType,
    beforeSend: function(xhr) {
      if(method.toLowerCase()!="get"){
        xhr.setRequestHeader(SEC_HEADER, SEC_TOKEN);
      }
      LoadingWithMask();
    },complete: function() {
      closeLoadingWithMask();
      removeAutoTopBottomBtn();
      }
  }).done(callback)
  .fail(function(xhr, status, error) {
//			console.log(xhr);
    if(typeof(errorCallback) == "function"){
      errorCallback(xhr);
    }
  });
  //.fail(errorCallback);
},

requestAsyncForm : function(method, url, formData, dataType, callback) {
  $.ajax({
    type : method,
          enctype : 'multipart/form-data',
          data : formData,
          dataType : dataType,
          processData : false,
          contentType : false,
          cache : false,
          async: false,
          timeout : 600000,
          url : url,
          beforeSend : function(xhr) {
      xhr.setRequestHeader(SEC_HEADER, SEC_TOKEN);
      LoadingWithMask();
    },complete: function() {
//				console.log("complete")
      closeLoadingWithMask();
      removeAutoTopBottomBtn();
    }
  }).done(callback)
  .fail(function(xhr, status, error) {
    console.log(xhr.responseText);
  });
},
requestSync : function(method, url, param, dataType, callback, errorCallback) {
  if(method.toLowerCase() == "get" && param != null && param != "") {
    var curParam = JSON.parse(param);
    var jsonKeys = Object.keys(curParam);
    var queryParam = "?";
    
    for(var i = 0; i < jsonKeys.length; i++) {
      if(queryParam != "?") {
        queryParam += "&";
      }
      
      var curKey = jsonKeys[i];
      
      queryParam += curKey + "=" + curParam[curKey];
    }
    
    param = "";
    url += queryParam;
  }
  
  $.ajax({
    url:url,
    type:method,
    data:param,
    dataType:dataType,
    async: false,
    beforeSend: function(xhr) {
      if(method.toLowerCase()!="get"){
        xhr.setRequestHeader(SEC_HEADER, SEC_TOKEN);
      }
      LoadingWithMask();
    },complete: function() {
      closeLoadingWithMask();
      removeAutoTopBottomBtn();
      }
  }).done(callback)
  .fail(function(xhr, status, error) {
//			console.log(xhr);
    if(typeof(errorCallback) == "function"){
      errorCallback(xhr);
    }
  });
}

};

jQuery.fn.serializeObject = function() {
  var obj = null;
  try {
      if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
          var arr = this.serializeArray();
          if (arr) {
              obj = {};
              jQuery.each(arr, function() {
                  obj[this.name] = this.value;
              });
          }//if ( arr ) {
      }
  } catch (e) {
      alert(e.message);
  } finally {
  }

  return obj;
};


/*StringBuffer*/
var StringBuffer = function() {
this.buffer = new Array();
};
StringBuffer.prototype.append = function(str) {
this.buffer[this.buffer.length] = str;
};
StringBuffer.prototype.toString = function() {
  return this.buffer.join("");
};

var cooKies={
setCookie :function(name, value, expire) {  
  var now = new Date();
  now.setDate( now.getDate() + expire ); 
  var cookieStr = new StringBuffer();
  cookieStr.append(name+"=" + value+ "; ")
  cookieStr.append("expires = " + now.toUTCString() + ";")
  cookieStr.append("sameSite = strict;")
  document.cookie = cookieStr.toString()
},
getCookie: function(value) {  
   var cookieValue=null;
    if(document.cookie){
        var array=document.cookie.split((escape(value)+'='));
        if(array.length >= 2){
            var arraySub=array[1].split(';');
            cookieValue=unescape(arraySub[0]);
        }
    }
    return cookieValue;
      
} 
}



var htmlUtils = {
  encodeURI :function(contents, encoding) {
      var encoding =typeof encoding =='undefined' || encoding =="" ?"UTF-8" : encoding;
      return encodeURIComponent(contents, encoding);
  },
  encodingCheck :function(contents) {
      var regCheck = /^[A-Za-z0-9]$/;
      return regCheck.test(contents);
  },
  tempQS :"",
  jsonToQS :function(param) {
      htmlUtils.tempQS ="";
      jsonToQSTemp(param);
      return htmlUtils.tempQS;
  }
}
   
function jsonToQSTemp(param, keyString) {
  if (typeof param =="object") {
      if (Array.isArray(param)) {
          for (var i = 0; i < param.length; i++) {
              if (typeof param[i] =="object") {
                  jsonToQSTemp(param[i], keyString +"[" + i +"]");
              }
              else {
                  if (typeof keyString !='undefined' && keyString !="") {
                      jsonToQSTemp(param[i], keyString +"[" + i +"]");
                  }
              }
          }
      }
      else {
          for (var key in param) {
              if (typeof param[key] =="object") {
                  if (Array.isArray(param[key])) {
                      jsonToQSTemp(param[key], key); 
                  }
                  else {
                      jsonToQSTemp(param[key]);  
                  }
              }
              else {
                  if (typeof keyString !='undefined' && keyString !="") {
                      jsonToQSTemp(param[key], keyString +"[" + key + "]");
                  }
                  else {
                      jsonToQSTemp(param[key], key);
                  }
              }
          }
      }
  }
  else {
      if (htmlUtils.tempQS !="") {
          htmlUtils.tempQS +="&"
      }
      if (!htmlUtils.encodingCheck(param)) {
          param = htmlUtils.encodeURI(param);
      }
      htmlUtils.tempQS += keyString +"=" + param;
  }
}


let removeToast;
let removeToastDanger;

function toast(string) {
  const toast = document.getElementById("toast");
  toast.classList.contains("reveal") ?
      (clearTimeout(removeToast), removeToast = setTimeout(function () {
          document.getElementById("toast").classList.remove("reveal")
      }, 2500)) :
      removeToast = setTimeout(function () {
          document.getElementById("toast").classList.remove("reveal")
      }, 2500)
  toast.classList.add("reveal"),
toast.innerText = string
}

function toast_danger(string) {
  const toast_danger = document.getElementById("toast_danger");
  toast_danger.classList.contains("reveal") ?
      (clearTimeout(removeToastDanger), removeToastDanger = setTimeout(function () {
          document.getElementById("toast_danger").classList.remove("reveal")
      }, 2500)) :
      removeToastDanger = setTimeout(function () {
          document.getElementById("toast_danger").classList.remove("reveal")
      }, 2500)
  toast_danger.classList.add("reveal"),
toast_danger.innerText = string
}
//날짜형식 yyyy-mm-dd
function checkDate(strDate){
var reg = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
  return reg.test(strDate);
}
//이메일 형식
function checkEmail(email) {
var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
return reg.test(email);
}

function checkPasswd(passwd) {    
  var reg = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/   
return reg.test(passwd)
}

//	const swalConfirmBtButtons = Swal.mixin({
//		customClass: {
//			confirmButton: 'btn btn-sm btn-main btn-w-m',
//			cancelButton: 'btn btn-sm btn-white btn-w-m'
//		},
//	  	buttonsStyling: false
//	})
  
//	function swal2Confirm(message, icons, callFunc) {
//		swalConfirmBtButtons.fire({
//			html: message,
//			icon: getIcon(icons),
//			showCancelButton: true,
//			confirmButtonText : '확인',
//			cancelButtonText: '취소',
//			reverseButtons: true
//		})
//		.then(function(result){
//			if(result.isConfirmed && callFunc != null){
//				callFunc();
//			}
//		});				 
//	}

//	function swal2ConfirmResult(message, icons, callFunc) {
//		swalConfirmBtButtons.fire({
//			html: message,
//			icon: getIcon(icons),
//			showCancelButton: true,
//			confirmButtonText : '확인',
//			cancelButtonText: '취소',
//			reverseButtons: true
//		})
//		.then(function(result){
////			console.log(callFunc);
//			if(callFunc != null) {
//				callFunc(result);
//			}
//		});				 
//	}

//	function swal2Alert(message, icons, callFunc) {
//		
//		swalConfirmBtButtons.fire({
//			html: message,
//			icon: getIcon(icons),
//			showCancelButton: false,
//			confirmButtonText : '확인'
//		}).then(function(){
//			if(callFunc != null) {
//				callFunc();
//			}
//		});
//	}

function emptyFunc(){}

function getIcon(icons){
  let _icons = ''
    switch (icons) {
    case 1:
      _icons = 'success'
      break;
    case 2:
      _icons = 'error'
      break;
    case 3:
      _icons = 'info'
      break;
    case 4:
      _icons = 'question'
      break;
    case 5:
      _icons = 'warning'
      break;
    default:
      _icons = ''
      break;
    }
  return _icons;
}


function makeDateRangePicker(objId, sDateId, eDateId){
  $(objId).daterangepicker({
        format: 'YYYY-MM-DD',
        showDropdowns: true,
        showWeekNumbers: true,
        opens: 'right',
        drops: 'down',
        buttonClasses: ['btn', 'btn-sm'],
        applyClass: 'btn-primary',
        cancelClass: 'btn-default',
        separator: ' ~ ',
        locale: {
            applyLabel: '확인',
            cancelLabel: '취소',
            fromLabel: '부터',
            toLabel: '까지',
            daysOfWeek: ['일', '월', '화', '수', '목', '금','토'],
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            firstDay: 1
       }
  }, function(start, end, label) {
      var sdate = start.format('YYYY-MM-DD');
      var edate = end.format('YYYY-MM-DD');
      $(sDateId).val(sdate);
      $(eDateId).val(edate);
  });
  
  $(objId).on("change", function() {
    var dateArr = $(this).val().split(" ~ ");
      $(sDateId).val(dateArr[0]);
      $(eDateId).val(dateArr[1]);
  });
  
  var curDay = new Date();
  var monthAfter = new Date();
  monthAfter.setMonth(monthAfter.getMonth() - 1);
  $(objId).data("daterangepicker").setStartDate(monthAfter);
  $(objId).data("daterangepicker").setEndDate(curDay);
}

function imagePreview(input, strId) {
if(input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = e => {
          const previewImage = document.getElementById(strId)
          previewImage.src = e.target.result
      }
      reader.readAsDataURL(input.files[0])
}
}

function commonSelect2Ajax(objId, url, param, callback){
comAjax.requestAsyncJson("GET", url, param, "json", function(data){
  commonSelect2Data(objId, data);
  if(callback != null){
    callback(objId, param);
  }
}); 
}

function commonSelect2Data(objId, data){
$(objId).select2({
  minimumResultsForSearch: Infinity,
  //allowClear:true,
  data: data,
  language:"ko",
  width:"100%"
})
}

function commonSelect2(objId){
$(objId).select2({
  minimumResultsForSearch: Infinity,
  //allowClear:true,
  language:"ko",
  width:"100%"
})
}
  

var summernote_option={
            toolbar: [
            // [groupName, [list of button]]
        ['style', ['style']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
            ['color', ['forecolor','color']],
            ['table', ['table']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert',['picture', 'video']],
            ['view', ['codeview','fullscreen', 'help','undo','redo']]
          ],
         popover: {
            image: [
//							  ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
//							  ['float', ['floatLeft', 'floatRight', 'floatNone']],
              ['remove', ['removeMedia']],
//							  ['custom', ['imageAttributes']],
            ],
          },
      height: 600,
//				width: '100%',
      width: 430,
            fontNames: ['Nanum Gothic','맑은 고딕','궁서','굴림체','굴림','돋음체','바탕체'],
            fontSizes: ['8','9','10','11','12','13','14','15','16','17','18','19','20','24','30','36','48','64','82','150'],
            lang: "ko-KR",
            codeviewFilter: false,
        codeviewIframeFilter: true,
            callbacks: {	//여기 부분이 이미지를 첨부하는 부분
        onImageUpload : function(files) {
          uploadSummernoteImageFile(files[0],this);
        },
        onPaste: function (e) {
          var clipboardData = e.originalEvent.clipboardData;
          if (clipboardData && clipboardData.items && clipboardData.items.length) {
            var item = clipboardData.items[0];
            if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
              e.preventDefault();
            }
          }
        }
      }
          }



/**
* 이미지 파일 업로드
*/
function uploadSummernoteImageFile(ifile, editor) {

  imageCompression(ifile, commonImageCompressOptions)
  .then(function (compressedFile) {
      
      data = new FormData();
      sfile = new File([compressedFile], ifile.name  ,{type: ifile.type , lastModified:new Date().getTime()})
    data.append("upload", sfile);
    $.ajax({
      data : data,
      type : "POST",
      url : "/summernote/upload",
      contentType : false,
      processData : false,
      success : function(data) {
            //항상 업로드된 파일의 url이 있어야 한다.
        $(editor).summernote('insertImage', data.url);
      }
    });
  })
  .catch(function (error) {
    console.log(error.message);
  });

}


/*
이미지 압축(이미지 change시 적용)
compressImageFile(imgFileDom, previewDom, fromImageName, isMulti )
imgFileDom : 이미지 등록 이미지 dom 
previewDom : 미리보기시 img dom
fromImageName : form 전송 파일 name
isMulti : 멀티 이미지 여부 
*/
var commonImageCompressOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }
  
function compressImageFile(imgFileDom, previewDom, fromImageName, isMulti ){
var imageFile = imgFileDom[0].files[0];

imageCompression(imageFile, commonImageCompressOptions)
.then(function (compressedFile) {
  if(previewDom != null){
    let _URL = window.URL || window.webkitURL;
    let src = _URL.createObjectURL(compressedFile)
    previewDom.attr("src",_URL.createObjectURL(compressedFile));	
  }
  var ifile = document.createElement("INPUT");
    ifile.setAttribute("type", "file");
  if(fromImageName != null){
    ifile.setAttribute("id", fromImageName);	
    ifile.setAttribute("name", fromImageName);
  }else{
    fromImageName = "file"
    ifile.setAttribute("id", fromImageName);	
    ifile.setAttribute("name", fromImageName);
  }

  let container = new DataTransfer();
  container.items.add(new File([compressedFile], imageFile.name  ,{type: imageFile.type , lastModified:new Date().getTime()}));
  ifile.files = container.files
  if(isMulti==0){
    $("input[name=file]").remove();
  }
  imgFileDom.parent().append(ifile);
  $("#"+fromImageName).addClass("d-none")
  
})
.catch(function (error) {
  console.log(error.message);
});
}

//nullCheck + 특수문자 html-> text 변환
function checkNull( $this, data) {
if (data != null && data != ''){
  var text = $("<div/>").html(data).text();
  $this.val(text.replaceAll('<br>','\r\n'))
}
}

function ntempty(value){
return !value?'':value
}

function videoSwiper(){
var swiper1 = new Swiper(".video-swiper", {
  direction: 'horizontal',
  slidesPerView: 10,
  spaceBetween: 10,
  navigation: {
      nextEl: ".pharmacy-button-next",
      prevEl: ".pharmacy-button-prev",
        },
      breakpoints: {
          1024: {
            slidesPerView: 6,
            spaceBetween: 20
          }
  }
});
}



//table width
let wCheck = '60px'
let wNum = '8%'
let wDate = '12%'


function makeDataTable(tableParam) {
if(!tableParam.callback) {
  tableParam.callback = function(settings, json) {
  }
}

if(tableParam.paging == null) {
  tableParam.paging = true;
}

var dataTableOptions = {
  processing: true,
  serverSide: true,
  ordering: true,
  info: false,
  destroy: true,
  searching: false,
  pagingType:"simple_numbers",
  lengthChange:false,
  "bSort": true,
//		bStateSave: true ,
  order:[],
  ajax: {
    url: tableParam.url,
    type: "GET",
    data: tableParam.param
  },
  columns: tableParam.cols,
  drawCallback:tableParam.callback,
  paging:tableParam.paging,
  language : datatableKorean
}

if(tableParam.ordering != null){
  dataTableOptions.ordering = tableParam.ordering;
}
if(tableParam.order != null){
  dataTableOptions.order = tableParam.order;
}	
if(tableParam.scrollY != null){
  dataTableOptions.scrollY = tableParam.scrollY;
}
if(tableParam.scrollCollapse != null){
  dataTableOptions.scrollCollapse = tableParam.scrollCollapse;	
}

$(tableParam.objId).DataTable(dataTableOptions);
}

function makeDataTableLocal(tableParam) {
$(tableParam.objId).DataTable({
  processing: true,
  serverSide: false,
  ordering: true,
  info: false,
  destroy: true,
  searching: false,
  pagingType:"simple_numbers",
  lengthChange:false,
  order:[[0, "asc"]],
  data: tableParam.dataset,
  columns: tableParam.cols,
  initComplete:tableParam.callback,
  paging:tableParam.paging,
  language : datatableKorean
});
}

function reloadDataTable(objId, callback) {
$(objId).DataTable().ajax.reload(callback);
}

function reloadDataTableStay(objId, callback) {
$(objId).DataTable().ajax.reload(callback, false);
}

function showDataTableCols(objId, cols) {
$(objId).DataTable().columns().every(function() {
  var v = false;
  for(i = 0; i < cols.length; i++) {
    if(cols[i] == this.dataSrc()) {
      v = true;
      break;
    }
  }
  this.visible(v);
});
}

function makeDatePicker(dateId, curDate, minDate) {
if($(dateId).datepicker) {
  $(dateId).datepicker("destroy");
}

$(dateId).datepicker({
  format: "yyyy.mm.dd",
  autoclose : true,
  calendarWeeks : false,
  clearBtn : false,
  disableTouchKeyboard : false,
  immediateUpdates: false, 
  multidate : false, 
  multidateSeparator :",",
  templates : {
    leftArrow: '&laquo;',
    rightArrow: '&raquo;'
  },
  showWeekDays : true ,
  todayHighlight : true , 
  toggleActive : false,
  weekStart : 0,
});

if(curDate != null) {
  $(dateId).datepicker("setDate", new Date(forIOSFormatDate(curDate)));
}else {
  $(dateId).datepicker("setDate", "0");
}

if(minDate != null) {
  $(dateId).datepicker('option', {minDate: new Date(forIOSFormatDate(minDate))});
}
}

// < yyyy-mm-dd > datePicker prev, next
function makeDateTabPicker(dateId, curDate) {
var dateObjId = dateId + " .dateTabInput";
if($(dateObjId).datepicker) {
  $(dateObjId).datepicker("destroy");
}

$(dateObjId).datepicker({
  format: "yyyy-mm-dd",
  autoclose : true,
  calendarWeeks : false,
  clearBtn : false,
  disableTouchKeyboard : false,
  immediateUpdates: false,
  maxViewMode: "days", 
  minViewMode: "days",
  multidate : false, 
  multidateSeparator :",",
  templates : {
    leftArrow: '&laquo;',
    rightArrow: '&raquo;'
  },
  showWeekDays : true ,
  todayHighlight : true , 
  toggleActive : false,
  weekStart : 0,
});

if(curDate != null) {
  $(dateObjId).datepicker("setDate", new Date(forIOSFormatDate(curDate)));
}else {
  $(dateObjId).datepicker("setDate", "0");
}

if($(dateId +" .fa-chevron-left")) {
  $(dateId +" .fa-chevron-left").parent().off("click").on("click", function() {
    var lastDate = $(dateObjId).datepicker("getDate");
    lastDate.setDate(lastDate.getDate() - 1);
    $(dateObjId).datepicker("setDate", new Date(forIOSFormatDate(lastDate)));
  });
}

if($(dateId +" .fa-chevron-right")) {
  $(dateId +" .fa-chevron-right").parent().off("click").on("click", function() {
    var lastDate = $(dateObjId).datepicker("getDate");
    lastDate.setDate(lastDate.getDate() + 1);
    $(dateObjId).datepicker("setDate", new Date(forIOSFormatDate(lastDate)));
  });
}
}

function makeMonthPicker(dateId, curMonth) {
var dateObjId = dateId + " .monthInput";
if($(dateObjId).datepicker) {
  $(dateObjId).datepicker("destroy");
}

$(dateObjId).datepicker({
  format: "yyyy-mm",
  autoclose : true,
  calendarWeeks : false,
  clearBtn : false,
  disableTouchKeyboard : false,
  immediateUpdates: false,
  maxViewMode: "months", 
  minViewMode: "months",
  multidate : false, 
  multidateSeparator :",",
  templates : {
    leftArrow: '&laquo;',
    rightArrow: '&raquo;'
  },
  showWeekDays : true ,
  todayHighlight : true , 
  toggleActive : false,
  weekStart : 0,
});

var curDate = new Date();		
if(curMonth != null) {
  curDate = new Date(forIOSFormatDate(curMonth));
}
curDate.setDate(1);
$(dateObjId).datepicker("setDate", curDate);

if($(dateId +" .fa-chevron-left")) {
  $(dateId +" .fa-chevron-left").parent().off("click").on("click", function() {
//			console.log(dateId + "!!!");
    var lastMonth = $(dateObjId).datepicker("getDate");
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    $(dateObjId).datepicker("setDate", new Date(forIOSFormatDate(lastMonth)));
  });
}

if($(dateId +" .fa-chevron-right")) {
  $(dateId +" .fa-chevron-right").parent().off("click").on("click", function() {
//			console.log(dateId + "!!!");
    var lastMonth = $(dateObjId).datepicker("getDate");
    lastMonth.setMonth(lastMonth.getMonth() + 1);
    $(dateObjId).datepicker("setDate", new Date(forIOSFormatDate(lastMonth)));
  });
}
}

function makeYearPicker(dateId, curYear) {
var dateObjId = dateId + " .yearInput";

if($(dateObjId).datepicker) {
  $(dateObjId).datepicker("destroy");
}

$(dateObjId).datepicker({
  format: "yyyy",
  autoclose : true,
  calendarWeeks : false,
  clearBtn : false,
  disableTouchKeyboard : false,
  immediateUpdates: false,
  maxViewMode: "years", 
  minViewMode: "years",
  multidate : false, 
  multidateSeparator :",",
  templates : {
    leftArrow: '&laquo;',
    rightArrow: '&raquo;'
  },
  showWeekDays : true ,
  todayHighlight : true , 
  toggleActive : false,
  weekStart : 0,
});

if(curYear != null) {
  $(dateObjId).datepicker("setDate", new Date(forIOSFormatDate(curYear)));
}else {
  $(dateObjId).datepicker("setDate", new Date());
}

if($(dateId +" .fa-chevron-left")) {
  $(dateId +" .fa-chevron-left").parent().off("click").on("click", function() {
    var lastYear = $(dateObjId).datepicker("getDate");
    lastYear.setYear(lastYear.getFullYear() - 1);
    $(dateObjId).datepicker("setDate", new Date(forIOSFormatDate(lastYear)));
  });
}

if($(dateId +" .fa-chevron-right")) {
  $(dateId +" .fa-chevron-right").parent().off("click").on("click", function() {
    var lastYear = $(dateObjId).datepicker("getDate");
    lastYear.setYear(lastYear.getFullYear() + 1);
    $(dateObjId).datepicker("setDate", new Date(forIOSFormatDate(lastYear)));
  });
}
}

function SignMaker(id, opts) {
var width = opts.width;
var height = opts.height;
var uploadUrl = opts.uploadUrl;
var uploadType = opts.type;

var canvas = document.createElement("canvas");
if(canvas.getContext) {
  // canvas는 style로 크기 조정 불가
  $(canvas).attr("width", width);
  $(canvas).attr("height", height);
  $(canvas).attr("style", "border: 1px solid #9e9e9e;");

  $(id).append(canvas);
  var ctx = canvas.getContext("2d");
  //임시추가
  $(id).css('position','relative');
  let guideHtml = `<p class="guide-text" style="width:${width}px;height:${height}px;line-height:${height}px; text-align:center;position:absolute; top:0; left:0; z-index:1; font-size: 29px;color:#c9c9c98f;pointer-events: none; font-weight: 500;">
          여기에 서명하세요.
          </p>` 
  $(id).append(guideHtml);
  var drawable = false;
  function draw(e) {
    function getPosition() {
      $('.guide-text').hide();
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;
      var pointX = e.clientX;
      var pointY = e.clientY;
      
      if(e.type.indexOf("touch") > -1) {
        pointX = e.changedTouches[0].clientX;
        pointY = e.changedTouches[0].clientY;
      } 
      
      return {
        X : (pointX - rect.left) * scaleX,
        Y : (pointY - rect.top) * scaleY
      }
    }
    
    if(e.type == "mousedown" || e.type == "touchstart") {
      drawable = true;
      var position = getPosition();
      ctx.beginPath();
      ctx.moveTo(position.X, position.Y);
      //console.log(position);
    }else if(e.type == "mousemove" || e.type == "touchmove") {
      if(drawable) {
        if(e.type == "touchmove") {
          e.preventDefault();
        }
        
        var position = getPosition();
        ctx.lineTo(position.X, position.Y);
        ctx.stroke();
      }
    }else if(e.type == "mouseup" || e.type == "mouseout" || e.type == "touchend" || e.type == "touchcancel") {
      drawable = false;
      ctx.closePath();
    }
  }
  
  $(canvas).on("mousedown", draw);
  $(canvas).on("mousemove", draw);
  $(canvas).on("mouseup", draw);
  $(canvas).on("mouseout", draw);
  $(canvas).on("touchstart", draw);
  $(canvas).on("touchmove", draw);
  $(canvas).on("touchend", draw);
  $(canvas).on("touchcancel", draw);
  
  this.getImage = function(callback) {
    //console.log(data);
    //console.log(base64Data);
    if(uploadUrl != null && uploadUrl != "") {
      canvas.toBlob(function(bdata) {
        var formData = new FormData();
        formData.append("type", uploadType);
        formData.append("file", bdata, "sign.png");
        
        comAjax.requestAsyncForm("POST", uploadUrl, formData, "json", function(data) {
          callback(data.result);
        });
        
      }, "image/png");
    }else {
      var data = canvas.toDataURL("image/png");
      var base64Data = data.substring(data.indexOf(",") + 1, data.length);
      callback(base64Data);
    }

  }
  
  this.clear = function() {
    $('.guide-text').show();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
    this.isDraw = function () {
          const blank = document.createElement('canvas');
          blank.width = canvas.width;
          blank.height = canvas.height;
          return canvas.toDataURL() != blank.toDataURL();
      }
      this.loadImage = function(files) {
    var curFile = files[0];
    var fr = new FileReader();
    fr.onload = function() {
      var curImg = new Image();
      curImg.onload = function() {
        $('.guide-text').hide();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(curImg, 0, 0, curImg.width, curImg.height, 0, 0, canvas.width, canvas.height);
      }
      curImg.src = fr.result;
    }
    fr.readAsDataURL(curFile);
  }
}else {
  console.log("This browser is not supported");
}

}

//임시
function multifulModal(current, topModal){
let currentModal = $(current).closest('.modal.inmodal');
let index = $(current).closest('.modal.inmodal').css('z-index');
currentModal.css('z-index', index);
$('.modal-backdrop').eq($(this).length).attr( 'style', 'z-index:'+(parseInt(index) + 1)+'!important');
$(topModal).css('z-index', parseInt(index) + 2);
}

$(function(){
defaultFun();
});
//주야간업무 -> ajax 호출후에도 작동해야함 (document)
function defaultFun(){
//modal background 클릭 막기
$('.modal').attr('data-backdrop','static').attr('data-keyboard','false');

//datatable th버튼 sorting막기
$('.table thead th button').on('click', function(e){
  if (e.target === e.currentTarget) {
    e.stopPropagation();
  }
});

//tooltips
$(document).on('mouseover','.thTooltips', function(){
  $(this).addClass('active');
});	
$(document).on('mouseleave','.thTooltips',function(){
  $(this).removeClass('active');
});	

//bookmark
$(document).on('click','.headerBookmark', function(){
  $(this).toggleClass('active');
});

//example floating footer
function _onresize() {
  const wrap = $("#wrapper");
  const wrapFooter = $(wrap).find(".sidebar-collapse");
  const wrapHeight = $('#page-wrapper').height();
  wrapFooter.css({
    height : (window.innerHeight + wrap.scrollTop()) + 'px',
    maxHeight : wrapHeight,
  });
}	
$(window).on("resize", function() {		
  _onresize();
});
$("#wrapper").scroll(function () {
  _onresize();
});
_onresize();

//실시간
getCurTime();
setInterval(getCurTime, 1000);
function getCurTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() +1;
  const day = date.getDate();
  const hour = ('0' + date.getHours()).slice(-2);
  const min = ('0' + date.getMinutes()).slice(-2);
  //const seconds = ('0' + date.getSeconds()).slice(-2);
  $('#curTimeClock').text(`${year}년 ${month}월 ${day}일 ${hour}:${min}`)
}

}
function ajaxPageReady() {
$('.table thead th .btn').off('click').on('click', function(e){
  if (e.target === e.currentTarget) {
    e.stopPropagation();
  }
});
}

//HTML 특수문자 인코딩
function decodeHtml(str){
return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&quot;/g, "\"");
}

var checkValidate = function(objectId){
let isValid = true;
$(objectId+" .form-control").each(function(){
  if($(this).attr("required") == "required"){
    var type = $(this).attr("type");
    if(type == "radio"){
      if($(this).attr("name")){
        var value = $(objectId+" .form-control[name=" + $(this).attr("name") + "]:checked").val();
        if(!value){
          isValid = false;
        }
      }
    }else{
      if($(this).val() == ''){
        isValid = false;
      }
    }
  
    if(!isValid){
      swal2Alert("필수항목이 누락되었습니다.<br/>["+$(this).data("label")+"]", 5)
      $(this).focus();
      return false;
    }
  }
})
return isValid;
}

var checkValidateForm = function(objectId){
let isValid = true;
$(objectId+" .required").each(function(){
  var type = $(this).attr("type");
  if(type == "radio"){
    if($(this).attr("name")){
      var value = $(objectId+" .form-control[name=" + $(this).attr("name") + "]:checked").val();
      if(!value){
        isValid = false;
      }
    }
  }else{
    if($(this).val() == ''){
      isValid = false;
    }
  }

  if(!isValid){
    modal.showAlertModal('done',{ title: '작성안된 항목이 있습니다.<br>확인 후 작성 하여 주세요.', btn: '확인' },function(){});
    $(this).focus();
    return false;
  }
})
return isValid;
}





// 이전 버튼 공통 처리
$(document).on('click', '.back-btn a', function(e){
e.preventDefault();
history.back();
})

$(document).on('click', '.main-btn a', function(e){
e.preventDefault();
location.href ="/main"
})

$(document).on('click', '.login-btn a', function(e){
e.preventDefault();
location.href ="/common/logout?url=/login"
})

function calendarInit(param) {
let closeHtml = '';
let btnHtml = '';
let headerHtml = '';
let btnToday = ``

//default : isModal
  const tcalendarToday = !param.isModal ? 'tcalendar-today' : 'tcalendar-today_Pop';
  const scheduleYearSelectBox = !param.isModal ? 'scheduleYearSelectBox' : 'scheduleYearSelectBox_Pop';
  const tcalendarMonth = !param.isModal ? 'tcalender-month' : 'tcalender-month_Pop';
  const tcalendarPrev = !param.isModal ? 'tcalendar-prev' : 'tcalendar-prev_Pop';
  const tcalendarNext = !param.isModal ? 'tcalendar-next' : 'tcalendar-next_Pop';
  const tcalendarModel = !param.isModal ? 'calendar_model' : 'calendar_model_Pop';
  const tcalendarDays = !param.isModal ? 'tcalender-days' : 'tcalender-days_Pop';
  const tcalendarCurrent = !param.isModal ? 'tcalender-current' : 'tcalender-current_Pop';
 const tcalendarDisable = !param.isModal ? 'tcalender-disable' : 'tcalender-disable_Pop';

  if (param.btnToday == true) {
      btnToday = `<button class="small_2 bg_yellow_3 bold" id="${tcalendarToday}" style="width:20.778vw;margin-left:5vw;">오늘</button>`
  }
  let headerAreaHtml = `
          <div class="select-years-area">
              <select name="" id="${scheduleYearSelectBox}"></select>
              ${btnToday}
            </div>
              <div class="select-date-area">
            <button class="small_2 bg_yellow_3 bold" id="${tcalendarPrev}"><img src="/img/icon/list_arrow_prev_black.svg" alt=""> 이전달</button>
            <span class="${tcalendarMonth}"> </span>
            <button class="small_2 bg_yellow_3 bold" id="${tcalendarNext}">다음달 <img src="/img/icon/list_arrow_next_black.svg" alt=""></button>
          </div>`;
  if (param.isModal) {
      closeHtml = `
          <div class="close-btn">
              <img src="/img/icon/close_icon_white.svg" alt="">닫기
          </div>
        </div>
        `;
      //		btnHtml = `
      //			       		<button class="large bg_yellow confirm" id="btnContentConfirm"><img src="/img/icon/check_icon_checked.svg" alt=""> 날짜 선택 완료</button>
      //				`
      callback = undefined;
      headerHtml = `
        <div class="modal calendar-pop" id="${tcalendarModel}">
          <header>
            ${headerAreaHtml}
            </header>`
  } else {
      headerHtml = '';
      $('#visual-header').append(headerAreaHtml);
  }
  let calendarHtml = `
  ${headerHtml}
    <div class="content inline">
        <div class="calender-area">
      <ol>
                <li class="dayOfTheWeek">일</li>
                <li class="dayOfTheWeek">월</li>
                <li class="dayOfTheWeek">화</li>
                <li class="dayOfTheWeek">수</li>
                <li class="dayOfTheWeek">목</li>
                <li class="dayOfTheWeek">금</li>
                <li class="dayOfTheWeek">토</li>
            </ol>
            <ol class="calender-area ${tcalendarDays}">
             </ol>
    </div>
    <div class="btn-wrap btn-wide inline">
      ${btnHtml}
    </div>
  </div>
    ${closeHtml}`
    

  if (param.isModal) {
      let bg = `<div class="modal-bg"></div>`;
      //multi :true -> 이중 팝업
      if (param.multi) {
          bg = `<div class="calendar-bg"></div>`;
      }
      $('body').append(calendarHtml, bg);
      $(`.calendar-pop .close-btn`).off('click').on('click', function () {
          if (param.multi) {
              removeCalendarModal();
          } else {
              removeModal();
          }
      });
  } else {
      $('#' + param.id).html(calendarHtml)
  }

//	$(param.thisDate)
// date 변수생성
  var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
if(param.dateParam){
  date = new Date(param.dateParam);
}
//	날짜 정보 가져오기
  var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
  var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
  var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

  var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  // 달력에서 표기하는 날짜 객체
  var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
  var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
  var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일
  let thisYear = (new Date()).getFullYear();
  // kst 기준 현재시간
  // console.log(thisMonth);
  
$(`.${tcalendarDays}`).off('click', `.${tcalendarCurrent}`).on('click', `.${tcalendarCurrent}`, function() {
    $(`.${tcalendarCurrent}`).removeClass('selected')
      $(this).addClass('selected');
    if(param.selcted_callback){
//			var callDate = $(this).data("date");
//	    	param.selcted_callback(callDate);
      param.selcted_callback($(this));
    }
  });
  
  // 캘린더 렌더링
  renderCalender(thisMonth);
  function renderCalender(thisMonth) {
  // 렌더링을 위한 데이터 정리
      currentYear = thisMonth.getFullYear();
      currentMonth = thisMonth.getMonth();
      currentDate = thisMonth.getDate();

      // 이전 달의 마지막 날 날짜와 요일 구하기
      var startDay = new Date(currentYear, currentMonth, 0);
      var prevDate = startDay.getDate();
      var prevDay = startDay.getDay();

      // 이번 달의 마지막날 날짜와 요일 구하기
      var endDay = new Date(currentYear, currentMonth + 1, 0);
      var nextDate = endDay.getDate();
      var nextDay = endDay.getDay();
      
      let arrHoliday = []
      comAjax.requestSync('GET', '/common/service/holiday', JSON.stringify({year: currentYear, month: endDay.getMonth()+1 }), 'json', function(data){
        let ret  = data.result
        ret.forEach(function(item){
          arrHoliday.push(item.day)
        })
      })

       //년도 설정
  $(`#${scheduleYearSelectBox}`).empty();
      for(i = thisYear+1-(param.flagFuture==false? 1 : 0) ; i >= thisYear-10 ; i--){
          $(`#${scheduleYearSelectBox}`).append("<option value="+i+" selected>"+i+"년</option>");
      }
      
      // 현재 월 표기
      $(`.${tcalendarMonth}`).text(('0'+(currentMonth + 1)).slice(-2)+'월');
      $(`#${scheduleYearSelectBox}`).val(currentYear);
      // 렌더링 html 요소 생성
      calendar = document.querySelector(`.${tcalendarDays}`)
      calendar.innerHTML = '';
      
      // 지난달
      if(prevDay < 6 ){
        for (var i = prevDate - prevDay ; i <= prevDate; i++) {
      let cdate = startDay.getFullYear() +'-' + ('0'+(currentMonth)).slice(-2)+'-'+('0'+i).slice(-2)
            calendar.innerHTML = calendar.innerHTML + `<li class="prev ${tcalendarDisable}" data-date="${cdate}">${i}</li>`
            
        }
      }
      
      // 이번달
      for (var i = 1; i <= nextDate; i++) {
        let style = ""
        if(arrHoliday.indexOf(i)>-1){ style = 'color: #ce4137' }
        let cdate = currentYear +'-' + ('0'+(currentMonth + 1)).slice(-2)+'-'+('0'+i).slice(-2)
        let _class = `${tcalendarCurrent}`
        if(param.flagFuture == false){
      if(formatDate(new Date()) < formatDate(new Date(cdate))){
        _class = `${tcalendarDisable}`
      }
    }
    event = '';
    eventlist = param.eventList;
    if(eventlist && eventlist.length > 0){
      eventlist.forEach(function(item){
        cnt = 1
        if(cdate == item.date){
          if(event!='') cnt++;
          event = '<div class="tcalendar-event '+item.class+'" title="'+item.title+'('+cnt+')">'+item.title+'</div>'
        }
      })
    }
    calendar.innerHTML = calendar.innerHTML + '<li class="'+_class+'" style="'+style+'" data-date="'+cdate+'">' + i + event +'</li>'
      }
      
      // 미래 표기 안함
      if(param.flagFuture == false){
    if(formatDate(new Date()).substr(0,7) <= formatDate(endDay).substr(0,7)){
      $(`#${tcalendarNext}`).prop('disabled', true);
      $(`#${tcalendarNext}`).css('opacity','0.5');
    }else{
      $(`#${tcalendarNext}`).prop('disabled', false);
      $(`#${tcalendarNext}`).css('opacity','1');
    }
  }
      
      // 다음달
      for (var i = 1; i <= (7 - nextDay-1 == 7 ? 0 : 7 - nextDay-1); i++) {
          calendar.innerHTML = calendar.innerHTML + `<li class="next ${tcalendarDisable}" >${i}</li>`
          
      }
      
      // 오늘 날짜 표기
      $(`.${tcalendarDays} li`).each(function(){
    let lDate = $(this).data('date')
    if(lDate == formatDate(today)){
      $(this).addClass('selected')
      if(!param.isModal){
        $(this).click();
      }
//				if(param.selcted_callback){
//			    	param.selcted_callback($(this));
//			    }
    }
  })
      
      $(`.${tcalendarDisable}`).css('color','#ddd');
    
      
  }//render
  
// 이전달로 이동
  $(`#${tcalendarPrev}`).off("click");
  $(`#${tcalendarPrev}`).on('click', function() {
      thisMonth = new Date(currentYear, currentMonth - 1, 1);
      if(param.returnMonth){
    reRenderCalendar(thisMonth);
//			callbackDate(thisMonth);
  }else if(thisYear-10 <= thisMonth.getFullYear()){
        renderCalender(thisMonth);
      }        
  });

  // 다음달로 이동
  $(`#${tcalendarNext}`).off("click");
  $(`#${tcalendarNext}`).on('click', function() {
      thisMonth = new Date(currentYear, currentMonth + 1, 1);
      if(param.returnMonth){
    reRenderCalendar(thisMonth);
//			callbackDate(thisMonth);
  }else if(thisYear+1 >= thisMonth.getFullYear()){
    renderCalender(thisMonth);			
  }
  });
  
  // 년도변경
  $(document).on("change", `#${scheduleYearSelectBox}`, function(){
    let year = $(this).val()
    thisMonth = new Date(year, currentMonth , 1);
    renderCalender(thisMonth);
  })
  
  // 오늘로
  $(`#${tcalendarToday}`).on('click', function() {
      thisMonth = new Date();
      today = new Date();
      renderCalender(thisMonth);
  });

}//calendarInit

/**
app 통신
*/
function getUserTokenkey(uuid){
  
var broswerInfo = navigator.userAgent; 

//	if(localStorage.sendUserInfoApp != 'true'){
  if(uuid) {
    var broswerInfo = navigator.userAgent; 
    if(broswerInfo.indexOf("APP_WISHROOM_Android")>-1){
      var tokenid = window.native.getToken(uuid)
      updateUserToken(uuid, tokenid, 1)
    }else if(broswerInfo.indexOf("APP_WISHROOM_iOS")>-1){
      webkit.messageHandlers.getToken.postMessage(uuid);
      
    }else{
//				console.log("pc 입니다.")
      localStorage.sendUserInfoApp = 'true';
    }
  }
//	}
}

//아이폰 콜백 
function sendToken(uid, token){
updateUserToken(uid, token, 2)
}
//app 토근 설정 
function updateUserToken(_userUid, _tokenid, _os_type){
var request = {
    uuid: _userUid,
    tokenkey: _tokenid,
    ostype: _os_type
}
comAjax.requestAsyncJson("put", "/common/service/config" , JSON.stringify(request), "json", function(data){
//		console.log(data)
})

localStorage.sendUserInfoApp = true;
}

isDev = true

if(!isDev){
var broswerInfo = navigator.userAgent; 
if(!(broswerInfo.indexOf("APP_WISHROOM_Android")>-1 || broswerInfo.indexOf("APP_WISHROOM_iOS")>-1)){
  location.replace('http://google.com')	
}	
}
function decodeHTMLEntities (str) {
if(str !== undefined && str !== null && str !== '') {
    str = String(str);

      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      var element = document.createElement('div');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
}
return str;
}

const G_AUTHID ={
"ALLDAY":{
  "CAREGIVER": 11,
  "SOCIAL_WORKER": 8,
  "NURSE": 9	
},
"VISIT":{
  "CAREGIVER": 11,
  "SOCIAL_WORKER": 8,
  "NURSE": 9
}

}
const G_STATUS ={
"SUCCESS":200,
"ERROR": 400
}


/* 로딩화면 */
let timeInterval;
function LoadingWithMask() {
  //화면의 높이와 너비를 구합니다.
  var maskHeight = '100vh';
  var maskWidth  = '100%';
   
  //화면에 출력할 마스크를 설정해줍니다.
var loadingImg = `	 <div id='mask'>
            <div class="sk-three-bounce loading-bounce-wrap">
                <div class="sk-bounce-1 sk-child"></div>
                <div class="sk-bounce-2 sk-child"></div>
                <div class="sk-bounce-3 sk-child"></div>
                <div class="sk-bounce-4 sk-child"></div>
              </div>
           </div>`;  
clearInterval(timeInterval);
  timeInterval = setTimeout(function(){
  $('body').append(loadingImg);
},500);
  
  //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
  $('#mask').css({
          'width' : maskWidth
          , 'height': maskHeight
  }); 

  //마스크 표시
  $('#mask').show();   

  //로딩중 이미지 표시
  $('#loadingImg').show();
  //scroll막기
  $('body').addClass('not_scroll_loading');
}

function closeLoadingWithMask() {
  $('#mask, #loadingImg').hide();
  $('#mask, #loadingImg').remove();  
  $('body').removeClass('not_scroll_loading');
}

function calliphone(phoneno){

if(!phoneno){
  modal.showAlertModal('done',{ title: '등록된 번호가 없습니다.', btn: '확인' },function(){})
  return;
}

var broswerInfo = navigator.userAgent;
 
if(broswerInfo.indexOf("APP_WISHROOM_Android")>-1){
  location.href='tel:'+phoneno;
}else if(broswerInfo.indexOf("APP_WISHROOM_iOS")>-1){
  webkit.messageHandlers.phonecall.postMessage(phoneno);
}else{
  location.href='tel:'+phoneno;
}
}

//(+) 시간 input 시간 제한 
function useableTimeOnKeyup () {
// version +2
if ( this.value.length < 2 ) return;	
var val = parseInt(this.value); // get value (number)
var currentIndex = $(this).index();
var nextIndex = 0;

if ( currentIndex == 0 || currentIndex == 4 ) {
  // time : hour	
  var maxVal = 25;
  if ( val >= maxVal ) 
    this.value= String(maxVal-1); // change : 24			
      
  if ( currentIndex == 0 ) nextIndex = 1; // start hour -> start min	
  else nextIndex = 3; // end hour -> end min
}
else if ( currentIndex == 2 || currentIndex == 6 ) {
  // time : min
  var maxVal = 60;
  if ( val >= maxVal ) 
    this.value= String(maxVal-1); // change : 59
    
  if ( currentIndex == 2 ) nextIndex = 2; // start hour -> start min
}
}

var getURLParameters = function(url) {
  var result = {};
  var searchIndex = url.indexOf("?");
  
  if (searchIndex == -1 ) return result;
      var sPageURL = url.substring(searchIndex +1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {       
          var sParameterName = sURLVariables[i].split('=');      
          result[sParameterName[0]] = sParameterName[1];
      }
      return result;
};

//저장/수정시 loadingButton
function loadButton(this_) {
this_.html('');
this_.addClass('loading_btn');
this_.prop('disabled', true);
}

let TEXT_MESSAGE = {
SAVE : '등록되었습니다. <br/>등록된 내용은 관리자 페이지에서도<br/> 확인 가능합니다.' ,
UPD: '수정되었습니다.' 
}

function decodeEntities(encodedString) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = encodedString;
  return textArea.value;
}