//完美运动框架
 //完善的运动框架
//获取css属性
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        //针对IE8获取元素某项css属性
        return obj.currentStyle[attr];
    } else {
        //针对其他浏览器，false为伪类选项
        return getComputedStyle(obj, false)[attr];
    }
}
 
//若传入fn(用于函数回调)执行链式运动
//startMove(obj,{attr1,iTarget1,attr2,iTarget2}, fn)
function startMove(obj, json, fn) {
 
    clearInterval(obj.timer);
 
    obj.timer = setInterval(function() {
        var flag = true; //每次循环初始化flag值,否则flag无法为true，定时器无法真正结束
        //for()in遍历循环,将json中以attr属性循环，json[attr]为它的对应值
        for (var attr in json) {
            //1.取当前值
            var iCur = 0;//初始化
            if (attr == 'opacity') {
                iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
 
            //2.算速度
            var speed = (json[attr] - iCur) / 5;
            //speed类整数变量需要判断取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
 
            //3.检测停止
            //只要有一个运动目标没有完成，则flag为false，未完成运动继续执行
            //已达到的运动目标会因为speed最终等于0而“停止”，没有实际停止定时器
            if (iCur != json[attr]) {
                flag = false;
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + speed) + ')';
                obj.style.opacity = (iCur + speed) / 100;
            } else {
                //用style[]追加变量，因为attr传入的是字符所以不能用style.xxx
                obj.style[attr] = iCur + speed + 'px';
            }
        }
        //如果flag成立，即所有运动目标完成，则停止定时器，判断是否有回调函数存在
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                //为了不让fn()在回调时指向window，用call()改变this指向
                //var that=this也可以
                fn();
            }
        }
    }, 30)//时间间隔,变更达到增减动画速度
}