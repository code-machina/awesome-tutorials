# Index, About & Linking

using `{% url 'index' %}` Jinja expression, You can link between documents.

- Modify `partials/_navbar.html` to link between two documents.
  - Instead of `index.html`, Use `{% url 'index' %}` expression
    - `index` must be registered in `pages.urls.py` like the below code
      - We pass the `name` argument's value through path method.
  - Use `if-else-endif` cluase to hightlight the navbar text when you move to another pages.

```python
urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('listing', views.listing, name='listing'),
]
```

Description : `nav-item active mr-3` is a list of class which bootstrap css provides. especially `active` keyword highlight the text. So, we can use the keyword to emphasize the current location of guest. therefore, we need to switch off/on according to the user access link.

If user access to `${scheme}://${domain_name}:${port}/`, The text `HOME` will be highlighted.
If user access to `${scheme}://${domain_name}:${port}/about`, The text `ABOUT` will be highlighted.
And then, If user access to `${scheme}://${domain_name}:${port}/listing`, The text `FEATURED LISTINGS` will be highlighted.

```html
<li
    {% if '/' == request.path %}
    class="nav-item active mr-3"
    {% else %}
    class="nav-item mr-3"
    {% endif %}
>
    <a class="nav-link" href="{% url 'index' %}">Home</a>
</li>
```

## Conclusions

Now, You can link between over two documents using `url expression` in html.

Let's move to next session

- [Listings URLs & Template][1]

<!-- Reference Links -->

[1]: ./DAY-5.md "Listings URLs & Template"