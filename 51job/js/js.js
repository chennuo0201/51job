// 获取节点
function getNode(node){
    return document.querySelector(node)
};

// 设置class
function setClass(className,value){
    className[0] == '.' ? getNode(className).className = value : className.className = value;
}

// 增加class
function addClass(className,value){
    className[0] == '.' ? getNode(className).classList.add(value) : className.classList.add(value);
}

let langage = getNode('.lang');
let xiala = getNode('.xiala');
let navRight = getNode('.navRight');
let keyWords = getNode('.keyWords');
let inner = getNode('.inner');

// 冒泡点击下拉这个div
xiala.onclick=function(e){
    if(e.target.className =='xialaItem'){
        // 交换两个值
        [ langage.innerText, e.target.innerText ] = [ e.target.innerText, langage.innerText ]
    }
};

// 导航加点击事件
navRight.onclick=function(e){
    if(e.target.className == 'navItem'){
        getNode('.navActive') && setClass('.navActive','navItem');
        e.target && addClass(e.target,'navActive')
    }
};

// 给关键字加点击事件
keyWords.onclick=function(e){
    let event = e.target;
    if(event.className == 'kwmore'){
        let childs = event.previousElementSibling.querySelectorAll('.checkBox');
        for(let i of childs){
            i.style.display = i.style.display == 'none' ? 'block' : 'none'
        }
    };
    if(event.className == 'checkBox'){
        event.className = 'checkBox kwChecked';
    }else if (event.className == 'checkBox kwChecked'){
        event.className = 'checkBox';
    };
    if(event.className == 'duoxuan'){
        event.parentNode.previousElementSibling.classList.add('overflow')
    }
};

let lists=[
   {
       title:'时间范围',
       duoxuan:false,
       content:[
           { name: '5000k' },
           { name: '5000k' },
           { name: '5000k' },
           { name: '5000k' },
           { name: '5000k' },
           { name: '5000k' },
           { name: '5000k' },
       ]
   },{
    title:'工作年限',
    duoxuan:true,
    content:[
        { name: '5000k' },
        { name: '5000k' },
        { name: '5000k' },
        { name: '5000k' },
        { name: '5000k' },
        { name: '5000k' },
        { name: '5000k' },
      ]
    },{
        title:'学历要求',
        duoxuan:false,
        content:[
            { name: '5000k' },
            { name: '5000k' },
            { name: '5000k' },
            { name: '5000k' },
            { name: '5000k' },
            { name: '5000k' },
            { name: '5000k' },
        ]
    },
]

// function setHTML(lists){
//     inner.innerHTML=`
//     <div class="kwCtItem kwActive">
//         <div class="checkBox kwChecked"></div>
//         <div>
//             所有
//         </div>
//     </div>
//     `;
//     lists.forEach(function(item,index){
//         inner.innerHTML += `
//         <div class="kwCtItem">
//             <div class="checkBox"></div>
//             <div>
//                 ${item.name}
//             </div>
//         </div>
//         `
//     });
// }

// <div class="kwCtItem">
//                             <div class="checkBox">
                                
//                             </div>
//                             <div>
//                                 所有
//                             </div>
//                         </div>


function setHTML(lists){
    let str='';
    let str2=''
    lists.forEach((item,index) => {
        
        item.content.forEach((item0,index0)=>{
            console.log(item0.name)
            str2+=`
            <div class="kwCtItem">
                <div class="checkBox">
                    
                </div>
                <div>
                    ${item0.name}
                </div>
            </div>
            `
        })
        str+=`
        <div class="keyWordsItem">
            <div class="kwleft">
                ${item.title}：
            </div>
            <div class="kwContent">
                ${str2}
            </div>
            <div class="kwmore">
                ${ index == 1 || index == 2 ? '<div>更多</div>' : ''}
                ${item.duoxuan ? '<div class="duoxuan">多选</div>': '' }
            </div>
        </div>`
    });
    return str
}
inner.innerHTML = setHTML(lists)

// 渲染列表
let listsLiebiao=[
    { name:'第1' },
    { name:'第2' },
    { name:'第3' },
    { name:'第4' },
    { name:'第5' },
    { name:'第6' },
    { name:'第7' },
    { name:'第8' }
]
let boxLists = getNode('.boxLists');
let page = 1;
let pageSize = 3;
let lengths = listsLiebiao.length;
let allPage = Math.ceil( lengths/pageSize );
let fenye =getNode('.fenye');

function setAllpage(allpage){
    console.log(allpage)
    getNode('.nums').innerText = allpage
}

function setPage(index){
    getNode('.num').innerText = index
}

// console.log( lengths, allPage )
function getPageStart(index){
    setPage(index)
    let start = (index - 1) * pageSize;
    let end = index * pageSize > lengths ? lengths : index * pageSize;
    console.log(start, end)
    setLiebiaoHTML(start, end)
}

function setLiebiaoHTML(start, end){
    boxLists.innerHTML = `
        <div class="jobItem">
            <div>职业</div>
            <div>薪资</div>
            <div>薪资</div>
            <div>时间</div>
        </div>
    `
    for(let i = start; i < end; i++){
        boxLists.innerHTML+=`
        <div class="jobItem">
            <div>${listsLiebiao[i].name}</div>
            <div>0</div>
            <div>0</div>
            <div>0</div>
        </div>
        `
    }
}

fenye.onclick=function(e){
    let event =e.target;
    if(event.className == 'pageChange jian'){
        if(page > 1){
            page--;
            getPageStart(page)
        }
    }else if(event.className == 'pageChange add'){
        if(page < allPage){
            page++;
            getPageStart(page)
        }
    }
}
// 设置页码
setAllpage(allPage)

// 第一次设置初始化列表数据
getPageStart(page)

function a(a){
    console.log(a)
}
function a(b){
    console.log(b+1)
}