from django.urls import path,include

from . import views
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('', views.HomePage,name='home'),
    path('main-pdfview/<int:id>',views.pdfViewPage, name="mainPdfViewPage")
]

