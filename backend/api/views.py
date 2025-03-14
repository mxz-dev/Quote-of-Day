from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action

from .models import Quote
from .serializers import QuoteSerializer, UserSerializer
class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class RandomQuoteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quote.objects.order_by('?')[:1]
    serializer_class = QuoteSerializer
class UserViewSet(viewsets.ViewSet): # login & logout and retrieve user 
    permission_classes = [AllowAny]
    authentication_classes = [SessionAuthentication]
    http_method_names = ['get', 'post']

    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated]) 
    def session(self, request): # to check if user is authenticated
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=request.user.pk)
        serializer = UserSerializer(user)
        return Response({'message': f'{serializer.data["username"]} is Authenticated'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class SignupViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    http_method_names = ['post']
    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    