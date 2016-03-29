# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Travel',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('travel_name', models.CharField(max_length=50)),
                ('travel_meeting', models.CharField(max_length=50)),
                ('travel_venue', models.CharField(max_length=50)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('travel_days', models.IntegerField()),
                ('user', models.CharField(max_length=30, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=12)),
                ('last_name', models.CharField(max_length=12)),
                ('email', models.CharField(max_length=30)),
                ('password', models.TextField()),
                ('user_name', models.CharField(max_length=20)),
                ('phone_number', models.CharField(max_length=12)),
                ('user_level', models.CharField(max_length=10, default=3, help_text='1 == admin, 2 == finance office, 3 == public')),
            ],
        ),
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('travel', models.OneToOneField(to='Travelplan.Travel', serialize=False, primary_key=True)),
                ('budget_line', models.IntegerField()),
                ('budget_cost', models.IntegerField()),
                ('additional_cost', models.IntegerField()),
                ('budget_spent', models.IntegerField(null=True)),
                ('budget_quarter', models.IntegerField(null=True)),
                ('budget', models.IntegerField()),
                ('budget_balance', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Details',
            fields=[
                ('travel', models.OneToOneField(to='Travelplan.Travel', serialize=False, primary_key=True)),
                ('justification', models.TextField()),
                ('project_details', models.CharField(max_length=30)),
                ('region', models.CharField(max_length=30)),
                ('communication_details', models.TextField()),
                ('date', models.DateField()),
                ('department', models.CharField(max_length=30)),
                ('status', models.CharField(max_length=100)),
                ('report', models.TextField()),
            ],
        ),
    ]
