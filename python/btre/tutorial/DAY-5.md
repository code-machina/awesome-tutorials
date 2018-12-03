# Listings URLs & Template

- Create `realtors`, `listings` app in your `btre` projects.
- Make `listings.urls.py` and Modify `listings.views.py` in your `listings` app.
- Modify some Breadcrumb, navigation bar to redirect browser to `/listings` url.

- Create two apps

```bash
$> python manage.py startapp listings
$> python manage.py startapp realtors
```

- Modify `btre.urls.py`

```python
urlpatterns = [
    # skipping ....
    path('listings/', include('listings.urls')),
    # skipping ....
]
```

- Create `listings.urls.py` and Typing a below code.
  - `<int:listing_id>` is a rule which, navigate request to `views.listing`, like '/listings/12'
    - It means that `Select * from listings_db where listing_id=12;`

```python
urlpatterns = [
    path('', views.index, name='listings'),
    path('<int:listing_id>', views.listing, name='listing'),
    ## /listings/23
    path('search', views.search, name='search'),
]
```

- Modify `listings.view.py`

```python
def index(request):
    return render(request, 'listings/listings.html')

def listing(request):
    return render(request, 'listings/listing.html')

def search(request):
    return render(request, 'listings/search.html')
```

- Modify `_navbar.html`
  - When you click the `Featured Listings` Menu, You will redirect to "listings (listings/listings.html)".

```html
<a class="nav-link" href="{% url 'listings' %}">Featured Listings</a>
```

- Modify `listings.html`
  - it will redirect you to `index` page

```html
<!-- Breadcrumb -->
<section id="bc" class="mt-3">
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{% url 'index' %}">
                <i class="fas fa-home"></i> Home</a>
            </li>
```

## Conclusions

Now we can wire two apps in a single web application.

Let's move to next session.

- [Django Postgres Setup & Migrate][1]

<!-- Reference Link -->

[1]: ./DAY-6.md "Django Postgres Setup & Migrate"