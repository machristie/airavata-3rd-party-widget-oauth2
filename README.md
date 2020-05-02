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

# Log

## 2020-05-02

### Add Login UI to widget

- created new client in Keycloak
    - Valid Redirect URI: http://publisher.local:8100/
    - Web Domain: http://publisher.local:8100/

