/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {
};
var addbtn = document.getElementById('add-btn');
var city = document.getElementById('aqi-city-input');
var valuein = document.getElementById('aqi-value-input');
var info = document.getElementById('info');
var aqitable = document.getElementById('aqi-table');

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

	if( !isNaN(city.value) || isNaN(valuein.value)) { 
		info.innerHTML = '请输入正确的数据';
		return;
	} else {
		info.innerHTML = '';
	};
	aqiData[city.value] = Number(valuein.value);
	city.value = '';
	valuein.value = '';
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var tr = aqitable.getElementsByTagName('tr');
	var dataindex = 0;
	aqitable.innerHTML = '';
	if(aqitable !== {} && tr.length == 0) {
			var atr = document.createElement('tr');
			aqitable.appendChild(atr);
			atr.innerHTML = '<td>城市</td><td>空气质量</td><td>操作</td>';			
		}
	for (var index in aqiData) {
			var atr1 = document.createElement('tr');			
			atr1.innerHTML = '<td>'+index+'</td><td>'+aqiData[index]+'</td>';
			var abtn = document.createElement('button');
			var abtnval = document.createTextNode('删除');
			abtn.appendChild(abtnval);
			addEvent(abtn, 'click', delBtnHandle);			
			atr1.appendChild(abtn);		
			aqitable.appendChild(atr1);	
			dataindex++;
	}
}
 
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}
// 添加事件，兼容ie
function addEvent(eventowner,eventtype,eventname) {
	if(window.addEventListener){
		eventowner.addEventListener(eventtype, eventname, false);
	}else {
		eventowner.attachEvent('on'+eventtype, eventname);
	}
}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
	var event = event || window.event;
 	var bt = event.target;
   	var cityselect = bt.parentNode.childNodes[0].innerHTML;
   	delete aqiData[cityselect];
 	renderAqiList();
}
 

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	addEvent(addbtn, 'click', addBtnHandle)
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  // 方法1.可以在创建button时给其绑定点击事件。
  // 方法2.给table绑定点击事件（事件冒泡）。获取事件目标button，该方法性能更佳
 }

init();