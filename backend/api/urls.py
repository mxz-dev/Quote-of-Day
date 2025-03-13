from rest_framework import routers
from .views import QuoteViewSet, RandomQuoteViewSet, LoginView
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'quotes', QuoteViewSet, basename='quote')
router.register(r'random-quotes', RandomQuoteViewSet, basename='random')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', LoginView.as_view(), name='login'),
]