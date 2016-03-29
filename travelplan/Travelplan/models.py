from django.db import models

class User(models.Model):
	first_name = models.CharField(max_length=12)
	last_name = models.CharField(max_length=12)
	email = models.CharField(max_length=30)
	password = models.TextField()
	username = models.CharField(max_length=20)
	phone_number = models.CharField(max_length=12)
	user_level= models.CharField(max_length=10, default=3,
		help_text='1 == admin, 2 == finance office, 3 == public')

	def __str__(self):
		return self.first_name + "" + self.last_name


class Travel(models.Model):

	PENDING = 0
	CONFIRMED = 1

	status_choices = (

		(PENDING, 'pending'),
		(CONFIRMED, 'confirmed'),
		)

	travel_name = models.CharField(max_length=50)
	travel_meeting = models.CharField(max_length=50)
	travel_venue = models.CharField(max_length=50)
	start_date = models.DateField()
	end_date = models.DateField()
	travel_days = models.IntegerField()
	user = models.CharField(max_length=30, null=True)
	status = models.CharField(max_length=100, choices=status_choices, default=PENDING)
	status_report = models.TextField(null=True, blank=True)

	def is_upperclass(self):
		return self.status in (self.PENDING, self.CONFIRMED)

	def __str__(self):
		return self.start_date + "" + self.end_date + "" + self.status






class Budget(models.Model):
	travel = models.OneToOneField(Travel, primary_key=True, on_delete=models.CASCADE)
	budget_line = models.IntegerField()
	budget_cost = models.IntegerField()
	additional_cost = models.IntegerField()
	budget_spent = models.IntegerField(null=True)
	budget_quarter = models.IntegerField(null=True)
	budget = models.IntegerField()
	budget_balance = models.IntegerField()



class Details(models.Model):
	

	travel = models.OneToOneField(Travel, primary_key=True, on_delete=models.CASCADE)
	justification = models.TextField()
	project_details = models.CharField(max_length=30)
	region = models.CharField(max_length=30)
	communication_details = models.TextField()
	date = models.DateField(null=False)
	department = models.CharField(max_length=30)
	
	report = models.TextField()


	

