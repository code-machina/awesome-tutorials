# Django Form 정리

## Topic : Formset 활용하기


## django-widget-tweaks 

모듈을 설치하고 사용해본다. 해당 모듈은 다음의 출처를 통해 알게되었음

![Django Forms and Boostrap CSS classes and divs](https://stackoverflow.com/questions/8474409/django-forms-and-bootstrap-css-classes-and-divs)

```bash
pip install django-widget-tweaks
```

* Sample Code

```python
INSTALLED_APPS = [
    ...
    'widget_tweaks',
    ...
]
```

```html
{% load i18n widget_tweaks %}

<form class="form-horizontal" role="form" action="." method="post">
    {% csrf_token %}
    {% for field in form %}
        {% if field.errors %}
            <div class="form-group has-error">
                <label class="col-sm-2 control-label" for="id_{{ field.name }}">{{ field.label }}</label>
                <div class="col-sm-10">
                    {{ field|attr:"class:form-control" }}
                    <span class="help-block">
                        {% for error in  field.errors %}{{ error }}{% endfor %}
                    </span>
                </div>
            </div>
        {% else %}
            <div class="form-group">
                <label class="col-sm-2 control-label" for="id_{{ field.name }}">{{ field.label }}</label>
                <div class="col-sm-10">
                    {{ field|attr:"class:form-control" }}
                    {% if field.help_text %}
                        <p class="help-block"><small>{{ field.help_text }}</small></p>
                    {% endif %}
                </div>
            </div>
        {% endif %}
    {% endfor %}
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-primary">{% trans "Submit" %}</button>
        </div>
    </div>
</form>
```