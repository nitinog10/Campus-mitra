import React, { useState, useCallback } from "react";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { documentAPI } from "../api/index.js";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card.jsx";
import { Badge } from "./ui/badge.jsx";

const DocumentUploader = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null
  const [message, setMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const allowedTypes = ["application/pdf"];

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && allowedTypes.includes(droppedFile.type)) {
        setFile(droppedFile);
        if (!title) {
          // Auto-suggest title from filename
          const nameWithoutExt = droppedFile.name
            .split(".")
            .slice(0, -1)
            .join(".");
          setTitle(nameWithoutExt.replace(/[_-]/g, " "));
        }
      } else {
        setUploadStatus("error");
        setMessage("Please upload a valid PDF file");
      }
    },
    [title, allowedTypes]
  );

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      if (!title) {
        const nameWithoutExt = selectedFile.name
          .split(".")
          .slice(0, -1)
          .join(".");
        setTitle(nameWithoutExt.replace(/[_-]/g, " "));
      }
      setUploadStatus(null);
      setMessage("");
    } else {
      setUploadStatus("error");
      setMessage("Please select a valid PDF file");
    }
  };

  const removeFile = () => {
    setFile(null);
    setTitle("");
    setUploadStatus(null);
    setMessage("");
    // Reset file input
    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title.trim()) {
      setUploadStatus("error");
      setMessage("Please select a file and enter a title");
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("title", title.trim());

      const response = await documentAPI.uploadDocument(formData);

      if (response.success) {
        setUploadStatus("success");
        setMessage(
          `Document "${response.document.title}" uploaded successfully! ` +
            `${
              response.document.aiPipelineId
                ? "Processing complete - ready for questions!"
                : "Processing in progress..."
            }`
        );

        // Reset form
        setFile(null);
        setTitle("");
        const fileInput = document.getElementById("file-input");
        if (fileInput) fileInput.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setMessage(error.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload Document
          </CardTitle>
          <CardDescription>
            Upload PDF documents to make them available to the AI assistant for
            Q&A. The documents will be processed and indexed for intelligent
            search. Supported format: PDF only (Max: 20MB)
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Messages */}
            {message && (
              <div
                className={`p-4 rounded-md flex items-center space-x-2 ${
                  uploadStatus === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {uploadStatus === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Document Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title for the document"
                required
                disabled={isUploading}
                maxLength={200}
              />
              <p className="text-xs text-gray-500">
                {title.length}/200 characters
              </p>
            </div>

            {/* File Upload Area */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">
                Document File <span className="text-red-500">*</span>
              </label>

              {!file ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drop your file here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports PDF files up to 20MB
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("file-input").click()
                    }
                    disabled={isUploading}
                  >
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <File className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {file.type.split("/")[1].toUpperCase()}
                      </Badge>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      disabled={isUploading}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!file || !title.trim() || isUploading}
                className="min-w-32"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUploader;
