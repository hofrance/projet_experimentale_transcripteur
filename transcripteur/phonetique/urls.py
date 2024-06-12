from django.urls import path
from .views import upload_audio, transcribe_view, jeux_view, home_view, about_view

urlpatterns = [
    path('upload_audio/', upload_audio, name='upload_audio'),
    path('transcribe/', transcribe_view, name='transcribe'),
    path('jeux/', jeux_view, name='jeux'),
    path('', home_view, name='home'),
    path('about/', about_view, name='about'),
]
