# Media Folder & Adding Data

We're going to register `media` folder to save image files and then add sample data to load from database.

- Modify `btre.settings.py`

```python
# Media Folder Settings
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
```

- Modify `btre.urls.py`

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('pages.urls')),
    path('listings/', include('listings.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

- Add Realtor, and Listing data
  - Upload image and then check whether or not it could be access through your browser.
  - Update order `Realtor > Listing`

- Customize Admin Header, Logo
  - Create Folder (admin)
  - Create HTML File (`base_site.html`)
  - Create CSS File (`btre/static/css/admin.css`)
  - Modify `listings.admin.py`

```html
{% extends 'admin/base.html' %}
{% load static %}

{% block branding %}

<h1 id="head">
    <img src="{% static 'img/logo.png' %}" alt="BT Real Estate" height="50" width="80" class="brand_img"> Admin Area
</h1>

{% endblock %}

{% block extrastyle %}

<link rel="stylesheet" href="{% static 'css/admin.css' %}">

{% endblock %}
```

```css
#header {
    height: 10px;
    background-color: #10284e;
    color: #fff;
}

#branding h1 {
    color: #fff;
}

a:link,
a:visited {
    color: #10284e;
}

div.breadcrumbs {
    background: #30caa0;
    color: #10284e;
}

div.breadcrumbs.a {
    color: #333;
}

.module h2, .module caption, .inline-group h2 {
    background: #30caa0;
}

.button.default, input[type=submit].default, .submit-row input.default {
    background: #10284e;
}
```

|No|Property Name|Description|
|:---:|:---:|:---:|
|1|list_display|The list of columns in admin table|
|2|list_display_links|The columns which could redirect you to record|
|3|list_filter|filter table, which can filter the listed columns|
|4|list_editable|On the board, you can edit data without getting into the detailed view|
|5|search_fileds|It will generate search box automatically. You can search data among selected columns|
|6|list_per_page|The number of items per page (Pagination)|

```python
from .models import Listing

class ListingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published', 'price', 'list_date', 'realtor')
    list_display_links = ('id', 'title')
    list_filter = ('realtor', )
    list_editable = ('is_published',)
    search_fields = ('title', 'description', 'address', 'city', 'state', 'zipcode', 'price')
    list_per_page = 3

admin.site.register(Listing, ListingAdmin)
```

```python
from .models import Realtor

class RealtorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'hire_date')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    list_per_page = 25

admin.site.register(Realtor, RealtorAdmin)
```

## Conclusions

Now we can customize admin pages :)

Let's move to next session.

[Pull data from Listings Model][1]

<!-- Reference Links -->
[1]: ./DAY-8.md "Pull data from Listings Model"
