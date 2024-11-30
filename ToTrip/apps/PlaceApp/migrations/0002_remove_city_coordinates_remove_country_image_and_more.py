# Generated by Django 5.1.2 on 2024-11-30 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PlaceApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='city',
            name='coordinates',
        ),
        migrations.RemoveField(
            model_name='country',
            name='image',
        ),
        migrations.RemoveField(
            model_name='place',
            name='coordinates',
        ),
        migrations.AddField(
            model_name='city',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='city',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='place',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='place',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True),
        ),
    ]
