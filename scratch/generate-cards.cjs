const fs = require('fs');
const path = require('path');

const cardPngPath = path.resolve('apps/web/public/card.png');
const cardBase64 = fs.readFileSync(cardPngPath).toString('base64');
const cardDataUri = `data:image/png;base64,${cardBase64}`;

// Helper to create an icon tile in SVG
function makeIconTile(x, y, w, h, iconSize, iconSvg, label) {
  const iconOffset = (w - iconSize) / 2;
  return `
    <g transform="translate(${x}, ${y})">
      <rect width="${w}" height="${h}" rx="18" fill="#032306" fill-opacity="0.07" stroke="#032306" stroke-opacity="0.16" stroke-width="2"/>
      <g transform="translate(${iconOffset}, 14)">
        ${iconSvg}
      </g>
      <text x="${w / 2}" y="${h - 16}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="700" fill="#032306">${label}</text>
    </g>
  `;
}

// Icon SVG definitions with custom size parameter
function getIconSvg(type, size) {
  const icons = {
    java: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M18.8 24.1c1.8.1 3.5-.2 4.9-.7.6-.2 1.4-.6 1.7-.8-.4-.2-1.8-.4-2.5-.4-2.3 0-4.5.3-6.8.8-1.5.3-3.2.7-4.6 1.3-.8.3-1.4.6-1.5.8.5.2 2 .5 2.8.5 2 .2 4.1-.1 6-.5z" fill="#E76F00"/>
      <path d="M17.8 21.6c2.4.2 4.8-.1 7.1-.9.7-.2 1.5-.7 1.8-.9-.5-.2-2-.3-2.7-.4-2.7-.2-5.3.1-8 .7-1.8.4-3.7.8-5.3 1.5-.9.4-1.6.7-1.7.9.6.2 2.3.4 3.2.5 1.9.1 3.9-.2 5.6-.4z" fill="#5382A1"/>
      <path d="M21.5 18.9c1.9-.9 3.5-2.2 4.4-4 .3-.6.5-1.3.5-2 0-.2-.1-.4-.3-.4-.2 0-.3.2-.4.4-.8 1.5-2.2 2.7-3.8 3.5-1.8.9-3.9 1.4-6 1.4-1.2 0-2.3-.2-3.4-.5-.4-.1-.7-.3-1-.5-.2-.1-.4 0-.5.2-.1.2 0 .4.2.5 1.2.9 2.7 1.4 4.2 1.6.8.1 1.7.1 2.5.1 1.5 0 2.9-.3 3.3-.8z" fill="#E76F00"/>
      <path d="M12.9 14.8c1.3.8 2.8 1.3 4.4 1.4 2.2.1 4.5-.4 6.4-1.4 1.2-.6 2.1-1.5 2.7-2.6.2-.3.3-.6.4-.9 0-.2-.2-.3-.4-.3-.2 0-.3.2-.4.3-.6.9-1.4 1.6-2.4 2.1-1.7.9-3.7 1.3-5.7 1.2-1.4 0-2.8-.4-4-1.1-.3-.2-.6-.3-.9-.2-.3.1-.4.4-.3.6.1.2.2.3.3.5z" fill="#5382A1"/>
      <path d="M22.8 9.5c.2-.5.4-1 .4-1.5 0-.4-.1-.8-.4-1.1-.3-.3-.7-.4-1.1-.4-.6 0-1.1.2-1.5.5-1 .7-1.7 1.7-2.3 2.7-.8 1.4-1.3 3-1.6 4.6-.1.6 0 1.2.3 1.7.3.5.8.8 1.4.8.8 0 1.5-.4 2.1-.9 1.4-1.2 2.3-2.9 2.7-4.7.1-.6.1-1.2 0-1.7z" fill="#E76F00"/>
    </svg>`,

    python: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M15.9 3c-4.4 0-6.9 1.9-6.9 4.3v3.2h7v1H7.8C5.2 11.5 3 13.7 3 17.1c0 3.5 2.1 5.6 5.2 5.6h2.2v-3.1c0-2.6 2.2-4.8 4.8-4.8h6.8c1.3 0 2.3-1 2.3-2.3V7.3C24.3 4.9 20.3 3 15.9 3zm-2.2 2.3c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2z" fill="#387EB8"/>
      <path d="M16.1 29c4.4 0 6.9-1.9 6.9-4.3v-3.2h-7v-1h8.2c2.6 0 4.8-2.2 4.8-5.6 0-3.5-2.1-5.6-5.2-5.6h-2.2v3.1c0 2.6-2.2 4.8-4.8 4.8H10c-1.3 0-2.3 1-2.3 2.3v5.2c0 2.4 4 4.3 8.4 4.3zm2.2-2.3c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2z" fill="#FFE052"/>
    </svg>`,

    cpp: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M16 3L3.8 10v12L16 29l12.2-7V10L16 3z" fill="#00599C"/>
      <path d="M17.4 12.3c-1.1-.7-2.3-.9-3.5-.6-1.5.4-2.6 1.7-2.9 3.2-.4 2 .6 3.9 2.5 4.6 1.3.5 2.8.2 3.9-.7l.9 1.5c-1.6 1.3-3.7 1.7-5.6 1-2.6-1-4.1-3.6-3.6-6.3.5-2.2 2.1-4 4.2-4.5 1.7-.5 3.5-.1 4.9.9l-.8 1.9zm4.2 3.1h1.1v-1.1h1.1v1.1h1.1v1.1h-1.1v1.1h-1.1v-1.1h-1.1v-1.1zm4.7 0h1.1v-1.1h1.1v1.1h1.1v1.1h-1.1v1.1h-1.1v-1.1h-1.1v-1.1z" fill="#ffffff"/>
    </svg>`,

    c: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M16 3L3.8 10v12L16 29l12.2-7V10L16 3z" fill="#A8B9CC"/>
      <path d="M20.2 11.8c-1.4-.9-3.2-1.3-4.9-.8-2.1.5-3.7 2.3-4.2 4.5-.5 2.7 1 5.3 3.6 6.3 1.9.7 4 .3 5.6-1l-1.1-1.7c-1.2.9-2.7 1.1-4 .6-1.8-.7-2.8-2.6-2.4-4.5.3-1.5 1.4-2.8 2.9-3.2 1.2-.3 2.4-.1 3.5.6l1-1.8z" fill="#283593"/>
    </svg>`,

    js: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
      <path d="M18.8 25.2c.7.4 1.5.7 2.4.7 1.2 0 1.9-.6 1.9-1.5 0-1-.8-1.4-2.2-2-1.8-.8-3-1.8-3-3.6 0-2 1.5-3.5 3.9-3.5 1.1 0 2 .3 2.7.7l-.8 1.9c-.6-.4-1.3-.6-1.9-.6-1 0-1.6.5-1.6 1.2 0 .9.7 1.3 2.1 1.9 2 .9 3.2 1.9 3.2 3.8 0 2.2-1.7 3.7-4.4 3.7-1.3 0-2.5-.4-3.3-.9l1-2.2zm-7.6.2c.5.3 1.2.6 1.9.6.9 0 1.5-.4 1.5-1.7v-8.8h2.6v8.9c0 2.6-1.5 3.8-3.8 3.8-1.2 0-2.3-.4-3-.9l.8-1.9z" fill="#000000"/>
    </svg>`,

    react: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="2.8" fill="#61DAFB"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" stroke-width="1.6"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" stroke-width="1.6" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" stroke-width="1.6" transform="rotate(120 16 16)"/>
    </svg>`,

    html: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M5 3l2.4 24.5L16 30l8.6-2.5L27 3H5z" fill="#E44D26"/>
      <path d="M16 5.2v22.4l6.4-1.8 1.9-18.6H16z" fill="#F16529"/>
      <path d="M16 11.2h-4.8l.3 3.6h4.5v3.4h-4.2l.3 3.6 3.9 1.1v3.5l-6.8-1.9-.8-9.7H16v-3.6zm0 0h4.8l-.5 5.5-4.3 1.2v3.5l6.8-1.9.8-8.3H16v0z" fill="#ffffff"/>
    </svg>`,

    css: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M5 3l2.4 24.5L16 30l8.6-2.5L27 3H5z" fill="#1572B6"/>
      <path d="M16 5.2v22.4l6.4-1.8 1.9-18.6H16z" fill="#33A9DC"/>
      <path d="M16 11.2h-4.8l.3 3.6h4.5v3.4h-4.2l.3 3.6 3.9 1.1v3.5l-6.8-1.9-.8-9.7H16v-3.6zm0 0h4.8l-.5 5.5-4.3 1.2v3.5l6.8-1.9.8-8.3H16v0z" fill="#ffffff"/>
    </svg>`,

    node: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M16 3l11.5 6.6v13.2L16 29.4 4.5 22.8V9.6L16 3z" fill="#339933"/>
      <path d="M16 7.2l8.2 4.7v9.4L16 26l-8.2-4.7v-9.4L16 7.2z" fill="#ffffff"/>
      <path d="M16 10l5.8 3.3v6.7L16 23.3l-5.8-3.3v-6.7L16 10z" fill="#339933"/>
    </svg>`,

    express: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#1e293b"/>
      <text x="16" y="20" text-anchor="middle" fill="#f8fafc" font-size="12" font-weight="bold" font-family="sans-serif">ex</text>
    </svg>`,

    mern: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#064e3b"/>
      <text x="16" y="19" text-anchor="middle" fill="#a7f3d0" font-size="8.5" font-weight="900" font-family="sans-serif" letter-spacing="0.5">MERN</text>
      <circle cx="16" cy="24" r="1.5" fill="#34d399"/>
    </svg>`,

    rest: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#0f766e"/>
      <path d="M9 13h14M18 9l5 4-5 4M23 19H9M14 23l-5-4 5-4" stroke="#ccfbf1" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    mongo: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M16 2.5C16 2.5 9 10 9 17.5c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5 0-7.5-7-15-7-15z" fill="#47A248"/>
      <path d="M16 2.5v24.5c3.8-1.5 6.5-5 6.5-9.5 0-7.5-6.5-15-6.5-15z" fill="#499D4A"/>
      <path d="M16 27c-.2 0-.4 0-.6-.1-.1.7-.5 1.5-.9 2.1l1.5.5 1.5-.5c-.4-.6-.8-1.4-.9-2.1-.2.1-.4.1-.6.1z" fill="#3F8F40"/>
    </svg>`,

    postgres: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M16 3c-6.6 0-12 4.5-12 10.2 0 3.8 2.4 7.2 6 8.8v5.5l5.2-2.3c.3 0 .5.1.8.1 6.6 0 12-4.6 12-10.3C28 7.5 22.6 3 16 3z" fill="#336791"/>
      <circle cx="12" cy="13" r="1.5" fill="#ffffff"/>
      <circle cx="20" cy="13" r="1.5" fill="#ffffff"/>
      <path d="M16 15c-1 0-2 .8-2 2s1 2 2 2 2-.8 2-2-1-2-2-2z" fill="#ffffff"/>
    </svg>`,

    sql: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="8" rx="10" ry="3.5" fill="#0284c7"/>
      <path d="M6 8v5.5c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5V8" stroke="#0369a1" stroke-width="2" fill="none"/>
      <path d="M6 13.5V19c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5v-5.5" stroke="#0369a1" stroke-width="2" fill="none"/>
      <path d="M6 19v5.5c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5V19" stroke="#0369a1" stroke-width="2" fill="none"/>
    </svg>`,

    firebase: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M5.5 24.2L8.9 4.3c.1-.5.7-.7 1-.4l4.2 8.1-8.6 12.2z" fill="#FFA000"/>
      <path d="M17.8 14.8l2.9-5.5c.2-.5.9-.5 1.1 0l4.7 14.9-8.7-9.4z" fill="#F57C00"/>
      <path d="M5.5 24.2l10.5 5.8c.4.2.9.2 1.3 0l9.2-5.8-3.4-10.9-17.6 10.9z" fill="#FFCA28"/>
    </svg>`,

    supabase: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M17.5 3v13.5h9.3c.7 0 1 .8.5 1.3l-12.8 12c-.8.7-2-.1-1.7-1.1l3.2-12.2H6.7c-.7 0-1-.8-.5-1.3l12.8-12c.3-.3.8-.2 1 .2.1.1.2.2.2.3z" fill="#3ECF8E"/>
    </svg>`,

    git: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M29 14.6l-11.6-11.6c-.8-.8-2.1-.8-2.8 0L9.4 8.2l3.6 3.6c.8-.3 1.8-.1 2.4.5.6.6.8 1.5.5 2.4l3.5 3.5c.8-.3 1.8-.1 2.4.5.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.7-.7-.9-1.8-.5-2.6l-3.2-3.2v6.6c.2.2.4.4.5.7.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.9-.9-.9-2.4 0-3.3.3-.3.7-.5 1.1-.6V14c-.4-.1-.8-.3-1.1-.6-.7-.7-.9-1.8-.5-2.6L8 7.2 3 12.2c-.8.8-.8 2.1 0 2.8L14.6 26.6c.8.8 2.1.8 2.8 0L29 17.4c.8-.8.8-2.1 0-2.8z" fill="#F05032"/>
    </svg>`,

    github: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2C8.3 2 2 8.3 2 16c0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2.1-1.5-2.1-1.3-.9.1-.9.1-.9 1.4.1 2.2 1.5 2.2 1.5 1.3 2.1 3.3 1.5 4.1 1.2.1-.9.5-1.5.9-1.9-3.1-.4-6.4-1.6-6.4-7 0-1.5.5-2.8 1.4-3.8-.1-.4-.6-1.8.1-3.7 0 0 1.2-.4 3.9 1.5 1.1-.3 2.3-.5 3.5-.5 1.2 0 2.4.2 3.5.5 2.7-1.9 3.9-1.5 3.9-1.5.8 1.9.3 3.3.1 3.7.9 1 1.4 2.3 1.4 3.8 0 5.4-3.3 6.6-6.4 7 .5.4.9 1.2.9 2.5v3.7c0 .4.3.8 1 .7C26 27.4 30 22.2 30 16c0-7.7-6.3-14-14-14z" fill="#181717"/>
    </svg>`,

    linux: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
      <path d="M16 3c-3 0-5 2.5-5 5.5v3c0 2 .5 4 1 5.5-1.5 1-3 2.5-3 5 0 3.5 2.5 5 7 5s7-1.5 7-5c0-2.5-1.5-4-3-5 .5-1.5 1-3.5 1-5.5v-3C21 5.5 19 3 16 3z" fill="#1e293b"/>
      <ellipse cx="14" cy="8.5" rx="1" ry="1.5" fill="#ffffff"/>
      <ellipse cx="18" cy="8.5" rx="1" ry="1.5" fill="#ffffff"/>
      <circle cx="14" cy="8.5" r="0.6" fill="#000000"/>
      <circle cx="18" cy="8.5" r="0.6" fill="#000000"/>
      <path d="M14.5 10.5h3l-1.5 2.5-1.5-2.5z" fill="#f59e0b"/>
      <path d="M16 16c-3 0-5 2-5 5.5 0 2 1.5 3.5 5 3.5s5-1.5 5-3.5c0-3.5-2-5.5-5-5.5z" fill="#ffffff"/>
      <path d="M10 25c-2 0-3 1.5-3 3s1.5 2 4 2 2-1 2-2-1-3-3-3zm12 0c-2 0-3 2-1 3s3 1 4 0 0-2-1-2.5-1-.5-2-.5z" fill="#f59e0b"/>
    </svg>`
  };
  return icons[type] || '';
}

function generateSvgCard(title, items, isTextOnly = false) {
  let contentSvg = '';

  if (isTextOnly) {
    contentSvg = `
      <g transform="translate(193, 245)">
        <rect width="460" height="85" rx="22" fill="#032306" fill-opacity="0.07" stroke="#032306" stroke-opacity="0.2" stroke-width="2.5"/>
        <text x="230" y="55" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="#032306" letter-spacing="1.5">OOP</text>
      </g>
      <g transform="translate(193, 355)">
        <rect width="460" height="85" rx="22" fill="#032306" fill-opacity="0.07" stroke="#032306" stroke-opacity="0.2" stroke-width="2.5"/>
        <text x="230" y="54" text-anchor="middle" font-family="Georgia, serif" font-size="32" font-weight="bold" fill="#032306" letter-spacing="1">System Design</text>
      </g>
    `;
  } else {
    const count = items.length;

    if (count === 3) {
      // 3 large prominent icons in a single row
      const tileW = 175;
      const tileH = 175;
      const iconSize = 82;
      const gap = 34;
      const totalW = 3 * tileW + 2 * gap;
      const startX = (847 - totalW) / 2;
      const startY = 245;

      contentSvg = items.map((item, idx) => {
        const x = startX + idx * (tileW + gap);
        return makeIconTile(x, startY, tileW, tileH, iconSize, getIconSvg(item.icon, iconSize), item.name);
      }).join('\n');
    } else if (count === 4) {
      // 2x2 grid with large icons
      const tileW = 180;
      const tileH = 125;
      const iconSize = 64;
      const gapX = 36;
      const gapY = 20;
      const totalW = 2 * tileW + gapX;
      const startX = (847 - totalW) / 2;
      const startY = 230;

      contentSvg = items.map((item, idx) => {
        const row = Math.floor(idx / 2);
        const col = idx % 2;
        const x = startX + col * (tileW + gapX);
        const y = startY + row * (tileH + gapY);
        return makeIconTile(x, y, tileW, tileH, iconSize, getIconSvg(item.icon, iconSize), item.name);
      }).join('\n');
    } else if (count === 5) {
      // Row 1: 3 icons, Row 2: 2 icons (much larger than before)
      const tileW = 154;
      const tileH = 122;
      const iconSize = 62;
      const gapX = 24;
      const gapY = 18;
      const row1W = 3 * tileW + 2 * gapX;
      const row1StartX = (847 - row1W) / 2;
      const row2W = 2 * tileW + gapX;
      const row2StartX = (847 - row2W) / 2;
      const startY = 225;

      contentSvg = items.map((item, idx) => {
        if (idx < 3) {
          const x = row1StartX + idx * (tileW + gapX);
          return makeIconTile(x, startY, tileW, tileH, iconSize, getIconSvg(item.icon, iconSize), item.name);
        } else {
          const col = idx - 3;
          const x = row2StartX + col * (tileW + gapX);
          const y = startY + tileH + gapY;
          return makeIconTile(x, y, tileW, tileH, iconSize, getIconSvg(item.icon, iconSize), item.name);
        }
      }).join('\n');
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 847 602" width="847" height="602">
  <image href="${cardDataUri}" width="847" height="602" />
  
  <!-- Category Title -->
  <text x="423" y="185" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-weight="bold" fill="#032306" letter-spacing="1">${title}</text>
  <line x1="363" y1="202" x2="483" y2="202" stroke="#032306" stroke-opacity="0.3" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Content Icons / Text -->
  ${contentSvg}

  <!-- Footer count -->
  <text x="423" y="535" text-anchor="middle" font-family="monospace, sans-serif" font-size="13" font-weight="600" fill="#032306" fill-opacity="0.4" letter-spacing="2">${items.length} ${isTextOnly ? 'CONCEPTS' : 'SKILLS'}</text>
</svg>`;
}

const CARDS_DATA = [
  {
    filename: 'skill-card-languages.svg',
    title: 'Languages',
    items: [
      { name: 'Java', icon: 'java' },
      { name: 'Python', icon: 'python' },
      { name: 'C++', icon: 'cpp' },
      { name: 'C', icon: 'c' },
      { name: 'JavaScript', icon: 'js' },
    ],
  },
  {
    filename: 'skill-card-frontend.svg',
    title: 'Frontend',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
    ],
  },
  {
    filename: 'skill-card-backend.svg',
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: 'node' },
      { name: 'Express.js', icon: 'express' },
      { name: 'MERN', icon: 'mern' },
      { name: 'REST APIs', icon: 'rest' },
    ],
  },
  {
    filename: 'skill-card-databases.svg',
    title: 'Databases',
    items: [
      { name: 'MongoDB', icon: 'mongo' },
      { name: 'PostgreSQL', icon: 'postgres' },
      { name: 'SQL', icon: 'sql' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Supabase', icon: 'supabase' },
    ],
  },
  {
    filename: 'skill-card-tools.svg',
    title: 'Tools',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Linux', icon: 'linux' },
    ],
  },
  {
    filename: 'skill-card-concepts.svg',
    title: 'Core Concepts',
    isTextOnly: true,
    items: [{ name: 'OOP' }, { name: 'System Design' }],
  },
];

for (const card of CARDS_DATA) {
  const svg = generateSvgCard(card.title, card.items, card.isTextOnly);
  const outPath = path.resolve('apps/web/public', card.filename);
  fs.writeFileSync(outPath, svg, 'utf8');
  console.log(`Generated: ${outPath} (${svg.length} bytes)`);
}
