// Управление попапом

document.getElementById('open-popup').onclick = function() {
    document.getElementById('popup').style.display = 'flex';
};

document.getElementById('close-popup-button').onclick = function() {
    document.getElementById('popup').style.display = 'none';
};

document.querySelector('.popup-content').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        username: formData.get('username'),
        location: formData.get('location'),
        website: formData.get('website'),
        about: formData.get('about'),
        motto: formData.get('motto')
    };

    console.log(data);
});

// Управление добавлением и удалением постов

let photoPost = document.querySelector('#photo-post').content.querySelector('.photo-element')
let commentPost = document.querySelector('#comment-post').content.querySelector('.rate-element')
let mainbar = document.querySelector('.mainbar')
let addPhotoPostButton = document.querySelector('.create-photo')
let addRatePostButton = document.querySelector('.create-rate')

let addDeleteHandler = (item) => {
    let deleteButton = item.querySelector('.user-info-delete');
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        item.remove();
    });
}

let addFilterHandler = () => {
    const posts = document.querySelectorAll('main')
}

addPhotoPostButton.addEventListener('click', (event) => {
    event.preventDefault();
    clone = photoPost.cloneNode(true)
    addDeleteHandler(clone)
    mainbar.appendChild(clone);
})

addRatePostButton.addEventListener('click', (event) => {
    event.preventDefault();
    clone = commentPost.cloneNode(true)
    addDeleteHandler(clone)
    mainbar.appendChild(clone);
})

// Управление активной кнопкой в разделах профиля

const actionButtons = document.querySelectorAll('.user-action-list-button');
const posts = Array.from(mainbar.children);

actionButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        actionButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
