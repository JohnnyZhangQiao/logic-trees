//全局功能锁对象，需要锁定的操作都应该在这里添加
//true：当前功能可用
//false：当前功能禁用
function Lock(){
    this.createCell = true; //创建计算单元
    this.drag = true; //拖拽计算单元
    this.createLine = true; //建立连线关系
    this.rename = true; //修改逻辑单元名称
};
//设置只有某一功能可用
Lock.prototype.setOption = function(op) {
    for(var i in this) {
        if (typeof(this[i]) == 'boolean') {
            this[i] = false;
        }
    }
    this[op] = true;
};
//检测当前系统是否被某功能占用
Lock.prototype.checkSys = function() {
    for(var i in this) {
        if (typeof(this[i]) == false) {
            return false;
        }
    }
    return true;
};
//清除功能限制
Lock.prototype.clearOption = function() {
    for(var i in this) {
        if (typeof(this[i]) == 'boolean') {
            this[i] = true;
        }
    }
};
var lock = new Lock(); //创建实例

window.onload = function() {
    $(window).on('mouseup', function(e){
        if (lineObj && lock.createLine) {
            var tag= window.event?window.event.srcElement:e.target; //获取鼠标位置的元素
            if (tag.tagName != 'circle') { //鼠标处不为连接点
                deleteLinePoint(lineID);
            }
            event.stopPropagation(); //阻止事件冒泡
            lineObj = null;
            lock.clearOption();
        }
    });
};

//创建svg path对象
function createSvgPath() {
    if(!document.createElementNS) 
        return null;//过滤IE8
    else {
        var svg = document.createElementNS('http://www.w3.org/2000/svg','path');
        svg.setAttribute('id', Math.random().toString(36).substr(2,6));
        svg.setAttribute('class', 'connection');
        svg.setAttribute('data-link-in', '');
        svg.setAttribute('data-link-out', '');
        $('#svgPanel').prepend(svg);
        return svg.id;
    }
};
//绘制连线
function drawLine(id,x1,y1,x2,y2) {
    if (document.getElementById(id)) {
        document.getElementById(id).setAttribute('d', 
                'M '+x1+' '+y1
                +' C '+x1+' '+((y2-y1)/2+y1)
                +' '+x2+' '+((y2-y1)/2+y1)
                +' '+x2+' '+y2);
    }
};
//判断线两端的连接点属性，同为输出点或同为输入点返回false，不同属性返回true
//输入：连线id
function checkLinePoint(lineID) {
    var point1 = document.getElementById(lineID).getAttribute('data-link-in') || '';
    var point2 = document.getElementById(lineID).getAttribute('data-link-out') || '';
    if (point1 != '' && point2 != '') {
        if (document.getElementById(point1).getAttribute('data-type') !=
            document.getElementById(point2).getAttribute('data-type')) {
            return true;
        } else{
            return false;
        }
    } else{
        return false;
    }
};
//删除连线
function deleteLinePoint(lineID) {
    try {
        document.getElementById($('#'+lineID).attr('data-link-in')).setAttribute('data-link', '');
    } catch(err) {}
    try {                   
        document.getElementById($('#'+lineID).attr('data-link-out')).setAttribute('data-link', '');
    } catch(err) {}
    $('#'+lineID).remove();
};