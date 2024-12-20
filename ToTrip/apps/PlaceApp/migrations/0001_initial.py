# Generated by Django 5.1.2 on 2024-11-25 12:26

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('code', models.IntegerField(unique=True)),
                ('icon', models.ImageField(blank=True, null=True, upload_to='category_icons/')),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('coordinates', models.CharField(max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('code', models.CharField(max_length=3, unique=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='country_photos/')),
                ('flag', models.ImageField(blank=True, null=True, upload_to='country_photos/flags/')),
            ],
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='districts', to='PlaceApp.country')),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fsq_id', models.CharField(max_length=50, null=True, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(default='Не указан', max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('avg_rating', models.FloatField(default=0.0, null=True)),
                ('coordinates', models.CharField(max_length=100, null=True)),
                ('working_hours', models.CharField(max_length=100)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='places', to='PlaceApp.category')),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='city_places', to='PlaceApp.city')),
            ],
        ),
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='regions', to='PlaceApp.district')),
            ],
        ),
        migrations.AddField(
            model_name='city',
            name='region',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='region_cities', to='PlaceApp.region'),
        ),
        migrations.CreateModel(
            name='FavoritePlace',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorite_places', to=settings.AUTH_USER_MODEL)),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='PlaceApp.place')),
            ],
            options={
                'unique_together': {('user', 'place')},
            },
        ),
    ]
