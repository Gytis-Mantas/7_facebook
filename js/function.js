 "use strict";

function renderFeed( list ) {
    if ( Array.isArray(list) === false ) {
        return console.error('Feeda turi sudaryti sarasas(array) postu objektu (objects).')
    }

    for ( let i=0; i<list.length; i++ ) {
        renderPost( list[i] );
    }
    
    return;
}

function renderPost( data ) {
    let HTML = `<div class="post">
                    ${renderPostHeader(data)}
                    ${renderPostContent( data.content )}
                    ${renderPostFooter()}
                </div>`;
    
    document.getElementById('feed').innerHTML += HTML;
    return;
}

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
    console.log ( content );
    let textHTML = '';
    let galleryHTML = '';

    if(content.text) {
        textHTML = content.text
    }
    if(content.img) {
        galleryHTML = renderGallery( content.img )
    }

    return `<div class="content">
                <p>${textHTML}</p>
                ${galleryHTML}
            </div>`;
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

