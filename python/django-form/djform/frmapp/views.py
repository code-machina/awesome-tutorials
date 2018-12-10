from django.shortcuts import render, redirect
from .forms import NameForm, ContactForm

# Create your views here.
def register(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            print("OK")
            return redirect("/admin")
    else:
        context = {
            'form': ContactForm()
        }

        return render(request, 'frmapp/register.html', context)