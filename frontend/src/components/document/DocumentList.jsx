import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { documentAPI } from '../api/index.js';
import { Button } from './ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Badge } from './ui/badge.jsx';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDocuments = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await documentAPI.getAnnouncements();
      if (response.success) {
        setDocuments(response.documents || []);
      }
    } catch (error) {
      console.error('Fetch documents error:', error);
      setError(error.message || 'Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'indexed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" />
              <span>Loading documents...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Documents</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={fetchDocuments} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Document Library
              </CardTitle>
              <CardDescription>
                Manage all uploaded documents that are available to the AI assistant
              </CardDescription>
            </div>
            <Button onClick={fetchDocuments} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents Found</h3>
              <p className="text-gray-600 mb-4">
                No documents have been uploaded yet. Upload your first document to get started.
              </p>
              <Button variant="outline">
                Upload Document
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <FileText className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Documents</p>
                      <p className="text-2xl font-bold text-blue-900">{documents.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">Indexed</p>
                      <p className="text-2xl font-bold text-green-900">
                        {documents.filter(doc => doc.status === 'indexed').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">Σ</span>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Total Size</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {formatFileSize(documents.reduce((total, doc) => total + doc.size, 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents List */}
              <div className="space-y-3">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {document.title}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {getFileExtension(document.filename)}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getStatusColor(document.status)}`}
                            >
                              {document.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="truncate">{document.filename}</span>
                            <span>{formatFileSize(document.size)}</span>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(document.uploadedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-blue-600"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentList;
