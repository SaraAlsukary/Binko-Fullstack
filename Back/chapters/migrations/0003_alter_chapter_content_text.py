# Generated by Django 4.2.10 on 2024-11-19 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chapters', '0002_chapter_book'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='content_text',
            field=models.TextField(),
        ),
    ]
