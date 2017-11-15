
    /*-----------------创建计算单元-----------------*/
    var createObj = null;
    $('.demo').on('mousedown', function(e){
        lock.setOption('createCell');
        $('#create_bgn').show();
        $('#create_bgn').html(cellJson[this.id].html);
        createObj = document.getElementById('create_bgn').firstChild;
        createObj.setAttribute('transform', 'translate('+(e.clientX-110)+','+(e.clientY-20)+')');
    });
    $('#create_bgn').on('mousemove', function(e){
        if (createObj && lock.createCell) {
            createObj.setAttribute('transform', 'translate('+(e.clientX-110)+','+(e.clientY-20)+')');
        }
    });
    $('#create_bgn').on('mouseup', function(e){
        createObj.getElementsByTagName('text')[0].setAttribute('id', Math.random().toString(36).substr(2,6));
        //为所有连接点赋予id
        var portList = createObj.getElementsByTagName('circle');
        for (var i = 0; i < portList.length; i++) {
            portList[i].setAttribute('id', Math.random().toString(36).substr(2,6));
        };
        document.getElementById('svgPanel').appendChild(createObj);
        createObj = null;
        lock.clearOption();
        this.style.display = 'none';
    });
    /*-----------------创建计算单元 end-----------------*/
