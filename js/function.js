 "use strict";

function getPosts ( callback ){
     const API = 'https://gytis-mantas.github.io/7_facebook/js/posts.json'
    console.log("darome uzklausa gauti duomenis...")
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // 4 ir 200 yra standartinis atsakymas, kad duomenys yra gauti ir jie teisingi
            callback (xhttp.responseText);
        }
    };
    xhttp.open("GET", API, true); //"true" asinchroninis, kai nestabdo, kol laukia duomenu
    xhttp.send();
}

function renderFeed( list ) {
    if ( Array.isArray(list) === false ) {
        return console.error('Feeda turi sudaryti sarasas(array) postu objektu (objects).')
    }
    for ( let i=0; i<list.length; i++ ) {
        renderPost( list[i] );
    }
    return; // "return" komanda galima išmesti, kai komanda nieko negrąžina, tik nusako funkcijos pabaigą
}   // tokiu atveju funkcijos pabaigoje "return" būtų generuojama automatiškai

function renderPost( data ) {
    let HTML = `<div class="post">
                    ${renderPostHeader(data)}
                    ${renderPostContent( data.content )}
                    ${renderPostFooter()}
                </div>`;
    document.getElementById('feed').innerHTML += HTML;
    return;  // vistiek geriau matosi funkcijos pabaiga, kai yra "return"
}   // nors žemiau nebenaudosime beverčių komandų

function renderPostHeader( data ) {
    return `<header>
        <a herf="#" class="user-image">
            <img src ="./img/users/${data.author.img}" alt="user face">
        </a>
        <div class="texts">
            <div class="author">
                <a href="#">${data.author.name} ${data.author.surname}</a>
            </div>
            <span class="time">${formatDate(data.time)} </span>
        </div>
        <i class="fa fa-ellipsis-h"></i>
    </header>`;
}

function renderPostContent( content ) {
    let textHTML = '';
    let galleryHTML = '';
    if ( content.text) {
        textHTML = renderPostText( content )
    }
    if(content.img) {
        galleryHTML = renderGallery( content.img )
    }
    return `<div class="content">
                ${textHTML}
                ${galleryHTML}
            </div>`;
}

// **********  toliau eina funkcijos, formuojancios "textHTML" ir "galleryHTML" **************
function renderPostText( content ) {
    let HTML = ''
    let text = ''
    let more = ''
    const shortTextLength = 60
    const maxTextLength = 380
// jei yra, generuojame posto teksta pagal ilgi ir fono spalva (data.js 117, 130 eilute)
let textClass = ''
    if (content.text) {
        if( content.text.length < shortTextLength && !content.img ) {
            textClass = 'big-text'
        }
        if (content.background && !content.img){
            textClass += ' background ' + content.background
        }

        text = content.text
        if (content.text.length > maxTextLength){
        // atkirpsime teksto dali iki maxTextLength (tarkim 350) simboliu
            // for ( let i=0; i<maxTextLength; i++){
            //     text += content.text[i]
            // }
            // sita eilute turetu buti ciklo analogas, bet kazkodel man neveikia
            text = content.text.slice(0, maxTextLength)
        // nutrinsime is galo nepilnus zodzius (sakinius, kai zyme '.') ir pan.
            let letterRemove = 0
            for( let i=maxTextLength-12; i>0; i-- ){
                const letter = text[i]
                if (letter === ' ') {break}
                letterRemove++
            }
            text = text.slice(0, -letterRemove-12)
            more = '... <span class="more">See more</span>'
        }


        HTML = `<p class="${textClass}">
                    ${text}${more}
                </p>`
                    // ${content.text.length > maxTextLength ? 
                    //     '... <span class="more">See more</span>':content.text}
                    // cia labai idomus "IF" analogas, reikes veliau panagrineti
                }
    return HTML
}

function renderPostFooter() {
    return `<footer>
                <div class="row">
                    <div class="action">
                        <i class="fa fa-thumbs-o-up"></i>
                        <span>Like</span>
                    </div>
                    <div class="action">
                        <i class="fa fa-comment-o"></i>
                        <span>Coment</span>
                    </div>
                </div>
                <div class="row">
                    <img class="user-photo" src="./img/users/ma.jpg" alt="user face">
                    <form>
                        <textarea> </textarea>
                        <div class="actions">
                            <i class="fa fa-smile-o"></i>
                            <i class="fa fa-camera"></i>
                            <i class="fa fa-picture-o"></i>
                            <i class="fa fa-sticky-note-o"></i>
                        </div>
                    </form>
                </div>    
            </footer>`;
}
function renderGallery( list ){
    let HTML = ''
    const maxIm = 4
    const ll = list.length
    let size = ll
    if ( ll > maxIm ){ size = maxIm }
    for ( let i = 0; i < size; i++) {
        HTML += `<img src="./img/posts/${list[i]}">`;
    }
    if (ll > size){
        HTML += `<div class="overlay">+${ll - size}</div>`
    }
    return `<div class="gallery gallery-${size}">${HTML}</div>`;
} 

function formatDate( timestamp ){
    const now = Date.now()
    const timeInSec = Math.floor((now - timestamp) / 1000)
    const timeInMin = Math.floor( timeInSec / 60)
    const timeInHour = Math.floor( timeInMin / 60)
    const timeInDays = Math.floor( timeInHour / 24)
    const timeInWeeks = Math.floor( timeInDays / 7)
    const timeInMonth = Math.floor( timeInDays / 30)
    const timeInYears = Math.floor( timeInDays / 365)
    // just now     -> 0..15s
    if ( timeInSec < 16 ){
        return "Just now"
    }
    // [xx] sec       -> 16..59s
    if ( timeInSec < 60 ){
        return timeInSec+" s ago"
    }
    // [xx] min         -> 1..59min
    if ( timeInMin < 60 ){
        return (timeInMin)+" min ago"
    }
    // [xx] hour        -> 1..24h
    if ( timeInHour < 24 ){
        return (timeInHour)+" hours ago"
    }
    // [xx] days        -> 1..14days
    if ( timeInDays < 14 ){
        return (timeInDays)+" days ago"
    }
    // [xx] weeks        -> 15..35days
    if ( timeInDays < 35 ){
        return (timeInWeeks)+" weeks ago"
    }
    // [xx] months      -> 35..365days
    if ( timeInDays < 365 ){
        return (timeInMonth)+" months ago"
    }
    // [xx] years       -> 365..Infinity days
        return (timeInYears)+" years ago"
}
