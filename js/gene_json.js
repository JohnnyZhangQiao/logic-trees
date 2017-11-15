/*-----------------生存json数据-----------------*/
//input:指定面板的id号
//input:指定面板的下面的所有组件json数据
/* json格式说明：
{
    "cell":{  <--计算单元集合
        "0":{
            "cellID":"计算单元ID",
            "name":"计算单元名称",
            "position":"计算单元位置坐标",
            "portInfo":{  <--计算单元入/出口点集合
                "0":{
                    "portID":"入/出口ID",
                    "portType":"入/出口标识 in：输入  out：输出",
                    "portSite":"入/出口位置坐标",
                    "portLink":"被占用连线ID"
                }
            }
        }
    },
    "line":{  <--连线集合
        "0":{
            "lineID":"连线ID",
            "linkIn":"连线输入点ID 联系上面的‘portID’",
            "linkOut":"连线输出点ID 联系上面的‘portID’",
            "shape":"连线形状"
        }
    }
}*/
function geneJson(svgID) {
    var json = {cell:{},line:{}};
    var index = 0;
    $('#'+svgID).find('.cell').each(function(){
        var port_info = {};
        var index2 = 0;
        $(this).find('.option-port').each(function(){
            port_info[index2] = {
                            portID:$(this).attr('id'),
                            portType:$(this).attr('data-type'),
                            portSite:$(this).attr('transform'),
                            portLink:$(this).attr('data-link')
                        }
            index2 += 1;
        });

        json.cell[index] = {
                                cellID:$(this).attr('id'),
                                name:$(this).find('.cell-text').text(),
                                position:$(this).attr('transform'),
                                portInfo:port_info
                            }
        index += 1;
    });

    index = 0;
    $('#'+svgID).find('.connection').each(function(){
        json.line[index] = {
                                lineID:$(this).attr('id'),
                                linkIn:$(this).attr('data-link-in'),
                                linkOut:$(this).attr('data-link-out'),
                                shape:$(this).attr('d')
                            }
        index += 1;
    });
    console.log(JSON.stringify(json));
    alert('生成成功！请在调试台查看json数据');
};
/*-----------------生存json数据 end-----------------*/
