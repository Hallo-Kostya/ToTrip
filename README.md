Ридми далее будет заполняться. 
На данный момент бекенд задеплоен на Render: https://totrip.onrender.com/  (ветка deploy)
(по условиям бесплатного хостинга, первый запрос выполняется с задержкой до минуты).
Для локального запуска требуется созданная бд в postgresql ToTrip_BD. 
Далее команда для миграции: python manage.py migrate 
И команда для запуска локалхоста: python manage.py runserver
