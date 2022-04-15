**Author:** Christine Borg (design), Joseph Anthony Debono (code),  
**email:** [criborg@gmail.com](criborg@gmail.com), [joe@jadebono.com](joe@jadebono.com)  
**Institution**: Placeholder
**Site:** [not available](http:localhost:3001/)
**Institution**: Placeholder  
**Site:** [not available](http:localhost:3001/)  
**Date of commencement:** 3 April 2022

---

@@ -49,6 +49,10 @@ Instead, it will copy all the configuration files and the transitive dependencie

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

---

# `Frontend`

### `dependencies`

1. "@testing-library/jest-dom": "^5.16.2",
   @@ -62,9 +66,18 @@ You don't have to ever use `eject`. The curated feature set is suitable for smal

### `Integrated Dependencies`

1. "autoprefixer": "^10.4.2",
1. "postcss": "^8.4.7",
1. "tailwindcss": "^3.0.23"
   Tailwind comes integrated with this version of Create-React-App. Just add:

1. frontend/tailwind.config.js
1. frontend/src/index.css

contents of frontend/src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### `Component Properties go here`

@@ -76,7 +89,9 @@ You don't have to ever use `eject`. The curated feature set is suitable for smal

#### `Properties`

## `Backend`

---

# `Backend`

Port: 4000
