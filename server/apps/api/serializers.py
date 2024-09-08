from rest_framework import serializers
from .models import Invitado

class InvitadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitado
        fields = '__all__'
