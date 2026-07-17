import './globals.css';

export const metadata = {
  title: 'המורה של אשדוד מחר - CMS',
  description: 'מצוינות עם נשמה - אקוסיסטם של משמעות',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
