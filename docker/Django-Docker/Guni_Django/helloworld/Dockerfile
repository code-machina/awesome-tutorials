# FROM Official image
FROM python:3.6

# arbitrary location choice
RUN mkdir -p /opt/services/djangoapp/src
WORKDIR /opt/services/djangoapp/src

# install two dependencies
# RUN pip install gunicorn django

# install our dependencies
# we use --system flag because we don't need an extra virtualenv
COPY Pipfile Pipfile.lock /opt/services/djangoapp/src/
RUN pip install pipenv && pipenv install --system

COPY . /opt/services/djangoapp/src
RUN python manage.py collectstatic --no-input

EXPOSE 8000

CMD ["gunicorn", "--chdir", "helloworld", "--bind", ":8000", "helloworld.wsgi:application"]
