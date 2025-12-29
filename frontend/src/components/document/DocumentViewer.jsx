import React, { useState, useEffect } from "react";
import { X, Download, FileText, Eye } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { documentAPI } from "../../api/index.js";

const DocumentViewer = ({ documentId, isOpen, onClose, documentTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && documentId) {
      loadDocument();
    }
    return () => {
      // Cleanup blob URL when component unmounts or closes
      if (documentUrl) {
        URL.revokeObjectURL(documentUrl);
      }
    };
  }, [isOpen, documentId]);

  const loadDocument = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await documentAPI.viewDocument(documentId);
      const contentType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: contentType });
      const url = URL.createObjectURL(blob);

      setDocumentUrl(url);
      setDocumentType(contentType);
    } catch (error) {
      console.error("Failed to load document:", error);
      setError("Failed to load document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (documentUrl) {
      const link = document.createElement("a");
      link.href = documentUrl;
      link.download = documentTitle || "document";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleClose = () => {
    if (documentUrl) {
      URL.revokeObjectURL(documentUrl);
      setDocumentUrl(null);
    }
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {documentTitle || "Document Viewer"}
              </h3>
              <p className="text-sm text-gray-500">
                {documentType &&
                  `Type: ${documentType.split("/")[1].toUpperCase()}`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {documentUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading document...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-red-600 font-medium mb-2">
                  Unable to load document
                </p>
                <p className="text-gray-500 text-sm">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadDocument}
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {documentUrl && !isLoading && !error && (
            <div className="h-full">
              {documentType?.includes("pdf") ? (
                <iframe
                  src={documentUrl}
                  className="w-full h-full border-0"
                  title="Document Preview"
                />
              ) : documentType?.includes("text") ? (
                <div className="p-6 h-full overflow-auto">
                  <iframe
                    src={documentUrl}
                    className="w-full h-full border-0 bg-gray-50 rounded"
                    title="Document Preview"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-gray-600 font-medium mb-2">
                      Preview not available
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      This file type cannot be previewed in the browser
                    </p>
                    <Button
                      onClick={handleDownload}
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download to View</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
