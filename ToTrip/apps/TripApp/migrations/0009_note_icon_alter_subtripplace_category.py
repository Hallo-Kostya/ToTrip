# Generated by Django 5.1.2 on 2025-01-15 20:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PlaceApp', '0006_place_reviews_count_alter_place_avg_rating'),
        ('TripApp', '0008_subtripplace_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='icon',
            field=models.ImageField(default='note_icon/default.svg', upload_to='note_icon/'),
        ),
        migrations.AlterField(
            model_name='subtripplace',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, related_name='subtrip_places', to='PlaceApp.category'),
        ),
    ]
