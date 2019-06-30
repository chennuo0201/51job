function getNode(node){
    return document.querySelector(node);
}
let xiala = getNode('.xiala');
let jian = getNode('.jian');
let navRight = getNode('.navRight');
let con = getNode('.con');
let more = getNode('.more');
let liebiao = getNode('.liebiao');
let mainItem = getNode('.mainItem')
// console.log(more);

//设置class   传的形参是class就取节点赋值navItem
function setClass(className,value){
    className[0] == '.' ? getNode(className).className = value : className.className = value;
}
//增加class
function addClass(className,value){
    className[0] == '.' ? getNode(className).classList.add(value) : className.classList.add(value);
}
xiala.onclick = function(e){
    if(e.target.className == 'xialaItem'){
        [jian.innerText,e.target.innerText]=[e.target.innerText,jian.innerText]
    }
}
navRight.onclick = function(e){
    if(e.target.className == 'navItem'){
        getNode('.borders') && setClass('.borders','navItem');
        // getNode('.borders').className = 'navItem';
        e.target && addClass(e.target,'borders');
    }
}
con.onclick = function(e){
    if(e.target.className == 'kaung' || e.target.className == 'kaung navActive'){
        // console.log(e.target.className)
     e.target.className == 'kaung navActive' ? e.target.classList.remove('navActive') : e.target.classList.add('navActive');
    }
}
more.onclick = function(e){
    let event = e.target;
    // console.log(childs)
    if(event.className == 'duoxuan'){
        let childs = event.parentNode.previousElementSibling.querySelectorAll('.kaung');
        for(let i of childs){
        i.style.display = 'block';
       }
       getNode('.con').classList.add('conditionmax');
       getNode('.duoxuan').classList.add('cleanduoxuan');
    }else if(event.className == 'duoxuan cleanduoxuan'){
        let childs = event.parentNode.previousElementSibling.querySelectorAll('.kaung');
        for(let i of childs){
            i.style.display = 'none';
           }
        getNode('.con').classList.remove('conditionmax');
        getNode('.duoxuan').classList.remove('cleanduoxuan'); 
    }
    if(event.className == 'gengduo'){
        getNode('.con').classList.add('conditionmax');
        getNode('.gengduo').classList.add('gen');
    }else if(event.className == 'gengduo gen'){
        getNode('.con').classList.remove('conditionmax');
        getNode('.gengduo').classList.remove('gen');
    }

}
  
let houduanindex = 1;    //取后端第一页的数据
let index = 1;          //当前的页码
let pageSize = 20;      //每一页的最多数据量
let lengths = 0;
let allpage = 0;
let allLists = [];
let list = [];
let zonglength = 0;
let yema = getNode('.yema')
let real = getNode('.real');
let jia = getNode('.jia');
let searchInput = getNode('.searchInput input');
let btnSearch = getNode('.btnSearch');
let yemaxiabiao = getNode('.yemaxiabiao');
let yemanum = getNode('.yemanum');
let search = getNode('.seclet input')
let num = 0;
// 获取index页数据
function getData(index,call){
    Ajax.post('http://106.14.212.56:8080/happy/query/',
    JSON.stringify({
        db:'cn',
        table:'product',
        jsonMessage:{},
        fenye:index,
        pagesize:505,
    
    }),'',function (res) {
        // try {
            // res = JSON.parse(res)
            if(res.code == 202){
                // 拿到数据
                call(res.data.Data)
                // console.log(res,'fff')
                zonglength = res.data.zonglength;
                getNode('.zhiweinum').innerText = `共${res.data.zonglength}条职位`;
                getNode('.allpage').innerText = Math.ceil(res.data.zonglength/pageSize)
                allpage = Math.ceil(zonglength/pageSize);
            }else{
                getNode('.allpage').innerText = Math.ceil(res.data.zonglength/pageSize);
                console.log(res)
            }
            
        // } catch (e) {
        //     alert('网络出差了')
        // }
        //  call(res.data)
    })
}
//将数据写上网页
function setHtml(start,end){
    mainItem.innerHTML='';
    for(let i = start;i < end ;i++){
        // console.log(end , i , 'err')
        mainItem.innerHTML+=`
        <div class="main_content">
            <div class="kuang"></div>
            <div class="job xiang zhi">${list[i].title}</div>
            <div class="company xiang">${list[i].company}</div>
            <div class="address xiang">${list[i].address}</div>
            <div class="price xiang">${list[i].price}</div>
            <div class="date xiang">${timeFormat(list[i].time)}</div>
        </div>
        `
    }
}
function setIndex(index){
    getNode('.index').innerText = index;  
}
//获取起始页码和终止页码的索引
function startEnd(index){
    // console.log(index)
    let start = (index-1) * pageSize;
    let end = index*pageSize > lengths ? lengths : index*pageSize;
    // console.log(start,end)
    setHtml(start,end)
    // console.log(start,end,'jjj')

}
//获取数据
getData(houduanindex,function(lists){
    list = list.concat(lists);
    lengths = list.length;
    allLists = list.slice();
    startEnd(index)
})

//时间戳转时间
function timeFormat(timeStr){
    try {
        timeStr = parseInt(timeStr)
    } catch (e) {
        
    }
    let time = new Date(timeStr);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return `${y}/${m}/${d} ${h}:${mm}:${s}`.split(' ')[0];
}
// console.log(timeFormat('1516546545122'))

//设置页码

//点击翻页
yema.onclick = function(e){
    let event = e.target;
 if(event.className == 'jia' && index < Math.ceil(zonglength/pageSize)){
    index++;
 }else if(event.className == 'real' && index > 1){
    index--;
 }
//  if(index > lengths/pageSize-1){
//     houduanindex++;
//     getData(houduanindex,function(lists){
//         // list = list.concat(lists);
//         // console.log(list,'chula')
//     })
//  }
 setIndex(index)
 startEnd(index)
}

//在所有的数据列表中匹配有关键字searchInput.value的
function checkName(name){
    let newList = [];
    if(name){
    allLists.forEach(function(item,index){
            if(item.title.indexOf(name) != -1){
                newList.push(item)
            }
        })
        return newList;
    }else{
        return allLists;
    }
}

btnSearch.onclick = function(e){
    let name = searchInput.value;
    list = checkName(name);
    shujuinit(list);
}


//将新获取的数据初始化
function shujuinit(lists){
    zonglength = lists.length;
    lengths = zonglength;
    index = 1;
    setIndex(index);
    startEnd(index);
    getNode('.zhiweinum').innerText = `共有${zonglength}条数据`;
    getNode('.allpage').innerText = Math.ceil(zonglength/pageSize);
}


//设置页码的下标
function setyemaHtml(start,end){
    console.log(start,end)
    yemanum.innerHTML = '';
    for(let i = start;i < end;i++){
        yemanum.innerHTML+=`
        <div class="yemanumItem" name="item${i}">${i}</div>
        `
    }
    console.log(index)
    getNode(`div[name="item${index}"]`).classList.add('active')
    // getNode(`div[name="item${num}"]`).classList.add('.active')
}

setyamaIndex(index);
//取得当前页的上下标
function setyamaIndex(index){
    let start;
    let end;
    if(index <= 2){
        start = 1;
        end = 6;
    }else if(index >= Math.ceil(zonglength/pageSize)-2){
        start = Math.ceil(zonglength/pageSize)-4;
        end = Math.ceil(zonglength/pageSize)+1;
    }else{
        start = parseInt(index)-2;
        end = parseInt(index)+3;
    }
    // console.log(start,end,index)
    setIndex(index)
    startEnd(index)
    setyemaHtml(start,end);    
}




yemaxiabiao.onclick = function(e){
    let event = e.target;
    if(event.className == 'yemanumItem'){
        let yy = parseInt(event.innerText.trim());
        index = yy;
        setyamaIndex(index);
    }
    if(event.className == 'tiao'){
        index = search.value;
        setyamaIndex(index);
    }
    if(event.className == 'add' && index < Math.ceil(zonglength/pageSize)){
        index++;
        setyamaIndex(index)
        // if(index > 3){
        // setyemaIndex(index)
        // }
    }else if(event.className == 'reduce' && index > 1){
        index--;
        setyamaIndex(index)
    }
}

//根据索引跳转界面
// window.onload = function() {
//     window.onmousewheel = document.onmousewheel=function(){
//         return false;
//         }
//     }
 
let seaRch = getNode('.content-search')
let hangye = getNode('.hangye')
let zhineng = getNode('.zhineng')
let motai = getNode('.motai')
let Address = document.querySelectorAll('.Address');
let allcity = document.querySelectorAll('.era');
let allCity = [];
let city = getNode('.city')
// for(let i of allcity){
//     allCity.push(allcity.innerText)
// }
// console.log(allcity,'kkk')
function clearmotai(){
    for(let i of Address){
        i.style.display = 'none';
    }
}
function dismotai(){
    getNode('.motai').style.display = 'block';
}
function disnonemotai(){
    getNode('.motai').style.display = 'none';
}
function disNode(node){
    getNode(node).style.display = 'block'; 
}
seaRch.onclick = function(e){
    let event = e.target;
    if(event.className == 'contentItem-cnt addre'){
        dismotai();
        disNode('.diZhi');
    }
    if(event.className == 'contentItem-cnt hanye'){
        dismotai();
        // clearmotai();
        disNode('.hangYe');
    }
    if(event.className == 'contentItem-cnt zhnen'){
        dismotai();
        // clearmotai();
        disNode('.zhiNeng');
    }
}

// //设置点击的城市到Html上
// function setcityHtml(){
//     city.innerHTML = `
//         <div class="cityItem">
//             <div class="cityName">北京</div>
//             <span class="guanBi">×</span>
//         </div>
//     `
// }

motai.onclick = function(e){
    let event = e.target;
    if(event.className == 'cha' || event.className == 'cancle'){
        clearmotai();
        disnonemotai();
    }
    if(event.className = era){
        event.classList.add('bei');
    }
    if(event.className == 'guanBi'){
       getNode('.cityItem').style.display = 'none'
       getNode('.bei').classList.remove('bei')
    }
}




















//dianji



  
//   function loadXMLDoc()
//   {
//   var xmlhttp;
//   if (window.XMLHttpRequest)
//     {
//     xmlhttp=new XMLHttpRequest();
//     }
//   else
//     {
//     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//     }
//   xmlhttp.onreadystatechange=function()
//     {
//     if (xmlhttp.readyState==4 && xmlhttp.status==200)
//       {
        
//      let lists=JSON.parse(xmlhttp.responseText);
//         // console.log(lists.data)
//         for(let i in lists.data){
//             arr.push(lists.data[i]);
//             mainItem.innerHTML+=`
//                 <div class="main_content">
//                     <div class="kuang"></div>
//                     <div class="job xiang zhi">${lists.data[i].title}</div>
//                     <div class="company xiang">${lists.data[i].company}</div>
//                     <div class="address xiang">${lists.data[i].address}</div>
//                     <div class="price xiang">${lists.data[i].price}</div>
//                     <div class="date xiang">${lists.data[i].time}</div>
//                 </div>
//             `
//         }
//       }
//     }
//   xmlhttp.open("GET","http://106.14.212.56:8080/happy/queryTable?db=cn&table=product",true);
//   xmlhttp.send();
//   }
//     loadXMLDoc()
// let lists=[];
//     Ajax.post('http://106.14.212.56:8080/happy/query/',JSON.stringify({
//         db:'cn',
//         table:'product',
//         jsonMessage:{},
//         fenye:1,
//         pagesize:100,
        
//     }),'',function (res) {
//          lists = JSON.parse(res)
//         console.log(lists)
//     })
//     // for(let i in [1,2]){
//     //     console.log(i,mainItem)
//     //     mainItem.innerHTML+=`
//     //     <div class="main_content">
//     //         <div class="kuang"></div>
//     //         <div class="job xiang zhi">web前端开发工程师</div>
//     //         <div class="company xiang">普华永道</div>
//     //         <div class="address xiang">上海-浦东新区</div>
//     //         <div class="price xiang">25000</div>
//     //         <div class="date xiang">15646465454</div>
//     //     </div>
//     //     `
//     // }
//     let index = 1;
//     let pageSize = 20;
//     let length = lists.length;
//     let allpage = Math.ceil(length/pageSize);
//     let yema = getNode('.yema');


//     function setHtml(start,end){
//         mainItem.innerHTML = '';
//         for(let i = start;i < end;i++){
//             mainItem.innerHTML+=`
//             <div class="main_content">
//                 <div class="kuang"></div>
//                 <div class="job xiang zhi">${lists.data[i].title}</div>
//                 <div class="company xiang">${lists.data[i].company}</div>
//                 <div class="address xiang">${lists.data[i].address}</div>
//                 <div class="price xiang">${lists.data[i].price}</div>
//                 <div class="date xiang">${lists.data[i].time}</div>
//             </div>
//             `
//         }
//     }
    
    
//     function setPagestart(index){
//         let start = '';
//         let end = '';
//         start = (index-1)*pageSize;
//         end = index*pageSize < length ? index*pageSize : length;
//         setHtml(start,end);
//     }
    
//     // setPagestart(index)






























// // var timestamp1 = Date.parse(new Date());
// // var timestamp2 = (new Date()).valueOf(); 
// // console.log(timestamp2)
// // var timestamp1 = Date.parse(new Date()); // 结果：1477808630000 不推荐这种办法，毫秒级别的数值被转化为000

// //   console.log(timestamp1);

// // var timestamp2 = (new Date()).valueOf(); // 结果：1477808630404 通过valueOf()函数返回指定对象的原始值获得准确的时间戳值

// // console.log(timestamp2);

// // var timestamp3 = new Date().getTime(); // 结果：1477808630404 ，通过原型方法直接获得当前时间的毫秒值，准确

// // console.log(timestamp3);

// // var timetamp4 = Number(new Date()) ; //结果：1477808630404 ,将时间转化为一个number类型的数值，即时间戳

// // console.log(timestamp3);
// // var timestamp5 = new Date(timestamp3);//直接用 new Date(时间戳) 格式转化获得当前时间

// // console.log(timestamp5);


// // var myDate = new Date();
// // console.log(myDate.getYear())
// // console.log(myDate.getMonth()+1)


// // let i = 1;
// // var str = setInterval(function(){
// //      console.log(i++)
// //      if(i==8){
// //          clearInterval(str);
// //      }
// // },1000)

// // console.log(timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8));
//  //再利用拼接正则等手段转化为yyyy-MM-dd hh:mm:ss 格式
//  function getLocalTime(nS) {     
//     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
//  }
//  console.log(getLocalTime(1612568231))