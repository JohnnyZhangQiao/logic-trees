
    /*-----------------修改计算单元名称-----------------*/
    var renameID; //保存要修改的逻辑单元id
    $('#svgPanel').on('click', '.cell-opera-text', function(){
        if (lock.rename) {
            lock.setOption('rename');
            renameID = $(this).siblings('.cell-text').attr('id');
            document.getElementById('alert-box-input').value = $(this).siblings('.cell-text').text();
            document.getElementById('alert-bgn').style.display = 'block';
        }
    });
    $('#alert-box-confirm').on('click', function(){
        var renameVal = document.getElementById('alert-box-input').value;
        if (renameVal) {
            document.getElementById(renameID).innerHTML = renameVal;
            document.getElementById('alert-bgn').style.display = 'none';
            lock.clearOption();
        }
        else{
            alert('名称不能为空');
        }
    });
    $('#alert-box-cancel').on('click', function(){
        document.getElementById('alert-bgn').style.display = 'none';
        lock.clearOption();
    });
    /*-----------------修改计算单元名称 end-----------------*/
