from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


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
                        status=status.HTTP_401_UNAUTHORIZED)


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


class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            if user.is_staff:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response({'detail': 'Not authorized as admin.'},
                                status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'detail': 'Invalid Credentials'},
                            status=status.HTTP_401_UNAUTHORIZED)


class UserListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AdminUserEditView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'},
                            status=status.HTTP_404_NOT_FOUND)
        user.username = request.data.get('username', user.username)
        user.name = request.data.get('name', user.name)
        user.email = request.data.get('email', user.email)
        user.is_active = request.data.get('is_active', user.is_active)

        if 'profile_image' in request.FILES:
            user.userprofile.profile_image = request.FILES['profile_image']

        user.save()
        user.userprofile.save()

        return Response({
            'message': 'User updated successfully',
            'name': user.name,
            'email': user.email,
            'is_active': user.is_active
        }, status=status.HTTP_200_OK)


class AdminUserBlockUnblockView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'},
                            status=status.HTTP_404_NOT_FOUND)

        user.is_active = request.data.get('is_active', user.is_active)
        user.save()

        return Response({
            'message': 'User status updated',
            'is_active': user.is_active
        }, status=status.HTTP_200_OK)


class DeleteUserView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({'message': 'User deleted successfully!'},
                            status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'},
                            status=status.HTTP_404_NOT_FOUND)
