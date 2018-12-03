# Bootstrap Layout Markup

Today, We're going to handle Bootstrap CSS, and Javascript.

- Edit `teampltes/base.html` file.
- Create `partials` folder in your `templates` folder
- Create `_navbar.html`, `_topbar.html`, `_footer.html` in your `partials` folder

## Key Solutions

- `{% load static %}` will help you to load static files.
  - Every Script, Link tag must contain `Jinja` expressions like `{% %}`
  - It means that `djnago` replace the expression into `Accessible Path` referencing your global environments.

```html
{% load static %}
<!-- Font Awesome -->
<link rel="stylesheet" href="{% static 'css/all.css' %}">
<script src="{% static 'js/jquery-3.3.1.min.js' %}"></script>
```

- Put `{% include 'partials/_navbar.html' %]` into the inside of body tag
  - Splitting unit contents, like Navigation Bar, Top Bar, and Footer, from your index html code as much as possible because it will reduce the degree of complex.

```html
<!-- skipping ... -->
{% load static %}
<!DOCTYPE html>
<html>
<head>

</head>
<body>
<!-- Top Bar -->
{% include 'partials/_topbar.html' %}

<!-- Nav Bar -->
{% include 'partials/_navbar.html' %}

<!-- Open Jinja Tags -->
{% block content %} {% endblock %}

<!-- Footer -->
{% include 'partials/_footer.html' %}

</body>
</html>
```

The tree of templates folder

- `base.html` include `_footer.html`, `_navbar.html`, and `_footer.html`.

```bash
C:.
│   base.html
│
├───pages
│       about.html
│       index.html
│
└───partials
        _footer.html
        _navbar.html
        _topbar.html
```

Linking static file in `_navbar.html`

```html
{% load static %}
<!-- Skipping ... -->
<img src="{% static 'img/logo.png' %}" class="logo" alt="">
<!-- Skipping ... -->
```

## Conclusions

Now, You can split index.html into partial files and then merge them using `jinja expression`.

Let's move to next session

- [Index, About & Linking][1]

<!-- Reference Links -->

[1]: ./DAY-4.md "Index, About & Linking"