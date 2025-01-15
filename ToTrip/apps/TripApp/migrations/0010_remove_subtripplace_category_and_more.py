# Generated by Django 5.1.2 on 2025-01-15 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TripApp', '0009_note_icon_alter_subtripplace_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subtripplace',
            name='category',
        ),
        migrations.AddField(
            model_name='subtripplace',
            name='category_icon',
            field=models.ImageField(default='subtripplace/default.svg', upload_to='subtripplace/'),
        ),
    ]
