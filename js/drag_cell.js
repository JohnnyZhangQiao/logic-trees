    /*-----------------拖拽状态框-----------------*/
    var dragObj = null; //存入拖拽目标对象
    var domX,domY; //元素原始坐标
    var line,lineInfo; //该计算单元连线信息
    $('#svgPanel').on('mousedown', '.cell', function(e){
        dragObj = this; //赋值拖拽对象
        lock.setOption('drag');
        domX = e.clientX-this.transform.animVal[0].matrix.e;
        domY = e.clientY-this.transform.animVal[0].matrix.f;
        line = dragObj.getElementsByTagName("circle");
        lineInfo = [];
        for (var i = 0; i < line.length; i++) {
            if (line[i].getAttribute('data-link') != '') {
                var temp = document.getElementById(line[i].getAttribute('data-link'));
                if (line[i].getAttribute('data-type') == 'in') {
                    lineInfo.push(
                        [line[i].getAttribute('data-link'),
                        this.getBoundingClientRect().left,
                        this.getBoundingClientRect().top,
                        document.getElementById(temp.getAttribute('data-link-out')).getBoundingClientRect().left+5,     
                        document.getElementById(temp.getAttribute('data-link-out')).getBoundingClientRect().top+5,
                        document.getElementById(temp.getAttribute('data-link-in')).transform.animVal[0].matrix.e,
                        0]);
                }
                else {
                    lineInfo.push(
                        [line[i].getAttribute('data-link'),
                        this.getBoundingClientRect().left,
                        this.getBoundingClientRect().top,
                        document.getElementById(temp.getAttribute('data-link-in')).getBoundingClientRect().left+5,      
                        document.getElementById(temp.getAttribute('data-link-in')).getBoundingClientRect().top+5,
                        document.getElementById(temp.getAttribute('data-link-out')).transform.animVal[0].matrix.e,
                        40]);
                }

            }
        }
    });
    $('#svgPanel').on('mousemove', function(e){
        if (dragObj && lock.drag) {
            x = e.clientX-domX;
            y = e.clientY-domY;
            dragObj.setAttribute('transform', 'translate('+x+','+y+')');

            //该计算单元连线移动
            for (var i = 0; i < lineInfo.length; i++) {
                drawLine(lineInfo[i][0],x+lineInfo[i][5],y+lineInfo[i][6],lineInfo[i][3],lineInfo[i][4]);
            }
        }
    });
    $('#svgPanel').on('mouseup', '.cell', function(){
        dragObj = null; //清除拖拽对象
        lock.clearOption();
    });
    /*-----------------拖拽状态框 end-----------------*/
