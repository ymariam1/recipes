import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '@/components/navbar';

export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setUploadedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    console.log(acceptedFiles);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = fileName => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };  

  return (
    <>
    <Navbar />
    <div className="flex min-h-screen flex-col items-center justify-center bg-(23 23 23)">
      <div className="flex flex-col items-center justify-center p-6 bg-indigo-600 rounded-md">
        <h2 className="text-white text-xl mb-4">Drop your images here</h2>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-white-600 rounded p-6 w-96 text-center ${
            isDragActive ? 'bg-indigo-600' : 'bg-indigo-600'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
              <p className="text-white">Drop the files here...</p>
            ) : (
              <p className="text-white">
                {uploadedFiles.length === 0 ? "Drag 'n' drop some files here, or click to select files" : 'Drag and drop more files, or click to add'}
              </p>
            )}
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 overflow-y-auto max-h-64">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`uploaded preview ${index}`}
                  className="h-24 w-24 object-cover rounded"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center"
                  onClick={() => removeFile(file.name)}
                >
                  X
                </button>
              </div>
            ))}
          </div>

        {uploadedFiles.length > 0 && (
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => alert('Files uploaded!')}
            >
              Upload
              </button>
          )}
      </div>
    </div>
    </>
  );
}
