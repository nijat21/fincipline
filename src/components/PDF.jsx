import getSymbolFromCurrency from 'currency-symbol-map';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Generate a pdf table
const generatePDF = (data, title) => {
    const tableRows = [];

    const doc = new jsPDF();
    doc.setTextColor(85, 85, 85);


    if (data && data.length > 0) {
        data.forEach((tran) => {
            const rowData = [
                tran.name,
                format(new Date(tran.authorized_date), "MMM dd, yyyy"),
                tran.category[0],
                `${tran.amount}${getSymbolFromCurrency(tran.iso_currency_code)}`,
            ];
            tableRows.push(rowData);
        });
        // Or use javascript directly:
        autoTable(doc, {
            startY: 30,
            head: [["Transaction", "Date", "Category", "Amount"]],
            body: tableRows,
        });

        // Get current date for export date
        const exportDate = format(new Date(), "MMM dd, yyyy");

        // Add title to each page (centered at the top with padding)
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            const titleFontSize = 16;
            // Title centered horizontally 
            const titleWidth = doc.getStringUnitWidth(title) * titleFontSize / doc.internal.scaleFactor;
            doc.setFontSize(titleFontSize);
            const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
            doc.text(titleX, 20, title);

            // Add export date at the bottom right corner with margin from the right
            const pageHeight = doc.internal.pageSize.height;
            doc.setFontSize(8);
            const dateWidth = doc.getStringUnitWidth(exportDate) * doc.internal.scaleFactor;
            const dateX = doc.internal.pageSize.width - 20 - dateWidth; // Adjust margin from the right
            doc.text(dateX, pageHeight - 20, exportDate);
        }

        return doc;
    }
    return null;
};

// Exporting pdf table
const exportPDF = (data, title) => {
    const pdf = generatePDF(data, title);
    if (pdf) {
        pdf.save(`${title}.pdf`);
    } else {
        console.log('No data to export');
    }
};

// Printing pdf table
const printPDF = (data, title) => {
    const pdf = generatePDF(data, title);

    if (pdf) {
        // Create a data URL containing the PDF content
        const pdfBlob = pdf.output('blob');

        // Use URL.createObjectURL to create a URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open a new window and write the PDF content to an iframe
        const printWindow = window.open(pdfUrl, '_blank');

        if (printWindow) {
            // Automatically trigger the print dialog in the new window when loaded
            printWindow.onload = () => {
                printWindow.print();

                // Clean up by revoking the Blob URL after printing
                URL.revokeObjectURL(pdfUrl);
            };
        } else {
            // Display an error if the print window couldn't be opened
            alert('Failed to open print preview. Please allow pop-ups and try again.');
        }
    } else {
        alert('No data to print.'); // Handle case when PDF document is not generated
    }
};

export { generatePDF, exportPDF, printPDF };