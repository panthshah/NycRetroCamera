'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import Image1 from './Image1.png';
import Image2 from './Image2.png';
import Image3 from './Image3.png';
import Image4 from './Image4.png';
import Image5 from './Image5.png';
import Image6 from './Image6.png';
import USAStamp from './usastamp.png';
import NYStamp from './newyorkstamp.png';

interface NewspaperTemplateProps {
  photoUrl: string | null;
  photoDate?: Date;
}

const NewspaperTemplate = forwardRef<HTMLDivElement, NewspaperTemplateProps>(
  ({ photoUrl }, ref) => {

    return (
      <div
        ref={ref}
        className="bg-[#FDEECD] w-full max-w-[950px] mx-auto text-[#1a1a1a] relative"
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {/* Vintage paper texture - warm aged look */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, rgba(139, 115, 85, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(139, 115, 85, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(160, 140, 110, 0.04) 0%, transparent 70%)
            `,
          }}
        />
        {/* Subtle edge darkening for aged paper effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 100px rgba(139, 115, 85, 0.15)',
          }}
        />

        <div className="relative px-2 sm:px-3 py-2">
          {/* ============ HEADER ============ */}
          <header className="text-center mb-1">
            {/* Title row with stamps */}
            <div className="flex items-center justify-between">
              {/* USA Stamp */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative flex-shrink-0">
                <Image src={USAStamp} alt="USA" fill />
              </div>
              
              {/* Main Title */}
              <h1 
                className="text-[22px] sm:text-[32px] md:text-[48px] leading-none tracking-tight flex-1 px-1 sm:px-2"
                style={{ fontFamily: 'Chomsky, "Old English Text MT", serif' }}
              >
                New York Street.Press
              </h1>
              
              {/* NY Stamp */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative flex-shrink-0">
                <Image src={NYStamp} alt="New York" fill/>
              </div>
            </div>

            {/* Double line separator */}
            <div className="-mt-2 sm:-mt-3 md:-mt-4 mb-0">
              <div className="h-[2px] bg-black"></div>
              <div className="h-[1px] bg-black mt-[2px]"></div>
            </div>

            {/* Main Headline */}
            <h2 
              className="text-[12px] sm:text-[16px] md:text-[20px] font-bold tracking-[0.1em] sm:tracking-[0.15em] leading-tight py-0.5"
              style={{ fontFamily: 'var(--font-garamond), "EB Garamond", Georgia, serif' }}
            >
              WANTED ON THESE STREETS: NEW YORK FACES
            </h2>

            {/* Bottom line */}
            <div className="mt-0">
              <div className="h-[1px] bg-black"></div>
              <div className="h-[2px] bg-black mt-[2px]"></div>
            </div>
          </header>

          {/* ============ MAIN 2-COLUMN LAYOUT ============ */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4 md:gap-2">
            
            {/* ============ COLUMN 1 (LEFT - MAIN) ============ */}
            <div>
              {/* ROW 1: Main Photo */}
              <div className="mb-3">
                <div className="w-full aspect-[16/10] relative bg-[#F5F0E6] overflow-hidden">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt="Featured photograph"
                      fill
                      className="object-cover grayscale contrast-[0.9] brightness-[0.95]"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#8B7355] italic text-sm">Your Photo Here</span>
                    </div>
                  )}
                </div>
                <p className="text-[8px] text-center italic mt-1 opacity-60">
                  We delete all photos at the end of the day! You have the only copy of it.
                </p>
              </div>

              {/* ROW 2: Three sub-columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t border-black pt-3">
                
                {/* SUB-COL 1: Alexander Hamilton */}
                <div className="border-b sm:border-b-0 sm:border-r border-[#c5b8a8] pb-3 sm:pb-0 sm:pr-3">
                  <h3 
                    className="text-[10px] font-bold uppercase text-center border-b border-black pb-2 mb-3"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    Alexander Hamilton:<br/>Founding Father<br/>of New York
                  </h3>
                  
                  <div className="flex gap-2 mb-2">
                    <div className="w-16 h-20 relative flex-shrink-0 overflow-hidden">
                      <Image src={Image2} alt="Hamilton" fill className="object-cover" />
                    </div>
                    <p className="text-[8px] leading-[1.4] text-justify">
                      <span className="text-[16px] float-left leading-[0.85] mr-1 font-serif">A</span>
                      lexander Hamilton, born in 1755 on the Caribbean island of Nevis, became one of the most influential figures in early New York history.
                    </p>
                  </div>
                  
                  <p className="text-[8px] leading-[1.4] text-justify mb-2">
                    As the first Secretary of the Treasury, he helped lay the foundations of the American financial system, shaping New York into the economic powerhouse it is today.
                  </p>
                  
                  <p className="text-[8px] leading-[1.4] text-justify mb-2">
                    &quot;I never expect to see New York the same again,&quot; he wrote in his notes, envisioning a city of ambition, trade, and innovation. His influence is so enduring that Hamilton&apos;s portrait even appears on the $10 bill, symbolizing his lasting impact on both the city and the nation.
                  </p>

                  {/* $10 Bill with Hamilton image */}
                  <div className="mt-3 p-2">
                    <div className="flex items-center gap-3">
                      <div className="w-full h-14 relative overflow-hidden flex-shrink-0">
                        <Image src={Image3} alt="$10 Note" fill />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[8px] leading-[1.4] italic mt-2 opacity-80">
                    Hamilton is remembered not just as a politician but as a visionary whose ideas continue to live in the bustling streets of Manhattan. His legacy extends far beyond politics — he shaped the very fabric of American commerce. The financial district bears his influence, and Wall Street owes much of its existence to his foresight. Today, tourists and locals alike walk past monuments bearing his name, a testament to a man who believed in the promise of this great city. From the cobblestones of lower Manhattan to the towering spires of modern skyscrapers, Hamilton&apos;s spirit endures. He envisioned a nation built on industry and innovation, and New York became the living embodiment of that dream. His debates with Jefferson, his writings in the Federalist Papers, and his tireless work ethic have inspired generations. The city that never sleeps owes its restless energy, in part, to a man who never stopped fighting for its future.
                  </p>
                </div>

                {/* SUB-COL 2: Skyscrapers & Architecture */}
                <div className="border-b md:border-b-0 md:border-r border-[#c5b8a8] pb-3 md:pb-0 md:pr-3">
                  <h3 
                    className="text-[10px] font-bold uppercase border-b border-black pb-1 mb-2"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    Skyscrapers of Manhattan
                  </h3>
                  
                  <p className="text-[8px] leading-[1.4] text-justify mb-2">
                    Skyscrapers of Manhattan are more than buildings. They are monuments to ambition. The Empire State Building, still iconic after almost a century, remains a symbol of strength and persistence.
                  </p>

                  <h3 
                    className="text-[9px] font-bold uppercase border-t border-b border-black py-1 my-2 text-center tracking-wider"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    Architecture: Legends<br/>in Stone and Glass
                  </h3>
                  
                  <p className="text-[8px] leading-[1.4] text-justify mb-2">
                    But beyond the giants, there are details that make New York unique: fire escapes zigzagging along old brick facades, art deco ornaments above doorways, and street art transforming entire blocks into open-air galleries.
                  </p>
                  
                  <p className="text-[8px] leading-[1.4] text-justify mb-2">
                    &quot;The beauty of this city is in contrasts — glass meets brick, modern meets history,&quot; explains an architect we met near Bryant Park.
                  </p>

                  {/* NYC Skyline Illustration */}
                  <div className="w-full h-32 relative my-3 overflow-hidden">
                    <Image src={Image1} alt="NYC Skyline" fill className="object-contain" />
                  </div>
                  
                  <p className="text-[8px] leading-[1.4] text-justify">
                    For visitors and residents alike, exploring Manhattan&apos;s streets is like walking through a gallery of human ambition — where concrete, steel, and glass meet imagination, culture, and the unyielding spirit of New York. Every corner tells a story, from the smallest café tucked between skyscrapers to murals that celebrate decades of change. The Chrysler Building&apos;s art deco crown catches the morning sun, while One World Trade Center stands as a symbol of resilience. This is a city that rewards the curious and the dreamers who look up and see monuments to human possibility. The Chrysler Building's art deco crown catches the morning sun, while One World Trade Center stands as a symbol of resilience. This is a city that rewards the curious and the dreamers who look up and see monuments to human possibility.
                  </p>
                </div>

                {/* SUB-COL 3: Subway & Instagram */}
                <div>
                  <h3 
                    className="text-[10px] font-bold uppercase border-b border-black pb-2 mb-3 text-center"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    The Underground<br/>Heart: The Subway
                  </h3>
                  
                  <p className="text-[8px] leading-[1.4] text-justify mb-2">
                    The New York subway is not just transportation. It&apos;s theater, stage, and survival all at once. Here you&apos;ll meet a violinist playing Bach, a breakdancer flipping between carriages, or a stranger reading a thick novel while the train rattles beneath the city.
                  </p>

                  {/* Subway illustration - Image5 */}
                  <div className="w-full h-32 my-2 relative overflow-hidden">
                    <Image src={Image5} alt="Subway" fill className="object-cover" />
                  </div>
                  
                  <p className="text-[8px] leading-[1.4] text-justify mb-2">
                    Every station has its own story. Some are majestic, like Grand Central with its constellations painted on the ceiling. Others are raw, painted with graffiti, smelling of time and movement.
                  </p>

                  {/* Instagram Box with QR Code - Image6 */}
                  <div className="mt-4 border-t border-b border-black py-3">
                    <div className="flex items-center gap-4">
                      {/* QR Code - Image6 */}
                      <div className="w-20 h-20 relative overflow-hidden flex-shrink-0">
                        <Image src={Image6} alt="QR Code" fill className="object-contain" />
                      </div>
                      {/* Instagram text */}
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
                          </svg>
                          <span className="text-[11px] font-bold">Instagram</span>
                        </div>
                        <div className="text-[14px] font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                          street.press
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[8px] leading-[1.4] text-justify mt-3 italic">
                    &quot;If the streets are the veins of New York, the subway is its heartbeat,&quot; one passenger tells us. Beneath the city, it moves millions daily, connecting lives and stories in every carriage. It is democracy in motion — where Wall Street executives stand shoulder to shoulder with artists and dreamers. Here, beneath the streets, beats the true heart of New York. The Chrysler Building's art deco crown catches the morning sun, while One World Trade Center stands as a symbol of resilience. This is a city that rewards the curious and the dreamers who look up and see monuments to human possibility This is a city that rewards the curious and the dreamers who look up and see monuments to human possibility.
                  </p>
                </div>
              </div>
            </div>

            {/* ============ COLUMN 2 (RIGHT - SIDEBAR) ============ */}
            <div className="border-t md:border-t-0 md:border-l border-black pt-4 md:pt-0 md:pl-4">
              {/* Morning on Manhattan */}
              <h3 
                className="text-[11px] font-bold uppercase tracking-wide border-b-2 border-black pb-1 mb-2 text-center"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Morning on Manhattan
              </h3>
              
              <p className="text-[9px] leading-[1.5] text-justify mb-2">
                <span className="font-bold">Every morning in Manhattan</span> starts with the same ritual — the sound of steaming espresso machines, yellow cabs honking impatiently, and thousands of people moving in different directions.
              </p>

              {/* Coffee/Street illustration */}
              <div className="w-full h-24 relative my-3 overflow-hidden">
                <Image src={Image4} alt="Morning Scene" fill className="object-contain" />
              </div>
              
              <p className="text-[9px] leading-[1.5] text-justify mb-2">
                The corner cafes are full of regulars: students, writers, business people, all rushing but always stopping for a coffee-to-go. For locals, this is not just about caffeine. It&apos;s about rhythm. The rhythm of the city that dictates your day before you even check your phone.
              </p>
              
              <p className="text-[9px] leading-[1.5] text-justify mb-2">
                &quot;Here, time is money, but also poetry,&quot; says one barista who has been working in Midtown for 20 years. Sidewalks pulse like arteries, carrying life through the concrete veins of Manhattan.
              </p>

              <p className="text-[9px] leading-[1.5] text-justify mb-2">
                Delivery trucks unload in hurried precision, while pigeons weave between legs and bicycle messengers dart like sparks. In this orchestrated chaos, there&apos;s an unspoken understanding: everyone has a destination, a purpose, a story. And yet, in these fleeting moments, the city&apos;s heartbeat feels strangely personal, as if it knows each passerby by name.
              </p>

              {/* Decorative divider */}
              <div className="flex items-center justify-center my-3">
                <div className="h-[1px] flex-1 bg-black"></div>
                <div className="px-2 text-[8px]">✦</div>
                <div className="h-[1px] flex-1 bg-black"></div>
              </div>

              {/* Brooklyn at Night */}
              <div className="flex items-center justify-center my-3">
                <h3 
                  className="text-[11px] font-bold uppercase tracking-wide border-t-2 border-b-2 border-black py-2 px-4 text-center"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  Brooklyn at Night
                </h3>
              </div>
              
              <p className="text-[9px] leading-[1.5] text-justify mb-2">
                When Manhattan goes to sleep (if it ever does), Brooklyn wakes up. Small bars in Williamsburg, jazz cellars, and street musicians under the Williamsburg Bridge — all of this creates a different version of New York, less shiny but more real. Locals call it &quot;the soul of the city.&quot;
              </p>
              
              <p className="text-[9px] leading-[1.5] text-justify mb-2">
                One guitarist on the street told us: &quot;If you want to understand New York, listen at night. The music will tell you everything.&quot;
              </p>

              <p className="text-[9px] leading-[1.5] text-justify mb-2">
                Here, the city breathes slowly, taking its time, revealing secrets to those willing to wander and listen. 
              </p>

              {/* Brooklyn skyline illustration */}
              <div className="w-full h-32 relative mt-3 overflow-hidden">
                <Image src={Image1} alt="Brooklyn Night" fill className="object-contain" />
              </div>
              
              <p className="text-[9px] leading-[1.5] text-justify mt-2">
                The Brooklyn Bridge, illuminated against the night sky, stands as a timeless connection between two worlds. Street performers gather beneath its arches, their melodies drifting across the East River. In Dumbo, couples walk hand in hand, the Manhattan skyline sparkling behind them. Brooklyn at night is where New York reveals its soul — raw, authentic, and endlessly creative. This is where artists dream, musicians play, and the spirit of New York burns brightest when the sun goes down.The Chrysler Building's art deco crown catches the morning sun, while One World Trade Center stands as a symbol of resilience. This is a city that rewards the curious and the dreamers who look up and see monuments to human possibility This is a city that rewards the curious and the dreamers who look up and see monuments to human possibility This is a city that rewards the curious and the dreamers who look up and see monuments to human possibility
              </p>
            </div>
          </div>

          {/* ============ FOOTER ============ */}
          <footer className="mt-4 pt-3 border-t-2 border-black text-center">
            <p className="text-[8px] opacity-60 tracking-wider">
              cooperation.street.press@gmail.com
            </p>
          </footer>
        </div>
      </div>
    );
  }
);

NewspaperTemplate.displayName = 'NewspaperTemplate';

export default NewspaperTemplate;
