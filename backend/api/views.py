from rest_framework import viewsets, status
from rest_framework.views import APIView
from .models import Quote
from .serializers import QuoteSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.authentication import SessionAuthentication

class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class RandomQuoteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quote.objects.order_by('?')[:1]
    serializer_class = QuoteSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [SessionAuthentication]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    def delete(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    
    def get(self, request):
        if request.user.is_authenticated:
            return Response({'message': 'Authenticated'}, status=status.HTTP_200_OK)
        return Response({'message': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)