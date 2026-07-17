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

const DEFAULT_TYPOLOGIES = [
  {
    id: 1,
    number: '01',
    title: 'המורה כמוביל חדשנות',
    subtitle: 'INNOVATION',
    description: 'מנהל תנועה, חוקר, מעתיק וקודם שינוי בכלים ובתוכן. המורה החדשן לא מפחד מהלא נודע — הוא הולך לקראתו, מתרגם את העתיד לשפה שילדים יכולים לגעת בה.',
    architectureInterpretation: 'הנמל — תנועה, זרימה, גשרים של בד. כמו מנופי הנמל שמרימים מטענים לעולם, המורה החדשן מרים את חומרי הלמידה מעבר לגבולות המוכר.',
    clothingInterpretation: 'שכבות שקופות, בדים חדשים שלא נראו קודם, קווי תנועה אופקיים שמסמנים כיוון. הבד הוא כמו קוד — שקוף לעין אבל בנוי בדיוק.',
    ashdodContext: 'אזור התעשייה, הטכנולוגיה, החדשנות שנשמרת בעדינות בין מפעלים ישנים לסטארטאפים חדשים.',
    images: ['/images/teacher-male-00.png', '/images/teacher-male-01.png'],
    videoSrc: '',
    accentColor: '#2a9b9f',
  },
  {
    id: 2,
    number: '02',
    title: 'המורה כמחבר קהילה',
    subtitle: 'COMMUNITY',
    description: 'בונה קשרים, מחזק בעלויות ציבוריות וקשרים בין הדורות. המורה הקהילתי יודע שחינוך לא קורה רק בכיתה — הוא קורה בכל מפגש, בכל שיחה, בכל חיבור.',
    architectureInterpretation: 'הפסיפס — בדים רבים בהרמוניה, צבעים מתגוונים. כמו הפסיפסים העתיקים שנמצאו באשדוד, כל חלק קטן תורם לתמונה הגדולה.',
    clothingInterpretation: 'בדים שונים יחד בחיבורים חזקים. כל טלאי מביא את הסיפור שלו, וביחד הם יוצרים שמיכה שמחממת את כולם.',
    ashdodContext: 'תרבויות רבות ועדות שונות בעיר אחת. אשדוד היא פסיפס של קהילות — מרוקו, אתיופיה, רוסיה, צרפת — וכולן ביחד.',
    images: ['/images/teacher-warm-00.png', '/images/teacher-warm-01.png'],
    videoSrc: '',
    accentColor: '#c85a36',
  },
  {
    id: 3,
    number: '03',
    title: 'המורה כמפתח יצירתיות',
    subtitle: 'CREATIVITY',
    description: 'מעורר ביטוי, מטפח תעשייה ויצירה בתלמידיו. המורה היוצר רואה בכל ילד אמן שטרם גילה את הכלי שלו — צבע, צליל, תנועה, מילה.',
    architectureInterpretation: 'אוכל, אומנות, מוזיקה — חום וטוב. כמו המטבחים של אשדוד שמערבבים תבלינים ממזרח וממערב, היצירתיות פורצת מהמפגש.',
    clothingInterpretation: 'צבעים מעבירים, קווי עקומה, פרטים לא צפויים. הבגד הוא לא מה שציפית — הוא מה שלא ידעת שאתה רוצה.',
    ashdodContext: 'תרבות אוכל, אומנות ומוזיקה בעיר. מהפסטיבלים ברובע הישן ועד הגלריות החדשות.',
    images: ['/images/teacher-warm-02.png', '/images/teacher-warm-03.png'],
    videoSrc: '',
    accentColor: '#8a9b7f',
  },
  {
    id: 4,
    number: '04',
    title: 'המורה כמקדם הכלה',
    subtitle: 'INCLUSION',
    description: 'פותח דלתות לכל ילד, משדרג שוויון הזדמנויות. המורה המכיל רואה בשונות עוצמה, בפערים אתגר, ובכל תלמיד — עולם שלם שמחכה שיפתחו לו את הדלת.',
    architectureInterpretation: 'גם וגם — ישן וחדש, דואליות ללא סתירה. כמו אשדוד שמחזיקה יחד מגדלים חדשים ושכונות ותיקות.',
    clothingInterpretation: 'שכבות שונות בעומק, דואליות יפה. הבגד מכיל בתוכו סיפורים שונים — ישנים וחדשים, קלים וכבדים.',
    ashdodContext: 'חרדי חילוני, ימין שמאל, צעיר מבוגר — אשדוד היא כל זה ביחד, בלי לוותר על אף חלק.',
    images: ['/images/teacher-powerful-00.png', '/images/teacher-powerful-02.png'],
    videoSrc: '',
    accentColor: '#1a4d7a',
  },
  {
    id: 5,
    number: '05',
    title: 'המורה כמטפח חוסן',
    subtitle: 'RESILIENCE',
    description: 'מעמיד בניצב חוסן, משמעות וקשיחות רוח. המורה שבונה חוסן יודע שהחוזק האמיתי לא בא מהמנעות מכאב אלא מהיכולת לקום אחריו.',
    architectureInterpretation: 'השפך — טבע בעירוב עם כוח בנייה. כמו נחל לכיש שפוגש את הים, הטבע והבנוי נפגשים ויוצרים כוח.',
    clothingInterpretation: 'תפרים חזקים ברקע, מבנה יציב וקלילות. הבגד נראה קל אבל מחזיק חזק — כמו נייר שעמד בגשם.',
    ashdodContext: 'הנמל שעמד במשברים, חוסן הקהילה שעברה מלחמות ועדיין עומדת.',
    images: ['/images/teacher-male-02.png', '/images/teacher-male-03.png', '/images/teacher-male-03b.png'],
    videoSrc: '',
    accentColor: '#c85a36',
  },
  {
    id: 6,
    number: '06',
    title: 'המורה כמחבר עיר ועולם',
    subtitle: 'CITY & WORLD',
    description: 'מחבר תלמידים לזהות עיר, לעתיד גלובלי וללמידה בתנועה. המורה הזה מלמד את הילדים לצעוד באשדוד עם עיניים פקוחות על העולם.',
    architectureInterpretation: 'נחל לכיש, הנמל, החוף — תנועה ופתיחות. הים הוא לא גבול, הוא דרך. הנמל הוא לא סוף, הוא התחלה.',
    clothingInterpretation: 'איזון בין יציבה לתנועה, קדימה בביטחון. הבגד מאפשר ללכת קדימה — רגליים על הקרקע, ראש בעננים.',
    ashdodContext: 'אשדוד בעיקר, אבל בעיניים על העולם. מהנמל יוצאות ספינות לכל כיוון.',
    images: ['/images/teacher-female-01.png', '/images/teacher-powerful-03.png'],
    videoSrc: '',
    accentColor: '#2a9b9f',
  },
];

const TOTAL_PAGES = 9; // cover + toc + 6 typologies + closing

// ─── Editable Text Component ───
function EditableText({ value, onSave, editMode, style, tag: Tag = 'p' }) {
  const ref = useRef(null);

  const handleBlur = () => {
    if (editMode && ref.current) {
      const newVal = ref.current.innerText;
      if (newVal !== value) onSave(newVal);
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
        borderBottom: editMode ? '1px dashed rgba(200,90,54,0.4)' : 'none',
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
    <div style={{
      width: '100%',
      height: '100%',
      background: `linear-gradient(160deg, ${COLORS.darkBlue} 0%, ${COLORS.harbourBlue} 40%, ${COLORS.coralTeal} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.06,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 61px),
                          repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 61px)`,
      }} />

      <div style={{
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '11px',
        letterSpacing: '6px',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
        fontWeight: '300',
      }}>
        {'ASHDOD EDUCATION MAGAZINE'}
      </div>

      <div style={{
        textAlign: 'center',
        color: COLORS.white,
        padding: '0 40px',
        maxWidth: '900px',
      }}>
        <div style={{
          width: '60px',
          height: '2px',
          background: COLORS.apricotRed,
          margin: '0 auto 40px',
        }} />

        <h1 style={{
          fontSize: 'clamp(42px, 8vw, 96px)',
          fontWeight: '200',
          lineHeight: '1.1',
          marginBottom: '16px',
          letterSpacing: '-1px',
        }}>
          {'המורה של'}
        </h1>
        <h1 style={{
          fontSize: 'clamp(48px, 10vw, 120px)',
          fontWeight: '800',
          lineHeight: '1.0',
          marginBottom: '32px',
          letterSpacing: '-2px',
          background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.apricotRed} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {'אשדוד מחר'}
        </h1>

        <div style={{
          width: '120px',
          height: '1px',
          background: 'rgba(255,255,255,0.3)',
          margin: '0 auto 32px',
        }} />

        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 24px)',
          fontWeight: '300',
          opacity: 0.7,
          letterSpacing: '2px',
          marginBottom: '8px',
        }}>
          {'מצוינות עם נשמה'}
        </p>
        <p style={{
          fontSize: 'clamp(12px, 1.5vw, 16px)',
          fontWeight: '300',
          opacity: 0.4,
          letterSpacing: '4px',
        }}>
          {'אקוסיסטם של משמעות'}
        </p>

        <div style={{
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          opacity: 0.4,
        }}>
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
    <div style={{
      width: '100%',
      height: '100%',
      background: COLORS.offWhite,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      overflowY: 'auto',
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '48px',
        }}>
          <div style={{
            width: '40px',
            height: '2px',
            background: COLORS.apricotRed,
          }} />
          <h2 style={{
            fontSize: '11px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: COLORS.harbourBlue,
            fontWeight: '700',
          }}>
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
              padding: '16px 0',
              borderTop: i === 0 ? `1px solid ${COLORS.industryGray}` : 'none',
              borderBottom: `1px solid ${COLORS.industryGray}`,
              borderLeft: 'none',
              borderRight: 'none',
              background: 'transparent',
              cursor: 'pointer',
              textAlign: 'right',
              gap: '24px',
              fontFamily: 'inherit',
            }}
          >
            <span style={{
              fontSize: '32px',
              fontWeight: '100',
              color: typo.accentColor,
              minWidth: '50px',
            }}>
              {typo.number}
            </span>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: COLORS.harbourBlue,
                marginBottom: '2px',
              }}>
                {typo.title}
              </h3>
              <p style={{
                fontSize: '12px',
                color: 'rgba(0,0,0,0.4)',
                fontWeight: '300',
              }}>
                {typo.description.slice(0, 70)}...
              </p>
            </div>
            <span style={{
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.3)',
            }}>
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
  const isEven = index % 2 === 0;
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onUpdate(typo.id, 'images', [...typo.images, reader.result]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveImage = (idx) => {
    onUpdate(typo.id, 'images', typo.images.filter((_, i) => i !== idx));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onUpdate(typo.id, 'videoSrc', reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      border: editMode ? '2px dashed rgba(200,90,54,0.3)' : 'none',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 40px',
        borderBottom: `1px solid ${COLORS.industryGray}`,
        background: COLORS.white,
        flexShrink: 0,
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{
            fontSize: '40px',
            fontWeight: '100',
            color: typo.accentColor,
            lineHeight: '1',
          }}>
            {typo.number}
          </span>
          <div style={{ width: '1px', height: '28px', background: COLORS.industryGray }} />
          <span style={{
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: COLORS.harbourBlue,
            fontWeight: '600',
          }}>
            {typo.subtitle}
          </span>
        </div>
        <span style={{
          fontSize: '10px',
          letterSpacing: '3px',
          color: 'rgba(0,0,0,0.25)',
          textTransform: 'uppercase',
        }}>
          {'המורה של אשדוד מחר'}
        </span>
      </div>

      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
      }}>
        {/* Image / Video side */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          order: isEven ? 1 : 2,
        }}>
          {typo.videoSrc ? (
            <video
              src={typo.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : typo.images[0] ? (
            <img
              src={typo.images[0]}
              alt={typo.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: COLORS.industryGray,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.harbourBlue,
              fontSize: '14px',
            }}>
              {'אין תמונה'}
            </div>
          )}

          <div style={{
            position: 'absolute',
            inset: 0,
            background: isEven
              ? 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 50%)'
              : 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />

          {/* Pull quote overlay */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: isEven ? '24px' : 'auto',
            left: isEven ? 'auto' : '24px',
            maxWidth: '260px',
            padding: '20px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            borderRight: `3px solid ${typo.accentColor}`,
          }}>
            <p style={{
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: typo.accentColor,
              marginBottom: '6px',
              fontWeight: '600',
            }}>
              {'פרשנות אדריכלית'}
            </p>
            <EditableText
              value={typo.architectureInterpretation}
              onSave={(v) => onUpdate(typo.id, 'architectureInterpretation', v)}
              editMode={editMode}
              style={{
                fontSize: '13px',
                color: COLORS.white,
                lineHeight: '1.7',
                fontWeight: '300',
              }}
            />
          </div>

          {/* Edit controls on image */}
          {editMode && (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              gap: '8px',
              zIndex: 5,
            }}>
              {typo.videoSrc && (
                <button
                  onClick={() => onUpdate(typo.id, 'videoSrc', '')}
                  style={{
                    background: COLORS.apricotRed,
                    border: 'none',
                    color: COLORS.white,
                    borderRadius: '4px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <X size={12} />
                  {'הסר סרטון'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Text side */}
        <div style={{
          order: isEven ? 2 : 1,
          padding: '32px 40px',
          display: 'flex',
          flexDirection: 'column',
          background: isEven ? COLORS.cream : COLORS.white,
          overflowY: 'auto',
        }}>
          <div style={{
            width: '40px',
            height: '3px',
            background: typo.accentColor,
            marginBottom: '16px',
          }} />

          <EditableText
            value={typo.title}
            onSave={(v) => onUpdate(typo.id, 'title', v)}
            editMode={editMode}
            tag="h2"
            style={{
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              fontWeight: '700',
              color: COLORS.harbourBlue,
              lineHeight: '1.2',
              marginBottom: '16px',
            }}
          />

          <EditableText
            value={typo.description}
            onSave={(v) => onUpdate(typo.id, 'description', v)}
            editMode={editMode}
            style={{
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              color: COLORS.black,
              lineHeight: '1.8',
              marginBottom: '24px',
              fontWeight: '300',
            }}
          />

          {/* Clothing interpretation */}
          <div style={{
            padding: '16px 0',
            borderTop: `1px solid ${COLORS.industryGray}`,
            borderBottom: `1px solid ${COLORS.industryGray}`,
            marginBottom: '20px',
          }}>
            <p style={{
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: typo.accentColor,
              marginBottom: '8px',
              fontWeight: '700',
            }}>
              {'פרשנות בבגדים ועיצוב'}
            </p>
            <EditableText
              value={typo.clothingInterpretation}
              onSave={(v) => onUpdate(typo.id, 'clothingInterpretation', v)}
              editMode={editMode}
              style={{
                fontSize: '14px',
                color: COLORS.black,
                lineHeight: '1.8',
                fontStyle: 'italic',
                fontWeight: '300',
              }}
            />
          </div>

          {/* Ashdod context */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
            marginBottom: '20px',
          }}>
            <div style={{
              width: '3px',
              minHeight: '32px',
              background: `linear-gradient(to bottom, ${typo.accentColor}, transparent)`,
              flexShrink: 0,
              marginTop: '3px',
            }} />
            <div>
              <p style={{
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: COLORS.duneGreen,
                marginBottom: '6px',
                fontWeight: '700',
              }}>
                {'אשדוד בהקשר זה'}
              </p>
              <EditableText
                value={typo.ashdodContext}
                onSave={(v) => onUpdate(typo.id, 'ashdodContext', v)}
                editMode={editMode}
                style={{
                  fontSize: '13px',
                  color: 'rgba(0,0,0,0.6)',
                  lineHeight: '1.7',
                }}
              />
            </div>
          </div>

          {/* Secondary images gallery */}
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: 'auto',
          }}>
            {typo.images.slice(1).map((src, idx) => (
              <div key={idx} style={{
                position: 'relative',
                flex: '1 1 140px',
                maxWidth: '220px',
                aspectRatio: '4/3',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <img
                  src={src}
                  alt={`${typo.title} ${idx + 2}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {editMode && (
                  <button
                    onClick={() => handleRemoveImage(idx + 1)}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: COLORS.apricotRed,
                      border: 'none',
                      color: COLORS.white,
                      borderRadius: '2px',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                    }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}

            {/* Edit mode: add image / video buttons */}
            {editMode && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 12px',
                  background: COLORS.duneGreen,
                  color: COLORS.white,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontFamily: 'inherit',
                }}>
                  <Plus size={12} />
                  {'תמונה'}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 12px',
                  background: COLORS.harbourBlue,
                  color: COLORS.white,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontFamily: 'inherit',
                }}>
                  <Upload size={12} />
                  {'סרטון'}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
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
    <div style={{
      width: '100%',
      height: '100%',
      background: `linear-gradient(160deg, ${COLORS.darkBlue} 0%, ${COLORS.harbourBlue} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '60px 40px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '60px',
        height: '2px',
        background: COLORS.apricotRed,
        margin: '0 auto 40px',
      }} />

      <h2 style={{
        fontSize: 'clamp(24px, 4vw, 48px)',
        fontWeight: '200',
        color: COLORS.white,
        marginBottom: '16px',
        lineHeight: '1.3',
      }}>
        {'כי המורה הוא'}
      </h2>
      <h2 style={{
        fontSize: 'clamp(28px, 5vw, 56px)',
        fontWeight: '700',
        color: COLORS.white,
        marginBottom: '40px',
        lineHeight: '1.2',
      }}>
        {'השינוי שאנחנו רוצים לראות'}
      </h2>

      <div style={{
        width: '120px',
        height: '1px',
        background: 'rgba(255,255,255,0.2)',
        margin: '0 auto 40px',
      }} />

      <p style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '2px',
      }}>
        {'מצוינות עם נשמה — אקוסיסטם של משמעות'}
      </p>

      <div style={{
        marginTop: '60px',
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
      }}>
        {['#2a9b9f', '#c85a36', '#8a9b7f', '#1a4d7a', '#2a9b9f', '#c85a36'].map((c, i) => (
          <div key={i} style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: c,
            opacity: 0.6,
          }} />
        ))}
      </div>

      <div style={{
        marginTop: '80px',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '3px',
        textTransform: 'uppercase',
      }}>
        {'עיריית אשדוד — מנהל חינוך'}
      </div>
    </div>
  );
}

// ─── Navigation Dots ───
function PageDots({ current, total, onGoTo }) {
  return (
    <div style={{
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
    }}>
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

// ─── Main Magazine Component ───
export default function AshdodMagazine() {
  const [currentPage, setCurrentPage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [typologies, setTypologies] = useState(DEFAULT_TYPOLOGIES);
  const [saveMsg, setSaveMsg] = useState(false);
  const touchStart = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('ashdod-magazine-data');
    if (saved) {
      try {
        setTypologies(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const goTo = useCallback((page) => {
    setCurrentPage(Math.max(0, Math.min(TOTAL_PAGES - 1, page)));
  }, []);

  const goNext = useCallback(() => goTo(currentPage + 1), [currentPage, goTo]);
  const goPrev = useCallback(() => goTo(currentPage - 1), [currentPage, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (editMode) return;
      if (e.key === 'ArrowLeft') goNext(); // RTL: left = next
      if (e.key === 'ArrowRight') goPrev(); // RTL: right = prev
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, editMode]);

  // Touch/swipe navigation
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 50) {
      // RTL: swipe right (positive delta) = prev, swipe left (negative) = next
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStart.current = null;
  };

  const updateTypology = useCallback((id, field, value) => {
    setTypologies(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  }, []);

  const handleSave = () => {
    localStorage.setItem('ashdod-magazine-data', JSON.stringify(typologies));
    setSaveMsg(true);
    setTimeout(() => setSaveMsg(false), 2000);
  };

  const navigateToTypology = (id) => {
    goTo(id + 1); // cover=0, toc=1, typology 1=page 2, etc.
  };

  const renderPage = (pageIndex) => {
    if (pageIndex === 0) return <CoverPage />;
    if (pageIndex === 1) return <TableOfContents typologies={typologies} onNavigate={navigateToTypology} />;
    if (pageIndex >= 2 && pageIndex <= 7) {
      const typoIndex = pageIndex - 2;
      return (
        <TypologySpread
          typo={typologies[typoIndex]}
          index={typoIndex}
          editMode={editMode}
          onUpdate={updateTypology}
        />
      );
    }
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
      {/* Page container */}
      {Array.from({ length: TOTAL_PAGES }, (_, i) => {
        // Only render pages within range of 1 from current
        if (Math.abs(i - currentPage) > 1) return null;
        // RTL: positive offset = move right (which is "back" in RTL)
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

      {/* Navigation arrows */}
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
            transition: 'background 0.2s',
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
            transition: 'background 0.2s',
          }}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Page dots */}
      <PageDots current={currentPage} total={TOTAL_PAGES} onGoTo={goTo} />

      {/* Edit mode toggle */}
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
          width: '40px',
          height: '40px',
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
        {editMode ? <Save size={18} /> : <Edit2 size={18} />}
      </button>

      {/* Save confirmation */}
      {saveMsg && (
        <div style={{
          position: 'fixed',
          top: '16px',
          left: '64px',
          zIndex: 1000,
          background: COLORS.duneGreen,
          color: COLORS.white,
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '13px',
          fontFamily: 'inherit',
          animation: 'fadeOut 2s forwards',
        }}>
          {'נשמר בהצלחה'}
        </div>
      )}

      {/* Edit mode indicator */}
      {editMode && (
        <div style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'rgba(200,90,54,0.9)',
          color: COLORS.white,
          padding: '6px 20px',
          borderRadius: '20px',
          fontSize: '12px',
          fontFamily: 'inherit',
          letterSpacing: '1px',
        }}>
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
      `}</style>
    </div>
  );
}
