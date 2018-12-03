# Accounts & Authentication Part 1

We're gonna make some registration, login form to meet people greetingly. :)

Here are steps to go through.

- Create new `accounts` app
  - register `accounts` app in `settings.py`
  - create template `accounts/login.html`, `accounts/register.html`. `accounts/dashboard.html`
  - set up url path like below
    - `$DOMAIN_NAME:8000/accounts/` will redirect you to `accounts` app
    - register each url path `accounts/login`, `accounts/dashboard`, `accounts/register` to your accounts app.
  - Edit `templates/partials/_navbar.html`
  - Done
- Create Message alert function when you mistype a registration form.
  - modify `settings.py` to add messsage types
  - create `partials/_alerts.html`
    - you will need a knowledge of bootstrap

I'm gonna fill out requirement step-by-step. LoL ~ :)

- create app

```bash
$> python manage.py startapp accounts
```

- register app to your project.

```python
INSTALLED_APPS = [
    # skipping ....
    'accounts',
]
```

- create template

```bash
$> mkdir -p templates/accounts
$> echo "<h1>Login</h1>" > templates/accounts/login.html
$> echo "<h1>register</h1>" > templates/accounts/register.html
$> echo "<h1>dashboard</h1>" > templates/accounts/dashboard.html
```

- edit `templates/partial/_navbar.html` to modify login, register, dashbard url
  - I add some Jinja markups, to emphasize current location.

```html
<ul class="navbar-nav ml-auto">
    <li
        {% if 'register' in request.path %}
        class="nav-item active mr-3"
        {% else %}
        class="nav-item mr-3"
        {% endif %}
    >
        <a class="nav-link" href="{% url 'register' %}">
            <i class="fas fa-user-plus"></i> Register</a>
    </li>
    <li
        {% if 'login' in request.path %}
        class="nav-item active mr-3"
        {% else %}
        class="nav-item mr-3"
        {% endif %}
    >
        <a class="nav-link" href="{% url 'login' %}">
            <i class="fas fa-sign-in-alt"></i>

            Login</a>
    </li>
</ul>
```

- create url path pattern
  - In `btre.urls.py`, add `accounts/` pattern and link it to `accounts` app
  - In `accounts.urls.py`, type 4 url patterns to render each designated request.

```python
# btre/urls.py
# skipping ...
urlpatterns = [
    # skipping ...
    path('accounts/', include('accounts.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

```python
# import django.urls
from django.urls import path

from . import views


urlpatterns = [
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('logout', views.logout, name='logout'),
    path('dashboard', views.dashboard, name='dashboard'),
]
```

- Add some view method
  - login
  - register
  - dashboard
  - and logout

```python
from django.shortcuts import render, redirect

def register(request):
    return render(request, 'accounts/register.html')

def login(request):
    return render(request, 'accounts/login.html')

def logout(request):
    return redirect('index')

def dashboard(request):
    return render(request, 'accounts/dashboard.html')
```

Now, you will see the page that you made. :)

I did skip a detailed html code. Just see the `templates/accounts/` folder. Sorry for that.

We want to show up alert message when you submit registration form.

> COMMENT(@gbkim): `MESSAGE_TAGS` is a message constants. when every app send error type to project, django framework support to propagate the message over project.

```python
# btre/settins.py
# skipping ...
# at the end of documents

# Messages
from django.contrib.messages import constants as messages
MESSAGE_TAGS = {
    messages.ERROR: 'danger',
}
```

- Add some messages to let user notice their missing things.

> COMMENT(kor,@gbkim) : 아래의 구문은 장고의 철학을 알게해주는 내용이다. 단순히 에러를 리턴하는.... 것이 아닌 framework 의 메시지 상수를 이용하여 전역적으로 적용이 가능하다.

```python
from django.contrib import messages

def register(request):
    if request.method == 'POST':
        # define error types.
        messages.error(request, 'Testing error message')
        return redirect('register')
    else:
        return render(request, 'accounts/register.html')
```

- message alert (boostrap)
  - #message.container
    - .alert .alert-{{tag}} .alert-dismissible .text-center
    - close

```html
{% if messages %}
    {% for message in messages %}
        <div id="message" class="container">
            <div class="alert alert-{{ message.tags }} alert-dismissible text-center" role="alert">
                <button class="close" type="button" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>
                <strong>
                    {% if message.level == DEFAULT_MESSAGE_LEVELS.ERROR %}
                        Error
                    {% else %}
                        {{ message.tags|title }}
                    {% endif %}
                </strong>
                {{ message }}
            </div>
        </div>
    {% endfor %}
{% endif %}
```

## Conclusions

Now we did make several forms and alert message. :)

Let's move to next session.

- [Account & Authentication Part 2][1]

<!-- Reference Links -->

[1]: ./DAY-12.md "Account & Authentication Part 2"
