# Generated by Django 4.2.10 on 2024-11-15 15:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_rename_cat_book_category_category'),
        ('chapters', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='book',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='books.book'),
            preserve_default=False,
        ),
    ]
