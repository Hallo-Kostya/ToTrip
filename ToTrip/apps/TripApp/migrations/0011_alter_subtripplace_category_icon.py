# Generated by Django 5.1.2 on 2025-01-15 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TripApp', '0010_remove_subtripplace_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subtripplace',
            name='category_icon',
            field=models.ImageField(default='subtripplace/defaultik.svg', upload_to='subtripplace/'),
        ),
    ]
