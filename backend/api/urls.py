from rest_framework import routers
from .views import QuoteViewSet, RandomQuoteViewSet, LoginViewSet, SignupViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'quotes', QuoteViewSet, basename='quote')
router.register(r'random-quotes', RandomQuoteViewSet, basename='random')
router.register(r'auth', LoginViewSet, basename='login')
router.register(r'signup', SignupViewSet, basename='signup')

urlpatterns = [
    path('', include(router.urls)),
]