from django.forms import ModelForm
from django.forms import inlineformset_factory
from .models import FamilyMember, Profile

class FamilyMemberForm(ModelForm):
    class Meta:
        model = FamilyMember
        exclude = ()

FamilyMemberFormSet = inlineformset_factory(Profile, FamilyMember, form=FamilyMemberForm, extra=1)