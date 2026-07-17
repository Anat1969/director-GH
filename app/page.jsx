'use client';

import React, { useState, useEffect, useRef } from 'react';

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

const TYPOLOGIES = [
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
    accentColor: COLORS.coralTeal,
    layout: 'split',
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
    accentColor: COLORS.apricotRed,
    layout: 'overlap',
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
    accentColor: COLORS.duneGreen,
    layout: 'editorial',
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
    accentColor: COLORS.harbourBlue,
    layout: 'fullbleed',
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
    accentColor: COLORS.apricotRed,
    layout: 'mosaic',
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
    accentColor: COLORS.coralTeal,
    layout: 'panoramic',
  },
];

function CoverPage({ onEnter }) {
  return (
    <section style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, ${COLORS.darkBlue} 0%, ${COLORS.harbourBlue} 40%, ${COLORS.coralTeal} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
    }}
    onClick={onEnter}
    >
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

      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'bounce 2s infinite',
      }}>
        <span style={{
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
        }}>
          {'גלול למטה'}
        </span>
        <div style={{
          width: '1px',
          height: '30px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
        }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}

function TypologySpread({ typo, index }) {
  const isEven = index % 2 === 0;

  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Number + Subtitle header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: `1px solid ${COLORS.industryGray}`,
        background: COLORS.white,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{
            fontSize: '48px',
            fontWeight: '100',
            color: typo.accentColor,
            lineHeight: '1',
          }}>
            {typo.number}
          </span>
          <div style={{
            width: '1px',
            height: '32px',
            background: COLORS.industryGray,
          }} />
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
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'rgba(0,0,0,0.3)',
          textTransform: 'uppercase',
        }}>
          {'המורה של אשדוד מחר'}
        </span>
      </div>

      {/* Main spread content */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
        minHeight: 'calc(100vh - 73px)',
      }}>
        {/* Image side */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          order: isEven ? 1 : 2,
          minHeight: '500px',
        }}>
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
          <div style={{
            position: 'absolute',
            inset: 0,
            background: isEven
              ? `linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 50%)`
              : `linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 50%)`,
          }} />

          {/* Pull quote on image */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            right: isEven ? '40px' : 'auto',
            left: isEven ? 'auto' : '40px',
            maxWidth: '280px',
            padding: '24px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            borderRight: `3px solid ${typo.accentColor}`,
          }}>
            <p style={{
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: typo.accentColor,
              marginBottom: '8px',
              fontWeight: '600',
            }}>
              {'פרשנות אדריכלית'}
            </p>
            <p style={{
              fontSize: '14px',
              color: COLORS.white,
              lineHeight: '1.7',
              fontWeight: '300',
            }}>
              {typo.architectureInterpretation}
            </p>
          </div>
        </div>

        {/* Text side */}
        <div style={{
          order: isEven ? 2 : 1,
          padding: '60px 50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: isEven ? COLORS.cream : COLORS.white,
          position: 'relative',
        }}>
          {/* Decorative accent */}
          <div style={{
            position: 'absolute',
            top: '60px',
            right: isEven ? '50px' : 'auto',
            left: isEven ? 'auto' : '50px',
            width: '40px',
            height: '3px',
            background: typo.accentColor,
          }} />

          <div style={{ maxWidth: '480px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: '700',
              color: COLORS.harbourBlue,
              lineHeight: '1.2',
              marginBottom: '24px',
              marginTop: '20px',
            }}>
              {typo.title}
            </h2>

            <p style={{
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              color: COLORS.black,
              lineHeight: '1.9',
              marginBottom: '40px',
              fontWeight: '300',
            }}>
              {typo.description}
            </p>

            {/* Clothing interpretation */}
            <div style={{
              padding: '24px 0',
              borderTop: `1px solid ${COLORS.industryGray}`,
              borderBottom: `1px solid ${COLORS.industryGray}`,
              marginBottom: '32px',
            }}>
              <p style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: typo.accentColor,
                marginBottom: '10px',
                fontWeight: '700',
              }}>
                {'פרשנות בבגדים ועיצוב'}
              </p>
              <p style={{
                fontSize: '15px',
                color: COLORS.black,
                lineHeight: '1.8',
                fontStyle: 'italic',
                fontWeight: '300',
              }}>
                {typo.clothingInterpretation}
              </p>
            </div>

            {/* Ashdod context */}
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '4px',
                minHeight: '40px',
                background: `linear-gradient(to bottom, ${typo.accentColor}, transparent)`,
                flexShrink: 0,
                marginTop: '4px',
              }} />
              <div>
                <p style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: COLORS.duneGreen,
                  marginBottom: '8px',
                  fontWeight: '700',
                }}>
                  {'אשדוד בהקשר זה'}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(0,0,0,0.6)',
                  lineHeight: '1.7',
                }}>
                  {typo.ashdodContext}
                </p>
              </div>
            </div>
          </div>

          {/* Secondary image */}
          {typo.images[1] && (
            <div style={{
              marginTop: '40px',
              maxWidth: '480px',
            }}>
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: typo.images.length > 2 ? '21/9' : '16/9',
                borderRadius: '2px',
              }}>
                <img
                  src={typo.images[1]}
                  alt={`${typo.title} - 2`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              {typo.images[2] && (
                <div style={{
                  marginTop: '8px',
                  overflow: 'hidden',
                  aspectRatio: '21/9',
                  borderRadius: '2px',
                }}>
                  <img
                    src={typo.images[2]}
                    alt={`${typo.title} - 3`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Page divider */}
      <div style={{
        height: '1px',
        background: `linear-gradient(to right, transparent, ${typo.accentColor}, transparent)`,
      }} />
    </section>
  );
}

function TableOfContents({ onNavigate }) {
  return (
    <section style={{
      minHeight: '100vh',
      background: COLORS.offWhite,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '60px 40px',
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '60px',
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

        {TYPOLOGIES.map((typo, i) => (
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
              transition: 'all 0.3s',
              gap: '24px',
            }}
          >
            <span style={{
              fontSize: '36px',
              fontWeight: '100',
              color: typo.accentColor,
              minWidth: '60px',
            }}>
              {typo.number}
            </span>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: COLORS.harbourBlue,
                marginBottom: '4px',
              }}>
                {typo.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(0,0,0,0.4)',
                fontWeight: '300',
              }}>
                {typo.description.slice(0, 80)}...
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
    </section>
  );
}

function ClosingPage() {
  return (
    <section style={{
      minHeight: '60vh',
      background: `linear-gradient(160deg, ${COLORS.darkBlue} 0%, ${COLORS.harbourBlue} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '80px 40px',
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
        marginBottom: '8px',
      }}>
        {'מצוינות עם נשמה — אקוסיסטם של משמעות'}
      </p>

      <div style={{
        marginTop: '60px',
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {[COLORS.coralTeal, COLORS.apricotRed, COLORS.duneGreen, COLORS.harbourBlue, COLORS.coralTeal, COLORS.apricotRed].map((c, i) => (
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
    </section>
  );
}

export default function AshdodMagazine() {
  const sectionRefs = useRef({});

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContent = () => {
    const el = sectionRefs.current['toc'];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div dir="rtl" style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      overflowX: 'hidden',
    }}>
      <style>{`
        html { scroll-behavior: smooth; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        img { user-select: none; -webkit-user-drag: none; }
        @media (max-width: 768px) {
          .magazine-grid { grid-template-columns: 1fr !important; }
          .magazine-text { padding: 40px 24px !important; }
          .magazine-img { min-height: 400px !important; }
          .toc-item { flex-direction: column !important; gap: 8px !important; }
        }
      `}</style>

      <CoverPage onEnter={scrollToContent} />

      <div ref={(el) => sectionRefs.current['toc'] = el}>
        <TableOfContents onNavigate={scrollToSection} />
      </div>

      {TYPOLOGIES.map((typo, index) => (
        <div key={typo.id} ref={(el) => sectionRefs.current[typo.id] = el}>
          <TypologySpread typo={typo} index={index} />
        </div>
      ))}

      <ClosingPage />
    </div>
  );
}
