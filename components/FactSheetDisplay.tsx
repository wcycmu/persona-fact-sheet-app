
import React, { useRef } from 'react';
import type { FactSheetData } from '../types';

// Declare jsPDF and html2canvas from CDN
declare const jspdf: any;
declare const html2canvas: any;

interface FactSheetDisplayProps {
  factSheetData: FactSheetData;
  personName: string;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6 p-4 bg-slate-700/50 rounded-lg shadow">
    <h3 className="text-xl font-semibold text-sky-400 mb-3 border-b border-slate-600 pb-2">{title}</h3>
    {children}
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
 <li className="mb-1.5 flex items-start">
    <svg className="w-5 h-5 text-lime-400 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
    <span>{children}</span>
  </li>
);

export const FactSheetDisplay: React.FC<FactSheetDisplayProps> = ({ factSheetData, personName }) => {
  const factSheetContentRef = useRef<HTMLDivElement>(null);

  const downloadPdf = async () => {
    const elementToCapture = factSheetContentRef.current;
    if (elementToCapture && typeof jspdf !== 'undefined' && typeof html2canvas !== 'undefined') {
      try {
        const { jsPDF } = jspdf; // Destructure jsPDF from the global jspdf object
        const canvas = await html2canvas(elementToCapture, { 
          scale: 2, 
          backgroundColor: '#1e293b', // Match slate-800
          useCORS: true 
        });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        let MTPdfHeight = pdf.internal.pageSize.getHeight();
        let heightLeft = pdfHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= MTPdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - pdfHeight; 
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= MTPdfHeight;
        }
        
        pdf.save(`${personName.replace(/\s+/g, '_')}_Fact_Sheet.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Could not generate PDF. See console for details.");
      }
    } else {
      alert("PDF generation library not loaded or content not found.");
    }
  };

  const renderList = (items: string[] | undefined, emptyMessage: string = "No information available.") => {
    if (!items || items.length === 0) {
      return <p className="text-slate-400 italic">{emptyMessage}</p>;
    }
    return (
      <ul className="list-none pl-0 space-y-1 text-slate-300">
        {items.map((item, index) => <ListItem key={index}>{item}</ListItem>)}
      </ul>
    );
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400">
          Fact Sheet: {personName}
        </h2>
        <button
          onClick={downloadPdf}
          className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-lime-500 transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF
        </button>
      </div>

      <div ref={factSheetContentRef} className="p-6 bg-slate-800 rounded-lg"> {/* Added padding here for PDF content */}
        <Section title="Primary Connections">
          {renderList(factSheetData.primaryConnections, "No primary connections listed.")}
        </Section>

        <Section title="Education">
          {renderList(factSheetData.education, "No educational background listed.")}
        </Section>

        <Section title="Key Memberships / Awards">
          {renderList(factSheetData.keyMembershipsAwards, "No key memberships or awards listed.")}
        </Section>

        <Section title={`10 Things You Need to Know About ${personName}`}>
          {factSheetData.tenThings && factSheetData.tenThings.length > 0 ? (
            <ol className="list-none pl-0 space-y-2 text-slate-300">
              {factSheetData.tenThings.map((item, index) => (
                 <li key={index} className="flex items-start">
                    <span className="text-lime-400 font-semibold mr-2 text-lg">{index + 1}.</span>
                    <span>{item}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-slate-400 italic">No specific facts available.</p>
          )}
        </Section>
      </div>
    </div>
  );
};
