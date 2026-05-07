import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Camera, ImageIcon, Sparkles, LayoutGrid } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function GalleryPage({ searchParams }: PageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  const categoryFilter = typeof params.category === 'string' ? params.category : ''
  
  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'campus', label: 'Campus' },
    { id: 'events', label: 'Events' },
    { id: 'sports', label: 'Sports' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'academic', label: 'Academic' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ]

  let query = supabase
    .from('gallery')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('display_order', { ascending: true })

  if (categoryFilter && categoryFilter !== 'all') {
    query = query.eq('category', categoryFilter)
  }

  const { data: gallery } = await query

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,19,29,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-secondary text-secondary uppercase tracking-widest font-bold px-4 py-1">
              Visual Archive
            </Badge>
            <h1 className="headline-xl mb-8 leading-[1.1]">
              The Xavier <br />
              <span className="italic text-secondary">Chronicle.</span>
            </h1>
            <p className="text-xl text-slate-300 font-sans leading-relaxed">
              A curated visual narrative of excellence, innovation, and vibrant 
              campus life at the heart of Xavier College.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="container-custom py-6">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 text-slate-400 mr-2 flex-shrink-0">
              <LayoutGrid className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
            </div>
            {categories.map((cat) => {
              const isActive = (categoryFilter === cat.id || (cat.id === 'all' && !categoryFilter));
              return (
                <Link
                  key={cat.id}
                  href={cat.id === 'all' ? '/gallery' : `/gallery?category=${cat.id}`}
                  className={cn(
                    "whitespace-now-of-nowrap px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all",
                    isActive 
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                      : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          {gallery && gallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "group relative overflow-hidden rounded-[40px] bg-slate-50 transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200",
                    item.is_featured ? "md:col-span-2 lg:aspect-video" : "aspect-square"
                  )}
                >
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-200" />
                    </div>
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Info Overlay */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-secondary/90 hover:bg-secondary text-white font-black text-[10px] tracking-widest px-3 py-1">
                        {item.category}
                      </Badge>
                      {item.is_featured && (
                        <div className="flex items-center gap-1.5 text-white/60 text-[10px] font-black uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5 text-secondary" /> Featured
                        </div>
                      )}
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-2 leading-tight">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-slate-300 font-sans text-sm line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[60px] border border-dashed border-slate-200">
              <Camera className="w-16 h-16 text-slate-200 mx-auto mb-8" />
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">Awaiting New Memories</h3>
              <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed mb-10">
                Our visual chronicle is being curated. Please check back soon for 
                new photos from around the campus.
              </p>
              <Link href="/gallery" className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs border-b-2 border-secondary pb-1">
                Refresh Gallery
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
