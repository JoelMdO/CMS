'use client';
import { useCodeSnippets } from '../../utils/playbook/code_snippet_hook';
import { useReferences } from '../../utils/playbook/references_hook';
import { Plus, Trash, Save, Link as LinkIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import categories from '../../constants/categories';
import handleSubmit from '../../utils/playbook/handleSubmit';
import { useRouter } from 'next/navigation';
import CustomButton from '../buttons/custom_buttons';
import { useSearchParams } from 'next/navigation';
import Loader from '../buttons/loader_saving';
//
export interface PlaybookFormProps  {
    type?: string;
    meta?: {id: string;
      title: string;
      category: string;
      tags: string[];
      lastUpdated: string;
      steps?: string[];
      codeSnippets?: [{ code: string; language: string }];
      references?: [{title: string, link: string}];
      notes?: string;
      };
     setUpdateNote?: React.Dispatch<React.SetStateAction<{ isUpdateNote: boolean; noteId: string | null }>>;
     'data-cy'?: string
     setIsCreating?: React.Dispatch<React.SetStateAction<boolean>>;
}
//
export default function PlaybookForm({ type, meta, setUpdateNote, 'data-cy': dataCity, setIsCreating}: PlaybookFormProps) {
    //
    const color_bg_inputs = "bg-gray-forms";
    const router = useRouter();
    const searchParams = useSearchParams();
    const modal = searchParams.get('modal');
    //
    const {
        codeSnippets,
        addCodeSnippet,
        removeCodeSnippet,
        updateCodeSnippet,
        updateCodeSnippetPaste
      } = useCodeSnippets();
      const {
        references,
        addReference,
        removeReference,
        updateReference,
        updateReferencePaste
      } = useReferences(); 
      //
      const [title, setTitle] = useState<string>('');
      const [category, setCategory] = useState<string>('');
      const [isEditing, setIsEditing] = useState<boolean>(true);
      const [tags, setTags] = useState<string[]>([]);
      const [steps, setSteps] = useState<string[]>([]);
      const [tagInput, setTagInput] = useState('');
      const [stepInput, setStepInput] = useState('');
      const [notes, setNotes] = useState<string>('');
      const [isSaving, setIsSaving] = useState(false);
      const [saveSuccess, setSaveSuccess] = useState(false);
      //
    const resetForm = () => {
        setTitle('');
        setCategory('');
        setTags([]);
        setSteps([]);
        setNotes('');
    
        codeSnippets.forEach((_, index) => removeCodeSnippet(index));
        references.forEach((_, index) => removeReference(index));
    };
    
    //
     useEffect(() => {
          ///--------------------------------------------------------
          // When user left a data without saving and it persist on sessionData
          // user can keep filling the card, user will be redirected to this
          // form and by obtaining the modal = true, the data will be loaded.
          ///--------------------------------------------------------
          let mockData: any;

          if(modal){

            const data = sessionStorage.getItem("playbook-item");
            
            if(data){
              const jsonData = JSON.parse(data);
              mockData = {
                title: jsonData.title,
                category: jsonData.category,
                tags: jsonData.tags,
                steps: jsonData.steps,
                codeSnippets: jsonData.codeSnippets,
                references: jsonData.references,
                notes: jsonData.notes,
              };
            } else {
              mockData = {
                title: "Retrieved data not Found",
                category: "",
                tags: "",
                steps: "",
                codeSnippets: "",
                references: "",
                notes: "",
              };}
              // Set individual state values
        setTitle(mockData.title);
        setCategory(mockData.category);
        setTags(mockData.tags);
        setSteps(mockData.steps);
        setNotes(mockData.notes);
        mockData.codeSnippets.forEach((snippet: { language: string; }, index: number) => updateCodeSnippet(index, 'language', snippet.language));
        mockData.codeSnippets.forEach((snippet: { code: string; }, index: number) => updateCodeSnippet(index, 'code', snippet.code));
        mockData.references.forEach((reference: { title: string; }, index: number) => updateReference(index, 'title', reference.title));
        mockData.references.forEach((reference: { link: string; }, index: number) => updateReference(index, 'link', reference.link));
          
         } else if (meta) {
          ///--------------------------------------------------------
          // Used when the user wants to update an already saved card with data
          // meta data will be send as props.
          ///--------------------------------------------------------
            mockData = {
              title: meta!.title,
              category: meta!.category,
              tags: meta!.tags,
              steps: meta!.steps,
              codeSnippets: meta!.codeSnippets,
              references: meta!.references,
              notes: meta!.notes,
            };
          // Set individual state values
        setTitle(mockData.title);
        setCategory(mockData.category);
        setTags(mockData.tags);
        setSteps(mockData.steps);
        setNotes(mockData.notes);
        mockData.codeSnippets.forEach((snippet: { language: string; }, index: number) => updateCodeSnippet(index, 'language', snippet.language));
        mockData.codeSnippets.forEach((snippet: { code: string; }, index: number) => updateCodeSnippet(index, 'code', snippet.code));
        mockData.references.forEach((reference: { title: string; }, index: number) => updateReference(index, 'title', reference.title));
        mockData.references.forEach((reference: { link: string; }, index: number) => updateReference(index, 'link', reference.link));
        }  else {
         setIsEditing(false);
        }
        
     }, []);
    //

    return (
        <>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6" >
          <form data-cy={dataCity} onSubmit={(e) => handleSubmit( e, setIsSaving, setSaveSuccess, title, category, tags, steps, notes, codeSnippets, references, resetForm, router)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    id="title"
                    className={`w-full p-3 border border-gray-300 ${color_bg_inputs} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black`}
                    placeholder="E.g., NextAuth JWT Implementation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                {/*Left Column - Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    id="category"
                    className={`w-full p-3 border border-gray-300 ${color_bg_inputs} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                 {/* Right Column - Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated) *</label>
                  <input
                    type="text"
                    id="tags"
                    className={`w-full p-3 border border-gray-300 ${color_bg_inputs} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black`}
                    placeholder="E.g., Auth, JWT, Security"
                    value={tagInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTagInput(value);
                      const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
                      setTags(tagsArray)
                      e.preventDefault();
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">Add relevant keywords to make this entry easier to find later</p>
                </div>
                {/* Right Column - Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                  <textarea
                    id="notes"
                    className={`w-full p-3 border border-gray-300 ${color_bg_inputs} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 placeholder:text-black`}
                    placeholder="E.g., Remember to refresh token before expires, Add package named..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Left Column - Steps */}
              <div>
                <div>
                  <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-1">Steps (one per line) *</label>
                  <textarea
                    id="steps"
                    className={`w-full p-3 border border-gray-300 ${color_bg_inputs} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-64 placeholder:text-black`}
                    placeholder="1. Install required packages&#10;2. Set up environment variables&#10;3. Create middleware&#10;4. Example usage"
                    value={stepInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setStepInput(value);
                      const tagsArray = value.split("\n").map(tag => tag.trim()).filter(tag => tag !== '');
                      setSteps(tagsArray)}}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Break down the process into clear, sequential steps</p>
                </div>
              </div>
            </div>
            
            {/* Code Snippets Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Code Snippets</h3>
                <button 
                  type="button" 
                  onClick={()=> addCodeSnippet()}
                  className="inline-flex items-center px-3 py-1 border border-blue-600 text-blue-600 text-sm rounded-md hover:bg-blue-50"
                >
                  <Plus size={16} className="mr-1" />
                  Add Snippet
                </button>
              </div>
              
              {codeSnippets.map((snippet, index) => (
                <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Snippet {index + 1}</h4>
                    {codeSnippets.length >= 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeCodeSnippet(index)}
                        className="inline-flex items-center p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Remove code snippet"
                      >
                        <Trash size={16} />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <input
                        type="text"
                        className={`w-full p-2 border border-gray-300 ${color_bg_inputs} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black `}
                        placeholder="typescript, javascript, python, etc."
                        value={snippet.language}
                        onChange={(e) => updateCodeSnippet(index, 'language', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                    <textarea
                      className={`w-full p-3 border border-gray-300 ${color_bg_inputs} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-48 font-mono text-sm placeholder:text-black`}
                      placeholder="// Insert your code here"
                      value={snippet.code}
                      onChange={(e) => updateCodeSnippet(index, 'code', e.target.value)}
                      onPaste={(e) => updateCodeSnippetPaste(index, e)}
                    />
                  </div>
                  {/* )} */}
                </div>
              ))}
            </div>
            
            {/* References Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">References</h3>
                <button 
                  type="button" 
                  onClick={addReference}
                  className="inline-flex items-center px-3 py-1 border border-blue-600 text-blue-600 text-sm rounded-md hover:bg-blue-50"
                >
                  <Plus size={16} className="mr-1" />
                  Add Reference
                </button>
              </div>
              
              {references.map((reference, index) => (
                <div key={index} className="mb-3 flex items-center gap-3">
                  <div className="flex-grow">
                    <input
                      type="text"
                      className={`w-full p-3 border border-gray-300 ${color_bg_inputs} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black`}
                      placeholder="Reference title (e.g., Official Documentation)"
                      value={reference.title}
                      onChange={(e) => updateReference(index, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex-grow flex items-center">
                    <LinkIcon size={16} className="text-gray-400 mr-2" />
                    <input
                      type="url"
                      className={`w-full p-3 border border-gray-300 ${color_bg_inputs} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black`}
                      placeholder="URL (e.g., https://example.com/docs)"
                      value={reference.link}
                      onChange={(e) => updateReference(index, 'link', e.target.value)}
                      onPaste={(e) => updateReferencePaste(index, e)}
                    />
                  </div>
                  
                  {references.length >= 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeReference(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Remove code snippet"
                    >
                      <Trash size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3 border-t pt-6">
              <CustomButton type={type!} setUpdateNote={setUpdateNote} setIsCreating={setIsCreating} resetForm={resetForm}/>
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue text-white rounded-md hover:bg-blue-700 flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader type="Saving..." />
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    {isEditing ? 'Update' : 'Save'}
                  </>
                )}
              </button>
            </div>
            
            {saveSuccess && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Entry {isEditing ? 'updated' : 'saved'} successfully!
              </div>
            )}
          </form>
        </div>
        </>
    )
};