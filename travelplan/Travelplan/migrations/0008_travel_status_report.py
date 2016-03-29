# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Travelplan', '0007_auto_20160327_1607'),
    ]

    operations = [
        migrations.AddField(
            model_name='travel',
            name='status_report',
            field=models.TextField(blank=True, null=True),
        ),
    ]
