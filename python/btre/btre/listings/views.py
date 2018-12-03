from django.shortcuts import render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
# from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from .models import Listing
from .choices import state_choices, bedroom_choices, price_choices

def index(request):
    # listings = Listing.objects.all()
    listings = Listing.objects.order_by('-list_date').filter(is_published=True)

    paginator = Paginator(listings, 3)
    page = request.GET.get('page')
    paged_listings = paginator.get_page(page)
    
    context = {
        'listings': paged_listings
    }
    return render(request, 'listings/listings.html', context=context)


# Create your views here.
# def index(request):
#    return render(request, 'listings/listings.html')

def listing(request, listing_id):
    # try:
    #    listing = Listing.objects.get(id=listing_id)
    #except ObjectDoesNotExist:
    #    listing = None
    #context = {
    #    'listing': listing
    #}
    # Simple Solution
    listing = get_object_or_404(Listing, pk=listing_id)
    context = {
        'listing': listing
    }
    return render(request, 'listings/listing.html', context)

def search(request):
    queryset_list = Listing.objects.order_by('-list_date')

    keywords = request.GET.get('keywords')
    city = request.GET.get('city')
    state = request.GET.get('state')
    bedrooms = request.GET.get('bedrooms')
    price = request.GET.get('price')

    if keywords:
        queryset_list = queryset_list.filter(description__icontains=keywords)
    if city:
        # iexact : 정확히 매칭
        queryset_list = queryset_list.filter(city__iexact=city)
    if state:
        queryset_list = queryset_list.filter(state__iexact=state)
    if bedrooms:
        queryset_list = queryset_list.filter(bedrooms__lte=bedrooms)
    if price:
        queryset_list = queryset_list.filter(price__lte=price)
    paginator = Paginator(queryset_list, 3)
    page = request.GET.get('page')
    queryset_list = paginator.get_page(page)

    context = {
        'state_choices': state_choices,
        'bedroom_choices': bedroom_choices,
        'price_choices': price_choices,
        'listings': queryset_list,
        'values': request.GET
    }
    

    return render(request, 'listings/search.html', context)