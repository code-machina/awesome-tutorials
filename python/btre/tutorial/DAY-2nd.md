# Static Files and Paths

It's quite confusing one. So I split it from the `Day first session`.

I've arleady prepared `assets` folder to minimize your efforts, and then purely focus on django.

> TIP. Publishing works are different from backend development. So, If you improve your design, you just make some html files and test it using chrome browser. after that, you can easily update it to merge front-end code into django.

- Copy `assets` into `btre/static`
  - BE CAUTIOUS: `btre > btre > static > assets`
- Add global variables in `btre.settings.py`
  - asdfsdf
- Commanding `python manage.py collectstatic` in your terminal

- `btre/static`

Here is the folder structure in `btre`.

```bash
C:.
├───btre
│   ├───static
│   │   ├───css
│   │   ├───img
│   │   │   └───lightbox
│   │   ├───js
│   │   └───webfonts
│   └───__pycache__
|   └─── settings.py
# skipping ...
```

- `btre.settings.py`

```python
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'btre/static'),
]
```

- Commanding "Copying `btre/static` to `../static`"

```bash
$> python manage.py collectstatic

├───static
│   ├───admin
│   │   ├───css
│   │   │   └───vendor
│   │   │       └───select2
│   │   ├───fonts
│   │   ├───img
│   │   │   └───gis
│   │   └───js
│   │       ├───admin
│   │       └───vendor
│   │           ├───jquery
│   │           ├───select2
│   │           │   └───i18n
│   │           └───xregexp
│   ├───css
│   ├───img
│   │   └───lightbox
│   ├───js
│   └───webfonts
└───templates
    └───pages
```

## Conclusions

Now, You can use the static files to beautify your web site. :)

Next session, we will beautify html code importing css, js files into our html code.

Let's move to next session

- [Bootstrap Layout Markup][1]

<!-- Reference Links -->

[1]: ./DAY-3rd.md "Bootstrap Layout Markup"