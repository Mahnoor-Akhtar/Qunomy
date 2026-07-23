import { createFileRoute } from "@tanstack/react-router";
import ClientShell from "../components/dashboard/ClientShell";
import { 
  Search, 
  Filter,
  Download,
  Eye,
  ChevronDown,
  FolderOpen,
  X
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/client-documents")({
  component: ClientDocuments,
});

const MOCK_CASES = [
  { id: 1, title: "Muhammad Ahmad vs State", no: "CC 123/2024" },
  { id: 2, title: "ABC Corp vs XYZ Bank", no: "CS 456/2023" }
];

const MOCK_FOLDERS = [
  "Shared with Client",
  "Court Orders",
  "Evidence"
];

const MOCK_DOCUMENTS = [
  {
    id: 1,
    name: "Plaint_Copy.pdf",
    type: "Petition / Plaint",
    tags: ["Shared"],
    uploadedBy: "Aqsa Malik",
    uploadedOn: "22 May 2025, 11:30 AM",
    size: "2.4 MB"
  },
  {
    id: 2,
    name: "Summons.pdf",
    type: "Court Document",
    tags: ["Order"],
    uploadedBy: "Aqsa Malik",
    uploadedOn: "22 May 2025, 11:32 AM",
    size: "1.1 MB"
  },
  {
    id: 3,
    name: "Written_Arguments.pdf",
    type: "Arguments",
    tags: ["Shared"],
    uploadedBy: "Saad Iqbal",
    uploadedOn: "22 May 2025, 11:35 AM",
    size: "0.9 MB"
  }
];

function ClientDocuments() {
  const [selectedCase, setSelectedCase] = useState<number | null>(1);
  const [selectedFolder, setSelectedFolder] = useState<string>("Shared with Client");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  return (
    <ClientShell active="documents">
      <div className="flex flex-col gap-4 max-w-[1400px] mx-auto h-full pb-10">
        
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
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-wrap items-center gap-3 bg-white border border-[#14213D]/10 rounded-xl p-3 shadow-sm">
          <div className="relative min-w-[240px]">
            <select className="h-9 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-[#B8860B] transition-colors">
              <option>CC 123/2024 - Muhammad Ahmad vs State</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/50 pointer-events-none" />
            <div className="absolute right-7 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-gray-200 rounded p-0.5 transition-colors">
              <X className="h-2.5 w-2.5 text-[#1F1F1F]/50" />
            </div>
          </div>

          <div className="relative min-w-[160px]">
            <select className="h-9 w-full pl-3 pr-8 appearance-none bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#14213D] hover:bg-white cursor-pointer focus:outline-none focus:border-[#B8860B] transition-colors">
              <option>All Document Types</option>
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
              className="block w-full pl-9 pr-3 h-9 bg-gray-50 border border-[#14213D]/10 rounded-lg text-[11px] font-medium text-[#14213D] placeholder-[#1F1F1F]/40 focus:outline-none focus:border-[#B8860B] transition-colors"
            />
          </div>

          <button className="h-9 px-3 ml-auto flex items-center gap-1.5 border border-[#14213D]/10 rounded-lg text-[11px] font-bold text-[#1F1F1F]/70 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>

        {/* 3-Pane Main Content */}
        <div className="flex flex-1 gap-4 overflow-hidden min-h-[400px]">
          
          {/* Left Pane: Case Explorer */}
          <div className="w-[260px] bg-white border border-[#14213D]/10 rounded-xl flex flex-col shadow-sm">
            <div className="p-3 border-b border-[#14213D]/10 flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#14213D]">My Cases</span>
            </div>
            <div className="p-2 border-b border-[#14213D]/10">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1F1F]/40" />
                <input 
                  type="text"
                  placeholder="Search cases..."
                  className="w-full h-8 pl-8 pr-3 text-[11px] bg-gray-50 border border-[#14213D]/10 rounded focus:outline-none focus:border-[#B8860B] transition-colors"
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
                          isExpanded ? "bg-blue-50/50" : "hover:bg-gray-50"
                        }`}
                      >
                        <ChevronDown className={`h-4 w-4 shrink-0 text-[#1F1F1F]/40 mt-0.5 transition-transform ${isExpanded ? "" : "-rotate-90"}`} />
                        <div className="flex-1 min-w-0">
                          <div className={`text-[11px] font-bold truncate ${isExpanded ? "text-blue-700" : "text-[#14213D]"}`}>{c.title}</div>
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
                                selectedFolder === folder ? "bg-[#B8860B]/10 text-[#14213D]" : "text-[#1F1F1F]/70 hover:bg-gray-50"
                              }`}
                            >
                              <FolderOpen className={`h-3.5 w-3.5 ${selectedFolder === folder ? "text-[#B8860B] fill-[#B8860B]/20" : "text-amber-400 fill-amber-100"}`} />
                              <span className={`text-[11px] font-medium ${selectedFolder === folder ? 'font-bold text-[#14213D]' : ''}`}>{folder}</span>
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
                <FolderOpen className="h-6 w-6 text-[#B8860B] fill-[#B8860B]/20" />
                <h2 className="text-[16px] font-bold text-[#14213D] leading-none">{selectedFolder}</h2>
                <span className="text-[10px] font-medium text-[#1F1F1F]/50 bg-gray-100 px-2 py-0.5 rounded-full">3 Documents</span>
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
                        className={`border-b border-[#14213D]/5 cursor-pointer transition-colors group ${isSelected ? "bg-blue-50/30" : "hover:bg-gray-50/50"}`}
                      >
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-7 w-7 rounded flex items-center justify-center bg-rose-100 text-rose-600 shrink-0">
                              <span className="text-[9px] font-bold">PDF</span>
                            </div>
                            <span className={`text-[12px] font-bold truncate ${isSelected ? "text-blue-700" : "text-[#14213D]"}`}>{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-[11px] font-medium text-[#1F1F1F]/70">{doc.type}</td>
                        <td className="px-3 py-4">
                          <div className="flex flex-wrap gap-2">
                            {doc.tags.map(tag => (
                              <span key={tag} className={`text-[10px] font-bold px-2 py-1 rounded ${
                                tag === 'Shared' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                'bg-emerald-50 text-emerald-600 border border-emerald-100'
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
              Showing 1 to 3 of 3 documents
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
            
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50">Document Type</div>
                <div className="text-[13px] font-bold text-[#14213D]">{selectedDocument.type}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50 mt-1">Tags</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDocument.tags.map((tag: string) => (
                     <span key={tag} className={`text-[10px] font-bold px-2.5 py-1 rounded ${
                        tag === 'Shared' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        'bg-emerald-50 text-emerald-600 border border-emerald-100'
                     }`}>
                        {tag}
                     </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50">Shared By</div>
                <div className="text-[13px] font-medium text-[#1F1F1F]/70">{selectedDocument.uploadedBy}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50">Date</div>
                <div className="text-[13px] font-medium text-[#1F1F1F]/70">{selectedDocument.uploadedOn}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <div className="text-[12px] font-medium text-[#1F1F1F]/50">Case</div>
                <div className="text-[13px] font-bold text-[#14213D]">
                  {MOCK_CASES.find(c => c.id === selectedCase)?.title}
                  <div className="text-[10px] text-[#1F1F1F]/50 font-medium mt-0.5">{MOCK_CASES.find(c => c.id === selectedCase)?.no}</div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[#14213D]/10 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[12px] font-bold text-blue-700 hover:bg-blue-100 transition-colors shadow-sm">
                <Eye className="h-4 w-4" /> View Document
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border border-[#14213D]/15 text-[12px] font-bold text-[#14213D] hover:bg-gray-50 transition-colors shadow-sm">
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </ClientShell>
  );
}
