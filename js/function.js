 "use strict";

function renderFeed( list ) {
    if ( Array.isArray(list) === false ) {
        return console.error('Feeda turi sudaryti sarasas(array) postu objektu (objects).')
    }
    for ( let i=0; i<list.length; i++ ) {
        renderPost( list[i] );
    }
    return; // "return" komanda galima išmesti, nes komanda nieko negrąžina, tik nusako funkcijos pabaigą
}   // šiuo atveju funkcijos pabaigoje "return" būtų generuojama automatiškai

function renderPost( data ) {
    let HTML = `<div class="post">
                    ${renderPostHeader(data)}
                    ${renderPostContent( data.content )}
                    ${renderPostFooter()}
                </div>`;
    document.getElementById('feed').innerHTML += HTML;
    return;  // bet vistiek geriau matosi funkcijos pabaiga, kai yra "return"
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
            <span class="time">${data.time} </span>
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
    const shortTextLength = 61
    const maxTextLength = 350
    let textClass = ''
// jei yra, generuojame posto teksta pagal ilgi ir fono spalva (data.js 117 ir 130 eilute)
    if (content.text) {
        if( content.text.length < shortTextLength && !content.img ) {
            textClass = 'big-text'
        }
        if (content.background && !content.img){
            textClass += ' background ' + content.background
        }
// sustojau paskutines pamokos 2 dalies 23 minute //
        HTML = `<p class="${textClass}">
 
                    ${content.text.length > maxTextLength ? 
                        '... <span class="more">See more</span>':content.text}
                </p>`
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
} // patogesne, bet ne tokia gera, kaip paskutiniame pavyzdyje

// veikianti patikrinta galerijos formavimo funkcija, tik neformatuoja foto pagal dydi
// function renderGallery( list ){
//     console.log(list)
//     let HTML = ''
//         for ( let i = 0; i<list.length; i++){
//             HTML += `<img src= "./img/posts/${list[i]}">`
//         }

//     return HTML
// }


// veikianti patikrinta galerijos formavimo funkcija, jau uzdaryta i <div>
// function renderGallery( list ){
//     let HTML = '<div class="gallery">';
//         for ( let i = 0; i<list.length; i++){
//             HTML += `<img src= "./img/posts/${list[i]}">`
//         }
//     HTML +='</div>'    
//     return HTML
// }

