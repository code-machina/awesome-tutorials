# Single Listing Page

We're gonna create `single listing page`.

- Modify `listings.views.listing` method to pass parameters.
- Create `templates/listings/listing.html` and then set up `skeleton code`.
- Import published `templates/listings/listing.html`.

- Create `listings.choices.py` and then copy the contents of link`https://raw.githubusercontent.com/bradtraversy/btre_project/master/listings/choices.py`

- Modify `listings.views.listing` emthod
  - Tip. We should focus on `get_object_or_404`.
    - If there is no data by primary key, it will redirect to 404 error page.
    - @TODO: Advanced Usage : Declare Custom 404 Error Page.

```python
def listing(request, listing_id):
    # Simple Solution
    listing = get_object_or_404(Listing, pk=listing_id)
    context = {
        'listing': listing
    }
    return render(request, 'listings/listing.html', context)
```

- Skeleton Code
  - Embed Template `templates/listings/listing.html`.
    - I'm doing this. It's now quite easy for us to do it. :)

```html
{# import base template from templates/base.html #}
{% extends 'base.html' %}

{% load humanize %}

{% block content %}

{% endblock %}
```

- listings.choices.py

```python
bedroom_choices = {
    # skipping ...
}

price_choices = {
    # skipping ...
}

state_choices = {
    # skipping ...
}
```

```
```

## Conclusions

Now we did make single listing page. :)

Let's move to next session.

- [Account & Authentication Part 1][1]

<!-- Reference Links -->

[1]: ./DAY-11.md "Account & Authentication Part 1"
