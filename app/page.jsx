'use client';

import React, { useState, useEffect } from 'react';
import { Edit2, X, Save } from 'lucide-react';

const ASHDOD_COLORS = {
  harbourBlue: '#1a4d7a',
  coralTeal: '#2a9b9f',
  apricotRed: '#c85a36',
  industryGray: '#d9d9d9',
  duneGreen: '#8a9b7f',
  white: '#ffffff',
  black: '#000000'
};

const DEFAULT_TYPOLOGIES = [
  {
    id: 1,
    title: 'המורה כמוביל חדשנות',
    description: 'מנהל תנועה, חוקר, מעתיק וקודם שינוי בכלים ובתוכן',
    architectureInterpretation: 'הנמל - תנועה, זרימה, גשרים בד',
    clothingInterpretation: 'שכבות שקופות, בדים חדשים, קווי תנועה אופקיים',
    ashdodContext: 'אזור התעשיה, טכנולוגיה, חדשנות שנשמרת בעדינות',
    images: [
      { id: 101, src: '/images/teacher-powerful-00.png', name: 'מורה חדשנות 1' },
      { id: 102, src: '/images/teacher-powerful-02.png', name: 'מורה חדשנות 2' }
    ]
  },
  {
    id: 2,
    title: 'המורה כמחבר קהילה',
    description: 'בונה קשרים, מחזק בעלויות ציבוריות וקשרים בין הדורות',
    architectureInterpretation: 'הפסיפס - בדים רבים בהרמוניה, צבעים מתגוונים',
    clothingInterpretation: 'בדים שונים יחד בחיבורים חזקים',
    ashdodContext: 'תרבויות רבות ועדות שונות בעיר אחת',
    images: [
      { id: 201, src: '/images/teacher-warm-00.png', name: 'מורה קהילה 1' },
      { id: 202, src: '/images/teacher-warm-01.png', name: 'מורה קהילה 2' }
    ]
  },
  {
    id: 3,
    title: 'המורה כמפתח יצירתיות',
    description: 'מעורר ביטוי, מטפח תעשייה ויצירה בתלמידיו',
    architectureInterpretation: 'אוכל, אומנות, מוזיקה - חום וטוב',
    clothingInterpretation: 'צבעים מעבירים, קווי עקומה, פרטים לא צפויים',
    ashdodContext: 'תרבות אוכל, אומנות ומוזיקה בעיר',
    images: [
      { id: 301, src: '/images/teacher-warm-02.png', name: 'מורה יצירתיות 1' },
      { id: 302, src: '/images/teacher-warm-03.png', name: 'מורה יצירתיות 2' }
    ]
  },
  {
    id: 4,
    title: 'המורה כמקדם הכלה',
    description: 'פותח דלתות לכל ילד, משדרג שוויון הזדמנויות',
    architectureInterpretation: 'גם וגם - ישן וחדש, דואליות ללא סתירה',
    clothingInterpretation: 'שכבות שונות בעומק, דואליות יפה',
    ashdodContext: 'חרדי חילוני, ימין שמאל, צעיר מבוגר - אשדוד היא כל זה',
    images: [
      { id: 401, src: '/images/teacher-male-00.png', name: 'מורה הכלה 1' },
      { id: 402, src: '/images/teacher-male-01.png', name: 'מורה הכלה 2' }
    ]
  },
  {
    id: 5,
    title: 'המורה כמטפח חוסן',
    description: 'מעמיד בניצב חוסן, משמעות וקשיחות רוח',
    architectureInterpretation: 'השפך - טבע בעירוב עם כוח בנייה',
    clothingInterpretation: 'תפרים חזקים ברקע, מבנה יציב וקלילות',
    ashdodContext: 'הנמל שעמד במשברים, חוסן הקהילה',
    images: [
      { id: 501, src: '/images/teacher-male-02.png', name: 'מורה חוסן 1' },
      { id: 502, src: '/images/teacher-female-01.png', name: 'מורה חוסן 2' },
      { id: 503, src: '/images/teacher-male-03b.png', name: 'מורה חוסן 3' }
    ]
  },
  {
    id: 6,
    title: 'המורה כמחבר בין אדם, עיר ועולם',
    description: 'מחבר תלמידים לזהות עיר, לעתיד גלובלי וללמידה בתנועה',
    architectureInterpretation: 'נחל לכיש, הנמל, החוף - תנועה ופתיחות',
    clothingInterpretation: 'איזון בין יציבה לתנועה, קדימה בבטחון',
    ashdodContext: 'אשדוד בעיקר, אבל בעיניים על העולם',
    images: [
      { id: 601, src: '/images/teacher-male-03.png', name: 'מורה עיר ועולם 1' },
      { id: 602, src: '/images/teacher-powerful-03.png', name: 'מורה עיר ועולם 2' }
    ]
  }
];

export default function AshdodTeachersCMS() {
  const [typologies, setTypologies] = useState(DEFAULT_TYPOLOGIES);
  const [selectedId, setSelectedId] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('ashdodTypologies');
    if (saved) {
      try {
        setTypologies(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading data:', e);
      }
    }
  }, []);

  const saveData = (data) => {
    localStorage.setItem('ashdodTypologies', JSON.stringify(data));
  };

  const handleSelectTypology = (id) => {
    setSelectedId(id);
    setIsEditing(false);
  };

  const handleEdit = () => {
    const selected = typologies.find(t => t.id === selectedId);
    setFormData(JSON.parse(JSON.stringify(selected)));
    setIsEditing(true);
  };

  const handleSave = () => {
    const updated = typologies.map(t =>
      t.id === selectedId ? formData : t
    );
    setTypologies(updated);
    saveData(updated);
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = [...(formData.images || [])];

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push({
          id: Date.now() + Math.random(),
          src: reader.result,
          name: file.name
        });
        setFormData(prev => ({
          ...prev,
          images: [...newImages]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const selected = typologies.find(t => t.id === selectedId);

  return (
    <div dir="rtl" style={{ backgroundColor: ASHDOD_COLORS.white }}>
      <header style={{
        backgroundColor: ASHDOD_COLORS.harbourBlue,
        color: ASHDOD_COLORS.white,
        padding: '40px 20px',
        textAlign: 'center',
        borderBottom: `4px solid ${ASHDOD_COLORS.coralTeal}`
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          {'המורה של אשדוד מחר'}
        </h1>
        <p style={{ fontSize: '14px', opacity: 0.9, fontWeight: '300' }}>
          {'מצוינות עם נשמה - אקוסיסטם של משמעות'}
        </p>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
        <aside style={{
          width: '280px',
          backgroundColor: ASHDOD_COLORS.industryGray,
          padding: '20px',
          overflowY: 'auto',
          borderLeft: `1px solid ${ASHDOD_COLORS.apricotRed}`,
          direction: 'rtl'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '700',
            color: ASHDOD_COLORS.harbourBlue,
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {'טיפולוגיות'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {typologies.map(typo => (
              <button
                key={typo.id}
                onClick={() => handleSelectTypology(typo.id)}
                style={{
                  padding: '12px 12px',
                  textAlign: 'right',
                  border: 'none',
                  backgroundColor: selectedId === typo.id
                    ? ASHDOD_COLORS.harbourBlue
                    : ASHDOD_COLORS.white,
                  color: selectedId === typo.id
                    ? ASHDOD_COLORS.white
                    : ASHDOD_COLORS.harbourBlue,
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  borderRight: selectedId === typo.id
                    ? `4px solid ${ASHDOD_COLORS.apricotRed}`
                    : 'none'
                }}
              >
                {typo.title}
              </button>
            ))}
          </div>
        </aside>

        <main style={{
          flex: 1,
          padding: '40px',
          overflowY: 'auto',
          direction: 'rtl'
        }}>
          {!isEditing && selected && (
            <>
              <div style={{ maxWidth: '800px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '32px',
                  gap: '16px'
                }}>
                  <div>
                    <h2 style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.harbourBlue,
                      marginBottom: '8px'
                    }}>
                      {selected.title}
                    </h2>
                    <p style={{
                      fontSize: '14px',
                      color: ASHDOD_COLORS.coralTeal,
                      fontWeight: '600'
                    }}>
                      {'עיצוב וטיפולוגיה'}
                    </p>
                  </div>

                  <button
                    onClick={handleEdit}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      backgroundColor: ASHDOD_COLORS.apricotRed,
                      color: ASHDOD_COLORS.white,
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '13px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Edit2 size={16} />
                    {'עריכה'}
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gap: '32px',
                  lineHeight: '1.8'
                }}>
                  <section>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.harbourBlue,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '8px'
                    }}>
                      {'תיאור'}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: ASHDOD_COLORS.black,
                      lineHeight: '1.7'
                    }}>
                      {selected.description}
                    </p>
                  </section>

                  <section>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.harbourBlue,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '8px'
                    }}>
                      {'פרשנות אדריכלית'}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: ASHDOD_COLORS.black,
                      lineHeight: '1.7'
                    }}>
                      {selected.architectureInterpretation}
                    </p>
                  </section>

                  <section>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.coralTeal,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '8px'
                    }}>
                      {'פרשנות בבגדים ועיצוב'}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: ASHDOD_COLORS.black,
                      lineHeight: '1.7'
                    }}>
                      {selected.clothingInterpretation}
                    </p>
                  </section>

                  <section>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.apricotRed,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '8px'
                    }}>
                      {'אשדוד בהקשר זה'}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: ASHDOD_COLORS.black,
                      lineHeight: '1.7'
                    }}>
                      {selected.ashdodContext}
                    </p>
                  </section>
                </div>

                {selected.images && selected.images.length > 0 && (
                  <section style={{ marginTop: '40px' }}>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.harbourBlue,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '16px'
                    }}>
                      {'גלריה'}
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '16px'
                    }}>
                      {selected.images.map(img => (
                        <div key={img.id} style={{
                          aspectRatio: '3/4',
                          overflow: 'hidden',
                          borderRadius: '4px',
                          backgroundColor: ASHDOD_COLORS.industryGray,
                          border: `1px solid ${ASHDOD_COLORS.duneGreen}`
                        }}>
                          <img
                            src={img.src}
                            alt={img.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </>
          )}

          {isEditing && (
            <>
              <div style={{ maxWidth: '800px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '32px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: ASHDOD_COLORS.harbourBlue
                  }}>
                    {'עריכה: '}{selected.title}
                  </h3>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handleSave}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        backgroundColor: ASHDOD_COLORS.duneGreen,
                        color: ASHDOD_COLORS.white,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px'
                      }}
                    >
                      <Save size={16} />
                      {'שמירה'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: ASHDOD_COLORS.industryGray,
                        color: ASHDOD_COLORS.harbourBlue,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px'
                      }}
                    >
                      {'ביטול'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.harbourBlue,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}>
                      {'כותרת'}
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${ASHDOD_COLORS.industryGray}`,
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        direction: 'rtl',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.harbourBlue,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}>
                      {'תיאור'}
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${ASHDOD_COLORS.industryGray}`,
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        direction: 'rtl',
                        minHeight: '80px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.harbourBlue,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}>
                      {'פרשנות אדריכלית'}
                    </label>
                    <textarea
                      value={formData.architectureInterpretation || ''}
                      onChange={(e) => handleFieldChange('architectureInterpretation', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${ASHDOD_COLORS.industryGray}`,
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        direction: 'rtl',
                        minHeight: '80px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.coralTeal,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}>
                      {'פרשנות בבגדים'}
                    </label>
                    <textarea
                      value={formData.clothingInterpretation || ''}
                      onChange={(e) => handleFieldChange('clothingInterpretation', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${ASHDOD_COLORS.industryGray}`,
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        direction: 'rtl',
                        minHeight: '80px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.apricotRed,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}>
                      {'אשדוד בהקשר זה'}
                    </label>
                    <textarea
                      value={formData.ashdodContext || ''}
                      onChange={(e) => handleFieldChange('ashdodContext', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${ASHDOD_COLORS.industryGray}`,
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        direction: 'rtl',
                        minHeight: '80px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{
                    padding: '20px',
                    backgroundColor: ASHDOD_COLORS.industryGray,
                    borderRadius: '4px',
                    border: `1px dashed ${ASHDOD_COLORS.duneGreen}`
                  }}>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: ASHDOD_COLORS.harbourBlue,
                      marginBottom: '12px',
                      textTransform: 'uppercase'
                    }}>
                      {'תמונות'}
                    </label>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{
                        display: 'block',
                        marginBottom: '16px',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    />

                    {formData.images && formData.images.length > 0 && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: '8px'
                      }}>
                        {formData.images.map(img => (
                          <div key={img.id} style={{
                            position: 'relative',
                            aspectRatio: '3/4',
                            overflow: 'hidden',
                            borderRadius: '4px',
                            backgroundColor: ASHDOD_COLORS.white,
                            border: `1px solid ${ASHDOD_COLORS.coralTeal}`
                          }}>
                            <img
                              src={img.src}
                              alt={img.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                            <button
                              onClick={() => handleRemoveImage(img.id)}
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: ASHDOD_COLORS.apricotRed,
                                border: 'none',
                                color: ASHDOD_COLORS.white,
                                borderRadius: '2px',
                                cursor: 'pointer',
                                padding: '2px 4px',
                                display: 'flex'
                              }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <footer style={{
        backgroundColor: ASHDOD_COLORS.harbourBlue,
        color: ASHDOD_COLORS.white,
        padding: '20px',
        textAlign: 'center',
        fontSize: '12px',
        marginTop: '40px',
        opacity: 0.8
      }}>
        <p>{'הנתונים נשמרים ב-localStorage | לשילוב עם Supabase: חבר בקונפיג למעלה'}</p>
      </footer>
    </div>
  );
}
