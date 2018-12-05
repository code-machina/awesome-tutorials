from django.contrib import messages
from django.http.request import HttpRequest
from django.contrib.auth.decorators import login_required
# ISSUE: The django.core.urlresolvers module is removed in favor of its new location, django.urls.
from django.db import IntegrityError, transaction
from django.forms.formsets import formset_factory
from django.shortcuts import redirect, render
from lnkfrm.forms import LinkForm, BaseLinkFormSet, ProfileForm
from lnkfrm.models import UserLink
# Create your views here.

@login_required
def test_profile_settings(request: HttpRequest):
    """
    Allows a user to update their own profile
    사용자가 자신의 프로파일을 업데이트 할 수 있도록 허용
    """

    user = request.user

    # formset 을 생성, 사용할 form 과 formset 을 지정한다.
    LinkFormSet = formset_factory(LinkForm, formset=BaseLinkFormSet)

    # user 에 대한 link 데이터를 가져오고, 초기 데이터로 사용한다.
    user_links = UserLink.objects.filter(user=user).order_by('anchor')
    link_data = [{'anchor': l.anchor, 'url': l.url} for l in user_links]

    if request.method == "POST":
        profile_form = ProfileForm(request.POST, user=user)
        link_formset = LinkFormSet(request.POST)

        if profile_form.is_valid() and link_formset.is_valid():
            # Save user info
            user.first_name = profile_form.cleaned_data.get('first_name')
            user.last_name = profile_form.cleaned_data.get('last_name')
            user.save()

            new_links = []

            for link_form in link_formset:
                anchor = link_form.cleaned_data.get('anchor')
                url = link_form.cleaned_data.get('url')

                if anchor and url:
                    new_links.append(UserLink(user=user, anchor=anchor, url=url))

            try:
                with transaction.atomic():
                    # Replace the old with the new
                    UserLink.objects.filter(user=user).delete()
                    UserLink.objects.bulk_create(new_links)

                    messages.success(request, 'You have updated your profile.')
            except IntegrityError:
                messages.error(request, 'There was an error saving your profile.')
                return redirect('profile-setting')
    else:
        profile_form = ProfileForm(user=user)
        link_formset = LinkFormSet(initial=link_data)

    context = {
        'profile_form': profile_form,
        'link_formset': link_formset
    }
    return render(request, 'lnkfrm/edit_profile.html', context)
