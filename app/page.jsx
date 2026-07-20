'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Edit2, Save, X, Plus, Upload } from 'lucide-react';

const COLORS = {
  harbourBlue: '#1a4d7a',
  coralTeal: '#2a9b9f',
  apricotRed: '#c85a36',
  industryGray: '#d9d9d9',
  duneGreen: '#8a9b7f',
  white: '#ffffff',
  offWhite: '#f5f2ee',
  cream: '#faf8f5',
  black: '#0a0a0a',
  darkBlue: '#0d2b45',
};

const DB_NAME = 'ashdod-magazine';
const DB_STORE = 'data';
const DB_KEY = 'typologies';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(DB_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveToIDB(data) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).put(data, DB_KEY);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

async function loadFromIDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readonly');
    const req = tx.objectStore(DB_STORE).get(DB_KEY);
    req.onsuccess = () => { db.close(); resolve(req.result || null); };
    req.onerror = () => { db.close(); reject(req.error); };
  });
}

function migrateTypology(t) {
  const result = { ...t };
  if (t.galleries) {
    const imgs = [];
    t.galleries.forEach((g) => g.items?.forEach((item) => {
      if (item.type === 'image') imgs.push(item.src);
    }));
    delete result.galleries;
    result.images = imgs;
  }
  if (!result.images) result.images = [];
  if (!result.videos) result.videos = result.videoSrc ? [result.videoSrc] : [];
  return result;
}

const DEFAULT_TYPOLOGIES = [
  {
    id: 1,
    number: '01',
    title: 'המנהל כמוביל חדשנות',
    subtitle: 'INNOVATION',
    description:
      'מנהל תנועה, חוקר, מעתיק וקודם שינוי בכלים ובתוכן. המנהל החדשן לא מפחד מהלא נודע — הוא הולך לקראתו, מתרגם את העתיד לשפה שילדים יכולים לגעת בה.',
    architectureInterpretation:
      'הנמל — תנועה, זרימה, גשרים של בד. כמו מנופי הנמל שמרימים מטענים לעולם, המנהל החדשן מרים את חומרי הלמידה מעבר לגבולות המוכר.',
    clothingInterpretation:
      'שכבות שקופות, בדים חדשים שלא נראו קודם, קווי תנועה אופקיים שמסמנים כיוון. הבד הוא כמו קוד — שקוף לעין אבל בנוי בדיוק.',
    ashdodContext:
      'אזור התעשייה, הטכנולוגיה, החדשנות שנשמרת בעדינות בין מפעלים ישנים לסטארטאפים חדשים.',
    images: [],
    videoSrc: '',
    accentColor: '#2a9b9f',
  },
  {
    id: 2,
    number: '02',
    title: 'המנהל כמחבר קהילה',
    subtitle: 'COMMUNITY',
    description:
      'בונה קשרים, מחזק בעלויות ציבוריות וקשרים בין הדורות. המנהל הקהילתי יודע שחינוך לא קורה רק בכיתה — הוא קורה בכל מפגש, בכל שיחה, בכל חיבור.',
    architectureInterpretation:
      'הפסיפס — בדים רבים בהרמוניה, צבעים מתגוונים. כמו הפסיפסים העתיקים שנמצאו באשדוד, כל חלק קטן תורם לתמונה הגדולה.',
    clothingInterpretation:
      'בדים שונים יחד בחיבורים חזקים. כל טלאי מביא את הסיפור שלו, וביחד הם יוצרים שמיכה שמחממת את כולם.',
    ashdodContext:
      'תרבויות רבות ועדות שונות בעיר אחת. אשדוד היא פסיפס של קהילות — מרוקו, אתיופיה, רוסיה, צרפת — וכולן ביחד.',
    images: [],
    videoSrc: '',
    accentColor: '#c85a36',
  },
  {
    id: 3,
    number: '03',
    title: 'המנהל כמפתח יצירתיות',
    subtitle: 'CREATIVITY',
    description:
      'מעורר ביטוי, מטפח תעשייה ויצירה בתלמידיו. המנהל היוצר רואה בכל ילד אמן שטרם גילה את הכלי שלו — צבע, צליל, תנועה, מילה.',
    architectureInterpretation:
      'אוכל, אומנות, מוזיקה — חום וטוב. כמו המטבחים של אשדוד שמערבבים תבלינים ממזרח וממערב, היצירתיות פורצת מהמפגש.',
    clothingInterpretation:
      'צבעים מעבירים, קווי עקומה, פרטים לא צפויים. הבגד הוא לא מה שציפית — הוא מה שלא ידעת שאתה רוצה.',
    ashdodContext:
      'תרבות אוכל, אומנות ומוזיקה בעיר. מהפסטיבלים ברובע הישן ועד הגלריות החדשות.',
    images: [],
    videoSrc: '',
    accentColor: '#8a9b7f',
  },
  {
    id: 4,
    number: '04',
    title: 'המנהל כמקדם הכלה',
    subtitle: 'INCLUSION',
    description:
      'פותח דלתות לכל ילד, משדרג שוויון הזדמנויות. המנהל המכיל רואה בשונות עוצמה, בפערים אתגר, ובכל תלמיד — עולם שלם שמחכה שיפתחו לו את הדלת.',
    architectureInterpretation:
      'גם וגם — ישן וחדש, דואליות ללא סתירה. כמו אשדוד שמחזיקה יחד מגדלים חדשים ושכונות ותיקות.',
    clothingInterpretation:
      'שכבות שונות בעומק, דואליות יפה. הבגד מכיל בתוכו סיפורים שונים — ישנים וחדשים, קלים וכבדים.',
    ashdodContext:
      'חרדי חילוני, ימין שמאל, צעיר מבוגר — אשדוד היא כל זה ביחד, בלי לוותר על אף חלק.',
    images: [],
    videoSrc: '',
    accentColor: '#1a4d7a',
  },
  {
    id: 5,
    number: '05',
    title: 'המנהל כמטפח חוסן',
    subtitle: 'RESILIENCE',
    description:
      'מעמיד בניצב חוסן, משמעות וקשיחות רוח. המנהל שבונה חוסן יודע שהחוזק האמיתי לא בא מהמנעות מכאב אלא מהיכולת לקום אחריו.',
    architectureInterpretation:
      'השפך — טבע בעירוב עם כוח בנייה. כמו נחל לכיש שפוגש את הים, הטבע והבנוי נפגשים ויוצרים כוח.',
    clothingInterpretation:
      'תפרים חזקים ברקע, מבנה יציב וקלילות. הבגד נראה קל אבל מחזיק חזק — כמו נייר שעמד בגשם.',
    ashdodContext:
      'הנמל שעמד במשברים, חוסן הקהילה שעברה מלחמות ועדיין עומדת.',
    images: [],
    videoSrc: '',
    accentColor: '#c85a36',
  },
  {
    id: 6,
    number: '06',
    title: 'המנהל כמחבר עיר ועולם',
    subtitle: 'CITY & WORLD',
    description:
      'מחבר תלמידים לזהות עיר, לעתיד גלובלי וללמידה בתנועה. המנהל הזה מלמד את הילדים לצעוד באשדוד עם עיניים פקוחות על העולם.',
    architectureInterpretation:
      'נחל לכיש, הנמל, החוף — תנועה ופתיחות. הים הוא לא גבול, הוא דרך. הנמל הוא לא סוף, הוא התחלה.',
    clothingInterpretation:
      'איזון בין יציבה לתנועה, קדימה בביטחון. הבגד מאפשר ללכת קדימה — רגליים על הקרקע, ראש בעננים.',
    ashdodContext:
      'אשדוד בעיקר, אבל בעיניים על העולם. מהנמל יוצאות ספינות לכל כיוון.',
    images: [],
    videoSrc: '',
    accentColor: '#2a9b9f',
  },
];

const TOTAL_PAGES = 9;

// ─── Editable Text ───
function EditableText({ value, onSave, editMode, style, tag: Tag = 'p' }) {
  const ref = useRef(null);
  const handleBlur = () => {
    if (editMode && ref.current) {
      const v = ref.current.innerText;
      if (v !== value) onSave(v);
    }
  };
  return (
    <Tag
      ref={ref}
      contentEditable={editMode}
      suppressContentEditableWarning
      onBlur={handleBlur}
      style={{
        ...style,
        outline: 'none',
        borderBottom: editMode ? '2px dashed rgba(200,90,54,0.4)' : 'none',
        cursor: editMode ? 'text' : 'default',
        minHeight: editMode ? '1em' : undefined,
      }}
    >
      {value}
    </Tag>
  );
}

// ─── Cover Page ───
function CoverPage() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(160deg, ${COLORS.darkBlue} 0%, ${COLORS.harbourBlue} 40%, ${COLORS.coralTeal} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 61px),
                            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 61px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '13px',
          letterSpacing: '6px',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          fontWeight: '300',
        }}
      >
        {'ASHDOD EDUCATION MAGAZINE'}
      </div>
      <div
        style={{
          textAlign: 'center',
          color: COLORS.white,
          padding: '0 40px',
          maxWidth: '900px',
        }}
      >
        <div
          style={{ width: '60px', height: '2px', background: COLORS.apricotRed, margin: '0 auto 40px' }}
        />
        <h1
          style={{
            fontSize: 'clamp(48px, 9vw, 110px)',
            fontWeight: '200',
            lineHeight: '1.1',
            marginBottom: '16px',
            letterSpacing: '-1px',
          }}
        >
          {'המנהל של'}
        </h1>
        <h1
          style={{
            fontSize: 'clamp(56px, 11vw, 130px)',
            fontWeight: '800',
            lineHeight: '1.0',
            marginBottom: '32px',
            letterSpacing: '-2px',
            background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.apricotRed} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {'אשדוד מחר'}
        </h1>
        <div
          style={{ width: '120px', height: '1px', background: 'rgba(255,255,255,0.3)', margin: '0 auto 32px' }}
        />
        <p
          style={{
            fontSize: 'clamp(20px, 3vw, 30px)',
            fontWeight: '300',
            opacity: 0.7,
            letterSpacing: '2px',
            marginBottom: '8px',
          }}
        >
          {'מצוינות עם נשמה'}
        </p>
        <p
          style={{
            fontSize: 'clamp(14px, 2vw, 20px)',
            fontWeight: '300',
            opacity: 0.4,
            letterSpacing: '4px',
          }}
        >
          {'אקוסיסטם של משמעות'}
        </p>
        <div
          style={{
            marginTop: '60px',
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            fontSize: '14px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            opacity: 0.4,
          }}
        >
          <span>{'6 טיפולוגיות'}</span>
          <span>{'|'}</span>
          <span>{'עיריית אשדוד'}</span>
          <span>{'|'}</span>
          <span>{'2024'}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Table of Contents ───
function TableOfContents({ typologies, onNavigate }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: COLORS.offWhite,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <div style={{ width: '40px', height: '3px', background: COLORS.apricotRed }} />
          <h2
            style={{
              fontSize: '14px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              color: COLORS.harbourBlue,
              fontWeight: '700',
            }}
          >
            {'תוכן העניינים'}
          </h2>
        </div>
        {typologies.map((typo, i) => (
          <button
            key={typo.id}
            onClick={() => onNavigate(typo.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '20px 0',
              borderTop: i === 0 ? `1px solid ${COLORS.industryGray}` : 'none',
              borderBottom: `1px solid ${COLORS.industryGray}`,
              borderLeft: 'none',
              borderRight: 'none',
              background: 'transparent',
              cursor: 'pointer',
              textAlign: 'right',
              gap: '28px',
              fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: '48px', fontWeight: '100', color: typo.accentColor, minWidth: '65px' }}>
              {typo.number}
            </span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '26px', fontWeight: '600', color: COLORS.harbourBlue, marginBottom: '4px' }}>
                {typo.title}
              </h3>
              <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.4)', fontWeight: '300', lineHeight: '1.5' }}>
                {typo.description.slice(0, 80)}...
              </p>
            </div>
            <span
              style={{ fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}
            >
              {typo.subtitle}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Typology Spread ───
function TypologySpread({ typo, index, editMode, onUpdate }) {
  const [activeMedia, setActiveMedia] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const images = typo.images || [];
  const videos = typo.videos || (typo.videoSrc ? [typo.videoSrc] : []);
  const media = [...images.map((src) => ({ type: 'image', src })), ...videos.map((src) => ({ type: 'video', src }))];

  useEffect(() => {
    if (activeMedia >= media.length && media.length > 0) setActiveMedia(media.length - 1);
    if (media.length === 0) setActiveMedia(0);
  }, [media.length, activeMedia]);

  const addFiles = async (fileList) => {
    const imgFiles = [];
    const vidFiles = [];
    Array.from(fileList).forEach((f) => {
      if (f.type.startsWith('image/')) imgFiles.push(f);
      else if (f.type.startsWith('video/')) vidFiles.push(f);
    });
    const toDataURL = (f) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(f);
    });
    if (imgFiles.length) {
      const srcs = await Promise.all(imgFiles.map(toDataURL));
      onUpdate(typo.id, 'images', [...images, ...srcs]);
    }
    if (vidFiles.length) {
      const srcs = await Promise.all(vidFiles.map(toDataURL));
      onUpdate(typo.id, 'videos', [...videos, ...srcs]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleRemoveMedia = (idx) => {
    if (idx < images.length) {
      onUpdate(typo.id, 'images', images.filter((_, i) => i !== idx));
    } else {
      const vidIdx = idx - images.length;
      onUpdate(typo.id, 'videos', videos.filter((_, i) => i !== vidIdx));
    }
  };

  const goNext = () => setActiveMedia((i) => Math.min(media.length - 1, i + 1));
  const goPrev = () => setActiveMedia((i) => Math.max(0, i - 1));

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 40px',
          borderBottom: `1px solid ${COLORS.industryGray}`,
          background: COLORS.white,
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '52px', fontWeight: '100', color: typo.accentColor, lineHeight: '1' }}>
            {typo.number}
          </span>
          <div style={{ width: '1px', height: '32px', background: COLORS.industryGray }} />
          <span
            style={{
              fontSize: '14px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: COLORS.harbourBlue,
              fontWeight: '600',
            }}
          >
            {typo.subtitle}
          </span>
        </div>
        <span
          style={{ fontSize: '13px', letterSpacing: '3px', color: 'rgba(0,0,0,0.25)', textTransform: 'uppercase' }}
        >
          {'המנהל של אשדוד מחר'}
        </span>
      </div>

      {/* Main content — images always LEFT, text always RIGHT */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0, overflow: 'hidden' }}>
        {/* Text side — always RIGHT (order 1 in RTL = right) */}
        <div
          style={{
            order: 1,
            padding: '32px 44px',
            display: 'flex',
            flexDirection: 'column',
            background: COLORS.cream,
            overflowY: 'auto',
            gap: '20px',
          }}
        >
          <div style={{ width: '44px', height: '3px', background: typo.accentColor }} />

          <EditableText
            value={typo.title}
            onSave={(v) => onUpdate(typo.id, 'title', v)}
            editMode={editMode}
            tag="h2"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: '700',
              color: COLORS.harbourBlue,
              lineHeight: '1.2',
            }}
          />

          <EditableText
            value={typo.description}
            onSave={(v) => onUpdate(typo.id, 'description', v)}
            editMode={editMode}
            style={{
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              color: COLORS.black,
              lineHeight: '1.8',
              fontWeight: '300',
            }}
          />

          <div
            style={{
              padding: '20px 0',
              borderTop: `1px solid ${COLORS.industryGray}`,
              borderBottom: `1px solid ${COLORS.industryGray}`,
            }}
          >
            <p
              style={{
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: typo.accentColor,
                marginBottom: '10px',
                fontWeight: '700',
              }}
            >
              {'פרשנות בבגדים ועיצוב'}
            </p>
            <EditableText
              value={typo.clothingInterpretation}
              onSave={(v) => onUpdate(typo.id, 'clothingInterpretation', v)}
              editMode={editMode}
              style={{
                fontSize: '19px',
                color: COLORS.black,
                lineHeight: '1.8',
                fontStyle: 'italic',
                fontWeight: '300',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '3px',
                minHeight: '36px',
                background: `linear-gradient(to bottom, ${typo.accentColor}, transparent)`,
                flexShrink: 0,
                marginTop: '4px',
              }}
            />
            <div>
              <p
                style={{
                  fontSize: '14px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: COLORS.duneGreen,
                  marginBottom: '8px',
                  fontWeight: '700',
                }}
              >
                {'אשדוד בהקשר זה'}
              </p>
              <EditableText
                value={typo.ashdodContext}
                onSave={(v) => onUpdate(typo.id, 'ashdodContext', v)}
                editMode={editMode}
                style={{ fontSize: '18px', color: 'rgba(0,0,0,0.6)', lineHeight: '1.7' }}
              />
            </div>
          </div>

          {/* Architecture interpretation — gold creative styling */}
          <div
            style={{
              marginTop: 'auto',
              padding: '24px 20px',
              background: 'linear-gradient(135deg, rgba(191,155,48,0.08) 0%, rgba(212,175,55,0.15) 100%)',
              borderTop: '2px solid #d4af37',
              borderRadius: '0 0 0 12px',
            }}
          >
            <p
              style={{
                fontSize: '16px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#d4af37',
                marginBottom: '10px',
                fontWeight: '700',
              }}
            >
              {'פרשנות אדריכלית'}
            </p>
            <EditableText
              value={typo.architectureInterpretation}
              onSave={(v) => onUpdate(typo.id, 'architectureInterpretation', v)}
              editMode={editMode}
              style={{
                fontSize: 'clamp(18px, 2vw, 22px)',
                color: '#b8860b',
                lineHeight: '1.8',
                fontWeight: '400',
                fontStyle: 'italic',
              }}
            />
          </div>
        </div>

        {/* Media side — always LEFT (order 2 in RTL = left) */}
        <div
          style={{
            order: 2,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            position: 'relative',
          }}
        >
          {/* Filmstrip main frame */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              position: 'relative',
              overflow: 'hidden',
              background: COLORS.cream,
              border: isDragOver ? `3px solid ${typo.accentColor}` : '3px solid transparent',
              transition: 'border 0.2s',
            }}
            onDrop={editMode ? handleDrop : undefined}
            onDragOver={
              editMode
                ? (e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }
                : undefined
            }
            onDragLeave={editMode ? () => setIsDragOver(false) : undefined}
          >
            {/* Media filmstrip — slides right-to-left */}
            {media.length > 0
              ? media.map((item, i) => (
                  <div
                    key={item.src + i}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      transform: `translateX(${(i - activeMedia) * 100}%)`,
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 1,
                    }}
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={typo.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    )}
                  </div>
                ))
              : (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                      fontSize: '20px',
                      zIndex: 1,
                    }}
                  >
                    {editMode ? 'גררו תמונות או סרטונים לכאן' : 'אין מדיה'}
                  </div>
                )}

            {/* Filmstrip arrows */}
            {media.length > 1 && activeMedia > 0 && (
              <button
                onClick={goPrev}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(0,0,0,0.25)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <ChevronRight size={22} />
              </button>
            )}
            {media.length > 1 && activeMedia < media.length - 1 && (
              <button
                onClick={goNext}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(0,0,0,0.25)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Drag overlay */}
            {editMode && isDragOver && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(42,155,159,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    fontSize: '20px',
                  }}
                >
                  {'שחררו כאן'}
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail strip — no dark background */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              gap: '8px',
              padding: '10px 12px',
              overflowX: 'auto',
              background: COLORS.offWhite,
              alignItems: 'center',
              borderTop: `1px solid ${COLORS.industryGray}`,
            }}
          >
            {media.map((item, idx) => (
              <div
                key={item.src + idx}
                onClick={() => setActiveMedia(idx)}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  height: '72px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border:
                    idx === activeMedia
                      ? `3px solid ${typo.accentColor}`
                      : '3px solid transparent',
                  transition: 'border 0.2s',
                }}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    muted
                    style={{
                      height: '100%',
                      width: 'auto',
                      display: 'block',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt=""
                    style={{
                      height: '100%',
                      width: 'auto',
                      display: 'block',
                      objectFit: 'cover',
                    }}
                  />
                )}
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveMedia(idx);
                    }}
                    style={{
                      position: 'absolute',
                      top: '3px',
                      right: '3px',
                      background: 'rgba(200,90,54,0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      color: '#fff',
                      cursor: 'pointer',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                    }}
                  >
                    <X size={11} />
                  </button>
                )}
              </div>
            ))}

            {editMode && (
              <label
                style={{
                  flexShrink: 0,
                  width: '72px',
                  height: '72px',
                  border: `2px dashed ${COLORS.industryGray}`,
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(0,0,0,0.4)',
                  fontSize: '11px',
                  gap: '4px',
                }}
              >
                <Plus size={18} />
                {'מדיה'}
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => addFiles(e.target.files)}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Closing Page ───
function ClosingPage() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(160deg, ${COLORS.darkBlue} 0%, ${COLORS.harbourBlue} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px',
        textAlign: 'center',
      }}
    >
      <div style={{ width: '60px', height: '2px', background: COLORS.apricotRed, margin: '0 auto 40px' }} />
      <h2
        style={{
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: '200',
          color: COLORS.white,
          marginBottom: '16px',
          lineHeight: '1.3',
        }}
      >
        {'כי המנהל הוא'}
      </h2>
      <h2
        style={{
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: '700',
          color: COLORS.white,
          marginBottom: '40px',
          lineHeight: '1.2',
        }}
      >
        {'השינוי שאנחנו רוצים לראות'}
      </h2>
      <div style={{ width: '120px', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '0 auto 40px' }} />
      <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px' }}>
        {'מצוינות עם נשמה — אקוסיסטם של משמעות'}
      </p>
      <div style={{ marginTop: '60px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
        {['#2a9b9f', '#c85a36', '#8a9b7f', '#1a4d7a', '#2a9b9f', '#c85a36'].map((c, i) => (
          <div
            key={i}
            style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.6 }}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: '80px',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}
      >
        {'עיריית אשדוד — מנהל חינוך'}
      </div>
    </div>
  );
}

// ─── Navigation Dots ───
function PageDots({ current, total, onGoTo }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 100,
        padding: '8px 16px',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onGoTo(i)}
          style={{
            width: current === i ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            border: 'none',
            background: current === i ? COLORS.apricotRed : 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.3s',
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Magazine ───
export default function AshdodMagazine() {
  const [currentPage, setCurrentPage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [typologies, setTypologies] = useState(DEFAULT_TYPOLOGIES);
  const [saveMsg, setSaveMsg] = useState(false);
  const touchStart = useRef(null);

  useEffect(() => {
    loadFromIDB().then((saved) => {
      if (saved) {
        try {
          const data = Array.isArray(saved) ? saved : JSON.parse(saved);
          setTypologies(data.map(migrateTypology));
        } catch {}
      } else {
        const legacy = localStorage.getItem('ashdod-magazine-data');
        if (legacy) {
          try {
            setTypologies(JSON.parse(legacy).map(migrateTypology));
          } catch {}
        }
      }
    }).catch(() => {});
  }, []);

  // Paste handler — adds images to current typology
  useEffect(() => {
    if (!editMode) return;
    const handler = async (e) => {
      if (currentPage < 2 || currentPage > 7) return;
      const clipItems = e.clipboardData?.items;
      if (!clipItems) return;
      const imgFiles = [];
      const vidFiles = [];
      for (const item of clipItems) {
        const f = item.getAsFile();
        if (!f) continue;
        if (f.type.startsWith('image/')) imgFiles.push(f);
        else if (f.type.startsWith('video/')) vidFiles.push(f);
      }
      if (!imgFiles.length && !vidFiles.length) return;
      e.preventDefault();
      const typoIdx = currentPage - 2;
      const toDataURL = (f) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(f);
      });
      if (imgFiles.length) {
        const srcs = await Promise.all(imgFiles.map(toDataURL));
        setTypologies((prev) =>
          prev.map((t, i) => (i === typoIdx ? { ...t, images: [...(t.images || []), ...srcs] } : t))
        );
      }
      if (vidFiles.length) {
        const srcs = await Promise.all(vidFiles.map(toDataURL));
        setTypologies((prev) =>
          prev.map((t, i) => (i === typoIdx ? { ...t, videos: [...(t.videos || []), ...srcs] } : t))
        );
      }
    };
    document.addEventListener('paste', handler);
    return () => document.removeEventListener('paste', handler);
  }, [editMode, currentPage]);

  const goTo = useCallback((page) => {
    setCurrentPage(Math.max(0, Math.min(TOTAL_PAGES - 1, page)));
  }, []);

  const goNext = useCallback(() => goTo(currentPage + 1), [currentPage, goTo]);
  const goPrev = useCallback(() => goTo(currentPage - 1), [currentPage, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (editMode && (e.target.isContentEditable || e.target.tagName === 'INPUT')) return;
      if (e.key === 'ArrowLeft') goNext();
      if (e.key === 'ArrowRight') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, editMode]);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStart.current = null;
  };

  const updateTypology = useCallback((id, field, value) => {
    setTypologies((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  }, []);

  const handleSave = () => {
    saveToIDB(typologies).then(() => {
      setSaveMsg(true);
      setTimeout(() => setSaveMsg(false), 2000);
    }).catch(() => {
      setSaveMsg(true);
      setTimeout(() => setSaveMsg(false), 2000);
    });
  };

  const navigateToTypology = (id) => goTo(id + 1);

  const renderPage = (pageIndex) => {
    if (pageIndex === 0) return <CoverPage />;
    if (pageIndex === 1)
      return <TableOfContents typologies={typologies} onNavigate={navigateToTypology} />;
    if (pageIndex >= 2 && pageIndex <= 7)
      return (
        <TypologySpread
          typo={typologies[pageIndex - 2]}
          index={pageIndex - 2}
          editMode={editMode}
          onUpdate={updateTypology}
        />
      );
    if (pageIndex === 8) return <ClosingPage />;
    return null;
  };

  return (
    <div
      dir="rtl"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {Array.from({ length: TOTAL_PAGES }, (_, i) => {
        if (Math.abs(i - currentPage) > 1) return null;
        const offset = (i - currentPage) * -100;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `translateX(${offset}%)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
              willChange: 'transform',
            }}
          >
            {renderPage(i)}
          </div>
        );
      })}

      {currentPage > 0 && (
        <button
          onClick={goPrev}
          style={{
            position: 'fixed',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
            color: COLORS.white,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <ChevronRight size={24} />
        </button>
      )}
      {currentPage < TOTAL_PAGES - 1 && (
        <button
          onClick={goNext}
          style={{
            position: 'fixed',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
            color: COLORS.white,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <PageDots current={currentPage} total={TOTAL_PAGES} onGoTo={goTo} />

      <button
        onClick={() => {
          if (editMode) handleSave();
          setEditMode(!editMode);
        }}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1000,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: 'none',
          background: editMode ? COLORS.apricotRed : 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(8px)',
          color: COLORS.white,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s',
        }}
        title={editMode ? 'שמור וצא מעריכה' : 'מצב עריכה'}
      >
        {editMode ? <Save size={20} /> : <Edit2 size={20} />}
      </button>

      {saveMsg && (
        <div
          style={{
            position: 'fixed',
            top: '16px',
            left: '68px',
            zIndex: 1000,
            background: COLORS.duneGreen,
            color: COLORS.white,
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '15px',
            fontFamily: 'inherit',
            animation: 'fadeOut 2s forwards',
          }}
        >
          {'נשמר בהצלחה'}
        </div>
      )}

      {editMode && (
        <div
          style={{
            position: 'fixed',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: 'rgba(200,90,54,0.9)',
            color: COLORS.white,
            padding: '8px 24px',
            borderRadius: '24px',
            fontSize: '15px',
            fontFamily: 'inherit',
            letterSpacing: '1px',
          }}
        >
          {'מצב עריכה — לחצו על טקסט כדי לערוך'}
        </div>
      )}

      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        * { -webkit-font-smoothing: antialiased; }
        img, video { user-select: none; -webkit-user-drag: none; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
      `}</style>
    </div>
  );
}
