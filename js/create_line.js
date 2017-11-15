    /*-----------------建立连线-----------------*/
    var lineObj = null; //存入连线对象起点
    var lineX,lineY; //连线对象起点坐标
    var lineID; //获取创建连线的id
    $('body').on('mousedown', 'circle[data-type=in],circle[data-type=out]', function(){
        lineObj = this; //选取线条
        lock.setOption('createLine');
        if (this.getAttribute('data-link') == '') { //连接点无其他链接
            lineID = createSvgPath(); //获取创建连线的id号
            lineX = this.getBoundingClientRect().left+10;
            lineY = this.getBoundingClientRect().top+10;
            this.setAttribute('data-link',lineID);
            if (this.getAttribute('data-type') == 'in') { //输入点
                document.getElementById(lineID).setAttribute('data-link-in',lineObj.id);
            } else{ //输出点
                document.getElementById(lineID).setAttribute('data-link-out',lineObj.id);
            }
        }
        else { //连接点有其他链接
            lineID = this.getAttribute('data-link');
            var temp;
            if (this.getAttribute('data-type') == 'in') { //输入点
                document.getElementById(lineID).setAttribute('data-link-in', '');
                temp = document.getElementById(lineID).getAttribute('data-link-out');
            } else{ //输出点
                document.getElementById(lineID).setAttribute('data-link-out', '');
                temp = document.getElementById(lineID).getAttribute('data-link-in');
            }
            lineX = document.getElementById(temp).getBoundingClientRect().left+5;
            lineY = document.getElementById(temp).getBoundingClientRect().top+5;
            this.setAttribute('data-link','');
        }
        event.stopPropagation(); //阻止事件冒泡
    });
    $(window).on('mousemove', function(e){
        if (lineObj && lock.createLine) {
            drawLine(lineID,lineX,lineY,e.clientX+2.5,e.clientY+2.5);
        }
        event.stopPropagation(); //阻止事件冒泡
    });
    $('body').on('mouseup', 'circle[data-type=in],circle[data-type=out]', function(e){
        if (lineObj && lock.createLine) {
            if (this.getAttribute('data-link') == '' && lineObj) { //连接点没有连线
                if (this.getAttribute('data-type') == 'in') { //输入点
                    if (document.getElementById(lineID).getAttribute('data-link-in') == '') {
                        document.getElementById(lineID).setAttribute('data-link-in',this.id);
                        this.setAttribute('data-link', lineID); //绑定连线id
                    }
                } else{ //输出点
                    if (document.getElementById(lineID).getAttribute('data-link-out') == '') {
                        document.getElementById(lineID).setAttribute('data-link-out',this.id);
                        this.setAttribute('data-link', lineID); //绑定连线id
                    }
                }
                if(!checkLinePoint(lineID)) { //检查连线是否合法
                    deleteLinePoint(lineID);
                }
            } else{ //创建连线失败
                deleteLinePoint(lineID);
            }
            event.stopPropagation(); //阻止事件冒泡
            lineObj = null;
            lock.clearOption();
        }
    });
    /*-----------------建立连线 end-----------------*/
