from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({
                'refresh': refresh_token,
                'access': access_token
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            })
        return Response({'error': serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refreshtoken = request.data["refresh_token"]
            token = RefreshToken(refreshtoken)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        userprofile = request.user.userprofile
        profile_image_url = request.build_absolute_uri(
            userprofile.profile_image.url
            ) if userprofile.profile_image else None
        return Response({
            'name': request.user.name,
            'email': request.user.email,
            'profile_image': profile_image_url,
        })


class UserProfileEditView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)

        if 'profile_image' in request.FILES:
            user.userprofile.profile_image = request.FILES['profile_image']

        try:
            user.save()
            user.userprofile.save()
            return Response({
                'message': 'Profile updated successfully!',
                'name': user.name,
                'email': user.email,
                'profile_image': request.build_absolute_uri(
                    user.userprofile.profile_image.url
                    ) if user.userprofile.profile_image else None
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)
