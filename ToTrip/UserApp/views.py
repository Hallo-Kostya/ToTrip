from django.shortcuts import render, redirect
from django.contrib.auth import login,authenticate,logout
import requests


def login_page(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        response = requests.post('http://127.0.0.1:8000/api/users/login/', data={
            'email': email,
            'password': password
        })

        if response.status_code == 200:
            # Получаем токены из ответа и сохраняем их в сессии
            tokens = response.json()
            request.session['access'] = tokens['access']
            request.session['refresh'] = tokens['refresh']
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
            return redirect('home_page')  # Перенаправление на главную страницу

        else:
            # Обработка ошибок входа
            context = {'error': 'Неверная    электронная почта или пароль'}
            return render(request, 'UserApp/login-page.html', context)

    return render(request, 'UserApp/login-page.html')


def register_page(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        username = request.POST.get('username')
        first_name=request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        password = request.POST.get('password')

        # Отправляем запрос к вашему API для регистрации
        response = requests.post('http://127.0.0.1:8000/api/users/register/', data={
            'email': email,
            'password': password,
            'first_name': first_name,
            'last_name': last_name,
            'username': username,
            
        })


        if response.status_code == 201:  # Успешная регистрация
            return redirect('login_page')  # Перенаправление на страницу входа

        else:
            # Обработка ошибок регистрации
            context = {'error': response.json()}
            return render(request, 'UserApp/register-page.html', context)

    return render(request, 'UserApp/register-page.html')

def logout_page(request):
    logout(request)
    request.session.pop('access', None)
    request.session.pop('refresh', None)
    return redirect('home_page')
def main_page(request):
    return render(request, "TripPlanner/MainPage.html")

def profile_page(request):
    access_token = request.session.get('access')
    print(f"Access token: {access_token}")  # Отладка для проверки токена
    response = requests.get(
        'http://127.0.0.1:8000/api/users/profile/',
        headers={'Authorization': f'Bearer {access_token}'}
    )

    if response.status_code == 200:
        user_data = response.json()
    else:
        user_data = {}

    return render(request, 'UserApp/profile-page.html', {'user_data': user_data})