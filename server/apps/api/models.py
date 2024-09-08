from django.db import models

# Create your models here.

from django.db import models

class Invitado(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    assist = models.BooleanField(default=False)

    def __str__(self):
        return self.name
