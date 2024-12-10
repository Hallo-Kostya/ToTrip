# Generated by Django 5.1.2 on 2024-12-10 15:54

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PostApp', '0002_postcategory_post_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postcategory',
            name='icon',
            field=models.FileField(blank=True, null=True, upload_to='postcategory_icons/', validators=[django.core.validators.FileExtensionValidator(['jpg', 'png', 'svg'])]),
        ),
    ]
