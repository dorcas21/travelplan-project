# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Travelplan', '0002_auto_20160324_1025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='details',
            name='status',
            field=models.CharField(default='Pending', max_length=100),
        ),
    ]
