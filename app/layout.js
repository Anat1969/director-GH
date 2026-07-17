import './globals.css';

export const metadata = {
  title: 'המורה של אשדוד מחר | מגזין חינוכי',
  description: 'מצוינות עם נשמה — אקוסיסטם של משמעות. 6 טיפולוגיות של המורה האשדודי.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
