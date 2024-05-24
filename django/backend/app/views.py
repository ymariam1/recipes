from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, LoginSerializer
import cv2
import numpy as np
from PIL import Image
import io


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

def detect_ingredients(image):
    # Placeholder for actual model inference
    return ["tomato", "onion", "garlic"]

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_image(request):
    file_obj = request.FILES['image']
    img = Image.open(file_obj)
    img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    
    # Detect ingredients using your deep learning model
    ingredients = detect_ingredients(img)
    
    return Response({"ingredients": ingredients}, status=status.HTTP_200_OK)
