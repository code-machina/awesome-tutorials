# Make Your First Django App

```bash
$> python manage.py startproject btre
$> python manage.py migrate
$> python manage.py startapp pages
```

## View 추가

View 를 추가한다.

- Edit `pages/urls.py`
- import `django.urls.path`

```python
# 같은 폴더의 views.py 파일을 임포트한다.
from . import views

urlpatterns = [
    path('', views.index, name='index')
]
```

- Edit `pages/views.py`

```python
def index(request):
    return HttpResponse("<h1>Hello World</h1>")
```

- Edit `btre/urls.py`
- import `django.urls.include`

```python
urlpatterns = [
    path('', include('pages.urls'))
    # .. (생략)
]
```

## Template 추가

- Edit `btre.settings.py`

```python
TEMPLATES = [
    {
        # 생략 ....
        'DIRS': [ os.path.join(BASE_DIR, 'templates')],
        # 생략 ....
    }

]

```

- Create `templates` folder in root director
- Create `base.html` file in `templates` folder
- Create `pages` folder in `templates` folder
- Create `index.html`, `about.html` files in `pages` folder
- Modify `pages.views.py`, `pages.urls.py`
  - Add another url(), and view(`about`).
  - Use render method to render templates

TIP. Django use Jinja frameworks to render html templates, So You should follow jinja tag syntax

TIP. Also, vscode support jinja syntax checker. search the keyword `jinja` and then install it.

- `base.html`

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>BT Real Estate</title>
</head>
<body>
    <!-- Open Jinja Tags -->
    {% block content %} {% endblock %}
</body>
</html>
```

- `templates/index.html`

```html
 {% extends 'base.html' %}

 {% block content %}
 <h1>HOME</h1>
 {% endblock %}
```

- `templates/about.html`

*Skipping*

- pages.urls.py
  - Add another path into `urlpatterns`

```python
urlpatterns = [
    # skipping ...
    path('about', views.about, name='about'),
]
```

- pages.views.py
  - Path must be relative path. like `pages/index.html`
  - After setting `TEMPLATES` global variables in `settings.py`, Consider `templates` folder as root folder for every template files(`*.html`).

The below tree is a map that describe the folder hierarchy.

```shell
C:.
├───btre
│   └───__pycache__
├───pages
│   ├───migrations
│   │   └───__pycache__
│   └───__pycache__
└───templates (root for templates)
    └───pages
```

See render function ...

```python
def index(request):
    # return HttpResponse('<h1>Hello World </h1>')
    return render(request, 'pages/index.html')

def about(request):
    return render(request, 'pages/about.html')
```

## Conclusions

Now you can create django app in your project and make some template to be rendered by django framework (technically, being rendered by Jinja framework)

In The Next Session, We're gonna handle static file and paths.

- [Django 'Static Files & Paths'][1]

<!-- Reference Links -->

[1]: ./DAY-2nd.md "Django 'Static Files & Paths'"