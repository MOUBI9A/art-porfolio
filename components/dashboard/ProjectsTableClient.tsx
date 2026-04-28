'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { 
  GripVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Search,
  Plus,
  Film
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Project } from '@/lib/types';
import toast from 'react-hot-toast';

interface Props {
  initialProjects: Project[];
}

export default function ProjectsTableClient({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    (p.role?.toLowerCase() || '').includes(filter.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    setDeletingId(id);
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      toast.error('Error deleting project');
      setDeletingId(null);
    } else {
      toast.success('Project deleted');
      setProjects(prev => prev.filter(p => p.id !== id));
      setDeletingId(null);
      router.refresh();
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update local state immediately for UX
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index
    }));
    setProjects(updatedItems);

    // Save to DB
    const updates = updatedItems.map((item, index) => ({
      id: item.id,
      display_order: index
    }));

    // In a real production app, you might want to use a single RPC call or transaction
    // For MVP, we'll update them. Note: Supabase doesn't support bulk upsert with different values easily 
    // without a custom function, but we can try to at least trigger a few updates.
    
    // Simplest way for small lists:
    for (const update of updates) {
      await supabase
        .from('projects')
        .update({ display_order: update.display_order })
        .eq('id', update.id);
    }
    
    toast.success('Project order updated');
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input
            type="text"
            placeholder="Search projects by title or role..."
            className="form-input pl-10 h-11"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 border-b border-white/5 bg-white/5 text-xs font-semibold uppercase tracking-widest text-white/30">
          <div className="w-10"></div>
          <div>Project</div>
          <div>Role / Date</div>
          <div className="text-right">Actions</div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="projects-table">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {filteredProjects.length === 0 ? (
                  <div className="p-20 text-center text-white/20">
                    <p>No projects found matching your criteria.</p>
                  </div>
                ) : (
                  filteredProjects.map((project, index) => (
                    <Draggable key={project.id} draggableId={project.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 items-center border-b border-white/5 last:border-0 transition-colors ${
                            snapshot.isDragging ? 'bg-white/10 glass-strong shadow-2xl z-50' : 'hover:bg-white/[0.02]'
                          }`}
                        >
                          <div {...provided.dragHandleProps} className="w-10 flex justify-center text-white/20 hover:text-white/50 cursor-grab active:cursor-grabbing">
                            <GripVertical size={20} />
                          </div>

                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-16 h-10 rounded overflow-hidden bg-charcoal-800 flex-shrink-0">
                              {project.thumbnail_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={project.thumbnail_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/10 bg-white/5">
                                  <Film size={20} />
                                </div>
                              )}
                            </div>
                            <div className="truncate">
                              <p className="font-medium text-white truncate">{project.title}</p>
                              <p className="text-xs text-white/30 truncate">{project.slug}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium" style={{ color: project.role ? 'var(--color-gold)' : 'white' }}>
                              {project.role || 'No Role'}
                            </p>
                            <p className="text-xs text-white/30">
                              {new Date(project.created_at).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/projects/${project.slug}`}
                              target="_blank"
                              className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                              title="Preview"
                            >
                              <ExternalLink size={18} />
                            </Link>
                            <Link
                              href={`/dashboard/projects/${project.id}`}
                              className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(project.id, project.title)}
                              disabled={deletingId === project.id}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
