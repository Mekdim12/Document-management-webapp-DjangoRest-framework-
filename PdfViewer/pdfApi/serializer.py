from rest_framework import serializers
from .models import PdfInformation


class PdfSerializers(serializers.ModelSerializer):
    class Meta:
        model = PdfInformation
        fields = '__all__'


