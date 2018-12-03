from django.shortcuts import render
from django.views.generic.list import ListView

# Create your views here.

from lemon.models import Lemon

class LemonView(ListView):
    model = Lemon
    template_name = 'lemon/lemon_list.html'
    paginate_by = 24
    
    def get_context_data(self, **kwargs):
        context = super(LemonView, self).get_context_data(**kwargs)
        return context