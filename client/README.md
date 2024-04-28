## Sveltekit and Pocketbase template

This is a template I created as a basis for a few of my own projects. It uses the latest stable version of SvelteKit (Svelte 4, but I plan to update to Svelte 5 when it is fully released), Pocketbase and Tailwind with DaisyUI.

Current features:

[x] - Register via email
[x] - Register via Google
[x] - Light and dark mode toggle
[x] - Uploading an avatar

### Setup the backend

To set this up you'll need to download or clone this repo:

```bash
git clone https://github.com/kilroyjones/sveltekit-pocketbase
```

You'll need to download the Pocketbase executable appropriate for your system and place it in the **backend** folder. On Linux and similar systems you can run it as:

```bash
./pocketbase serve
```

You will then need to go to [http://127.0.0.1:8090/\_/](http://127.0.0.1:8090/_/) and set up your admin login and password. If you go to collections (left sidebar menu) you'll find there is already a default user's table. You can make the necessary modifications via the sidebar **Settings** and then do **Import Collections** using the **backend/schema.json** in the **backend/** folder or you can modify it to match the following structure:

```bash
user {
  "id": <string>,
  "username": <string>,
  "email": <string>
  "email": <string>,
  "avatar": <string>,
  "avatarUrl": <string>,
  "created": <date>,
  "update": <date>
}
```

You will then need to set your Google Oauth credentials which you can get from your [Google console](https://console.cloud.google.com/). In Pocketbase you'll add these under **Settings** and **Auth providers**.

### Setup the frontend

From the **client** folder run:

```bash
npm run install
```

Next, you'll need to change **template.env** to **.env** and make sure it has the following to get local development working:

```
PUBLIC_DATABASE_URL=http://127.0.0.1:8090
REDIRECT_URL=http://localhost:5173/account/oauth/
```

After you should be ready to go.

### Making modifications

Since this is using DaisyUI you have access to different themes, which can be changed in **ToggleLightDarkMode.svelte**:

```javascript
const dark = 'synthwave';
const light = 'cupcake';
```

Just make sure they're added in the **tailwind.config.js**:

```json
daisyui: {
    themes: ['light', 'dark', 'cupcake', 'synthwave']
}
```
