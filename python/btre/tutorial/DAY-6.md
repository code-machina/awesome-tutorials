# Django Postgres Setup & Migrate

Today, We are going to setup postgres settings and migrate using `django command (manage.py)`.

- Add the following code to your `btre.settings.py`.
- Migrate database
- Create superuser to access admin page.
- Design Database Schema
- Create Django Model (`Listing`, `Realtor`)
- Customize Admin Model to use it for `Listing` model.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'btredb',
        'USER': 'postgres',
        'PASSWORD': '1234',
        'HOST': 'localhost'
    }
}
```

```bash
$> python manage.py migrate
$> python manage.py createsuperuser
```

- Map out Database Schema.

- App Requirements: LISTING PAGE FIELDS
  - Title
  - Address, city, state, zip
  - Price
  - Bedrooms
  - Bathrooms
  - Square Feet
  - Lot Size
  - Garage
  - Listing Date
  - Realtor - Name & Image
  - Main image and 5 other images

```text
MODEL/DB FIELDS

### LISTING
id: INT
realtor: INT(foreign key [realtor])
title: STR
address: STR
city: STR
state: STR
zipcode: STR
description: TEXT
price: int
bedrooms: int
bathrooms: int
garage: int
sqft: int
lot_size: float
is_published: BOOL [true]
list_date: DATE
photo_main: STR
photo_1: STR
photo_2: STR
photo_3: STR
photo_4: STR
photo_5: STR
photo_6: STR

### REALTOR

id: INT
name: STR
photo: STR
description: TEXT
email: STR
phone: STR
is_mvp: boolean
hire_date: DATE

### CONTACT

id: INT
user_id: int
listing: int
listing_id: INT
name: STR
email: STR
phone: STR
message: TEXT
contact_date: DATE

```

- Create Migration file.
  - The Below Steps are really important because you can check what you have done in models.py.

```bash
# make migration file
$> python manage.py makemigrations
# check migration before comming it. 
$> python manage.py sqlmigrate listings 0001
# Execute migration
$> python manage.py migrate

```

- Modify `listings.admin.py`
  - As you register Listing model, You can add some records through Admin Site.

```python
from .models import Listing

admin.site.register(Listing)
```

- Modify `realtors.admin.py` as same as `listings`
  - It's same as `Listing`

```python
from .models import Realtor

admin.site.register(Realtor)
```

## Conclusions

Now we had finsihed up this session

Let's move to next session.

[Media Folder & Adding Data][1]

<!-- Reference Links -->
[1]: ./DAY-7.md "Media Folder & Adding Data"
