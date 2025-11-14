"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useState, useCallback } from "react";

interface NovelBioEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function NovelBioEditor({ content, onChange }: NovelBioEditorProps) {
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [commandMenuPosition, setCommandMenuPosition] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [hoveredBlockPos, setHoveredBlockPos] = useState<number | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Write your professional bio here... Click the + button to add blocks",
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Youtube.configure({
        width: 640,
        height: 360,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[500px] p-4",
      },
    },
  });

  const insertColumns = (cols: number) => {
    const html = `
      <div class="columns-container" style="display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: 1rem; margin: 1rem 0;">
        ${Array(cols).fill(0).map(() => '<div class="column" style="border: 1px dashed #e5e7eb; padding: 1rem; min-height: 100px;"><p>Column content...</p></div>').join('')}
      </div>
    `;
    editor?.commands.insertContent(html);
  };

  const commands = [
    { label: 'Heading 1', icon: 'H1', action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: 'Heading 2', icon: 'H2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: 'Heading 3', icon: 'H3', action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: 'Bullet List', icon: '•', action: () => editor?.chain().focus().toggleBulletList().run() },
    { label: 'Numbered List', icon: '1.', action: () => editor?.chain().focus().toggleOrderedList().run() },
    { label: 'Task List', icon: '☑', action: () => editor?.chain().focus().toggleTaskList().run() },
    { label: 'Quote', icon: '"', action: () => editor?.chain().focus().toggleBlockquote().run() },
    { label: 'Code Block', icon: '<>', action: () => editor?.chain().focus().toggleCodeBlock().run() },
    { label: 'Table', icon: '⊞', action: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    { label: '2 Columns', icon: '⫿', action: () => { setShowCommandMenu(false); insertColumns(2); } },
    { label: '3 Columns', icon: '⚏', action: () => { setShowCommandMenu(false); insertColumns(3); } },
    { label: 'Image', icon: '🖼️', action: () => { setShowCommandMenu(false); setShowImageInput(true); } },
    { label: 'Video', icon: '🎥', action: () => { setShowCommandMenu(false); setShowVideoInput(true); } },
    { label: 'Divider', icon: '─', action: () => editor?.chain().focus().setHorizontalRule().run() },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(searchQuery)
  );

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageInput(false);
    }
  }, [editor, imageUrl]);

  const addImageFromFile = useCallback((file: File) => {
    if (file && editor) {
      const reader = new FileReader();
      reader.onloadend = () => {
        editor.chain().focus().setImage({ src: reader.result as string }).run();
      };
      reader.readAsDataURL(file);
      setShowImageInput(false);
    }
  }, [editor]);

  const addVideo = useCallback(() => {
    if (videoUrl && editor) {
      editor.commands.setYoutubeVideo({ src: videoUrl });
      setVideoUrl('');
      setShowVideoInput(false);
    }
  }, [editor, videoUrl]);

  useEffect(() => {
    if (editor && content && !editor.getHTML().includes(content.substring(0, 20))) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Handle + button clicks on blocks
  useEffect(() => {
    if (!editor) return;

    const handlePlusClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if clicked on the ::after pseudo element (+ button)
      const block = target.closest('.ProseMirror > *');
      if (block && e.offsetX < 30) { // Click in the left margin area
        const rect = block.getBoundingClientRect();
        setCommandMenuPosition({ top: rect.bottom + 5, left: rect.left });
        setShowCommandMenu(true);
        setSearchQuery('');
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const editorElement = editor.view.dom;
    editorElement.addEventListener('click', handlePlusClick);

    return () => {
      editorElement.removeEventListener('click', handlePlusClick);
    };
  }, [editor]);

  // Make images resizable
  useEffect(() => {
    if (!editor) return;

    const makeImagesResizable = () => {
      const images = editor.view.dom.querySelectorAll('img');
      
      images.forEach((img: Element) => {
        const imgElement = img as HTMLImageElement;
        if (imgElement.dataset.resizable) return; // Already made resizable
        
        imgElement.dataset.resizable = 'true';
        imgElement.style.cursor = 'nwse-resize';
        
        let isResizing = false;
        let startX = 0;
        let startWidth = 0;

        const handleMouseDown = (e: MouseEvent) => {
          if (e.offsetX > imgElement.width - 20 && e.offsetY > imgElement.height - 20) {
            isResizing = true;
            startX = e.clientX;
            startWidth = imgElement.width;
            imgElement.classList.add('resizing');
            e.preventDefault();
          }
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!isResizing) return;
          const width = startWidth + (e.clientX - startX);
          if (width > 100 && width < 1000) {
            imgElement.style.width = width + 'px';
          }
        };

        const handleMouseUp = () => {
          if (isResizing) {
            isResizing = false;
            imgElement.classList.remove('resizing');
          }
        };

        imgElement.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      });
    };

    // Run on content update
    const observer = new MutationObserver(makeImagesResizable);
    observer.observe(editor.view.dom, { childList: true, subtree: true });
    makeImagesResizable();

    return () => {
      observer.disconnect();
    };
  }, [editor]);

  // Enable drag and drop
  useEffect(() => {
    if (!editor) return;

    let draggedElement: HTMLElement | null = null;
    let dropTarget: HTMLElement | null = null;

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('.ProseMirror > *')) {
        draggedElement = target;
        target.classList.add('dragging');
        e.dataTransfer!.effectAllowed = 'move';
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      const target = (e.target as HTMLElement).closest('.ProseMirror > *') as HTMLElement;
      if (target && target !== draggedElement) {
        if (dropTarget) dropTarget.classList.remove('drop-target');
        dropTarget = target;
        target.classList.add('drop-target');
      }
    };

    const handleDragEnd = () => {
      if (draggedElement) {
        draggedElement.classList.remove('dragging');
        draggedElement = null;
      }
      if (dropTarget) {
        dropTarget.classList.remove('drop-target');
        dropTarget = null;
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (!draggedElement || !dropTarget) return;

      const parent = draggedElement.parentElement;
      if (parent) {
        const draggedIndex = Array.from(parent.children).indexOf(draggedElement);
        const dropIndex = Array.from(parent.children).indexOf(dropTarget);
        
        if (draggedIndex < dropIndex) {
          dropTarget.after(draggedElement);
        } else {
          dropTarget.before(draggedElement);
        }
      }
      
      handleDragEnd();
    };

    const editorElement = editor.view.dom;
    const blocks = editorElement.querySelectorAll('.ProseMirror > *');
    
    blocks.forEach(block => {
      block.setAttribute('draggable', 'true');
      block.addEventListener('dragstart', handleDragStart as EventListener);
      block.addEventListener('dragover', handleDragOver as EventListener);
      block.addEventListener('drop', handleDrop as EventListener);
      block.addEventListener('dragend', handleDragEnd);
    });

    return () => {
      blocks.forEach(block => {
        block.removeEventListener('dragstart', handleDragStart as EventListener);
        block.removeEventListener('dragover', handleDragOver as EventListener);
        block.removeEventListener('drop', handleDrop as EventListener);
        block.removeEventListener('dragend', handleDragEnd);
      });
    };
  }, [editor]);

  if (!editor) {
    return <div className="min-h-[500px] p-4 border border-gray-200 rounded-lg">Loading editor...</div>;
  }

  const handleAddBlock = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCommandMenuPosition({ top: rect.bottom + 5, left: rect.left });
    setShowCommandMenu(true);
    setSearchQuery('');
  };

  return (
    <div className="w-full relative">
      {/* Command Menu */}
      {showCommandMenu && (
        <>
          <div 
            className="fixed inset-0 z-30"
            onClick={() => setShowCommandMenu(false)}
          />
          <div 
            className="fixed z-40 bg-white border border-gray-300 rounded-lg shadow-xl py-2 w-64 max-h-96 overflow-y-auto"
            style={{ top: commandMenuPosition.top, left: commandMenuPosition.left }}
          >
            <div className="px-3 py-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                autoFocus
              />
            </div>
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, index) => (
                <button
                  key={index}
                  onClick={() => {
                    cmd.action();
                    setShowCommandMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-3 transition-colors"
                >
                  <span className="text-lg w-6 text-center">{cmd.icon}</span>
                  <span className="text-sm text-gray-700">{cmd.label}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No commands found</div>
            )}
          </div>
        </>
      )}

      {/* Image Input Modal */}
      {showImageInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addImage()}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Or Upload File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) addImageFromFile(file);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowImageInput(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={addImage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Input Modal */}
      {showVideoInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add YouTube Video</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">YouTube URL</label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addVideo()}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowVideoInput(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={addVideo}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Add Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="w-full border border-gray-200 rounded-lg bg-white relative editor-container">
        <style jsx global>{`
          /* Editor container */
          .editor-container .ProseMirror {
            position: relative;
          }
          
          /* Block wrapper for hover effects */
          .editor-container .ProseMirror > * {
            position: relative;
            padding-left: 40px;
          }
          
          /* Hover controls container */
          .editor-container .ProseMirror > *::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 40px;
            height: 100%;
            opacity: 0;
            transition: opacity 0.2s;
          }
          
          .editor-container .ProseMirror > *:hover::before {
            opacity: 1;
          }
          
          /* Drag handle (⋮⋮) on hover */
          .editor-container .ProseMirror > *::before {
            content: '⋮⋮';
            position: absolute;
            left: 4px;
            top: 4px;
            width: 16px;
            height: 20px;
            color: #9ca3af;
            font-size: 14px;
            line-height: 10px;
            letter-spacing: -2px;
            cursor: grab;
            opacity: 0;
            transition: all 0.2s;
            z-index: 10;
          }
          
          .editor-container .ProseMirror > *:hover::before {
            opacity: 1;
            color: #6b7280;
          }
          
          .editor-container .ProseMirror > *:active::before {
            cursor: grabbing;
          }
          
          /* + Button on hover */
          .editor-container .ProseMirror > *::after {
            content: '+';
            position: absolute;
            left: 24px;
            top: 2px;
            width: 24px;
            height: 24px;
            background: #3b82f6;
            color: white;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            transition: all 0.2s;
            z-index: 10;
          }
          
          .editor-container .ProseMirror > *:hover::after {
            opacity: 1;
          }
          
          .editor-container .ProseMirror > *::after:hover {
            background: #2563eb;
            transform: scale(1.1);
          }
          
          /* Drag indicator */
          .editor-container .ProseMirror > *.dragging {
            opacity: 0.5;
            background: #f3f4f6;
          }
          
          /* Drop indicator */
          .editor-container .ProseMirror > *.drop-target {
            border-top: 2px solid #3b82f6;
          }
          

          .prose h1 { font-size: 2.25rem; font-weight: bold; margin: 1rem 0; }
          .prose h2 { font-size: 1.875rem; font-weight: bold; margin: 0.875rem 0; }
          .prose h3 { font-size: 1.5rem; font-weight: bold; margin: 0.75rem 0; }
          .prose p { margin: 0.5rem 0; line-height: 1.75; }
          .prose ul, .prose ol { padding-left: 1.5rem; margin: 0.5rem 0; }
          .prose ul[data-type="taskList"] { list-style: none; padding-left: 0; }
          .prose ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 0.5rem; }
          .prose ul[data-type="taskList"] li input[type="checkbox"] { margin-top: 0.25rem; }
          .prose blockquote { border-left: 4px solid #e5e7eb; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6b7280; }
          .prose pre { background: #1f2937; color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1rem 0; }
          .prose code { background: #f3f4f6; padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-size: 0.875rem; }
          .prose pre code { background: none; padding: 0; color: inherit; }
          .prose img { 
            max-width: 100%; 
            height: auto; 
            border-radius: 0.5rem; 
            margin: 1rem 0;
            cursor: pointer;
            transition: all 0.2s;
          }
          .prose img:hover {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .prose img.resizing {
            outline: 2px solid #3b82f6;
          }
          
          /* Columns styling */
          .columns-container {
            display: grid;
            gap: 1rem;
            margin: 1rem 0;
            padding: 0.5rem;
            border: 2px dashed transparent;
            border-radius: 0.5rem;
            transition: border-color 0.2s;
          }
          .columns-container:hover {
            border-color: #e5e7eb;
          }
          .column {
            border: 1px dashed #d1d5db;
            padding: 1rem;
            min-height: 100px;
            border-radius: 0.375rem;
            transition: all 0.2s;
          }
          .column:hover {
            border-color: #3b82f6;
            background: #f9fafb;
          }
          
          .prose hr { border: none; border-top: 2px solid #e5e7eb; margin: 2rem 0; }
          .prose table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
          .prose th, .prose td { border: 1px solid #e5e7eb; padding: 0.5rem; text-align: left; }
          .prose th { background: #f3f4f6; font-weight: bold; }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
