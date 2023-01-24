from django.urls import path,include
from . import views



urlpatterns = [
    path('', views.PdfManipulation.as_view(),name='api_with_no_atrr'), 
    path('<str:seachParam>', views.pdfManipulation_.as_view(),name='api_with_attr'),     
]

