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


label_map = {
    0: 'all-purpose flour',
    1: 'apple',
    2: 'bacon',
    3: 'baking powder',
    4: 'balsamic vinegar',
    5: 'banana',
    6: 'bell pepper',
    7: 'black pepper',
    8: 'brown sugar',
    9: 'butter',
    10: 'cake mix',
    11: 'canola oil',
    12: 'carrot',
    13: 'cayenne pepper',
    14: 'celery',
    15: 'cheddar',
    16: 'chicken breast',
    17: 'chicken broth',
    18: 'chicken stock',
    19: 'chili powder',
    20: 'chocolate chip',
    21: 'cilantro',
    22: 'cinnamon',
    23: 'cooking spray',
    24: 'cornstarch',
    25: 'cream cheese',
    26: 'cucumber',
    27: 'cumin',
    28: 'curry powder',
    29: 'diced tomato',
    30: 'dijon mustard',
    31: 'dried basil',
    32: 'dried oregano',
    33: 'dried thyme',
    34: 'egg',
    35: 'flour',
    36: 'fresh basil',
    37: 'fresh cilantro',
    38: 'fresh ginger',
    39: 'fresh lemon juice',
    40: 'fresh parsley',
    41: 'garlic',
    42: 'garlic powder',
    43: 'granulated sugar',
    44: 'ground beef',
    45: 'ground ginger',
    46: 'heavy cream',
    47: 'honey',
    48: 'ketchup',
    49: 'lemon',
    50: 'lettuce',
    51: 'lime juice',
    52: 'mayonnaise',
    53: 'milk',
    54: 'mozzarella',
    55: 'mushroom',
    56: 'mustard',
    57: 'olive oil',
    58: 'onion',
    59: 'onion powder',
    60: 'orange juice',
    61: 'paprika',
    62: 'pecan',
    63: 'plain yogurt',
    64: 'potato',
    65: 'raisin',
    66: 'red wine vinegar',
    67: 'salt',
    68: 'sausage',
    69: 'scallion',
    70: 'sesame oil',
    71: 'sour cream',
    72: 'soy sauce',
    73: 'tomato',
    74: 'tomato paste',
    75: 'tomato sauce',
    76: 'tortilla',
    77: 'vanilla extract',
    78: 'vegetable oil',
    79: 'vinegar',
    80: 'walnut',
    81: 'worcestershire sauce',
    82: 'yeast',
    83: 'zucchini'
}

def sliding_window(image, step_size, window_size):
    # Slide a window across the image
    for y in range(0, image.shape[0], step_size):
        for x in range(0, image.shape[1], step_size):
            yield (x, y, image[y:y + window_size[1], x:x + window_size[0]])

def detect_ingredients(image, model, step_size=32, window_size=(128, 128)):
    ingredients = set()
    
    for (x, y, window) in sliding_window(image, step_size, window_size):
        if window.shape[0] != window_size[1] or window.shape[1] != window_size[0]:
            continue
        
        # Preprocess the window for your model
        window = cv2.resize(window, (model.input_shape[1], model.input_shape[2]))
        window = window.astype("float") / 255.0
        window = np.expand_dims(window, axis=0)
        
        # Predict the ingredient in the window
        pred = model.predict(window)
        predicted_label = np.argmax(pred, axis=1)[0]
        
        # Map predicted_label to ingredient name (assuming you have a label map)
        ingredient = predicted_label
        ingredients.add(ingredient)
    
    return list(ingredients)


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

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_image(request):
    file_obj = request.FILES['image']
    img = Image.open(file_obj)
    img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    
    # Detect ingredients using your deep learning model
    ingredients = detect_ingredients(img)
    
    return Response({"ingredients": ingredients}, status=status.HTTP_200_OK)
