# Pull data from Listings Model

Finally, We are going to fetch data from database and then render it through our web browsers(chrome :))1

Let's see the `listings.views.py` module and add some code.

- Steps
  - Insert data records about realtor and real estate properties. (see the links)
  - Edit `listings.views.py` to add fetching statement in the `listings.views.index` method.
  - Edit `templates/listings/listings.html`.
    - We pass fetched object list from `index` method to jinja framework.
      - To express the data, you have to use some jinja statement.

- Jinja statement
  - `{{ listing.name }}` : get Realtor name from Listing model's instance.
  - `{% if expression_statement %} {% else %} {% endif %}` : If there is no Listing data, You have to express the message "No Listings Available".
  - `{% for element in iterable %} {% endfor %}` : You could iterate over iterable object `listings`, which are passed from `index` method.


> TIP. pylint-django mitigate pylint error.
>> Symptoms: When you import `Listing` model object from .models in `listings.views.py`, Syntax Error would occur, Like `Listing model doesn't have objects property`. This is because pylint doesn't know about django, So you have to set up pylint django plugin `pylint-django`. It could be installed by `pip install pylint-django`.

```json
    "python.linting.pylintArgs": [
        "--load-plugins=pylint_django"
    ]
```

- Re-define `listing.views.index`
  - fetch all the data from Listing objects.
  - declare local variable `context`, which is a dictionary type.
  - pass variable `context` to `render` method, parameter name's also same as passed variable.

```python
from .models import Listing

def index(request):
    listings = Listing.objects.all()

    context = {
        'listings': listings
    }

    return render(request, 'listings/listings.html', context=context)
```

- fixing `templates/listings.html`
  - key-1: `{% load humanize %}` humanize module
    - first, add `django.contrib.humanize` to installed app in `btre.settings.py`
    - second, insert `load humanize` into the beginning of `listings.html` file.
  - key-2: `{% for listing in listings %} {% endfor %}` expression
    - `listings.views.index` method pass `context` variable to template `listings.html` file.
    - you can feel free to iterate over the list of object `context.listings`
  - key-3: `{{listing.price | intcomma }}` expression get a value of dictionary using key `price` and then convert it into human readable value(`initcomma`).
    - If you wanna convert value using humanize module, just type pipe(`|`) character after the variable.
    - See [the reference of django.contrib.humanize module][1]. this will show you the list of keyword, which convert a value into human readable string.
  - key-4: `href={% url 'listing' listing.id %}` expression makes a link, which contains `listing.id` value as parameter. (http://localhost:8000/listings/1)

```python
INSTALLED_APPS = [
    # skipping ....
    'django.contrib.humanize',
    # skipping ....
]
```

```html
<section id="listings" class="py-4">
    <div class="container">
        <div class="row">
            {% if listings %}
                {% for listing in listings %}
                     <!-- Listing 1 -->
                    <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card listing-preview">
                                <img class="card-img-top" src="{{ listing.photo_main.url }}" alt="">
                                <div class="card-img-overlay">
                                    <h2>
                                        <span class="badge badge-secondary text-white">{{ listing.price | intcomma }}</span>
                                    </h2>
                                </div>
                                <div class="card-body">
                                    <div class="listing-heading text-center">
                                        <h4 class="text-primary">{{ listing.title }}</h4>
                                        <p>
                                            <i class="fas fa-map-marker text-secondary"></i> {{ listing.city }} {{ listing.state }} {{ listing.zip }} </p>
                                    </div>
                                    <hr>
                                    <div class="row py-2 text-secondary">
                                        <div class="col-6">
                                            <i class="fas fa-th-large"></i> {{ listing.sqft }}</div>
                                        <div class="col-6">
                                            <i class="fas fa-car"></i> Garage: {{ listing.garage }}</div>
                                    </div>
                                    <div class="row py-2 text-secondary">
                                        <div class="col-6">
                                            <i class="fas fa-bed"></i> Bedrooms: {{ listing.bedrooms }}</div>
                                        <div class="col-6">
                                            <i class="fas fa-bath"></i> Bathrooms: {{ listing.bathrooms }}</div>
                                    </div>
                                    <hr>
                                    <div class="row py-2 text-secondary">
                                        <div class="col-12">
                                            <i class="fas fa-user"></i> {{ listing.realtor.name }}</div>
                                    </div>
                                    <div class="row text-secondary pb-2">
                                        <div class="col-6">
                                            <i class="fas fa-clock"></i> {{ listing.list_date | timesince }} </div>
                                    </div>
                                    <hr>
                                    <a href="{% url 'listing' listing.id %}" class="btn btn-primary btn-block">More Info</a>
                                </div>
                            </div>
                        </div>
                {% endfor %}
            {% else %}
                <div class="col-md-12">
                    <p>No Listings Available</p>
                </div>
            {% endif %}
        </div>

        <div class="row">
            <div class="col-md-12">
                {% if listings.has_other_pages %}
                <ul class="pagination">
                    {% if listings.has_previous %}
                        <li class="page-item">
                            <a href="?page={{listings.previous_page_number}}" class="page-link">&laquo;</a>
                        </li>
                    {% else %}
                        <li class="page-item disabled">
                            <a class="page-link">&laquo;</a>
                        </li>
                    {% endif %}
                    {% for i in listings.paginator.page_range %}
                        {% if listings.number == i %}
                            <li class="page-item active">
                                <a class="page-link" href="#">{{i}}</a>
                            </li>
                        {% else %}
                            <li class="page-item">
                                <a href="?page={{i}}" class="page-link">{{i}}</a>
                            </li>
                        {% endif %}
                    {% endfor %}
                    {% if listings.has_next %}
                        <li class="page-item">
                            <a href="?page={{listings.next_page_number}}" class="page-link">&raquo;</a>
                        </li>
                    {% else %}
                     <li class="page-item disabled">
                            <a class="page-link">&raquo;</a>
                        </li>
                    {% endif %}
                </ul>
                {% endif %}
            </div>
        </div>
    </div>
</section>
```


## Conclusions

Now we can listing objects to the html page. :)

Let's move to next session.

- [Pagination, Order and Filter][2]

<!-- Reference Links -->

[1]: https://docs.djangoproject.com/ko/2.1/ref/contrib/humanize/ "the reference of django.contrib.humanize module"
[2]: ./DAY-9.md "Pagination, Order and Filter"
