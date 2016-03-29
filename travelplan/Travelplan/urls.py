from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter

from Travelplan.views import UserViewSet, TravelViewSet, BudgetViewSet,DetailViewSet


router = DefaultRouter()

router.register(r'user', UserViewSet)
router.register(r'travel', TravelViewSet)
router.register(r'budget', BudgetViewSet)
router.register(r'details', DetailViewSet)

urlpatterns = [
	url(r'^', include(router.urls))
]