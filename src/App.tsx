/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  MapPin, 
  CloudRain, 
  Calendar as CalendarIcon, 
  ChevronRight, 
  Loader2, 
  Info,
  Droplets,
  Sun,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { getPlantingAdvice, PlantingAdvice } from './services/gemini';

export default function App() {
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<PlantingAdvice | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !crop) return;

    setLoading(true);
    setError(null);
    try {
      const result = await getPlantingAdvice(location, crop);
      setAdvice(result);
    } catch (err) {
      setError('Failed to get advice. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 pb-20">
      {/* Hero Section */}
      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
            alt="Farm landscape" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-earth-50/0 to-earth-50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-leaf-400 text-leaf-700 bg-leaf-50/50 px-3 py-1">
              AI-Powered Agricultural Intelligence
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-earth-950 mb-4 tracking-tight">
              SowCast <span className="text-leaf-600">AI</span>
            </h1>
            <p className="text-lg md:text-xl text-earth-700 font-medium max-w-2xl mx-auto">
              Precision planting schedules tailored to your local climate and crop needs.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        {/* Input Form */}
        <Card className="glass-card mb-12 border-none">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-600 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <Input 
                  placeholder="e.g. Nairobi, Kenya or Iowa, USA" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/50 border-earth-200 focus:border-leaf-500 focus:ring-leaf-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-600 flex items-center gap-2">
                  <Sprout className="w-3 h-3" /> Chosen Crop
                </label>
                <Input 
                  placeholder="e.g. Maize, Coffee, Wheat" 
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="bg-white/50 border-earth-200 focus:border-leaf-500 focus:ring-leaf-500"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-leaf-600 hover:bg-leaf-700 text-white h-11 font-bold transition-all active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    Generate Calendar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="p-4 mb-8 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3"
          >
            <Info className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-48 w-full rounded-2xl" />
              </div>
              <Skeleton className="h-96 w-full rounded-2xl" />
            </motion.div>
          ) : advice ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm bg-leaf-50 overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CalendarIcon className="w-24 h-24 text-leaf-900" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-leaf-900 flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" /> Optimal Planting
                    </CardTitle>
                    <CardDescription className="text-leaf-700">Best window for sowing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-leaf-900 mb-2">
                      {advice.optimalPlantingWindow.start} — {advice.optimalPlantingWindow.end}
                    </div>
                    <p className="text-leaf-800 text-sm italic">
                      "{advice.optimalPlantingWindow.reason}"
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-earth-100 overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sun className="w-24 h-24 text-earth-900" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-earth-900 flex items-center gap-2">
                      <Sun className="w-5 h-5" /> Expected Harvest
                    </CardTitle>
                    <CardDescription className="text-earth-700">Estimated maturity window</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-earth-900 mb-2">
                      {advice.expectedHarvestWindow.start} — {advice.expectedHarvestWindow.end}
                    </div>
                    <p className="text-earth-800 text-sm italic">
                      Based on standard growth cycles for {advice.cropName} in {advice.location}.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Advice */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                      <ChevronRight className="w-8 h-8 text-leaf-500" />
                      Growing Timeline
                    </h2>
                    <div className="relative pl-8 md:pl-0">
                      <div className="timeline-line hidden md:block" />
                      <div className="space-y-12">
                        {advice.timeline.map((item, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                          >
                            <div className="timeline-dot hidden md:block" />
                            <div className="w-full md:w-1/2">
                              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start mb-2">
                                    <Badge variant="secondary" className="bg-leaf-100 text-leaf-700 hover:bg-leaf-100">
                                      Phase {idx + 1}
                                    </Badge>
                                    <span className="text-xs font-mono text-earth-500">{item.duration}</span>
                                  </div>
                                  <CardTitle className="text-xl">{item.phase}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <ul className="space-y-2">
                                    {item.activities.map((activity, aIdx) => (
                                      <li key={aIdx} className="text-sm text-earth-700 flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-leaf-400 mt-1.5 shrink-0" />
                                        {activity}
                                      </li>
                                    ))}
                                  </ul>
                                  <Separator className="bg-earth-100" />
                                  <div className="flex items-center gap-2 text-xs font-bold text-leaf-600 uppercase tracking-tighter">
                                    <CloudRain className="w-3 h-3" />
                                    {item.rainfallRequirement}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                            <div className="hidden md:block w-1/2" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <Card className="border-none shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-blue-500" /> Rainfall Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-earth-700 text-sm leading-relaxed">
                        {advice.rainfallAnalysis}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Info className="w-5 h-5 text-amber-500" /> Seasonal Advice
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-earth-700 text-sm leading-relaxed">
                        {advice.seasonalAdvice}
                      </p>
                    </CardContent>
                  </Card>

                  <div className="p-6 rounded-2xl bg-leaf-900 text-leaf-50 space-y-4">
                    <h3 className="font-serif text-xl font-bold">Farmer's Tip</h3>
                    <p className="text-sm text-leaf-200 italic">
                      "Always monitor local soil moisture levels. AI predictions are based on historical and current trends, but micro-climates can vary."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-earth-100 text-earth-400 mb-6">
                <Sprout className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-earth-900 mb-2">Ready to Plan?</h2>
              <p className="text-earth-600">Enter your location and crop above to generate your custom planting calendar.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-earth-200 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="w-6 h-6 text-leaf-600" />
            <span className="font-serif text-xl font-bold">SowCast AI</span>
          </div>
          <p className="text-earth-500 text-sm">
            Empowering farmers with data-driven insights. 
            <br />
            © 2026 SowCast AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

