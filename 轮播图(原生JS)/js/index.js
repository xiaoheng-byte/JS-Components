window.addEventListener('load',function(){
    //获取dom元素
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
    var focus = document.querySelector('.focus')
    var w = focus.offsetWidth;  //图片宽度
    //鼠标经过显示
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(timer);
        timer = null;
    })
    //鼠标离开隐藏
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        timer = setInterval(function(){
            arrow_r.click()
        },2000)
    })
    //根据图片数量生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for(let i = 0; i < ul.children.length; i++){
        var li = document.createElement('li');
        li.setAttribute('index', i)
        ol.appendChild(li);
        //点击小圆圈跳转到相应图片
        li.addEventListener('click',function(){
            for(let i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index')
            num = index
            c = index
            animate(ul,-w*index)
        })
    }
    //为了切换效果流畅，克隆第一张图到最后
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first)

    var num = 0;
    var c = 0;
    var flag = true;
    //点击右侧箭头移动
    arrow_r.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(num == ul.children.length-1){
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul,-num*w,function(){
                flag = true;
            })
            c++;
            if(c == ol.children.length)   c = 0;
            handleChange()
        }   
    })
    //点击左侧箭头移动
    arrow_l.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(num == 0){
                num = ul.children.length-1;
                ul.style.left = -num*w + 'px';
                
            }
            num--;
            animate(ul,-num*w,function(){
                flag = true;
            })
            c--;
            if(c < 0)   c = ol.children.length-1;
            handleChange()
        }
        
    })
    //同步小圆点的变化
    function handleChange(){
        for(let i = 0; i < ol.children.length; i++){
            ol.children[i].className = '';
        }
        ol.children[c].className = 'current';
    }
    //模拟点击，自动播放
    var timer = setInterval(function(){
        arrow_r.click()
    },2000)
})