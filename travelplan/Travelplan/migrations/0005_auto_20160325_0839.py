# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Travelplan', '0004_auto_20160325_0833'),
    ]

    operations = [
        migrations.AlterField(
            model_name='details',
            name='status',
            field=models.CharField(default='PENDING', choices=[('pending', 'pending'), ('confirmed', 'confirmed')], max_length=100),
        ),
    ]
