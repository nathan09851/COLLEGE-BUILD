import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { format } from 'date-fns'
import { Bell, Pin, Calendar, AlertCircle, GraduationCap, Users, FileText } from 'lucide-react'

export default async function NoticesPage() {
  const supabase = await createClient()
  
  // Fetch notices with proper ordering
  const { data: pinnedNotices } = await supabase
    .from('notices')
    .select('*')
    .eq('is_pinned', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const { data: regularNotices } = await supabase
    .from('notices')
    .select('*')
    .eq('is_pinned', false)
    .eq('is_active', true)
    .order('priority', { ascending: false })
    .order('publish_date', { ascending: false })

  const notices = [...(pinnedNotices || []), ...(regularNotices || [])]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'admission': return <GraduationCap className="w-4 h-4" />
      case 'academic': return <FileText className="w-4 h-4" />
      case 'placement': return <Users className="w-4 h-4" />
      case 'examination': return <AlertCircle className="w-4 h-4" />
      case 'event': return <Calendar className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'admission': return 'bg-secondary/10 text-secondary'
      case 'academic': return 'bg-primary/10 text-primary'
      case 'placement': return 'bg-tertiary/10 text-tertiary'
      case 'examination': return 'bg-error/10 text-error'
      case 'event': return 'bg-primary/10 text-primary'
      default: return 'bg-primary/10 text-primary'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return <span className="px-2 py-1 bg-error text-white text-xs font-bold rounded">URGENT</span>
      case 'high': return <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs font-bold rounded">HIGH</span>
      case 'normal': return null
      case 'low': return null
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <Bell className="w-8 h-8" />
              <h1 className="headline-xl">Notices & Announcements</h1>
            </div>
            <p className="text-lg text-white/70">
              Stay updated with the latest announcements, events, and important information from the college.
            </p>
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="container-custom py-16">
        {notices && notices.length > 0 ? (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div 
                key={notice.id} 
                className={`card-minimal ${notice.is_pinned ? 'border-l-4 border-l-secondary' : ''}`}
              >
                <div className="flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      {notice.is_pinned && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded">
                          <Pin className="w-3 h-3" />
                          PINNED
                        </span>
                      )}
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                        {getCategoryIcon(notice.category)}
                        {notice.category.toUpperCase()}
                      </span>
                      {getPriorityBadge(notice.priority)}
                    </div>
                    <span className="text-sm text-primary/60 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(notice.publish_date), 'MMM d, yyyy')}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-serif mb-3">{notice.title}</h3>
                    <p className="text-primary/70 leading-relaxed whitespace-pre-line">
                      {notice.content}
                    </p>
                  </div>

                  {/* Footer */}
                  {notice.attachment_url && (
                    <div className="pt-4 border-t border-primary/10">
                      <a 
                        href={notice.attachment_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-secondary hover:underline"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="label-caps">Download Attachment</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">No Notices Available</h3>
            <p className="text-primary/60">Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  )
}
