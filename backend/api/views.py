from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.views import APIView
from .models import Quote
from .serializers import QuoteSerializer, UserSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.models import User
from rest_framework.decorators import action
class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class RandomQuoteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quote.objects.order_by('?')[:1]
    serializer_class = QuoteSerializer
class LoginViewSet(viewsets.ViewSet):
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

    def retrieve(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if str(request.user.pk) != str(pk):
            return Response({'message': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response({'message': f'{serializer.data["username"]} Authenticated'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class SignupViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    authentication_classes = [SessionAuthentication]
    def create(self, request):
        if request.user.is_authenticated:
            return Response({"message":"user already signin."}, status=status.HTTP_400_BAD_REQUEST)
        username = request.data.get('username')
        password1 = request.data.get('password1')
        password2 = request.data.get('password2')
        if password1 == password2 and len(password1) > 8:
            if User.objects.filter(username=username).exists():
                return Response({'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.create_user(username=username)
            user.set_password(password1)
            user.save()
            return Response({'message':'User signed up successfully'}, status=status.HTTP_201_CREATED)
        
        else:
            return Response({'message': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
