# Generated by Django 5.1.2 on 2024-11-10 21:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Db_api', '0010_alter_placeimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='placeimage',
            name='image',
            field=models.ImageField(upload_to='place_images/'),
        ),
        migrations.AlterField(
            model_name='placeimage',
            name='place',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='placeimage_set', to='Db_api.place'),
        ),
    ]
