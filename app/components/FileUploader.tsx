import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void; // void means it doesn’t return anything.
}

const maxFileSize = 20 * 1024 * 1024; // this = 20 MB

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]); // we will then modify the onDrop function whenever onFileSelect function changes

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false, // accepts single PDF
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    });

    // get access to actual file
    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">


                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <img src="/images/pdf.png" alt="pdf" className="size-10" />
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>

                            {/*//button to remove pdf.*/}
                            <button className="p-2 cursor-pointer" onClick={(e) => {
                                //null is to reset the uploaded file
                                onFileSelect?.(null);
                            }}>
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4 " />
                            </button>
                        </div>

                    ) : (
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="upload" className="size-20" />
                            </div>
                            <p className="text-lg text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>

                            <p className="text-lg text-gray-500">
                                PDF (max {formatSize(maxFileSize)})
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
