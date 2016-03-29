# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Travelplan', '0006_auto_20160325_0843'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='details',
            name='status',
        ),
        migrations.AddField(
            model_name='travel',
            name='status',
            field=models.CharField(choices=[(0, 'pending'), (1, 'confirmed')], max_length=100, default=0),
        ),
    ]
