from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InvitadoViewSet

router = DefaultRouter()
router.register(r'invitados', InvitadoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
