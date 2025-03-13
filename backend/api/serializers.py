from rest_framework.serializers import ModelSerializer
from .models import Quote
from django.contrib.auth.models import User
class QuoteSerializer(ModelSerializer):
    class Meta:
        model = Quote
        fields = '__all__'
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']