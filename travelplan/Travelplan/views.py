from rest_framework import viewsets

from Travelplan.models import User, Travel, Budget, Details

from Travelplan.serializers import UserSerializer, TravelSerializer, BudgetSerializer, DetailSerializer

class UserViewSet(viewsets.ModelViewSet):

	queryset = User.objects.all()
	serializer_class = UserSerializer

class TravelViewSet(viewsets.ModelViewSet):

	queryset = Travel.objects.all()
	serializer_class = TravelSerializer

class BudgetViewSet(viewsets.ModelViewSet):

	queryset = Budget.objects.all()
	serializer_class = BudgetSerializer
	

class DetailViewSet(viewsets.ModelViewSet):

	queryset = Details.objects.all()
	serializer_class = DetailSerializer





