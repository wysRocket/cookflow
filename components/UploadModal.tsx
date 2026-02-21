import React, { useRef, useState } from 'react';
import { X, Upload, Image, CheckCircle2 } from 'lucide-react';

interface UploadModalProps {
    onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [uploaded, setUploaded] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleFile = (file: File) => {
        if (!file.type.match(/image\/(jpeg|png|heic)/i)) return;
        const reader = new FileReader();
        reader.onload = (e) => setUploaded(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleSubmit = () => {
        if (!uploaded) return;
        setSubmitted(true);
        setTimeout(onClose, 1800);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-7 py-5 border-b border-[#E2E8F0]">
                    <div>
                        <h2 className="text-lg font-bold text-[#334155]">Upload Your Creation</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">
                            Share your culinary masterpiece with the CookFlow community
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-[#F8FAFC] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors"
                    >
                        <X className="w-4 h-4 text-[#64748B]" />
                    </button>
                </div>

                <div className="p-7 space-y-5">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-4">
                            <CheckCircle2 className="w-14 h-14 text-[#D4AF37]" />
                            <p className="text-lg font-bold text-[#334155]">Creation Shared!</p>
                            <p className="text-sm text-[#64748B]">Your masterpiece is now live on CookFlow.</p>
                        </div>
                    ) : (
                        <>
                            {/* Drop zone */}
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${dragging
                                        ? 'border-[#14b8a6] bg-orange-50'
                                        : uploaded
                                            ? 'border-[#D4AF37] bg-lime-50'
                                            : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#14b8a6] hover:bg-orange-50/50'
                                    }`}
                                style={{ minHeight: 180 }}
                            >
                                {uploaded ? (
                                    <img
                                        src={uploaded}
                                        alt="Preview"
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 gap-3">
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center">
                                            <Image className="w-7 h-7 text-[#14b8a6]" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-[#334155]">Plating Shot</p>
                                            <p className="text-xs text-[#64748B] mt-1">
                                                Drag and drop your high-resolution food photography here
                                            </p>
                                            <p className="text-xs text-[#94A3B8] mt-1">
                                                Supports JPG, PNG, HEIC up to 25MB
                                            </p>
                                        </div>
                                        <button className="flex items-center gap-2 bg-[#14b8a6] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#0d9488] transition-colors">
                                            <Upload className="w-3.5 h-3.5" />
                                            Browse Files
                                        </button>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/heic"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFile(file);
                                    }}
                                />
                            </div>

                            {/* Fields */}
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1.5">
                                        Dish Name
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Wild Truffle Risotto"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm text-[#334155] placeholder-[#CBD5E1] focus:outline-none focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your creation..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm text-[#334155] placeholder-[#CBD5E1] focus:outline-none focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/20 transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-1">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 rounded-xl border border-[#E2E8F0] text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!uploaded}
                                    className="flex-1 py-3 rounded-xl bg-[#14b8a6] text-white text-sm font-semibold hover:bg-[#0d9488] transition-all shadow-md shadow-orange-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    Share Creation
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
