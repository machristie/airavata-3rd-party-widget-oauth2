# Getting started

## Using Python 3.8

1. Create a virtual environment

   ```
   python3.8 -m venv venv
   source venv/bin/activate
   ```

2. Run simple http server

   ```
   python -m http.server 8100
   ```

3. Put these entries in /etc/hosts

   ```
   # Added for testing third party widget JS
   127.0.0.1 publisher.local
   127.0.0.1 django.local
   ```

4. Then open http://publisher.local:8100.

## Run Keycloak

In airavata ide-migration, run `docker-compose up`

## Run Airavata Django portal

```
mkdir django_airavata/static/widget
cd django_airavata/static/widget
ln -s /path/to/airavata-3rd-party-widget-oauth2/widget.js
```

# Log

## 2020-05-02

### Add Login UI to widget

- created new client in Keycloak
    - Valid Redirect URI: http://publisher.local:8100/
    - Web Domain: http://publisher.local:8100/

- following instructions here: https://www.keycloak.org/docs/4.8/securing_apps/index.html#_javascript_adapter



