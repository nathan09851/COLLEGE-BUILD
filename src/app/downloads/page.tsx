import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Download, FileText, Filter, BookOpen, GraduationCap, Clock, ClipboardList, Award } from 'lucide-react'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DownloadsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  const categoryFilter = typeof params.category === 'string' ? params.category : ''
  
  const categories = [
    { id: 'all', label: 'All Downloads', icon: FileText },
    { id: 'academic', label: 'Academic', icon: BookOpen },
    { id: 'admission', label: 'Admission', icon: GraduationCap },
    { id: 'examination', label: 'Examination', icon: ClipboardList },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    { id: 'form', label: 'Forms', icon: FileText },
    { id: 'brochure', label: 'Brochures', icon: Award },
  ]

  let query = supabase
    .from('downloads')
    .select('*')
    .eq('is_active', true)
    .order('category')
    .order('display_order', { ascending: true })

  if (categoryFilter && categoryFilter !== 'all') {
    query = query.eq('category', categoryFilter)
  }

  const { data: downloads } = await query

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return ''
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <Link href="/" className="text-xl font-serif font-semibold tracking-tight inline-block mb-8">
            Xavier <span className="italic">College</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <Download className="w-8 h-8" />
            <h1 className="headline-xl">Downloads</h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl">
            Access important documents, forms, syllabi, and resources for students and faculty.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-primary/10">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.id}
                  href={cat.id === 'all' ? '/downloads' : `/downloads?category=${cat.id}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    (categoryFilter === cat.id || (cat.id === 'all' && !categoryFilter))
                      ? 'bg-primary text-white'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Downloads List */}
      <div className="container-custom py-16">
        {downloads && downloads.length > 0 ? (
          <div className="grid gap-4">
            {downloads.map((item) => (
              <div 
                key={item.id} 
                className="card-minimal flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {/* File Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-serif mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-primary/70 mb-2">{item.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-primary/60">
                      <span className="px-2 py-1 bg-primary/5 rounded text-xs uppercase">
                        {item.category}
                      </span>
                      <span className="uppercase">{item.file_type}</span>
                      {item.file_size && (
                        <span>{formatFileSize(item.file_size)}</span>
                      )}
                      {item.download_count > 0 && (
                        <span>{item.download_count} downloads</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span className="label-caps">Download</span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">No Downloads Available</h3>
            <p className="text-primary/60">Documents and resources will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
