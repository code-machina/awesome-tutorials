# Pagination, Order and Filter

Today, We're gonna enhance `listings.views.index` method.

- Add `Pagination` Features

```python
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

from .models import Listing

def index(request):
    # listings = Listing.objects.all()
    listings = Listing.objects.order_by('-list_date').filter(is_published=True)
    # Paginator 생성
    paginator = Paginator(listings, 3)
    # Get page 파라미터 
    page = request.GET.get('page')
    # get paged list
    paged_listings = paginator.get_page(page)
    context = {
        'listings': paged_listings
    }

    return render(request, 'listings/listings.html', context=context)
```

## Conclusions

Now we can filter objects in the view. :)

Let's move to next session.

- [Single Listing Page][1]

<!-- Reference Links -->

[1]: ./DAY-10.md "Single Listing Page"
