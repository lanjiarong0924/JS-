 //获取样式

 //不完善
 function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];  // if IE
    }else{
        return getComputedStyle(obj,false)[attr]; //if FireFox
    }
}
// startMove(obj,{attr1:itarget1,attr2:itarget2})
function startMove(obj,attr,iTarget,fn){
    clearInterval(obj.timer);
    
    obj.timer = setInterval(function(){
      
        //1.获取当前值
        var icur = 0;
        if(attr == 'opacity'){
            icur = Math.round(parseFloat(getStyle(obj,attr))*100);
        }else{
            icur = parseInt(getStyle(obj,attr));
        }

        //2.算速度
        var speed = (iTarget-icur)/8;
        speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);

        //3检测停止
        if(icur == iTarget){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
           
        }else{
            if(attr == 'opacity'){
                obj.style.filter = 'alpha(opacity:' + icur+speed + ')';
                obj.style.opacity = (icur+speed)/100;
            }
            else{
            obj.style[attr] = icur + speed +"px";
            }
        }
    
    },30);
    
}