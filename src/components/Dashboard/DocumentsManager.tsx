import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Upload,
  Folder,
  Share2,
  FileText,
  FileImage,
  FileJson,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Document {
  id: number;
  name: string;
  type: 'PDF' | 'DOCX' | 'JPG' | 'PNG';
  category: 'Contrato' | 'Avaliação Física' | 'Ficha de Anamnese' | 'Outro';
  studentName: string;
  uploadDate: Date;
  size: string;
}

const DocumentsManager: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Generate fake document data
  const documents: Document[] = React.useMemo(() => Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `${faker.helpers.arrayElement(['Contrato', 'Avaliacao', 'Anamnese'])}-${faker.lorem.word()}.pdf`,
    type: faker.helpers.arrayElement(['PDF', 'DOCX', 'JPG', 'PNG']),
    category: faker.helpers.arrayElement(['Contrato', 'Avaliação Física', 'Ficha de Anamnese', 'Outro']),
    studentName: faker.person.fullName(),
    uploadDate: faker.date.recent({ days: 90 }),
    size: `${faker.number.float({ min: 0.1, max: 5, precision: 1 })} MB`,
  })), []);

  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'PDF': return <FileText className="w-6 h-6 text-red-500" />;
      case 'DOCX': return <FileText className="w-6 h-6 text-blue-500" />;
      case 'JPG':
      case 'PNG': return <FileImage className="w-6 h-6 text-green-500" />;
      default: return <FileJson className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Gestão de Documentos</h1>
          <p className="text-text-secondary">Armazene e gerencie contratos, avaliações e mais</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Criar Pasta
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload de Documento
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{documents.length}</div>
          <div className="text-sm text-text-secondary">Total de Documentos</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Folder className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">15.7 GB</div>
          <div className="text-sm text-text-secondary">Espaço Usado</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Share2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">5</div>
          <div className="text-sm text-text-secondary">Documentos Compartilhados</div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-surface p-6 rounded-xl shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Todos os Documentos</h3>
           <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input type="text" placeholder="Buscar documento..." className="pl-10 pr-4 py-2 w-full border border-border rounded-lg" />
            </div>
            <button className="p-2 border border-border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Nome do Arquivo</th>
                <th scope="col" className="px-6 py-3">Aluno</th>
                <th scope="col" className="px-6 py-3">Data de Upload</th>
                <th scope="col" className="px-6 py-3">Tamanho</th>
                <th scope="col" className="px-6 py-3">Categoria</th>
                <th scope="col" className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-text-primary flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    {doc.name}
                  </td>
                  <td className="px-6 py-4">{doc.studentName}</td>
                  <td className="px-6 py-4">{doc.uploadDate.toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">{doc.size}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{doc.category}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg"><Download className="w-4 h-4 text-text-secondary" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4 text-text-secondary" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg"><Trash2 className="w-4 h-4 text-error" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">Upload de Documento</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Arquivo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                        <span>Selecione um arquivo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">ou arraste e solte aqui</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOCX, PNG, JPG até 10MB</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Título do Documento</label>
                <input type="text" placeholder="Ex: Contrato de Prestação de Serviço" className="w-full px-3 py-2 border border-border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Aluno</label>
                  <input type="text" placeholder="Buscar aluno..." className="w-full px-3 py-2 border border-border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Categoria</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg">
                    <option>Contrato</option>
                    <option>Avaliação Física</option>
                    <option>Ficha de Anamnese</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Fazer Upload</button>
                <button type="button" onClick={() => setShowUploadModal(false)} className="border border-border text-text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-50">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsManager;
