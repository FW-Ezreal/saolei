var cellRow = 6;
var cellDown= 6;
var booms = 6;
function clickCell(r, d){
	if(r<0||d<0||r>=cellRow||d>=cellDown){
		return
	}
	var i = r*cellRow + d;
	// console.log(r,d)
	$(".cell:eq("+ i +")").click();
}

function render(){
	var html = "";
	var sum = cellRow*cellDown;
	var arr = [];
	for(var i = 0; i < cellRow; i++){
		var otd = "";
		for(var j = 0; j < cellDown; j++){
			otd += '<td class="cell close no-main" data-r='+ i + ' data-d=' + j + '><span></span></td>'
		}
		html += '<tr>' + otd + '</tr>';
	}
	$("tbody").html(html);
	function addNum(r, d){
		if(r<0||d<0||r>=cellRow||d>=cellDown){
			return
		}
		var i = r*cellRow + d;
		var $num = $(".cell:eq("+ i +").no-main").children();
		if($num.length > 0){
			console.log(typeof($num.text()))
			var num = + $num.text();
			console.log(num)
			
			$num.text(++num);
		}
	}
	for(var i = 0; i < booms; i++){
		var j = Math.floor(Math.random()*100000)%(sum-i);
		if(arr.indexOf(j) == -1){
			arr.push(j);	
			$cell = $(".cell").eq(j).removeClass('no-main').addClass('main');
			$cell.children().text('');
			var ri = +$cell.attr("data-r");
			var di = +$cell.attr("data-d");
			addNum(ri+1, di+1);
			addNum(ri+1, di);
			addNum(ri+1, di-1);
			addNum(ri, di+1);
			addNum(ri, di-1);
			addNum(ri-1, di+1);
			addNum(ri-1, di);
			addNum(ri-1, di-1);
		}else{
			i --;
		}
	}
	console.log(arr)
}


render();
$("input").on("click",function(e){
	// console.log(e.currentTarget.value)
	cellDown = e.currentTarget.value;
	cellRow = e.currentTarget.value;
	booms = e.currentTarget.value;
	render()
})
$(".restart").on('click',function(){
	render();
	$("body").addClass("control")
	$("#win").hide();
	$("#lost").hide();
	

})
$(document).on('click', '.control .cell.close', function(e){
	var $cell = $(this);
	$cell.removeClass("close");
	if($cell.hasClass("main")){
		$("body").removeClass("control");
		$("input").off("click");
		$("#lost").show();
		setTimeout(function(){
			$(".cell.close").removeClass("close")
		},800)
	}else if($cell.children().text() == ""){
		// console.log(11)
		var ri = +$cell.attr('data-r');
		var di = +$cell.attr('data-d');
		clickCell(ri - 1, di - 1);
		clickCell(ri - 1, di);
		clickCell(ri - 1, di + 1);
		clickCell(ri, di - 1);
		clickCell(ri, di + 1);
		clickCell(ri + 1, di - 1);
		clickCell(ri + 1, di);
		clickCell(ri + 1, di + 1);
	}
}).on("mousedown", ".control .cell.close",function(e){
	if(e.which == 3){
		$(this).toggleClass('flag');
		if($('.main.flag').length == booms){
			$("body").removeClass("control");
			$("#win").show();
		}
	}
})
$(window).on("contextmenu",function(e){
	e.preventDefault();
})




