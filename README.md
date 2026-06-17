# TCL Fashion — Website

A starter online store for TCL Fashion: dresses for prom, wedding guest, graduation, and party occasions. Built as a simple website (HTML, CSS, JavaScript) that you can host for free and customize without needing to know how to code.

## What's already built

- A homepage with a hero section, scrolling announcement banner, occasion categories, and a product grid
- A working shopping bag (add items, see them in a slide-out drawer, remove them)
- Filtering products by occasion (Prom / Wedding Guest / Graduation / Party)
- Mobile-friendly layout
- An email signup section
- Hover effect on product cards (the image "swaps" — ready for you to drop in a second photo or a short video per product)

## What's NOT built yet (on purpose)

Real checkout and payment processing. Right now the "Checkout" button is a placeholder. Setting up real payments needs a few decisions from you first — see "Connecting real payments" below.

## 1. Putting your own product photos in

Open `js/products.js`. Each product looks like this:

```js
{
  id: "p001",
  name: "Aurora Sequin Gown",
  category: "prom",
  tag: "BESTSELLER",
  price: 64.99,
  wasPrice: 89.99,
  mainColor: "linear-gradient(155deg, #FF9EC4, #FF2D6B)",
  altColor: "linear-gradient(155deg, #FF2D6B, #E0114F)",
}
```

Right now `mainColor` and `altColor` are just colored placeholders so the site looks finished before you have real photos. To use a real photo or video instead, replace those two lines with:

```js
mainImage: "images/aurora-gown-1.jpg",
altMedia: "images/aurora-gown-2.jpg",   // or a .mp4 video
```

Then add your photo files into the `images` folder. (If you want, send me a batch of real product photos later and I can wire this part up properly so it's plug-and-play.)

- `category` must be one of: `prom`, `wedding`, `graduation`, `party`
- `tag` can be `"NEW"`, `"BESTSELLER"`, or `null` for no badge
- `wasPrice` is optional — only add it if the item is on sale

## 2. Changing text, colors, or the brand name

- Site text (headlines, button labels, footer links) lives in `index.html`
- Colors live at the very top of `css/styles.css` under `:root` — change the hex codes there and it updates everywhere
- The logo is just the text "TCL." — if you design a real logo image later, swap it in easily

## 3. Hosting it for free (GitHub Pages)

1. Create a free GitHub account if you don't have one, and a new repository (e.g. `tcl-fashion`)
2. Upload all the files in this folder to that repository
3. In the repository, go to **Settings → Pages**
4. Under "Source," choose the `main` branch and `/ (root)` folder, then save
5. GitHub will give you a live link like `https://yourusername.github.io/tcl-fashion/` within a few minutes

This gives you a real, working, free website. The downside: it's a static site, so anything that needs a server (real payments, order storage) needs an add-on, covered next.

## 4. Connecting real payments

Since you're selling to customers (likely across the EU), here's what real payment processing involves and the simplest path:

**Recommended: Stripe Payment Links or Stripe Checkout**
- You create an account at stripe.com (free to set up, small fee per transaction)
- For each product, you can create a "Payment Link" with no coding — Stripe gives you a URL
- You'd then connect each "Quick Add" or product button to that link, OR upgrade to Stripe Checkout, which needs a small backend (a simple serverless function) to create a checkout session per cart. This is a bit more work but supports a real multi-item cart properly.

I can build either version for you — happy to do that as a next step once you're ready, just let me know which (simple payment links per product vs. full cart checkout).

**Important for selling dresses sourced from China into the EU/Spain:**
- Since 2021, the EU removed the import VAT exemption for low-value parcels, and from 2026 the duty-free threshold for low-value imports is also being phased out — so factor potential import VAT/duties into your pricing or be upfront with customers that extra fees may apply on delivery
- You'll want clear shipping time expectations on the site since items are coming from overseas (this template already includes a "Fast EU Shipping" note in the brand strip — update it to be accurate once you know real shipping times from your supplier)
- I'm not a lawyer or tax advisor, so it's worth a quick search or a chat with a local gestoría/accountant about VAT registration requirements for online selling in Spain before you launch

## 5. Folder structure

```
tcl-fashion/
├── index.html          ← the page structure & content
├── css/
│   └── styles.css      ← all visual styling
├── js/
│   ├── products.js     ← your product list (edit this often)
│   └── app.js          ← site behavior (cart, filtering, etc.)
└── images/             ← put your product photos/videos here
```

## Questions or want the next version?

Once you have real product photos and know whether you want simple payment links or a full cart checkout, just come back and I can wire that part up.
