# AGENTS.md

This repository is currently empty — no source code, no config, no tooling.

When content is added, re-run the repo-scan workflow to populate this file with verified commands, architecture notes, and conventions.
---


**Crafting a prompt for OpenCode**

I see the user is asking for a prompt to create a mobile shop website with a clean and modern design. It sounds like I should clarify their desired features, but I can make some educated guesses about what they might want. I'll craft a detailed prompt that includes sections on purpose, pages, features, design direction, tech stack, and constraints. Since they’re communicating in English, I'll respond in the same language, assuming they mean OpenCode.**Designing the prompt for OpenCode**

I think I should include essential e-commerce functions like home, categories, product details, search/filter, cart, checkout, authentication, wishlist, order tracking, and maybe an admin panel, depending on what the user means by "all future." Since they might have a typo there, I'll interpret it as including all features. I’ll create a polished prompt in a code block for OpenCode, emphasizing the request to build a responsive mobile-first shop website with a clean design, avoiding generic AI UI. I could suggest using Next.js, Tailwind, and shadcn/ui but note the stack can be adjusted.**Formulating the prompt in English**

I should keep the response in English, so let’s create a clear introduction and then present the prompt. I could mention that if the user wants, I can write a version using HTML/CSS, React, or Next.js, but I might hold off on that for now. I’ll focus on crafting a strong and concise prompt. Using markdown with a code block should help format it nicely. Also, I’ll note to write “features” instead of “future” to avoid any confusion.

Absolutely — here’s a strong prompt you can paste into OpenCode:

```text
Build a modern, clean, mobile-first e-commerce website for a mobile shop.

Goal:
Create a professional mobile phone store website that feels premium, trustworthy, and easy to use. The UI should be clean, modern, responsive, and visually polished with a professional design. Focus on making the shopping experience simple and fast on mobile devices.

Tech stack:
Use a modern frontend stack like Next.js + Tailwind CSS + shadcn/ui if possible. Make it fully responsive and production-ready.

Design direction:
- Clean and modern layout
- Professional e-commerce look
- Elegant spacing and strong typography
- Use a refined color palette with white, dark gray, soft neutral backgrounds, and one strong accent color
- Avoid clutter and avoid generic “template” look
- Smooth shadows, rounded corners, subtle gradients, and polished cards
- Mobile-first design with excellent usability on small screens
- Add subtle animations and hover/tap interactions
- Keep the interface premium and minimal, not noisy

Pages and sections to include:
1. Home page
   - Top nav with logo, search, cart icon, and menu
   - Hero banner with call-to-action
   - Featured categories
   - Best selling phones
   - New arrivals
   - Discount / offer section
   - Trusted brands section
   - Customer reviews
   - Footer

2. Product listing page
   - Search bar
   - Filter by brand, price, storage, color, rating
   - Sort options
   - Product cards with image, name, price, rating, and discount badge

3. Product details page
   - Product image gallery
   - Product name, price, discount, rating, availability
   - Storage / color selection
   - Add to cart / buy now buttons
   - Product description
   - Specs section
   - Reviews and related products

4. Cart page
   - Selected products
   - Quantity controls
   - Price summary
   - Coupon code field
   - Checkout button

5. Checkout page
   - Shipping form
   - Payment method selection
   - Order summary
   - Place order button

6. Wishlist page
   - Save favorite products
   - Easy move to cart

7. Account / profile page
   - Personal details
   - Orders
   - Saved addresses
   - Wishlist

Features to add:
- Mobile-friendly navigation
- Search functionality
- Category browsing
- Product filters and sorting
- Product comparison if possible
- Wishlist
- Cart management
- Checkout flow
- Order summary
- Ratings and reviews
- Offer badges and sale labels
- Delivery information
- Product availability status
- Dark or light mode if possible
- Smooth page transitions
- Reusable UI components
- Clean empty states and loading states

Product content:
Use realistic mobile phone products from popular brands like Apple, Samsung, Xiaomi, OnePlus, Google Pixel, Oppo, Vivo, and Nothing.

UI quality requirements:
- Make the design feel premium and trustworthy
- Use consistent spacing and alignment
- Use readable font sizes for mobile
- Buttons must be large and easy to tap
- Cards should have clear hierarchy
- Ensure accessibility and good contrast
- The UI should look like a real store, not a demo
- Avoid default-looking components

Important:
- Build the full website, not just a landing page
- Keep the code clean, organized, and reusable
- Make it fully responsive on mobile, tablet, and desktop
- Focus on a polished shopping experience
- Do not use generic or ugly UI patterns
- The final result should look modern, professional, and production-ready

If possible, include a beautiful homepage first and then create the rest of the shopping flow.
```

If you want, I can also make this prompt:
1. use netjs and use latest version Next.js