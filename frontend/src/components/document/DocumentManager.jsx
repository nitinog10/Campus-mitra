import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { documentAPI, chatAPI } from "../../api/index.js";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import { ScrollArea } from "../ui/scroll-area.jsx";
import { Badge } from "../ui/badge.jsx";
import DocumentViewer from "./DocumentViewer.jsx";
import {
  showSuccessToast,
  showErrorToast,
  showConfirmDialog,
  showLoadingDialog,
  closeLoadingDialog,
} from "../../utils/toast.js";

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Document viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [selectedDocumentTitle, setSelectedDocumentTitle] = useState("");

  // Upload form state
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentAPI.getAnnouncements();
      setDocuments(response.documents || []);
    } catch (error) {
      showErrorToast("Failed to fetch documents");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      showErrorToast("Please select a file and enter a title");
      return;
    }

    try {
      setUploading(true);
      showLoadingDialog(
        "Uploading Document",
        "Please wait while we process your file..."
      );

      const formData = new FormData();
      formData.append("document", file);
      formData.append("title", title);

      const response = await documentAPI.uploadDocument(formData);

      if (response.success) {
        closeLoadingDialog();
        showSuccessToast("Document uploaded successfully!");
        setTitle("");
        setFile(null);
        if (document.querySelector('input[type="file"]')) {
          document.querySelector('input[type="file"]').value = "";
        }
        fetchDocuments(); // Refresh the list
      }
    } catch (error) {
      closeLoadingDialog();
      showErrorToast(error.message || "Upload failed");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, title) => {
    const confirmed = await showConfirmDialog(
      "Delete Document",
      `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      "Yes, delete it!"
    );

    if (!confirmed) return;

    try {
      showLoadingDialog("Deleting Document", "Please wait...");
      const response = await documentAPI.deleteDocument(id);
      closeLoadingDialog();

      if (response.success) {
        showSuccessToast("Document deleted successfully!");
        fetchDocuments(); // Refresh the list
      }
    } catch (error) {
      closeLoadingDialog();
      showErrorToast(error.message || "Failed to delete document");
      console.error("Delete error:", error);
    }
  };

  const handleView = (id, title) => {
    setSelectedDocumentId(id);
    setSelectedDocumentTitle(title);
    setViewerOpen(true);
  };

  const handleChatWithDocument = (documentId, title) => {
    // Navigate to chat with document context
    // You can implement this based on your routing setup
    const chatUrl = `/chat?documentId=${documentId}&title=${encodeURIComponent(
      title
    )}`;
    window.open(chatUrl, "_blank");
  };

  const checkDocumentStatus = async (id) => {
    try {
      const response = await documentAPI.getDocumentStatus(id);
      console.log(`Document ${id} status:`, response);

      // Refresh documents list to show updated status
      await fetchDocuments();

      if (response.aiPipelineStatus) {
        showSuccessToast(`Status: ${response.aiPipelineStatus}`);
      }
    } catch (error) {
      console.error("Status check error:", error);
      showErrorToast("Failed to check document status");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "indexed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "indexed":
        return "Ready for Q&A";
      case "processing":
        return "Processing...";
      case "failed":
        return "Processing Failed";
      default:
        return "Pending";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "indexed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Left Column - Document List */}
      <Card className="flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Manage Documents</span>
          </CardTitle>
          <CardDescription>View and manage uploaded documents</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[600px] px-6 pb-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {doc.title}
                          </h3>
                          <Badge
                            className={`text-xs ${getStatusColor(doc.status)}`}
                          >
                            <span className="flex items-center space-x-1">
                              {getStatusIcon(doc.status)}
                              <span>{getStatusText(doc.status)}</span>
                            </span>
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          {doc.filename} • {formatFileSize(doc.size)}
                        </p>
                        <p className="text-xs text-gray-400">
                          Uploaded:{" "}
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                          {doc.uploadedBy && ` by ${doc.uploadedBy}`}
                        </p>
                      </div>

                      <div className="flex space-x-1 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(doc.id, doc.title)}
                          className="h-8 w-8 p-0"
                          title="View Document"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {doc.status === "indexed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleChatWithDocument(doc.id, doc.title)
                            }
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                            title="Chat with Document"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => checkDocumentStatus(doc.id)}
                          className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700"
                          title="Check Status"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(doc.id, doc.title)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          title="Delete Document"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Right Column - Upload Form */}
      <Card className="flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Document</span>
          </CardTitle>
          <CardDescription>
            Upload PDF documents for AI-powered Q&A. Documents are processed and
            indexed for intelligent search and conversation.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Title *
              </label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf"
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to select a PDF file or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF only (Max 20MB)
                  </p>
                </label>
              </div>
              {file && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {file.name} ({formatFileSize(file.size)})
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={uploading || !file || !title.trim()}
              className="w-full"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </>
              )}
            </Button>
          </form>

          {/* Upload Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              AI-Powered Document Processing
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Maximum file size: 20MB (PDF only)</li>
              <li>• Documents are automatically processed for Q&A</li>
              <li>• Once indexed, you can chat with the document</li>
              <li>• AI extracts key information for intelligent responses</li>
              <li>• Use the chat button (💬) when processing is complete</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Document Viewer Modal */}
      <DocumentViewer
        documentId={selectedDocumentId}
        documentTitle={selectedDocumentTitle}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  );
};

export default DocumentManager;
