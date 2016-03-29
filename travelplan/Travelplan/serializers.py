from rest_framework import serializers

from Travelplan.models import User, Travel, Budget, Details



class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('first_name', 'last_name', 'email', 'password', 'username', 'phone_number', )

class TravelSerializer(serializers.ModelSerializer):

	class Meta:
		model = Travel

class BudgetSerializer(serializers.ModelSerializer):

	

	class Meta:
		model = Budget

		fields = ('travel', 'budget_line', 'budget_cost', 'additional_cost', 'budget', 'budget_balance',)
		


	def create(self, validated_data):
		
		print(validated_data)
		budget = Budget(
			travel = Travel.objects.get(id=validated_data['travel']),
			budget_line = validated_data['budget_line'],
			budget_cost = validated_data['budget_cost'],
			additional_cost = validated_data['additional_cost'],
			budget = validated_data['budget'],
			budget_balance = validated_data['budget_balance'],
			)
		budget.save()
		return budget

	def update(self, instance, validated_data):
		instance.budget_line = validated_data.get('budget_line', instance.budget_line)
		instance.budget_cost = validated_data.get('budget_cost', instance.budget_cost)
		instance.additional_cost = validated_data.get('additional_cost', instance.additional_cost)
		instance.budget = validated_data.get('budget', instance.budget)
		instance.budget_balance = validated_data.get('budget_balance', instance.budget_balance)

		instance.save()
		return instance

		



class DetailSerializer(serializers.ModelSerializer):

	class Meta:
		model = Details
		fields = ('travel', 'justification', 'project_details', 'region', 'communication_details', 'date', 'department', 'report',)
		# read_only_fields = ('travel',)

	def create(self, validated_data):
		details = Details(
			travel = Travel.objects.get(id=validated_data['travel']),
			justification = validated_data['justification'],
			project_details = validated_data['project_details'],
			region = validated_data['region'],
			communication_details = validated_data['communication_details'],
			date = validated_data['date'],
			department = validated_data['department'],
			# status = validated_data['status'],
			report = validated_data['report'],

			)
		details.save()
		return details


	def update(self, instance, validated_data):
		instance.justification = validated_data.get('justification', instance.justification)
		instance.project_details = validated_data.get('project_details', instance.project_details)
		instance.region = validated_data.get('region', instance.region)
		instance.communication_details = validated_data.get('communication_details', instance.communication_details)
		instance.date = validated_data.get('date', instance.date)
		instance.department = validated_data.get('department', instance.department)
		instance.report = validated_data.get('report', instance.report)

		instance.save()
		return instance	


