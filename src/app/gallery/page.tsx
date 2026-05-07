import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Camera, Grid3X3, ImageIcon } from 'lucide-react'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function GalleryPage({ searchParams }: PageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  const categoryFilter = typeof params.category === 'string' ? params.category : ''
  
  const categories = [
    { id: 'all', label: 'All' },
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
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <Camera className="w-8 h-8" />
              <h1 className="headline-xl">Photo Gallery</h1>
            </div>
            <p className="text-lg text-white/70">
              A visual journey through campus life, events, and memorable moments at Xavier College.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-primary/10">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === 'all' ? '/gallery' : `/gallery?category=${cat.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (categoryFilter === cat.id || (cat.id === 'all' && !categoryFilter))
                    ? 'bg-primary text-white'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container-custom py-16">
        {gallery && gallery.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div 
                key={item.id} 
                className={`group relative aspect-square overflow-hidden rounded-lg bg-primary/5 ${
                  item.is_featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-primary/20" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-serif text-lg">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-white/80 line-clamp-2 mt-1">{item.description}</p>
                    )}
                    <span className="inline-block mt-2 px-2 py-1 bg-white/20 rounded text-xs capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Featured Badge */}
                {item.is_featured && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-secondary text-white text-xs font-bold rounded">
                    FEATURED
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Grid3X3 className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">No Photos Available</h3>
            <p className="text-primary/60">Gallery will be updated soon with campus photos.</p>
          </div>
        )}
      </div>
    </div>
  )
}
