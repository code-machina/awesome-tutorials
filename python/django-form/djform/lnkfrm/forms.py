"""Customized Django Forms(사용자 정의 장고 폼)

"""
from django import forms
from django.forms.formsets import BaseFormSet

class LinkForm(forms.Form):
    """
    개별 사용자 링크를 위한 Form, Anchor 와 Url 을 입력으로 받음
    Form for user link
    """

    anchor = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Link Name / Anchor Text',
        }),
        required=False)
    url = forms.URLField(
        widget=forms.URLInput(attrs={
            'placeholder': 'URL',
        }),
        required=False)

class ProfileForm(forms.Form):
    """
    자신의 사용자 정보를 업데이트하는 Form(폼)
    (별도의 formset(폼셋) 을 통해 처리되는 링크는 제외)
    Form for user to update their own profile details
    (excluding links which are handled by a seperate formset)
    """

    def __init__(self, *args, **kwargs):
        # user 키를 pop 하고 없으면 None 을 반환
        self.user = kwargs.pop('user', None)
        # 상위 클래스를 주어진 인자로 초기화한다. 단, user 정보는 pop 하였으므로 전달되지 않음
        super(ProfileForm, self).__init__(*args, **kwargs)

        # self.fields 의 타입은 OrderedDict 이다.
        self.fields['first_name'] = forms.CharField(
            max_length=30,
            initial=self.user.first_name,
            widget=forms.TextInput(attrs={
                'placeholder': 'First Name',
            }))
        self.fields['last_name'] = forms.CharField(
            max_length=30,
            initial=self.user.last_name,
            widget=forms.TextInput(attrs={
                'placeholder': 'Last Name',
            }))

# Topic: forms.fields 의 required False 의 이유
# formset 에 validation을 추가
# field 에 required 를 True 로 하지 않는 이유
# > 비어있는 폼을 제출하는 것을 방해하므로 사용성(usability)에 지장
# > 비어있는 폼이 제출될 경우 이를 무시하는 것이 사용성 측면(usability perspective)에서 좋음
# > 폼이 부분적으로 불완전한 경우 에러 처리를 한다.

class BaseLinkFormSet(BaseFormSet):
    """Custom Django Link Formset(사용자 정의 Django Link 폼셋)
    Anchor 와 Url 을 입력받는 폼셋(formset)을 정의하여 사용한다.
    """

    def clean(self):
        """
        검증 로직을 추가한다.
         - 두 링크가 동일한 anchor 또는 URL 을 가지지 않도록 한다.
         - 모든 링크가 anchor 와 URL 을 가지도록 한다.
        """
        if any(self.errors):
            return
        anchors = []
        urls = []
        duplicates = False
        for form in self.forms:
            if form.cleaned_data:
                print(type(form))
                anchor = form.cleaned_data['anchor']
                url = form.cleaned_data['url']
                # anchor 와 url 이 제출된 경우
                if anchor and url:
                    if anchor in anchors:
                        duplicates = True
                    anchors.append(anchor)

                    if url in urls:
                        duplicates = True
                    urls.append(url)
                if duplicates:
                    raise forms.ValidationError(
                        'Link 는 반드시 고유한 anchor 와 URL 을 가져야합니다.',
                        code='duplicate_links'
                    )
                # url 만 제출된 경우
                if url and not anchor:
                    raise forms.ValidationError(
                        'All links must have an anchor',
                        code='missing_anchor'
                    )
                # anchor 만 제출된 경우
                elif anchor and not url:
                    raise forms.ValidationError(
                        'All links must have an URL',
                        code='missing_URL'
                    )
