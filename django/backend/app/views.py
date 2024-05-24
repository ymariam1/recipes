from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, LoginSerializer

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
def signup(request):
    print("Signup request data:", request.data)  # Log request data
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response(token, status=status.HTTP_201_CREATED)
    print("Signup errors:", serializer.errors)  # Log any errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    print("Login request data:", request.data)  # Log request data
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.data.get('username')
        password = serializer.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response(token, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    print("Login errors:", serializer.errors)  # Log any errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
