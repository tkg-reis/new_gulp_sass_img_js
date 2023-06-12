'use strict';

// ----- 360px以下のスマートフォンサイズ対応 -----
const viewport = document.querySelector('meta[name="viewport"]');
function switchViewport() {
    const value =
        window.outerWidth > 360
        ? 'width=device-width,initial-scale=1'
        : 'width=360';
    if (viewport.getAttribute('content') !== value) {
        viewport.setAttribute('content', value);
    }
}
addEventListener('resize', switchViewport, false);
switchViewport();
// console.log(viewport.getAttribute('content'));

//---------------------------------------------------

// all pages
// ローディングアニメーション

window.addEventListener('load', () => {
    setTimeout(()=>{
        const loader = document.querySelector('loader');
    loader.classList.add('loaded');
        const content = document.querySelector('content');
    content.style.visibility = "visible";
    });
},1500);



// ハンバーガーメニュー01
// openクラスの作成

// header toggle animation

const toggleWrapper = document.querySelector('.header_container__toggle');

const respMenu = document.querySelector('.header_container__respMenu');

let done = true;
toggleWrapper.addEventListener("click",() => {
    respMenu.classList.add('opened');
    setTimeout(() => {
        done = false;
    },100)
});

document.addEventListener('click',() => {
    if(done === false) {
        respMenu.classList.remove('opened');
        setTimeout(() => {
            done = true;
        },100);
    }
});

// ハンバーガーメニュー02（画面幅一杯型）

const open = document.getElementById("example");
const closeOne = document.getElementById("example2");
const closeTwo = document.getElementById("example3");
const container = document.getElementById("example4");
open.addEventListener("click",() => {
    container.style.display = "block";
});
closeOne.addEventListener("click",() => {
    container.style.display = "none";
});
closeTwo.addEventListener("click",() => {
    container.style.display = "none";
});
document.addEventListener("click", (e) => {
    if (e.target === example4){
    modal.style.display = "none";
    };
});

// header hide and exist animation
// スマートフォン時のheaderの見え隠れ処理

let width = window.innerWidth;

if(width < 768) {
    const header = document.querySelector('.header');
    let scrollPoint = 0; 
    let lastPoint = 0; 
    
    window.addEventListener("scroll",function(){
        
        scrollPoint = window.scrollY;
        
        if(scrollPoint > lastPoint){ 
            header.classList.add('header_hide');
        }else{ 
            header.classList.remove('header_hide');
        }

        lastPoint = scrollPoint;
        // ここでリセット
    });
}

// page top animation
// ページの上部への処理

const toThetop = document.querySelector(".m_topToBtn");

toThetop.addEventListener("click", scroll_top);

function scroll_top() {
    window.scrollTo({ 
        behavior: "smooth",
        top: 0
    });
}

//ページの上部へのボタンの見え隠れ処理 

window.addEventListener("scroll", scroll_event);
function scroll_event() {
    if (window.pageYOffset > 100) {
        toThetop.style.opacity = "1";
    } else if (window.pageYOffset < 100) {
        toThetop.style.opacity = "0";
    }
}

// 各セクションへの導線処理
// PC時
let links = document.querySelectorAll('.header_item__link');
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        let target = document.querySelector(link.hash);
        let jump = window.pageYOffset + target.getBoundingClientRect().top;
        // ヘッダー込みの場合adjustなどの変数で調整する。
        // let adjust = ヘッダーの高さ；
        window.scrollTo({
            top: jump,
            behavior: "smooth"
        });
    });
});

// all end

// page modules

// アコーディオン処理

const menu = document.querySelectorAll('.example');
        
function acordion() {
    const content = this.nextElementSibling;
    this.classList.toggle('is_active');
    content.classList.toggle('is_open');
}
    
for(let i = 0; i < menu.length; i++) {
    menu[i].addEventListener("click",acordion);
};

// タブの切り替え↓　参考html
{/* <ul class="tabs">
                <li><a href="" class="active">タブ1</a></li>
                <li><a href="">タブ2</a></li>
                <li><a href="">タブ3</a></li>
            </ul>
            <ul class="contents">
                <li class="active">コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1コンテンツ1</li>
                <li>コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2コンテンツ2</li>
                <li>コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3コンテンツ3</li>
</ul> */}

const tabs = document.querySelectorAll('.tabs li a');
    const contents = document.querySelectorAll('.contents li');
    console.log(tabs,contents);
    for(let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click',(e) => {
            e.preventDefault();
            for(let c = 0; c < tabs.length; c++) {
                tabs[c].classList.remove('active');
            }
            for(let c = 0; c < contents.length; c++) {
                contents[c].classList.remove('active');
            }
            tabs[i].classList.add('active');
            contents[i].classList.add('active');
        });
    }


// modules end
// -------------------------------------------------------