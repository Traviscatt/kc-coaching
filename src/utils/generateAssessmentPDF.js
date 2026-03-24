import { jsPDF } from 'jspdf';

const PRIMARY = [10, 22, 40];
const DARK = [26, 26, 26];
const GRAY = [100, 100, 100];
const LIGHT_BG = [245, 245, 245];
const TABLE_HEADER = [10, 22, 40];
const TABLE_HEADER_TEXT = [255, 255, 255];
const TABLE_ALT = [248, 248, 248];

export default function generateAssessmentPDF(formData, lifeAreas) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  function checkPage(needed = 20) {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  }

  function addTitle(text) {
    checkPage(20);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PRIMARY);
    doc.text(text, pageWidth / 2, y, { align: 'center' });
    y += 10;
  }

  function addSectionHeader(text) {
    checkPage(18);
    y += 4;
    doc.setFillColor(...PRIMARY);
    doc.roundedRect(margin, y - 5, contentWidth, 10, 2, 2, 'F');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(text, margin + 5, y + 2);
    y += 12;
  }

  function addField(label, value) {
    if (!value || (Array.isArray(value) && value.every((v) => !v))) return;
    checkPage(16);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GRAY);
    doc.text(label, margin, y);
    y += 5;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...DARK);

    const text = Array.isArray(value)
      ? value.filter(Boolean).map((v, i) => `${i + 1}. ${v}`).join('\n')
      : value;

    const lines = doc.splitTextToSize(text, contentWidth);
    lines.forEach((line) => {
      checkPage(6);
      doc.text(line, margin, y);
      y += 5;
    });
    y += 3;
  }

  // ===== HEADER =====
  addTitle('Life Coaching Assessment');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...GRAY);
  doc.text('KC Coaching', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // ===== PERSONAL INFO =====
  addSectionHeader('Personal Information');
  addField('Full Name', formData.fullName);
  addField('Date of Assessment', formData.assessmentDate);
  addField('Email', formData.email);
  addField('Phone', formData.phone);

  // ===== SECTION 1: LIFE OVERVIEW =====
  addSectionHeader('Section 1: Current Life Overview');
  checkPage(20);

  // Table header
  const col1 = margin;
  const col2 = margin + contentWidth * 0.55;
  const col3 = margin + contentWidth * 0.7;
  const rowHeight = 7;

  doc.setFillColor(...TABLE_HEADER);
  doc.rect(col1, y - 4, contentWidth, rowHeight, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...TABLE_HEADER_TEXT);
  doc.text('Life Area', col1 + 3, y);
  doc.text('Rating', col2 + 3, y);
  doc.text('Comments', col3 + 3, y);
  y += rowHeight;

  // Table rows
  const commentColWidth = contentWidth - (contentWidth * 0.7) - 3;
  lifeAreas.forEach((area, i) => {
    const data = formData.lifeAreas[area] || {};
    const comment = data.comment || '';
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const commentLines = comment ? doc.splitTextToSize(comment, commentColWidth) : [''];
    const neededHeight = Math.max(rowHeight, commentLines.length * 4 + 3);
    checkPage(neededHeight + 2);
    if (i % 2 === 0) {
      doc.setFillColor(...TABLE_ALT);
      doc.rect(col1, y - 4, contentWidth, neededHeight, 'F');
    }
    doc.setTextColor(...DARK);
    doc.text(area, col1 + 3, y);
    doc.text(data.rating || '—', col2 + 3, y);
    commentLines.forEach((line, li) => {
      doc.text(line, col3 + 3, y + (li * 4));
    });
    y += neededHeight;
  });
  y += 5;

  // ===== SECTION 2: STRENGTHS & CHALLENGES =====
  addSectionHeader('Section 2: Strengths and Challenges');
  addField('Top 3 Personal Strengths', formData.strengths);
  addField('Top 3 Current Challenges', formData.challenges);

  // ===== SECTION 3: GOALS =====
  addSectionHeader('Section 3: Goals and Aspirations');
  addField('Short-term Goals (3-6 months)', formData.shortTermGoals);
  addField('Long-term Goals (1-5 years)', formData.longTermGoals);
  addField('What Success Looks Like', formData.successVision);

  // ===== SECTION 4: MINDSET =====
  addSectionHeader('Section 4: Mindset and Motivation');
  addField('What Motivates You', formData.motivations);
  addField('What Drains Your Energy', formData.energyDrains);
  addField('How You Handle Setbacks', formData.setbackHandling);
  addField('Limiting Beliefs or Habits', formData.limitingBeliefs);

  // ===== SECTION 5: SUPPORT =====
  addSectionHeader('Section 5: Support and Resources');
  addField('Current Support System', formData.currentSupport);
  addField('Additional Support Needed', formData.neededSupport);
  addField('Past Resources That Helped', formData.pastResources);

  // ===== SECTION 6: COACHING EXPECTATIONS =====
  addSectionHeader('Section 6: Coaching Expectations');
  addField('Hopes for Coaching', formData.coachingHopes);
  addField('Success Criteria', formData.successCriteria);
  addField('Preferred Coaching Style', formData.coachingStyle);
  addField('Preferred Session Frequency', formData.sessionFrequency);

  // ===== SECTION 7: NOTES =====
  addSectionHeader('Section 7: Additional Notes');
  addField('Additional Notes', formData.additionalNotes);

  // ===== SIGNATURE =====
  checkPage(25);
  y += 5;
  doc.setDrawColor(...GRAY);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + 80, y);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...DARK);
  doc.text(formData.signature || '', margin, y - 3);
  y += 5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...GRAY);
  doc.text(`Client Signature`, margin, y);
  const sigDate = formData.signatureDate || new Date().toLocaleDateString('en-US');
  doc.text(`Date: ${sigDate}`, margin + 90, y);

  return doc;
}
