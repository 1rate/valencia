import os
import mimetypes
from django.conf import settings
from django.http import HttpResponse, Http404
from django.views import View

class NextStaticView(View):
    def get(self, request, path=""):
        base_dir = os.path.join(settings.BASE_DIR, 'build')

        # Если прямой путь существует, отдаем его
        direct_path = os.path.join(base_dir, path)
        if os.path.exists(direct_path) and os.path.isfile(direct_path):
            with open(direct_path, 'rb') as f:
                content = f.read()
            content_type, _ = mimetypes.guess_type(direct_path)
            return HttpResponse(content, content_type=content_type)

        # Проверяем наличие файла вида "checkout.html"
        html_file_path = os.path.join(base_dir, f"{path}.html")
        if os.path.exists(html_file_path):
            with open(html_file_path, 'rb') as f:
                content = f.read()
            return HttpResponse(content, content_type='text/html')

        # Проверяем наличие файла вида "checkout/index.html"
        index_html_path = os.path.join(base_dir, path, 'index.html')
        if os.path.exists(index_html_path):
            with open(index_html_path, 'rb') as f:
                content = f.read()
            return HttpResponse(content, content_type='text/html')

        # Возвращаем главную страницу, если ничего не найдено
        default_index_path = os.path.join(base_dir, 'index.html')
        if os.path.exists(default_index_path):
            with open(default_index_path, 'rb') as f:
                content = f.read()
            return HttpResponse(content, content_type='text/html')

        raise Http404("Страница не найдена")
