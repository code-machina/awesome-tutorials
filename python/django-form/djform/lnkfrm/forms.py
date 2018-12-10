"""Customized Django Forms(사용자 정의 장고 폼)

"""
from django import forms
from .models import Profile, FamilyMember
from django.forms.formsets import BaseFormSet
from django.forms import inlineformset_factory, ModelForm

class FamilyMemberForm(ModelForm):
    class Meta:
        model = FamilyMember
        exclude = ()

FamilyMemberFormSet = inlineformset_factory(Profile, FamilyMember, form=FamilyMemberForm, extra=1)