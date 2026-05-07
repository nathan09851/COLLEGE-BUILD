import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { format, isSameMonth, isToday, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'
import { Calendar, Clock, MapPin, GraduationCap, Trophy, PartyPopper, AlertCircle, Briefcase } from 'lucide-react'

export default async function AcademicCalendarPage() {
  const supabase = await createClient()
  
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('is_public', true)
    .order('start_date', { ascending: true })

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'academic': return <GraduationCap className="w-4 h-4" />
      case 'sports': return <Trophy className="w-4 h-4" />
      case 'cultural': return <PartyPopper className="w-4 h-4" />
      case 'examination': return <AlertCircle className="w-4 h-4" />
      case 'placement': return <Briefcase className="w-4 h-4" />
      case 'holiday': return <Clock className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-primary/10 text-primary border-primary/20'
      case 'sports': return 'bg-tertiary/10 text-tertiary border-tertiary/20'
      case 'cultural': return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'examination': return 'bg-error/10 text-error border-error/20'
      case 'placement': return 'bg-primary/10 text-primary border-primary/20'
      case 'holiday': return 'bg-primary/5 text-primary/60 border-primary/10'
      default: return 'bg-primary/10 text-primary border-primary/20'
    }
  }

  // Group events by month
  const groupedEvents = events?.reduce((acc, event) => {
    const month = format(new Date(event.start_date), 'MMMM yyyy')
    if (!acc[month]) acc[month] = []
    acc[month].push(event)
    return acc
  }, {} as Record<string, typeof events>)

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <Link href="/" className="text-xl font-serif font-semibold tracking-tight inline-block mb-8">
            Xavier <span className="italic">College</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="w-8 h-8" />
            <h1 className="headline-xl">Academic Calendar</h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl">
            Stay informed about important dates, events, and activities throughout the academic year.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-b border-primary/10">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              Academic
            </span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-tertiary"></span>
              Sports
            </span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              Cultural
            </span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-error"></span>
              Examination
            </span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-primary/60"></span>
              Placement
            </span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-primary/30"></span>
              Holiday
            </span>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="container-custom py-16">
        {groupedEvents && Object.keys(groupedEvents).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedEvents).map(([month, monthEvents]) => (
              <section key={month}>
                <h2 className="text-2xl font-serif mb-6 pb-4 border-b-2 border-primary/10">
                  {month}
                </h2>
                <div className="space-y-4">
                  {monthEvents?.map((event) => (
                    <div 
                      key={event.id} 
                      className={`card-minimal border-l-4 ${getEventColor(event.event_type)}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        {/* Date */}
                        <div className="flex-shrink-0 w-20 text-center">
                          <div className="text-3xl font-serif text-primary">
                            {format(new Date(event.start_date), 'd')}
                          </div>
                          <div className="text-sm text-primary/60 uppercase">
                            {format(new Date(event.start_date), 'EEE')}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getEventColor(event.event_type)}`}>
                              {getEventIcon(event.event_type)}
                              {event.event_type.replace('_', ' ').toUpperCase()}
                            </span>
                            {event.is_all_day && (
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                ALL DAY
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-serif mb-2">{event.title}</h3>
                          
                          {event.description && (
                            <p className="text-primary/70 mb-3">{event.description}</p>
                          )}

                          <div className="flex flex-wrap gap-4 text-sm text-primary/60">
                            {!event.is_all_day && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {format(new Date(event.start_date), 'h:mm a')}
                                {event.end_date && ` - ${format(new Date(event.end_date), 'h:mm a')}`}
                              </span>
                            )}
                            {event.venue && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.venue}
                              </span>
                            )}
                          </div>

                          {event.registration_required && event.registration_link && (
                            <div className="mt-4">
                              <a 
                                href={event.registration_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-secondary hover:underline"
                              >
                                Register Now →
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">No Events Scheduled</h3>
            <p className="text-primary/60">The academic calendar will be updated soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
