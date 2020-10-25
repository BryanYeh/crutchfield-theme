# Modified [Crutchfield](https://www.crutchfield.com) theme for Shopify store

Under Development

## Setup
1. Get private app api access [Tutorial](https://shopify.github.io/themekit/#get-api-access)
2. Create ``config.yml`` and fill in your information
```
development:
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  directory: dist/
```
3. run ``theme watch`` in terminal and ``npm watch`` in another terminal
    - changes made in ``src`` folder will be copied over to ``dist`` folder automatically by ``npm watch``
    - any file changes in ``dist`` folder will be uploaded automatically by ``theme watch``
4. To make changes, edit theme files in ``src`` folder

### Made with
-[Themekit](https://github.com/Shopify/themekit)
-[Tailwind 1.9.5](https://tailwindcss.com/)

## License
Released under the [MIT License](https://opensource.org/licenses/MIT).