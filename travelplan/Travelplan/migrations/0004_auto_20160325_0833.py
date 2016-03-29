# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Travelplan', '0003_auto_20160325_0602'),
    ]

    operations = [
        migrations.AlterField(
            model_name='details',
            name='status',
            field=models.CharField(default='PENDING', max_length=100, choices=[(0, 'pending'), (1, 'confirmed')]),
        ),
    ]
