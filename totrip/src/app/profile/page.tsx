export default function page() {
    return (
        <main>
        <div class="main-content">
            <section class="lead"></section> 
            <section class="profile">
                <div class="profile-head">
                    <div class="profile-head-main-info">
                        <img class='user-photo' src="/img/user-photo.png" alt="Фото профиля">
                        <div class="profile-info">
                            <h6 class="user-name">@jek1ti</h6>
                            <h4 class="name-element">Сафия Хажиева</h4>
                            <h6 class="description">Lorem ipsum dolor sit amet consectetur. Euismod ut quis lorem viverra proin pellentesque gravida eu nisl.</h6>
                        </div>
                    </div>
                    <a href='#' ><img src="/img/profile/Settings.svg" alt="Настройки профиля" class="settingsButton" id="open-popup"></a>
                </div>
                <div class="social-info">
                    <div class="social">
                        <h5 class="social-name">Публикации</h5>
                        <h5 class="counter">2</h5>
                    </div>
                    <div class="social">
                        <h5 class="social-name">Подписчики</h5>
                        <h5 class="counter">2</h5>
                    </div>
                    <div class="social">
                        <h5 class="social-name">Подписки</h5>
                        <h5 class="counter">2</h5>
                    </div>
                </div>
            </section>
            <section class="headlines">
                <ul class="user-actions-list">
                    <li class="user-actions-list-item">
                        <a href="#" data-type='all' class="user-action-list-button user-action-list-button-actions active">
                            <div>
                                <img src="img/profile/History.svg" class="list-action-photo">
                                <p class="list-action-name">Действие</p>
                            </div>
                        </a>
                    </li>
                    <li class="user-actions-list-item">
                        <a href="#" data-type='photo' class="user-action-list-button user-action-list-button-photos">
                            <div>
                                <img src='img/profile/Camera.svg' class="list-action-photo">
                                <p class="list-action-name">Фото</p>
                            </div>
                        </a>
                    </li>
                    <li class="user-actions-list-item">
                        <a href="#" data-type='rate' class="user-action-list-button user-action-list-button-rates">
                            <div>
                                <img src='img/profile/Star.svg' class="list-action-photo">
                                <p class="list-action-name">Отзывы</p>
                            </div>
                        </a>
                    </li>
                    <li class="user-actions-list-item">
                        <a href="#" data-type='review' class="user-action-list-button user-action-list-button-rates-review">
                            <div>
                                <img src='img/profile/Eye.svg' class="list-action-photo">
                                <p class="list-action-name">Обзоры</p>
                            </div>
                        </a>
                    </li>
                    <li class="user-actions-list-item">
                        <a href="#" data-type='map' class="user-action-list-button user-action-list-button-rates-places">
                            <div>
                                <img src='img/profile/Map Point.svg' class="list-action-photo">
                                <p class="list-action-name">Места</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="main-info">
                    <div class="sidebar">
                        <div class="subscribers-section sidebar-element">
                            <h5 class="subscribers-section-name">Подписчики</h5>
                            <ul class="subscribers-photos-list">
                                <li class="subscribers-photo"><img src="img/user-photo.png"></li>
                                <li class="subscribers-photo"><img src="img/user-photo.png"></li>
                                <li class="subscribers-photo"><img src="img/user-photo.png"></li>
                                <li class="subscribers-photo"><img src="img/user-photo.png"></li>
                                <li class="subscribers-photo"><img src="img/user-photo.png"></li>
                                <li class="subscribers-photo"><img src="img/user-photo.png"></li>
                            </ul>
                        </div>
                        <div class="about-me-section sidebar-element">
                            <h5 class="about-me-section-name">Обо мне</h5>
                            <div class="row-element">
                                <img src="img/profile/Map Point.svg">
                                <p class='small'>Москва, Россия</p>
                            </div>
                            <div class="row-element">
                                <img src="img/profile/Calendar.svg">
                                <p class='small'>С ToTrip с окт. 2024 года</p>
                            </div>
                            <p class='small'>Путешествия - мое все!</p>
                        </div>
                        <div class="share-section sidebar-element">
                            <h5 class="share-section-name">Поделитесь с людьми!</h5>
                            <div class="row-element">
                                <img src="img/profile/Star.svg">
                                <p class='small'><a href="#" class="create-rate fill-div">Создать отзыв</a></p>
                            </div>
                            <div class="row-element">
                                <img src="img/profile/Eye.svg">
                                <p class='small'>Создать обзор</p>
                            </div>
                            <div class="row-element">
                                <img src="img/profile/Camera.svg">
                                <p class='small'><a href="#" class="create-photo">Выложить фото</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="mainbar">
                    </div>
                </div>
            </section>
            <section class="popup" id="popup">
                <form class="popup-content" name="Настройки профиля" method="get">
                    <div class="popup-element">
                        <h5>Имя</h5>
                        <input type="text" name="name" placeholder="Введите ваше имя" class="settings-input">
                    </div>
                    <div class="popup-element">
                        <h5>Имя пользователя</h5>
                        <input type="text" name="username" placeholder="Введите ваше имя пользователя" class="settings-input">
                    </div>
                    <div class="popup-element">
                        <h5>Место проживания</h5>
                        <input type="text" name="location" placeholder="Поиск" class="settings-input">
                    </div>
                    <!--
                    <div class="popup-element">
                        <h5>Веб сайт</h5>
                        <input type="text" name="website" placeholder="Введите ссылку" class="settings-input">
                    </div>-->
                    <div class="popup-element">
                        <h5>О себе</h5>
                        <textarea class="settings-input" id="about-field" name="about" rows="3" cols="40" placeholder="Напишите о себе"></textarea>
                    </div>
                    <div class="popup-element">
                        <h5>Девиз</h5>
                        <textarea class="settings-input" id="motto-field" name="motto" rows="3" cols="40" placeholder="Введите свой девис"></textarea>
                    </div>
                    <input type="button" value="Отменить" id="close-popup-button"/>
                    <input type="submit" value="Подтвердить"/>
                </form>
            </section>
        </div>
    </main> 
    )
}