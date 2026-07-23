import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import LawyerShell from "../components/dashboard/LawyerShell";
import { 
  Search, 
  Filter,
  Download,
  Upload,
  Plus,
  Eye,
  MoreVertical,
  ChevronDown,
  Settings,
  FolderOpen,
  FileText,
  File,
  X
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/lawyer-documents")({
  component: LawyerDocuments,
});

const MOCK_CASES = [
  { id: 1, title: "ABC Corp vs XYZ Bank", no: "CS 456/2023" },
  { id: 2, title: "Muhammad Ahmad vs State", no: "CC 123/2024" },
  { id: 3, title: "Fatima Bibi vs Asif Khan", no: "FC 788/2024" },
  { id: 4, title: "The State vs Imran Ali", no: "FIR 987/2024" },
  { id: 5, title: "Zainab Khan vs Waseem Khan", no: "Family 101/2024" }
];

const MOCK_FOLDERS = [
  "Pleadings",
  "Court Orders",
  "Evidence",
  "Correspondence",
  "Miscellaneous"
];

const MOCK_DOCUMENTS = [
  {
    id: 1,
    name: "Plaint.pdf",
    type: "Petition / Plaint",
    tags: ["Petition"],
    uploadedBy: "Saad Iqbal",
    uploadedOn: "22 May 2025, 11:30 AM",
    size: "2.4 MB"
  },
  {
    id: 2,
    name: "Verification_Affidavit.pdf",
    type: "Affidavit",
    tags: ["Affidavit"],
    uploadedBy: "Saad Iqbal",
    uploadedOn: "22 May 2025, 11:32 AM",
    size: "1.1 MB"
  },
  {
    id: 3,
    name: "Vakalatnama.pdf",
    type: "Vakalatnama",
    tags: ["Vakalatnama"],
    uploadedBy: "Saad Iqbal",
    uploadedOn: "22 May 2025, 11:35 AM",
    size: "0.9 MB"
  },
  {
    id: 4,
    name: "Index.pdf",
    type: "Index",
    tags: ["Index"],
    uploadedBy: "Haris",
    uploadedOn: "23 May 2025, 09:15 AM",
    size: "0.6 MB"
  },
  {
    id: 5,
    name: "List_of_Witnesses.docx",
    type: "List of Witnesses",
    tags: ["Pleading"],
    uploadedBy: "Saad Iqbal",
    uploadedOn: "23 May 2025, 09:20 AM",
    size: "0.3 MB"
  },
  {
    id: 6,
    name: "Affidavit_Proof_of_Docs.pdf",
    type: "Affidavit",
    tags: ["Affidavit"],
    uploadedBy: "Haris",
    uploadedOn: "24 May 2025, 10:05 AM",
    size: "1.3 MB"
  }
];

function LawyerDocuments() {
  const [selectedCase, setSelectedCase] = useState<number | null>(1);
  const [selectedFolder, setSelectedFolder] = useState<string>("Pleadings");
  const [selectedDocument, setSelectedDocument] = useState<any>(MOCK_DOCUMENTS[0]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  return (
    <LawyerShell active="documents">
      <div className="flex flex-col gap-4 max-w-[1400px] mx-auto h-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-[28px] font-bold text-[#14213D] leading-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Documents
            </h1>
            <div className="text-[12px] text-[#1F1F1F]/60 mt-1 font-medium flex items-center gap-1.5">
              <span className="hover:text-[#14213D] cursor-pointer transition">Dashboard</span>
              <span>›</span>
              <span className="text-[#14213D]">Documents</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="h-9 px-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[12px] font-bold shadow-sm transition-colors"
            >
              <Upload className="h-4 w-4" />
              Upload Document
            </button>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-wrap items-center gap-3 bg-white border border-[#14213D]/10 rounded-xl p-3 shadow-sm">
          <div className="relative min-w-[140px]">
            <select className="h-9 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors">
              <option>All Cases</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/50 pointer-events-none" />
          </div>

          <div className="relative min-w-[240px]">
            <select className="h-9 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors">
              <option>CS 456/2023 - ABC Corp vs XYZ Bank</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/50 pointer-events-none" />
            {/* The little 'x' in the dropdown like the design */}
            <div className="absolute right-7 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-gray-200 rounded p-0.5 transition-colors">
              <X className="h-2.5 w-2.5 text-[#1F1F1F]/50" />
            </div>
          </div>

          <div className="relative min-w-[160px]">
            <select className="h-9 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors">
              <option>All Document Types</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/50 pointer-events-none" />
          </div>

          <div className="relative min-w-[140px]">
            <select className="h-9 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors">
              <option>All Tags</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/50 pointer-events-none" />
          </div>

          <div className="relative flex-1 min-w-[160px] max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-3.5 w-3.5 text-[#1F1F1F]/40" />
            </div>
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="block w-full pl-9 pr-3 h-9 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-medium text-[#14213D] placeholder-[#1F1F1F]/40 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button className="h-9 px-3 ml-auto flex items-center gap-1.5 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#1F1F1F]/70 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>

          <button className="h-9 w-9 flex items-center justify-center border border-[#14213D]/10 rounded-lg text-[#1F1F1F]/60 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <Settings className="h-4 w-4" />
          </button>
        </div>

        {/* 3-Pane Main Content */}
        <div className="flex flex-1 gap-4 overflow-hidden min-h-[400px]">
          
          {/* Left Pane: Case Explorer */}
          <div className="w-[260px] bg-white border border-[#14213D]/10 rounded-xl flex flex-col shadow-sm">
            <div className="p-3 border-b border-[#14213D]/10 flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#14213D]">Cases</span>
              <button className="h-6 w-6 flex items-center justify-center hover:bg-gray-100 rounded text-[#1F1F1F]/60 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="p-2 border-b border-[#14213D]/10">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/40" />
                <input 
                  type="text"
                  placeholder="Search cases..."
                  className="w-full h-8 pl-8 pr-3 text-[11px] bg-gray-50 border border-[#14213D]/10 rounded focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-0.5">
                {MOCK_CASES.map((c) => {
                  const isExpanded = selectedCase === c.id;
                  return (
                    <div key={c.id}>
                      <button 
                        onClick={() => setSelectedCase(c.id)}
                        className={`w-full flex items-start gap-2 p-2 rounded text-left transition-colors ${
                          isExpanded ? "bg-emerald-50/50" : "hover:bg-gray-50"
                        }`}
                      >
                        <ChevronDown className={`h-4 w-4 shrink-0 text-[#1F1F1F]/40 mt-0.5 transition-transform ${isExpanded ? "" : "-rotate-90"}`} />
                        <div className="flex-1 min-w-0">
                          <div className={`text-[11px] font-bold truncate ${isExpanded ? "text-emerald-700" : "text-[#14213D]"}`}>{c.title}</div>
                          <div className="text-[9px] text-[#1F1F1F]/50 mt-0.5">{c.no}</div>
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="mt-1 ml-6 space-y-0.5">
                          {MOCK_FOLDERS.map(folder => (
                            <button
                              key={folder}
                              onClick={() => setSelectedFolder(folder)}
                              className={`w-full flex items-center gap-2 p-1.5 rounded text-left transition-colors ${
                                selectedFolder === folder ? "bg-emerald-100/50 text-emerald-800" : "text-[#1F1F1F]/70 hover:bg-gray-50"
                              }`}
                            >
                              <FolderOpen className={`h-3.5 w-3.5 ${selectedFolder === folder ? "text-emerald-600 fill-emerald-100" : "text-amber-400 fill-amber-100"}`} />
                              <span className="text-[11px] font-medium">{folder}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle Pane: File List */}
          <div className="flex-1 bg-white border border-[#14213D]/10 rounded-xl flex flex-col shadow-sm min-w-0">
            {/* Folder Header */}
            <div className="p-4 border-b border-[#14213D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-6 w-6 text-amber-400 fill-amber-100" />
                <h2 className="text-[16px] font-bold text-[#14213D] leading-none">{selectedFolder}</h2>
                <span className="text-[10px] font-medium text-[#1F1F1F]/50 bg-gray-100 px-2 py-0.5 rounded-full">6 Documents</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {MOCK_DOCUMENTS.map((doc) => {
                    const isSelected = selectedDocument?.id === doc.id;
                    return (
                      <tr 
                        key={doc.id} 
                        onClick={() => setSelectedDocument(doc)}
                        className={`border-b border-[#14213D]/5 cursor-pointer transition-colors group ${isSelected ? "bg-emerald-50/30" : "hover:bg-gray-50/50"}`}
                      >
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-7 w-7 rounded flex items-center justify-center bg-rose-100 text-rose-600 shrink-0">
                              <span className="text-[9px] font-bold">PDF</span>
                            </div>
                            <span className={`text-[12px] font-bold truncate ${isSelected ? "text-emerald-700" : "text-[#14213D]"}`}>{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-[11px] font-medium text-[#1F1F1F]/70">{doc.type}</td>
                        <td className="px-3 py-4">
                          <div className="flex flex-wrap gap-2">
                            {doc.tags.map(tag => (
                              <span key={tag} className={`text-[10px] font-medium px-2 py-1 rounded ${
                                tag === 'Petition' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                tag === 'Affidavit' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                tag === 'Vakalatnama' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                tag === 'Index' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                'bg-orange-50 text-orange-600 border border-orange-100'
                              }`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-3 border-t border-[#14213D]/10 text-[10px] font-medium text-[#1F1F1F]/50">
              Showing 1 to 6 of 6 documents
            </div>
          </div>
        </div>
      </div>
      
      {/* File Details Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] flex flex-col overflow-hidden max-h-[90vh]">
            <div className="p-5 border-b border-[#14213D]/10 flex items-start justify-between gap-3">
               <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-rose-100 text-rose-600 shrink-0">
                    <span className="text-[12px] font-bold">PDF</span>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#14213D] break-all leading-tight">{selectedDocument.name}</h3>
                    <p className="text-[12px] text-[#1F1F1F]/50 mt-1">{selectedDocument.size}</p>
                  </div>
               </div>
               <button 
                onClick={() => setSelectedDocument(null)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors"
               >
                 <X className="h-5 w-5" />
               </button>
            </div>
            
            <div className="flex border-b border-[#14213D]/10">
              <button className="flex-1 py-3 text-[12px] font-bold text-emerald-600 border-b-2 border-emerald-600">Details</button>
              <button className="flex-1 py-3 text-[12px] font-bold text-[#1F1F1F]/40 hover:text-[#14213D] transition-colors">Activity</button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50">Document Type</div>
                <div className="text-[13px] font-bold text-[#14213D]">{selectedDocument.type}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50 mt-1">Tags</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDocument.tags.map((tag: string) => (
                     <span key={tag} className={`text-[10px] font-medium px-2.5 py-1 rounded ${
                       tag === 'Petition' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                       tag === 'Affidavit' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                       tag === 'Vakalatnama' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                       tag === 'Index' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                       'bg-orange-50 text-orange-600 border border-orange-100'
                     }`}>
                        {tag}
                     </span>
                  ))}
                  <button className="text-[10px] font-bold text-[#1F1F1F]/40 hover:text-emerald-600 ml-1 transition-colors">+ Add Tag</button>
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50">Uploaded By</div>
                <div className="text-[13px] font-medium text-[#1F1F1F]/70">{selectedDocument.uploadedBy}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50">Uploaded On</div>
                <div className="text-[13px] font-medium text-[#1F1F1F]/70">{selectedDocument.uploadedOn}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50">Case</div>
                <div className="text-[13px] font-bold text-[#14213D]">
                  {MOCK_CASES.find(c => c.id === selectedCase)?.title}
                  <div className="text-[10px] text-[#1F1F1F]/50 font-medium mt-0.5">{MOCK_CASES.find(c => c.id === selectedCase)?.no}</div>
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50">Folder</div>
                <div className="text-[13px] font-bold text-[#14213D]">{selectedFolder}</div>
              </div>
              
              <div className="pt-2">
                <button 
                  onClick={() => setIsHistoryModalOpen(true)}
                  className="text-[12px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
                >
                  <MoreVertical className="h-4 w-4" /> View Version History
                </button>
              </div>
            </div>

            <div className="p-5 border-t border-[#14213D]/10 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border border-[#14213D]/15 text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors shadow-sm">
                <Download className="h-4 w-4" /> Download
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[12px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm">
                <Eye className="h-4 w-4" /> View Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[800px] flex flex-col overflow-hidden max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#14213D]/10">
              <h2 className="text-xl font-bold text-[#14213D]">Upload Document</h2>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col md:flex-row gap-8 overflow-y-auto">
              
              {/* Drag & Drop Area */}
              <div className="w-full md:w-[300px] shrink-0 h-[280px] border-2 border-dashed border-[#14213D]/20 rounded-xl bg-gray-50/50 flex flex-col items-center justify-center text-center p-6 transition-colors hover:bg-emerald-50/50 hover:border-emerald-200 cursor-pointer">
                 <div className="h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center text-emerald-600 mb-4 border border-[#14213D]/5">
                   <Upload className="h-7 w-7" />
                 </div>
                 <div className="text-[13px] font-bold text-[#14213D]">Drag & drop files here</div>
                 <div className="text-[11px] text-[#1F1F1F]/50 my-2">or</div>
                 <button className="px-6 py-2 rounded-lg border border-emerald-200 bg-white text-[12px] font-bold text-emerald-600 shadow-sm hover:bg-emerald-50 transition-colors">
                   Browse Files
                 </button>
                 <div className="text-[10px] text-[#1F1F1F]/40 mt-6 font-medium">Max file size: 25 MB</div>
              </div>
              
              {/* Form Area */}
              <div className="flex-1 flex flex-col gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Case <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-10 pl-3 pr-8 appearance-none bg-white border border-[#14213D]/15 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500 transition-colors">
                      <option>ABC Corp vs XYZ Bank (CS 456/2023)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Folder <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-10 pl-3 pr-8 appearance-none bg-white border border-[#14213D]/15 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500 transition-colors">
                      <option>Pleadings</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Document Type <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-10 pl-3 pr-8 appearance-none bg-white border border-[#14213D]/15 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500 transition-colors">
                      <option>Petition / Plaint</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1F1F]/40 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Tags</label>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Petition
                      <X className="h-3 w-3 cursor-pointer hover:text-rose-500 transition-colors" />
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Pleading
                      <X className="h-3 w-3 cursor-pointer hover:text-rose-500 transition-colors" />
                    </span>
                    <button className="text-[11px] font-bold text-[#1F1F1F]/50 hover:text-emerald-600 transition-colors">
                      + Add Tag
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#14213D] mb-1.5">Description (Optional)</label>
                  <textarea 
                    rows={3}
                    className="w-full p-3 bg-white border border-[#14213D]/15 rounded-lg text-[12px] font-medium text-[#14213D] focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    defaultValue="Original plaint filed in this case."
                  />
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-[#14213D]/10 bg-gray-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="px-6 py-2 rounded-lg text-[12px] font-bold text-[#1F1F1F]/60 bg-white border border-[#14213D]/15 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="px-8 py-2 rounded-lg text-[12px] font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[850px] flex flex-col overflow-hidden max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#14213D]/10">
              <h2 className="text-[18px] font-bold text-[#14213D]">Version History – {selectedDocument?.name}</h2>
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]/50 hover:text-[#14213D] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-x-auto p-6 pb-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#14213D]/10">
                    <th className="px-3 py-3 text-[11px] font-bold text-[#14213D] w-24">Version</th>
                    <th className="px-3 py-3 text-[11px] font-bold text-[#14213D]">Uploaded By</th>
                    <th className="px-3 py-3 text-[11px] font-bold text-[#14213D]">Uploaded On</th>
                    <th className="px-3 py-3 text-[11px] font-bold text-[#14213D]">Size</th>
                    <th className="px-3 py-3 text-[11px] font-bold text-[#14213D]">Changes</th>
                    <th className="px-3 py-3 text-[11px] font-bold text-[#14213D] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#14213D]/5 hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 py-4">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">V3 (Current)</span>
                    </td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">Saad Iqbal</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">24 May 2025, 10:10 AM</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">2.4 MB</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">Typo corrected in para 12</td>
                    <td className="px-3 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                         <button className="h-8 w-8 flex items-center justify-center rounded border border-[#14213D]/15 text-[#1F1F1F]/50 hover:text-[#14213D] hover:bg-gray-50 shadow-sm transition-colors">
                           <Download className="h-4 w-4" />
                         </button>
                         <button className="h-8 w-8 flex items-center justify-center rounded border border-[#14213D]/15 text-[#1F1F1F]/50 hover:text-[#14213D] hover:bg-gray-50 shadow-sm transition-colors">
                           <Eye className="h-4 w-4" />
                         </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#14213D]/5 hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 py-4 text-[12px] font-bold text-[#14213D]">V2</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">Saad Iqbal</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">23 May 2025, 04:20 PM</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">2.3 MB</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">Page 5 replaced</td>
                    <td className="px-3 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                         <button className="h-8 w-8 flex items-center justify-center rounded border border-[#14213D]/15 text-[#1F1F1F]/50 hover:text-[#14213D] hover:bg-gray-50 shadow-sm transition-colors">
                           <Download className="h-4 w-4" />
                         </button>
                         <button className="h-8 w-8 flex items-center justify-center rounded border border-[#14213D]/15 text-[#1F1F1F]/50 hover:text-[#14213D] hover:bg-gray-50 shadow-sm transition-colors">
                           <Eye className="h-4 w-4" />
                         </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 py-4 text-[12px] font-bold text-[#14213D]">V1</td>
                    <td className="px-3 py-4 text-[12px] font-bold text-[#14213D]">Haris</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">22 May 2025, 11:30 AM</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">2.1 MB</td>
                    <td className="px-3 py-4 text-[12px] font-medium text-[#1F1F1F]/80">Initial upload</td>
                    <td className="px-3 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                         {/* Empty for V1 or could have buttons too */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Restore Footer */}
            <div className="m-6 mt-2 p-5 rounded-xl border border-emerald-100 bg-emerald-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-[13px] font-bold text-emerald-800">Restore Previous Version</h4>
                <p className="text-[11px] text-emerald-700/80 mt-1">This will replace the current file with the selected version.</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-[220px]">
                  <select className="w-full h-10 pl-3 pr-8 appearance-none bg-white border border-emerald-200 rounded-lg text-[12px] font-medium text-emerald-900 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm">
                    <option>V2 - 23 May 2025, 04:20 PM</option>
                    <option>V1 - 22 May 2025, 11:30 AM</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700/50 pointer-events-none" />
                </div>
                <button className="h-10 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[12px] font-bold shadow-sm transition-colors whitespace-nowrap">
                  Restore Version
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </LawyerShell>
  );
}
