from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from next_static import NextStaticView
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('shop.urls')),

    # Next.js static assets (_next)
    re_path(r'^_next/(?P<path>.*)$', serve, {
        'document_root': os.path.join(settings.BASE_DIR, 'build', '_next'),
        'show_indexes': False
    }),
]

# Static/media files (for debug mode)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=os.path.join(settings.BASE_DIR, 'build'))
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Верни обратно свой NextStaticView обработчик:
urlpatterns += [
    re_path(r'^(?P<path>.*)$', NextStaticView.as_view()),
]
