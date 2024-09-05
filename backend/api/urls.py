from django.urls import path
from .views import LoginView, RegisterView, LogoutView, UserProfileView
from .views import UserProfileEditView, UserListView, DeleteUserView
from .views import AdminLoginView, AdminUserEditView, AdminUserBlockUnblockView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
     path('token/', TokenObtainPairView.as_view(), name='get_token'),
     path('token/refresh/', TokenRefreshView.as_view(),
          name='refresh_token'),
     path('register/', RegisterView.as_view(), name='register'),
     path('login/', LoginView.as_view(), name='login'),
     path('logout/', LogoutView.as_view(), name='logout'),
     path('profile/', UserProfileView.as_view(), name='user-profile'),
     path('profile/edit/', UserProfileEditView.as_view(),
          name='edit-user-profile'),

     path('adminlogin/', AdminLoginView.as_view(), name='admin-login'),
     path('admin/userlist/', UserListView.as_view(), name='user-list'),
     path('admin/user/edit/<int:user_id>/', AdminUserEditView.as_view(),
          name='admin-edit-user'),
     path('admin/user/block/<int:user_id>/',
          AdminUserBlockUnblockView.as_view(),
          name='admin-block-unblock-user'),
     path('admin/user/delete/<int:user_id>/',
          DeleteUserView.as_view(), name='delete-user')
]
