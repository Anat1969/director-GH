import './globals.css';

export const metadata = {
  title: 'המנהל של אשדוד מחר | מגזין חינוכי',
  description: 'מצוינות עם נשמה — אקוסיסטם של משמעות. 6 טיפולוגיות של המנהל האשדודי.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
