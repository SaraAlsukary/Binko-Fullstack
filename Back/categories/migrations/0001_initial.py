# Generated by Django 4.2.10 on 2025-03-24 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('name_arabic', models.CharField(max_length=250)),
                ('file', models.FileField(null=True, upload_to='uploads/')),
            ],
            options={
                'db_table': 'categories',
            },
        ),
    ]
