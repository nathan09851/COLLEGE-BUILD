import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { format } from 'date-fns'
import { Bell, Pin, Calendar, AlertCircle, GraduationCap, Users, FileText, Download, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default async function NoticesPage() {
  const supabase = await createClient()
  
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
      case 'admission': return <GraduationCap className="w-3.5 h-3.5" />
      case 'academic': return <FileText className="w-3.5 h-3.5" />
      case 'placement': return <Users className="w-3.5 h-3.5" />
      case 'examination': return <AlertCircle className="w-3.5 h-3.5" />
      case 'event': return <Calendar className="w-3.5 h-3.5" />
      default: return <Bell className="w-3.5 h-3.5" />
    }
  }

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'admission': return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'academic': return 'bg-blue-50 text-blue-700 border-blue-100'
      case 'placement': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'examination': return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'event': return 'bg-purple-50 text-purple-700 border-purple-100'
      default: return 'bg-slate-50 text-slate-700 border-slate-100'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,19,29,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-secondary text-secondary uppercase tracking-widest font-bold px-4 py-1">
              Updates
            </Badge>
            <h1 className="headline-xl mb-8 leading-[1.1]">
              Notices & <br />
              <span className="italic text-secondary">Announcements.</span>
            </h1>
            <p className="text-xl text-slate-300 font-sans leading-relaxed">
              Stay connected with the heartbeat of Xavier College. Important updates, 
              academic milestones, and campus events all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          {notices && notices.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-8">
              {notices.map((notice) => (
                <Card 
                  key={notice.id} 
                  className={cn(
                    "group relative overflow-hidden border-none shadow-xl shadow-slate-200/50 transition-all duration-500 hover:scale-[1.01]",
                    notice.is_pinned ? "bg-white ring-1 ring-secondary/20" : "bg-white"
                  )}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Date Indicator */}
                      <div className={cn(
                        "md:w-32 flex flex-col items-center justify-center py-8 px-4 text-center border-b md:border-b-0 md:border-r border-slate-50",
                        notice.is_pinned ? "bg-secondary text-white" : "bg-slate-50 text-slate-400"
                      )}>
                        <span className="text-[10px] uppercase font-black tracking-widest mb-1 opacity-60">
                          {format(new Date(notice.publish_date), 'MMM')}
                        </span>
                        <span className="text-4xl font-serif font-bold leading-none mb-1">
                          {format(new Date(notice.publish_date), 'dd')}
                        </span>
                        <span className="text-[10px] font-bold tracking-tighter opacity-60">
                          {format(new Date(notice.publish_date), 'yyyy')}
                        </span>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6 flex-wrap">
                          {notice.is_pinned && (
                            <Badge className="bg-secondary hover:bg-secondary text-white font-black text-[10px] tracking-widest px-3 py-1 gap-1.5">
                              <Pin className="w-3 h-3" /> PINNED
                            </Badge>
                          )}
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "font-black text-[10px] tracking-widest px-3 py-1 gap-1.5 uppercase border",
                              getCategoryStyles(notice.category)
                            )}
                          >
                            {getCategoryIcon(notice.category)} {notice.category}
                          </Badge>
                          {notice.priority === 'urgent' && (
                            <Badge className="bg-red-500 hover:bg-red-600 text-white font-black text-[10px] tracking-widest px-3 py-1">
                              URGENT
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-secondary transition-colors leading-tight">
                          {notice.title}
                        </h3>
                        
                        <p className="text-slate-600 font-sans leading-relaxed mb-8 whitespace-pre-line text-base">
                          {notice.content}
                        </p>

                        {notice.attachment_url && (
                          <a 
                            href={notice.attachment_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-[10px] px-6 py-3 rounded-xl transition-all shadow-lg shadow-slate-200"
                          >
                            <Download className="w-4 h-4" /> Download Document
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[40px] shadow-sm border border-slate-100">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Bell className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">The boards are clear</h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-10 text-lg">
                There are no active notices or announcements at this time. 
                Please check back later for updates.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all">
                Return to Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
