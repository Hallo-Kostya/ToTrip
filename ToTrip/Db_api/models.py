# Db_api/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Email обязателен')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50,null=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to='user_photos/', blank=True, null=True)
    last_login = models.DateTimeField(default=timezone.now, null=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    city=models.CharField(max_length=20, null=True)
    country = models.CharField(max_length=20, null=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name', 'last_name']

    def __str__(self):
        return self.email