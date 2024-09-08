from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Invitado
from .serializers import InvitadoSerializer

class InvitadoViewSet(viewsets.ModelViewSet):
    queryset = Invitado.objects.all()
    serializer_class = InvitadoSerializer
